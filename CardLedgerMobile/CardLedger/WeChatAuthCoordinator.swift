import Foundation
import UIKit

enum WeChatNativeAuthError: LocalizedError {
    case configurationMissing
    case appNotInstalled
    case registrationFailed
    case launchFailed
    case cancelled
    case denied
    case invalidResponse

    var errorDescription: String? {
        switch self {
        case .configurationMissing:
            String(localized: "微信登录尚未配置。请先添加微信开放平台 App ID、Universal Link，并在 Supabase 启用 custom:wechat。")
        case .appNotInstalled:
            String(localized: "未检测到微信。请先安装并登录微信后再试。")
        case .registrationFailed:
            String(localized: "微信登录初始化失败。请检查 App ID、URL Scheme 与 Universal Link。")
        case .launchFailed:
            String(localized: "无法打开微信授权页面，请稍后重试。")
        case .cancelled:
            String(localized: "你已取消微信授权。")
        case .denied:
            String(localized: "微信授权未获允许。")
        case .invalidResponse:
            String(localized: "微信没有返回有效的登录凭证。")
        }
    }
}

#if targetEnvironment(simulator)
@MainActor
final class WeChatAuthCoordinator {
    static let shared = WeChatAuthCoordinator()

    var appID: String {
        (Bundle.main.object(forInfoDictionaryKey: "WeChatAppID") as? String)?
            .trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
    }

    var universalLink: String {
        (Bundle.main.object(forInfoDictionaryKey: "WeChatUniversalLink") as? String)?
            .trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
    }

    var isConfigured: Bool {
        appID.hasPrefix("wx")
            && appID != "wx0000000000000000"
            && URL(string: universalLink)?.scheme == "https"
    }

    var isWeChatInstalled: Bool { false }

    @discardableResult
    func registerIfConfigured() -> Bool { false }

    func authorize(state: String) async throws -> String {
        throw WeChatNativeAuthError.appNotInstalled
    }

    func handleOpenURL(_ url: URL) -> Bool { false }
    func handleUniversalLink(_ userActivity: NSUserActivity) -> Bool { false }
}
#else
@MainActor
final class WeChatAuthCoordinator: NSObject, @preconcurrency WXApiDelegate {
    static let shared = WeChatAuthCoordinator()

    private var continuation: CheckedContinuation<String, Error>?
    private var expectedState = ""
    private var isRegistered = false

    private override init() {
        super.init()
    }

    var appID: String {
        (Bundle.main.object(forInfoDictionaryKey: "WeChatAppID") as? String)?
            .trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
    }

    var universalLink: String {
        (Bundle.main.object(forInfoDictionaryKey: "WeChatUniversalLink") as? String)?
            .trimmingCharacters(in: .whitespacesAndNewlines) ?? ""
    }

    var isConfigured: Bool {
        appID.hasPrefix("wx")
            && appID != "wx0000000000000000"
            && URL(string: universalLink)?.scheme == "https"
    }

    var isWeChatInstalled: Bool {
        isConfigured && WXApi.isWXAppInstalled()
    }

    @discardableResult
    func registerIfConfigured() -> Bool {
        guard isConfigured else { return false }
        if isRegistered { return true }
        isRegistered = WXApi.registerApp(appID, universalLink: universalLink)
        return isRegistered
    }

    func authorize(state: String) async throws -> String {
        guard isConfigured else { throw WeChatNativeAuthError.configurationMissing }
        guard registerIfConfigured() else { throw WeChatNativeAuthError.registrationFailed }
        guard WXApi.isWXAppInstalled() else { throw WeChatNativeAuthError.appNotInstalled }
        guard continuation == nil else { throw WeChatNativeAuthError.launchFailed }

        return try await withCheckedThrowingContinuation { continuation in
            self.continuation = continuation
            expectedState = state

            let request = SendAuthReq()
            request.scope = "snsapi_userinfo"
            request.state = state
            WXApi.send(request) { [weak self] success in
                guard !success, let self else { return }
                Task { @MainActor in
                    self.finish(.failure(WeChatNativeAuthError.launchFailed))
                }
            }
        }
    }

    func handleOpenURL(_ url: URL) -> Bool {
        WXApi.handleOpen(url, delegate: self)
    }

    func handleUniversalLink(_ userActivity: NSUserActivity) -> Bool {
        WXApi.handleOpenUniversalLink(userActivity, delegate: self)
    }

    func onResp(_ response: BaseResp) {
        guard let response = response as? SendAuthResp else { return }
        guard response.state == expectedState else {
            finish(.failure(WeChatNativeAuthError.invalidResponse))
            return
        }
        switch response.errCode {
        case 0:
            guard let code = response.code, !code.isEmpty else {
                finish(.failure(WeChatNativeAuthError.invalidResponse))
                return
            }
            finish(.success(code))
        case -2:
            finish(.failure(WeChatNativeAuthError.cancelled))
        case -4:
            finish(.failure(WeChatNativeAuthError.denied))
        default:
            finish(.failure(WeChatNativeAuthError.invalidResponse))
        }
    }

    func onNeedGrantReadPasteBoardPermission(
        with openURL: URL,
        completion: @escaping WXGrantReadPasteBoardPermissionCompletion
    ) {
        _ = completion()
    }

    private func finish(_ result: Result<String, Error>) {
        let pending = continuation
        continuation = nil
        expectedState = ""
        pending?.resume(with: result)
    }
}
#endif

final class CardLedgerAppDelegate: NSObject, UIApplicationDelegate {
    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
    ) -> Bool {
        Task { @MainActor in
            WeChatAuthCoordinator.shared.registerIfConfigured()
        }
        return true
    }

    func application(
        _ app: UIApplication,
        open url: URL,
        options: [UIApplication.OpenURLOptionsKey: Any] = [:]
    ) -> Bool {
        MainActor.assumeIsolated {
            WeChatAuthCoordinator.shared.handleOpenURL(url)
        }
    }

    func application(
        _ application: UIApplication,
        continue userActivity: NSUserActivity,
        restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void
    ) -> Bool {
        MainActor.assumeIsolated {
            WeChatAuthCoordinator.shared.handleUniversalLink(userActivity)
        }
    }
}
