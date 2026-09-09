import SwiftUI

struct DashboardView: View {
    @EnvironmentObject private var store: AppStore
    @State private var showingCommunity = ProcessInfo.processInfo.arguments.contains("-CommunityDemo")

    var body: some View {
        NavigationStack {
            ScrollView {
                LazyVStack(alignment: .leading, spacing: 22) {
                    assetSummary
                    futureValue
                    sportIndices
                    categoryTiles
                    alerts
                    recentActivity
                }
                .padding(.horizontal, 20).padding(.bottom, 28)
            }
            .safeAreaInset(edge: .top, spacing: 0) {
                BrandHeader(trailingIcon: "person.2") { showingCommunity = true }
            }
            .stitchScreen()
            .fullScreenCover(isPresented: $showingCommunity) { CommunityView() }
        }
    }

    private var assetSummary: some View {
        VStack(spacing: 12) {
            HStack(alignment: .center) {
                VStack(alignment: .leading, spacing: 8) {
                    Text("总卡量资产").foregroundStyle(LedgerTheme.secondary)
                    HStack(alignment: .firstTextBaseline, spacing: 6) {
                        Text(store.cards.count.formatted()).font(.system(size: 42, weight: .bold)).foregroundStyle(LedgerTheme.mint)
                        Text("张").font(.headline).foregroundStyle(.secondary)
                    }
                }
                Spacer()
                Image(systemName: "wallet.bifold").font(.system(size: 68)).foregroundStyle(Color.white.opacity(0.09))
            }
            ProgressView(value: collectionProgress).tint(LedgerTheme.mint)
            HStack { Text("收集进度"); Spacer(); Text(collectionProgress, format: .percent).foregroundStyle(LedgerTheme.mint) }
                .font(.subheadline)
        }
        .ledgerPanel(border: LedgerTheme.gold.opacity(0.32))
    }

    private var collectionProgress: Double {
        let total = store.goals.reduce(0) { $0 + $1.total }
        let owned = store.goals.reduce(0) { $0 + $1.owned }
        return total > 0 ? min(Double(owned) / Double(total), 1) : min(Double(store.cards.count) / 300, 1)
    }

    private var futureValue: some View {
        HStack(spacing: 14) {
            Image(systemName: "star.circle.fill").font(.title).foregroundStyle(LedgerTheme.gold)
            Text("市场估值").font(.title3.bold())
            Spacer()
            StatusPill(text: "敬请期待", color: LedgerTheme.gold)
        }
        .ledgerPanel(border: LedgerTheme.greenBorder)
    }

    private var categoryTiles: some View {
        VStack(spacing: 12) {
            HStack(spacing: 14) {
                CategoryTile(title: "体育卡", count: sportsCardCount, icon: "globe")
                CategoryTile(title: "TCG", count: store.cards.filter { $0.normalizedSport == "PTCG / TCG" }.count, icon: "rectangle.portrait.on.rectangle.portrait", gold: true)
            }
            if uncategorizedCount > 0 {
                HStack {
                    Label(L10n.uncategorizedTitle(), systemImage: "questionmark.folder")
                        .font(.headline).foregroundStyle(LedgerTheme.gold)
                    Spacer()
                    Text(uncategorizedCount.formatted()).font(.title3.bold().monospacedDigit())
                }
                .ledgerPanel(border: LedgerTheme.gold.opacity(0.45))
            }
        }
    }

    private var sportsCardCount: Int {
        let sports = Set(["Basketball", "Baseball", "Soccer", "Football", "Hockey"])
        return store.cards.filter { sports.contains($0.normalizedSport) }.count
    }

    private var uncategorizedCount: Int {
        store.cards.filter { $0.normalizedSport == "Other" }.count
    }

    private var sportIndices: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(alignment: .firstTextBaseline) {
                VStack(alignment: .leading, spacing: 3) {
                    Text("运动卡指数").font(.title2.bold())
                    Text("基准 100 · 仅使用已成交记录").font(.caption).foregroundStyle(LedgerTheme.secondary)
                }
                Spacer()
                Image(systemName: "chart.line.uptrend.xyaxis").foregroundStyle(LedgerTheme.mint)
            }
            ScrollView(.horizontal, showsIndicators: false) {
                LazyHStack(spacing: 10) {
                    ForEach(SportIndexSnapshot.collectionSnapshots(cards: store.cards)) { snapshot in
                        SportIndexCard(snapshot: snapshot)
                    }
                }
            }
            Text("当前 App 尚未同步逐笔成交历史，因此不生成虚假指数。接入已核验数据后会自动计算。").font(.caption2).foregroundStyle(LedgerTheme.secondary)
        }
    }

    private var alerts: some View {
        VStack(alignment: .leading, spacing: 12) {
            Label("重要提示", systemImage: "exclamationmark.circle").font(.title2.bold()).foregroundStyle(LedgerTheme.danger)
            if missingPhotoCount > 0 {
                AlertRow(color: LedgerTheme.gold, title: "缺少卡图", detail: L10n.missingPhotoAlert(missingPhotoCount))
            }
            if reviewCount > 0 {
                AlertRow(color: LedgerTheme.danger, title: "待完善", detail: L10n.recordReviewAlert(reviewCount))
            }
            if uncategorizedCount > 0 {
                AlertRow(color: LedgerTheme.gold, title: L10n.uncategorizedTitle(), detail: L10n.uncategorizedCards(uncategorizedCount))
            }
            if let incompleteGoal = store.goals.first(where: { $0.owned < $0.total }) {
                AlertRow(color: LedgerTheme.danger, title: "套卡不完整", detail: L10n.missingGoal(incompleteGoal.title, count: max(incompleteGoal.total - incompleteGoal.owned, 0)))
            }
            AlertRow(color: LedgerTheme.gold, title: "评级建议", detail: "评级分析将在卡片图像识别接入后开放")
        }
    }

    private var missingPhotoCount: Int {
        store.cards.filter { $0.imageURL?.isEmpty != false }.count
    }

    private var reviewCount: Int {
        store.cards.filter {
            $0.year.isEmpty || $0.set.isEmpty || $0.player.isEmpty || $0.number.isEmpty
                || (($0.grade?.localizedCaseInsensitiveContains("PSA") == true || $0.psaPopulation != nil)
                    && $0.certification?.isEmpty != false)
        }.count
    }

    private var recentActivity: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack { Text("最近动态").font(.title2.bold()); Spacer(); Button("查看全部") {}.foregroundStyle(LedgerTheme.mint) }
            if store.cards.isEmpty {
                Text("添加第一张卡片后，动态会显示在这里。").foregroundStyle(.secondary).ledgerPanel()
            } else {
                ForEach(store.cards.prefix(4)) { card in
                    HStack(spacing: 12) {
                        RemoteCardImage(url: card.imageURL).frame(width: 52, height: 64).clipShape(RoundedRectangle(cornerRadius: 6))
                        VStack(alignment: .leading, spacing: 4) {
                            (Text("新增：") + Text(card.player)).font(.headline).lineLimit(1)
                            Text("\(card.year) · \(card.brand ?? "") \(card.set)").font(.caption).foregroundStyle(.secondary).lineLimit(1)
                        }
                        Spacer(); Text("+1").font(.title3.bold()).foregroundStyle(LedgerTheme.mint)
                    }
                    .padding(.vertical, 5)
                }
            }
        }
    }
}

private struct SportIndexCard: View {
    let snapshot: SportIndexSnapshot

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(verbatim: L10n.sportName(snapshot.sport)).font(.caption.bold()).foregroundStyle(LedgerTheme.secondary).lineLimit(1)
            Text(snapshot.indexLevel.map { $0.formatted(.number.precision(.fractionLength(1))) } ?? "--")
                .font(.title.bold().monospacedDigit()).foregroundStyle(LedgerTheme.mint)
            Text("等待成交数据").font(.caption2).foregroundStyle(LedgerTheme.gold).lineLimit(1)
            Divider().overlay(LedgerTheme.border)
            Text(verbatim: L10n.trackedCards(snapshot.cardCount)).font(.caption2).foregroundStyle(LedgerTheme.secondary)
        }
        .frame(width: 150, height: 126, alignment: .leading)
        .ledgerPanel(border: LedgerTheme.greenBorder)
    }
}

private struct CategoryTile: View {
    let title: String
    let count: Int
    let icon: String
    var gold = false
    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            HStack { Image(systemName: icon).font(.title2); Spacer(); Text(count.formatted()).font(.title3.monospacedDigit()) }
                .foregroundStyle(gold ? LedgerTheme.gold : LedgerTheme.mint)
            Spacer()
            Text(LocalizedStringKey(title)).font(.title2.bold())
        }
        .frame(maxWidth: .infinity, minHeight: 145, alignment: .leading).ledgerPanel()
    }
}

private struct AlertRow: View {
    let color: Color, title: String, detail: String
    var body: some View {
        HStack(spacing: 14) {
            Rectangle().fill(color).frame(width: 4)
            VStack(alignment: .leading, spacing: 4) { Text(LocalizedStringKey(title)).font(.headline); Text(LocalizedStringKey(detail)).font(.subheadline).foregroundStyle(LedgerTheme.secondary) }
            Spacer(); Image(systemName: "chevron.right").foregroundStyle(LedgerTheme.mint)
        }
        .padding(.vertical, 14).padding(.trailing, 14).background(color.opacity(0.06), in: RoundedRectangle(cornerRadius: 6))
    }
}
