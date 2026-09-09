import SwiftUI

struct GoalsView: View {
    @EnvironmentObject private var store: AppStore
    @State private var showingAdd = false
    @State private var showingPremium = false

    private var featured: CollectionGoal {
        store.goals.first ?? CollectionGoal(title: L10n.demoGoalTitle(), detail: L10n.demoGoalDetail(), owned: 0, total: 3, currentValue: 0, completeValue: 0)
    }

    private var checklistCards: [CardItem] {
        Array((store.cards.isEmpty ? SampleCardCatalog.cards : store.cards).prefix(3))
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 24) {
                    HStack(alignment: .bottom) {
                        VStack(alignment: .leading, spacing: 5) { Text("当前收集进度").foregroundStyle(LedgerTheme.secondary); Text("收集目标").font(.largeTitle.bold()) }
                        Spacer()
                        VStack(alignment: .trailing, spacing: 5) {
                            Button {
                                if store.canAddGoal { showingAdd = true } else { showingPremium = true }
                            } label: {
                                Label("添加目标", systemImage: store.canAddGoal ? "plus.circle" : "lock.fill")
                            }
                            .buttonStyle(.bordered).tint(LedgerTheme.gold)
                            if let limit = store.goalLimit {
                                Text("\(store.goals.count)/\(limit)").font(.caption).foregroundStyle(store.canAddGoal ? LedgerTheme.secondary : LedgerTheme.gold)
                            }
                        }
                    }
                    featuredGoal
                    checklist
                    watchlist
                    if store.goals.count > 1 { otherGoals }
                }
                .padding(20).padding(.bottom, 32)
            }
            .safeAreaInset(edge: .top, spacing: 0) { BrandHeader() }
            .stitchScreen()
            .sheet(isPresented: $showingAdd) { AddGoalView() }
            .fullScreenCover(isPresented: $showingPremium) { PremiumPlansView() }
        }
    }

    private var featuredGoal: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 8) { StatusPill(text: "高优先级"); Text(LocalizedStringKey(featured.title)).font(.title2.bold()); Text(LocalizedStringKey(featured.detail)).foregroundStyle(LedgerTheme.secondary) }
                Spacer(); Text(featured.progress, format: .percent).font(.system(size: 40, weight: .bold)).foregroundStyle(LedgerTheme.mint)
            }
            ProgressView(value: featured.progress).tint(LedgerTheme.mint)
            HStack(spacing: 12) {
                GoalCount(label: "已拥有", value: featured.owned, color: LedgerTheme.mint)
                GoalCount(label: "待集齐", value: max(featured.total - featured.owned, 0), color: LedgerTheme.gold)
            }
        }.ledgerPanel(border: LedgerTheme.gold.opacity(0.3))
    }

    private var checklist: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack { Text("卡片清单").font(.title2.bold()); Spacer(); Text(L10n.itemCount(featured.total)).foregroundStyle(.secondary) }
            ForEach(checklistCards) { card in
                GoalChecklistRow(image: card.imageURL, title: card.title, subtitle: L10n.cardDetail(card), owned: true)
            }
            Button("查看全部清单", systemImage: "chevron.down") { }.frame(maxWidth: .infinity).foregroundStyle(LedgerTheme.secondary)
        }
    }

    private var watchlist: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack { Text("关注名单").font(.title2.bold()); Spacer(); Button("管理") { }.foregroundStyle(LedgerTheme.mint) }
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 12) {
                    WatchCard(card: SampleCardCatalog.wembanyamaMultipleFiveByFive, status: "竞拍中")
                    WatchCard(card: SampleCardCatalog.wembanyamaYoungestFiveByFive, status: "一口价")
                    WatchCard(card: SampleCardCatalog.lebronMinutesLeader, status: "关注")
                }
            }
        }
    }

    private var otherGoals: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("其他目标").font(.title2.bold())
            ForEach(store.goals.dropFirst()) { goal in HStack { Text(LocalizedStringKey(goal.title)); Spacer(); Text(goal.progress, format: .percent).foregroundStyle(LedgerTheme.mint) }.ledgerPanel() }
        }
    }
}

private struct GoalCount: View {
    let label: String, value: Int, color: Color
    var body: some View { VStack(alignment: .leading, spacing: 5) { Text(LocalizedStringKey(label)).foregroundStyle(.secondary); HStack(alignment: .firstTextBaseline) { Text(value.formatted()).font(.title.bold()).foregroundStyle(color); Text("张").font(.caption) } }.frame(maxWidth: .infinity, alignment: .leading).ledgerPanel(border: .clear) }
}

private struct GoalChecklistRow: View {
    let image: String?, title: String, subtitle: String, owned: Bool
    var body: some View {
        HStack(spacing: 14) {
            RemoteCardImage(url: image).frame(width: 62, height: 78).clipShape(RoundedRectangle(cornerRadius: 6))
            VStack(alignment: .leading, spacing: 6) { Text(verbatim: title).font(.headline); Text(verbatim: subtitle).font(.caption).foregroundStyle(owned ? LedgerTheme.mint : .secondary) }
            Spacer(); Image(systemName: owned ? "checkmark.circle" : "plus").font(.title2).foregroundStyle(owned ? LedgerTheme.mint : LedgerTheme.gold)
        }.ledgerPanel(border: owned ? LedgerTheme.border : Color.white.opacity(0.06))
    }
}

private struct WatchCard: View {
    let card: CardItem, status: String
    var body: some View { VStack(alignment: .leading, spacing: 8) { ZStack(alignment: .topTrailing) { RemoteCardImage(url: card.imageURL, contentMode: .fit).frame(width: 170, height: 150); StatusPill(text: status, color: LedgerTheme.gold).padding(7) }; Text(verbatim: card.player).lineLimit(1).padding(.horizontal, 10).padding(.bottom, 10) }.frame(width: 170).background(LedgerTheme.surface, in: RoundedRectangle(cornerRadius: 8)).overlay { RoundedRectangle(cornerRadius: 8).stroke(LedgerTheme.border) } }
}

private struct AddGoalView: View {
    @Environment(\.dismiss) private var dismiss
    @EnvironmentObject private var store: AppStore
    @State private var title = ""
    @State private var detail = ""
    @State private var owned = 0
    @State private var total = 1
    var body: some View {
        NavigationStack {
            Form {
                Section("收集目标") { TextField("目标名称", text: $title); TextField("系列、年份或卡号范围", text: $detail, axis: .vertical); Stepper(L10n.ownedCount(owned), value: $owned, in: 0...max(total, 1)); Stepper(L10n.totalCount(total), value: $total, in: 1...10000) }
                Section { Text("市场匹配与完整套卡估值将在数据连接后开放。").font(.caption).foregroundStyle(.secondary) }
            }
            .navigationTitle("新增目标").navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) { Button("取消") { dismiss() } }
                ToolbarItem(placement: .confirmationAction) {
                    Button {
                        let goal = CollectionGoal(title: title, detail: detail, owned: min(owned, total), total: total, currentValue: 0, completeValue: 0)
                        if store.addGoal(goal) { dismiss() }
                    } label: { Image(systemName: "checkmark") }
                    .disabled(title.isEmpty || !store.canAddGoal)
                }
            }
        }
    }
}
