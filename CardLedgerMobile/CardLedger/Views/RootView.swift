import SwiftUI

struct RootView: View {
    @EnvironmentObject private var store: AppStore

    var body: some View {
        Group {
            if store.isStarting {
                VStack(spacing: 14) {
                    Image(systemName: "shield.lefthalf.filled").font(.system(size: 48)).foregroundStyle(LedgerTheme.mint)
                    ProgressView().tint(LedgerTheme.mint)
                    Text("正在打开卡藏账本").foregroundStyle(LedgerTheme.secondary)
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity).stitchScreen()
            } else if store.session == nil { AuthView() }
            else { MainTabView() }
        }
        .tint(LedgerTheme.mint)
        .alert("卡藏账本", isPresented: messagePresented) {
            Button("确定") { store.message = nil }
        } message: { Text(LocalizedStringKey(store.message ?? "")) }
    }

    private var messagePresented: Binding<Bool> {
        Binding(get: { store.message != nil }, set: { if !$0 { store.message = nil } })
    }
}

struct AuthView: View {
    private enum AuthMethod: String, CaseIterable, Identifiable {
        case email, phone, wechat

        var id: String { rawValue }
        var title: LocalizedStringKey {
            switch self {
            case .email: "邮箱"
            case .phone: "手机号"
            case .wechat: "微信"
            }
        }
        var icon: String {
            switch self {
            case .email: "envelope.fill"
            case .phone: "iphone"
            case .wechat: "bubble.left.and.bubble.right.fill"
            }
        }
    }

    private enum Field: Hashable { case name, email, password, phone, code }

    @EnvironmentObject private var store: AppStore
    @State private var mode = 0
    @State private var name = ""
    @State private var email = ""
    @State private var password = ""
    @State private var authMethod: AuthMethod = .email
    @State private var countryCode = "+86"
    @State private var phone = ""
    @State private var verificationCode = ""
    @State private var otpSent = false
    @State private var resendSeconds = 0
    @State private var phoneValidationMessage = ""
    @State private var cardOffset = 90.0
    @State private var cardOpacity = 0.0
    @FocusState private var focusedField: Field?

    init() {
#if DEBUG
        let arguments = ProcessInfo.processInfo.arguments
        if let index = arguments.firstIndex(of: "-CardLedgerAuthMethod"),
           arguments.indices.contains(index + 1),
           let method = AuthMethod(rawValue: arguments[index + 1]) {
            _authMethod = State(initialValue: method)
        }
        if let index = arguments.firstIndex(of: "-CardLedgerPhone"),
           arguments.indices.contains(index + 1) {
            _phone = State(initialValue: arguments[index + 1])
        }
#endif
    }

    var body: some View {
        GeometryReader { proxy in
            ScrollView {
                VStack(spacing: 24) {
                HStack(spacing: 10) {
                    Image(systemName: "shield.lefthalf.filled").font(.title.bold())
                    Text("卡藏").font(.title.bold())
                    Spacer()
                    StatusPill(text: "移动 App", color: LedgerTheme.gold)
                }
                .foregroundStyle(LedgerTheme.mint)

                VStack(spacing: 8) {
                    Text("卡藏账本").font(.system(size: 46, weight: .bold)).foregroundStyle(LedgerTheme.gold)
                    Text("每一张卡，都值得被看清。").font(.title3).foregroundStyle(LedgerTheme.secondary)
                }
                .padding(.top, 26)

                ZStack {
                    RemoteCardImage(url: StitchAssets.hero)
                        .frame(maxWidth: .infinity)
                        .frame(height: 270)
                        .overlay { LinearGradient(colors: [.clear, LedgerTheme.background.opacity(0.7)], startPoint: .center, endPoint: .bottom) }
                    ForEach(Array([StitchAssets.cardOne, StitchAssets.cardTwo, StitchAssets.cardThree].enumerated()), id: \.offset) { index, image in
                        RemoteCardImage(url: image).frame(width: 130, height: 190)
                            .clipShape(RoundedRectangle(cornerRadius: 8))
                            .overlay { RoundedRectangle(cornerRadius: 8).stroke(LedgerTheme.gold.opacity(0.45)) }
                            .rotationEffect(.degrees(Double(index - 1) * 13))
                            .offset(x: Double(index - 1) * 52, y: index == 1 ? -8 : 30)
                    }
                }
                .frame(maxWidth: .infinity)
                .frame(height: 285)
                .clipped()
                .offset(y: cardOffset).opacity(cardOpacity)
                .onAppear {
                    withAnimation(.spring(response: 1.05, dampingFraction: 0.82)) { cardOffset = 0; cardOpacity = 1 }
                }

                VStack(spacing: 14) {
                    HStack(spacing: 8) {
                        ForEach(AuthMethod.allCases) { method in
                            Button {
                                authMethod = method
                                focusedField = nil
                            } label: {
                                VStack(spacing: 6) {
                                    Image(systemName: method.icon).font(.body.weight(.semibold))
                                    Text(method.title).font(.caption.weight(.semibold))
                                }
                                .frame(maxWidth: .infinity, minHeight: 48)
                                .foregroundStyle(authMethod == method ? LedgerTheme.background : LedgerTheme.secondary)
                                .background(authMethod == method ? LedgerTheme.mint : LedgerTheme.raised, in: RoundedRectangle(cornerRadius: 7))
                            }
                            .buttonStyle(.plain)
                        }
                    }

                    switch authMethod {
                    case .email:
                        Picker("账户操作", selection: $mode) {
                            Text("登录").tag(0)
                            Text("注册").tag(1)
                        }.pickerStyle(.segmented)

                        if mode == 1 {
                            authField("收藏家名称") {
                                TextField("收藏家名称", text: $name)
                                    .textContentType(.name)
                                    .focused($focusedField, equals: .name)
                                    .submitLabel(.next)
                                    .onSubmit { focusedField = .email }
                            }
                        }
                        authField("电子邮箱") {
                            TextField("name@example.com", text: $email)
                                .textContentType(.emailAddress)
                                .textInputAutocapitalization(.never)
                                .keyboardType(.emailAddress)
                                .autocorrectionDisabled()
                                .focused($focusedField, equals: .email)
                                .submitLabel(.next)
                                .onSubmit { focusedField = .password }
                        }
                        authField("密码") {
                            SecureField("••••••••", text: $password)
                                .textContentType(mode == 0 ? .password : .newPassword)
                                .focused($focusedField, equals: .password)
                                .submitLabel(.done)
                                .onSubmit { focusedField = nil }
                        }

                        Button {
                            Task {
                                if mode == 0 { await store.signIn(email: email, password: password) }
                                else { await store.signUp(name: name, email: email, password: password) }
                            }
                        } label: {
                            HStack { if store.isWorking { ProgressView() }; Text(LocalizedStringKey(mode == 0 ? "登录" : "立即开始")); Image(systemName: "arrow.right") }
                        }
                        .buttonStyle(PrimaryActionStyle())
                        .disabled(email.isEmpty || password.count < 6 || (mode == 1 && name.isEmpty) || store.isWorking)

                    case .phone:
                        authField("手机号码") {
                            HStack(spacing: 12) {
                                Picker("国家或地区代码", selection: $countryCode) {
                                    Text("中国 +86").tag("+86")
                                    Text("香港 +852").tag("+852")
                                    Text("美国 +1").tag("+1")
                                    Text("日本 +81").tag("+81")
                                }
                                .labelsHidden()
                                .frame(width: 104)

                                Divider().frame(height: 25)
                                TextField("请输入手机号", text: $phone)
                                    .textContentType(.telephoneNumber)
                                    .keyboardType(.phonePad)
                                    .focused($focusedField, equals: .phone)
                                    .onChange(of: phone) {
                                        phoneValidationMessage = ""
                                        if otpSent {
                                            otpSent = false
                                            verificationCode = ""
                                        }
                                    }
                            }
                        }

                        if store.authCapabilities.phoneEnabled == false {
                            Label(
                                "云端短信尚未启用",
                                systemImage: "exclamationmark.triangle.fill"
                            )
                            .font(.caption.weight(.semibold))
                            .foregroundStyle(LedgerTheme.gold)
                            .frame(maxWidth: .infinity, alignment: .leading)
                        } else if !phoneValidationMessage.isEmpty {
                            Text(phoneValidationMessage)
                                .font(.caption.weight(.semibold))
                                .foregroundStyle(.red.opacity(0.9))
                                .frame(maxWidth: .infinity, alignment: .leading)
                        } else {
                            Text(countryCode == "+86"
                                 ? "中国大陆手机号将以 +86 1xxxxxxxxxx 发送"
                                 : "号码将转换为国际 E.164 格式")
                                .font(.caption)
                                .foregroundStyle(LedgerTheme.secondary)
                                .frame(maxWidth: .infinity, alignment: .leading)
                        }

                        if otpSent {
                            authField("短信验证码") {
                                TextField("6 位验证码", text: $verificationCode)
                                    .textContentType(.oneTimeCode)
                                    .keyboardType(.numberPad)
                                    .focused($focusedField, equals: .code)
                            }
                        }

                        Button {
                            Task {
                                do {
                                    let normalizedPhone = try PhoneNumberNormalizer.normalize(
                                        phone,
                                        countryCode: countryCode
                                    )
                                    phoneValidationMessage = ""
                                    if otpSent {
                                        await store.verifyPhoneOTP(phone: normalizedPhone, token: verificationCode)
                                    } else if await store.requestPhoneOTP(phone: normalizedPhone) {
                                        otpSent = true
                                        focusedField = .code
                                        startResendCountdown()
                                    }
                                } catch {
                                    phoneValidationMessage = error.localizedDescription
                                }
                            }
                        } label: {
                            HStack {
                                if store.isWorking { ProgressView() }
                                Text(LocalizedStringKey(otpSent ? "验证并登录" : "获取验证码"))
                                Image(systemName: otpSent ? "checkmark.shield" : "message.fill")
                            }
                        }
                        .buttonStyle(PrimaryActionStyle())
                        .disabled(!phoneIsValid || (otpSent && verificationCode.count != 6) || store.isWorking)

                        if otpSent {
                            Button {
                                Task {
                                    guard let normalizedPhone = try? PhoneNumberNormalizer.normalize(
                                        phone,
                                        countryCode: countryCode
                                    ) else { return }
                                    if await store.requestPhoneOTP(phone: normalizedPhone) {
                                        startResendCountdown()
                                    }
                                }
                            } label: {
                                if resendSeconds > 0 { Text("\(resendSeconds)s") }
                                else { Text("重新发送验证码") }
                            }
                            .font(.caption.weight(.semibold))
                            .foregroundStyle(LedgerTheme.mint)
                            .disabled(resendSeconds > 0 || store.isWorking)
                        }

                    case .wechat:
                        VStack(spacing: 12) {
                            Image(systemName: "bubble.left.and.bubble.right.fill")
                                .font(.system(size: 42, weight: .semibold))
                                .foregroundStyle(Color(red: 0.12, green: 0.78, blue: 0.35))
                            Text("使用微信安全登录").font(.headline)
                            if store.authCapabilities.weChatProviderConfigured == false {
                                Text("Supabase 微信服务商尚未启用")
                                    .font(.caption)
                                    .foregroundStyle(LedgerTheme.gold)
                            } else if !store.authCapabilities.nativeWeChatConfigured {
                                Text("需要配置微信 App ID 与 Universal Link")
                                    .font(.caption)
                                    .foregroundStyle(LedgerTheme.gold)
                            } else if !store.authCapabilities.weChatInstalled {
                                Text("请先安装并登录微信")
                                    .font(.caption)
                                    .foregroundStyle(LedgerTheme.secondary)
                            } else {
                                Label("将在微信 App 中请求授权", systemImage: "checkmark.shield.fill")
                                    .font(.caption)
                                    .foregroundStyle(LedgerTheme.mint)
                            }
                        }
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 12)

                        Button {
                            Task { await store.signInWithWeChat() }
                        } label: {
                            HStack {
                                if store.isWorking { ProgressView() }
                                Text("前往微信授权")
                                Image(systemName: "arrow.up.forward.app")
                            }
                        }
                        .buttonStyle(PrimaryActionStyle())
                        .disabled(store.isWorking)
                    }
                }
                .textFieldStyle(.plain)
                .padding(18)
                .background(LedgerTheme.surface, in: RoundedRectangle(cornerRadius: 8))
                .overlay { RoundedRectangle(cornerRadius: 8).stroke(LedgerTheme.border) }

                HStack {
                    Label("加密存储", systemImage: "checkmark.shield")
                    Spacer()
                    Label("云端同步", systemImage: "arrow.triangle.2.circlepath")
                    Spacer()
                    Label("资产确权", systemImage: "shippingbox")
                }
                .font(.caption).foregroundStyle(.secondary)
                }
                .frame(width: max(0, proxy.size.width - 40))
                .padding(.horizontal, 20)
                .padding(.vertical, 20)
            }
            .scrollDismissesKeyboard(.interactively)
        }
        .toolbar {
            ToolbarItemGroup(placement: .keyboard) {
                Spacer()
                Button("确定") { focusedField = nil }
            }
        }
        .task {
            await store.refreshAuthCapabilities()
        }
        .stitchScreen()
    }

    private func authField<Content: View>(_ title: LocalizedStringKey, @ViewBuilder content: () -> Content) -> some View {
        VStack(alignment: .leading, spacing: 7) {
            Text(title).font(.caption.weight(.semibold)).foregroundStyle(LedgerTheme.secondary)
            content()
                .frame(maxWidth: .infinity, minHeight: 30, alignment: .leading)
        }
        .padding(.horizontal, 14).padding(.vertical, 10)
        .background(LedgerTheme.background, in: RoundedRectangle(cornerRadius: 7))
        .overlay { RoundedRectangle(cornerRadius: 7).stroke(LedgerTheme.greenBorder) }
        .contentShape(Rectangle())
    }

    private var phoneIsValid: Bool {
        (try? PhoneNumberNormalizer.normalize(phone, countryCode: countryCode)) != nil
    }

    private func startResendCountdown() {
        resendSeconds = 60
        Task {
            while resendSeconds > 0 {
                try? await Task.sleep(for: .seconds(1))
                if Task.isCancelled { return }
                resendSeconds -= 1
            }
        }
    }
}

enum AppTab: Hashable { case portfolio, collection, add, goals, account }

struct MainTabView: View {
    @State private var selection: AppTab

    init() {
        let arguments = ProcessInfo.processInfo.arguments
        let requested = arguments.firstIndex(of: "-CardLedgerTab").flatMap { arguments.indices.contains($0 + 1) ? arguments[$0 + 1] : nil }
        let tab: AppTab = switch requested {
        case "collection": .collection
        case "add": .add
        case "goals": .goals
        case "account": .account
        default: .portfolio
        }
        _selection = State(initialValue: tab)
    }

    var body: some View {
        TabView(selection: $selection) {
            DashboardView().tag(AppTab.portfolio).tabItem { Label("资产", systemImage: "wallet.bifold") }
            CollectionView().tag(AppTab.collection).tabItem { Label("收藏", systemImage: "rectangle.portrait.on.rectangle.portrait") }
            AddHubView().tag(AppTab.add).tabItem { Label("添加", systemImage: "plus.circle") }
            GoalsView().tag(AppTab.goals).tabItem { Label("目标", systemImage: "star.circle") }
            AccountView().tag(AppTab.account).tabItem { Label("账户", systemImage: "person") }
        }
        .toolbarBackground(LedgerTheme.surface, for: .tabBar)
        .toolbarBackground(.visible, for: .tabBar)
    }
}
