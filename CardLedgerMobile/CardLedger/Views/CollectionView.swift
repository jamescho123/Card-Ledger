import PhotosUI
import SwiftUI
import UIKit
import Vision

private enum CollectionListStyle: Int, CaseIterable, Identifiable {
    case grid, list
    var id: Int { rawValue }
}

private enum CollectionQuickFilter: String, CaseIterable, Identifiable {
    case all = "全部卡片"
    case psa = "PSA 评级卡"
    case missingImage = "缺少卡图"
    case review = "待完善"
    var id: String { rawValue }
}

private enum CollectionSort: String, CaseIterable, Identifiable {
    case newest = "最新添加"
    case player = "球员 A-Z"
    case year = "年份由新到旧"
    var id: String { rawValue }
}

struct CollectionView: View {
    @EnvironmentObject private var store: AppStore
    @State private var search = ""
    @State private var displayMode = 0
    @State private var listStyle: CollectionListStyle = .grid
    @State private var quickFilter: CollectionQuickFilter = .all
    @State private var sort: CollectionSort = .newest
    @State private var selectedCard: CardItem?
    @State private var showingCommunity = false
    @State private var showingPremium = false

    private var displayCards: [CardItem] {
        if !store.cards.isEmpty {
            if let limit = store.displayCabinetLimit { return Array(store.cards.prefix(limit)) }
            return store.cards
        }
        return SampleCardCatalog.cards
    }

    private var filteredCards: [CardItem] {
        let query = search.trimmingCharacters(in: .whitespacesAndNewlines).lowercased()
        let matching = store.cards.filter { card in
            let searchable = [card.year, card.brand ?? "", card.set, card.player, card.type, card.parallel, card.number, card.grade ?? ""]
                .joined(separator: " ").lowercased()
            let queryMatches = query.isEmpty || searchable.contains(query)
            let filterMatches: Bool = switch quickFilter {
            case .all: true
            case .psa: isPSA(card)
            case .missingImage: card.imageURL?.isEmpty != false
            case .review: needsReview(card)
            }
            return queryMatches && filterMatches
        }
        return matching.sorted { first, second in
            switch sort {
            case .newest: first.acquiredAt > second.acquiredAt
            case .player: first.player.localizedCaseInsensitiveCompare(second.player) == .orderedAscending
            case .year: first.year.localizedStandardCompare(second.year) == .orderedDescending
            }
        }
    }

    private var reviewCount: Int { store.cards.filter(needsReview).count }
    private var imageCount: Int { store.cards.filter { $0.imageURL?.isEmpty == false }.count }
    private var psaCount: Int { store.cards.filter { $0.psaPopulation != nil }.count }
    private var collectionHealth: Double {
        var earned = 0
        var possible = 0
        store.cards.forEach { card in
            [card.sport ?? "", card.year, card.brand ?? "", card.set, card.player, card.type, card.number, card.imageURL ?? ""].forEach {
                possible += 1
                if !$0.isEmpty { earned += 1 }
            }
            if isPSA(card) {
                possible += 1
                if card.certification?.isEmpty == false { earned += 1 }
            }
        }
        return possible > 0 ? Double(earned) / Double(possible) : 0
    }

    private func isPSA(_ card: CardItem) -> Bool {
        card.grade?.localizedCaseInsensitiveContains("PSA") == true || card.psaPopulation != nil
    }

    private func needsReview(_ card: CardItem) -> Bool {
        card.normalizedSport == "Other" || card.year.isEmpty || card.brand?.isEmpty != false || card.set.isEmpty || card.player.isEmpty || card.number.isEmpty
            || (isPSA(card) && card.certification?.isEmpty != false)
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                LazyVStack(alignment: .leading, spacing: 20) {
                    collectionOverview

                    HStack {
                        VStack(alignment: .leading, spacing: 3) {
                            Text("展示空间").font(.title2.bold())
                            Text("选择展柜或卡盒浏览方式").font(.caption).foregroundStyle(LedgerTheme.secondary)
                        }
                        Spacer()
                        Picker("展示方式", selection: $displayMode) {
                            Image(systemName: "cabinet.fill").tag(0)
                            Image(systemName: "shippingbox.fill").tag(1)
                        }
                        .pickerStyle(.segmented).frame(width: 112)
                    }

                    if let limit = store.displayCabinetLimit {
                        HStack {
                            Label(L10n.freeShowcase(used: min(store.cards.count, limit), limit: limit), systemImage: "lock.open")
                                .font(.caption).foregroundStyle(LedgerTheme.secondary)
                            Spacer()
                            Button("解锁无限展示") { showingPremium = true }.font(.caption.weight(.semibold)).foregroundStyle(LedgerTheme.gold)
                        }
                    }

                    displayGallery

                    inventoryHeader
                    quickFilters
                    inventory
                }
                .padding(.horizontal, 16).padding(.bottom, 30)
            }
            .safeAreaInset(edge: .top, spacing: 0) { BrandHeader(trailingIcon: "person.2") { showingCommunity = true } }
            .searchable(text: $search, prompt: "搜索年份、品牌、系列或球员")
            .stitchScreen()
            .fullScreenCover(isPresented: $showingCommunity) { CommunityView() }
            .fullScreenCover(isPresented: $showingPremium) { PremiumPlansView() }
            .sheet(item: $selectedCard) { card in
                CollectionCardDetail(card: card).environmentObject(store)
            }
        }
    }

    private var collectionOverview: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack(alignment: .firstTextBaseline) {
                VStack(alignment: .leading, spacing: 4) {
                    Text("收藏概览").font(.title.bold())
                    Text("资料越完整，查找与核验越可靠").font(.caption).foregroundStyle(LedgerTheme.secondary)
                }
                Spacer()
                Text(collectionHealth, format: .percent.precision(.fractionLength(0)))
                    .font(.title.bold().monospacedDigit()).foregroundStyle(LedgerTheme.mint)
            }
            ProgressView(value: collectionHealth).tint(LedgerTheme.mint)
            HStack(spacing: 0) {
                CollectionMetric(label: "卡片", value: store.cards.count.formatted(), icon: "rectangle.stack")
                CollectionMetric(label: "有卡图", value: imageCount.formatted(), icon: "photo")
                CollectionMetric(label: "PSA 已核验", value: psaCount.formatted(), icon: "checkmark.seal")
                CollectionMetric(label: "待完善", value: reviewCount.formatted(), icon: "exclamationmark.circle")
            }
        }
        .ledgerPanel(border: LedgerTheme.greenBorder)
    }

    private var displayGallery: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            LazyHStack(spacing: displayMode == 0 ? 16 : -20) {
                ForEach(displayCards) { card in
                    Button { selectedCard = card } label: {
                        ShowcaseCard(card: card, storageMode: displayMode == 1)
                    }
                    .buttonStyle(.plain)
                    .zIndex(Double(displayCards.firstIndex(of: card) ?? 0) * -1)
                }
            }.padding(18)
        }
        .frame(height: 330)
        .background(
            LinearGradient(colors: [LedgerTheme.mintStrong.opacity(0.72), LedgerTheme.background], startPoint: .topLeading, endPoint: .bottomTrailing),
            in: RoundedRectangle(cornerRadius: 8)
        )
        .overlay { RoundedRectangle(cornerRadius: 8).stroke(LedgerTheme.greenBorder) }
        .shadow(color: LedgerTheme.mint.opacity(0.12), radius: 24, y: 12)
    }

    private var inventoryHeader: some View {
        HStack(spacing: 12) {
            VStack(alignment: .leading, spacing: 3) {
                Text("卡片清单").font(.title2.bold())
                Text(L10n.itemCount(filteredCards.count)).font(.caption).foregroundStyle(LedgerTheme.secondary)
            }
            Spacer()
            Picker("视图", selection: $listStyle) {
                Image(systemName: "square.grid.2x2").tag(CollectionListStyle.grid)
                Image(systemName: "list.bullet").tag(CollectionListStyle.list)
            }
            .pickerStyle(.segmented).frame(width: 104)
            Menu {
                ForEach(CollectionSort.allCases) { option in
                    Button { sort = option } label: {
                        Label(LocalizedStringKey(option.rawValue), systemImage: sort == option ? "checkmark" : "arrow.up.arrow.down")
                    }
                }
            } label: {
                Image(systemName: "arrow.up.arrow.down").frame(width: 36, height: 36)
                    .background(LedgerTheme.raised, in: RoundedRectangle(cornerRadius: 7))
            }
        }
    }

    private var quickFilters: some View {
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 8) {
                ForEach(CollectionQuickFilter.allCases) { filter in
                    Button { quickFilter = filter } label: {
                        Text(LocalizedStringKey(filter.rawValue)).font(.caption.weight(.semibold))
                            .foregroundStyle(quickFilter == filter ? LedgerTheme.onAccent : LedgerTheme.secondary)
                            .padding(.horizontal, 12).frame(height: 34)
                            .background(quickFilter == filter ? LedgerTheme.mint : LedgerTheme.raised, in: Capsule())
                            .overlay { Capsule().stroke(quickFilter == filter ? LedgerTheme.mint : LedgerTheme.border) }
                    }
                    .buttonStyle(.plain)
                }
            }
        }
    }

    @ViewBuilder private var inventory: some View {
        if filteredCards.isEmpty {
            ContentUnavailableView("没有匹配卡片", systemImage: "rectangle.stack.badge.questionmark", description: Text("调整搜索或筛选条件后再试。"))
                .frame(maxWidth: .infinity).padding(.vertical, 36).ledgerPanel()
        } else if listStyle == .grid {
            LazyVGrid(columns: [GridItem(.adaptive(minimum: 158), spacing: 12)], spacing: 12) {
                ForEach(filteredCards) { card in
                    Button { selectedCard = card } label: { CollectionGridCard(card: card) }.buttonStyle(.plain)
                }
            }
        } else {
            LazyVStack(spacing: 10) {
                ForEach(filteredCards) { card in
                    Button { selectedCard = card } label: { CollectionListRow(card: card) }.buttonStyle(.plain)
                }
            }
        }
    }
}

private struct CollectionMetric: View {
    let label: String, value: String, icon: String
    var body: some View {
        VStack(alignment: .leading, spacing: 5) {
            Image(systemName: icon).font(.caption.weight(.bold)).foregroundStyle(LedgerTheme.gold)
            Text(value).font(.headline.monospacedDigit()).foregroundStyle(LedgerTheme.text)
            Text(LocalizedStringKey(label)).font(.system(size: 9, weight: .semibold)).foregroundStyle(LedgerTheme.secondary).lineLimit(1)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(.leading, 10)
        .overlay(alignment: .leading) { Rectangle().fill(LedgerTheme.border).frame(width: 1) }
    }
}

private struct ShowcaseCard: View {
    let card: CardItem
    let storageMode: Bool
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            RemoteCardImage(url: card.imageURL, contentMode: .fit)
                .frame(width: 174, height: 238)
                .background(LedgerTheme.background.opacity(0.55))
            VStack(alignment: .leading, spacing: 4) {
                Text(card.player).font(.headline).lineLimit(1)
                Text("\(card.year) \(card.brand ?? "") \(card.set)").font(.caption).foregroundStyle(LedgerTheme.secondary).lineLimit(1)
            if let population = card.psaPopulation {
                Text(verbatim: L10n.populationLabel(gradeLabel: population.gradeLabel, grade: population.grade, population: population.populationAtGrade, higher: population.populationHigher))
                    .font(.caption2.weight(.semibold)).foregroundStyle(LedgerTheme.mint).lineLimit(2)
            }
            }.padding(10)
        }
        .frame(width: 174)
        .background(LedgerTheme.panelGradient, in: RoundedRectangle(cornerRadius: 8))
        .overlay { RoundedRectangle(cornerRadius: 8).stroke(LedgerTheme.greenBorder) }
        .rotation3DEffect(.degrees(storageMode ? -5 : 0), axis: (x: 0, y: 1, z: 0))
        .shadow(color: .black.opacity(0.28), radius: 16, y: 10)
    }
}

private struct CollectionGridCard: View {
    let card: CardItem
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            ZStack(alignment: .topTrailing) {
                RemoteCardImage(url: card.imageURL, contentMode: .fit)
                    .frame(maxWidth: .infinity).aspectRatio(0.73, contentMode: .fit)
                    .background(LedgerTheme.background.opacity(0.55))
                VStack(alignment: .trailing, spacing: 5) {
                    Text("\(card.investmentAssessment.score)").font(.system(size: 10, weight: .bold).monospacedDigit()).foregroundStyle(LedgerTheme.background)
                        .padding(.horizontal, 7).padding(.vertical, 4).background(LedgerTheme.mint, in: Capsule())
                    if let population = card.psaPopulation {
                        Text("POP \(population.populationAtGrade.formatted())").font(.system(size: 9, weight: .bold)).foregroundStyle(.white)
                            .padding(.horizontal, 7).padding(.vertical, 4).background(Color.red.opacity(0.88), in: Capsule())
                    }
                }
                .padding(8)
            }
            VStack(alignment: .leading, spacing: 5) {
                Text(card.player).font(.subheadline.bold()).lineLimit(1)
                Text("\(card.year) · \(card.set)").font(.caption2).foregroundStyle(LedgerTheme.secondary).lineLimit(1)
                Text(verbatim: L10n.cardDetail(card)).font(.caption2).foregroundStyle(LedgerTheme.gold).lineLimit(1)
            }.padding(11)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(LedgerTheme.panelGradient, in: RoundedRectangle(cornerRadius: 8))
        .overlay { RoundedRectangle(cornerRadius: 8).stroke(LedgerTheme.border) }
    }
}

private struct CollectionListRow: View {
    let card: CardItem
    var body: some View {
        HStack(spacing: 13) {
            RemoteCardImage(url: card.imageURL, contentMode: .fit).frame(width: 66, height: 88).clipShape(RoundedRectangle(cornerRadius: 6))
            VStack(alignment: .leading, spacing: 5) {
                Text(card.player).font(.headline).lineLimit(1)
                Text("\(card.year) · \(card.brand ?? "") \(card.set)").font(.caption).foregroundStyle(LedgerTheme.secondary).lineLimit(2)
                if let population = card.psaPopulation {
                    Text(verbatim: L10n.populationLabel(gradeLabel: population.gradeLabel, grade: population.grade, population: population.populationAtGrade, higher: population.populationHigher))
                        .font(.caption2.weight(.semibold)).foregroundStyle(LedgerTheme.mint)
                } else {
                    Text(verbatim: L10n.cardDetail(card)).font(.caption2).foregroundStyle(LedgerTheme.gold).lineLimit(1)
                }
                Text(verbatim: L10n.investmentSummary(score: card.investmentAssessment.score, label: card.investmentAssessment.label)).font(.caption2.weight(.semibold)).foregroundStyle(LedgerTheme.mint)
            }
            Spacer()
            Image(systemName: "chevron.right").foregroundStyle(LedgerTheme.secondary)
        }
        .ledgerPanel(border: LedgerTheme.greenBorder.opacity(0.7))
    }
}

private struct CollectionCardDetail: View {
    @EnvironmentObject private var store: AppStore
    @Environment(\.dismiss) private var dismiss
    let card: CardItem
    @State private var population: PSAPopulationRecord?
    @State private var refreshing = false

    init(card: CardItem) {
        self.card = card
        _population = State(initialValue: card.psaPopulation)
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 18) {
                    RemoteCardImage(url: card.imageURL, contentMode: .fit)
                        .frame(maxWidth: .infinity).aspectRatio(0.76, contentMode: .fit)
                        .background(LedgerTheme.raised, in: RoundedRectangle(cornerRadius: 8))
                        .clipShape(RoundedRectangle(cornerRadius: 8))
                    VStack(alignment: .leading, spacing: 7) {
                        Text(card.player).font(.largeTitle.bold())
                        Text([card.year, card.brand, card.set].compactMap { $0 }.joined(separator: " · ")).foregroundStyle(LedgerTheme.secondary)
                        Text(verbatim: L10n.cardDetail(card)).foregroundStyle(LedgerTheme.gold)
                    }
                    InvestmentScorePanel(assessment: card.investmentAssessment)
                    if let population {
                        VStack(alignment: .leading, spacing: 10) {
                            HStack { Text("PSA").font(.caption.bold()).foregroundStyle(.red); Spacer(); Text(population.gradeLabel).font(.headline) }
                            HStack {
                                DetailMetric(label: "评级数量", value: population.populationAtGrade.formatted())
                                DetailMetric(label: "更高分", value: population.populationHigher.formatted())
                                if let total = population.populationTotal { DetailMetric(label: "总评级量", value: total.formatted()) }
                            }
                            Text(verbatim: L10n.psaSource(String(population.fetchedAt.prefix(10)))).font(.caption2).foregroundStyle(LedgerTheme.secondary)
                        }.ledgerPanel(border: Color.red.opacity(0.42))
                    }
                    if card.grade?.localizedCaseInsensitiveContains("PSA") == true || card.psaPopulation != nil {
                        Button {
                            refreshing = true
                            Task {
                                population = await store.refreshPSAPopulation(for: card.id) ?? population
                                refreshing = false
                            }
                        } label: {
                            if refreshing { ProgressView().frame(maxWidth: .infinity) }
                            else { Label("更新 PSA 评级数量", systemImage: "arrow.clockwise").frame(maxWidth: .infinity) }
                        }
                        .buttonStyle(PrimaryActionStyle()).disabled(refreshing)
                    }
                }.padding(18)
            }
            .navigationTitle("卡片详情").navigationBarTitleDisplayMode(.inline)
            .toolbar { ToolbarItem(placement: .topBarTrailing) { Button("关闭") { dismiss() } } }
            .stitchScreen()
        }
    }
}

private struct InvestmentScorePanel: View {
    let assessment: InvestmentAssessment

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(alignment: .firstTextBaseline) {
                VStack(alignment: .leading, spacing: 3) {
                    Text("收藏投资评分").font(.headline)
                    Text(verbatim: L10n.investmentLabel(assessment.label)).font(.caption).foregroundStyle(LedgerTheme.secondary)
                }
                Spacer()
                Text("\(assessment.score)/100").font(.title2.bold().monospacedDigit()).foregroundStyle(LedgerTheme.mint)
            }
            ForEach(assessment.factors) { factor in
                VStack(alignment: .leading, spacing: 5) {
                    HStack { Text(LocalizedStringKey(factor.name)).font(.caption.bold()); Spacer(); Text(factor.score.formatted()).font(.caption.bold().monospacedDigit()) }
                    ProgressView(value: Double(factor.score), total: 100).tint(LedgerTheme.mint)
                    Text(verbatim: L10n.investmentDetail(factor.detail)).font(.caption2).foregroundStyle(LedgerTheme.secondary)
                }
            }
            Text("仅供收藏研究参考，不构成投资建议。市场走势与流动性将在同步已核验成交后计算。").font(.caption2).foregroundStyle(LedgerTheme.gold)
        }
        .ledgerPanel(border: LedgerTheme.greenBorder)
    }
}

private struct DetailMetric: View {
    let label: String, value: String
    var body: some View {
        VStack(alignment: .leading, spacing: 3) {
            Text(value).font(.title3.bold().monospacedDigit())
            Text(LocalizedStringKey(label)).font(.caption2).foregroundStyle(LedgerTheme.secondary)
        }.frame(maxWidth: .infinity, alignment: .leading)
    }
}

struct AddHubView: View {
    @State private var mode: Int
    init() {
        let arguments = ProcessInfo.processInfo.arguments
        _mode = State(initialValue: arguments.contains("-DIYDemo") ? 1 : arguments.contains("-TradeDemo") ? 2 : 0)
    }
    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                BrandHeader(trailingIcon: "clock.arrow.circlepath") { }
                Picker("添加模式", selection: $mode) {
                    Text("添加卡片").tag(0)
                    Text(verbatim: L10n.diy("mode")).tag(1)
                    Text("AI 交易").tag(2)
                }
                .pickerStyle(.segmented).padding(.horizontal, 18).padding(.bottom, 10)
                if mode == 0 {
                    AddCardFlowView()
                } else if mode == 1 {
                    DIYCardsView()
                } else {
                    TradesView(embedded: true)
                }
            }
            .stitchScreen()
        }
    }
}

struct AddCardFlowView: View {
    @EnvironmentObject private var store: AppStore
    @State private var step = 1
    @State private var photoItem: PhotosPickerItem?
    @State private var photoData: Data?
    @State private var scanMatches: [CardScanMatch] = []
    @State private var isScanning = false
    @State private var scanMessage = ""
    @State private var showCamera = false
    @State private var year = ""
    @State private var brand = ""
    @State private var setName = ""
    @State private var player = ""
    @State private var type = "Base"
    @State private var parallel = ""
    @State private var number = ""
    @State private var sport = "Basketball"
    @State private var grade = ""
    @State private var certification = ""
    @State private var psaPopulation: PSAPopulationRecord?
    @State private var isLookingUpPSA = false
    @State private var showAdvanced = false

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 22) {
                HStack { Text("添加卡片").font(.largeTitle.bold()).foregroundStyle(LedgerTheme.mint); Spacer(); Text(L10n.step(step, total: 3)).foregroundStyle(LedgerTheme.secondary) }
                stepIndicator
                if step == 1 { captureStep }
                else if step == 2 { matchStep }
                else { confirmStep }
            }
            .padding(20).padding(.bottom, 110)
        }
        .task(id: photoItem) { await loadSelectedPhoto() }
        .sheet(isPresented: $showCamera) {
            CardCameraPicker { data in
                showCamera = false
                Task { await recognizePhoto(data) }
            }
            .ignoresSafeArea()
        }
        .stitchScreen()
    }

    private var stepIndicator: some View {
        HStack(spacing: 8) {
            ForEach(1...3, id: \.self) { value in Capsule().fill(value <= step ? LedgerTheme.mint : LedgerTheme.highest).frame(height: 4) }
        }
    }

    private var captureStep: some View {
        let photoSurface = LedgerTheme.surface
        let photoAccent = LedgerTheme.mint
        let photoBorder = LedgerTheme.greenBorder
        let photoPrompt = L10n.chooseCardPhoto()
        return VStack(alignment: .leading, spacing: 18) {
            Text(scanCopy("拍摄或上传卡片", "Photograph or upload a card", "カードを撮影またはアップロード")).font(.title.bold())
            Text(scanCopy("系统会先读取评级标签与卡面文字，再与你的卡片目录和内置目录比对。", "Card Ledger reads the slab label and printed card text first, then checks your collection and the built-in catalog.", "スラブラベルとカードの文字を読み取り、コレクションと内蔵カタログに照合します。")).foregroundStyle(LedgerTheme.secondary)
            Button {
                step = 3
            } label: {
                Label(L10n.skipPhotoManualEntry(), systemImage: "square.and.pencil")
                    .frame(maxWidth: .infinity, minHeight: 44)
            }
            .buttonStyle(.bordered).tint(LedgerTheme.mint)

            PhotosPicker(selection: $photoItem, matching: .images) {
                ZStack {
                    RoundedRectangle(cornerRadius: 8).fill(photoSurface)
                    if let photoData, let image = UIImage(data: photoData) {
                        Image(uiImage: image).resizable().scaledToFit().padding(12)
                    } else {
                        VStack(spacing: 14) {
                            Image(systemName: "photo.badge.plus").font(.system(size: 54)).foregroundStyle(photoAccent)
                            Text(verbatim: photoPrompt).foregroundStyle(photoAccent)
                        }
                    }
                }
                .frame(height: 380)
                .overlay { RoundedRectangle(cornerRadius: 8).stroke(photoBorder, style: StrokeStyle(lineWidth: 1, dash: [8])) }
            }

            Text(verbatim: L10n.localPhotoNotice())
                .font(.caption).foregroundStyle(LedgerTheme.secondary)
            if isScanning {
                HStack(spacing: 10) {
                    ProgressView().tint(LedgerTheme.mint)
                    Text(scanCopy("正在读取卡片身份……", "Reading the card identity...", "カード情報を読み取っています…")).font(.caption).foregroundStyle(LedgerTheme.secondary)
                }
            } else if !scanMessage.isEmpty {
                Label(scanMessage, systemImage: scanMatches.isEmpty ? "exclamationmark.magnifyingglass" : "checkmark.circle")
                    .font(.caption).foregroundStyle(scanMatches.isEmpty ? LedgerTheme.gold : LedgerTheme.mint)
            }
            HStack(spacing: 10) {
                Button {
                    guard UIImagePickerController.isSourceTypeAvailable(.camera) else {
                        scanMessage = scanCopy("模拟器没有相机，请从相册选择。", "The simulator has no camera. Choose a photo instead.", "シミュレータではカメラを使えません。写真を選択してください。")
                        return
                    }
                    showCamera = true
                } label: {
                    Label(scanCopy("拍摄", "Camera", "カメラ"), systemImage: "camera").frame(maxWidth: .infinity, minHeight: 50)
                }
                .buttonStyle(.bordered).tint(LedgerTheme.mint)
                PhotosPicker(selection: $photoItem, matching: .images) {
                    Label(scanCopy("相册", "Photos", "写真"), systemImage: "photo.badge.arrow.down").frame(maxWidth: .infinity, minHeight: 50)
                }
                    .buttonStyle(.bordered).tint(LedgerTheme.gold)
            }
            Button(scanCopy("下一步：选择匹配", "Next: choose a match", "次へ：候補を選択")) { step = 2 }
                .buttonStyle(PrimaryActionStyle()).disabled(isScanning || photoData == nil)
        }
    }

    private var matchStep: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text(scanCopy("选择最接近的卡片", "Choose the closest card", "最も近いカードを選択")).font(.title.bold())
            Text(scanCopy("候选按卡面文字、评级信息和已知卡图排序。保存前请核对每个字段。", "Candidates are ranked from card text, grading details, and known card images. Confirm every field before saving.", "カード文字、鑑定情報、登録画像で候補を並べます。保存前にすべての項目を確認してください。")).foregroundStyle(LedgerTheme.secondary)
            if scanMatches.isEmpty {
                ContentUnavailableView(
                    scanCopy("未找到可信的具体卡片", "No confident card identity", "信頼できるカード候補なし"),
                    systemImage: "rectangle.and.text.magnifyingglass",
                    description: Text(scanCopy("请尝试正对、完整的卡片照片，或手动填写。", "Try a straight-on photo with the full label and card number visible, or enter the details manually.", "ラベルとカード番号が見える正面写真で再試行するか、手動入力してください。"))
                )
                .frame(maxWidth: .infinity).ledgerPanel(border: LedgerTheme.greenBorder)
            }
            ForEach(scanMatches) { match in
                Button {
                    let card = match.card
                    year = card.year
                    brand = card.brand ?? ""
                    setName = card.set
                    player = card.player
                    type = card.type
                    parallel = card.parallel
                    number = card.number
                    sport = card.sport ?? "Basketball"
                    grade = card.grade ?? ""
                    certification = card.certification ?? ""
                    step = 3
                } label: {
                    HStack(spacing: 14) {
                        RemoteCardImage(url: match.card.imageURL, contentMode: .fit).frame(width: 64, height: 84).clipShape(RoundedRectangle(cornerRadius: 6))
                        VStack(alignment: .leading, spacing: 5) {
                            Text("\(match.card.year) \(match.card.brand ?? "") \(match.card.set)").font(.headline)
                            Text(match.card.player).foregroundStyle(LedgerTheme.secondary)
                            Text("\(Int(match.score * 100))% · \(match.evidence.joined(separator: " · "))")
                                .font(.caption2).foregroundStyle(match.score >= 0.72 ? LedgerTheme.mint : LedgerTheme.gold)
                        }
                        Spacer(); Image(systemName: "chevron.right")
                    }.ledgerPanel(border: LedgerTheme.greenBorder)
                }.buttonStyle(.plain)
            }
            Button(scanCopy("没有正确匹配，手动填写", "No correct match, enter manually", "正しい候補がないため手動入力")) { step = 3 }.buttonStyle(.bordered).frame(maxWidth: .infinity)
        }
    }

    private var confirmStep: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("确认卡片信息").font(.title.bold())
            VStack(spacing: 14) {
                field("年份", text: $year, prompt: "2023-24")
                field("品牌", text: $brand, prompt: "Panini / Topps / Pokémon")
                field("系列", text: $setName, prompt: "Prizm / Chrome / 151")
                field("球员 / 角色", text: $player, prompt: "Stephen Curry")
                field("卡号", text: $number, prompt: "136")
                Picker("运动 / 分类", selection: $sport) {
                    ForEach(["Basketball", "Baseball", "Soccer", "Football", "Hockey", "PTCG / TCG"], id: \.self) {
                        Text(verbatim: L10n.sportName($0))
                    }
                }
                DisclosureGroup("高级信息", isExpanded: $showAdvanced) {
                    VStack(spacing: 12) {
                        field("类型", text: $type, prompt: "Base / Rookie / Auto")
                        field("平行 / 变体", text: $parallel, prompt: "Silver / Refractor")
                        field("评级", text: $grade, prompt: "PSA 10")
                        field("评级证书编号", text: $certification, prompt: "PSA cert number")
                        if grade.localizedCaseInsensitiveContains("PSA") {
                            Button { lookupPSAPopulation() } label: {
                                if isLookingUpPSA { ProgressView().frame(maxWidth: .infinity) }
                                else { Label("查询 PSA 评级数量", systemImage: "checkmark.seal").frame(maxWidth: .infinity) }
                            }
                            .buttonStyle(.bordered).tint(.red).disabled(isLookingUpPSA)
                            if let psaPopulation {
                                VStack(alignment: .leading, spacing: 6) {
                                    Text(psaPopulation.gradeLabel).font(.headline)
                                    Text(verbatim: L10n.populationLabel(
                                        gradeLabel: psaPopulation.gradeLabel,
                                        grade: psaPopulation.grade,
                                        population: psaPopulation.populationAtGrade,
                                        higher: psaPopulation.populationHigher
                                    ))
                                        .font(.subheadline.weight(.semibold)).foregroundStyle(LedgerTheme.mint)
                                    Text(verbatim: L10n.psaSource(psaPopulation.fetchedAt)).font(.caption2).foregroundStyle(LedgerTheme.secondary)
                                }
                                .frame(maxWidth: .infinity, alignment: .leading).padding(12)
                                .background(LedgerTheme.background, in: RoundedRectangle(cornerRadius: 6))
                            }
                        }
                    }.padding(.top, 12)
                }
            }
            .ledgerPanel()
            Button { save() } label: { Label("确认并加入收藏", systemImage: "checkmark.shield") }.buttonStyle(PrimaryActionStyle())
            Button("返回匹配") { step = 2 }.frame(maxWidth: .infinity)
        }
    }

    private func field(_ title: String, text: Binding<String>, prompt: String) -> some View {
        VStack(alignment: .leading, spacing: 6) { Text(LocalizedStringKey(title)).font(.caption).foregroundStyle(LedgerTheme.secondary); TextField(prompt, text: text).textFieldStyle(.plain).padding(12).background(LedgerTheme.background, in: RoundedRectangle(cornerRadius: 6)) }
    }

    private func scanCopy(_ chinese: String, _ english: String, _ japanese: String) -> String {
        switch AppPreferences.shared.language {
        case .chinese: chinese
        case .english: english
        case .japanese: japanese
        }
    }

    private func loadSelectedPhoto() async {
        guard let photoItem else { return }
        guard let data = try? await photoItem.loadTransferable(type: Data.self) else {
            scanMessage = scanCopy("无法读取这张照片。", "This photo could not be read.", "この写真を読み込めませんでした。")
            return
        }
        await recognizePhoto(data)
    }

    private func recognizePhoto(_ data: Data) async {
        photoData = data
        scanMatches = []
        isScanning = true
        scanMessage = ""
        let catalog = (store.cards + SampleCardCatalog.cards).reduce(into: [String: CardItem]()) { result, card in
            let key = [card.year, card.brand ?? "", card.set, card.player, card.number, card.parallel]
                .joined(separator: "|").lowercased()
            result[key] = card
        }.map(\.value)
        scanMatches = await CardPhotoRecognizer.recognize(data: data, catalog: catalog)
        isScanning = false
        scanMessage = scanMatches.isEmpty
            ? scanCopy("未找到可信候选，可重拍或手动填写。", "No confident candidate. Retake the photo or enter it manually.", "信頼できる候補がありません。再撮影または手動入力してください。")
            : scanCopy("已找到 \(scanMatches.count) 个候选，请选择最接近的卡片。", "Found \(scanMatches.count) candidates. Choose the closest card.", "\(scanMatches.count)件の候補が見つかりました。最も近いカードを選択してください。")
    }

    private func lookupPSAPopulation() {
        isLookingUpPSA = true
        Task {
            defer { isLookingUpPSA = false }
            psaPopulation = await resolvePSAPopulation()
        }
    }

    private func save() {
        guard !year.isEmpty, !brand.isEmpty, !setName.isEmpty, !player.isEmpty else { return }
        Task {
            if grade.localizedCaseInsensitiveContains("PSA"), psaPopulation == nil {
                isLookingUpPSA = true
                psaPopulation = await resolvePSAPopulation()
                isLookingUpPSA = false
            }
            let cardID = UUID().uuidString
            let imageURL = photoData.flatMap { CardImageStorage.save($0, cardID: cardID) }
            store.addCard(CardItem(id: cardID, sport: sport, year: year, brand: brand, set: setName, player: player, type: type, parallel: parallel, number: number, grade: grade.isEmpty ? nil : grade, paidPrice: 0, estimatedValue: 0, acquiredAt: .now, imageURL: imageURL, certification: certification.isEmpty ? nil : certification, psaPopulation: psaPopulation))
            step = 1; photoItem = nil; photoData = nil; scanMatches = []; scanMessage = ""; year = ""; brand = ""; setName = ""; player = ""; number = ""; grade = ""; certification = ""; psaPopulation = nil
            store.message = "卡片已加入收藏。"
        }
    }

    private func resolvePSAPopulation() async -> PSAPopulationRecord? {
        let digits = certification.filter(\.isNumber)
        if digits.count >= 7 { return await store.lookupPSACert(digits) }
        let query = [year, brand, setName, player, number, parallel].filter { !$0.isEmpty }.joined(separator: " ")
        let requestedGrade = grade.split(whereSeparator: { !$0.isNumber && $0 != "." }).compactMap { Double($0) }.first
        return await store.searchPSAPopulation(query).first {
            populationMatchesForm($0) && (requestedGrade == nil || $0.grade == requestedGrade)
        }
    }

    private func populationMatchesForm(_ population: PSAPopulationRecord) -> Bool {
        func normalized(_ value: String) -> [String] {
            value.folding(options: [.caseInsensitive, .diacriticInsensitive], locale: .current)
                .split(whereSeparator: { !$0.isLetter && !$0.isNumber }).map(String.init)
        }
        func exact(_ left: String, _ right: String) -> Bool { right.isEmpty || normalized(left) == normalized(right) }
        func contains(_ left: String, _ right: String) -> Bool {
            let actual = Set(normalized(left))
            return normalized(right).allSatisfy(actual.contains)
        }
        return exact(population.year, year)
            && exact(population.subject, player)
            && exact(population.cardNumber, number)
            && contains(population.brand.isEmpty ? population.setName : population.brand, brand)
            && contains(population.setName, setName)
            && contains(population.variety, parallel)
    }
}

private struct CardScanMatch: Identifiable {
    var id: String { card.id }
    var card: CardItem
    var score: Double
    var evidence: [String]
}

private enum CardPhotoRecognizer {
    static func recognize(data: Data, catalog: [CardItem]) async -> [CardScanMatch] {
        await Task.detached(priority: .userInitiated) {
            let lines = recognizeText(in: data)
            let rawText = lines.joined(separator: "\n")
            let normalizedText = normalize(rawText)
            guard !normalizedText.isEmpty else { return [] }
            let queryFeature = featurePrint(data: data)
            let detectedGrade = grade(in: rawText)
            let detectedCertification = certification(in: lines)

            return catalog.compactMap { source -> CardScanMatch? in
                var card = source
                var score = 0.0
                var evidence: [String] = []
                let playerFound = phrase(source.player, in: normalizedText)
                if playerFound { score += 0.42; evidence.append("player") }
                if phrase(source.year, in: normalizedText) { score += 0.12; evidence.append("year") }
                if phrase(source.brand ?? "", in: normalizedText) { score += 0.08; evidence.append("brand") }
                let setCoverage = tokenCoverage(source.set, in: normalizedText)
                if setCoverage >= 0.66 { score += 0.16 * setCoverage; evidence.append("set") }
                if number(source.number, in: rawText, normalizedText: normalizedText) { score += 0.15; evidence.append("number") }
                if phrase(source.parallel, in: normalizedText), !source.parallel.isEmpty { score += 0.04; evidence.append("parallel") }

                if let queryFeature, let referenceImage = image(for: source.imageURL), let referenceFeature = featurePrint(image: referenceImage) {
                    var distance: Float = 2
                    if (try? queryFeature.computeDistance(&distance, to: referenceFeature)) != nil {
                        let imageScore = max(0, min(1, 1 - Double(distance) / 0.55))
                        if imageScore >= 0.58 {
                            score += 0.18 * imageScore
                            evidence.append("image")
                        }
                    }
                }

                guard playerFound, evidence.count >= 2, score >= 0.48 else { return nil }
                if let detectedGrade { card.grade = detectedGrade; evidence.append("grade") }
                if let detectedCertification { card.certification = detectedCertification; evidence.append("certificate") }
                return CardScanMatch(card: card, score: min(0.99, score), evidence: evidence)
            }
            .sorted { $0.score > $1.score }
            .prefix(5)
            .map { $0 }
        }.value
    }

    private static func recognizeText(in data: Data) -> [String] {
        let request = VNRecognizeTextRequest()
        request.recognitionLevel = .accurate
        request.recognitionLanguages = ["en-US", "zh-Hans", "ja-JP"]
        request.usesLanguageCorrection = true
        request.minimumTextHeight = 0.012
        let handler = VNImageRequestHandler(data: data, options: [:])
        try? handler.perform([request])
        return (request.results ?? []).compactMap { $0.topCandidates(1).first?.string }
    }

    private static func normalize(_ value: String) -> String {
        value.folding(options: [.caseInsensitive, .diacriticInsensitive], locale: .current)
            .lowercased()
            .replacingOccurrences(of: "[^a-z0-9\\p{L}]+", with: " ", options: .regularExpression)
            .split(separator: " ").joined(separator: " ")
    }

    private static func phrase(_ value: String, in normalizedText: String) -> Bool {
        let target = normalize(value)
        return !target.isEmpty && normalizedText.contains(target)
    }

    private static func tokenCoverage(_ value: String, in normalizedText: String) -> Double {
        let ignored = Set(["panini", "topps", "card", "cards", "basketball", "baseball", "football", "soccer"])
        let tokens = normalize(value).split(separator: " ").map(String.init).filter { $0.count > 1 && !ignored.contains($0) }
        guard !tokens.isEmpty else { return 0 }
        return Double(tokens.filter { normalizedText.contains($0) }.count) / Double(tokens.count)
    }

    private static func number(_ value: String, in rawText: String, normalizedText: String) -> Bool {
        let target = value.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !target.isEmpty else { return false }
        if normalize(target).count > 3, phrase(target, in: normalizedText) { return true }
        let escaped = NSRegularExpression.escapedPattern(for: target)
        return rawText.range(of: "(?:#|NO\\.?\\s*)\\s*\(escaped)(?![0-9])", options: [.regularExpression, .caseInsensitive]) != nil
    }

    private static func grade(in text: String) -> String? {
        let pattern = "(?:PSA|BGS|BECKETT|SGC)[^\\n]{0,24}?\\b(10|9\\.5|9|8\\.5|8|7\\.5|7|6)\\b"
        guard let range = text.range(of: pattern, options: [.regularExpression, .caseInsensitive]) else { return nil }
        let matched = String(text[range]).uppercased().replacingOccurrences(of: "BECKETT", with: "BGS")
        let company = matched.range(of: "PSA|BGS|SGC", options: .regularExpression).map { String(matched[$0]) } ?? ""
        let score = matched.range(of: "10|9\\.5|9|8\\.5|8|7\\.5|7|6", options: .regularExpression).map { String(matched[$0]) } ?? ""
        return company.isEmpty || score.isEmpty ? nil : "\(company) \(score)"
    }

    private static func certification(in lines: [String]) -> String? {
        lines.compactMap { line -> String? in
            let digits = line.filter(\.isNumber)
            return (7...12).contains(digits.count) ? digits : nil
        }.first
    }

    private static func featurePrint(data: Data) -> VNFeaturePrintObservation? {
        let request = VNGenerateImageFeaturePrintRequest()
        try? VNImageRequestHandler(data: data, options: [:]).perform([request])
        return request.results?.first as? VNFeaturePrintObservation
    }

    private static func featurePrint(image: UIImage) -> VNFeaturePrintObservation? {
        guard let cgImage = image.cgImage else { return nil }
        let request = VNGenerateImageFeaturePrintRequest()
        try? VNImageRequestHandler(cgImage: cgImage, options: [:]).perform([request])
        return request.results?.first as? VNFeaturePrintObservation
    }

    private static func image(for reference: String?) -> UIImage? {
        guard let reference, !reference.isEmpty else { return nil }
        if reference.hasPrefix("asset:") { return UIImage(named: String(reference.dropFirst("asset:".count))) }
        if CardImageStorage.isLocal(reference) { return CardImageStorage.image(for: reference) }
        return nil
    }
}

private struct CardCameraPicker: UIViewControllerRepresentable {
    var onCapture: (Data) -> Void

    func makeCoordinator() -> Coordinator { Coordinator(onCapture: onCapture) }

    func makeUIViewController(context: Context) -> UIImagePickerController {
        let picker = UIImagePickerController()
        picker.sourceType = .camera
        picker.cameraCaptureMode = .photo
        picker.delegate = context.coordinator
        return picker
    }

    func updateUIViewController(_ uiViewController: UIImagePickerController, context: Context) {}

    final class Coordinator: NSObject, UINavigationControllerDelegate, UIImagePickerControllerDelegate {
        let onCapture: (Data) -> Void
        init(onCapture: @escaping (Data) -> Void) { self.onCapture = onCapture }

        func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey: Any]) {
            guard let image = info[.originalImage] as? UIImage, let data = image.jpegData(compressionQuality: 0.92) else {
                picker.dismiss(animated: true)
                return
            }
            onCapture(data)
        }

        func imagePickerControllerDidCancel(_ picker: UIImagePickerController) { picker.dismiss(animated: true) }
    }
}
