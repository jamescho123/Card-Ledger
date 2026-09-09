import Foundation
import SwiftUI
import UIKit

@MainActor
final class AppStore: ObservableObject {
    @Published var session: SupabaseSession?
    @Published var profile: CollectorProfile?
    @Published var isStarting = true
    @Published var isWorking = false
    @Published var message: String?
    @Published var authCapabilities = AuthCapabilities()
    @Published var accountStats = AccountStats()
    @Published var subscription: UserSubscription?
    @Published var aiTradeUsesThisMonth = 0
    @Published var isGeneratingDIY = false
    @Published var cards: [CardItem] { didSet { persistCards() } }
    @Published var diyCards: [DIYCardItem] { didSet { persistDIYCards() } }
    @Published var goals: [CollectionGoal] { didSet { persist(goals, key: "mobile.goals") } }
    @Published var trades: [TradeDeal] { didSet { persist(trades, key: "mobile.trades") } }

    private let client = SupabaseClient.shared
    private var activeUserID: UUID?

    init() {
        cards = []
        diyCards = []
        goals = Self.load([CollectionGoal].self, key: "mobile.goals") ?? []
        trades = Self.load([TradeDeal].self, key: "mobile.trades") ?? []
#if DEBUG
        if ProcessInfo.processInfo.arguments.contains("-CardLedgerDemo") {
            let user = AuthUser(id: UUID(), email: "demo@cardledger.app", userMetadata: .init(name: "林先生"))
            session = SupabaseSession(accessToken: "demo", refreshToken: "demo", expiresIn: 3600, user: user)
            activeUserID = user.id
            profile = CollectorProfile(id: user.id, email: user.email ?? "", name: L10n.string("林先生"), role: "collector", avatar: nil, description: L10n.string("高级收藏家 · 专注篮球与 TCG"), age: "", location: L10n.string("上海"), collectorScore: 942)
            cards = SampleCardCatalog.cards
            diyCards = []
            goals = [CollectionGoal(title: L10n.demoGoalTitle(), detail: L10n.demoGoalDetail(), owned: 3, total: 3, currentValue: 0, completeValue: 0)]
            isStarting = false
            return
        }
#endif
        Task { await restoreSession() }
    }

    var totalValue: Double { cards.reduce(0) { $0 + $1.estimatedValue } }
    var totalCost: Double { cards.reduce(0) { $0 + $1.paidPrice } }
    var totalProfit: Double { totalValue - totalCost }
    var isPremium: Bool { profile?.role == "admin" || subscription?.isActive == true }
    var goalLimit: Int? { isPremium ? nil : 3 }
    var aiTradeMonthlyLimit: Int? { isPremium ? nil : 5 }
    var displayCabinetLimit: Int? { isPremium ? nil : 6 }
    var canAddGoal: Bool { goalLimit.map { goals.count < $0 } ?? true }
    var canUseAITrade: Bool { aiTradeMonthlyLimit.map { aiTradeUsesThisMonth < $0 } ?? true }
    var remainingAITradeUses: Int? { aiTradeMonthlyLimit.map { max($0 - aiTradeUsesThisMonth, 0) } }

    func signUp(name: String, email: String, password: String) async {
        await run {
            let response = try await client.signUp(name: name, email: email, password: password)
            if let newSession = response.session {
                try await activateSession(newSession)
            } else {
                message = L10n.accountCreated()
            }
        }
    }

    func signIn(email: String, password: String) async {
        await run {
            let newSession = try await client.signIn(email: email, password: password)
            try await activateSession(newSession)
        }
    }

    func requestPhoneOTP(phone: String) async -> Bool {
        if authCapabilities.phoneEnabled == false {
            message = L10n.string(
                "手机号登录尚未在云端启用。请在 Supabase 的 Authentication > Providers > Phone 中启用并配置中国大陆可送达的短信服务。"
            )
            return false
        }
        isWorking = true
        defer { isWorking = false }
        do {
            try await client.sendPhoneOTP(phone: phone)
            return true
        } catch {
            message = error.localizedDescription
            return false
        }
    }

    func verifyPhoneOTP(phone: String, token: String) async {
        await run {
            let newSession = try await client.verifyPhoneOTP(phone: phone, token: token)
            try await activateSession(newSession)
        }
    }

    func signInWithWeChat() async {
        if authCapabilities.weChatProviderConfigured == false {
            message = L10n.string(
                "微信登录尚未在 Supabase 中启用。请先创建 custom:wechat 服务商。"
            )
            return
        }
        await run {
            let newSession = try await client.signInWithWeChat()
            try await activateSession(newSession)
        }
    }

    func refreshAuthCapabilities() async {
        authCapabilities = await client.fetchAuthCapabilities()
    }

    func saveProfile(_ updated: CollectorProfile) async {
        guard let session else { return }
        await run {
            profile = try await client.saveProfile(updated, accessToken: session.accessToken)
            message = L10n.profileSaved()
        }
    }

    func signOut() {
        SessionVault.clear()
        session = nil
        profile = nil
        accountStats = AccountStats()
        subscription = nil
        aiTradeUsesThisMonth = 0
        activeUserID = nil
        cards = []
        diyCards = []
    }

    func addCard(_ card: CardItem) {
        cards.insert(card, at: 0)
        Task { await uploadCard(card) }
    }

    func generateDIYImage(_ request: DIYImageGenerationRequest) async -> DIYGeneratedImage? {
        guard let session else {
            message = L10n.string("请先登录")
            return nil
        }
        isGeneratingDIY = true
        defer { isGeneratingDIY = false }
#if DEBUG
        if session.accessToken == "demo" {
            guard let data = Self.demoDIYImage(request) else { return nil }
            return DIYGeneratedImage(data: data, model: "simulator-preview", prompt: request.description)
        }
#endif
        do {
            let response = try await client.generateDIYImage(request, accessToken: session.accessToken)
            guard let data = Data(base64Encoded: response.imageBase64, options: .ignoreUnknownCharacters) else {
                throw SupabaseError.invalidResponse
            }
            return DIYGeneratedImage(data: data, model: response.model, prompt: response.prompt)
        } catch {
            message = error.localizedDescription
            return nil
        }
    }

    func addDIYCard(_ card: DIYCardItem) {
        diyCards.insert(card, at: 0)
        Task { await uploadDIYCard(card) }
    }

    func removeDIYCard(_ card: DIYCardItem) {
        diyCards.removeAll { $0.id == card.id }
        Task { await deleteCloudDIYCard(card.id) }
    }

    func lookupPSACert(_ certNumber: String) async -> PSAPopulationRecord? {
        guard let session else {
            message = L10n.signInForPSA()
            return nil
        }
        isWorking = true
        defer { isWorking = false }
        do {
            return try await client.lookupPSACert(certNumber, accessToken: session.accessToken)
        } catch {
            message = error.localizedDescription
            return nil
        }
    }

    func searchPSAPopulation(_ query: String) async -> [PSAPopulationRecord] {
        guard let session else {
            message = L10n.signInForPSA()
            return []
        }
        do { return try await client.searchPSAPopulation(query: query, accessToken: session.accessToken) }
        catch {
            message = error.localizedDescription
            return []
        }
    }

    func refreshPSAPopulation(for cardID: String) async -> PSAPopulationRecord? {
        guard let index = cards.firstIndex(where: { $0.id == cardID }) else { return nil }
        let card = cards[index]
        let digits = (card.certification ?? "").filter(\.isNumber)
        let population: PSAPopulationRecord?
        if digits.count >= 7 {
            population = await lookupPSACert(digits)
        } else {
            let query = [card.year, card.brand ?? "", card.set, card.player, card.number, card.parallel]
                .filter { !$0.isEmpty }
                .joined(separator: " ")
            let requestedGrade = card.grade.flatMap(Self.gradeNumber) ?? card.psaPopulation?.grade
            population = await searchPSAPopulation(query).first {
                Self.population($0, matches: card) && (requestedGrade == nil || $0.grade == requestedGrade)
            }
        }
        guard let population else { return nil }
        cards[index].psaPopulation = population
        let updated = cards[index]
        Task { await uploadCard(updated) }
        return population
    }

    private static func gradeNumber(_ grade: String) -> Double? {
        grade.split(whereSeparator: { !$0.isNumber && $0 != "." }).compactMap { Double($0) }.first
    }

    private static func normalized(_ value: String) -> [String] {
        value.folding(options: [.caseInsensitive, .diacriticInsensitive], locale: .current)
            .split(whereSeparator: { !$0.isLetter && !$0.isNumber })
            .map(String.init)
    }

    private static func population(_ population: PSAPopulationRecord, matches card: CardItem) -> Bool {
        func exact(_ left: String, _ right: String) -> Bool {
            right.isEmpty || normalized(left) == normalized(right)
        }
        func contains(_ left: String, _ right: String) -> Bool {
            let actual = Set(normalized(left))
            return normalized(right).allSatisfy(actual.contains)
        }
        return exact(population.year, card.year)
            && exact(population.subject, card.player)
            && exact(population.cardNumber, card.number)
            && contains(population.brand.isEmpty ? population.setName : population.brand, card.brand ?? "")
            && contains(population.setName, card.set)
            && contains(population.variety, card.parallel)
    }

    func removeCards(at offsets: IndexSet) {
        let removedIDs = offsets.compactMap { cards.indices.contains($0) ? cards[$0].id : nil }
        cards.remove(atOffsets: offsets)
        removedIDs.forEach { id in Task { await deleteCloudCard(id) } }
    }
    func removeCards(ids: Set<String>) {
        guard !ids.isEmpty else { return }
        cards.removeAll { ids.contains($0.id) }
        ids.forEach { id in Task { await deleteCloudCard(id) } }
    }
    @discardableResult
    func addGoal(_ goal: CollectionGoal) -> Bool {
        guard canAddGoal else { return false }
        goals.insert(goal, at: 0)
        return true
    }
    func removeGoals(at offsets: IndexSet) { goals.remove(atOffsets: offsets) }
    func addTrade(_ trade: TradeDeal) { trades.insert(trade, at: 0) }
    func removeTrades(at offsets: IndexSet) { trades.remove(atOffsets: offsets) }

    private func restoreSession() async {
        defer { isStarting = false }
        guard let stored = SessionVault.load() else { return }
        do {
            let refreshed = try await client.refresh(refreshToken: stored.refreshToken)
            try SessionVault.save(refreshed)
            session = refreshed
            activateUser(refreshed.user.id)
            profile = try await client.fetchProfile(userID: refreshed.user.id, accessToken: refreshed.accessToken)
            await refreshCloudData()
        } catch {
            SessionVault.clear()
            activeUserID = nil
            cards = []
            diyCards = []
        }
    }

    private func activateUser(_ userID: UUID) {
        activeUserID = userID
        cards = Self.load([CardItem].self, key: cardCacheKey(userID)) ?? []
        diyCards = Self.load([DIYCardItem].self, key: diyCardCacheKey(userID)) ?? []
        aiTradeUsesThisMonth = UserDefaults.standard.integer(forKey: aiTradeUsageKey(userID))
    }

    private func activateSession(_ newSession: SupabaseSession) async throws {
        try SessionVault.save(newSession)
        session = newSession
        activateUser(newSession.user.id)
        profile = try await client.fetchProfile(userID: newSession.user.id, accessToken: newSession.accessToken)
        await refreshCloudData()
    }

    private func refreshCloudData() async {
        guard let session else { return }
        do {
            let cloudCards = try await client.fetchCards(userID: session.user.id, accessToken: session.accessToken)
            if cloudCards.isEmpty, !cards.isEmpty {
                for card in cards { try await client.saveCard(cloudCard(card), userID: session.user.id, accessToken: session.accessToken) }
            } else {
                let cachedBrands = Dictionary(uniqueKeysWithValues: cards.map { ($0.id, $0.brand) })
                let cachedImages = Dictionary(uniqueKeysWithValues: cards.map { ($0.id, $0.imageURL) })
                cards = cloudCards.map { cloudCard in
                    var card = cloudCard
                    card.brand = cachedBrands[cloudCard.id] ?? nil
                    card.imageURL = cachedImages[cloudCard.id] ?? cloudCard.imageURL
                    return card
                }
            }
        } catch {
            message = L10n.collectionSyncUnavailable(error.localizedDescription)
        }
        do {
            let cloudDIYCards = try await client.fetchDIYCards(userID: session.user.id, accessToken: session.accessToken)
            if cloudDIYCards.isEmpty, !diyCards.isEmpty {
                for card in diyCards {
                    try await client.saveDIYCard(card, userID: session.user.id, accessToken: session.accessToken)
                }
            } else if !cloudDIYCards.isEmpty {
                let cachedImages = Dictionary(uniqueKeysWithValues: diyCards.map { ($0.id, $0.imageURL) })
                diyCards = cloudDIYCards.map { cloudCard in
                    var card = cloudCard
                    card.imageURL = card.imageURL ?? cachedImages[cloudCard.id] ?? nil
                    return card
                }
            }
        } catch {
            // DIY data remains available locally when the optional cloud table is not installed.
        }
        do {
            accountStats = try await client.fetchAccountStats(userID: session.user.id, accessToken: session.accessToken)
        } catch {
            accountStats = AccountStats()
        }
        do {
            subscription = try await client.fetchSubscription(userID: session.user.id, accessToken: session.accessToken)
        } catch {
            subscription = nil
        }
    }

    @discardableResult
    func consumeAITradeUse() -> Bool {
        guard canUseAITrade else { return false }
        guard !isPremium, let activeUserID else { return true }
        aiTradeUsesThisMonth += 1
        UserDefaults.standard.set(aiTradeUsesThisMonth, forKey: aiTradeUsageKey(activeUserID))
        return true
    }

    private func uploadCard(_ card: CardItem) async {
        guard let session else { return }
        do { try await client.saveCard(cloudCard(card), userID: session.user.id, accessToken: session.accessToken) }
        catch { message = L10n.cardCloudSaveFailed(error.localizedDescription) }
    }

    private func uploadDIYCard(_ card: DIYCardItem) async {
        guard let session else { return }
#if DEBUG
        if session.accessToken == "demo" { return }
#endif
        do { try await client.saveDIYCard(card, userID: session.user.id, accessToken: session.accessToken) }
        catch { message = L10n.cardCloudSaveFailed(error.localizedDescription) }
    }

    private func cloudCard(_ card: CardItem) -> CardItem {
        var copy = card
        if CardImageStorage.isLocal(copy.imageURL) { copy.imageURL = nil }
        return copy
    }

    private func deleteCloudCard(_ id: String) async {
        guard let session else { return }
        do { try await client.deleteCard(id: id, userID: session.user.id, accessToken: session.accessToken) }
        catch { message = L10n.cardCloudDeleteFailed(error.localizedDescription) }
    }

    private func deleteCloudDIYCard(_ id: String) async {
        guard let session else { return }
#if DEBUG
        if session.accessToken == "demo" { return }
#endif
        do { try await client.deleteDIYCard(id: id, userID: session.user.id, accessToken: session.accessToken) }
        catch { message = L10n.cardCloudDeleteFailed(error.localizedDescription) }
    }

    private func run(_ operation: () async throws -> Void) async {
        isWorking = true
        defer { isWorking = false }
        do { try await operation() }
        catch { message = error.localizedDescription }
    }

    private func persist<T: Encodable>(_ value: T, key: String) {
        if let data = try? JSONEncoder().encode(value) { UserDefaults.standard.set(data, forKey: key) }
    }

    private func persistCards() {
        guard let activeUserID else { return }
        persist(cards, key: cardCacheKey(activeUserID))
    }

    private func persistDIYCards() {
        guard let activeUserID else { return }
        persist(diyCards, key: diyCardCacheKey(activeUserID))
    }

    private func cardCacheKey(_ userID: UUID) -> String { "mobile.cards.\(userID.uuidString.lowercased())" }
    private func diyCardCacheKey(_ userID: UUID) -> String { "mobile.diy-cards.\(userID.uuidString.lowercased())" }

    private func aiTradeUsageKey(_ userID: UUID) -> String {
        let components = Calendar(identifier: .gregorian).dateComponents([.year, .month], from: .now)
        return "mobile.ai-trade-uses.\(userID.uuidString.lowercased()).\(components.year ?? 0)-\(components.month ?? 0)"
    }

    private static func load<T: Decodable>(_ type: T.Type, key: String) -> T? {
        guard let data = UserDefaults.standard.data(forKey: key) else { return nil }
        return try? JSONDecoder().decode(type, from: data)
    }

#if DEBUG
    private static func demoDIYImage(_ request: DIYImageGenerationRequest) -> Data? {
        let size = CGSize(width: 720, height: 1080)
        let image = UIGraphicsImageRenderer(size: size).image { context in
            let canvas = context.cgContext
            let colors = [
                UIColor(red: 0.01, green: 0.16, blue: 0.12, alpha: 1).cgColor,
                UIColor(red: 0.02, green: 0.48, blue: 0.32, alpha: 1).cgColor,
                UIColor(red: 0.02, green: 0.07, blue: 0.06, alpha: 1).cgColor
            ] as CFArray
            if let gradient = CGGradient(colorsSpace: CGColorSpaceCreateDeviceRGB(), colors: colors, locations: [0, 0.55, 1]) {
                canvas.drawLinearGradient(gradient, start: .zero, end: CGPoint(x: size.width, y: size.height), options: [])
            }
            UIColor(red: 0.91, green: 0.76, blue: 0.33, alpha: 1).setStroke()
            let border = UIBezierPath(roundedRect: CGRect(x: 24, y: 24, width: 672, height: 1032), cornerRadius: 30)
            border.lineWidth = 12
            border.stroke()

            for index in 0..<8 {
                let inset = CGFloat(index) * 36
                UIColor.white.withAlphaComponent(0.045).setStroke()
                let arc = UIBezierPath(ovalIn: CGRect(x: 70 + inset / 2, y: 220 + inset, width: 580 - inset, height: 580 - inset))
                arc.lineWidth = 4
                arc.stroke()
            }

            let paragraph = NSMutableParagraphStyle()
            paragraph.alignment = .left
            let titleAttributes: [NSAttributedString.Key: Any] = [
                .font: UIFont.systemFont(ofSize: 43, weight: .black),
                .foregroundColor: UIColor.white,
                .paragraphStyle: paragraph
            ]
            let labelAttributes: [NSAttributedString.Key: Any] = [
                .font: UIFont.monospacedSystemFont(ofSize: 22, weight: .semibold),
                .foregroundColor: UIColor(red: 0.91, green: 0.76, blue: 0.33, alpha: 1)
            ]
            let bodyAttributes: [NSAttributedString.Key: Any] = [
                .font: UIFont.systemFont(ofSize: 25, weight: .medium),
                .foregroundColor: UIColor.white.withAlphaComponent(0.82)
            ]
            (request.series.uppercased() as NSString).draw(in: CGRect(x: 64, y: 64, width: 590, height: 44), withAttributes: labelAttributes)
            ((request.cardTitle.isEmpty ? request.playerSubject : request.cardTitle) as NSString)
                .draw(in: CGRect(x: 64, y: 750, width: 590, height: 120), withAttributes: titleAttributes)
            (request.description as NSString)
                .draw(in: CGRect(x: 64, y: 870, width: 590, height: 108), withAttributes: bodyAttributes)
            ("\(request.parallel) · \(request.cardNumber)" as NSString)
                .draw(in: CGRect(x: 64, y: 1000, width: 590, height: 34), withAttributes: labelAttributes)
        }
        return image.jpegData(compressionQuality: 0.9)
    }
#endif
}
