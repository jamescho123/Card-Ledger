import SwiftUI
import UIKit

private enum TradeComposerSide: String, CaseIterable, Identifiable {
    case mine, theirs
    var id: String { rawValue }
}

private struct MobileTradeCard: Identifiable {
    let id = UUID()
    var line: String
    var year: String
    var brand: String
    var set: String
    var player: String
    var type: String
    var parallel: String
    var number: String
    var grade: String
    var value: Double
    var confidence: Int
    var source: String

    var title: String {
        [year, brand, set, player, type, parallel, number.isEmpty ? "" : "#\(number)"]
            .filter { !$0.isEmpty }
            .joined(separator: " ")
    }
}

private struct MobileTradeProposal: Identifiable {
    let id = UUID()
    var kind: String
    var title: String
    var subtitle: String
    var mineValue: Double
    var theirValue: Double
    var cashNet: Double
    var score: Int
    var confidence: Int
    var rationale: String
}

private struct SportsGuyMobileMessage: Identifiable {
    let id = UUID()
    var role: String
    var text: String
    var draft: String?
}

struct TradesView: View {
    @EnvironmentObject private var store: AppStore
    @ObservedObject private var preferences = AppPreferences.shared
    var embedded = false

    @State private var mine = ""
    @State private var theirs = ""
    @State private var cashPaid = ""
    @State private var cashReceived = ""
    @State private var showingHistory = false
    @State private var showingPremium = false
    @State private var showingCollectionPicker = false
    @State private var showingComposer = false
    @State private var selectedMineIDs: Set<String> = []
    @State private var proposalSignature = ""
    @State private var proposals: [MobileTradeProposal] = []
    @State private var sportsMessages: [SportsGuyMobileMessage] = []
    @State private var dealerMessage = ""
    @State private var latestDraft = ""

    @State private var composerSide: TradeComposerSide = .mine
    @State private var composerYear = ""
    @State private var composerBrand = ""
    @State private var composerSet = ""
    @State private var composerPlayer = ""
    @State private var composerType = ""
    @State private var composerParallel = ""
    @State private var composerNumber = ""
    @State private var composerGrade = "Raw"
    @State private var composerValue = ""

    var body: some View {
        Group {
            if embedded {
                content
            } else {
                NavigationStack {
                    content.safeAreaInset(edge: .top, spacing: 0) {
                        BrandHeader(trailingIcon: "clock.arrow.circlepath") { showingHistory = true }
                    }
                }
            }
        }
        .sheet(isPresented: $showingHistory) { tradeHistory }
        .sheet(isPresented: $showingCollectionPicker) { collectionPicker }
        .sheet(isPresented: $showingComposer) { structuredCardComposer }
        .fullScreenCover(isPresented: $showingPremium) { PremiumPlansView() }
        .onAppear(perform: seedSportsGuy)
    }

    private var content: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                pageHeading
                estimatePolicy
                readiness
                tradeSide(
                    title: copy("我的卡片", "Your cards", "自分のカード"),
                    color: LedgerTheme.mint,
                    text: $mine,
                    cards: mineCards,
                    collectionAction: { showingCollectionPicker = true },
                    manualAction: { composerSide = .mine; showingComposer = true }
                )
                versusDivider
                tradeSide(
                    title: copy("对方卡片", "Their cards", "相手のカード"),
                    color: LedgerTheme.gold,
                    text: $theirs,
                    cards: theirCards,
                    manualAction: { composerSide = .theirs; showingComposer = true }
                )
                proposalControls
                if !proposals.isEmpty { proposalList }
                sportsGuyPanel
                inventoryNotice
                Button { saveTrade() } label: {
                    Label(copy("确认并记录交易", "Confirm and record trade", "取引を確認して記録"), systemImage: "checkmark.shield")
                }
                .buttonStyle(PrimaryActionStyle())
                .disabled(!hasBothSides)
            }
            .padding(20)
            .padding(.bottom, 30)
        }
        .stitchScreen()
    }

    private var pageHeading: some View {
        HStack(alignment: .bottom) {
            VStack(alignment: .leading, spacing: 5) {
                Text(verbatim: L10n.aiTradeBuilderTitle())
                    .font(.caption.bold())
                    .foregroundStyle(LedgerTheme.gold)
                Text(copy("构建更好的交易", "Build a better trade", "より良い取引を組み立てる"))
                    .font(.largeTitle.bold())
            }
            Spacer()
            StatusPill(
                text: hasBothSides ? copy("分析中", "Analyzing", "分析中") : copy("待录入", "Waiting", "入力待ち"),
                color: hasBothSides ? LedgerTheme.mint : LedgerTheme.gold
            )
        }
    }

    private var estimatePolicy: some View {
        HStack(alignment: .top, spacing: 11) {
            Image(systemName: "checkmark.seal")
                .foregroundStyle(LedgerTheme.mint)
            VStack(alignment: .leading, spacing: 4) {
                Text(copy("估值依据清楚可查", "Explainable estimates", "根拠を確認できる推定"))
                    .font(.headline)
                Text(copy(
                    "优先使用卡册中的估值；手动价格会明确标注，成交数据接入前不会冒充实时行情。",
                    "Collection estimates are used first. Manual prices are labeled and never presented as live market data.",
                    "コレクション推定を優先し、手入力価格は明示してリアルタイム相場として扱いません。"
                ))
                .font(.caption)
                .foregroundStyle(LedgerTheme.secondary)
            }
        }
        .ledgerPanel()
    }

    private var readiness: some View {
        VStack(spacing: 12) {
            HStack {
                VStack(alignment: .leading, spacing: 3) {
                    Text(copy("交易资料与估值可信度", "Trade data and estimate confidence", "取引データと推定信頼度"))
                        .font(.title3.bold())
                    Text(copy("完整身份字段与估值来源共同决定可信度", "Identity fields and estimate sources both affect confidence", "識別情報と推定元の両方で信頼度を判断"))
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
                Spacer()
                Text("\(readinessScore)%")
                    .font(.system(size: 38, weight: .bold))
                    .foregroundStyle(LedgerTheme.mint)
            }
            ProgressView(value: Double(readinessScore), total: 100)
                .tint(LedgerTheme.mint)
            HStack {
                Label(copy("身份完整度 \(identityReadiness)%", "Identity \(identityReadiness)%", "識別情報 \(identityReadiness)%"), systemImage: "list.bullet.rectangle")
                Spacer()
                Label(copy("估值可信度 \(estimateConfidence)%", "Estimate \(estimateConfidence)%", "推定 \(estimateConfidence)%"), systemImage: "chart.bar.doc.horizontal")
            }
            .font(.caption.weight(.semibold))
            .foregroundStyle(LedgerTheme.secondary)
        }
        .ledgerPanel()
    }

    private func tradeSide(
        title: String,
        color: Color,
        text: Binding<String>,
        cards: [MobileTradeCard],
        collectionAction: (() -> Void)? = nil,
        manualAction: @escaping () -> Void
    ) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Circle().fill(color).frame(width: 9)
                Text(title).font(.title2.bold())
                Spacer()
                Text(copy("\(cards.count) 张 · ¥\(sideValue(cards).formatted(.number.precision(.fractionLength(0...2))))", "\(cards.count) cards · ¥\(sideValue(cards).formatted(.number.precision(.fractionLength(0...2))))", "\(cards.count)枚 · ¥\(sideValue(cards).formatted(.number.precision(.fractionLength(0...2))))"))
                    .font(.caption.weight(.semibold))
                    .foregroundStyle(color)
            }

            TextField(copy(
                "年份 | 品牌 | 系列 | 球员 | 类型 | 平行 | 卡号 | 评级 | 估值 RMB",
                "Year | Brand | Set | Player | Type | Parallel | Number | Grade | Value RMB",
                "年 | ブランド | セット | 選手 | 種類 | パラレル | 番号 | グレード | 価格 RMB"
            ), text: text, axis: .vertical)
            .lineLimit(5...9)
            .padding(12)
            .background(LedgerTheme.surface, in: RoundedRectangle(cornerRadius: 7))
            .overlay { RoundedRectangle(cornerRadius: 7).stroke(color.opacity(0.28)) }

            HStack(spacing: 9) {
                if let collectionAction {
                    Button(action: collectionAction) {
                        Label(L10n.selectFromCollection(), systemImage: "rectangle.stack.badge.plus")
                    }
                }
                Button(action: manualAction) {
                    Label(copy("结构化录入", "Structured entry", "項目別入力"), systemImage: "plus.rectangle.on.rectangle")
                }
            }
            .font(.subheadline.weight(.semibold))
            .foregroundStyle(color)

            if cards.isEmpty {
                Text(copy("尚未添加卡片", "No cards added yet", "カードはまだありません"))
                    .font(.caption)
                    .foregroundStyle(LedgerTheme.secondary)
            } else {
                VStack(spacing: 0) {
                    ForEach(cards) { card in evidenceRow(card, color: color) }
                }
            }
        }
        .ledgerPanel()
    }

    private func evidenceRow(_ card: MobileTradeCard, color: Color) -> some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 3) {
                    Text(card.title).font(.subheadline.weight(.semibold)).lineLimit(2)
                    Text(card.source).font(.caption2).foregroundStyle(LedgerTheme.secondary)
                }
                Spacer()
                VStack(alignment: .trailing, spacing: 3) {
                    Text(card.value > 0 ? "¥\(card.value.formatted(.number.precision(.fractionLength(0...2))))" : copy("待估值", "Value needed", "価格未入力"))
                        .font(.subheadline.bold())
                        .foregroundStyle(card.value > 0 ? color : .red)
                    Text(copy("可信度 \(card.confidence)%", "Confidence \(card.confidence)%", "信頼度 \(card.confidence)%"))
                        .font(.caption2)
                        .foregroundStyle(LedgerTheme.secondary)
                }
            }
            Divider().overlay(LedgerTheme.border)
        }
        .padding(.top, 8)
    }

    private var versusDivider: some View {
        HStack {
            Rectangle().fill(LedgerTheme.border).frame(height: 1)
            Text("VS")
                .font(.caption.bold())
                .foregroundStyle(LedgerTheme.mint)
                .padding(10)
                .overlay { Circle().stroke(LedgerTheme.greenBorder) }
            Rectangle().fill(LedgerTheme.border).frame(height: 1)
        }
    }

    private var proposalControls: some View {
        VStack(spacing: 12) {
            HStack(spacing: 12) {
                VStack(alignment: .leading, spacing: 5) {
                    Text(copy("我支付现金", "Cash I pay", "自分が支払う現金"))
                        .font(.caption)
                        .foregroundStyle(LedgerTheme.secondary)
                    HStack { Text("¥"); TextField("0", text: $cashPaid).keyboardType(.decimalPad) }
                }
                Divider()
                VStack(alignment: .leading, spacing: 5) {
                    Text(copy("我收到现金", "Cash I receive", "自分が受け取る現金"))
                        .font(.caption)
                        .foregroundStyle(LedgerTheme.secondary)
                    HStack { Text("¥"); TextField("0", text: $cashReceived).keyboardType(.decimalPad) }
                }
            }
            Button(action: generateProposals) {
                HStack {
                    Label(proposalSignature == currentProposalSignature && !proposalSignature.isEmpty ? copy("方案已更新", "Proposals updated", "提案を更新済み") : copy("生成排序方案", "Build ranked proposals", "提案を作成"), systemImage: "sparkles")
                    Spacer()
                    if let remaining = store.remainingAITradeUses {
                        Text(L10n.aiUsesRemaining(remaining)).font(.caption)
                    } else {
                        Text(copy("不限量", "Unlimited", "無制限")).font(.caption)
                    }
                }
            }
            .buttonStyle(PrimaryActionStyle())
            .disabled(!hasBothSides)
        }
        .ledgerPanel()
    }

    private var proposalList: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text(copy("推荐交易方案", "Ranked proposals", "おすすめ取引案"))
                .font(.title2.bold())
            ForEach(Array(proposals.enumerated()), id: \.element.id) { index, proposal in
                VStack(alignment: .leading, spacing: 11) {
                    HStack(alignment: .top) {
                        Text("0\(index + 1)")
                            .font(.title3.bold())
                            .foregroundStyle(LedgerTheme.secondary)
                        VStack(alignment: .leading, spacing: 2) {
                            Text(proposal.subtitle).font(.caption.bold()).foregroundStyle(LedgerTheme.gold)
                            Text(proposal.title).font(.title3.bold())
                        }
                        Spacer()
                        VStack(alignment: .trailing, spacing: 0) {
                            Text("\(proposal.score)").font(.title.bold()).foregroundStyle(LedgerTheme.mint)
                            Text(copy("交易评分", "deal score", "取引スコア")).font(.caption2).foregroundStyle(.secondary)
                        }
                    }
                    ProgressView(value: Double(proposal.score), total: 100).tint(LedgerTheme.mint)
                    HStack {
                        proposalMetric(copy("现金补差", "Cash adjustment", "現金調整"), cashPhrase(proposal.cashNet))
                        Spacer()
                        proposalMetric(copy("估值可信度", "Estimate confidence", "推定信頼度"), "\(proposal.confidence)%")
                    }
                    Text(proposal.rationale).font(.caption).foregroundStyle(LedgerTheme.secondary)
                    HStack {
                        Button(copy("问球卡哥", "Ask Sports Guy", "スポーツガイに聞く")) { runSportsGuy(action: "counter", proposal: proposal) }
                            .buttonStyle(.bordered)
                        Spacer()
                        Button(copy("采用方案", "Use proposal", "提案を使用")) { useProposal(proposal) }
                            .buttonStyle(.borderedProminent)
                    }
                    .tint(LedgerTheme.mint)
                }
                .ledgerPanel()
            }
        }
    }

    private func proposalMetric(_ label: String, _ value: String) -> some View {
        VStack(alignment: .leading, spacing: 3) {
            Text(label).font(.caption2).foregroundStyle(LedgerTheme.secondary)
            Text(value).font(.subheadline.bold())
        }
    }

    private var sportsGuyPanel: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(spacing: 11) {
                ZStack(alignment: .bottomTrailing) {
                    Circle()
                        .fill(LinearGradient(colors: [LedgerTheme.gold.opacity(0.28), LedgerTheme.mint.opacity(0.16)], startPoint: .topLeading, endPoint: .bottomTrailing))
                        .frame(width: 48, height: 48)
                        .overlay { Circle().stroke(LedgerTheme.gold.opacity(0.55)) }
                    Image(systemName: "robotic.vacuum")
                        .font(.title3)
                        .foregroundStyle(LedgerTheme.gold)
                        .frame(width: 48, height: 48)
                    Circle().fill(LedgerTheme.mint).frame(width: 9, height: 9)
                }
                VStack(alignment: .leading, spacing: 2) {
                    Text(copy("谈判副手", "NEGOTIATION COPILOT", "交渉コパイロット"))
                        .font(.caption2.bold())
                        .foregroundStyle(LedgerTheme.mint)
                    Text(copy("球卡哥", "Sports Guy", "スポーツガイ"))
                        .font(.title2.bold())
                }
                Spacer()
                Button { sportsMessages = []; latestDraft = ""; seedSportsGuy() } label: {
                    Image(systemName: "trash")
                }
                .foregroundStyle(LedgerTheme.secondary)
            }

            Text(copy(
                "把对方的话贴进来，球卡哥会核对双方估值、现金差额和止损线，再替你起草回复。",
                "Paste what the dealer said. Sports Guy checks both values, cash terms, and your downside before drafting a reply.",
                "相手の発言を貼り付けると、双方の推定額と現金条件、損失幅を確認して返信案を作成します。"
            ))
            .font(.caption)
            .foregroundStyle(LedgerTheme.secondary)

            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 8) {
                quickAction(copy("评估报价", "Evaluate offer", "提案を評価"), action: "evaluate")
                quickAction(copy("起草还价", "Draft counter", "カウンター案"), action: "counter")
                quickAction(copy("寻找中间价", "Find fair middle", "中間案"), action: "middle")
                quickAction(copy("检查止损线", "Walk-away check", "撤退基準"), action: "walk")
            }

            VStack(spacing: 10) {
                ForEach(sportsMessages.suffix(6)) { message in sportsMessage(message) }
            }

            HStack(alignment: .bottom, spacing: 8) {
                TextField(copy("粘贴对方消息，或向球卡哥提问……", "Paste the dealer message or ask Sports Guy...", "相手のメッセージまたは質問を入力…"), text: $dealerMessage, axis: .vertical)
                    .lineLimit(2...5)
                    .padding(11)
                    .background(LedgerTheme.surface, in: RoundedRectangle(cornerRadius: 7))
                Button {
                    let message = dealerMessage.trimmingCharacters(in: .whitespacesAndNewlines)
                    guard !message.isEmpty else { return }
                    dealerMessage = ""
                    runSportsGuy(action: "evaluate", dealerText: message)
                } label: {
                    Image(systemName: "arrow.up")
                        .font(.headline.bold())
                        .frame(width: 42, height: 42)
                }
                .buttonStyle(.borderedProminent)
                .tint(LedgerTheme.mint)
            }

            if !latestDraft.isEmpty {
                Button {
                    UIPasteboard.general.string = latestDraft
                    store.message = copy("回复草稿已复制。", "Reply draft copied.", "返信案をコピーしました。")
                } label: {
                    Label(copy("复制最新回复", "Copy latest draft", "最新の返信案をコピー"), systemImage: "doc.on.doc")
                        .frame(maxWidth: .infinity)
                }
                .buttonStyle(.bordered)
            }

            Text(copy("系统不会自动发给对方，每条回复都由你确认。", "Nothing is sent automatically. You approve every reply.", "自動送信はされません。すべての返信を自分で確認します。"))
                .font(.caption2)
                .foregroundStyle(LedgerTheme.secondary)
                .frame(maxWidth: .infinity, alignment: .center)
        }
        .ledgerPanel()
    }

    private func quickAction(_ title: String, action: String) -> some View {
        Button(title) { runSportsGuy(action: action) }
            .buttonStyle(.bordered)
            .frame(maxWidth: .infinity)
    }

    private func sportsMessage(_ message: SportsGuyMobileMessage) -> some View {
        HStack(alignment: .top, spacing: 8) {
            if message.role == "user" { Spacer(minLength: 30) }
            Text(message.role == "agent" ? "SG" : copy("我", "ME", "自分"))
                .font(.caption2.bold())
                .foregroundStyle(message.role == "agent" ? LedgerTheme.gold : LedgerTheme.mint)
                .frame(width: 28, height: 28)
                .overlay { Circle().stroke(message.role == "agent" ? LedgerTheme.gold.opacity(0.5) : LedgerTheme.mint.opacity(0.5)) }
            VStack(alignment: .leading, spacing: 7) {
                Text(message.text).font(.caption)
                if let draft = message.draft, !draft.isEmpty {
                    Text(draft)
                        .font(.caption.weight(.semibold))
                        .padding(.leading, 8)
                        .overlay(alignment: .leading) { Rectangle().fill(LedgerTheme.gold).frame(width: 2) }
                }
            }
            .padding(9)
            .background(message.role == "agent" ? LedgerTheme.raised : LedgerTheme.mint.opacity(0.1), in: RoundedRectangle(cornerRadius: 7))
            if message.role == "agent" { Spacer(minLength: 24) }
        }
    }

    private var inventoryNotice: some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: "info.circle").foregroundStyle(LedgerTheme.gold)
            VStack(alignment: .leading, spacing: 4) {
                Text(verbatim: L10n.tradeMarketNotice()).font(.headline)
                Text(verbatim: L10n.tradeMarketDetail()).font(.caption).foregroundStyle(.secondary)
                if !selectedMineIDs.isEmpty {
                    Text(verbatim: L10n.tradeInventoryNotice(selectedMineIDs.count))
                        .font(.caption.weight(.semibold))
                        .foregroundStyle(LedgerTheme.mint)
                }
            }
        }
        .ledgerPanel()
    }

    private var structuredCardComposer: some View {
        NavigationStack {
            Form {
                Section(copy("加入哪一方", "Add to side", "追加先")) {
                    Picker(copy("加入哪一方", "Add to side", "追加先"), selection: $composerSide) {
                        Text(copy("我的卡片", "Your cards", "自分のカード")).tag(TradeComposerSide.mine)
                        Text(copy("对方卡片", "Their cards", "相手のカード")).tag(TradeComposerSide.theirs)
                    }
                    .pickerStyle(.segmented)
                }
                Section(copy("卡片身份", "Card identity", "カード情報")) {
                    composerField(copy("年份", "Year", "年"), text: $composerYear)
                    composerField(copy("品牌", "Brand", "ブランド"), text: $composerBrand)
                    composerField(copy("系列", "Set", "セット"), text: $composerSet)
                    composerField(copy("球员", "Player", "選手"), text: $composerPlayer)
                    composerField(copy("类型", "Type", "種類"), text: $composerType)
                    composerField(copy("平行版本", "Parallel", "パラレル"), text: $composerParallel)
                    composerField(copy("卡号", "Number", "番号"), text: $composerNumber)
                    composerField(copy("评级", "Grade", "グレード"), text: $composerGrade)
                }
                Section(copy("估值", "Estimate", "推定額")) {
                    TextField(copy("手动估值 RMB（选填）", "Manual value RMB (optional)", "手入力価格 RMB（任意）"), text: $composerValue)
                        .keyboardType(.decimalPad)
                    Text(copy("留空时会尝试匹配你卡册中的同款卡。", "Leave blank to match the same card in your collection.", "空欄の場合はコレクション内の同一カードを検索します。"))
                        .font(.caption)
                        .foregroundStyle(LedgerTheme.secondary)
                }
            }
            .scrollContentBackground(.hidden)
            .background(LedgerTheme.background)
            .navigationTitle(copy("结构化录入", "Structured entry", "項目別入力"))
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button(copy("取消", "Cancel", "キャンセル")) { showingComposer = false }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button(copy("添加", "Add", "追加"), action: addStructuredCard)
                        .disabled(composerYear.isEmpty || composerSet.isEmpty || composerPlayer.isEmpty)
                }
            }
        }
    }

    private func composerField(_ title: String, text: Binding<String>) -> some View {
        LabeledContent(title) { TextField(title, text: text).multilineTextAlignment(.trailing) }
    }

    private var collectionPicker: some View {
        NavigationStack {
            List(store.cards) { card in
                Button { toggleMineCard(card) } label: {
                    HStack(spacing: 12) {
                        RemoteCardImage(url: card.imageURL, contentMode: .fit)
                            .frame(width: 48, height: 64)
                            .clipShape(RoundedRectangle(cornerRadius: 5))
                        VStack(alignment: .leading, spacing: 4) {
                            Text(card.player).font(.headline)
                            Text("\(card.year) · \(card.brand ?? "") \(card.set)")
                                .font(.caption)
                                .foregroundStyle(LedgerTheme.secondary)
                                .lineLimit(2)
                        }
                        Spacer()
                        Image(systemName: selectedMineIDs.contains(card.id) ? "checkmark.circle.fill" : "circle")
                            .foregroundStyle(selectedMineIDs.contains(card.id) ? LedgerTheme.mint : LedgerTheme.secondary)
                    }
                }
                .buttonStyle(.plain)
                .listRowBackground(LedgerTheme.surface)
            }
            .scrollContentBackground(.hidden)
            .background(LedgerTheme.background)
            .navigationTitle(L10n.selectFromCollection())
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button(L10n.done()) { showingCollectionPicker = false }
                }
                ToolbarItem(placement: .bottomBar) {
                    Text(verbatim: L10n.selectedCardCount(selectedMineIDs.count)).font(.caption.weight(.semibold))
                }
            }
        }
    }

    private var tradeHistory: some View {
        NavigationStack {
            List(store.trades) { trade in
                VStack(alignment: .leading, spacing: 7) {
                    Text(trade.date, format: .dateTime.year().month().day()).font(.caption).foregroundStyle(.secondary)
                    Text(copy("换出：", "Offered: ", "放出：")) + Text(trade.offeredCards)
                    (Text(copy("换入：", "Received: ", "入手：")) + Text(trade.receivedCards)).foregroundStyle(LedgerTheme.mint)
                }
                .lineLimit(3)
            }
            .navigationTitle(copy("交易记录", "Trade history", "取引履歴"))
            .scrollContentBackground(.hidden)
            .background(LedgerTheme.background)
        }
    }

    private var mineCards: [MobileTradeCard] { parseCards(mine) }
    private var theirCards: [MobileTradeCard] { parseCards(theirs) }
    private var hasBothSides: Bool { !mineCards.isEmpty && !theirCards.isEmpty }
    private var allTradeCards: [MobileTradeCard] { mineCards + theirCards }
    private var identityReadiness: Int {
        let mineScore = fixedFormatCompleteness(mine)
        let theirScore = fixedFormatCompleteness(theirs)
        return Int(((mineScore + theirScore) / 2 * 100).rounded())
    }
    private var estimateConfidence: Int {
        guard !allTradeCards.isEmpty else { return 0 }
        return allTradeCards.map(\.confidence).reduce(0, +) / allTradeCards.count
    }
    private var readinessScore: Int {
        hasBothSides ? Int((Double(identityReadiness) * 0.55 + Double(estimateConfidence) * 0.45).rounded()) : 0
    }
    private var currentProposalSignature: String { "\(mine)|\(theirs)|\(cashPaid)|\(cashReceived)" }

    private func copy(_ chinese: String, _ english: String, _ japanese: String) -> String {
        switch preferences.language {
        case .chinese: chinese
        case .english: english
        case .japanese: japanese
        }
    }

    private func normalize(_ value: String) -> String {
        value.lowercased().filter { $0.isLetter || $0.isNumber }
    }

    private func identityMatches(_ card: CardItem, fields: [String]) -> Bool {
        guard fields.count >= 7 else { return false }
        let year = normalize(fields[0])
        let brand = normalize(fields[1])
        let set = normalize(fields[2])
        let player = normalize(fields[3])
        let parallel = normalize(fields[5])
        let number = normalize(fields[6])
        let cardParallel = normalize("\(card.type) \(card.parallel)")
        return normalize(card.year) == year
            && normalize(card.player) == player
            && normalize(card.number) == number
            && (brand.isEmpty || normalize(card.brand ?? "").contains(brand))
            && normalize(card.set).contains(set)
            && (parallel.isEmpty || cardParallel.contains(parallel))
    }

    private func parseCards(_ value: String) -> [MobileTradeCard] {
        value.split(whereSeparator: \.isNewline).compactMap { rawLine in
            let line = String(rawLine).trimmingCharacters(in: .whitespacesAndNewlines)
            let fields = line.split(separator: "|", omittingEmptySubsequences: false)
                .map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }
            guard fields.count >= 7, !fields[0].isEmpty, !fields[2].isEmpty, !fields[3].isEmpty else { return nil }
            let grade = fields.count > 7 ? fields[7] : ""
            let manualValue = fields.count > 8 ? Double(fields[8]) ?? 0 : 0
            let match = store.cards.first { identityMatches($0, fields: fields) }
            let collectionValue = match?.estimatedValue ?? 0
            let value = collectionValue > 0 ? collectionValue : manualValue
            let source: String
            let confidence: Int
            if collectionValue > 0 {
                source = copy("匹配卡册估值", "Matched collection estimate", "コレクション推定に一致")
                confidence = 58
            } else if manualValue > 0 {
                source = copy("手动估值", "Manual estimate", "手入力推定")
                confidence = 34
            } else {
                source = copy("缺少估值", "Value needed", "価格が必要")
                confidence = 0
            }
            return MobileTradeCard(
                line: line,
                year: fields[0],
                brand: fields[1],
                set: fields[2],
                player: fields[3],
                type: fields[4],
                parallel: fields[5],
                number: fields[6],
                grade: grade,
                value: value,
                confidence: confidence,
                source: source
            )
        }
    }

    private func fixedFormatCompleteness(_ value: String) -> Double {
        let lines = value.split(whereSeparator: \.isNewline)
        guard !lines.isEmpty else { return 0 }
        let completed = lines.reduce(0) { result, line in
            result + line.split(separator: "|", omittingEmptySubsequences: false)
                .prefix(7)
                .filter { !$0.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty }
                .count
        }
        return min(Double(completed) / Double(lines.count * 7), 1)
    }

    private func sideValue(_ cards: [MobileTradeCard]) -> Double { cards.reduce(0) { $0 + $1.value } }

    private func averageConfidence(_ cards: [MobileTradeCard]) -> Int {
        guard !cards.isEmpty else { return 0 }
        return cards.map(\.confidence).reduce(0, +) / cards.count
    }

    private func roundedCash(_ value: Double) -> Double { (value / 10).rounded() * 10 }

    private func cashPhrase(_ cashNet: Double) -> String {
        if abs(cashNet) < 1 { return copy("无需补差", "No cash needed", "現金調整なし") }
        if cashNet > 0 { return copy("对方补 ¥\(cashNet.formatted())", "They add ¥\(cashNet.formatted())", "相手が¥\(cashNet.formatted())追加") }
        return copy("我方补 ¥\(abs(cashNet).formatted())", "You add ¥\(abs(cashNet).formatted())", "自分が¥\(abs(cashNet).formatted())追加")
    }

    private func generateProposals() {
        guard hasBothSides else { return }
        guard allTradeCards.allSatisfy({ $0.value > 0 }) else {
            store.message = copy("请先为双方每张卡补充估值。", "Add an estimate for every card on both sides first.", "双方すべてのカードに推定額を入力してください。")
            return
        }
        guard proposalSignature != currentProposalSignature else { return }
        guard store.consumeAITradeUse() else { showingPremium = true; return }

        let mineValue = sideValue(mineCards)
        let theirValue = sideValue(theirCards)
        let difference = mineValue - theirValue
        let average = max(1, (mineValue + theirValue) / 2)
        let confidence = (averageConfidence(mineCards) + averageConfidence(theirCards)) / 2
        let fairCash = abs(difference) <= 100 ? 0 : roundedCash(difference)
        let shieldCash = roundedCash(difference + max(50, min(500, average * 0.025)))
        let middleCash = roundedCash(difference * 0.85)

        func score(_ cashNet: Double) -> Int {
            let net = theirValue + cashNet - mineValue
            let balance = max(0, 100 - abs(net) / average * 180)
            return Int(max(0, min(99, balance * 0.72 + Double(confidence) * 0.28)).rounded())
        }

        proposals = [
            MobileTradeProposal(
                kind: "fair",
                title: copy("公平成交", "Fair Market", "フェアマーケット"),
                subtitle: copy("最接近双方估值", "Closest estimate-backed match", "推定額に最も近い"),
                mineValue: mineValue,
                theirValue: theirValue,
                cashNet: fairCash,
                score: score(fairCash),
                confidence: confidence,
                rationale: copy("按当前卡册与手动估值平衡双方，不把未接入的行情当作事实。", "Balances the current collection and manual estimates without pretending unconnected market data is live.", "現在のコレクション推定と手入力価格を使い、未接続の相場を事実として扱いません。")
            ),
            MobileTradeProposal(
                kind: "protect",
                title: copy("价值保护", "Value Shield", "バリューシールド"),
                subtitle: copy("为不确定性留出余量", "Protects your downside", "不確実性に余裕を持たせる"),
                mineValue: mineValue,
                theirValue: theirValue,
                cashNet: shieldCash,
                score: score(shieldCash),
                confidence: confidence,
                rationale: copy("在公平差额之外保留约 2.5% 缓冲，适合估值来源较少时使用。", "Keeps roughly a 2.5% cushion beyond the fair gap when evidence is thin.", "根拠が少ない場合に公平差額へ約2.5%の余裕を追加します。")
            ),
            MobileTradeProposal(
                kind: "middle",
                title: copy("快速成交", "Close the Deal", "取引成立を優先"),
                subtitle: copy("用小幅让步换取成交", "Small concession to close", "小さな譲歩で成立へ"),
                mineValue: mineValue,
                theirValue: theirValue,
                cashNet: middleCash,
                score: score(middleCash),
                confidence: confidence,
                rationale: copy("把公允现金差缩小约 15%，适合双方都愿意尽快成交时。", "Reduces the fair cash gap by about 15% when both sides want to close quickly.", "双方が早く成立させたい場合に公正な現金差を約15%縮小します。")
            )
        ]
        proposalSignature = currentProposalSignature
    }

    private func useProposal(_ proposal: MobileTradeProposal) {
        if proposal.cashNet > 0 {
            cashReceived = String(format: "%.0f", proposal.cashNet)
            cashPaid = ""
        } else if proposal.cashNet < 0 {
            cashPaid = String(format: "%.0f", abs(proposal.cashNet))
            cashReceived = ""
        } else {
            cashPaid = ""
            cashReceived = ""
        }
    }

    private func seedSportsGuy() {
        guard sportsMessages.isEmpty else { return }
        sportsMessages = [SportsGuyMobileMessage(
            role: "agent",
            text: copy("我是球卡哥。录入双方卡片后，我会检查估值差、风险与现金补差，再替你起草回复。", "I’m Sports Guy. Add both sides and I’ll check the value gap, risk, and cash terms before drafting your reply.", "スポーツガイです。双方を入力すると、価格差・リスク・現金条件を確認して返信案を作ります。"),
            draft: nil
        )]
    }

    private func runSportsGuy(action: String, dealerText: String = "", proposal: MobileTradeProposal? = nil) {
        let userText = dealerText.isEmpty ? sportsActionLabel(action) : dealerText
        sportsMessages.append(SportsGuyMobileMessage(role: "user", text: userText, draft: nil))
        guard hasBothSides else {
            sportsMessages.append(SportsGuyMobileMessage(role: "agent", text: copy("请先录入双方卡片。", "Add cards to both sides first.", "まず双方のカードを入力してください。"), draft: nil))
            return
        }
        guard allTradeCards.allSatisfy({ $0.value > 0 }) else {
            sportsMessages.append(SportsGuyMobileMessage(role: "agent", text: copy("仍有卡片缺少估值。先补充手动估值或卡册依据，再谈判更稳妥。", "Some cards still need values. Add a manual or collection estimate before negotiating.", "推定額がないカードがあります。手入力またはコレクション推定を追加してください。"), draft: nil))
            return
        }

        let mineValue = sideValue(mineCards)
        let theirValue = sideValue(theirCards)
        let rawEdge = theirValue - mineValue
        let average = max(1, (mineValue + theirValue) / 2)
        let fairCashNet = roundedCash(mineValue - theirValue)
        let confidence = estimateConfidence
        let cashMention = cashAmount(in: dealerText)
        let lower = dealerText.lowercased()
        let userAdds = lower.contains("i add") || lower.contains("i need to add") || lower.contains("you add") || lower.contains("我补") || lower.contains("我加")

        if let cashMention, userAdds {
            let postCash = rawEdge - cashMention
            let draft = copy(
                "我不能在现有卡片之外再补 ¥\(cashMention.formatted())。按当前估值，我方为 ¥\(mineValue.formatted())，对方为 ¥\(theirValue.formatted())；合理补差应为\(cashPhrase(fairCashNet))。如果可以，我们再确认品相并成交。",
                "I can’t add ¥\(cashMention.formatted()) on top. My side is currently ¥\(mineValue.formatted()) and yours is ¥\(theirValue.formatted()); a fair adjustment is \(cashPhrase(fairCashNet).lowercased()). If that works, we can verify condition and close.",
                "追加で¥\(cashMention.formatted())は出せません。現在の推定は自分側¥\(mineValue.formatted())、相手側¥\(theirValue.formatted())で、公正な調整は\(cashPhrase(fairCashNet))です。状態確認後に成立させましょう。"
            )
            appendSportsReply(
                copy("这项现金条件对你不利。补差后你的估算净值为 ¥\(postCash.formatted())。", "That cash term works against you. Your estimated post-cash net is ¥\(postCash.formatted()).", "その現金条件は不利です。現金調整後の推定差は¥\(postCash.formatted())です。"),
                draft: draft
            )
            return
        }

        if action == "walk" {
            let gap = abs(rawEdge) / average * 100
            let warning = gap > 12 || confidence < 45
            appendSportsReply(
                warning
                    ? copy("先别急着成交。当前价值差为 \(gap.formatted(.number.precision(.fractionLength(1))))%，估值可信度只有 \(confidence)%。", "Do not rush. The value gap is \(gap.formatted(.number.precision(.fractionLength(1))))% and estimate confidence is only \(confidence)%.", "急がないでください。価格差は\(gap.formatted(.number.precision(.fractionLength(1))))%、推定信頼度は\(confidence)%です。")
                    : copy("目前没有明显止损信号，但仍需现场核对品相与真伪。", "No automatic walk-away signal, but verify condition and authenticity in person.", "明確な撤退シグナルはありませんが、状態と真贋を確認してください。"),
                draft: nil
            )
            return
        }

        let chosen = proposal ?? proposals.first
        let selectedCash = chosen?.cashNet ?? fairCashNet
        let draft = action == "counter" || action == "middle" ? counterDraft(mineValue: mineValue, theirValue: theirValue, cashNet: action == "middle" ? roundedCash(fairCashNet * 0.85) : selectedCash) : nil
        let explanation = copy(
            "当前我方 ¥\(mineValue.formatted())，对方 ¥\(theirValue.formatted())，现金前净差为 ¥\(rawEdge.formatted())，估值可信度 \(confidence)%。合理补差为\(cashPhrase(fairCashNet))。",
            "Your side is ¥\(mineValue.formatted()), theirs is ¥\(theirValue.formatted()), and the pre-cash edge is ¥\(rawEdge.formatted()) with \(confidence)% estimate confidence. A fair adjustment is \(cashPhrase(fairCashNet).lowercased()).",
            "自分側¥\(mineValue.formatted())、相手側¥\(theirValue.formatted())、現金前の差は¥\(rawEdge.formatted())、推定信頼度は\(confidence)%です。公正な調整は\(cashPhrase(fairCashNet))です。"
        )
        appendSportsReply(explanation, draft: draft)
    }

    private func appendSportsReply(_ text: String, draft: String?) {
        sportsMessages.append(SportsGuyMobileMessage(role: "agent", text: text, draft: draft))
        if let draft { latestDraft = draft }
        sportsMessages = Array(sportsMessages.suffix(20))
    }

    private func sportsActionLabel(_ action: String) -> String {
        switch action {
        case "counter": copy("帮我起草还价", "Draft a counteroffer", "カウンター案を作成")
        case "middle": copy("寻找合理中间价", "Find a fair middle", "公正な中間案")
        case "walk": copy("检查我的止损线", "Check my walk-away point", "撤退基準を確認")
        default: copy("评估当前报价", "Evaluate the current offer", "現在の提案を評価")
        }
    }

    private func cashAmount(in text: String) -> Double? {
        let pattern = #"(?:RMB|¥)\s*([0-9]+(?:\.[0-9]+)?)"#
        guard let regex = try? NSRegularExpression(pattern: pattern, options: [.caseInsensitive]),
              let match = regex.firstMatch(in: text, range: NSRange(text.startIndex..., in: text)),
              let range = Range(match.range(at: 1), in: text) else { return nil }
        return Double(text[range])
    }

    private func counterDraft(mineValue: Double, theirValue: Double, cashNet: Double) -> String {
        copy(
            "我对这笔交易有兴趣。按目前记录，我方估值 ¥\(mineValue.formatted())，对方估值 ¥\(theirValue.formatted())。为了平衡交易，建议\(cashPhrase(cashNet))。如果可以，我们就核对具体卡片与品相。",
            "I’m interested. My current estimate is ¥\(mineValue.formatted()) for my side and ¥\(theirValue.formatted()) for yours. To balance the deal, I suggest \(cashPhrase(cashNet).lowercased()). If that works, let’s verify the exact cards and condition.",
            "興味があります。現在の推定は自分側¥\(mineValue.formatted())、相手側¥\(theirValue.formatted())です。調整は\(cashPhrase(cashNet))を提案します。よければカードと状態を確認しましょう。"
        )
    }

    private func addStructuredCard() {
        let line = [composerYear, composerBrand, composerSet, composerPlayer, composerType, composerParallel, composerNumber, composerGrade, composerValue]
            .map { $0.trimmingCharacters(in: .whitespacesAndNewlines) }
            .joined(separator: " | ")
        if composerSide == .mine {
            mine = mine.isEmpty ? line : "\(mine)\n\(line)"
        } else {
            theirs = theirs.isEmpty ? line : "\(theirs)\n\(line)"
        }
        clearComposer()
        showingComposer = false
    }

    private func clearComposer() {
        composerYear = ""
        composerBrand = ""
        composerSet = ""
        composerPlayer = ""
        composerType = ""
        composerParallel = ""
        composerNumber = ""
        composerGrade = "Raw"
        composerValue = ""
    }

    private func toggleMineCard(_ card: CardItem) {
        if selectedMineIDs.contains(card.id) {
            selectedMineIDs.remove(card.id)
        } else {
            selectedMineIDs.insert(card.id)
        }
        mine = store.cards.filter { selectedMineIDs.contains($0.id) }.map(fixedFormat).joined(separator: "\n")
    }

    private func fixedFormat(_ card: CardItem) -> String {
        [
            card.year,
            card.brand ?? "",
            card.set,
            card.player,
            card.type,
            card.parallel,
            card.number,
            card.grade ?? "Raw",
            card.estimatedValue > 0 ? String(format: "%.2f", card.estimatedValue) : ""
        ].joined(separator: " | ")
    }

    private var parsedIncomingCards: [CardItem] {
        theirCards.map { card in
            CardItem(
                year: card.year,
                brand: card.brand,
                set: card.set,
                player: card.player,
                type: card.type,
                parallel: card.parallel,
                number: card.number,
                grade: card.grade.isEmpty ? nil : card.grade,
                paidPrice: 0,
                estimatedValue: card.value,
                acquiredAt: .now
            )
        }
    }

    private func saveTrade() {
        guard hasBothSides else { return }
        let paid = Double(cashPaid) ?? 0
        let received = Double(cashReceived) ?? 0
        store.addTrade(TradeDeal(
            date: .now,
            offeredCards: mine,
            receivedCards: theirs,
            offeredValue: sideValue(mineCards),
            receivedValue: sideValue(theirCards),
            cashAdjustment: paid - received,
            notes: copy("移动端记录；估值来源已在交易构建器中标注。", "Recorded on mobile; estimate sources were labeled in the trade builder.", "モバイルで記録。推定元はトレードビルダーに表示済みです。")
        ))
        store.removeCards(ids: selectedMineIDs)
        parsedIncomingCards.forEach(store.addCard)
        store.message = copy("交易已记录，并保留双方卡片与估值快照。", "Trade recorded with both card and estimate snapshots.", "双方のカードと推定スナップショットを記録しました。")
        mine = ""
        theirs = ""
        cashPaid = ""
        cashReceived = ""
        selectedMineIDs = []
        proposals = []
        proposalSignature = ""
    }
}
