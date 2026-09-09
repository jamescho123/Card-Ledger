import SwiftUI

struct CommunityView: View {
    @Environment(\.dismiss) private var dismiss
    @State private var filter = 0
    @State private var liked = false
    @State private var showingComposer = false

    var body: some View {
        NavigationStack {
            ScrollView {
                LazyVStack(spacing: 18) {
                    Picker("社区筛选", selection: $filter) { Text("帖子").tag(0); Text("卡友").tag(1); Text("筛选").tag(2) }
                        .pickerStyle(.segmented).padding(.horizontal, 16)
                    CommunityPost(author: "林深见鹿", subtitle: "高级藏家 · 2 小时前", image: StitchAssets.cardOne, badge: "展示", message: "终于入手了这枚年度重要收藏。全息涂层在暗光下依然有非常漂亮的质感。", liked: $liked)
                    CommunityPost(author: "VaultMaker_99", subtitle: "资深交易员 · 5 小时前", image: StitchAssets.cardThree, badge: "交易", message: "寻找这张文班亚马多次 5x5 里程碑 Topps NOW 卡。支持面对面核验或平台交易。", liked: .constant(false))
                }
                .padding(.bottom, 90)
            }
            .safeAreaInset(edge: .top, spacing: 0) {
                HStack(spacing: 12) {
                    Button { dismiss() } label: { Image(systemName: "chevron.left").font(.title3) }
                    Image(systemName: "shield.lefthalf.filled").font(.title2)
                    Text("卡藏").font(.title2.bold())
                    Spacer()
                    Image(systemName: "magnifyingglass").font(.title2)
                }
                .foregroundStyle(LedgerTheme.mint).padding(.horizontal, 18).padding(.vertical, 14).background(LedgerTheme.background)
            }
            .overlay(alignment: .bottomTrailing) {
                Button { showingComposer = true } label: { Image(systemName: "plus").font(.title).frame(width: 58, height: 58).background(LedgerTheme.mint, in: RoundedRectangle(cornerRadius: 8)).foregroundStyle(Color.black) }
                    .padding(22).shadow(color: LedgerTheme.mint.opacity(0.35), radius: 15)
            }
            .stitchScreen()
            .sheet(isPresented: $showingComposer) { CommunityComposer() }
        }
    }
}

private struct CommunityPost: View {
    let author: String, subtitle: String, image: String, badge: String, message: String
    @Binding var liked: Bool
    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            ZStack(alignment: .top) {
                RemoteCardImage(url: image, contentMode: .fit).frame(maxWidth: .infinity).frame(height: 405)
                VStack(alignment: .leading, spacing: 3) {
                    Text(LocalizedStringKey(author)).font(.headline).foregroundStyle(LedgerTheme.text)
                    Text(LocalizedStringKey(subtitle)).font(.caption).foregroundStyle(LedgerTheme.secondary)
                }
                .frame(maxWidth: .infinity, alignment: .leading).padding(14).background(.black.opacity(0.72))
            }
            Text(LocalizedStringKey(message)).lineLimit(3).multilineTextAlignment(.leading).frame(maxWidth: .infinity, alignment: .leading).padding(14)
            HStack(spacing: 24) {
                Button { liked.toggle() } label: { Label(liked ? "1.2k" : "1.1k", systemImage: liked ? "heart.fill" : "heart") }.foregroundStyle(liked ? LedgerTheme.mint : LedgerTheme.secondary)
                Label("88", systemImage: "message")
                Spacer(); Button("我也想要", systemImage: "cart") { }.foregroundStyle(LedgerTheme.gold).buttonStyle(.bordered)
            }.padding([.horizontal, .bottom], 14)
        }
        .frame(width: UIScreen.main.bounds.width - 32)
        .background(LedgerTheme.surface, in: RoundedRectangle(cornerRadius: 8))
        .overlay { RoundedRectangle(cornerRadius: 8).stroke(LedgerTheme.border) }
        .padding(.horizontal, 16)
    }
}

private struct CommunityComposer: View {
    @Environment(\.dismiss) private var dismiss
    @State private var message = ""
    var body: some View {
        NavigationStack {
            Form { Section("发布内容") { TextField("分享卡片、目标或交易需求", text: $message, axis: .vertical).lineLimit(6); Button("添加照片", systemImage: "photo") { }; Button("关联收藏卡片", systemImage: "rectangle.portrait") { } } }
                .navigationTitle("发布帖子").navigationBarTitleDisplayMode(.inline)
                .toolbar { ToolbarItem(placement: .cancellationAction) { Button("取消") { dismiss() } }; ToolbarItem(placement: .confirmationAction) { Button("发布") { dismiss() }.disabled(message.isEmpty) } }
        }
    }
}
