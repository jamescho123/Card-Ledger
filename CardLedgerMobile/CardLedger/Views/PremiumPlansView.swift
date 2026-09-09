import SwiftUI

private enum PremiumPlan: String, CaseIterable, Identifiable {
    case monthly
    case yearly

    var id: String { rawValue }
    var title: LocalizedStringKey { self == .monthly ? "月度方案" : "年度方案" }
    var price: String { self == .monthly ? "RMB 29.90" : "RMB 299.90" }
    var period: LocalizedStringKey { self == .monthly ? "每月" : "每年" }
    var detail: LocalizedStringKey { self == .monthly ? "按月灵活订阅" : "折合每月 RMB 24.99" }
}

struct PremiumPlansView: View {
    @Environment(\.dismiss) private var dismiss
    @EnvironmentObject private var store: AppStore
    @State private var selectedPlan: PremiumPlan = .yearly
    @State private var showingPaymentNotice = false

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 22) {
                    premiumHeader
                    planSelector
                    limitsComparison
                    benefits
                    paymentNotice
                    subscribeButton
                }
                .padding(20)
                .padding(.bottom, 32)
            }
            .safeAreaInset(edge: .top, spacing: 0) { BrandHeader(trailingIcon: "xmark") { dismiss() } }
            .stitchScreen()
            .navigationBarHidden(true)
            .alert("App Store 支付待接入", isPresented: $showingPaymentNotice) {
                Button("知道了", role: .cancel) { }
            } message: {
                Text("方案已创建，正式购买将在 App Store Connect 商品配置完成后开放。")
            }
        }
    }

    private var premiumHeader: some View {
        VStack(spacing: 13) {
            Image(systemName: "crown.fill")
                .font(.system(size: 44, weight: .bold))
                .foregroundStyle(LedgerTheme.gold)
                .frame(width: 88, height: 88)
                .background(LedgerTheme.gold.opacity(0.12), in: Circle())
                .overlay { Circle().stroke(LedgerTheme.gold.opacity(0.55), lineWidth: 1.5) }
                .shadow(color: LedgerTheme.gold.opacity(0.28), radius: 24)
            Text("Premium 会员").font(.largeTitle.bold())
            if store.isPremium { StatusPill(text: "Premium 已启用", color: LedgerTheme.mint) }
            Text("为认真管理收藏的藏家打造")
                .foregroundStyle(LedgerTheme.secondary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 16)
    }

    private var planSelector: some View {
        VStack(spacing: 12) {
            ForEach(PremiumPlan.allCases) { plan in
                Button { selectedPlan = plan } label: {
                    HStack(spacing: 14) {
                        Image(systemName: selectedPlan == plan ? "checkmark.circle.fill" : "circle")
                            .font(.title2)
                            .foregroundStyle(selectedPlan == plan ? LedgerTheme.mint : LedgerTheme.secondary)
                        VStack(alignment: .leading, spacing: 6) {
                            Text(plan.title).font(.headline)
                            if plan == .yearly { StatusPill(text: "最受欢迎", color: LedgerTheme.gold) }
                            Text(plan.detail).font(.subheadline).foregroundStyle(LedgerTheme.secondary)
                            if plan == .yearly {
                                Text("每年节省 RMB 58.90").font(.caption.weight(.semibold)).foregroundStyle(LedgerTheme.mint)
                            }
                        }
                        Spacer(minLength: 8)
                        VStack(alignment: .trailing, spacing: 3) {
                            Text(plan.price).font(.title3.bold()).monospacedDigit()
                            Text(plan.period).font(.caption).foregroundStyle(.secondary)
                        }
                    }
                    .padding(17)
                    .background(selectedPlan == plan ? LedgerTheme.mint.opacity(0.10) : LedgerTheme.surface, in: RoundedRectangle(cornerRadius: 8))
                    .overlay { RoundedRectangle(cornerRadius: 8).stroke(selectedPlan == plan ? LedgerTheme.mint : LedgerTheme.border, lineWidth: selectedPlan == plan ? 1.5 : 1) }
                }
                .buttonStyle(.plain)
            }
        }
    }

    private var benefits: some View {
        VStack(alignment: .leading, spacing: 15) {
            Text("Premium 包含").font(.title2.bold())
            benefit("arrow.triangle.2.circlepath", "云端收藏同步")
            benefit("iphone.and.arrow.forward", "多设备访问")
            benefit("slider.horizontal.3", "高级收藏工具")
            benefit("sparkles.rectangle.stack", "Premium 展示体验")
        }
        .ledgerPanel(border: LedgerTheme.greenBorder)
    }

    private var limitsComparison: some View {
        VStack(alignment: .leading, spacing: 14) {
            Text("方案额度").font(.title2.bold())
            comparisonRow("收集目标", regular: "3 个", premium: "无限")
            comparisonRow("AI 交易检查", regular: "每月 5 次", premium: "无限")
            comparisonRow("展示柜卡片", regular: "6 张", premium: "无限")
        }
        .ledgerPanel(border: LedgerTheme.gold.opacity(0.45))
    }

    private func comparisonRow(_ title: LocalizedStringKey, regular: LocalizedStringKey, premium: LocalizedStringKey) -> some View {
        HStack(spacing: 10) {
            Text(title).frame(maxWidth: .infinity, alignment: .leading)
            Text(regular).font(.subheadline).foregroundStyle(LedgerTheme.secondary).frame(width: 80, alignment: .trailing)
            Text(premium).font(.subheadline.weight(.semibold)).foregroundStyle(LedgerTheme.mint).frame(width: 64, alignment: .trailing)
        }
    }

    private var paymentNotice: some View {
        Label("付款由 Apple 管理；正式发布前将接入 StoreKit 与服务端订阅验证。", systemImage: "lock.shield")
            .font(.footnote)
            .foregroundStyle(LedgerTheme.secondary)
            .padding(14)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(LedgerTheme.raised, in: RoundedRectangle(cornerRadius: 8))
    }

    private var subscribeButton: some View {
        Button { showingPaymentNotice = true } label: {
            Label {
                Text(store.isPremium ? LocalizedStringKey("Premium 已启用") : selectedPlan == .monthly ? LocalizedStringKey("选择月度方案") : LocalizedStringKey("选择年度方案"))
            } icon: {
                Image(systemName: store.isPremium ? "checkmark.seal.fill" : "crown.fill")
            }
        }
        .buttonStyle(PrimaryActionStyle())
        .disabled(store.isPremium)
    }

    private func benefit(_ icon: String, _ title: LocalizedStringKey) -> some View {
        HStack(spacing: 12) {
            Image(systemName: icon).foregroundStyle(LedgerTheme.mint).frame(width: 24)
            Text(title)
            Spacer()
            Image(systemName: "checkmark").foregroundStyle(LedgerTheme.mint)
        }
    }
}
