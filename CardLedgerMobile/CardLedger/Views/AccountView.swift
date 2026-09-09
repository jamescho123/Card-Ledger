import SwiftUI

struct AccountView: View {
    @EnvironmentObject private var store: AppStore
    @State private var showingSettings = ProcessInfo.processInfo.arguments.contains("-SettingsDemo")
    @State private var showingPremium = ProcessInfo.processInfo.arguments.contains("-PremiumDemo")

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 22) {
                    profileHeader
                    socialStats
                    premiumBanner
                    scorePanel
                    publicCollection
                    Button { showingSettings = true } label: { Label("账户与隐私设置", systemImage: "gearshape") }.buttonStyle(PrimaryActionStyle())
                }
                .padding(20).padding(.bottom, 28)
            }
            .safeAreaInset(edge: .top, spacing: 0) { BrandHeader(trailingIcon: "gearshape") { showingSettings = true } }
            .stitchScreen()
            .fullScreenCover(isPresented: $showingSettings) { ProfileSettingsView() }
            .fullScreenCover(isPresented: $showingPremium) { PremiumPlansView() }
        }
    }

    private var premiumBanner: some View {
        Button { showingPremium = true } label: {
            HStack(spacing: 14) {
                Image(systemName: "crown.fill")
                    .font(.title2)
                    .foregroundStyle(LedgerTheme.gold)
                    .frame(width: 52, height: 52)
                    .background(LedgerTheme.gold.opacity(0.12), in: RoundedRectangle(cornerRadius: 8))
                VStack(alignment: .leading, spacing: 5) {
                    Text(LocalizedStringKey(store.isPremium ? "Premium 已启用" : "升级卡藏 Premium")).font(.headline)
                    Text(LocalizedStringKey(store.isPremium ? "所有 Premium 功能均为无限使用" : "月付 RMB 29.90 · 年付 RMB 299.90")).font(.caption).foregroundStyle(LedgerTheme.secondary)
                }
                Spacer()
                Text("查看方案").font(.subheadline.weight(.semibold)).foregroundStyle(LedgerTheme.mint)
                Image(systemName: "chevron.right").foregroundStyle(LedgerTheme.mint)
            }
            .padding(16)
            .background(LedgerTheme.surface, in: RoundedRectangle(cornerRadius: 8))
            .overlay { RoundedRectangle(cornerRadius: 8).stroke(LedgerTheme.gold.opacity(0.45)) }
        }
        .buttonStyle(.plain)
    }

    private var profileHeader: some View {
        VStack(spacing: 12) {
            RemoteCardImage(url: store.profile?.avatar ?? StitchAssets.avatar).frame(width: 118, height: 118).clipShape(Circle())
                .overlay { Circle().stroke(LedgerTheme.gold, lineWidth: 2) }.shadow(color: LedgerTheme.gold.opacity(0.3), radius: 18)
                .overlay(alignment: .bottomTrailing) {
                    if store.profile?.role == "admin" {
                        Image(systemName: "checkmark.seal.fill").foregroundStyle(LedgerTheme.mint).font(.title2).background(LedgerTheme.background, in: Circle())
                    }
                }
            Text(store.profile?.name ?? store.session?.user.email ?? L10n.string("收藏家")).font(.title.bold())
            if let id = store.profile?.id ?? store.session?.user.id {
                Text("ID: \(id.uuidString.prefix(8))").foregroundStyle(.secondary).monospacedDigit()
            }
            if let description = store.profile?.description, !description.isEmpty {
                Text(description).foregroundStyle(LedgerTheme.secondary).multilineTextAlignment(.center)
            }
        }.frame(maxWidth: .infinity)
    }

    private var socialStats: some View {
        HStack {
            AccountStat(label: "粉丝", value: store.accountStats.followers.formatted())
            Divider()
            AccountStat(label: "关注", value: store.accountStats.following.formatted())
            Divider()
            AccountStat(label: "收藏", value: store.cards.count.formatted())
        }
    }

    private var scorePanel: some View {
        VStack(alignment: .leading, spacing: 14) {
            HStack { VStack(alignment: .leading) { Text("集卡者得分").foregroundStyle(LedgerTheme.secondary); Text((store.profile?.collectorScore ?? 0).formatted()).font(.title.bold()).foregroundStyle(LedgerTheme.mint) }; Spacer(); VStack(alignment: .trailing) { Text("收藏成长记录").foregroundStyle(LedgerTheme.gold); Text(LocalizedStringKey(store.session == nil ? "本地" : "云端同步")).font(.caption).foregroundStyle(.secondary) } }
            ProgressView(value: min(Double(store.profile?.collectorScore ?? 0) / 1000, 1)).tint(LedgerTheme.mint)
            if earnedBadges.isEmpty {
                Text("尚未获得徽章").font(.subheadline).foregroundStyle(.secondary)
            } else {
                HStack {
                    ForEach(earnedBadges, id: \.label) { badge in
                        Badge(icon: badge.icon, label: badge.label, color: badge.color)
                    }
                }
            }
        }.ledgerPanel()
    }

    private var publicCollection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack { Text("收藏预览").font(.title2.bold()).foregroundStyle(LedgerTheme.mint); Spacer(); Text("目标").foregroundStyle(.secondary) }
            if store.cards.isEmpty {
                ContentUnavailableView("暂无收藏卡片", systemImage: "rectangle.portrait.on.rectangle.portrait", description: Text("添加卡片后会显示在这里。"))
            } else {
                LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                    ForEach(Array(store.cards.prefix(4))) { card in
                        PublicTile(image: card.imageURL, title: card.player.isEmpty ? card.title : card.player)
                    }
                }
            }
        }
    }

    private var earnedBadges: [(icon: String, label: String, color: Color)] {
        var badges: [(String, String, Color)] = []
        if !store.cards.isEmpty { badges.append(("rectangle.portrait.fill", "首张入藏", LedgerTheme.mint)) }
        if store.cards.count >= 100 { badges.append(("building.columns.fill", "百卡藏家", LedgerTheme.gold)) }
        return badges
    }
}

private struct AccountStat: View {
    let label: String, value: String
    var body: some View { VStack(spacing: 4) { Text(value).font(.title2.bold()).foregroundStyle(LedgerTheme.mint); Text(LocalizedStringKey(label)).foregroundStyle(.secondary) }.frame(maxWidth: .infinity) }
}

private struct Badge: View {
    let icon: String, label: String, color: Color
    var body: some View { VStack(spacing: 7) { Image(systemName: icon).font(.title2).foregroundStyle(color).frame(width: 48, height: 48).background(color.opacity(0.12), in: Circle()); Text(LocalizedStringKey(label)).font(.caption) }.frame(maxWidth: .infinity) }
}

private struct PublicTile: View {
    let image: String?, title: String
    var body: some View { ZStack(alignment: .bottomLeading) { RemoteCardImage(url: image, contentMode: .fit).frame(height: 180); LinearGradient(colors: [.clear, .black.opacity(0.8)], startPoint: .center, endPoint: .bottom); Text(verbatim: title).font(.headline).padding(10) }.clipShape(RoundedRectangle(cornerRadius: 8)).overlay { RoundedRectangle(cornerRadius: 8).stroke(LedgerTheme.border) } }
}

struct ProfileSettingsView: View {
    @Environment(\.dismiss) private var dismiss
    @EnvironmentObject private var store: AppStore
    @EnvironmentObject private var preferences: AppPreferences
    @State private var name = ""
    @State private var description = ""
    @State private var age = ""
    @State private var location = ""
    @State private var publicCollection = true
    @State private var biometrics = true
    @State private var showValues = false
    @State private var showCerts = true
    @State private var showLocations = false
    @State private var showingPremium = false

    var body: some View {
        NavigationStack {
            Form {
                Section {
                    HStack { RemoteCardImage(url: store.profile?.avatar ?? StitchAssets.avatar).frame(width: 54, height: 54).clipShape(Circle()); VStack(alignment: .leading) { Text(store.profile?.name ?? L10n.string("收藏家")).font(.headline); Label("Supabase 云端已同步", systemImage: "circle.fill").font(.caption).foregroundStyle(LedgerTheme.mint) }; Spacer(); Image(systemName: "arrow.triangle.2.circlepath").foregroundStyle(LedgerTheme.mint) }
                }
                Section("个人资料") { TextField("名称", text: $name); TextField("简介", text: $description, axis: .vertical); TextField("年龄", text: $age).keyboardType(.numberPad); TextField("位置", text: $location) }
                Section("账户安全") { LabeledContent("双重验证 (2FA)", value: "待接入"); Toggle("生物识别登录", isOn: $biometrics) }
                Section("隐私设置") { Toggle("公开收藏", isOn: $publicCollection); Toggle("估值数据", isOn: $showValues); Toggle("证书编号", isOn: $showCerts); Toggle("存放地点", isOn: $showLocations) }
                Section("通用") {
                    Picker("语言 (Language)", selection: $preferences.language) {
                        ForEach(AppLanguage.allCases) { language in Text(verbatim: language.label).tag(language) }
                    }
                    Picker("外观主题", selection: $preferences.appearance) {
                        ForEach(AppAppearance.allCases) { appearance in Text(LocalizedStringKey(appearance.label)).tag(appearance) }
                    }
                }
                Section("会员方案") {
                    Button { showingPremium = true } label: {
                        LabeledContent {
                            Text(LocalizedStringKey(store.isPremium ? "已启用" : "RMB 29.90 / RMB 299.90"))
                        } label: {
                            Text("Premium 会员")
                        }
                    }
                }
                Section("已连接的市场") { LabeledContent("eBay Global", value: "安全连接待配置"); LabeledContent("Heritage Auctions", value: "未连接") }
                Section { Button("退出登录", role: .destructive) { store.signOut(); dismiss() } }
            }
            .scrollContentBackground(.hidden).background(LedgerTheme.background)
            .navigationTitle("账户设置").navigationBarTitleDisplayMode(.inline)
            .onAppear { name = store.profile?.name ?? ""; description = store.profile?.description ?? ""; age = store.profile?.age ?? ""; location = store.profile?.location ?? "" }
            .toolbar {
                ToolbarItem(placement: .cancellationAction) { Button("关闭") { dismiss() } }
                ToolbarItem(placement: .confirmationAction) { Button("保存") { save() }.disabled(name.isEmpty || store.isWorking) }
            }
            .fullScreenCover(isPresented: $showingPremium) { PremiumPlansView() }
        }
    }

    private func save() {
        guard var profile = store.profile else { dismiss(); return }
        profile.name = name; profile.description = description; profile.age = age; profile.location = location
        Task { await store.saveProfile(profile); dismiss() }
    }
}
