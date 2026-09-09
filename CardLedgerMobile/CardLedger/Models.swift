import Foundation

struct CollectorProfile: Codable, Identifiable, Equatable {
    var id: UUID
    var email: String
    var name: String
    var role: String
    var avatar: String?
    var description: String?
    var age: String?
    var location: String?
    var collectorScore: Int

    enum CodingKeys: String, CodingKey {
        case id, email, name, role, avatar, description, age, location
        case collectorScore = "collector_score"
    }
}

struct AccountStats: Equatable {
    var followers = 0
    var following = 0
}

struct UserSubscription: Decodable, Equatable {
    var planCode: String
    var status: String
    var currentPeriodEnd: String?

    enum CodingKeys: String, CodingKey {
        case status
        case planCode = "plan_code"
        case currentPeriodEnd = "current_period_end"
    }

    var isActive: Bool { status == "active" }
}

struct PSAPopulationRecord: Codable, Identifiable, Hashable {
    var id: Int?
    var identityKey: String
    var year: String
    var brand: String
    var setName: String
    var subject: String
    var cardNumber: String
    var variety: String
    var category: String
    var grade: Double
    var gradeLabel: String
    var populationAtGrade: Int
    var populationHigher: Int
    var populationTotal: Int?
    var sampleCertNumber: String
    var sourceURL: String
    var fetchedAt: String

    enum CodingKeys: String, CodingKey {
        case id, year, brand, subject, variety, category, grade
        case identityKey = "identity_key"
        case setName = "set_name"
        case cardNumber = "card_number"
        case gradeLabel = "grade_label"
        case populationAtGrade = "population_at_grade"
        case populationHigher = "population_higher"
        case populationTotal = "population_total"
        case sampleCertNumber = "sample_cert_number"
        case sourceURL = "source_url"
        case fetchedAt = "fetched_at"
    }

}

struct CardItem: Codable, Identifiable, Hashable {
    var id = UUID().uuidString
    var sport: String? = nil
    var year: String
    var brand: String? = nil
    var set: String
    var player: String
    var type: String
    var parallel: String
    var number: String
    var grade: String? = nil
    var paidPrice: Double
    var estimatedValue: Double
    var acquiredAt: Date
    var imageURL: String? = nil
    var certification: String? = nil
    var psaPopulation: PSAPopulationRecord? = nil

    var title: String { [year, brand, set, player].compactMap { $0 }.filter { !$0.isEmpty }.joined(separator: " · ") }
    var detail: String { [type, parallel, number, grade].compactMap { $0 }.filter { !$0.isEmpty }.joined(separator: " · ") }
    var profit: Double { estimatedValue - paidPrice }

    var normalizedSport: String {
        let source = (sport ?? "").trimmingCharacters(in: .whitespacesAndNewlines)
        let value = source.lowercased()
        if value.contains("pokemon") || value.contains("pokémon") || value.contains("ptcg") || value == "tcg" { return "PTCG / TCG" }
        if value.contains("basketball") || value == "nba" { return "Basketball" }
        if value.contains("baseball") || value == "mlb" { return "Baseball" }
        if value.contains("soccer") || value == "fifa" { return "Soccer" }
        if value.contains("football") || value == "nfl" { return "Football" }
        if value.contains("hockey") || value == "nhl" { return "Hockey" }
        if !source.isEmpty { return source }
        let identity = [brand, set, player].compactMap { $0 }.joined(separator: " ").lowercased()
        if identity.contains("pokemon") || identity.contains("pokémon") { return "PTCG / TCG" }
        return "Other"
    }

    var investmentAssessment: InvestmentAssessment {
        let printRun = [parallel, type, number].compactMap { value -> Int? in
            let parts = value.components(separatedBy: "/")
            guard parts.count > 1 else { return nil }
            let digits = parts.last?.prefix { $0.isNumber } ?? ""
            return Int(digits)
        }.first
        let scarcity: Int
        if let printRun {
            scarcity = printRun <= 10 ? 100 : printRun <= 25 ? 92 : printRun <= 50 ? 84 : printRun <= 99 ? 74 : printRun <= 199 ? 62 : printRun <= 499 ? 48 : 35
        } else if let population = psaPopulation?.populationAtGrade, population > 0 {
            scarcity = population <= 10 ? 96 : population <= 25 ? 88 : population <= 50 ? 80 : population <= 100 ? 70 : population <= 500 ? 55 : population <= 2_000 ? 42 : 30
        } else {
            scarcity = 35
        }

        let gradeValue = grade?.split(whereSeparator: { !$0.isNumber && $0 != "." }).compactMap { Double($0) }.first
        let gradeScore = gradeValue.map { min(100, max(0, Int(35 + $0 * 6))) } ?? 42
        let fields = [year, brand ?? "", set, player, type, parallel, number]
        let completeness = Double(fields.filter { !$0.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty }.count) / Double(fields.count)
        let evidence = min(100, Int(completeness * 58) + (imageURL == nil ? 0 : 12) + (certification == nil ? 0 : 10))
        let factors = [
            InvestmentFactor(name: "走势", score: 25, detail: "等待同步已成交记录"),
            InvestmentFactor(name: "流动性", score: 8, detail: "等待同步已成交记录"),
            InvestmentFactor(name: "稀缺度", score: scarcity, detail: printRun.map { "限量 /\($0)" } ?? psaPopulation.map { "PSA Pop \($0.populationAtGrade)" } ?? "暂无可验证的稀缺数据"),
            InvestmentFactor(name: "评级", score: gradeScore, detail: grade ?? "未评级或未填写"),
            InvestmentFactor(name: "数据质量", score: evidence, detail: "卡片信息完整度 \(Int(completeness * 100))%")
        ]
        let weights = [0.25, 0.20, 0.20, 0.15, 0.20]
        let score = Int(zip(factors, weights).reduce(0.0) { $0 + Double($1.0.score) * $1.1 }.rounded())
        let label = score >= 75 ? "数据支撑较强" : score >= 55 ? "数据逐步完善" : score >= 35 ? "高不确定性" : "数据不足"
        return InvestmentAssessment(score: score, label: label, confidence: "低", factors: factors)
    }
}

enum SampleCardCatalog {
    static let wembanyamaYoungestFiveByFive = CardItem(
        sport: "Basketball",
        year: "2023-24",
        brand: "Topps",
        set: "Topps NOW Basketball",
        player: "Victor Wembanyama",
        type: "Rookie",
        parallel: "Base",
        number: "02.23.2024",
        paidPrice: 0,
        estimatedValue: 0,
        acquiredAt: .now,
        imageURL: StitchAssets.cardOne
    )

    static let lebronMinutesLeader = CardItem(
        sport: "Basketball",
        year: "2024-25",
        brand: "Topps",
        set: "Topps NOW Basketball",
        player: "LeBron James",
        type: "Record",
        parallel: "Base",
        number: "12.19.2024",
        paidPrice: 0,
        estimatedValue: 0,
        acquiredAt: .now,
        imageURL: StitchAssets.cardTwo
    )

    static let wembanyamaMultipleFiveByFive = CardItem(
        sport: "Basketball",
        year: "2024-25",
        brand: "Topps",
        set: "Topps NOW Basketball",
        player: "Victor Wembanyama",
        type: "Milestone",
        parallel: "Base",
        number: "10.31.2024",
        paidPrice: 0,
        estimatedValue: 0,
        acquiredAt: .now,
        imageURL: StitchAssets.cardThree
    )

    static let cards = [
        wembanyamaYoungestFiveByFive,
        lebronMinutesLeader,
        wembanyamaMultipleFiveByFive
    ]
}

struct InvestmentFactor: Identifiable, Hashable {
    var id: String { name }
    var name: String
    var score: Int
    var detail: String
}

struct InvestmentAssessment: Hashable {
    var score: Int
    var label: String
    var confidence: String
    var factors: [InvestmentFactor]
}

struct SportIndexSnapshot: Identifiable, Hashable {
    var id: String { sport }
    var sport: String
    var cardCount: Int
    var indexLevel: Double?
    var confidence: String

    static func collectionSnapshots(cards: [CardItem]) -> [SportIndexSnapshot] {
        let core = ["Basketball", "Baseball", "Soccer", "Football", "Hockey", "PTCG / TCG"]
        let sports = Array(Set(core + cards.map(\.normalizedSport))).sorted { lhs, rhs in
            let left = core.firstIndex(of: lhs) ?? Int.max
            let right = core.firstIndex(of: rhs) ?? Int.max
            return left == right ? lhs < rhs : left < right
        }
        return sports.map { sport in
            SportIndexSnapshot(sport: sport, cardCount: cards.filter { $0.normalizedSport == sport }.count, indexLevel: nil, confidence: "等待成交数据")
        }
    }
}

struct CollectionGoal: Codable, Identifiable, Hashable {
    var id = UUID()
    var title: String
    var detail: String
    var owned: Int
    var total: Int
    var currentValue: Double
    var completeValue: Double

    var progress: Double { total > 0 ? min(Double(owned) / Double(total), 1) : 0 }
}

struct TradeDeal: Codable, Identifiable, Hashable {
    var id = UUID()
    var date: Date
    var offeredCards: String
    var receivedCards: String
    var offeredValue: Double
    var receivedValue: Double
    var cashAdjustment: Double
    var notes: String

    var difference: Double { receivedValue - offeredValue - cashAdjustment }
}

enum DIYListingIntent: String, Codable, CaseIterable, Identifiable {
    case showcase
    case trade
    case sale

    var id: String { rawValue }
}

struct DIYCardItem: Codable, Identifiable, Hashable {
    var id = UUID().uuidString
    var series: String
    var playerSubject: String
    var parallel: String
    var cardNumber: String
    var finish: String
    var title: String
    var description: String
    var prompt: String
    var imageURL: String?
    var createdAt: Date
    var isAIGenerated: Bool
    var listingIntent: DIYListingIntent
}

struct DIYImageGenerationRequest: Encodable {
    var description: String
    var series: String
    var playerSubject: String
    var parallel: String
    var finish: String
    var cardTitle: String
    var cardNumber: String
}

struct DIYImageGenerationResponse: Decodable {
    var imageBase64: String
    var mimeType: String
    var model: String
    var prompt: String

    enum CodingKeys: String, CodingKey {
        case model, prompt
        case imageBase64 = "image_base64"
        case mimeType = "mime_type"
    }
}

struct DIYGeneratedImage {
    var data: Data
    var model: String
    var prompt: String
}

struct AuthUser: Codable {
    struct Metadata: Codable { var name: String? }

    var id: UUID
    var email: String?
    var userMetadata: Metadata?

    enum CodingKeys: String, CodingKey {
        case id, email
        case userMetadata = "user_metadata"
    }
}

struct SupabaseSession: Codable {
    var accessToken: String
    var refreshToken: String
    var expiresIn: Int
    var user: AuthUser

    enum CodingKeys: String, CodingKey {
        case user
        case accessToken = "access_token"
        case refreshToken = "refresh_token"
        case expiresIn = "expires_in"
    }
}

struct AuthResponse: Codable {
    var accessToken: String?
    var refreshToken: String?
    var expiresIn: Int?
    var user: AuthUser?

    enum CodingKeys: String, CodingKey {
        case user
        case accessToken = "access_token"
        case refreshToken = "refresh_token"
        case expiresIn = "expires_in"
    }

    var session: SupabaseSession? {
        guard let accessToken, let refreshToken, let user else { return nil }
        return SupabaseSession(accessToken: accessToken, refreshToken: refreshToken, expiresIn: expiresIn ?? 3600, user: user)
    }
}

struct AuthCapabilities: Equatable {
    var phoneEnabled: Bool?
    var weChatProviderConfigured: Bool?
    var nativeWeChatConfigured = false
    var weChatInstalled = false
}

enum PhoneNumberInputError: LocalizedError {
    case invalidMainlandChina
    case invalidInternational

    var errorDescription: String? {
        switch self {
        case .invalidMainlandChina:
            String(localized: "请输入有效的中国大陆手机号，例如 138 0000 0000。")
        case .invalidInternational:
            String(localized: "请输入有效的手机号码。")
        }
    }
}

enum PhoneNumberNormalizer {
    static func normalize(_ rawValue: String, countryCode: String) throws -> String {
        var digits = rawValue.filter(\.isNumber)
        let prefix = countryCode.filter(\.isNumber)

        if digits.hasPrefix("00\(prefix)") {
            digits.removeFirst(prefix.count + 2)
        } else if digits.hasPrefix(prefix) {
            digits.removeFirst(prefix.count)
        }

        if countryCode == "+86" {
            guard digits.count == 11,
                  digits.first == "1",
                  let second = digits.dropFirst().first,
                  "3456789".contains(second) else {
                throw PhoneNumberInputError.invalidMainlandChina
            }
            return "+86\(digits)"
        }

        if countryCode == "+852" {
            guard digits.count == 8, let first = digits.first, "56789".contains(first) else {
                throw PhoneNumberInputError.invalidInternational
            }
            return "+852\(digits)"
        }

        if countryCode == "+1" {
            if digits.count == 11, digits.first == "1" { digits.removeFirst() }
            guard digits.count == 10 else { throw PhoneNumberInputError.invalidInternational }
            return "+1\(digits)"
        }

        if countryCode == "+81" {
            if digits.first == "0" { digits.removeFirst() }
            guard (9...10).contains(digits.count) else { throw PhoneNumberInputError.invalidInternational }
            return "+81\(digits)"
        }

        guard (6...15).contains(digits.count) else { throw PhoneNumberInputError.invalidInternational }
        return "+\(prefix)\(digits)"
    }
}
