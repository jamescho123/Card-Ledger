import SwiftUI

struct DIYCardsView: View {
    @EnvironmentObject private var store: AppStore
    @State private var section = 0
    @State private var descriptionText = ""
    @State private var series = "Card Ledger Originals"
    @State private var playerSubject = ""
    @State private var parallel = "Emerald Refractor"
    @State private var finish = "Holographic foil"
    @State private var cardTitle = ""
    @State private var cardNumber = "01"
    @State private var listingIntent: DIYListingIntent = .showcase
    @State private var generated: DIYGeneratedImage?

    init() {
#if DEBUG
        if ProcessInfo.processInfo.arguments.contains("-DIYDemo") {
            _descriptionText = State(initialValue: "At the final buzzer, an original guard in a deep green uniform hits a step-back three under arena lights. Use emerald refractor texture, a fine gold border, dynamic light trails, and a restrained premium finish without team or brand logos.")
            _playerSubject = State(initialValue: "Original basketball guard")
            _cardTitle = State(initialValue: "Emerald Clutch")
        }
#endif
    }

    var body: some View {
        VStack(spacing: 0) {
            Picker(L10n.diy("studio"), selection: $section) {
                Text(verbatim: L10n.diy("create")).tag(0)
                Text(verbatim: L10n.diy("library")).tag(1)
            }
            .pickerStyle(.segmented)
            .padding(.horizontal, 18)
            .padding(.bottom, 10)

            if section == 0 {
                creator
            } else {
                library
            }
        }
    }

    private var creator: some View {
        ScrollViewReader { proxy in
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    VStack(alignment: .leading, spacing: 8) {
                        Label(L10n.diy("studio"), systemImage: "wand.and.stars")
                            .font(.largeTitle.bold())
                            .foregroundStyle(LedgerTheme.mint)
                        Text(verbatim: L10n.diy("intro"))
                            .foregroundStyle(LedgerTheme.secondary)
                    }

                    descriptionEditor
                    promptIdeas
                    identityFields
                    generationAction

                    if let generated {
                        generatedPreview(generated)
                            .id("diy-generated-preview")
                    }
                }
                .padding(20)
                .padding(.bottom, 110)
            }
            .scrollDismissesKeyboard(.interactively)
            .onChange(of: generated?.model) { _, model in
                guard model != nil else { return }
                withAnimation(.easeInOut(duration: 0.45)) {
                    proxy.scrollTo("diy-generated-preview", anchor: .top)
                }
            }
            .task {
#if DEBUG
                if ProcessInfo.processInfo.arguments.contains("-DIYAutoGenerate"), generated == nil {
                    generate()
                }
#endif
            }
        }
    }

    private var descriptionEditor: some View {
        VStack(alignment: .leading, spacing: 9) {
            HStack {
                Text(verbatim: L10n.diy("description")).font(.headline)
                Spacer()
                Text("\(descriptionText.count)/1200")
                    .font(.caption.monospacedDigit())
                    .foregroundStyle(descriptionText.count >= 40 ? LedgerTheme.mint : LedgerTheme.secondary)
            }
            ZStack(alignment: .topLeading) {
                if descriptionText.isEmpty {
                    Text(verbatim: L10n.diy("description_hint"))
                        .font(.body)
                        .foregroundStyle(LedgerTheme.secondary.opacity(0.72))
                        .padding(.horizontal, 7)
                        .padding(.vertical, 10)
                        .allowsHitTesting(false)
                }
                TextEditor(text: $descriptionText)
                    .scrollContentBackground(.hidden)
                    .frame(minHeight: 172)
                    .foregroundStyle(LedgerTheme.text)
                    .onChange(of: descriptionText) { _, newValue in
                        if newValue.count > 1200 { descriptionText = String(newValue.prefix(1200)) }
                    }
            }
            .padding(8)
            .background(LedgerTheme.background, in: RoundedRectangle(cornerRadius: 8))
            .overlay { RoundedRectangle(cornerRadius: 8).stroke(LedgerTheme.greenBorder) }
        }
        .ledgerPanel(border: LedgerTheme.greenBorder)
    }

    private var promptIdeas: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text(verbatim: L10n.diy("ideas"))
                .font(.caption.weight(.bold))
                .foregroundStyle(LedgerTheme.gold)
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 8) {
                    ForEach(promptSamples, id: \.title) { sample in
                        Button {
                            playerSubject = sample.subject
                            descriptionText = sample.description
                            cardTitle = sample.title
                        } label: {
                            Label(sample.title, systemImage: sample.icon)
                                .font(.caption.weight(.semibold))
                                .padding(.horizontal, 12)
                                .frame(height: 38)
                                .background(LedgerTheme.raised, in: Capsule())
                                .overlay { Capsule().stroke(LedgerTheme.border) }
                        }
                        .buttonStyle(.plain)
                    }
                }
            }
        }
    }

    private var identityFields: some View {
        VStack(spacing: 14) {
            diyField(L10n.diy("series"), text: $series, prompt: "Card Ledger Originals")
            diyField(L10n.diy("subject"), text: $playerSubject, prompt: "Stephen Curry / original character")
            HStack(alignment: .top, spacing: 12) {
                diyField(L10n.diy("parallel"), text: $parallel, prompt: "Emerald Refractor")
                diyField(L10n.diy("number"), text: $cardNumber, prompt: "01")
                    .frame(maxWidth: 105)
            }
            diyField(L10n.diy("finish"), text: $finish, prompt: "Holographic foil")
            diyField(L10n.diy("title"), text: $cardTitle, prompt: playerSubject.isEmpty ? "Night Shift" : playerSubject)

            VStack(alignment: .leading, spacing: 8) {
                Text(verbatim: L10n.diy("intent"))
                    .font(.caption.weight(.semibold))
                    .foregroundStyle(LedgerTheme.secondary)
                Picker(L10n.diy("intent"), selection: $listingIntent) {
                    Text(verbatim: L10n.diy("showcase")).tag(DIYListingIntent.showcase)
                    Text(verbatim: L10n.diy("trade")).tag(DIYListingIntent.trade)
                    Text(verbatim: L10n.diy("sale")).tag(DIYListingIntent.sale)
                }
                .pickerStyle(.segmented)
            }
        }
        .ledgerPanel()
    }

    private var generationAction: some View {
        VStack(spacing: 10) {
            Button {
                generate()
            } label: {
                HStack(spacing: 10) {
                    if store.isGeneratingDIY {
                        ProgressView().tint(LedgerTheme.onAccent)
                    } else {
                        Image(systemName: "wand.and.sparkles")
                    }
                    Text(verbatim: store.isGeneratingDIY ? L10n.diy("generating") : L10n.diy("generate"))
                }
            }
            .buttonStyle(PrimaryActionStyle())
            .disabled(!canGenerate || store.isGeneratingDIY)

            Text(verbatim: canGenerate ? L10n.diy("privacy") : L10n.diy("minimum"))
                .font(.caption)
                .foregroundStyle(canGenerate ? LedgerTheme.secondary : LedgerTheme.gold)
                .frame(maxWidth: .infinity, alignment: .leading)
        }
    }

    private func generatedPreview(_ result: DIYGeneratedImage) -> some View {
        VStack(alignment: .leading, spacing: 14) {
            HStack {
                Text(verbatim: L10n.diy("preview")).font(.title2.bold())
                Spacer()
                StatusPill(text: L10n.diy("unofficial"), color: LedgerTheme.gold)
            }

            if let image = UIImage(data: result.data) {
                Image(uiImage: image)
                    .resizable()
                    .scaledToFit()
                    .frame(maxWidth: .infinity)
                    .aspectRatio(2 / 3, contentMode: .fit)
                    .clipShape(RoundedRectangle(cornerRadius: 8))
                    .overlay { RoundedRectangle(cornerRadius: 8).stroke(LedgerTheme.gold.opacity(0.65), lineWidth: 1.5) }
                    .shadow(color: LedgerTheme.mint.opacity(0.24), radius: 24, y: 14)
            }

            HStack(spacing: 10) {
                Button {
                    save(result)
                } label: {
                    Label(L10n.diy("save"), systemImage: "square.and.arrow.down")
                }
                .buttonStyle(PrimaryActionStyle())

                Button {
                    generated = nil
                    generate()
                } label: {
                    Image(systemName: "arrow.clockwise")
                        .frame(width: 48, height: 52)
                }
                .buttonStyle(.bordered)
                .tint(LedgerTheme.gold)
                .accessibilityLabel(L10n.diy("generate"))
            }
        }
        .ledgerPanel(border: LedgerTheme.gold.opacity(0.48))
    }

    private var library: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                HStack {
                    VStack(alignment: .leading, spacing: 4) {
                        Text(verbatim: L10n.diy("library")).font(.largeTitle.bold())
                        Text("\(store.diyCards.count)")
                            .font(.caption.monospacedDigit())
                            .foregroundStyle(LedgerTheme.secondary)
                    }
                    Spacer()
                    Button {
                        section = 0
                    } label: {
                        Label(L10n.diy("new"), systemImage: "plus")
                    }
                    .buttonStyle(.bordered)
                    .tint(LedgerTheme.mint)
                }

                if store.diyCards.isEmpty {
                    ContentUnavailableView {
                        Label(L10n.diy("library"), systemImage: "rectangle.portrait.on.rectangle.portrait")
                    } description: {
                        Text(verbatim: L10n.diy("empty"))
                    } actions: {
                        Button(L10n.diy("create")) { section = 0 }
                            .buttonStyle(.borderedProminent)
                            .tint(LedgerTheme.mint)
                    }
                    .frame(maxWidth: .infinity, minHeight: 420)
                } else {
                    LazyVGrid(columns: [GridItem(.flexible(), spacing: 12), GridItem(.flexible(), spacing: 12)], spacing: 14) {
                        ForEach(store.diyCards) { card in
                            libraryCard(card)
                        }
                    }
                }
            }
            .padding(20)
            .padding(.bottom, 110)
        }
    }

    private func libraryCard(_ card: DIYCardItem) -> some View {
        VStack(alignment: .leading, spacing: 10) {
            RemoteCardImage(url: card.imageURL, contentMode: .fit)
                .aspectRatio(2 / 3, contentMode: .fit)
                .frame(maxWidth: .infinity)
                .background(LedgerTheme.background)
                .clipShape(RoundedRectangle(cornerRadius: 7))
                .overlay(alignment: .topTrailing) {
                    StatusPill(text: intentLabel(card.listingIntent), color: intentColor(card.listingIntent))
                        .padding(8)
                }
            Text(card.title.isEmpty ? card.playerSubject : card.title)
                .font(.headline)
                .lineLimit(2)
            Text([card.series, card.parallel, card.cardNumber].filter { !$0.isEmpty }.joined(separator: " · "))
                .font(.caption)
                .foregroundStyle(LedgerTheme.secondary)
                .lineLimit(2)
        }
        .padding(10)
        .background(LedgerTheme.panelGradient, in: RoundedRectangle(cornerRadius: 8))
        .overlay { RoundedRectangle(cornerRadius: 8).stroke(LedgerTheme.border) }
        .contextMenu {
            Button(role: .destructive) {
                store.removeDIYCard(card)
            } label: {
                Label(L10n.diy("delete"), systemImage: "trash")
            }
        }
    }

    private func diyField(_ title: String, text: Binding<String>, prompt: String) -> some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(verbatim: title)
                .font(.caption.weight(.semibold))
                .foregroundStyle(LedgerTheme.secondary)
            TextField(prompt, text: text)
                .textFieldStyle(.plain)
                .padding(12)
                .background(LedgerTheme.background, in: RoundedRectangle(cornerRadius: 6))
                .overlay { RoundedRectangle(cornerRadius: 6).stroke(LedgerTheme.greenBorder.opacity(0.65)) }
        }
    }

    private var canGenerate: Bool {
        descriptionText.trimmingCharacters(in: .whitespacesAndNewlines).count >= 40
            && !playerSubject.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }

    private func generate() {
        let request = DIYImageGenerationRequest(
            description: descriptionText.trimmingCharacters(in: .whitespacesAndNewlines),
            series: series.trimmingCharacters(in: .whitespacesAndNewlines),
            playerSubject: playerSubject.trimmingCharacters(in: .whitespacesAndNewlines),
            parallel: parallel.trimmingCharacters(in: .whitespacesAndNewlines),
            finish: finish.trimmingCharacters(in: .whitespacesAndNewlines),
            cardTitle: cardTitle.trimmingCharacters(in: .whitespacesAndNewlines),
            cardNumber: cardNumber.trimmingCharacters(in: .whitespacesAndNewlines)
        )
        Task {
            let result = await store.generateDIYImage(request)
            generated = result
#if DEBUG
            if ProcessInfo.processInfo.arguments.contains("-DIYAutoSave"), let result {
                save(result)
            }
#endif
        }
    }

    private func save(_ result: DIYGeneratedImage) {
        let id = UUID().uuidString
        let imageURL = CardImageStorage.save(result.data, cardID: "diy-\(id)")
        let item = DIYCardItem(
            id: id,
            series: series,
            playerSubject: playerSubject,
            parallel: parallel,
            cardNumber: cardNumber,
            finish: finish,
            title: cardTitle.isEmpty ? playerSubject : cardTitle,
            description: descriptionText,
            prompt: result.prompt,
            imageURL: imageURL,
            createdAt: .now,
            isAIGenerated: true,
            listingIntent: listingIntent
        )
        store.addDIYCard(item)
        store.message = L10n.diy("saved")
        generated = nil
        section = 1
    }

    private func intentLabel(_ intent: DIYListingIntent) -> String {
        switch intent {
        case .showcase: L10n.diy("showcase")
        case .trade: L10n.diy("trade")
        case .sale: L10n.diy("sale")
        }
    }

    private func intentColor(_ intent: DIYListingIntent) -> Color {
        switch intent {
        case .showcase: LedgerTheme.mint
        case .trade: LedgerTheme.gold
        case .sale: LedgerTheme.danger
        }
    }

    private var promptSamples: [(title: String, subject: String, description: String, icon: String)] {
        switch AppPreferences.shared.language {
        case .chinese:
            [
                ("翡翠绝杀", "原创篮球后卫", "比赛最后一秒，一名身穿深绿色球衣的原创后卫在满场灯光下投进后撤步三分。卡面使用翡翠折射纹理、细金边、动态光轨与克制的高级质感，不出现任何球队或品牌标志。", "basketball.fill"),
                ("黄金弧线", "原创足球前锋", "雨夜球场中，一名原创足球前锋完成弧线任意球，草屑与水珠被金色灯光照亮。设计采用黑金镭射平行、速度线与电影海报式构图，不出现真实俱乐部标志。", "soccerball"),
                ("未来新秀", "原创新秀球员", "一名原创新秀站在未来感训练馆中央，周围是蓝绿色数据光带与银色棱镜。卡面强调新秀能量、现代留白和稀有折射效果，整体像高端收藏卡但完全原创。", "sparkles")
            ]
        case .english:
            [
                ("Emerald Clutch", "Original basketball guard", "At the final buzzer, an original guard in a deep green uniform hits a step-back three under arena lights. Use emerald refractor texture, a fine gold border, dynamic light trails, and a restrained premium finish without team or brand logos.", "basketball.fill"),
                ("Golden Curve", "Original football striker", "On a rainy night pitch, an original striker bends a free kick through illuminated rain and flying turf. Use black-and-gold laser foil, speed lines, and cinematic poster composition without real club logos.", "soccerball"),
                ("Future Rookie", "Original rookie athlete", "An original rookie stands in a futuristic training court surrounded by teal data ribbons and silver prisms. Emphasize rookie energy, modern negative space, and a rare refractor finish in a fully original premium card design.", "sparkles")
            ]
        case .japanese:
            [
                ("エメラルド・クラッチ", "オリジナルのバスケットボール選手", "試合終了の瞬間、深緑のユニフォームを着たオリジナルのガードがステップバック・スリーを決める。エメラルドのリフラクター、細い金縁、光の軌跡を使い、チームやブランドのロゴは入れない。", "basketball.fill"),
                ("ゴールデンカーブ", "オリジナルのサッカー選手", "雨の夜、オリジナルのストライカーがカーブするフリーキックを放ち、雨粒と芝が金色の光に照らされる。黒金レーザー箔と映画的な構図で、実在クラブのロゴは入れない。", "soccerball"),
                ("未来のルーキー", "オリジナルの新人選手", "未来的なトレーニングコートに立つオリジナルの新人選手。青緑のデータ光と銀色のプリズムで、若さ、余白、希少なリフラクター加工を表現した完全オリジナルの高級カード。", "sparkles")
            ]
        }
    }
}
