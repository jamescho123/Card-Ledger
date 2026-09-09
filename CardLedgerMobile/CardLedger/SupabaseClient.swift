import Foundation
import Security
import UIKit

enum SupabaseError: LocalizedError {
    case invalidResponse
    case message(String)

    var errorDescription: String? {
        switch self {
        case .invalidResponse: "The server returned an invalid response."
        case .message(let message): message
        }
    }
}

private struct ErrorPayload: Decodable {
    var message: String?
    var msg: String?
    var errorDescription: String?

    enum CodingKeys: String, CodingKey {
        case message, msg
        case errorDescription = "error_description"
    }
}

private struct AuthSettingsPayload: Decodable {
    var external: [String: Bool]
}

private struct ProfileWrite: Encodable {
    var id: UUID
    var email: String
    var name: String
    var avatar: String?
    var description: String?
    var age: String?
    var location: String?
}

private struct CardRecord: Decodable {
    var id: String
    var sport: String?
    var year: String
    var brand: String?
    var setName: String
    var player: String
    var cardType: String
    var parallel: String
    var cardNumber: String
    var grade: String?
    var paid: Double
    var estimatedValue: Double
    var imageURL: String?
    var certification: String?
    var psaPopulation: PSAPopulationRecord?
    var createdAt: String

    enum CodingKeys: String, CodingKey {
        case id, sport, year, brand, player, parallel, grade, paid, certification
        case setName = "set_name"
        case cardType = "card_type"
        case cardNumber = "card_number"
        case estimatedValue = "estimated_value"
        case imageURL = "image_url"
        case psaPopulation = "psa_population"
        case createdAt = "created_at"
    }

    var card: CardItem {
        CardItem(
            id: id,
            sport: sport,
            year: year,
            brand: brand?.isEmpty == false ? brand : nil,
            set: setName,
            player: player,
            type: cardType,
            parallel: parallel,
            number: cardNumber,
            grade: grade,
            paidPrice: paid,
            estimatedValue: estimatedValue,
            acquiredAt: ISO8601DateFormatter().date(from: createdAt) ?? .now,
            imageURL: imageURL,
            certification: certification?.isEmpty == false ? certification : nil,
            psaPopulation: psaPopulation
        )
    }
}

private struct CardWrite: Encodable {
    var userID: UUID
    var id: String
    var year: String
    var brand: String
    var setName: String
    var player: String
    var cardType: String
    var parallel: String
    var cardNumber: String
    var grade: String
    var sport: String
    var paid: Double
    var estimatedValue: Double
    var imageURL: String?
    var certification: String
    var psaPopulation: PSAPopulationRecord?

    enum CodingKeys: String, CodingKey {
        case id, year, brand, player, parallel, grade, sport, paid, certification
        case userID = "user_id"
        case setName = "set_name"
        case cardType = "card_type"
        case cardNumber = "card_number"
        case estimatedValue = "estimated_value"
        case imageURL = "image_url"
        case psaPopulation = "psa_population"
    }
}

private struct LegacyCardWrite: Encodable {
    var userID: UUID
    var id: String
    var year: String
    var setName: String
    var player: String
    var cardType: String
    var parallel: String
    var cardNumber: String
    var sport: String
    var paid: Double
    var estimatedValue: Double
    var imageURL: String?

    enum CodingKeys: String, CodingKey {
        case id, year, player, parallel, sport, paid
        case userID = "user_id"
        case setName = "set_name"
        case cardType = "card_type"
        case cardNumber = "card_number"
        case estimatedValue = "estimated_value"
        case imageURL = "image_url"
    }
}

private struct DIYRawPayload: Codable {
    var prompt: String?
    var isAIGenerated: Bool?
    var listingIntent: DIYListingIntent?

    enum CodingKeys: String, CodingKey {
        case prompt
        case isAIGenerated = "is_ai_generated"
        case listingIntent = "listing_intent"
    }
}

private struct DIYCardRecord: Decodable {
    var id: String
    var series: String
    var playerSubject: String
    var parallel: String
    var cardNumber: String
    var finish: String
    var title: String
    var description: String
    var frontImageData: String?
    var rawPayload: DIYRawPayload
    var createdAt: String

    enum CodingKeys: String, CodingKey {
        case id, series, parallel, finish, title, description
        case playerSubject = "player_subject"
        case cardNumber = "card_number"
        case frontImageData = "front_image_data"
        case rawPayload = "raw_payload"
        case createdAt = "created_at"
    }

    var card: DIYCardItem {
        DIYCardItem(
            id: id,
            series: series,
            playerSubject: playerSubject,
            parallel: parallel,
            cardNumber: cardNumber,
            finish: finish,
            title: title,
            description: description,
            prompt: rawPayload.prompt ?? description,
            imageURL: frontImageData.flatMap { CardImageStorage.saveBase64($0, cardID: "diy-\(id)") },
            createdAt: ISO8601DateFormatter().date(from: createdAt) ?? .now,
            isAIGenerated: rawPayload.isAIGenerated ?? false,
            listingIntent: rawPayload.listingIntent ?? .showcase
        )
    }
}

private struct DIYCardWrite: Encodable {
    var userID: UUID
    var id: String
    var series: String
    var playerSubject: String
    var parallel: String
    var cardNumber: String
    var finish: String
    var title: String
    var description: String
    var frontImageData: String?
    var rawPayload: DIYRawPayload

    enum CodingKeys: String, CodingKey {
        case id, series, parallel, finish, title, description
        case userID = "user_id"
        case playerSubject = "player_subject"
        case cardNumber = "card_number"
        case frontImageData = "front_image_data"
        case rawPayload = "raw_payload"
    }
}

final class SupabaseClient {
    static let shared = SupabaseClient()

    private let projectURL = URL(string: "https://wmvffpuxrdbsexryazxu.supabase.co")!
    private let publishableKey = "sb_publishable_UX6CZtL82HAKn1zLzgfEtQ_-eqDXD4Q"
    private let encoder = JSONEncoder()
    private let decoder = JSONDecoder()

    func signUp(name: String, email: String, password: String) async throws -> AuthResponse {
        let body: [String: Any] = [
            "email": email.lowercased(),
            "password": password,
            "data": ["name": name]
        ]
        return try await authRequest(path: "signup", body: body)
    }

    func signIn(email: String, password: String) async throws -> SupabaseSession {
        let response = try await authRequest(
            path: "token?grant_type=password",
            body: ["email": email.lowercased(), "password": password]
        )
        guard let session = response.session else { throw SupabaseError.invalidResponse }
        return session
    }

    func sendPhoneOTP(phone: String) async throws {
        _ = try await authRequest(
            path: "otp",
            body: ["phone": phone, "create_user": true]
        )
    }

    func verifyPhoneOTP(phone: String, token: String) async throws -> SupabaseSession {
        let response = try await authRequest(
            path: "verify",
            body: ["phone": phone, "token": token, "type": "sms"]
        )
        guard let session = response.session else { throw SupabaseError.invalidResponse }
        return session
    }

    @MainActor
    func signInWithWeChat() async throws -> SupabaseSession {
        guard WeChatAuthCoordinator.shared.isConfigured else {
            throw WeChatNativeAuthError.configurationMissing
        }
        guard WeChatAuthCoordinator.shared.isWeChatInstalled else {
            throw WeChatNativeAuthError.appNotInstalled
        }

        let oauth = OAuthRedirectClient()
        let authorizeURL = try weChatAuthorizeURL()
        let providerURL = try await oauth.captureRedirect(
            from: authorizedRequest(url: authorizeURL)
        )
        let providerParameters = queryParameters(from: providerURL)
        guard let providerState = providerParameters["state"], !providerState.isEmpty,
              let redirectValue = providerParameters["redirect_uri"],
              let providerCallbackURL = URL(string: redirectValue) else {
            throw SupabaseError.message(
                L10n.string("Supabase 的微信服务商配置无效，请检查授权地址与回调地址。")
            )
        }

        if let providerAppID = providerParameters["appid"] ?? providerParameters["client_id"],
           providerAppID != WeChatAuthCoordinator.shared.appID {
            throw SupabaseError.message(
                L10n.string("微信 App ID 与 Supabase 服务商配置不一致。")
            )
        }

        let code = try await WeChatAuthCoordinator.shared.authorize(state: providerState)
        guard var callbackComponents = URLComponents(
            url: providerCallbackURL,
            resolvingAgainstBaseURL: false
        ) else { throw SupabaseError.invalidResponse }
        var callbackItems = callbackComponents.queryItems ?? []
        callbackItems.removeAll { $0.name == "code" || $0.name == "state" }
        callbackItems.append(URLQueryItem(name: "code", value: code))
        callbackItems.append(URLQueryItem(name: "state", value: providerState))
        callbackComponents.queryItems = callbackItems
        guard let providerResultURL = callbackComponents.url else {
            throw SupabaseError.invalidResponse
        }

        let callbackURL = try await oauth.followRedirectsToApp(
            from: authorizedRequest(url: providerResultURL),
            callbackScheme: "cardledger"
        )

        let parameters = oauthCallbackParameters(from: callbackURL)
        if let error = parameters["error_description"] ?? parameters["error"] {
            throw SupabaseError.message(error.replacingOccurrences(of: "+", with: " "))
        }
        guard let accessToken = parameters["access_token"],
              let refreshToken = parameters["refresh_token"] else {
            throw SupabaseError.message("WeChat login did not return a Supabase session.")
        }
        let user = try await fetchAuthUser(accessToken: accessToken)
        return SupabaseSession(
            accessToken: accessToken,
            refreshToken: refreshToken,
            expiresIn: Int(parameters["expires_in"] ?? "3600") ?? 3600,
            user: user
        )
    }

    @MainActor
    func fetchAuthCapabilities() async -> AuthCapabilities {
        var capabilities = AuthCapabilities(
            nativeWeChatConfigured: WeChatAuthCoordinator.shared.isConfigured,
            weChatInstalled: WeChatAuthCoordinator.shared.isWeChatInstalled
        )
        do {
            let settingsURL = projectURL.appending(path: "auth/v1/settings")
            var settingsRequest = URLRequest(url: settingsURL)
            settingsRequest.setValue(publishableKey, forHTTPHeaderField: "apikey")
            let (settingsData, response) = try await URLSession.shared.data(for: settingsRequest)
            if let http = response as? HTTPURLResponse, 200..<300 ~= http.statusCode {
                capabilities.phoneEnabled = try decoder
                    .decode(AuthSettingsPayload.self, from: settingsData)
                    .external["phone"] == true
            }

            let oauth = OAuthRedirectClient()
            _ = try await oauth.captureRedirect(
                from: authorizedRequest(url: try weChatAuthorizeURL())
            )
            capabilities.weChatProviderConfigured = true
        } catch {
            capabilities.weChatProviderConfigured = false
        }
        return capabilities
    }

    func refresh(refreshToken: String) async throws -> SupabaseSession {
        let response = try await authRequest(
            path: "token?grant_type=refresh_token",
            body: ["refresh_token": refreshToken]
        )
        guard let session = response.session else { throw SupabaseError.invalidResponse }
        return session
    }

    func fetchProfile(userID: UUID, accessToken: String) async throws -> CollectorProfile? {
        let path = "profiles?id=eq.\(userID.uuidString)&select=*"
        let data = try await dataRequest(path: path, method: "GET", accessToken: accessToken)
        return try decoder.decode([CollectorProfile].self, from: data).first
    }

    func saveProfile(_ profile: CollectorProfile, accessToken: String) async throws -> CollectorProfile {
        let payload = ProfileWrite(
            id: profile.id,
            email: profile.email.lowercased(),
            name: profile.name,
            avatar: profile.avatar,
            description: profile.description,
            age: profile.age,
            location: profile.location
        )
        let data = try await dataRequest(
            path: "profiles?on_conflict=id&select=*",
            method: "POST",
            accessToken: accessToken,
            body: try encoder.encode(payload),
            extraHeaders: ["Prefer": "resolution=merge-duplicates,return=representation"]
        )
        guard let saved = try decoder.decode([CollectorProfile].self, from: data).first else {
            throw SupabaseError.invalidResponse
        }
        return saved
    }

    func fetchCards(userID: UUID, accessToken: String) async throws -> [CardItem] {
        let fields = "id,sport,year,brand,set_name,player,card_type,parallel,card_number,grade,paid,estimated_value,image_url,certification,psa_population,created_at"
        let data: Data
        do {
            data = try await dataRequest(
                path: "cards?user_id=eq.\(userID.uuidString)&select=\(fields)&order=created_at.desc",
                method: "GET",
                accessToken: accessToken
            )
        } catch {
            let legacyFields = "id,year,set_name,player,card_type,parallel,card_number,paid,estimated_value,image_url,created_at"
            data = try await dataRequest(
                path: "cards?user_id=eq.\(userID.uuidString)&select=\(legacyFields)&order=created_at.desc",
                method: "GET",
                accessToken: accessToken
            )
        }
        return try decoder.decode([CardRecord].self, from: data).map(\.card)
    }

    func saveCard(_ card: CardItem, userID: UUID, accessToken: String) async throws {
        let brand = card.brand ?? ""
        let sport = card.sport?.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty == false
            ? card.sport!
            : card.normalizedSport
        let payload = CardWrite(
            userID: userID,
            id: card.id,
            year: card.year,
            brand: brand,
            setName: card.set,
            player: card.player,
            cardType: card.type,
            parallel: card.parallel,
            cardNumber: card.number,
            grade: card.grade ?? "",
            sport: sport,
            paid: card.paidPrice,
            estimatedValue: card.estimatedValue,
            imageURL: card.imageURL,
            certification: card.certification ?? "",
            psaPopulation: card.psaPopulation
        )
        do {
            _ = try await dataRequest(
                path: "cards?on_conflict=user_id,id",
                method: "POST",
                accessToken: accessToken,
                body: try encoder.encode(payload),
                extraHeaders: ["Prefer": "resolution=merge-duplicates,return=minimal"]
            )
        } catch {
            let legacy = LegacyCardWrite(
                userID: userID, id: card.id, year: card.year, setName: card.set,
                player: card.player, cardType: card.type, parallel: card.parallel,
                cardNumber: card.number, sport: sport, paid: card.paidPrice,
                estimatedValue: card.estimatedValue, imageURL: card.imageURL
            )
            _ = try await dataRequest(
                path: "cards?on_conflict=user_id,id", method: "POST", accessToken: accessToken,
                body: try encoder.encode(legacy),
                extraHeaders: ["Prefer": "resolution=merge-duplicates,return=minimal"]
            )
        }
    }

    func deleteCard(id: String, userID: UUID, accessToken: String) async throws {
        _ = try await dataRequest(
            path: "cards?user_id=eq.\(userID.uuidString)&id=eq.\(id)",
            method: "DELETE",
            accessToken: accessToken
        )
    }

    func fetchDIYCards(userID: UUID, accessToken: String) async throws -> [DIYCardItem] {
        let fields = "id,series,player_subject,parallel,card_number,finish,title,description,front_image_data,raw_payload,created_at"
        let data = try await dataRequest(
            path: "diy_cards?user_id=eq.\(userID.uuidString)&select=\(fields)&order=created_at.desc",
            method: "GET",
            accessToken: accessToken
        )
        return try decoder.decode([DIYCardRecord].self, from: data).map(\.card)
    }

    func saveDIYCard(_ card: DIYCardItem, userID: UUID, accessToken: String) async throws {
        let imageData = CardImageStorage.data(for: card.imageURL)?.base64EncodedString()
        let payload = DIYCardWrite(
            userID: userID,
            id: card.id,
            series: card.series,
            playerSubject: card.playerSubject,
            parallel: card.parallel,
            cardNumber: card.cardNumber,
            finish: card.finish,
            title: card.title,
            description: card.description,
            frontImageData: imageData,
            rawPayload: DIYRawPayload(
                prompt: card.prompt,
                isAIGenerated: card.isAIGenerated,
                listingIntent: card.listingIntent
            )
        )
        _ = try await dataRequest(
            path: "diy_cards?on_conflict=user_id,id",
            method: "POST",
            accessToken: accessToken,
            body: try encoder.encode(payload),
            extraHeaders: ["Prefer": "resolution=merge-duplicates,return=minimal"]
        )
    }

    func deleteDIYCard(id: String, userID: UUID, accessToken: String) async throws {
        _ = try await dataRequest(
            path: "diy_cards?user_id=eq.\(userID.uuidString)&id=eq.\(id)",
            method: "DELETE",
            accessToken: accessToken
        )
    }

    func fetchAccountStats(userID: UUID, accessToken: String) async throws -> AccountStats {
        async let followers = countRequest(path: "follows?following_id=eq.\(userID.uuidString)", accessToken: accessToken)
        async let following = countRequest(path: "follows?follower_id=eq.\(userID.uuidString)", accessToken: accessToken)
        return try await AccountStats(followers: followers, following: following)
    }

    func fetchSubscription(userID: UUID, accessToken: String) async throws -> UserSubscription? {
        let data = try await dataRequest(
            path: "user_subscriptions?user_id=eq.\(userID.uuidString)&status=eq.active&select=plan_code,status,current_period_end&order=current_period_end.desc.nullslast&limit=1",
            method: "GET",
            accessToken: accessToken
        )
        return try decoder.decode([UserSubscription].self, from: data).first
    }

    func searchPSAPopulation(query: String, accessToken: String) async throws -> [PSAPopulationRecord] {
        let body = try JSONSerialization.data(withJSONObject: ["search_text": query, "result_limit": 25])
        let data = try await dataRequest(
            path: "rpc/search_psa_population",
            method: "POST",
            accessToken: accessToken,
            body: body
        )
        return try decoder.decode([PSAPopulationRecord].self, from: data)
    }

    func lookupPSACert(_ certNumber: String, accessToken: String) async throws -> PSAPopulationRecord {
        struct Response: Decodable { var record: PSAPopulationRecord }
        let data = try await functionRequest(
            name: "market-data",
            accessToken: accessToken,
            body: try JSONSerialization.data(withJSONObject: ["action": "psa-cert", "certNumber": certNumber])
        )
        return try decoder.decode(Response.self, from: data).record
    }

    func generateDIYImage(_ request: DIYImageGenerationRequest, accessToken: String) async throws -> DIYImageGenerationResponse {
        let data = try await functionRequest(
            name: "generate-diy-card",
            accessToken: accessToken,
            body: try encoder.encode(request)
        )
        return try decoder.decode(DIYImageGenerationResponse.self, from: data)
    }

    private func authRequest(path: String, body: [String: Any]) async throws -> AuthResponse {
        guard let url = URL(string: "\(projectURL.absoluteString)/auth/v1/\(path)") else { throw SupabaseError.invalidResponse }
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.httpBody = try JSONSerialization.data(withJSONObject: body)
        request.setValue(publishableKey, forHTTPHeaderField: "apikey")
        request.setValue("Bearer \(publishableKey)", forHTTPHeaderField: "Authorization")
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        let data = try await send(request)
        return try decoder.decode(AuthResponse.self, from: data)
    }

    private func weChatAuthorizeURL() throws -> URL {
        var components = URLComponents(
            url: projectURL.appending(path: "auth/v1/authorize"),
            resolvingAgainstBaseURL: false
        )
        components?.queryItems = [
            URLQueryItem(name: "provider", value: "custom:wechat"),
            URLQueryItem(name: "redirect_to", value: "cardledger://auth-callback")
        ]
        guard let url = components?.url else { throw SupabaseError.invalidResponse }
        return url
    }

    private func authorizedRequest(url: URL) -> URLRequest {
        var request = URLRequest(url: url)
        request.setValue(publishableKey, forHTTPHeaderField: "apikey")
        request.setValue("Bearer \(publishableKey)", forHTTPHeaderField: "Authorization")
        return request
    }

    private func functionRequest(name: String, accessToken: String, body: Data) async throws -> Data {
        guard let url = URL(string: "\(projectURL.absoluteString)/functions/v1/\(name)") else { throw SupabaseError.invalidResponse }
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.httpBody = body
        request.setValue(publishableKey, forHTTPHeaderField: "apikey")
        request.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        return try await send(request)
    }

    private func fetchAuthUser(accessToken: String) async throws -> AuthUser {
        let url = projectURL.appending(path: "auth/v1/user")
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        request.setValue(publishableKey, forHTTPHeaderField: "apikey")
        request.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        return try decoder.decode(AuthUser.self, from: await send(request))
    }

    private func oauthCallbackParameters(from url: URL) -> [String: String] {
        var values: [String: String] = [:]
        URLComponents(url: url, resolvingAgainstBaseURL: false)?.queryItems?.forEach {
            values[$0.name] = $0.value
        }
        if let fragment = url.fragment,
           let items = URLComponents(string: "?\(fragment)")?.queryItems {
            items.forEach { values[$0.name] = $0.value }
        }
        return values
    }

    private func queryParameters(from url: URL) -> [String: String] {
        var values: [String: String] = [:]
        URLComponents(url: url, resolvingAgainstBaseURL: false)?.queryItems?.forEach {
            values[$0.name] = $0.value
        }
        return values
    }

    private func dataRequest(
        path: String,
        method: String,
        accessToken: String,
        body: Data? = nil,
        extraHeaders: [String: String] = [:]
    ) async throws -> Data {
        guard let url = URL(string: "\(projectURL.absoluteString)/rest/v1/\(path)") else { throw SupabaseError.invalidResponse }
        var request = URLRequest(url: url)
        request.httpMethod = method
        request.httpBody = body
        request.setValue(publishableKey, forHTTPHeaderField: "apikey")
        request.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        extraHeaders.forEach { request.setValue($1, forHTTPHeaderField: $0) }
        return try await send(request)
    }

    private func countRequest(path: String, accessToken: String) async throws -> Int {
        guard let url = URL(string: "\(projectURL.absoluteString)/rest/v1/\(path)") else { throw SupabaseError.invalidResponse }
        var request = URLRequest(url: url)
        request.httpMethod = "HEAD"
        request.setValue(publishableKey, forHTTPHeaderField: "apikey")
        request.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        request.setValue("count=exact", forHTTPHeaderField: "Prefer")
        let (_, response) = try await URLSession.shared.data(for: request)
        guard let http = response as? HTTPURLResponse, 200..<300 ~= http.statusCode else {
            throw SupabaseError.invalidResponse
        }
        guard let range = http.value(forHTTPHeaderField: "Content-Range"),
              let total = range.split(separator: "/").last.flatMap({ Int($0) }) else { return 0 }
        return total
    }

    private func send(_ request: URLRequest) async throws -> Data {
        let (data, response) = try await URLSession.shared.data(for: request)
        guard let http = response as? HTTPURLResponse else { throw SupabaseError.invalidResponse }
        guard 200..<300 ~= http.statusCode else {
            let payload = try? decoder.decode(ErrorPayload.self, from: data)
            let message = payload?.message ?? payload?.msg ?? payload?.errorDescription ?? "Request failed (\(http.statusCode))."
            throw SupabaseError.message(message)
        }
        return data
    }
}

private final class OAuthRedirectClient: NSObject, URLSessionTaskDelegate {
    private var redirectURL: URL?
    private lazy var session = URLSession(
        configuration: .default,
        delegate: self,
        delegateQueue: nil
    )

    func captureRedirect(from request: URLRequest) async throws -> URL {
        redirectURL = nil
        let (data, response) = try await session.data(for: request)
        if let redirectURL { return redirectURL }

        let status = (response as? HTTPURLResponse)?.statusCode ?? 0
        if let payload = try? JSONDecoder().decode(ErrorPayload.self, from: data),
           let message = payload.message ?? payload.msg ?? payload.errorDescription {
            throw SupabaseError.message(message)
        }
        throw SupabaseError.message("OAuth did not return a redirect (\(status)).")
    }

    func followRedirectsToApp(
        from initialRequest: URLRequest,
        callbackScheme: String
    ) async throws -> URL {
        var request = initialRequest
        for _ in 0..<5 {
            let destination = try await captureRedirect(from: request)
            if destination.scheme?.lowercased() == callbackScheme.lowercased() {
                return destination
            }
            request = URLRequest(url: destination)
        }
        throw SupabaseError.message("OAuth did not return to Card Ledger.")
    }

    func urlSession(
        _ session: URLSession,
        task: URLSessionTask,
        willPerformHTTPRedirection response: HTTPURLResponse,
        newRequest request: URLRequest,
        completionHandler: @escaping (URLRequest?) -> Void
    ) {
        redirectURL = request.url
        completionHandler(nil)
    }
}

enum SessionVault {
    private static let service = "com.jumbosoft.cardledger"
    private static let account = "supabase-session"
    private static let simulatorFallbackKey = "mobile.supabase-session.simulator"

    static func save(_ session: SupabaseSession) throws {
        let data = try JSONEncoder().encode(session)
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: account
        ]
        let attributes: [String: Any] = [
            kSecValueData as String: data,
            kSecAttrAccessible as String: kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly
        ]
        var status = SecItemUpdate(query as CFDictionary, attributes as CFDictionary)
        if status == errSecItemNotFound {
            var item = query
            attributes.forEach { item[$0] = $1 }
            status = SecItemAdd(item as CFDictionary, nil)
        }
        guard status == errSecSuccess else {
#if targetEnvironment(simulator)
            UserDefaults.standard.set(data, forKey: simulatorFallbackKey)
            return
#else
            let detail = SecCopyErrorMessageString(status, nil) as String? ?? "OSStatus \(status)"
            throw SupabaseError.message("Could not store the secure session: \(detail)")
#endif
        }
#if targetEnvironment(simulator)
        UserDefaults.standard.removeObject(forKey: simulatorFallbackKey)
#endif
    }

    static func load() -> SupabaseSession? {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: account,
            kSecReturnData as String: true,
            kSecMatchLimit as String: kSecMatchLimitOne
        ]
        var result: AnyObject?
        let status = SecItemCopyMatching(query as CFDictionary, &result)
        if status == errSecSuccess, let data = result as? Data {
            return try? JSONDecoder().decode(SupabaseSession.self, from: data)
        }
#if targetEnvironment(simulator)
        guard let data = UserDefaults.standard.data(forKey: simulatorFallbackKey) else { return nil }
        return try? JSONDecoder().decode(SupabaseSession.self, from: data)
#else
        return nil
#endif
    }

    static func clear() {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: account
        ]
        SecItemDelete(query as CFDictionary)
#if targetEnvironment(simulator)
        UserDefaults.standard.removeObject(forKey: simulatorFallbackKey)
#endif
    }
}
