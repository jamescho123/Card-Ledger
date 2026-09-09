import SwiftUI

enum AppLanguage: String, CaseIterable, Identifiable {
    case chinese = "zh-Hans"
    case english = "en"
    case japanese = "ja"

    var id: String { rawValue }
    var label: String {
        switch self { case .chinese: "简体中文"; case .english: "English"; case .japanese: "日本語" }
    }
}

enum AppAppearance: String, CaseIterable, Identifiable {
    case emerald, midnight, crimson, titanium
    var id: String { rawValue }
    var label: String {
        switch self {
        case .emerald: "翡翠藏库"
        case .midnight: "午夜墨蓝"
        case .crimson: "绯红档案"
        case .titanium: "钛金灰"
        }
    }
}

@MainActor
final class AppPreferences: ObservableObject {
    static let shared = AppPreferences()
    @Published var language: AppLanguage {
        didSet { UserDefaults.standard.set(language.rawValue, forKey: "mobile.language") }
    }
    @Published var appearance: AppAppearance {
        didSet { UserDefaults.standard.set(appearance.rawValue, forKey: "mobile.appearance") }
    }

    private init() {
        let arguments = ProcessInfo.processInfo.arguments
        let debugLanguage = arguments.value(after: "-CardLedgerLanguage")
        let debugAppearance = arguments.value(after: "-CardLedgerAppearance")
        language = AppLanguage(rawValue: debugLanguage ?? UserDefaults.standard.string(forKey: "mobile.language") ?? "") ?? .chinese
        appearance = AppAppearance(rawValue: debugAppearance ?? UserDefaults.standard.string(forKey: "mobile.appearance") ?? "") ?? .emerald
    }
}

@MainActor
enum L10n {
    static func string(_ key: String) -> String {
        let language = AppPreferences.shared.language.rawValue
        guard let path = Bundle.main.path(forResource: language, ofType: "lproj"),
              let bundle = Bundle(path: path) else { return key }
        return bundle.localizedString(forKey: key, value: key, table: nil)
    }

    static func missingGoal(_ title: String, count: Int) -> String {
        switch AppPreferences.shared.language {
        case .chinese: "\(string(title)) 尚有 \(count) 张待集齐"
        case .english: "\(string(title)) still needs \(count) cards"
        case .japanese: "\(string(title))：残り\(count)枚"
        }
    }

    static func step(_ current: Int, total: Int) -> String {
        switch AppPreferences.shared.language {
        case .chinese: "第 \(current)/\(total) 步"
        case .english: "Step \(current) of \(total)"
        case .japanese: "\(current)/\(total) ステップ"
        }
    }

    static func itemCount(_ count: Int) -> String {
        switch AppPreferences.shared.language {
        case .chinese: "共 \(count) 项"
        case .english: "\(count) items"
        case .japanese: "全\(count)項目"
        }
    }

    static func sportName(_ value: String) -> String {
        let names: [String: (String, String)] = [
            "Basketball": ("篮球", "バスケットボール"),
            "Baseball": ("棒球", "野球"),
            "Soccer": ("足球", "サッカー"),
            "Football": ("美式橄榄球", "アメリカンフットボール"),
            "Hockey": ("冰球", "ホッケー"),
            "PTCG / TCG": ("宝可梦 / 集换式卡牌", "ポケモン / TCG")
        ]
        guard let name = names[value] else { return value }
        switch AppPreferences.shared.language {
        case .chinese: return name.0
        case .english: return value
        case .japanese: return name.1
        }
    }

    static func trackedCards(_ count: Int) -> String {
        switch AppPreferences.shared.language {
        case .chinese: "\(count) 张已追踪"
        case .english: "\(count) tracked cards"
        case .japanese: "\(count)枚を追跡中"
        }
    }

    static func investmentLabel(_ value: String) -> String {
        let labels: [String: (String, String)] = [
            "数据支撑较强": ("Strong evidence", "根拠が強い"),
            "数据逐步完善": ("Developing evidence", "データ拡充中"),
            "高不确定性": ("Speculative", "投機的"),
            "数据不足": ("Limited evidence", "根拠不足")
        ]
        guard let label = labels[value] else { return value }
        switch AppPreferences.shared.language {
        case .chinese: return value
        case .english: return label.0
        case .japanese: return label.1
        }
    }

    static func investmentSummary(score: Int, label: String) -> String {
        switch AppPreferences.shared.language {
        case .chinese: "投资评分 \(score) · \(investmentLabel(label))"
        case .english: "Investment score \(score) · \(investmentLabel(label))"
        case .japanese: "投資スコア \(score)・\(investmentLabel(label))"
        }
    }

    static func investmentDetail(_ value: String) -> String {
        switch AppPreferences.shared.language {
        case .chinese: return value
        case .english:
            if value == "等待同步已成交记录" { return "Waiting for completed-sale sync" }
            if value == "暂无可验证的稀缺数据" { return "No verified scarcity data" }
            if value == "未评级或未填写" { return "Raw or grade not recorded" }
            if value.hasPrefix("限量 /") { return value.replacingOccurrences(of: "限量", with: "Serial") }
            if value.hasPrefix("卡片信息完整度 ") { return value.replacingOccurrences(of: "卡片信息完整度", with: "Card identity completeness") }
            return value
        case .japanese:
            if value == "等待同步已成交记录" { return "成約履歴の同期待ち" }
            if value == "暂无可验证的稀缺数据" { return "確認済みの希少性データなし" }
            if value == "未评级或未填写" { return "未鑑定または未入力" }
            if value.hasPrefix("限量 /") { return value.replacingOccurrences(of: "限量", with: "シリアル") }
            if value.hasPrefix("卡片信息完整度 ") { return value.replacingOccurrences(of: "卡片信息完整度", with: "カード情報完成度") }
            return value
        }
    }

    static func ownedCount(_ count: Int) -> String {
        switch AppPreferences.shared.language {
        case .chinese: "已拥有：\(count)"
        case .english: "Owned: \(count)"
        case .japanese: "所有済み：\(count)"
        }
    }

    static func totalCount(_ count: Int) -> String {
        switch AppPreferences.shared.language {
        case .chinese: "总数量：\(count)"
        case .english: "Total: \(count)"
        case .japanese: "合計：\(count)"
        }
    }

    static func aiUsesRemaining(_ count: Int) -> String {
        switch AppPreferences.shared.language {
        case .chinese: "本月剩余 \(count) 次"
        case .english: "\(count) left this month"
        case .japanese: "今月残り\(count)回"
        }
    }

    static func freeShowcase(used: Int, limit: Int) -> String {
        switch AppPreferences.shared.language {
        case .chinese: "免费展示位：\(used)/\(limit)"
        case .english: "Free showcase: \(used)/\(limit)"
        case .japanese: "無料展示枠：\(used)/\(limit)"
        }
    }

    static func cardTerm(_ value: String) -> String {
        let terms: [String: (String, String)] = [
            "base": ("基础卡", "ベース"),
            "rookie": ("新秀卡", "ルーキー"),
            "record": ("纪录卡", "記録カード"),
            "milestone": ("里程碑卡", "マイルストーン"),
            "insert": ("特卡", "インサート"),
            "auto": ("签字卡", "オート"),
            "silver": ("银折", "シルバー"),
            "refractor": ("折射", "リフラクター"),
            "holo": ("闪卡", "ホロ")
        ]
        guard let term = terms[value.lowercased()] else { return value }
        switch AppPreferences.shared.language {
        case .chinese: return term.0
        case .english: return value
        case .japanese: return term.1
        }
    }

    static func cardDetail(_ card: CardItem) -> String {
        [card.type, card.parallel, card.number, card.grade]
            .compactMap { $0 }
            .filter { !$0.isEmpty }
            .map(cardTerm)
            .joined(separator: " · ")
    }

    static func populationLabel(gradeLabel: String, grade: Double, population: Int, higher: Int) -> String {
        let label = gradeLabel.isEmpty ? "PSA \(grade.formatted())" : gradeLabel
        return switch AppPreferences.shared.language {
        case .chinese: "\(label) · 同分 \(population.formatted()) 张 · 更高分 \(higher.formatted()) 张"
        case .english: "\(label) · Pop \(population.formatted()) · \(higher.formatted()) higher"
        case .japanese: "\(label) · 同グレード \(population.formatted())枚 · 上位 \(higher.formatted())枚"
        }
    }

    static func psaSource(_ fetchedAt: String) -> String {
        switch AppPreferences.shared.language {
        case .chinese: "数据来源：PSA · \(fetchedAt)"
        case .english: "Source: PSA · \(fetchedAt)"
        case .japanese: "データ提供：PSA · \(fetchedAt)"
        }
    }

    static func demoGoalTitle() -> String {
        switch AppPreferences.shared.language {
        case .chinese: "Topps NOW 篮球里程碑收藏"
        case .english: "Topps NOW Basketball Milestones"
        case .japanese: "Topps NOW バスケットボール記録カード"
        }
    }

    static func demoGoalDetail() -> String {
        switch AppPreferences.shared.language {
        case .chinese: "文班亚马与勒布朗·詹姆斯 · 2024"
        case .english: "Victor Wembanyama & LeBron James · 2024"
        case .japanese: "ウェンバンヤマ＆レブロン・ジェームズ · 2024"
        }
    }

    static func aiTradeBuilderTitle() -> String {
        switch AppPreferences.shared.language {
        case .chinese: "AI 交易构建器"
        case .english: "AI TRADE BUILDER"
        case .japanese: "AI トレードビルダー"
        }
    }

    static func accountCreated() -> String {
        switch AppPreferences.shared.language {
        case .chinese: "账户与个人资料已创建。请查收验证邮件，完成确认后登录。"
        case .english: "Account and profile created. Check your email to confirm the account, then sign in."
        case .japanese: "アカウントとプロフィールを作成しました。確認メールの手続き後にログインしてください。"
        }
    }

    static func profileSaved() -> String {
        switch AppPreferences.shared.language {
        case .chinese: "个人资料已保存至 Supabase。"
        case .english: "Profile saved to Supabase."
        case .japanese: "プロフィールを Supabase に保存しました。"
        }
    }

    static func signInForPSA() -> String {
        switch AppPreferences.shared.language {
        case .chinese: "请先登录，再查询 PSA 评级数量。"
        case .english: "Sign in to search PSA population data."
        case .japanese: "PSA の鑑定枚数を検索するにはログインしてください。"
        }
    }

    static func collectionSyncUnavailable(_ detail: String) -> String {
        switch AppPreferences.shared.language {
        case .chinese: "登录成功，但收藏同步暂时不可用：\(detail)"
        case .english: "Signed in, but collection sync is temporarily unavailable: \(detail)"
        case .japanese: "ログインしましたが、コレクション同期は一時的に利用できません：\(detail)"
        }
    }

    static func cardCloudSaveFailed(_ detail: String) -> String {
        switch AppPreferences.shared.language {
        case .chinese: "卡片已保存到本机，但云端同步失败：\(detail)"
        case .english: "Card saved locally, but cloud sync failed: \(detail)"
        case .japanese: "カードは端末に保存されましたが、クラウド同期に失敗しました：\(detail)"
        }
    }

    static func cardCloudDeleteFailed(_ detail: String) -> String {
        switch AppPreferences.shared.language {
        case .chinese: "卡片已从本机移除，但云端同步失败：\(detail)"
        case .english: "Card removed locally, but cloud sync failed: \(detail)"
        case .japanese: "カードは端末から削除されましたが、クラウド同期に失敗しました：\(detail)"
        }
    }

    static func missingPhotoAlert(_ count: Int) -> String {
        switch AppPreferences.shared.language {
        case .chinese: "\(count) 张卡片缺少照片，补图后更容易核验与交易"
        case .english: "\(count) cards are missing photos. Add them for easier verification and trading."
        case .japanese: "\(count)枚のカードに画像がありません。確認や取引のために追加してください。"
        }
    }

    static func recordReviewAlert(_ count: Int) -> String {
        switch AppPreferences.shared.language {
        case .chinese: "\(count) 张卡片缺少年份、系列、球员、卡号或评级证书信息"
        case .english: "\(count) cards are missing identity or grading-certificate details."
        case .japanese: "\(count)枚のカードで識別情報または鑑定番号が不足しています。"
        }
    }

    static func uncategorizedCards(_ count: Int) -> String {
        switch AppPreferences.shared.language {
        case .chinese: "\(count) 张卡片尚未设置运动或 TCG 分类"
        case .english: "\(count) cards need a sport or TCG category."
        case .japanese: "\(count)枚のカードでスポーツまたはTCG分類が未設定です。"
        }
    }

    static func uncategorizedTitle() -> String {
        switch AppPreferences.shared.language {
        case .chinese: "待分类"
        case .english: "Uncategorized"
        case .japanese: "未分類"
        }
    }

    static func skipPhotoManualEntry() -> String {
        switch AppPreferences.shared.language {
        case .chinese: "跳过照片，直接手动填写"
        case .english: "Skip photo and enter details"
        case .japanese: "画像を省略して手動入力"
        }
    }

    static func chooseCardPhoto() -> String {
        switch AppPreferences.shared.language {
        case .chinese: "点击选择卡片照片"
        case .english: "Tap to choose a card photo"
        case .japanese: "タップしてカード画像を選択"
        }
    }

    static func localPhotoNotice() -> String {
        switch AppPreferences.shared.language {
        case .chinese: "照片会先保存在本机；媒体云同步接入后可跨设备显示。"
        case .english: "Photos are stored on this device until cloud media sync is connected."
        case .japanese: "クラウド画像同期が利用可能になるまでは、この端末に保存されます。"
        }
    }

    static func tradeReadinessTitle() -> String {
        switch AppPreferences.shared.language {
        case .chinese: "交易资料完整度"
        case .english: "Trade Data Readiness"
        case .japanese: "取引データ完成度"
        }
    }

    static func tradeReadinessDetail() -> String {
        switch AppPreferences.shared.language {
        case .chinese: "检查双方卡片身份字段，不代表公平或价值"
        case .english: "Checks card identity fields, not fairness or value"
        case .japanese: "カード識別情報の確認であり、公平性や価値の判定ではありません"
        }
    }

    static func tradeStatus(hasBothSides: Bool, ready: Bool) -> String {
        switch AppPreferences.shared.language {
        case .chinese: return !hasBothSides ? "待填写双方卡片" : ready ? "可以记录" : "资料待完善"
        case .english: return !hasBothSides ? "Add both sides" : ready ? "Ready to record" : "Details need review"
        case .japanese: return !hasBothSides ? "双方のカードを入力" : ready ? "記録可能" : "情報を確認"
        }
    }

    static func tradeMarketNotice() -> String {
        switch AppPreferences.shared.language {
        case .chinese: "价值比较尚未开放"
        case .english: "Value comparison is not active"
        case .japanese: "価値比較は未提供"
        }
    }

    static func unassessed() -> String {
        switch AppPreferences.shared.language {
        case .chinese: "未评估"
        case .english: "Unassessed"
        case .japanese: "未評価"
        }
    }

    static func done() -> String {
        switch AppPreferences.shared.language {
        case .chinese: "完成"
        case .english: "Done"
        case .japanese: "完了"
        }
    }

    static func tradeMarketDetail() -> String {
        switch AppPreferences.shared.language {
        case .chinese: "当前百分比只表示资料完整度。接入已核验成交数据后，才会评估价值差与市场流动性。"
        case .english: "This percentage measures data completeness only. Value gaps and liquidity will require verified sales data."
        case .japanese: "この割合は情報の完成度のみです。価値差と流動性は確認済み取引データの連携後に評価します。"
        }
    }

    static func selectFromCollection() -> String {
        switch AppPreferences.shared.language {
        case .chinese: "从收藏选择"
        case .english: "Choose from collection"
        case .japanese: "コレクションから選択"
        }
    }

    static func manualCardEntry() -> String {
        switch AppPreferences.shared.language {
        case .chinese: "手动录入"
        case .english: "Manual entry"
        case .japanese: "手動入力"
        }
    }

    static func selectedCardCount(_ count: Int) -> String {
        switch AppPreferences.shared.language {
        case .chinese: "已选 \(count) 张"
        case .english: "\(count) selected"
        case .japanese: "\(count)枚選択"
        }
    }

    static func tradeInventoryNotice(_ outgoingCount: Int) -> String {
        switch AppPreferences.shared.language {
        case .chinese: "确认后会移除已选的 \(outgoingCount) 张换出卡，并把格式正确的换入卡加入收藏。"
        case .english: "Confirmation removes \(outgoingCount) selected outgoing cards and adds correctly formatted incoming cards."
        case .japanese: "確認すると選択した放出カード\(outgoingCount)枚を削除し、形式が正しい入手カードを追加します。"
        }
    }

    static func diy(_ key: String) -> String {
        let copy: [String: (String, String, String)] = [
            "mode": ("DIY 卡片", "DIY Cards", "DIYカード"),
            "studio": ("DIY 卡片工坊", "DIY Card Studio", "DIYカード工房"),
            "create": ("创作", "Create", "作成"),
            "library": ("我的 DIY", "My DIY", "マイDIY"),
            "intro": ("写下一段完整描述，AI 会把构图、氛围与卡面效果转化为一张原创卡片。", "Describe the full card in one paragraph. AI will turn the composition, mood, and finish into an original card.", "カードの構図、雰囲気、加工を文章で説明すると、AIがオリジナルカードに仕上げます。"),
            "ideas": ("灵感示例", "Prompt ideas", "プロンプト例"),
            "description": ("卡片描述", "Card description", "カードの説明"),
            "description_hint": ("例如：夜晚球馆中，一名身穿绿色球衣的后卫完成后撤步三分。卡面采用翡翠折射纹理、金色细边与电影感灯光，整体高级、克制。", "Example: In a night arena, a guard in a green uniform hits a step-back three. Use emerald refractor texture, a fine gold border, and cinematic lighting with a premium, restrained finish.", "例：夜のアリーナで緑のユニフォームを着たガードがステップバック・スリーを決める。エメラルドのリフラクター加工、細い金縁、映画的な照明で上品に仕上げる。"),
            "series": ("原创系列", "Original series", "オリジナルシリーズ"),
            "subject": ("球员 / 角色", "Player / subject", "選手・キャラクター"),
            "parallel": ("平行版本", "Parallel", "パラレル"),
            "finish": ("卡面工艺", "Finish", "加工"),
            "title": ("卡片标题", "Card title", "カード名"),
            "number": ("卡号", "Card number", "カード番号"),
            "generate": ("AI 生成卡片", "Generate with AI", "AIでカードを生成"),
            "generating": ("正在构思与绘制卡面…", "Designing and rendering your card…", "カードをデザインしています…"),
            "preview": ("生成预览", "Generated preview", "生成プレビュー"),
            "save": ("保存到我的 DIY", "Save to My DIY", "マイDIYに保存"),
            "saved": ("DIY 卡片已保存。", "DIY card saved.", "DIYカードを保存しました。"),
            "intent": ("发布意向", "Listing intent", "公開目的"),
            "showcase": ("仅展示", "Showcase", "展示のみ"),
            "trade": ("可交换", "Open to trade", "交換可"),
            "sale": ("可出售", "For sale", "販売可"),
            "empty": ("还没有 DIY 卡片。从一段描述开始创作第一张。", "No DIY cards yet. Start with a paragraph and create your first one.", "DIYカードはまだありません。文章から最初の1枚を作りましょう。"),
            "unofficial": ("AI 生成 · 非官方卡片", "AI-generated · Unofficial card", "AI生成・非公式カード"),
            "privacy": ("描述会发送至安全的云端生成服务；API 密钥不会保存在手机中。", "Your description is sent to a protected cloud generator. The API key is never stored in the app.", "説明文は保護されたクラウド生成サービスへ送信され、APIキーはアプリに保存されません。"),
            "minimum": ("请至少填写 40 个字符，并补充球员或角色。", "Enter at least 40 characters and add a player or subject.", "40文字以上の説明と選手・キャラクター名を入力してください。"),
            "delete": ("删除", "Delete", "削除"),
            "new": ("继续创作", "Create another", "もう1枚作る")
        ]
        guard let value = copy[key] else { return key }
        return switch AppPreferences.shared.language {
        case .chinese: value.0
        case .english: value.1
        case .japanese: value.2
        }
    }
}

private extension Array where Element == String {
    func value(after flag: String) -> String? {
        guard let index = firstIndex(of: flag), indices.contains(index + 1) else { return nil }
        return self[index + 1]
    }
}

private struct LedgerPalette {
    let background: Color, surface: Color, raised: Color, highest: Color
    let accent: Color, accentStrong: Color, gold: Color, text: Color, secondary: Color, danger: Color, onAccent: Color
}

@MainActor
enum LedgerTheme {
    private static var palette: LedgerPalette {
        switch AppPreferences.shared.appearance {
        case .emerald:
            LedgerPalette(background: Color(red: 0.035, green: 0.051, blue: 0.047), surface: Color(red: 0.067, green: 0.090, blue: 0.078), raised: Color(red: 0.102, green: 0.130, blue: 0.112), highest: Color(red: 0.15, green: 0.19, blue: 0.165), accent: Color(red: 0.612, green: 0.824, blue: 0.710), accentStrong: Color(red: 0.027, green: 0.314, blue: 0.212), gold: Color(red: 0.914, green: 0.757, blue: 0.463), text: Color(red: 0.949, green: 0.961, blue: 0.949), secondary: Color(red: 0.667, green: 0.718, blue: 0.686), danger: Color(red: 1, green: 0.54, blue: 0.51), onAccent: Color(red: 0.02, green: 0.17, blue: 0.11))
        case .midnight:
            LedgerPalette(background: Color(red: 0.025, green: 0.043, blue: 0.075), surface: Color(red: 0.047, green: 0.071, blue: 0.115), raised: Color(red: 0.075, green: 0.108, blue: 0.165), highest: Color(red: 0.12, green: 0.16, blue: 0.23), accent: Color(red: 0.27, green: 0.82, blue: 0.91), accentStrong: Color(red: 0.06, green: 0.61, blue: 0.75), gold: Color(red: 0.96, green: 0.69, blue: 0.25), text: Color(red: 0.91, green: 0.95, blue: 0.98), secondary: Color(red: 0.63, green: 0.72, blue: 0.80), danger: Color(red: 1, green: 0.47, blue: 0.48), onAccent: Color(red: 0.01, green: 0.13, blue: 0.18))
        case .crimson:
            LedgerPalette(background: Color(red: 0.075, green: 0.025, blue: 0.043), surface: Color(red: 0.12, green: 0.047, blue: 0.068), raised: Color(red: 0.17, green: 0.067, blue: 0.09), highest: Color(red: 0.23, green: 0.10, blue: 0.13), accent: Color(red: 0.98, green: 0.34, blue: 0.47), accentStrong: Color(red: 0.78, green: 0.12, blue: 0.27), gold: Color(red: 0.95, green: 0.73, blue: 0.29), text: Color(red: 0.98, green: 0.91, blue: 0.92), secondary: Color(red: 0.48, green: 0.82, blue: 0.75), danger: Color(red: 1, green: 0.58, blue: 0.45), onAccent: Color(red: 0.22, green: 0.01, blue: 0.05))
        case .titanium:
            LedgerPalette(background: Color(red: 0.052, green: 0.058, blue: 0.068), surface: Color(red: 0.09, green: 0.10, blue: 0.12), raised: Color(red: 0.14, green: 0.15, blue: 0.18), highest: Color(red: 0.20, green: 0.21, blue: 0.24), accent: Color(red: 0.66, green: 0.90, blue: 0.30), accentStrong: Color(red: 0.43, green: 0.68, blue: 0.10), gold: Color(red: 0.76, green: 0.82, blue: 0.87), text: Color(red: 0.93, green: 0.94, blue: 0.95), secondary: Color(red: 0.66, green: 0.69, blue: 0.74), danger: Color(red: 1, green: 0.45, blue: 0.38), onAccent: Color(red: 0.10, green: 0.15, blue: 0.03))
        }
    }

    static var background: Color { palette.background }
    static var surface: Color { palette.surface }
    static var raised: Color { palette.raised }
    static var highest: Color { palette.highest }
    static var mint: Color { palette.accent }
    static var mintStrong: Color { palette.accentStrong }
    static var gold: Color { palette.gold }
    static var softGold: Color { palette.gold.opacity(0.82) }
    static var text: Color { palette.text }
    static var secondary: Color { palette.secondary }
    static var border: Color { gold.opacity(0.24) }
    static var greenBorder: Color { mint.opacity(0.30) }
    static var danger: Color { palette.danger }
    static var onAccent: Color { palette.onAccent }
    static var accentGradient: LinearGradient {
        LinearGradient(colors: [mint, mint.opacity(0.72), gold.opacity(0.82)], startPoint: .topLeading, endPoint: .bottomTrailing)
    }
    static var panelGradient: LinearGradient {
        LinearGradient(colors: [raised.opacity(0.96), surface.opacity(0.98)], startPoint: .topLeading, endPoint: .bottomTrailing)
    }
}

enum StitchAssets {
    static let hero = "asset:StitchUhero"
    static let showcase = "asset:StitchUshowcase"
    static let cardOne = "asset:StitchUcardOne"
    static let cardTwo = "asset:StitchUcardTwo"
    static let cardThree = "asset:StitchUcardThree"
    static let community = "asset:StitchUcommunity"
    static let avatar = "asset:StitchUavatar"
}

enum CardImageStorage {
    private static let prefix = "local-card-image:"

    static func save(_ data: Data, cardID: String) -> String? {
        guard let directory = try? imageDirectory() else { return nil }
        let filename = "\(cardID).jpg"
        let destination = directory.appendingPathComponent(filename)
        let encoded = UIImage(data: data)?.jpegData(compressionQuality: 0.9) ?? data
        do {
            try encoded.write(to: destination, options: .atomic)
            return prefix + filename
        } catch {
            return nil
        }
    }

    static func image(for reference: String) -> UIImage? {
        guard reference.hasPrefix(prefix),
              let directory = try? imageDirectory() else { return nil }
        let filename = String(reference.dropFirst(prefix.count))
        return UIImage(contentsOfFile: directory.appendingPathComponent(filename).path)
    }

    static func data(for reference: String?) -> Data? {
        guard let reference, reference.hasPrefix(prefix),
              let directory = try? imageDirectory() else { return nil }
        let filename = String(reference.dropFirst(prefix.count))
        return try? Data(contentsOf: directory.appendingPathComponent(filename))
    }

    static func saveBase64(_ value: String, cardID: String) -> String? {
        let encoded = value.components(separatedBy: ",").last ?? value
        guard let data = Data(base64Encoded: encoded, options: .ignoreUnknownCharacters) else { return nil }
        return save(data, cardID: cardID)
    }

    static func isLocal(_ reference: String?) -> Bool {
        reference?.hasPrefix(prefix) == true
    }

    private static func imageDirectory() throws -> URL {
        let root = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0]
        let directory = root.appendingPathComponent("CardImages", isDirectory: true)
        try FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true)
        return directory
    }
}

struct LedgerPanel: ViewModifier {
    var border = LedgerTheme.border
    func body(content: Content) -> some View {
        content
            .padding(16)
            .background(LedgerTheme.panelGradient, in: RoundedRectangle(cornerRadius: 8, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: 8, style: .continuous)
                    .stroke(border)
                    .overlay(alignment: .top) { Rectangle().fill(LedgerTheme.mint.opacity(0.2)).frame(height: 1).padding(.horizontal, 8) }
            }
            .shadow(color: Color.black.opacity(0.2), radius: 18, y: 10)
    }
}

struct BrandHeader: View {
    var trailingIcon = "magnifyingglass"
    var trailingAction: (() -> Void)?
    var body: some View {
        HStack(spacing: 10) {
            Image(systemName: "shield.lefthalf.filled").font(.title2.weight(.bold))
            VStack(alignment: .leading, spacing: 0) {
                Text("卡藏").font(.title2.bold())
                Text("每一张卡，都值得被看清。").font(.system(size: 9, weight: .semibold)).foregroundStyle(LedgerTheme.secondary)
            }
            Spacer()
            Button { trailingAction?() } label: { Image(systemName: trailingIcon).font(.title3.weight(.semibold)) }
                .buttonStyle(.plain)
        }
        .foregroundStyle(LedgerTheme.mint)
        .padding(.horizontal, 20).padding(.vertical, 11)
        .background(LedgerTheme.background.opacity(0.96))
        .overlay(alignment: .bottom) { Rectangle().fill(LedgerTheme.border).frame(height: 1) }
    }
}

struct RemoteCardImage: View {
    let url: String?
    var contentMode: ContentMode = .fill
    var body: some View {
        Group {
            if let url, url.hasPrefix("asset:") {
                Image(String(url.dropFirst(6))).resizable().aspectRatio(contentMode: contentMode)
            } else if let url, let image = CardImageStorage.image(for: url) {
                Image(uiImage: image).resizable().aspectRatio(contentMode: contentMode)
            } else {
                AsyncImage(url: URL(string: url ?? "")) { phase in
                    if let image = phase.image { image.resizable().aspectRatio(contentMode: contentMode) }
                    else { placeholder }
                }
            }
        }
        .clipped()
    }

    private var placeholder: some View {
        ZStack { LedgerTheme.raised; Image(systemName: "rectangle.portrait").font(.largeTitle).foregroundStyle(LedgerTheme.gold) }
    }
}

struct StatusPill: View {
    let text: String
    var color = LedgerTheme.mint
    var body: some View {
        Text(LocalizedStringKey(text)).font(.caption.weight(.semibold)).foregroundStyle(color)
            .padding(.horizontal, 10).padding(.vertical, 5)
            .background(color.opacity(0.12), in: Capsule()).overlay { Capsule().stroke(color.opacity(0.5)) }
    }
}

struct PrimaryActionStyle: ButtonStyle {
    @Environment(\.isEnabled) private var isEnabled

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.headline).foregroundStyle(LedgerTheme.onAccent)
            .frame(maxWidth: .infinity, minHeight: 54)
            .background(LedgerTheme.mint.opacity(!isEnabled ? 0.32 : configuration.isPressed ? 0.72 : 1), in: RoundedRectangle(cornerRadius: 8))
            .shadow(color: LedgerTheme.mint.opacity(0.2), radius: 16, y: 8)
    }
}

@MainActor
extension View {
    func ledgerPanel(border: Color? = nil) -> some View { modifier(LedgerPanel(border: border ?? LedgerTheme.border)) }
    func stitchScreen() -> some View { background(LedgerTheme.background.ignoresSafeArea()).foregroundStyle(LedgerTheme.text) }
}

extension Double {
    var rmb: String { formatted(.currency(code: "CNY").precision(.fractionLength(0...2))) }
}
