const STORAGE_KEY = "card-ledger-collection";
const TRADE_STORAGE_KEY = "card-ledger-trades";
const GOAL_STORAGE_KEY = "card-ledger-goals";
const CURRENCY_KEY = "card-ledger-currency";
const SEED_KEY = "card-ledger-seed-2026-07-08-v4";
const GOAL_SEED_KEY = "card-ledger-goal-seed-2026-07-08-v4";
const MOJO_RED_COLLECTION_KEY = "card-ledger-mojo-red-collection-2026-07-08-v1";
const OPTIC_INSERT_COLLECTION_KEY = "card-ledger-optic-insert-red-99-collection-2026-07-11-v1";
const RECENT_PURCHASES_KEY = "card-ledger-recent-purchases-2026-07-09-v1";
const RECENT_PURCHASES_CORRECTION_KEY = "card-ledger-recent-purchases-correction-2026-07-10-v1";
const CURRY_IMMACULATE_TRADE_KEY = "card-ledger-curry-immaculate-trade-2026-07-11-v1";
const CURRY_IMMACULATE_TRADE_ID = "trade-2026-07-11-curry-immaculate-standout-memorabilia-99";
const JULY_12_TRADE_KEY = "card-ledger-july-12-trades-2026-07-12-v3";
const JULY_14_ACTIVITY_KEY = "card-ledger-july-14-buys-sale-2026-07-14-v1";
const CLEANUP_KEY = "card-ledger-cleanup-2026-07-08-v1";
const WORKSPACE_KEY = "card-ledger-workspace-2026-07-08-v1";
const ACCOUNT_KEY = "card-ledger-account";
const ACCOUNT_SESSION_KEY = "card-ledger-account-session";
const USERS_KEY = "card-ledger-users";
const SCORE_SETTINGS_KEY = "card-ledger-score-settings";
const SOCIAL_KEY = "card-ledger-social";
const COMMUNITY_KEY = "card-ledger-community";
const DIY_CARD_STORAGE_KEY = "card-ledger-diy-cards-v1";
const DIY_LISTING_STORAGE_KEY = "card-ledger-diy-listings-v1";
const PURCHASE_REQUEST_KEY = "card-ledger-purchase-requests";
const CHAT_KEY = "card-ledger-chats";
const SPORTS_GUY_CHAT_KEY = "card-ledger-sports-guy-chat-v1";
const SPORTS_GUY_VOICE_KEY = "card-ledger-sports-guy-voice-v1";
const CONNECTED_ACCOUNTS_KEY = "card-ledger-connected-accounts";
const GOAL_ASSISTANT_KEY = "card-ledger-goal-assistant";
const DEAL_ROOMS_KEY = "card-ledger-deal-rooms";
const IMAGE_SETTINGS_KEY = "card-ledger-image-settings";
const PERIOD_SETTINGS_KEY = "card-ledger-period-settings";
const SUPABASE_SETTINGS_KEY = "card-ledger-supabase-settings";
const SOCIAL_OAUTH_PENDING_KEY = "card-ledger-social-oauth-pending";
const AUCTION_SETTINGS_KEY = "card-ledger-auction-settings";
const LANGUAGE_KEY = "card-ledger-language";
const THEME_KEY = "card-ledger-theme";
const LANDING_CARD_IMAGE_KEY = "card-ledger-landing-card-images";
const PRESENTATION_CLOSET_KEY = "card-ledger-presentation-closet-v1";
const MARKETPLACE_SALES_KEY = "card-ledger-marketplace-sales-v1";
const SIDEBAR_STATE_KEY = "card-ledger-sidebar-expanded-v2";
const SUBSCRIPTION_KEY = "card-ledger-subscriptions-v1";
const PLAN_USAGE_KEY = "card-ledger-plan-usage-v1";
const MARKET_WORKSPACE_KEY = "card-ledger-market-workspace-v1";
const FOCUS_WORKSPACE_KEY = "card-ledger-focus-workspaces-v1";
const DEFAULT_SUPABASE_URL = "https://wmvffpuxrdbsexryazxu.supabase.co";
const DEFAULT_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_UX6CZtL82HAKn1zLzgfEtQ_-eqDXD4Q";
const USD_TO_RMB_RATE = 6.8;
const ESTIMATE_SALE_COUNT = 3;
const MARKET_SOURCES = ["ebay", "cardhobby", "cardladder", "market_movers", "goldin", "fanatics", "alt"];
const PREMIUM_MARKET_SOURCES = ["goldin", "fanatics", "alt"];
const REGULAR_PLAN_LIMITS = Object.freeze({
  goals: 3,
  aiTrades: 5,
  portfolios: 1,
  watchlist: 20,
  savedViews: 3,
  displayUploads: 6
});
const CARD_HOLDER_SPECS = {
  raw: { label: "Raw", width: 2.5, height: 3.5, depth: 0.04, cardTop: 0, cardHeight: 1 },
  psa: { label: "PSA", width: 3.16, height: 5.32, depth: 0.27, cardTop: 0.225, cardHeight: 0.69 },
  bgs: { label: "BGS", width: 3.31, height: 5.16, depth: 0.315, cardTop: 0.205, cardHeight: 0.715 }
};
const DIY_SERIES_LIBRARY = [
  {
    id: "city-lights",
    name: "City Lights",
    nameZh: "城市夜光",
    tagline: "Neon nights",
    taglineZh: "霓虹夜赛",
    colors: ["#071b2b", "#0b6f73", "#72f2d0"],
    accent: "#f3c86a"
  },
  {
    id: "future-icons",
    name: "Future Icons",
    nameZh: "未来巨星",
    tagline: "Next era",
    taglineZh: "新世代",
    colors: ["#111732", "#5937a6", "#5ce5d4"],
    accent: "#d8c6ff"
  },
  {
    id: "legends-recut",
    name: "Legends Recut",
    nameZh: "传奇再刻",
    tagline: "Archive edition",
    taglineZh: "典藏再造",
    colors: ["#140f0b", "#5a3514", "#d8aa55"],
    accent: "#fff0bf"
  },
  {
    id: "velocity",
    name: "Velocity",
    nameZh: "极速",
    tagline: "Full motion",
    taglineZh: "全速动势",
    colors: ["#081a31", "#b5263b", "#58b9ff"],
    accent: "#f9e75d"
  },
  {
    id: "crown-atelier",
    name: "Crown Atelier",
    nameZh: "皇冠工坊",
    tagline: "Collector craft",
    taglineZh: "藏家工艺",
    colors: ["#220d19", "#6c183a", "#d2a34c"],
    accent: "#ffe2a2"
  },
  {
    id: "stadium-noir",
    name: "Stadium Noir",
    nameZh: "暗夜球场",
    tagline: "After hours",
    taglineZh: "夜场限定",
    colors: ["#050807", "#1b2c27", "#65e0a2"],
    accent: "#f2f6f3"
  }
];
const DIY_PLAYER_LIBRARY = [
  {
    id: "stephen-curry",
    name: "Stephen Curry",
    sport: "Basketball",
    image: "./assets/diy-players/stephen-curry.jpg",
    credit: "Clément Bardot",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Stephen_Curry,_Olympic_Games_2024.jpg"
  },
  {
    id: "victor-wembanyama",
    name: "Victor Wembanyama",
    sport: "Basketball",
    image: "./assets/diy-players/victor-wembanyama.jpg",
    credit: "Thomas S",
    license: "CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Victor_Wembanyama.jpg"
  },
  {
    id: "lebron-james",
    name: "LeBron James",
    sport: "Basketball",
    image: "./assets/diy-players/lebron-james.jpg",
    credit: "Clément Bardot",
    license: "CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:LeBron_James,_Olympic_Games_2024.jpg"
  },
  {
    id: "kobe-bryant",
    name: "Kobe Bryant",
    sport: "Basketball",
    image: "./assets/diy-players/kobe-bryant.jpg",
    credit: "Eric Draper / White House",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Kobe_Bryant_in_2008.jpg"
  },
  {
    id: "lionel-messi",
    name: "Lionel Messi",
    sport: "Soccer",
    image: "./assets/diy-players/lionel-messi.jpg",
    credit: "Hossein Zohrevand",
    license: "CC BY 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Lionel-Messi-Argentina-2022-FIFA-World-Cup_(cropped).jpg"
  },
  {
    id: "lamine-yamal",
    name: "Lamine Yamal",
    sport: "Soccer",
    image: "./assets/diy-players/lamine-yamal.jpg",
    credit: "Biso",
    license: "CC BY 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Lamine_Yamal_in_2025_(cropped).jpg"
  },
  {
    id: "jude-bellingham",
    name: "Jude Bellingham",
    sport: "Soccer",
    image: "./assets/diy-players/jude-bellingham.jpg",
    credit: "Hossein Zohrevand",
    license: "CC BY 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Jude_Bellingham_2022-11-21_1.jpg"
  },
  {
    id: "shohei-ohtani",
    name: "Shohei Ohtani",
    sport: "Baseball",
    image: "./assets/diy-players/shohei-ohtani.jpg",
    credit: "U.S. Embassy Tokyo",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Shohei_Otani_2024-01-02.jpg"
  }
];
const DIY_PARALLEL_LIBRARY = [
  "Base",
  "Neon Foil",
  "Aurora Prism",
  "Gold Canvas",
  "Red Wave",
  "Black Gold",
  "Silver Refractor",
  "Rainbow Foil",
  "Green Pulse"
];
const CLOSET_STARTER_CARDS = [
  {
    id: "starter-emerald-rookie",
    name: "Emerald Rookie",
    subtitle: "Collector Series · RC 01",
    colors: ["#0f5b42", "#07110e", "#d8aa55"],
    format: "raw",
    grade: ""
  },
  {
    id: "starter-silver-prizm",
    name: "Silver Prizm",
    subtitle: "Holographic Series · SP 23",
    colors: ["#b9c9cf", "#25353b", "#7ce8ff"],
    format: "psa",
    grade: "10"
  },
  {
    id: "starter-gold-milestone",
    name: "Gold Milestone",
    subtitle: "Legacy Series · GM 10",
    colors: ["#d6a43a", "#281b08", "#f7e5a3"],
    format: "bgs",
    grade: "9.5"
  }
];
const DIY_STARTER_CARDS = [
  {
    id: "diy-starter-city-lights-01",
    series: "City Lights",
    player: "Stephen Curry",
    parallel: "Neon Foil",
    cardNumber: "D-01",
    printRun: 25,
    finish: "Foil",
    title: "Night Court",
    description: "A typography-led night game concept with emerald foil accents.",
    ownerName: "Card Ledger Studio",
    starter: true,
    colors: ["#105c50", "#10192b"]
  },
  {
    id: "diy-starter-future-icons-07",
    series: "Future Icons",
    player: "Victor Wembanyama",
    parallel: "Aurora Prism",
    cardNumber: "D-07",
    printRun: 50,
    finish: "Acetate",
    title: "Orbit",
    description: "An original geometric rookie-era tribute printed on clear acetate.",
    ownerName: "Card Ledger Studio",
    starter: true,
    colors: ["#3054a6", "#351456"]
  },
  {
    id: "diy-starter-legends-recut-24",
    series: "Legends Recut",
    player: "Kobe Bryant",
    parallel: "Gold Canvas",
    cardNumber: "D-24",
    printRun: 1,
    finish: "Canvas",
    title: "Final Frame",
    description: "A one-of-one handmade canvas study with warm gold linework.",
    ownerName: "Card Ledger Studio",
    starter: true,
    colors: ["#76520c", "#27142d"]
  }
];
const DIY_STARTER_LISTINGS = [
  {
    id: "diy-listing-starter-trade",
    cardId: "diy-starter-future-icons-07",
    type: "trade",
    wanted: "Open to other numbered DIY parallels",
    note: "Studio sample listing for exploring the DIY trade-request flow.",
    location: "Shanghai, China",
    ownerName: "Card Ledger Studio",
    ownerId: "card-ledger-studio",
    requests: 2,
    starter: true,
    createdAt: "2026-07-24T10:30:00.000Z"
  },
  {
    id: "diy-listing-starter-sale",
    cardId: "diy-starter-city-lights-01",
    type: "sale",
    price: 299,
    note: "Numbered studio proof with front and back creator marks.",
    location: "Hong Kong",
    ownerName: "Card Ledger Studio",
    ownerId: "card-ledger-studio",
    requests: 4,
    starter: true,
    createdAt: "2026-07-23T09:00:00.000Z"
  }
];
const SCAN_PAUSED = true;
const TRANSLATIONS = {
  "zh-CN": {
    "Card Ledger": "卡藏账本",
    "Every card, clearly valued.": "卡藏，让每张卡都有账。",
    "Asset Manager": "卡藏",
    "Premium Tier": "专业版",
    "Membership": "会员方案",
    "Choose how you collect": "选择适合你的收藏方案",
    "Regular": "普通版",
    "Free": "免费",
    "Premium Monthly": "高级会员月付",
    "Premium Yearly": "高级会员年付",
    "Choose monthly": "选择月付",
    "Choose yearly": "选择年付",
    "Use regular": "使用普通版",
    "Current access": "当前权限",
    "AI trades this month": "本月 AI 交易次数",
    "Collecting goals": "收藏目标",
    "Regular Tier": "普通版",
    "Monthly": "月付",
    "Yearly": "年付",
    "per month": "每月",
    "per year · save RMB 58.9": "每年 · 节省 RMB 58.9",
    "Plan selection unlocks the prototype. Payment collection will activate after a billing provider is connected.": "当前可直接体验会员功能；接入正式支付服务后再启用扣款。",
    "Regular includes the essential ledger. Premium removes limits from planning and collection tools.": "普通版包含核心卡藏账本；高级会员可无限使用目标规划与收藏管理工具。",
    "Essential collection records": "核心卡藏记录",
    "3 collecting goals": "3 个收藏目标",
    "5 AI trade generations monthly": "每月 5 次 AI 交易方案",
    "1 portfolio space": "1 个资产空间",
    "20 watchlist cards": "20 张关注卡片",
    "3 saved views and 6 display uploads": "3 个保存视图与 6 张展示上传",
    "Unlimited goals and AI trades": "收藏目标与 AI 交易不限量",
    "Unlimited portfolios and watchlist": "资产空间与关注清单不限量",
    "Unlimited saved views and display uploads": "保存视图与展示上传不限量",
    "Premium badge and future priority tools": "高级会员徽章与后续优先功能",
    "Everything in Premium Monthly": "包含月付高级会员全部权益",
    "Two months of savings across a year": "按年可节省接近两个月费用",
    "One renewal instead of twelve": "每年仅需续费一次",
    "Unlimited access on web and installed app": "网页与安装版 App 均可无限使用",
    "Billing is not connected yet. Choosing a paid plan enables the premium prototype without collecting payment.": "支付系统尚未接入。选择会员方案只会开启高级功能体验，不会产生扣款。",
    "5 per month": "每月 5 次",
    "3 goals": "3 个目标",
    "Collector Profile": "我的主页",
    "My Profile": "我的主页",
    "Asset value synced": "资产估值已同步",
    "Add New Card": "录入新卡",
    "Primary": "主导航",
    "Landing sections": "首页导航",
    "Open landing page": "返回首页",
    "Expand sidebar": "展开侧栏",
    "Collapse sidebar": "收起侧栏",
    "Portfolio": "资产组合",
    "Condition Check": "品相预检",
    "On-device pre-grade lab": "本机预评级工作台",
    "Upload or photograph both sides for a transparent PSA and BGS pre-grade estimate.": "上传或拍摄卡片正反面，生成透明可解释的 PSA 与 BGS 预评级结果。",
    "Images stay on this device": "图片仅在本机处理",
    "Pre-screening, not certification": "仅作送评前预检，并非官方评级",
    "A photo cannot confirm authenticity, trimming, restoration, dents, creases, or every surface defect. Use this report to prepare a submission, then rely on in-person inspection and the grading company.": "照片无法确认真伪、裁切、修复、凹痕、折痕或全部表面瑕疵。本报告适合送评前筛查，最终请以实物检查和评级公司结果为准。",
    "PSA grading standards": "PSA 官方评级标准",
    "BGS grading scale": "BGS 官方评级量表",
    "Capture the card": "采集卡片图片",
    "Use even light, a plain dark background, and fill the frame.": "请使用均匀光线和纯色深背景，让卡片尽量占满画面。",
    "Upload": "上传",
    "Camera": "相机",
    "Condition image source": "品相图片来源",
    "Front image": "正面图片",
    "Back image": "背面图片",
    "Upload a sharp, straight-on photo": "上传清晰、正对镜头的照片",
    "Required for the strongest confidence": "上传背面可提高分析置信度",
    "Front": "正面",
    "Back": "背面",
    "Camera is off": "相机未开启",
    "Start the camera, then align the card inside the guide.": "启动相机后，将卡片对齐取景框。",
    "Start camera": "启动相机",
    "Capture front": "拍摄正面",
    "Capture back": "拍摄背面",
    "Stop camera": "关闭相机",
    "Camera access starts only when you press Start camera.": "只有点击“启动相机”后才会申请相机权限。",
    "Captured card sides": "已采集卡面",
    "Analyze condition": "分析品相",
    "Pre-grade report": "预评级报告",
    "Evidence first, grade second.": "先看证据，再看分数。",
    "No analysis yet": "尚未分析",
    "Add a front image to begin. A back image improves completeness and confidence.": "先添加正面图片；补充背面图片可提高完整度和置信度。",
    "PSA estimate": "PSA 预估",
    "BGS estimate": "BGS 预估",
    "Pre-grade": "预评级",
    "Analysis confidence": "分析置信度",
    "Photo evidence and cautions": "照片证据与注意事项",
    "Attach the report to your collection": "将报告关联到收藏",
    "This stores a dated pre-grade report and never replaces an official grade.": "系统会保存带日期的预评级报告，不会覆盖官方评级。",
    "Collection card for condition report": "选择要关联品相报告的收藏卡片",
    "Choose a collection card": "选择收藏中的卡片",
    "Save pre-grade report": "保存预评级报告",
    "Reset": "重置",
    "AI Trade Builder": "AI 交易构建器",
    "Market Insights": "市场洞察",
    "Market": "行情",
    "Market Workspace": "行情工作台",
    "Keep one research task in view": "一次专注一项研究任务",
    "Indices & Sales": "指数与成交",
    "Split": "分栏",
    "Collection Workspace": "收藏工作台",
    "Open only the tool you need": "只打开当前需要的工具",
    "Browse": "浏览收藏",
    "Collection Inventory": "收藏清单",
    "0 cards ready to browse": "0 张卡片可浏览",
    "Expand collection": "展开收藏",
    "Collapse collection": "收起收藏",
    "Grid": "网格",
    "Table": "表格",
    "Add Card": "添加卡片",
    "Take or upload photo": "拍摄或上传照片",
    "Closest player match": "最接近的球员",
    "Scan a photo first": "请先扫描照片",
    "Ready for a card photo.": "可以开始扫描卡片照片。",
    "Ready to identify a player.": "可以开始识别球员。",
    "Scan player": "扫描球员",
    "Imports": "导入",
    "Photos": "图片",
    "People": "藏家",
    "All": "全部",
    "Goal Workspace": "目标工作台",
    "Move between plans without page-length scrolling": "无需长距离滚动即可切换目标工具",
    "Overview": "概览",
    "Missing": "缺卡",
    "Alerts": "提醒",
    "Trade Workspace": "交易工作台",
    "Build, negotiate, or review one step at a time": "逐步构建、协商与复盘交易",
    "AI Builder": "AI 交易构建器",
    "History": "历史记录",
    "Show notes": "显示说明",
    "Hide notes": "隐藏说明",
    "Planned valuation connections": "待接入估值功能",
    "3 reserved functions": "3 项预留功能",
    "Pricing": "会员方案",
    "Search everything": "全站搜索",
    "Search cards, goals, trades, posts...": "搜索卡片、目标、交易、帖子...",
    "Clear search": "清除搜索",
    "Log In": "登录",
    "Login": "登录",
    "Sign Up": "注册",
    "Get Started": "立即开始",
    "Account": "账户",
    "Account Settings": "账户设置",
    "Collector Identity": "藏家身份",
    "Manage your profile, privacy, login, marketplace access, and collector score.": "集中管理个人资料、隐私、登录、市场连接与藏家积分。",
    "Guest account": "游客账户",
    "Location not set": "未设置地区",
    "Overview": "概览",
    "Profile": "个人资料",
    "Social": "社交",
    "Privacy": "隐私",
    "Login & Storage": "登录与存储",
    "Badges & Score": "徽章与积分",
    "Guest": "游客",
    "Email Access": "邮箱登录",
    "Secure Access": "安全登录",
    "Login method": "登录方式",
    "Phone": "手机号",
    "Phone login": "手机号登录",
    "Phone number": "手机号码",
    "Use an international number. Mainland China numbers begin with +86.": "请输入国际格式手机号码，中国大陆号码请以 +86 开头。",
    "Send code": "发送验证码",
    "6-digit code": "6 位验证码",
    "Verify and sign in": "验证并登录",
    "Verify and connect": "验证并绑定",
    "Or continue with": "或使用以下方式",
    "WeChat": "微信",
    "Not connected": "未绑定",
    "Connected": "已绑定",
    "Setup required": "需要配置",
    "Connected login methods": "已绑定的登录方式",
    "Sign in to the same Card Ledger account with any connected method.": "绑定后，可使用任一方式登录同一个卡藏账号。",
    "Refresh login methods": "刷新登录方式",
    "Connected Accounts": "账号绑定",
    "Secure login is handled by Supabase. Card Ledger never stores social passwords.": "登录验证由 Supabase 安全处理，卡藏不会保存微信或 QQ 密码。",
    "WeChat and QQ require custom OAuth providers to be enabled in Supabase.": "微信与 QQ 登录需先在 Supabase 中启用自定义 OAuth 服务商。",
    "Code sent. Check your phone.": "验证码已发送，请查看手机短信。",
    "Phone connected": "手机号已绑定",
    "Phone verified": "手机号验证成功",
    "Supabase Login Storage": "Supabase 登录存储",
    "Project URL": "项目地址",
    "Anon public key": "匿名公开密钥",
    "When configured, signup creates a Supabase Auth user and stores profile details in public.profiles. Run the included profiles SQL once, then save your anon public key here.": "配置完成后，注册会创建 Supabase Auth 用户，并把个人资料写入 public.profiles。先运行项目里的 profiles SQL，再在这里保存 anon 公开密钥。",
    "Email": "邮箱",
    "Password": "密码",
    "Name": "昵称",
    "Collector name": "藏家昵称",
    "Create password": "设置密码",
    "Create Account": "创建账号",
    "Logout": "退出登录",
    "Save": "保存",
    "Save Profile": "保存资料",
    "Profile Settings": "资料设置",
    "Description": "简介",
    "Age": "年龄",
    "Location": "位置",
    "Collection Privacy": "收藏隐私",
    "Who can view my collection": "谁可以查看我的收藏",
    "Private": "私密",
    "Friends only": "仅好友",
    "Public": "公开",
    "Collector Score": "藏家分",
    "Badges": "徽章",
    "Friends": "好友",
    "Following": "关注",
    "Followers": "粉丝",
    "Signed In": "当前登录",
    "Score details": "积分明细",
    "Admin Score Rules": "管理员积分规则",
    "Save Rules": "保存规则",
    "Manage Your Collection Like an": "把球星卡收藏",
    "Asset Class": "当作资产来管理",
    "Manage Your Collection Like an Asset Class": "把球星卡收藏当作资产来管理",
    "The ultimate dashboard for elite sports card collectors. Track value, trade with AI precision, and dominate the market.": "为认真收藏球星卡的人打造的一站式工作台：记录买入成本，跟踪行情估值，管理收集目标，并用 AI 辅助判断交易是否划算。",
    "Start Your Portfolio": "建立我的卡册",
    "Watch Demo": "查看演示",
    "Data Accuracy": "数据准确率",
    "Active Portfolios": "活跃卡册",
    "Market Sync": "行情同步",
    "Now tracking over RMB 8.2M in assets": "已追踪超过 RMB 820 万藏品资产",
    "Record": "录入",
    "Complete Goals": "补齐目标",
    "Portfolio-grade records": "资产级卡册记录",
    "Manual fixed-format card entry, purchase history, cost basis, values, and profit tracking.": "用固定格式录入卡片、买入价、日期、估值与盈亏，让每一张卡都有清楚账目。",
    "Goal visibility": "收集目标一眼看清",
    "See what you own, what is missing, and which cards should trigger marketplace alerts.": "清楚看到已拥有、仍缺失、需要提醒的卡，让补套和盯盘更有节奏。",
    "Trading workspace": "交易复盘工作台",
    "Log deals, compare both sides, use AI trade ideas, and keep a permanent before-trade record.": "记录每一笔换卡，比较双方价值，用 AI 生成接近平衡的交易方案，并保留换出前记录。",
    "AI Trade Score": "AI 交易评分",
    "ROI This Month": "本月回报",
    "Trusted by the industry's elite": "专业藏家正在使用",
    "Start Managing": "开始管理我的卡册",
    "Install Card Ledger": "安装卡藏账本",
    "Use Card Ledger as a standalone app with offline access to the saved workspace shell.": "安装为独立应用后，可像桌面 App 一样打开，并保留离线工作台外壳。",
    "Install App": "安装应用",
    "Camera Scan Paused": "相机扫描已暂停",
    "Identify the player from a photo": "拍照识别球员",
    "Player name comes from card text first, then a local face match when text is missing. Card-specific details are never guessed.": "系统会先读取卡面球员姓名；若没有姓名，再在本机与球员照片库进行人脸匹配。不会猜测具体卡片版本。",
    "Take or upload photo": "拍摄或上传照片",
    "Take or upload card front": "拍摄或上传卡片正面",
    "Closest player match": "最接近的球员",
    "Use player": "使用该球员",
    "Review detected player": "确认识别球员",
    "Only the selected player and confidently inferred sport will be applied.": "只会填入所选球员，以及有把握识别的运动项目。",
    "Selected player": "所选球员",
    "No player selected": "尚未选择球员",
    "Sport not confirmed": "运动项目尚未确认",
    "Text read from photo": "照片读取文字",
    "Set / Series": "系列",
    "Card number": "卡号",
    "Recognition evidence": "识别依据",
    "Closest series matches": "最接近的系列",
    "Stop": "停止",
    "Start Camera": "启动相机",
    "Capture + Insert": "拍摄并插入",
    "Add a Card": "添加卡片",
    "Clear": "清空",
    "Your first card, one step at a time": "第一次录卡，跟着三步完成",
    "Only five basics are needed. Everything else can be added later.": "只需填写五项基础信息，其他内容以后可以补充。",
    "Card entry progress": "卡片录入进度",
    "Identify": "识别球员",
    "Scan or choose a player": "拍照识别或选择球员",
    "Describe": "确认卡片",
    "Sport, year, brand and set": "运动、年份、品牌和系列",
    "Save": "保存",
    "Review and add it": "确认后加入收藏",
    "Start with a photo, or choose the sport and year below.": "可以先拍照识别，也可以从下方选择运动和年份。",
    "What can I leave blank?": "哪些内容可以先不填？",
    "Type, parallel, number, condition, grade, price, location and notes are optional. You can edit them later.": "类型、平行、编号、品相、评级、价格、存放位置和备注都可暂时留空，以后再编辑。",
    "Quick entry keeps only the essential fields visible.": "快速录入只显示必要字段。",
    "Show advanced details": "显示进阶信息",
    "Hide advanced details": "收起进阶信息",
    "Finish the five basics to save": "完成五项基础信息后即可保存",
    "Optional details can always be added later.": "其他细节随时可以补充。",
    "Ready to save": "可以保存了",
    "Year": "年份",
    "Brand": "品牌",
    "Brand / manufacturer": "品牌 / 制造商",
    "Set": "系列",
    "Choose a brand to filter the set catalog.": "先选择品牌，再从对应系列目录中查找。",
    "Player": "球员",
    "Type": "类型",
    "Parallel / Variant": "平行/变体",
    "Number": "编号",
    "Sport": "运动",
    "Choose": "选择",
    "Condition": "品相",
    "Raw": "裸卡",
    "Near Mint": "近完美",
    "Excellent": "优秀",
    "Very Good": "很好",
    "Poor": "较差",
    "Graded": "评级",
    "Grade": "评级",
    "Quantity": "数量",
    "Paid RMB": "买入价 RMB",
    "Value RMB": "估值 RMB",
    "Notes": "备注",
    "Save Card": "保存卡片",
    "Fixed Format Entry": "固定格式录入",
    "Import Lines": "导入行",
    "Record Trade": "记录交易",
    "Counterparty": "交易对象",
    "Outgoing Cards": "换出卡片",
    "Incoming Cards": "换入卡片",
    "Cash Paid RMB": "支付现金 RMB",
    "Cash Received RMB": "收到现金 RMB",
    "Save Trade": "保存交易",
    "Imports": "导入",
    "Add": "录入",
    "Photo": "图片",
    "Missing": "缺口",
    "People": "藏友",
    "Scan Paused": "扫码暂停",
    "Alerts": "提醒",
    "Sales": "成交",
    "AI": "AI",
    "Connect": "连接",
    "Disconnect": "断开",
    "Card Image Finder": "卡图查找",
    "Premium Auction Comps": "高端拍卖成交参考",
    "Import Purchases": "导入购买记录",
    "Sample": "示例",
    "Photo Import": "照片导入",
    "Upload the card, confirm its identity, and review the automatic pre-grade and PSA population reference before insertion.": "上传卡片照片，确认卡片身份，并在入库前查看自动预评级和 PSA POP 参考。",
    "Front photo": "正面照片",
    "Required · upload or use camera": "必填 · 上传照片或使用相机",
    "Back photo": "背面照片",
    "Optional · improves confidence": "选填 · 可提高分析置信度",
    "Confirmed Card Line": "已确认卡片信息",
    "Population matching uses year, brand, set, player, card number, parallel, and the confirmed or estimated PSA grade.": "POP 匹配会使用年份、品牌、系列、球员、卡号、折射以及已确认或预估的 PSA 分数。",
    "Automatic condition check": "自动品相检测",
    "Add a front photo to begin.": "上传正面照片后自动开始分析。",
    "Estimated PSA": "预估 PSA",
    "Estimated BGS": "预估 BGS",
    "Confidence": "置信度",
    "Population lookup starts after a photo and card identity are ready.": "照片和卡片信息准备好后将自动查询 POP。",
    "Pre-grade only. PSA and BGS make the official grade after in-person inspection.": "仅供预评级参考，官方分数须由 PSA 或 BGS 实物鉴定后确定。",
    "Insert Photo Card": "插入照片卡片",
    "Values": "估值",
    "Performance": "表现",
    "Period View": "区间视图",
    "From": "开始",
    "To": "结束",
    "Apply": "应用",
    "All Time": "全部时间",
    "Missing Cards": "缺失卡片",
    "Propose Deals": "生成交易方案",
    "Your Cards": "你的卡片",
    "Their Cards": "对方卡片",
    "Trade intelligence": "交易智策",
    "Build both sides, inspect the evidence, and negotiate from a clear position.": "整理双方卡片，核对估值依据，再带着清晰底价开始谈判。",
    "Explainable estimates": "估值依据清楚可查",
    "Saved completed sales are averaged after obvious outliers are removed. Collection estimates and manual values are clearly labeled when sale evidence is unavailable.": "系统会剔除明显异常成交后计算近期均价；没有成交依据时，会明确标注卡册估值或手动估值。",
    "Your cards in fixed format": "按固定格式填写你的卡片",
    "Their cards in fixed format": "按固定格式填写对方卡片",
    "Choose from collection": "从我的卡册选择",
    "Add card": "加入卡片",
    "Exact collection matches and saved sale records are estimated automatically.": "匹配到卡册记录或已保存成交时，系统会自动估值。",
    "Structured card entry": "结构化录入卡片",
    "Build one correctly formatted card": "按顺序生成一条规范卡片信息",
    "Side": "加入哪一方",
    "Manual value RMB": "手动估值 RMB",
    "optional": "选填",
    "Auto estimate": "自动估值",
    "Add to side": "加入本方",
    "Use catalog suggestions when available.": "优先使用卡片目录中的推荐信息。",
    "Proposal controls": "方案设置",
    "Max cards each side": "每方最多卡片数",
    "Balance tolerance (RMB)": "价值容差（RMB）",
    "Max cash add (RMB)": "最多现金补差（RMB）",
    "Build ranked proposals": "生成排序方案",
    "Negotiation copilot": "谈判副手",
    "Sports Guy": "球卡哥",
    "Interactive animated Sports Guy robot": "可互动的球卡哥动画机器人",
    "Ready to scout this trade.": "已准备好帮你分析这笔交易。",
    "Wave to Sports Guy": "向球卡哥挥手",
    "Say hello": "打个招呼",
    "Turn on Sports Guy voice": "开启球卡哥语音",
    "Turn off Sports Guy voice": "关闭球卡哥语音",
    "Voice off": "语音关闭",
    "Voice on": "语音开启",
    "Move your pointer and click the robot to interact.": "移动指针或点击机器人即可互动。",
    "Checking both sides...": "正在核对双方卡片……",
    "I’m listening. Show me the deal.": "我在听，把交易方案交给我吧。",
    "Good to see you. Let’s make this trade count.": "很高兴见到你，我们把这笔交易谈得更漂亮。",
    "Voice is on. I’ll talk through the trade with you.": "语音已开启，我会陪你一起分析这笔交易。",
    "Ready for the next move.": "随时可以分析下一步。",
    "Paste what the dealer said or ask for a counter. Sports Guy checks the current cards, estimate confidence, cash gap, and your downside.": "粘贴对方的话，或让球卡哥帮你还价。它会核对卡片、估值可信度、现金差额与潜在损失。",
    "Add both sides to activate deal analysis.": "录入双方卡片后即可分析交易。",
    "Evaluate offer": "评估报价",
    "Draft counter": "起草还价",
    "Find fair middle": "寻找合理中间价",
    "Walk-away check": "检查止损线",
    "Dealer message or question for Sports Guy": "对方消息或给球卡哥的问题",
    "Paste the dealer's message or ask Sports Guy...": "粘贴对方消息，或向球卡哥提问……",
    "Ask Sports Guy": "询问球卡哥",
    "Copy latest draft": "复制最新回复",
    "Nothing is sent to a dealer automatically. You approve every reply.": "系统不会自动发给对方，每条回复都由你确认。",
    "Deal desk": "方案台",
    "Ranked proposals": "推荐交易方案",
    "Waiting for both sides": "等待录入双方卡片",
    "Add cards to both sides to build fair-market, value-protection, and collector-fit proposals.": "录入双方卡片后，系统会生成公平成交、价值保护与收藏匹配三类方案。",
    "Collection": "收藏",
    "DIY Cards": "自制卡",
    "Creator workshop": "创作者工坊",
    "DIY Card Studio": "自制卡工坊",
    "Catalog original card designs, then publish selected cards for display, trade, or sale.": "先建立自制卡档案，再选择公开展示、交换或出售。",
    "DIY only": "仅限自制卡",
    "Unofficial cards stay separate from licensed inventory.": "自制卡与官方授权卡库存严格分开。",
    "DIY card categories": "自制卡分类",
    "DIY Library": "自制卡库",
    "Series, players, and parallels": "系列、球员与平行版本",
    "Creator Market": "创作者市场",
    "Display, trade, and sell": "展示、交换与出售",
    "Add an original card": "添加原创卡",
    "Build a reusable identity before listing the card.": "发布前先建立可复用的卡片档案。",
    "DIY / Unofficial": "自制卡 / 非官方",
    "Series": "系列",
    "Player / Subject": "球员 / 主题",
    "Parallel": "平行版本",
    "Card number": "卡号",
    "Print run": "限量数量",
    "Finish": "工艺",
    "Digital print": "数码印刷",
    "Foil": "闪膜",
    "Canvas": "画布",
    "Acetate": "透明材质",
    "Handmade": "手工制作",
    "Design title": "作品名称",
    "Creator notes": "创作说明",
    "Materials, inspiration, edition details, and condition...": "填写材质、灵感、版本信息与品相……",
    "Automatic card artwork": "自动生成卡图",
    "Choose a series design and player photo. Card Ledger builds the finished front and back.": "选择系列设计与球员照片，卡藏会自动生成完整正反面卡图。",
    "Auto-generate": "自动生成",
    "Series designs": "系列设计",
    "Frame, color, typography, and foil treatment": "控制边框、配色、字体与闪膜效果",
    "Player images": "球员图片",
    "Included licensed and public-domain photography": "内置授权或公版球员照片",
    "Custom front override": "上传自定义正面",
    "Optional JPG, PNG, or WebP": "可选，支持 JPG、PNG 或 WebP",
    "Custom back override": "上传自定义背面",
    "Generated card preview": "自动生成预览",
    "Player photo credit appears on the generated card back.": "球员照片署名会显示在自动生成的卡背。",
    "Generate preview": "生成预览",
    "Front image": "正面图片",
    "Back image": "背面图片",
    "JPG, PNG, or WebP": "支持 JPG、PNG 或 WebP",
    "Optional": "选填",
    "Image preview": "图片预览",
    "I created or have permission to use this design, and it is not represented as an official manufacturer or grading-company issue.": "我拥有该设计的创作或使用权，并且不会把它描述为官方卡厂或评级公司发行的卡片。",
    "After upload": "上传后",
    "Keep in library": "仅保存到卡库",
    "Publish for display": "公开展示",
    "List for trade": "发布交换",
    "List for sale": "发布出售",
    "Asking price (RMB)": "售价（人民币）",
    "Save DIY card": "保存自制卡",
    "DIY library": "自制卡库",
    "Clear filters": "清除筛选",
    "Series, player, parallel...": "搜索系列、球员、平行版本……",
    "All series": "全部系列",
    "All players": "全部球员",
    "All parallels": "全部平行版本",
    "No DIY cards match these filters.": "没有符合当前筛选条件的自制卡。",
    "Publish a listing": "发布卡片",
    "Select a DIY card from your library and choose the offer type.": "从自制卡库选择卡片，再设置发布方式。",
    "Creator listing": "创作者发布",
    "DIY card": "自制卡",
    "Choose a DIY card": "选择一张自制卡",
    "Listing type": "发布类型",
    "Display only": "仅展示",
    "For trade": "可交换",
    "For sale": "可出售",
    "Ships from": "发货地",
    "Looking for": "希望换取",
    "Another DIY card, licensed card, or open offers": "其他自制卡、官方卡，或接受报价",
    "Listing note": "发布说明",
    "Condition, shipping, trade preferences, or creator story...": "填写品相、邮寄、交换偏好或创作故事……",
    "Publish listing": "确认发布",
    "Creator market": "创作者市场",
    "All listings": "全部发布",
    "Newest": "最新发布",
    "Price low-high": "价格从低到高",
    "Price high-low": "价格从高到低",
    "Most requested": "最多咨询",
    "No active DIY listings yet.": "暂无有效的自制卡发布。",
    "Creator marketplace standard:": "创作者市场规范：",
    "DIY cards must be clearly disclosed as unofficial. Card Ledger records requests and introductions; payment, shipping, rights, and authenticity checks remain between participants.": "自制卡必须明确标注为非官方。卡藏仅记录咨询并协助双方建立联系；付款、邮寄、版权与真伪核验由交易双方自行完成。",
    "Display Cabinet/Box": "展示柜/卡盒",
    "Your cards, on display": "把珍藏摆上展台",
    "Choose a gallery cabinet or browse your collection inside an interactive storage box.": "可选择展柜陈列，也可在互动卡盒中翻阅整套收藏。",
    "Display": "展示方式",
    "Gallery cabinet": "展柜陈列",
    "Storage box": "收藏卡盒",
    "Click to flip · drag to arrange": "单击翻面 · 拖动陈列",
    "Scroll to browse · click a card to lift and inspect": "滚动翻阅 · 单击卡片悬浮查看",
    "Scroll cards": "翻阅卡片",
    "Add to display only": "仅加入展示",
    "Customize display card": "自定义展示卡",
    "Holder": "卡砖类型",
    "Grade": "评级",
    "Raw card": "裸卡",
    "Raw": "裸卡",
    "PSA graded": "PSA 评级卡",
    "Certification Number": "评级证书编号",
    "PSA cert number": "PSA 证书编号",
    "PSA Population": "PSA 评级数量",
    "Enter a PSA grade and certification number to verify the card and attach current population data.": "填写 PSA 评级与证书编号，核验卡片并关联最新评级数量。",
    "Saved automatically when you add the card. A cert number checks PSA live; without one, Card Ledger searches the shared PSA index.": "添加卡片时会自动保存。填写证书号可实时查询 PSA；未填写时，系统会搜索共享 PSA 数据库。",
    "Check PSA": "查询 PSA",
    "Check population": "查询评级数量",
    "PSA population pending": "等待查询 PSA 评级数量",
    "Refresh Pop": "更新评级数量",
    "Refresh PSA Pop": "更新 PSA 评级数量",
    "Collection health": "收藏健康度",
    "Keep every card ready to find, verify, and share.": "让每张卡都便于查找、核验与分享。",
    "Add cards to see catalog coverage.": "添加卡片后即可查看资料完整度。",
    "Photos": "卡图",
    "PSA verified": "PSA 已核验",
    "Needs review": "待完善",
    "Add card": "添加卡片",
    "Review issues": "检查问题",
    "Quick view": "快速筛选",
    "All cards": "全部卡片",
    "PSA graded": "PSA 评级卡",
    "Missing photo": "缺少卡图",
    "Waiting for a PSA card.": "等待填写 PSA 卡片信息。",
    "Marketplace Search": "市场在售搜索",
    "Search connected active listings. Listing prices are never treated as completed sales.": "搜索已连接平台的在售商品；在售价不会被当作真实成交价。",
    "Verified Sales Records": "已核验成交记录",
    "Sync your completed eBay seller orders or import eBay and CardHobby CSV/JSON exports. Buyer personal details are never retained.": "同步自己的 eBay 已成交订单，或导入 eBay、卡淘 CSV/JSON 成交记录；系统不会保留买家的个人信息。",
    "Sync eBay sales": "同步 eBay 成交",
    "Download CSV": "下载 CSV",
    "Export source": "导出来源",
    "Detect source": "自动识别来源",
    "Record type": "记录类型",
    "My completed sales": "我的已成交记录",
    "Sold comparison records": "市场成交参考",
    "Choose CSV or JSON export": "选择 CSV 或 JSON 导出文件",
    "Import valid rows": "导入有效记录",
    "All sources": "全部来源",
    "Find sold comps": "查找真实成交",
    "Card Trend Sources": "卡片走势数据源",
    "Refresh trend": "更新价格走势",
    "Collection card": "收藏中的卡片",
    "Source": "数据来源",
    "Licensed or owner-exported data only": "仅使用授权接口或本人导出数据",
    "Why no scraper?": "为什么不直接抓取？",
    "Collector review queue": "收藏数据核对队列",
    "Import trend data": "导入走势数据",
    "No verified comps": "暂无已核验成交",
    "Single source": "仅有单一来源",
    "Missing card number": "缺少卡号",
    "Missing certification": "缺少评级证书号",
    "Incomplete identity": "卡片信息不完整",
    "Resolve": "去处理",
    "Stale over 180 days": "超过 180 天未更新",
    "Identity gaps": "信息缺项",
    "Provider access": "平台接入说明",
    "eBay account sync uses secure OAuth after the Supabase function is deployed. eBay Seller Hub and CardHobby CSV/JSON exports can be imported immediately. CardHobby live sync remains available only through an approved partner endpoint.": "部署 Supabase 函数后，可通过安全 OAuth 同步 eBay 账号；eBay Seller Hub 与卡淘 CSV/JSON 文件现在即可导入。卡淘实时同步需使用平台正式授权的合作接口。",
    "Marketplace provider": "市场平台",
    "Search population": "搜索评级数量",
    "PSA Population Search": "PSA 评级数量搜索",
    "Search the shared Supabase population index by year, set, player, card number, or variety.": "可按年份、系列、球员、卡号或版本搜索 Supabase 共享评级数量索引。",
    "BGS graded": "BGS 评级卡",
    "Display cards": "展示卡片",
    "Starter designs and your uploads": "初始展示卡与我的上传",
    "Add your card photos": "添加我的卡片照片",
    "Display name": "展示名称",
    "Upload front": "上传正面",
    "Upload back": "上传背面",
    "Add to Display Cabinet/Box": "加入展示柜/卡盒",
    "Or select a card image already in your collection": "或从现有收藏中选择卡片图片",
    "Add selected image": "添加所选图片",
    "Goals": "目标",
    "Cards": "卡片",
    "Value": "价值",
    "Cost": "成本",
    "Gain": "收益",
    "Show Cards": "显示卡片",
    "Hide Cards": "隐藏卡片",
    "Grid": "网格",
    "Table": "表格",
    "Search": "搜索",
    "All sports": "全部运动",
    "Sort": "排序",
    "Newest": "最新",
    "Highest value": "价值最高",
    "No cards yet": "还没有卡片",
    "Collectors": "收藏家",
    "Community": "社区",
    "Feed": "动态",
    "Trade Posts": "交易帖子",
    "Private Chats": "私聊",
    "Collecting Goals": "收藏目标",
    "All Collection Goals": "全部收藏目标",
    "Add goal": "添加目标",
    "Expand all": "全部展开",
    "Collapse all": "全部收起",
    "Create a collecting goal": "创建收藏目标",
    "Missing Alerts": "缺失提醒",
    "Recent Sales": "近期成交",
    "Collection research": "收藏研究",
    "Sports Card Indices": "运动卡指数",
    "Equal-weighted performance by sport, built only from completed sales attached to your cards.": "按运动项目等权计算，仅使用已关联到收藏卡片的真实成交记录。",
    "Methodology": "计算方法",
    "Each eligible card starts at 100. The index averages card-level change from the earliest to latest completed sale in the selected 12-month window. Asking prices are excluded.": "每张符合条件的卡片以 100 为基准，指数计算近 12 个月内最早与最近成交之间的卡片涨跌均值，不包含卖家挂价。",
    "Investment score": "收藏投资评分",
    "Research signal only, not financial advice.": "仅供收藏研究参考，不构成投资建议。",
    "Awaiting verified sales": "等待已核验成交",
    "Coverage": "覆盖",
    "Confidence": "可信度",
    "Index updated": "指数更新于",
    "Base 100, completed sales only": "基准 100，仅统计已成交记录",
    "No eligible completed-sale history yet. Index space is ready for connected market data.": "暂无符合条件的成交历史；接入市场数据后将在此自动生成指数。",
    "Strong evidence": "数据支撑较强",
    "Developing": "数据逐步完善",
    "Speculative": "高不确定性",
    "Limited evidence": "数据不足",
    "Momentum": "走势",
    "Liquidity": "流动性",
    "Scarcity": "稀缺度",
    "Grade": "评级",
    "Evidence": "数据质量",
    "High": "高",
    "Medium": "中",
    "Low": "低",
    "Trades": "交易",
    "Trade": "交易",
    "Deals": "交易室",
    "English": "英文",
    "日本語": "日语",
    "한국어": "韩语",
    "Español": "西班牙语",
    "Download Card Ledger": "下载卡藏账本",
    "Export JSON": "导出 JSON",
    "Export CSV": "导出 CSV",
    "Import JSON": "导入 JSON",
    "Language": "语言",
    "Appearance": "外观主题",
    "Emerald Vault": "翡翠藏库",
    "Midnight Ink": "午夜墨蓝",
    "Crimson Archive": "绯红档案",
    "Titanium": "钛金灰"
    ,"Front": "正面"
    ,"Back": "背面"
    ,"Upload rotating card image": "设置首页 3D 卡图"
    ,"Upload front": "上传正面图"
    ,"Upload back": "上传背面图"
    ,"or drop images here": "也可以把图片拖到这里"
    ,"Reset": "重置"
    ,"Drag to rotate 360": "拖动旋转 360"
    ,"Interactive 3D sports card. Drag to spin the card.": "可交互 3D 卡片，拖动即可旋转。"
    ,"3D card image controls": "3D 卡片图片设置"
  },
  ja: {
    "Every card, clearly valued.": "すべてのカードに、確かな価値を。",
    "Portfolio": "ポートフォリオ",
    "Display Cabinet/Box": "ディスプレイキャビネット/ボックス",
    "Collection health": "コレクション状態",
    "Keep every card ready to find, verify, and share.": "すべてのカードを検索・確認・共有しやすく整えます。",
    "Add cards to see catalog coverage.": "カードを追加すると登録状況を確認できます。",
    "Photos": "画像",
    "PSA verified": "PSA確認済み",
    "Needs review": "要確認",
    "Add card": "カードを追加",
    "Review issues": "問題を確認",
    "Quick view": "クイック表示",
    "All cards": "すべてのカード",
    "PSA graded": "PSA鑑定済み",
    "Missing photo": "画像なし",
    "Your cards, on display": "カードを美しく飾る",
    "Choose a gallery cabinet or browse your collection inside an interactive storage box.": "展示キャビネットまたはインタラクティブな収納ボックスから表示形式を選べます。",
    "Display": "表示形式",
    "Gallery cabinet": "ギャラリーケース",
    "Storage box": "収納ボックス",
    "Scroll cards": "カードをめくる",
    "Scroll to browse · click a card to lift and inspect": "スクロールして閲覧 · カードをクリックして浮かせる",
    "Add to display only": "展示のみに追加",
    "AI Trade Builder": "AIトレード作成",
    "Market Insights": "市場インサイト",
    "Pricing": "価格",
    "Search everything": "すべて検索",
    "Search cards, goals, trades, posts...": "カード、目標、取引、投稿を検索...",
    "Log In": "ログイン",
    "Login": "ログイン",
    "Sign Up": "登録",
    "Get Started": "始める",
    "Account": "アカウント",
    "Email": "メール",
    "Password": "パスワード",
    "Name": "名前",
    "Create Account": "アカウント作成",
    "Logout": "ログアウト",
    "Save": "保存",
    "Profile Settings": "プロフィール設定",
    "Collection Privacy": "コレクション公開設定",
    "Private": "非公開",
    "Friends only": "友達のみ",
    "Public": "公開",
    "Collector Score": "コレクタースコア",
    "Badges": "バッジ",
    "Friends": "友達",
    "Following": "フォロー中",
    "Followers": "フォロワー",
    "Start Your Portfolio": "ポートフォリオを始める",
    "Watch Demo": "デモを見る",
    "Install App": "アプリをインストール",
    "Add a Card": "カードを追加",
    "Clear": "クリア",
    "Year": "年",
    "Set": "セット",
    "Player": "選手",
    "Type": "タイプ",
    "Parallel / Variant": "パラレル/バリアント",
    "Number": "番号",
    "Sport": "スポーツ",
    "Choose": "選択",
    "Condition": "状態",
    "Raw": "未鑑定",
    "Graded": "鑑定済み",
    "Grade": "グレード",
    "Quantity": "数量",
    "Paid RMB": "購入額 RMB",
    "Value RMB": "評価額 RMB",
    "Notes": "メモ",
    "Save Card": "カードを保存",
    "Record Trade": "取引を記録",
    "Save Trade": "取引を保存",
    "Imports": "インポート",
    "Connect": "接続",
    "Disconnect": "切断",
    "Values": "評価",
    "Performance": "パフォーマンス",
    "Missing Cards": "不足カード",
    "Collection": "コレクション",
    "Cards": "カード",
    "Value": "価値",
    "Cost": "コスト",
    "Gain": "利益",
    "Show Cards": "カードを表示",
    "Hide Cards": "カードを隠す",
    "Grid": "グリッド",
    "Table": "表",
    "Search": "検索",
    "Sort": "並び替え",
    "Community": "コミュニティ",
    "Collecting Goals": "収集目標",
    "All Collection Goals": "すべての収集目標",
    "Add goal": "目標を追加",
    "Expand all": "すべて展開",
    "Collapse all": "すべて折りたたむ",
    "Create a collecting goal": "収集目標を作成",
    "Recent Sales": "最近の販売",
    "Collection research": "コレクション分析",
    "Sports Card Indices": "スポーツカード指数",
    "Investment score": "投資スコア",
    "Research signal only, not financial advice.": "調査用シグナルであり、投資助言ではありません。",
    "Awaiting verified sales": "確認済み取引を待機中",
    "Coverage": "カバレッジ",
    "Confidence": "信頼度",
    "Strong evidence": "強い根拠",
    "Developing": "発展中",
    "Speculative": "投機的",
    "Limited evidence": "根拠不足",
    "Momentum": "モメンタム",
    "Liquidity": "流動性",
    "Scarcity": "希少性",
    "Grade": "グレード",
    "Evidence": "データ品質",
    "Trades": "取引",
    "Deals": "ディール",
    "Language": "言語",
    "Appearance": "テーマ",
    "Emerald Vault": "エメラルド・ヴォールト",
    "Midnight Ink": "ミッドナイト・インク",
    "Crimson Archive": "クリムゾン・アーカイブ",
    "Titanium": "チタニウム"
    ,"Front": "表面"
    ,"Back": "裏面"
    ,"Upload rotating card image": "回転カード画像をアップロード"
    ,"Upload front": "表面をアップロード"
    ,"Upload back": "裏面をアップロード"
    ,"Reset": "リセット"
    ,"Drag to rotate 360": "ドラッグして360度回転"
  },
  ko: {
    "Every card, clearly valued.": "모든 카드의 가치를 선명하게.",
    "Portfolio": "포트폴리오",
    "AI Trade Builder": "AI 트레이드 빌더",
    "Market Insights": "시장 인사이트",
    "Pricing": "가격",
    "Search everything": "전체 검색",
    "Log In": "로그인",
    "Login": "로그인",
    "Sign Up": "가입",
    "Get Started": "시작하기",
    "Account": "계정",
    "Email": "이메일",
    "Password": "비밀번호",
    "Create Account": "계정 만들기",
    "Logout": "로그아웃",
    "Save": "저장",
    "Collection Privacy": "컬렉션 공개 설정",
    "Private": "비공개",
    "Friends only": "친구만",
    "Public": "공개",
    "Add a Card": "카드 추가",
    "Year": "연도",
    "Set": "세트",
    "Player": "선수",
    "Type": "유형",
    "Number": "번호",
    "Sport": "스포츠",
    "Condition": "상태",
    "Quantity": "수량",
    "Save Card": "카드 저장",
    "Record Trade": "거래 기록",
    "Collection": "컬렉션",
    "Cards": "카드",
    "Value": "가치",
    "Cost": "비용",
    "Gain": "수익",
    "Search": "검색",
    "Community": "커뮤니티",
    "All Collection Goals": "모든 수집 목표",
    "Add goal": "목표 추가",
    "Expand all": "모두 펼치기",
    "Collapse all": "모두 접기",
    "Create a collecting goal": "수집 목표 만들기",
    "Sports Card Indices": "스포츠 카드 지수",
    "Investment score": "투자 점수",
    "Research signal only, not financial advice.": "조사 신호일 뿐 투자 조언이 아닙니다.",
    "Awaiting verified sales": "검증된 거래 대기 중",
    "Coverage": "커버리지",
    "Confidence": "신뢰도",
    "Trades": "거래",
    "Deals": "딜",
    "Language": "언어",
    "Appearance": "테마",
    "Emerald Vault": "에메랄드 볼트",
    "Midnight Ink": "미드나이트 잉크",
    "Crimson Archive": "크림슨 아카이브",
    "Titanium": "티타늄"
    ,"Front": "앞면"
    ,"Back": "뒷면"
    ,"Upload rotating card image": "회전 카드 이미지 업로드"
    ,"Upload front": "앞면 업로드"
    ,"Upload back": "뒷면 업로드"
    ,"Reset": "초기화"
    ,"Drag to rotate 360": "드래그하여 360도 회전"
  },
  es: {
    "Every card, clearly valued.": "Cada carta, con valor claro.",
    "Portfolio": "Portafolio",
    "AI Trade Builder": "Constructor de Cambios IA",
    "Market Insights": "Mercado",
    "Pricing": "Precios",
    "Search everything": "Buscar todo",
    "Log In": "Iniciar sesión",
    "Login": "Iniciar sesión",
    "Sign Up": "Registrarse",
    "Get Started": "Empezar",
    "Account": "Cuenta",
    "Email": "Correo",
    "Password": "Contraseña",
    "Create Account": "Crear cuenta",
    "Logout": "Cerrar sesión",
    "Save": "Guardar",
    "Collection Privacy": "Privacidad de colección",
    "Private": "Privado",
    "Friends only": "Solo amigos",
    "Public": "Público",
    "Add a Card": "Agregar carta",
    "Year": "Año",
    "Set": "Set",
    "Player": "Jugador",
    "Type": "Tipo",
    "Number": "Número",
    "Sport": "Deporte",
    "Condition": "Condición",
    "Quantity": "Cantidad",
    "Save Card": "Guardar carta",
    "Record Trade": "Registrar cambio",
    "Collection": "Colección",
    "Cards": "Cartas",
    "Value": "Valor",
    "Cost": "Costo",
    "Gain": "Ganancia",
    "Search": "Buscar",
    "Community": "Comunidad",
    "All Collection Goals": "Todos los objetivos",
    "Add goal": "Agregar objetivo",
    "Expand all": "Expandir todo",
    "Collapse all": "Contraer todo",
    "Create a collecting goal": "Crear objetivo de colección",
    "Sports Card Indices": "Índices por deporte",
    "Investment score": "Puntuación de inversión",
    "Research signal only, not financial advice.": "Señal de investigación, no asesoramiento financiero.",
    "Awaiting verified sales": "Esperando ventas verificadas",
    "Coverage": "Cobertura",
    "Confidence": "Confianza",
    "Trades": "Cambios",
    "Deals": "Acuerdos",
    "Language": "Idioma",
    "Appearance": "Tema",
    "Emerald Vault": "Bóveda Esmeralda",
    "Midnight Ink": "Tinta Nocturna",
    "Crimson Archive": "Archivo Carmesí",
    "Titanium": "Titanio"
    ,"Front": "Frente"
    ,"Back": "Reverso"
    ,"Upload rotating card image": "Subir imagen de tarjeta giratoria"
    ,"Upload front": "Subir frente"
    ,"Upload back": "Subir reverso"
    ,"Reset": "Restablecer"
    ,"Drag to rotate 360": "Arrastra para girar 360"
  }
};
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}
const ADMIN_USER = {
  name: "James Cho",
  email: "jamescho@jumbosoft.com",
  role: "admin"
};
const PANEL_ORDER = ["installApp", "entry", "sync", "photoImport", "pricing", "portfolio", "goalAssistant", "aiTrade", "condition", "collection", "diy", "collectors", "community", "goals", "alerts", "market", "dealRoom", "trades", "scan"];
const DEFAULT_SCORE_SETTINGS = {
  perCard: 5,
  perThousandValue: 10,
  perCompleteGoal: 500,
  perTrade: 25
};
const JULY_9_PURCHASE_CARDS = [
  {
    id: "purchase-2026-07-09-lamine-yamal-donruss-spain-rookie-base",
    player: "Lamine Yamal",
    sport: "Soccer",
    year: "2023-24",
    setName: "Donruss Spain",
    type: "Rookie",
    cardNumber: "",
    parallel: "Base",
    condition: "Raw",
    grade: "",
    quantity: 2,
    paid: 10,
    value: 50,
    location: "",
    notes: "Purchased July 9, 2026. Two copies bought for RMB 10 each. User-updated estimate on July 10, 2026: RMB 50 each."
  },
  {
    id: "purchase-2026-07-09-wembanyama-prizm-rookie-base",
    player: "Victor Wembanyama",
    sport: "Basketball",
    year: "2023-24",
    setName: "Panini Prizm",
    type: "Rookie",
    cardNumber: "136",
    parallel: "Base",
    condition: "Raw",
    grade: "",
    quantity: 1,
    paid: 350,
    value: 419,
    location: "",
    notes: "Purchased July 9, 2026. Estimate uses the app's existing Wembanyama Prizm base reference."
  },
  {
    id: "purchase-2026-07-09-tchouameni-optic-france-pink-99",
    player: "Aurelien Tchouameni",
    sport: "Soccer",
    year: "2023-24",
    setName: "Donruss Optic France",
    type: "Base",
    cardNumber: "",
    parallel: "Pink /99",
    condition: "Raw",
    grade: "",
    quantity: 1,
    paid: 20,
    value: 20,
    location: "",
    notes: "Purchased July 9, 2026."
  },
  {
    id: "purchase-2026-07-09-barcola-merlin-refractor-rookie-sticker-auto",
    player: "Bradley Barcola",
    sport: "Soccer",
    year: "",
    setName: "Topps Merlin",
    type: "Rookie Sticker Auto",
    cardNumber: "",
    parallel: "Refractor",
    condition: "Raw",
    grade: "",
    quantity: 1,
    paid: 240,
    value: 240,
    location: "",
    notes: "Purchased July 9, 2026. France rookie sticker autograph."
  },
  {
    id: "purchase-2026-07-09-derrick-white-mosaic-chinese-prizm-8",
    player: "Derrick White",
    sport: "Basketball",
    year: "2020-21",
    setName: "Panini Mosaic",
    type: "Base",
    cardNumber: "",
    parallel: "Chinese Prizm /8",
    condition: "Raw",
    grade: "",
    quantity: 1,
    paid: 40,
    value: 130,
    location: "",
    notes: "Purchased July 9, 2026. User-updated estimate on July 10, 2026: RMB 130."
  },
  {
    id: "purchase-2026-07-09-durant-contenders-optic-superstar-prizm-odd-shape",
    player: "Kevin Durant",
    sport: "Basketball",
    year: "2020-21",
    setName: "Panini Contenders Optic",
    type: "Superstar",
    cardNumber: "",
    parallel: "Prizm",
    condition: "Raw",
    grade: "",
    quantity: 1,
    paid: 20,
    value: 20,
    location: "",
    notes: "Purchased July 9, 2026. Odd-shaped card."
  },
  {
    id: "purchase-2026-07-09-bellingham-chrome-boo-joga-ssp",
    player: "Jude Bellingham",
    sport: "Soccer",
    year: "2023",
    setName: "Topps Chrome",
    type: "Boo Joga SSP",
    cardNumber: "",
    parallel: "Chrome",
    condition: "Raw",
    grade: "",
    quantity: 1,
    paid: 50,
    value: 50,
    location: "",
    notes: "Purchased July 9, 2026."
  },
  {
    id: "purchase-2026-07-09-kawhi-leonard-marquee-rookie-base",
    player: "Kawhi Leonard",
    sport: "Basketball",
    year: "2012-13",
    setName: "Panini Marquee",
    type: "Rookie",
    cardNumber: "",
    parallel: "Base",
    condition: "Raw",
    grade: "",
    quantity: 1,
    paid: 20,
    value: 20,
    location: "",
    notes: "Purchased July 9, 2026."
  },
  {
    id: "purchase-2026-07-09-neuer-select-euro-tiger-stripe-mezzanine",
    player: "Manuel Neuer",
    sport: "Soccer",
    year: "2020",
    setName: "Panini Select UEFA Euro",
    type: "Mezzanine",
    cardNumber: "",
    parallel: "Tiger Stripe",
    condition: "Raw",
    grade: "",
    quantity: 1,
    paid: 200,
    value: 200,
    location: "",
    notes: "Purchased July 9, 2026. Paid price updated July 10, 2026: RMB 200. Est. value kept at paid price until an exact sold comp is added."
  },
  {
    id: "purchase-2026-07-09-nuno-mendes-stadium-club-chrome-rookie-199",
    player: "Nuno Mendes",
    sport: "Soccer",
    year: "",
    setName: "Topps Stadium Club Chrome",
    type: "Rookie",
    cardNumber: "",
    parallel: "Base /199",
    condition: "Raw",
    grade: "",
    quantity: 1,
    paid: 25.11,
    value: 25.11,
    location: "",
    notes: "Purchased July 9, 2026 for 600 JPY. Converted at about 1 JPY = 0.04185 RMB."
  },
  {
    id: "purchase-2026-07-09-olise-bayern-chrome-base-refractor",
    player: "Michael Olise",
    sport: "Soccer",
    year: "",
    setName: "Topps Chrome Bayern Munich",
    type: "Base",
    cardNumber: "",
    parallel: "Refractor",
    condition: "Raw",
    grade: "",
    quantity: 1,
    paid: 10,
    value: 10,
    location: "",
    notes: "Purchased July 9, 2026."
  },
  {
    id: "purchase-2026-07-09-mbappe-real-madrid-chrome-base-refractor",
    player: "Kylian Mbappe",
    sport: "Soccer",
    year: "",
    setName: "Topps Chrome Real Madrid",
    type: "Base",
    cardNumber: "",
    parallel: "Refractor",
    condition: "Raw",
    grade: "",
    quantity: 1,
    paid: 10,
    value: 10,
    location: "",
    notes: "Purchased July 9, 2026."
  },
  {
    id: "purchase-2026-07-09-olise-optic-world-cup-silver",
    player: "Michael Olise",
    sport: "Soccer",
    year: "2025-26",
    setName: "Donruss Optic World Cup",
    type: "Base",
    cardNumber: "",
    parallel: "Silver",
    condition: "Raw",
    grade: "",
    quantity: 1,
    paid: 10,
    value: 10,
    location: "",
    notes: "Purchased July 9, 2026."
  }
];
const VERIFIED_MARKET_DATA_KEY = "card-ledger-verified-market-2026-07-09-v1";
const VERIFIED_MARKET_DATA = {
  "manual-2018-brunson-optic-choice-red-179": [
    { date: "2026-07-09", value: 2482, source: "ebay", label: "eBay public comp: USD 365" },
    { date: "2026-07-09", value: 2550, source: "ebay", label: "SCI/eBay last sold: USD 375" },
    { date: "2026-07-09", value: 3173, source: "cardhobby", label: "CardHobby/app estimate pending confirmed sold comps" }
  ],
  "manual-2018-shai-optic-holo-162": [
    { date: "2026-01-26", value: 966, source: "ebay", label: "SportscardsPro/eBay PSA 9: USD 142" },
    { date: "2026-01-28", value: 1020, source: "ebay", label: "SportscardsPro/eBay PSA 9: USD 150" },
    { date: "2026-07-09", value: 1289, source: "ebay", label: "eBay raw listed/sold reference: USD 189.79" },
    { date: "2026-07-09", value: 1105, source: "cardhobby", label: "CardHobby/app estimate pending confirmed sold comps" }
  ],
  "manual-2023-wembanyama-prizm-base-136": [
    { date: "2026-07-02", value: 381, source: "ebay", label: "SportscardsPro/eBay sale: USD 56" },
    { date: "2026-07-02", value: 408, source: "ebay", label: "SportscardsPro/eBay sale: USD 60" },
    { date: "2026-07-02", value: 476, source: "ebay", label: "SportscardsPro/eBay sale: USD 70" },
    { date: "2026-07-09", value: 419, source: "cardhobby", label: "CardHobby/app estimate pending confirmed sold comps" }
  ],
  "manual-2018-brunson-prizm-choice-auto-ss-jbr": [
    { date: "2026-04-28", value: 1105, source: "ebay", label: "Existing eBay comp" },
    { date: "2026-05-30", value: 2217, source: "ebay", label: "Existing eBay comp" },
    { date: "2026-07-09", value: 1504, source: "cardhobby", label: "CardHobby/app estimate pending confirmed sold comps" }
  ],
  "manual-2018-trae-young-optic-rated-rookie-auto-198": [
    { date: "2026-07-09", value: 2040, source: "ebay", label: "eBay active/offer reference: USD 300" },
    { date: "2026-05-16", value: 2040, source: "ebay", label: "Existing comparable comp" },
    { date: "2026-07-09", value: 1983, source: "cardhobby", label: "CardHobby/app estimate pending confirmed sold comps" }
  ]
};
const OPTIC_GOAL_SET = "Panini Donruss Optic";
const MOJO_RED_PARALLEL = "Mojo Red /88";
const INSERT_RED_PARALLEL = "Red /99";
const MOJO_RED_MISSING_NUMBERS = new Set(
  "3,15,16,20,22,35,40,54,59,80,84,86,94,108,116,117,119,121,125,130,138,142,150,157-163,166-168,170,172-175,177,179,180,182,185-189,191,192,194,197,198"
    .split(",")
    .flatMap((part) => {
      const [start, end] = part.split("-").map((value) => Number.parseInt(value, 10));
      return end ? Array.from({ length: end - start + 1 }, (_, index) => start + index) : [start];
    })
);
function numberSet(value) {
  return new Set(
    text(value)
      .split(/[\s,]+/)
      .filter(Boolean)
      .flatMap((part) => {
        const [start, end] = part.split("-").map((number) => Number.parseInt(number, 10));
        return end ? Array.from({ length: end - start + 1 }, (_, index) => start + index) : [start];
      })
      .filter(Number.isFinite)
  );
}
const OPTIC_INSERT_MISSING_NUMBERS = {
  "Retro Series": numberSet("2 3 5 7 8 10 20 23 24 26 27"),
  "All-Stars": numberSet("3 5 6 7 8 12"),
  "All Heart": numberSet("3 4 5 6 7 9 11-18"),
  "Swishful Thinking": numberSet("2 4 6 8 9"),
  "All Clear for Takeoff": numberSet("1 2 7 10 11 12 14 15")
};
const DONRUSS_OPTIC_2018_PLAYERS = Object.fromEntries(`
#1|Damian Lillard
#2|Stephen Curry
#3|Kyle Lowry
#4|Patrick Beverley
#5|Goran Dragic
#6|Dennis Schroder
#7|Elfrid Payton
#8|Kemba Walker
#9|D.J. Augustin
#10|Dennis Smith Jr.
#11|CJ McCollum
#12|Klay Thompson
#13|DeMar DeRozan
#14|Lou Williams
#15|Dwyane Wade
#16|Jeremy Lin
#17|Jrue Holiday
#18|Nicolas Batum
#19|Evan Fournier
#20|Wesley Matthews
#21|Evan Turner
#22|Kevin Durant
#23|OG Anunoby
#24|Avery Bradley
#25|James Johnson
#26|Taurean Prince
#27|Nikola Mirotic
#28|Malik Monk
#29|Terrence Ross
#30|Harrison Barnes
#31|Zach Collins
#32|Draymond Green
#33|Serge Ibaka
#34|Tobias Harris
#35|Dion Waiters
#36|John Collins
#37|Julius Randle
#38|Michael Kidd-Gilchrist
#39|Aaron Gordon
#40|Dirk Nowitzki
#41|Jusuf Nurkic
#42|DeMarcus Cousins
#43|Jonas Valanciunas
#44|Marcin Gortat
#45|Hassan Whiteside
#46|Dewayne Dedmon
#47|Anthony Davis
#48|Tony Parker
#49|Nikola Vucevic
#50|DeAndre Jordan
#51|De'Aaron Fox
#52|Chris Paul
#53|Ricky Rubio
#54|Lonzo Ball
#55|Eric Bledsoe
#56|Kyrie Irving
#57|Frank Ntilikina
#58|Kris Dunn
#59|Ben Simmons
#60|Jamal Murray
#61|Bogdan Bogdanovic
#62|Clint Capela
#63|Donovan Mitchell
#64|Brandon Ingram
#65|Malcolm Brogdon
#66|Jaylen Brown
#67|Tim Hardaway Jr.
#68|Zach LaVine
#69|Markelle Fultz
#70|Gary Harris
#71|Buddy Hield
#72|James Harden
#73|Joe Ingles
#74|Rajon Rondo
#75|Khris Middleton
#76|Jayson Tatum
#77|Mario Hezonja
#78|Denzel Valentine
#79|JJ Redick
#80|Will Barton
#81|Zach Randolph
#82|Ryan Anderson
#83|Derrick Favors
#84|Kyle Kuzma
#85|Giannis Antetokounmpo
#86|Gordon Hayward
#87|Kristaps Porzingis
#88|Lauri Markkanen
#89|Dario Saric
#90|Paul Millsap
#91|Willie Cauley-Stein
#92|Eric Gordon
#93|Rudy Gobert
#94|LeBron James
#95|Matthew Dellavedova
#96|Al Horford
#97|Enes Kanter
#98|Robin Lopez
#99|Joel Embiid
#100|Nikola Jokic
#101|Rudy Gay
#102|Tyreke Evans
#103|John Wall
#104|Mike Conley
#105|Jeff Teague
#106|Spencer Dinwiddie
#107|Russell Westbrook
#108|George Hill
#109|Brandon Knight
#110|Reggie Jackson
#111|Danny Green
#112|Victor Oladipo
#113|Bradley Beal
#114|MarShon Brooks
#115|Jimmy Butler
#116|D'Angelo Russell
#117|Paul George
#118|JR Smith
#119|Devin Booker
#120|Luke Kennard
#121|Kawhi Leonard
#122|Bojan Bogdanovic
#123|Otto Porter Jr.
#124|Dillon Brooks
#125|Derrick Rose
#126|DeMarre Carroll
#127|Carmelo Anthony
#128|Kyle Korver
#129|T.J. Warren
#130|Stanley Johnson
#131|LaMarcus Aldridge
#132|Thaddeus Young
#133|Jeff Green
#134|JaMychal Green
#135|Andrew Wiggins
#136|Rondae Hollis-Jefferson
#137|Steven Adams
#138|Kevin Love
#139|Josh Jackson
#140|Blake Griffin
#141|Pau Gasol
#142|Myles Turner
#143|Dwight Howard
#144|Marc Gasol
#145|Karl-Anthony Towns
#146|Jarrett Allen
#147|Nerlens Noel
#148|Tristan Thompson
#149|Trevor Ariza
#150|Andre Drummond
#151|Jarred Vanderbilt
#152|Jerome Robinson
#153|Melvin Frazier Jr.
#154|Zhaire Smith
#155|Rodions Kurucs
#156|Grayson Allen
#157|Deandre Ayton
#158|Landry Shamet
#159|Elie Okobo
#160|Mo Bamba
#161|Bruce Brown
#162|Shai Gilgeous-Alexander
#163|Mitchell Robinson
#164|Donte DiVincenzo
#165|Vincent Edwards
#166|Chandler Hutchison
#167|Robert Williams III
#168|Marvin Bagley III
#169|Jevon Carter
#170|Wendell Carter Jr.
#171|Hamidou Diallo
#172|Miles Bridges
#173|Khyri Thomas
#174|Lonnie Walker IV
#175|Allonzo Trier
#176|Aaron Holiday
#177|Luka Doncic
#178|Jacob Evans III
#179|Jalen Brunson
#180|Collin Sexton
#181|De'Anthony Melton
#182|Michael Porter Jr.
#183|Justin Jackson
#184|Kevin Huerter
#185|Kostas Antetokounmpo
#186|Anfernee Simons
#187|Dzanan Musa
#188|Jaren Jackson Jr.
#189|Devonte' Graham
#190|Kevin Knox
#191|Keita Bates-Diop
#192|Troy Brown Jr.
#193|Svi Mykhailiuk
#194|Josh Okogie
#195|Chimezie Metu
#196|Omari Spellman
#197|Moritz Wagner
#198|Trae Young
#199|Gary Trent Jr.
#200|Mikal Bridges
`
  .trim()
  .split("\n")
  .map((line) => line.split("|")));
const OPTIC_INSERT_CHECKLISTS = {
  "All-Stars": [
    ["#1", "LeBron James"], ["#2", "Kevin Durant"], ["#3", "Russell Westbrook"], ["#4", "Kyrie Irving"], ["#5", "Anthony Davis"],
    ["#6", "Paul George"], ["#7", "Andre Drummond"], ["#8", "Bradley Beal"], ["#9", "Victor Oladipo"], ["#10", "Kemba Walker"],
    ["#11", "James Harden"], ["#12", "DeMar DeRozan"], ["#13", "Stephen Curry"], ["#14", "Giannis Antetokounmpo"], ["#15", "Joel Embiid"],
    ["#16", "Kyle Lowry"], ["#17", "Klay Thompson"], ["#18", "Damian Lillard"], ["#19", "Draymond Green"], ["#20", "Karl-Anthony Towns"]
  ],
  "All Heart": [
    ["#1", "Allen Iverson"], ["#2", "Jimmy Butler"], ["#3", "Dwyane Wade"], ["#4", "Giannis Antetokounmpo"], ["#5", "Kevin Durant"],
    ["#6", "Draymond Green"], ["#7", "Paul Pierce"], ["#8", "James Harden"], ["#9", "Kevin Garnett"], ["#10", "Russell Westbrook"],
    ["#11", "Dirk Nowitzki"], ["#12", "Andrew Wiggins"], ["#13", "LeBron James"], ["#14", "Dennis Rodman"], ["#15", "Donovan Mitchell"],
    ["#16", "Chris Paul"], ["#17", "John Wall"], ["#18", "Rudy Gay"], ["#19", "Kobe Bryant"], ["#20", "Stephen Curry"]
  ],
  "All Clear for Takeoff": [
    ["#1", "LeBron James"], ["#2", "Victor Oladipo"], ["#3", "Dominique Wilkins"], ["#4", "Larry Nance Jr."], ["#5", "Zach LaVine"],
    ["#6", "Russell Westbrook"], ["#7", "Spud Webb"], ["#8", "Dwight Howard"], ["#9", "Shawn Kemp"], ["#10", "Tracy McGrady"],
    ["#11", "Blake Griffin"], ["#12", "Donovan Mitchell"], ["#13", "Julius Erving"], ["#14", "Dennis Smith Jr."], ["#15", "Kobe Bryant"]
  ],
  "Retro Series": [
    ["#1", "Baron Davis"], ["#2", "Paul Pierce"], ["#3", "Kevin Garnett"], ["#4", "John Stockton"], ["#5", "Allen Iverson"],
    ["#6", "Amar'e Stoudemire"], ["#7", "Larry Bird"], ["#8", "Stephon Marbury"], ["#9", "Ray Allen"], ["#10", "Shaquille O'Neal"],
    ["#11", "Tim Duncan"], ["#12", "Scottie Pippen"], ["#13", "Anfernee Hardaway"], ["#14", "Karl Malone"], ["#15", "Dennis Johnson"],
    ["#16", "Charles Barkley"], ["#17", "Oscar Robertson"], ["#18", "Tracy McGrady"], ["#19", "Manute Bol"], ["#20", "Gary Payton"],
    ["#21", "Julius Erving"], ["#22", "Dennis Rodman"], ["#23", "Kobe Bryant"], ["#24", "Grant Hill"], ["#25", "Magic Johnson"],
    ["#26", "Reggie Miller"], ["#27", "Pete Maravich"], ["#28", "Steve Nash"], ["#29", "Wilt Chamberlain"], ["#30", "Drazen Petrovic"]
  ],
  "Swishful Thinking": [
    ["#1", "Larry Bird"], ["#2", "Klay Thompson"], ["#3", "Kyle Lowry"], ["#4", "Reggie Miller"], ["#5", "Ray Allen"],
    ["#6", "Steve Kerr"], ["#7", "James Harden"], ["#8", "Paul George"], ["#9", "Stephen Curry"], ["#10", "Kemba Walker"]
  ]
};
const SEEDED_CARDS = [
  {
    id: "manual-2018-brunson-prizm-choice-red-88",
    createdAt: "2026-07-08T00:00:00.000Z",
    updatedAt: "2026-07-08T00:00:00.000Z",
    player: "Jalen Brunson",
    sport: "Basketball",
    year: "2018-19",
    setName: "Panini Prizm Choice",
    cardNumber: "250",
    parallel: "Red Prizm /88",
    condition: "Raw",
    grade: "",
    quantity: 1,
    paid: 0,
    value: 3400,
    marketSales: [
      { date: "2026-04-20", value: 2856, label: "RMB 2,856" },
      { date: "2026-05-26", value: 3264, label: "RMB 3,264" },
      { date: "2026-06-18", value: 3400, label: "RMB 3,400" }
    ],
    location: "",
    notes:
      "Entered from user list: 2018-19 Brunson mojo red base /88. Assumed 2018-19 Panini Prizm Choice Red Prizm #250 /88. Comp basis checked July 8, 2026: Sports Card Investor reports raw last sold for about RMB 3,400, converted from a 500 US-dollar comp at roughly 6.80 RMB per US dollar; eBay active/graded PSA 9 examples around RMB 6,256-RMB 6,793."
  },
  {
    id: "manual-2018-shai-optic-holo-silver-162",
    aliases: ["manual-2018-shai-prizm-mojo-25"],
    createdAt: "2026-07-08T00:00:00.000Z",
    updatedAt: "2026-07-08T00:00:00.000Z",
    player: "Shai Gilgeous-Alexander",
    sport: "Basketball",
    year: "2018-19",
    setName: "Panini Donruss Optic",
    cardNumber: "162",
    parallel: "Holo Silver Rated Rookie",
    condition: "Raw",
    grade: "",
    quantity: 1,
    paid: 0,
    value: 1346.4,
    marketSales: [
      { date: "2026-05-04", value: 813, label: "RMB 813" },
      { date: "2026-06-03", value: 1156, label: "RMB 1,156" },
      { date: "2026-07-08", value: 1346.4, label: "RMB 1,346" }
    ],
    location: "",
    notes:
      "Entered from user list: 2018-19 Shai mojo silver base. Corrected to Optic, assumed 2018-19 Panini Donruss Optic Holo Silver Rated Rookie #162. Comp basis checked July 8, 2026: Sports Card Investor reports raw Optic Holo last sold for about RMB 1,346, converted from a 198 US-dollar comp at roughly 6.80 RMB per US dollar; Sportscardspro recent raw Holo sales cluster around RMB 813-RMB 1,156."
  },
  {
    id: "manual-2023-wembanyama-prizm-base-136",
    createdAt: "2026-07-08T00:00:00.000Z",
    updatedAt: "2026-07-08T00:00:00.000Z",
    player: "Victor Wembanyama",
    sport: "Basketball",
    year: "2023-24",
    setName: "Panini Prizm",
    cardNumber: "136",
    parallel: "Base Rookie",
    condition: "Raw",
    grade: "",
    quantity: 1,
    paid: 0,
    value: 374,
    marketSales: [
      { date: "2026-05-18", value: 476, label: "RMB 476" },
      { date: "2026-06-22", value: 408, label: "RMB 408" },
      { date: "2026-07-08", value: 374, label: "RMB 374" }
    ],
    location: "",
    notes:
      "Entered from user list: Wembanyama rookie Prizm base. Comp basis checked July 8, 2026: recent Sportscardspro/eBay raw/base comp around RMB 369, converted from a 54.25 US-dollar comp at roughly 6.80 RMB per US dollar; active raw listings often around RMB 476-RMB 612 depending centering and condition."
  },
  {
    id: "manual-2018-brunson-prizm-choice-auto-ss-jbr",
    createdAt: "2026-07-08T00:00:00.000Z",
    updatedAt: "2026-07-08T00:00:00.000Z",
    player: "Jalen Brunson",
    sport: "Basketball",
    year: "2018-19",
    setName: "Panini Prizm Sensational Signatures Choice",
    cardNumber: "SS-JBR",
    parallel: "Choice/Red Mojo Autograph",
    condition: "Raw",
    grade: "",
    quantity: 1,
    paid: 0,
    value: 1190,
    marketSales: [
      { date: "2026-04-28", value: 1105, label: "RMB 1,105" },
      { date: "2026-05-30", value: 2217, label: "RMB 2,217" },
      { date: "2026-07-08", value: 1190, label: "RMB 1,190" }
    ],
    location: "",
    notes:
      "Entered from user list: 2018-19 Brunson mojo red sticker auto. Assumed Prizm Sensational Signatures Choice/Red Scope sticker auto. Comp basis checked July 8, 2026: Sportscardspro shows a comparable recent sale around RMB 1,190, converted from a 175 US-dollar comp at roughly 6.80 RMB per US dollar, with older comps roughly RMB 1,105-RMB 2,217."
  },
  {
    id: "manual-2018-trae-young-optic-rated-rookie-auto-198",
    aliases: ["manual-2018-trae-young-revolution-on-card-auto-ra-tyg"],
    createdAt: "2026-07-08T00:00:00.000Z",
    updatedAt: "2026-07-08T00:00:00.000Z",
    player: "Trae Young",
    sport: "Basketball",
    year: "2018-19",
    setName: "Panini Donruss Optic Rated Rookie Signatures",
    cardNumber: "198",
    parallel: "On-card Rated Rookie Auto",
    condition: "Raw",
    grade: "",
    quantity: 1,
    paid: 0,
    value: 2210,
    marketSales: [
      { date: "2026-03-03", value: 1700, label: "RMB 1,700" },
      { date: "2026-05-16", value: 2040, label: "RMB 2,040" },
      { date: "2026-07-08", value: 2210, label: "RMB 2,210" }
    ],
    location: "",
    notes:
      "Entered from user list: 2018-19 Trae Young on card auto. Corrected to 2018-19 Panini Donruss Optic Rated Rookie Signatures #198, on-card auto. Estimate basis checked July 8, 2026: PSA guide lists raw/NM-MT/MT/GEM ranges for Trae Young Optic auto around USD 325+/725+/1000; app uses a conservative raw RMB estimate."
  }
];

const form = document.querySelector("#cardForm");
const fields = {
  id: document.querySelector("#cardId"),
  player: document.querySelector("#player"),
  sport: document.querySelector("#sport"),
  year: document.querySelector("#year"),
  brand: document.querySelector("#brand"),
  setName: document.querySelector("#setName"),
  type: document.querySelector("#cardType"),
  cardNumber: document.querySelector("#cardNumber"),
  parallel: document.querySelector("#parallel"),
  condition: document.querySelector("#condition"),
  grade: document.querySelector("#grade"),
  certification: document.querySelector("#certification"),
  quantity: document.querySelector("#quantity"),
  paid: document.querySelector("#paid"),
  value: document.querySelector("#value"),
  location: document.querySelector("#location"),
  notes: document.querySelector("#notes")
};

const catalogCustomFields = {
  brand: document.querySelector("#brandCustom"),
  setName: document.querySelector("#setNameCustom"),
  player: document.querySelector("#playerCustom")
};

const tradeForm = document.querySelector("#tradeForm");
const tradeFields = {
  date: document.querySelector("#tradeDate"),
  counterparty: document.querySelector("#tradeCounterparty"),
  outgoing: document.querySelector("#tradeOutgoing"),
  incoming: document.querySelector("#tradeIncoming"),
  cashPaid: document.querySelector("#tradeCashPaid"),
  cashReceived: document.querySelector("#tradeCashReceived"),
  notes: document.querySelector("#tradeNotes")
};

const tradePostForm = document.querySelector("#tradePostForm");
const tradePostFields = {
  cards: document.querySelector("#tradePostCards"),
  photo: document.querySelector("#tradePostPhoto"),
  note: document.querySelector("#tradePostNote")
};

const tradeAiFields = {
  mine: document.querySelector("#tradeAiMine"),
  theirs: document.querySelector("#tradeAiTheirs"),
  maxCards: document.querySelector("#tradeAiMaxCards"),
  tolerance: document.querySelector("#tradeAiTolerance"),
  maxCash: document.querySelector("#tradeAiMaxCash"),
  structuredSide: document.querySelector("#tradeAiStructuredSide"),
  year: document.querySelector("#tradeAiYear"),
  brand: document.querySelector("#tradeAiBrand"),
  setName: document.querySelector("#tradeAiSet"),
  player: document.querySelector("#tradeAiPlayer"),
  type: document.querySelector("#tradeAiType"),
  parallel: document.querySelector("#tradeAiParallel"),
  cardNumber: document.querySelector("#tradeAiNumber"),
  grade: document.querySelector("#tradeAiGrade"),
  value: document.querySelector("#tradeAiValue")
};

const bulkCardFields = {
  input: document.querySelector("#bulkCardInput")
};

const purchaseSyncFields = {
  input: document.querySelector("#purchaseImportInput")
};

const photoImportFields = {
  file: document.querySelector("#photoImportFile"),
  preview: document.querySelector("#photoImportPreview"),
  backFile: document.querySelector("#photoImportBackFile"),
  backPreview: document.querySelector("#photoImportBackPreview"),
  line: document.querySelector("#photoImportLine"),
  assessment: document.querySelector("#photoImportAssessment"),
  analysisState: document.querySelector("#photoImportAnalysisState"),
  estimatedPsa: document.querySelector("#photoImportEstimatedPsa"),
  estimatedBgs: document.querySelector("#photoImportEstimatedBgs"),
  confidence: document.querySelector("#photoImportConfidence"),
  population: document.querySelector("#photoImportPopulation"),
  refreshPopulation: document.querySelector("#photoImportRefreshPopulation"),
  insert: document.querySelector("#insertPhotoCard")
};

const dealRoomForm = document.querySelector("#dealRoomForm");
const dealRoomFields = {
  participants: document.querySelector("#dealRoomParticipants"),
  type: document.querySelector("#dealRoomType"),
  status: document.querySelector("#dealRoomStatus"),
  mine: document.querySelector("#dealRoomMine"),
  theirs: document.querySelector("#dealRoomTheirs"),
  cashPaid: document.querySelector("#dealRoomCashPaid"),
  cashReceived: document.querySelector("#dealRoomCashReceived"),
  notes: document.querySelector("#dealRoomNotes")
};

const scanElements = {
  video: document.querySelector("#scanVideo"),
  canvas: document.querySelector("#scanCanvas"),
  preview: document.querySelector("#scanPreview"),
  deviceSelect: document.querySelector("#scanCameraSelect")
};

const playerScanElements = {
  file: document.querySelector("#playerScanFile"),
  preview: document.querySelector("#playerScanPreview"),
  match: document.querySelector("#playerScanMatch"),
  apply: document.querySelector("#applyPlayerScan"),
  status: document.querySelector("#playerScanStatus"),
  identity: document.querySelector("#playerScanIdentity"),
  confidence: document.querySelector("#playerScanConfidence"),
  evidence: document.querySelector("#playerScanEvidence"),
  selectedName: document.querySelector("#playerScanSelectedName"),
  selectedSport: document.querySelector("#playerScanSelectedSport"),
  source: document.querySelector("#playerScanSource"),
  cardDetails: document.querySelector("#playerScanCardDetails"),
};

const globalScanElements = {
  open: document.querySelector("#openGlobalScanner"),
  close: document.querySelector("#closeGlobalScanner"),
  backdrop: document.querySelector("#globalScanBackdrop"),
  drawer: document.querySelector("#globalScanDrawer"),
  choose: document.querySelector("#globalScanChoose"),
  file: document.querySelector("#globalScanFile"),
  empty: document.querySelector("#globalScanEmpty"),
  result: document.querySelector("#globalScanResult"),
  preview: document.querySelector("#globalScanPreview"),
  confidence: document.querySelector("#globalScanConfidence"),
  title: document.querySelector("#globalScanResultTitle"),
  meta: document.querySelector("#globalScanResultMeta"),
  details: document.querySelector("#globalScanResultDetails"),
  status: document.querySelector("#globalScanStatus"),
  again: document.querySelector("#globalScanAgain"),
  review: document.querySelector("#globalScanReview")
};

const beginnerGuideElements = {
  count: document.querySelector("#beginnerGuideCount"),
  bar: document.querySelector("#beginnerGuideBar"),
  status: document.querySelector("#beginnerGuideStatus"),
  saveBar: document.querySelector(".beginner-save-bar"),
  saveTitle: document.querySelector("#beginnerSaveTitle"),
  saveHint: document.querySelector("#beginnerSaveHint"),
  steps: [...document.querySelectorAll("[data-beginner-step]")]
};

const conditionElements = {
  area: document.querySelector("#conditionArea"),
  modeButtons: document.querySelectorAll("[data-condition-mode]"),
  uploadPane: document.querySelector("#conditionUploadPane"),
  cameraPane: document.querySelector("#conditionCameraPane"),
  frontInput: document.querySelector("#conditionFrontInput"),
  backInput: document.querySelector("#conditionBackInput"),
  frontPreview: document.querySelector("#conditionFrontPreview"),
  backPreview: document.querySelector("#conditionBackPreview"),
  video: document.querySelector("#conditionCameraVideo"),
  cameraEmpty: document.querySelector("#conditionCameraEmpty"),
  canvas: document.querySelector("#conditionCameraCanvas"),
  startCamera: document.querySelector("#conditionStartCamera"),
  stopCamera: document.querySelector("#conditionStopCamera"),
  captureFront: document.querySelector("#conditionCaptureFront"),
  captureBack: document.querySelector("#conditionCaptureBack"),
  cameraStatus: document.querySelector("#conditionCameraStatus"),
  analyze: document.querySelector("#conditionAnalyze"),
  reset: document.querySelector("#conditionReset"),
  reportEmpty: document.querySelector("#conditionReportEmpty"),
  report: document.querySelector("#conditionReport"),
  psaGrade: document.querySelector("#conditionPsaGrade"),
  psaLabel: document.querySelector("#conditionPsaLabel"),
  bgsGrade: document.querySelector("#conditionBgsGrade"),
  bgsLabel: document.querySelector("#conditionBgsLabel"),
  confidence: document.querySelector("#conditionConfidence"),
  confidenceBar: document.querySelector("#conditionConfidenceBar"),
  confidenceNote: document.querySelector("#conditionConfidenceNote"),
  metricList: document.querySelector("#conditionMetricList"),
  evidenceList: document.querySelector("#conditionEvidenceList"),
  collectionCard: document.querySelector("#conditionCollectionCard"),
  saveReport: document.querySelector("#conditionSaveReport"),
  saveStatus: document.querySelector("#conditionSaveStatus")
};

const goalForm = document.querySelector("#goalForm");
const goalFields = {
  title: document.querySelector("#goalTitle"),
  player: document.querySelector("#goalPlayer"),
  setName: document.querySelector("#goalSet"),
  parallel: document.querySelector("#goalParallel"),
  season: document.querySelector("#goalSeason"),
  type: document.querySelector("#goalType"),
  startYear: document.querySelector("#goalStartYear"),
  endYear: document.querySelector("#goalEndYear"),
  startNumber: document.querySelector("#goalStartNumber"),
  endNumber: document.querySelector("#goalEndNumber"),
  notes: document.querySelector("#goalNotes")
};

const loginForm = document.querySelector("#loginForm");
const loginFields = {
  email: document.querySelector("#loginEmail"),
  password: document.querySelector("#loginPassword")
};

const signupForm = document.querySelector("#signupForm");
const signupFields = {
  name: document.querySelector("#signupName"),
  email: document.querySelector("#signupEmail"),
  password: document.querySelector("#signupPassword")
};
const landingLoginForm = document.querySelector("#landingLoginForm");
const landingLoginFields = {
  email: document.querySelector("#landingLoginEmail"),
  password: document.querySelector("#landingLoginPassword")
};
const landingSignupForm = document.querySelector("#landingSignupForm");
const landingSignupFields = {
  name: document.querySelector("#landingSignupName"),
  email: document.querySelector("#landingSignupEmail"),
  password: document.querySelector("#landingSignupPassword")
};
const phoneAuthScopes = {
  account: {
    form: document.querySelector("#phoneLoginForm"),
    phone: document.querySelector("#phoneLoginNumber"),
    code: document.querySelector("#phoneLoginCode"),
    send: document.querySelector("#sendPhoneOtp")
  },
  landing: {
    form: document.querySelector("#landingPhoneLoginForm"),
    phone: document.querySelector("#landingPhoneLoginNumber"),
    code: document.querySelector("#landingPhoneLoginCode"),
    send: document.querySelector("#landingSendPhoneOtp")
  }
};
const linkPhoneForm = document.querySelector("#linkPhoneForm");
const linkPhoneFields = {
  phone: document.querySelector("#linkPhoneNumber"),
  code: document.querySelector("#linkPhoneCode"),
  send: document.querySelector("#sendLinkPhoneOtp"),
  status: document.querySelector("#linkPhoneStatus")
};

const adminScoreForm = document.querySelector("#adminScoreForm");
const scoreFields = {
  perCard: document.querySelector("#scorePerCard"),
  perThousandValue: document.querySelector("#scorePerThousand"),
  perCompleteGoal: document.querySelector("#scorePerCompleteGoal"),
  perTrade: document.querySelector("#scorePerTrade")
};

const friendForm = document.querySelector("#friendForm");
const friendFields = {
  email: document.querySelector("#friendEmail"),
  name: document.querySelector("#friendName")
};

const communityPostForm = document.querySelector("#communityPostForm");
const communityFields = {
  selectedCard: document.querySelector("#communityPostCard"),
  intent: document.querySelector("#communityPostIntent"),
  cards: document.querySelector("#communityPostCards"),
  photo: document.querySelector("#communityPostPhoto"),
  note: document.querySelector("#communityPostNote")
};

const chatForm = document.querySelector("#chatForm");
const chatFields = {
  participants: document.querySelector("#chatParticipants"),
  message: document.querySelector("#chatMessage")
};

const profileSettingsForm = document.querySelector("#profileSettingsForm");
const profileFields = {
  photo: document.querySelector("#profilePhoto"),
  description: document.querySelector("#profileDescription"),
  age: document.querySelector("#profileAge"),
  location: document.querySelector("#profileLocation")
};
const supabaseFields = {
  url: document.querySelector("#supabaseUrl"),
  anonKey: document.querySelector("#supabaseAnonKey")
};
const auctionFields = {
  endpoint: document.querySelector("#auctionApiEndpoint"),
  minValue: document.querySelector("#auctionMinValue")
};

const els = {
  resetForm: document.querySelector("#resetForm"),
  authGrid: document.querySelector(".auth-grid"),
  languageSelect: document.querySelector("#languageSelect"),
  themeSelect: document.querySelector("#themeSelect"),
  globalSearch: document.querySelector("#globalSearch"),
  clearGlobalSearch: document.querySelector("#clearGlobalSearch"),
  globalSearchResults: document.querySelector("#globalSearchResults"),
  search: document.querySelector("#search"),
  sportFilter: document.querySelector("#sportFilter"),
  sortBy: document.querySelector("#sortBy"),
  totalCards: document.querySelector("#totalCards"),
  totalValue: document.querySelector("#totalValue"),
  totalCost: document.querySelector("#totalCost"),
  netValue: document.querySelector("#netValue"),
  collectionHealthSummary: document.querySelector("#collectionHealthSummary"),
  collectionHealthBar: document.querySelector("#collectionHealthBar"),
  collectionPhotoCoverage: document.querySelector("#collectionPhotoCoverage"),
  collectionPsaCoverage: document.querySelector("#collectionPsaCoverage"),
  collectionReviewCount: document.querySelector("#collectionReviewCount"),
  collectionAddCard: document.querySelector("#collectionAddCard"),
  collectionReviewIssues: document.querySelector("#collectionReviewIssues"),
  collectionInventory: document.querySelector("#collectionInventory"),
  collectionViewerCount: document.querySelector("#collectionViewerCount"),
  quickToggleCollection: document.querySelector("#quickToggleCollection"),
  quickGridView: document.querySelector("#quickGridView"),
  quickTableView: document.querySelector("#quickTableView"),
  collectionQuickFilters: document.querySelectorAll("[data-collection-filter]"),
  landingCards: document.querySelector("#landingCards"),
  landingValue: document.querySelector("#landingValue"),
  landingGoals: document.querySelector("#landingGoals"),
  landingHeroCanvas: document.querySelector("#landingHeroCanvas"),
  pageWebglCanvas: document.querySelector("#pageWebglCanvas"),
  landingCardStage: document.querySelector("#landingCardStage"),
  landingCardCanvas: document.querySelector("#landingCardCanvas"),
  landingCardFrontUpload: document.querySelector("#landingCardFrontUpload"),
  landingCardBackUpload: document.querySelector("#landingCardBackUpload"),
  landingCardName: document.querySelector("#landingCardName"),
  landingCardFormat: document.querySelector("#landingCardFormat"),
  landingCardGrade: document.querySelector("#landingCardGrade"),
  landingCardUploadButtons: document.querySelectorAll("[data-card-upload]"),
  resetLandingCardImages: document.querySelector("#resetLandingCardImages"),
  closetCardStage: document.querySelector("#closetCardStage"),
  closetCardCanvas: document.querySelector("#closetCardCanvas"),
  closetCardRail: document.querySelector("#closetCardRail"),
  closetSelectedName: document.querySelector("#closetSelectedName"),
  closetCardCount: document.querySelector("#closetCardCount"),
  closetDisplayMode: document.querySelector("#closetDisplayMode"),
  closetCardFormat: document.querySelector("#closetCardFormat"),
  closetCardGrade: document.querySelector("#closetCardGrade"),
  closetResetView: document.querySelector("#closetResetView"),
  closetStageHint: document.querySelector("#closetStageHint"),
  closetPreviousCard: document.querySelector("#closetPreviousCard"),
  closetNextCard: document.querySelector("#closetNextCard"),
  closetUploadForm: document.querySelector("#closetUploadForm"),
  closetUploadName: document.querySelector("#closetUploadName"),
  closetFrontUpload: document.querySelector("#closetFrontUpload"),
  closetBackUpload: document.querySelector("#closetBackUpload"),
  closetUploadPreview: document.querySelector("#closetUploadPreview"),
  closetCollectionCard: document.querySelector("#closetCollectionCard"),
  addCollectionCardToCloset: document.querySelector("#addCollectionCardToCloset"),
  closetStatus: document.querySelector("#closetStatus"),
  nextBestAction: document.querySelector("#nextBestAction"),
  hero: document.querySelector(".hero"),
  directory: document.querySelector(".directory"),
  marketViewToolbar: document.querySelector("#marketViewToolbar"),
  marketViewButtons: document.querySelectorAll("[data-market-view]"),
  toggleMarketContext: document.querySelector("#toggleMarketContext"),
  marketNotesDrawer: document.querySelector(".market-notes-drawer"),
  focusViewToolbars: document.querySelectorAll(".focus-view-toolbar"),
  focusViewButtons: document.querySelectorAll("[data-focus-page][data-focus-view]"),
  pricingLabArea: document.querySelector("#pricingLabArea"),
  marketArea: document.querySelector("#marketArea"),
  installAppArea: document.querySelector("#installAppArea"),
  installAppButton: document.querySelector("#installAppButton"),
  startScanCamera: document.querySelector("#startScanCamera"),
  stopScanCamera: document.querySelector("#stopScanCamera"),
  captureScanCard: document.querySelector("#captureScanCard"),
  scanStatus: document.querySelector("#scanStatus"),
  gridList: document.querySelector("#gridList"),
  tableBody: document.querySelector("#tableBody"),
  tableWrap: document.querySelector("#tableWrap"),
  emptyState: document.querySelector("#emptyState"),
  goalCollectionList: document.querySelector("#goalCollectionList"),
  collectionRooms: document.querySelector("#collectionRooms"),
  toggleCollectionContent: document.querySelector("#toggleCollectionContent"),
  refreshCollectionPsa: document.querySelector("#refreshCollectionPsa"),
  cardTemplate: document.querySelector("#cardTemplate"),
  gridView: document.querySelector("#gridView"),
  tableView: document.querySelector("#tableView"),
  exportJson: document.querySelector("#exportJson"),
  exportCsv: document.querySelector("#exportCsv"),
  importJson: document.querySelector("#importJson"),
  sportIndices: document.querySelector("#sportIndices"),
  sportIndexUpdated: document.querySelector("#sportIndexUpdated"),
  marketCharts: document.querySelector("#marketCharts"),
  tradeList: document.querySelector("#tradeList"),
  tradeEmpty: document.querySelector("#tradeEmpty"),
  tradeNet: document.querySelector("#tradeNet"),
  resetTradeForm: document.querySelector("#resetTradeForm"),
  clearTradePost: document.querySelector("#clearTradePost"),
  importBulkCards: document.querySelector("#importBulkCards"),
  clearBulkCards: document.querySelector("#clearBulkCards"),
  bulkCardStatus: document.querySelector("#bulkCardStatus"),
  importPurchases: document.querySelector("#importPurchases"),
  fillPurchaseSample: document.querySelector("#fillPurchaseSample"),
  clearPurchaseImport: document.querySelector("#clearPurchaseImport"),
  purchaseSyncStatus: document.querySelector("#purchaseSyncStatus"),
  syncHistory: document.querySelector("#syncHistory"),
  ebayConnectionStatus: document.querySelector("#ebayConnectionStatus"),
  cardhobbyConnectionStatus: document.querySelector("#cardhobbyConnectionStatus"),
  marketplaceSearchQuery: document.querySelector("#marketplaceSearchQuery"),
  marketplaceSearchProvider: document.querySelector("#marketplaceSearchProvider"),
  searchMarketplaces: document.querySelector("#searchMarketplaces"),
  marketplaceSearchStatus: document.querySelector("#marketplaceSearchStatus"),
  marketplaceSearchResults: document.querySelector("#marketplaceSearchResults"),
  psaPopulationQuery: document.querySelector("#psaPopulationQuery"),
  searchPsaPopulation: document.querySelector("#searchPsaPopulation"),
  psaPopulationStatus: document.querySelector("#psaPopulationStatus"),
  psaPopulationResults: document.querySelector("#psaPopulationResults"),
  lookupPsaCard: document.querySelector("#lookupPsaCard"),
  psaCardLookup: document.querySelector("#psaCardLookup"),
  psaCardLookupResult: document.querySelector("#psaCardLookupResult"),
  imageApiEndpoint: document.querySelector("#imageApiEndpoint"),
  autoImageLookup: document.querySelector("#autoImageLookup"),
  saveImageSettings: document.querySelector("#saveImageSettings"),
  imageLookupStatus: document.querySelector("#imageLookupStatus"),
  auctionApiEndpoint: document.querySelector("#auctionApiEndpoint"),
  auctionMinValue: document.querySelector("#auctionMinValue"),
  saveAuctionSettings: document.querySelector("#saveAuctionSettings"),
  auctionLookupStatus: document.querySelector("#auctionLookupStatus"),
  auctionSourceList: document.querySelector("#auctionSourceList"),
  connectButtons: document.querySelectorAll("[data-connect-provider]"),
  disconnectButtons: document.querySelectorAll("[data-disconnect-provider]"),
  clearPhotoImport: document.querySelector("#clearPhotoImport"),
  insertPhotoCard: document.querySelector("#insertPhotoCard"),
  photoImportSample: document.querySelector("#photoImportSample"),
  photoImportStatus: document.querySelector("#photoImportStatus"),
  pricingLabList: document.querySelector("#pricingLabList"),
  collectorReviewQueue: document.querySelector("#collectorReviewQueue"),
  trendCardSelect: document.querySelector("#trendCardSelect"),
  trendProviderSelect: document.querySelector("#trendProviderSelect"),
  refreshTrendData: document.querySelector("#refreshTrendData"),
  trendSourceStatus: document.querySelector("#trendSourceStatus"),
  portfolioSummary: document.querySelector("#portfolioSummary"),
  periodStart: document.querySelector("#periodStart"),
  periodEnd: document.querySelector("#periodEnd"),
  applyPeriod: document.querySelector("#applyPeriod"),
  clearPeriod: document.querySelector("#clearPeriod"),
  periodSummary: document.querySelector("#periodSummary"),
  portfolioInsights: document.querySelector("#portfolioInsights"),
  riskMatrix: document.querySelector("#riskMatrix"),
  collectionTimeline: document.querySelector("#collectionTimeline"),
  pwaChecklist: document.querySelector("#pwaChecklist"),
  goalAssistantList: document.querySelector("#goalAssistantList"),
  clearDealRoom: document.querySelector("#clearDealRoom"),
  dealRoomList: document.querySelector("#dealRoomList"),
  clearTradeAi: document.querySelector("#clearTradeAi"),
  generateTradeAi: document.querySelector("#generateTradeAi"),
  tradeAiEmpty: document.querySelector("#tradeAiEmpty"),
  tradeAiResults: document.querySelector("#tradeAiResults"),
  tradeAiMineSummary: document.querySelector("#tradeAiMineSummary"),
  tradeAiTheirsSummary: document.querySelector("#tradeAiTheirsSummary"),
  tradeAiMinePreview: document.querySelector("#tradeAiMinePreview"),
  tradeAiTheirsPreview: document.querySelector("#tradeAiTheirsPreview"),
  tradeAiCollectionSelect: document.querySelector("#tradeAiCollectionSelect"),
  addTradeAiCollection: document.querySelector("#addTradeAiCollection"),
  tradeAiAddStructured: document.querySelector("#tradeAiAddStructured"),
  tradeAiStructuredStatus: document.querySelector("#tradeAiStructuredStatus"),
  tradeAiResultSummary: document.querySelector("#tradeAiResultSummary"),
  sportsGuyStatus: document.querySelector("#sportsGuyStatus"),
  sportsGuyMessages: document.querySelector("#sportsGuyMessages"),
  sportsGuyForm: document.querySelector("#sportsGuyForm"),
  sportsGuyInput: document.querySelector("#sportsGuyInput"),
  sportsGuyCopyReply: document.querySelector("#sportsGuyCopyReply"),
  clearSportsGuy: document.querySelector("#clearSportsGuy"),
  sportsGuyActions: document.querySelectorAll("[data-sports-guy-action]"),
  sportsGuyRobotStage: document.querySelector("#sportsGuyRobotStage"),
  sportsGuyRobotCanvas: document.querySelector("#sportsGuyRobotCanvas"),
  sportsGuyRobotBubble: document.querySelector("#sportsGuyRobotBubble"),
  sportsGuyRobotWave: document.querySelector("#sportsGuyRobotWave"),
  sportsGuyVoiceToggle: document.querySelector("#sportsGuyVoiceToggle"),
  cardEntryTab: document.querySelector("#cardEntryTab"),
  tradeEntryTab: document.querySelector("#tradeEntryTab"),
  cardEntryPanel: document.querySelector("#cardEntryPanel"),
  tradeEntryPanel: document.querySelector("#tradeEntryPanel"),
  goalList: document.querySelector("#goalList"),
  goalEmpty: document.querySelector("#goalEmpty"),
  goalLibraryCount: document.querySelector("#goalLibraryCount"),
  expandAllGoals: document.querySelector("#expandAllGoals"),
  collapseAllGoals: document.querySelector("#collapseAllGoals"),
  toggleGoalForm: document.querySelector("#toggleGoalForm"),
  resetGoalForm: document.querySelector("#resetGoalForm"),
  alertList: document.querySelector("#alertList"),
  alertEmpty: document.querySelector("#alertEmpty"),
  alertCount: document.querySelector("#alertCount"),
  toggleAlerts: document.querySelector("#toggleAlerts"),
  accountMenu: document.querySelector("#accountMenu"),
  accountSettingsPanel: document.querySelector("#accountSettingsPanel"),
  accountSettingsMount: document.querySelector("#accountSettingsMount"),
  accountPageAvatar: document.querySelector("#accountPageAvatar"),
  accountPageDescription: document.querySelector("#accountPageDescription"),
  accountPageEmail: document.querySelector("#accountPageEmail"),
  accountPageLocation: document.querySelector("#accountPageLocation"),
  accountPageScore: document.querySelector("#accountPageScore"),
  currentPlanBadge: document.querySelector("#currentPlanBadge"),
  membershipStatusText: document.querySelector("#membershipStatusText"),
  aiTradeUsageText: document.querySelector("#aiTradeUsageText"),
  goalUsageText: document.querySelector("#goalUsageText"),
  aiTradeQuotaBadge: document.querySelector("#aiTradeQuotaBadge"),
  goalQuotaBadge: document.querySelector("#goalQuotaBadge"),
  membershipPlanPanel: document.querySelector("#membershipPlanPanel"),
  accountInitials: document.querySelector("#accountInitials"),
  accountMenuName: document.querySelector("#accountMenuName"),
  logoutButton: document.querySelector("#logoutButton"),
  memberAccessNotice: document.querySelector("#memberAccessNotice"),
  accountRoleBadge: document.querySelector("#accountRoleBadge"),
  accountName: document.querySelector("#accountName"),
  supabaseUrl: document.querySelector("#supabaseUrl"),
  supabaseAnonKey: document.querySelector("#supabaseAnonKey"),
  saveSupabaseSettings: document.querySelector("#saveSupabaseSettings"),
  supabaseStatus: document.querySelector("#supabaseStatus"),
  accountIdentitySettings: document.querySelector("#accountIdentitySettings"),
  refreshAuthIdentities: document.querySelector("#refreshAuthIdentities"),
  showLinkPhone: document.querySelector("#showLinkPhone"),
  socialAuthSetupNote: document.querySelector("#socialAuthSetupNote"),
  authMethodTabs: document.querySelectorAll("[data-auth-scope]"),
  authProviderButtons: document.querySelectorAll("[data-auth-provider]"),
  guestAuthControls: document.querySelectorAll("[data-guest-auth]"),
  linkedIdentityCards: document.querySelectorAll("[data-identity-provider]"),
  collectorScore: document.querySelector("#collectorScore"),
  badgeCount: document.querySelector("#badgeCount"),
  friendCount: document.querySelector("#friendCount"),
  followingCount: document.querySelector("#followingCount"),
  followerCount: document.querySelector("#followerCount"),
  badgeList: document.querySelector("#badgeList"),
  scoreBreakdown: document.querySelector("#scoreBreakdown"),
  privacySelect: document.querySelector("#privacySelect"),
  friendList: document.querySelector("#friendList"),
  publicCollectors: document.querySelector("#publicCollectors"),
  publicCollectorCount: document.querySelector("#publicCollectorCount"),
  profileViewer: document.querySelector("#profileViewer"),
  communityProfileViewer: document.querySelector("#communityProfileViewer"),
  communityFeedSearch: document.querySelector("#communityFeedSearch"),
  communityFeedFilter: document.querySelector("#communityFeedFilter"),
  communityCollectorSearch: document.querySelector("#communityCollectorSearch"),
  communityCollectorSort: document.querySelector("#communityCollectorSort"),
  communityCollectors: document.querySelector("#communityCollectors"),
  communityTradeSearch: document.querySelector("#communityTradeSearch"),
  communityTradeSort: document.querySelector("#communityTradeSort"),
  communityTradePosts: document.querySelector("#communityTradePosts"),
  purchaseRequests: document.querySelector("#purchaseRequests"),
  purchaseRequestCount: document.querySelector("#purchaseRequestCount"),
  clearCommunityPost: document.querySelector("#clearCommunityPost"),
  postMissingGoals: document.querySelector("#postMissingGoals"),
  communityFeed: document.querySelector("#communityFeed"),
  communityEmpty: document.querySelector("#communityEmpty"),
  chatList: document.querySelector("#chatList"),
  sidebar: document.querySelector(".asset-sidebar"),
  sidebarToggle: document.querySelector("#sidebarToggle"),
  landingAuthCard: document.querySelector("#landingAuthCard"),
  pageButtons: document.querySelectorAll("[data-page-button]"),
  panelToggles: document.querySelectorAll("[data-panel-toggle]"),
  workspacePanels: document.querySelectorAll("[data-panel]"),
  avatarPresetButtons: document.querySelectorAll("[data-avatar-preset]")
};

let cards = loadCards();
let trades = loadTrades();
let goals = loadGoals();
let account = loadAccount();
let scoreSettings = loadScoreSettings();
let social = loadSocial();
let communityPosts = loadCommunityPosts();
let diyCards = loadDIYCards();
let diyListings = loadDIYListings();
let purchaseRequests = loadPurchaseRequests();
let chats = loadChats();
let connectedAccounts = loadConnectedAccounts();
let sportsGuyMessages = loadSportsGuyMessages();
let latestTradeAiProposals = [];
let latestSportsGuyDraft = "";
let sportsGuyRobotRuntime = null;
let sportsGuyResponseTimer = 0;
let sportsGuyVoiceEnabled = localStorage.getItem(SPORTS_GUY_VOICE_KEY) === "true";
const marketplaceOAuthResult = new URLSearchParams(location.search).get("marketplace");
if (marketplaceOAuthResult === "connected") {
  connectedAccounts.ebay = { ...connectedAccounts.ebay, connected: true, connectedAt: new Date().toISOString() };
  saveConnectedAccounts();
}
let goalAssistant = loadGoalAssistant();
let dealRooms = loadDealRooms();
let imageSettings = loadImageSettings();
let periodSettings = loadPeriodSettings();
let supabaseSettings = loadSupabaseSettings();
let authUser = null;
let authProviderAvailability = { phone: null, wechat: null, qq: null };
let auctionSettings = loadAuctionSettings();
let presentationCloset = loadPresentationCloset();
let ledgerCloudReady = false;
let ledgerCloudHydrating = false;
let ledgerCloudSyncTimer = null;
let viewMode = "grid";
let collectionQuickFilter = "all";
let alertsExpanded = false;
let collectionExpanded = false;
let scanStream = null;
let playerScanMatches = [];
let playerScanOcrPromise = null;
let playerFaceApiPromise = null;
let playerFaceReferencePromise = null;
const playerScanImageSignatureCache = new Map();
let playerScanIdentity = null;
let pendingScannedCardImage = "";
let globalScannerReturnFocus = null;
let conditionStream = null;
let conditionImages = { front: "", back: "" };
let conditionLatestResult = null;
let photoImportImages = { front: "", back: "" };
let photoImportConditionResult = null;
let photoImportPopulationReference = null;
let photoImportAnalysisToken = 0;
let photoImportPopulationToken = 0;
let photoImportPopulationTimer = null;
let workspace = loadWorkspace();
let marketWorkspace = loadMarketWorkspace();
let focusWorkspaces = loadFocusWorkspaces();
let activePage = pageFromHash();
let pageTransitionToken = 0;
let selectedProfileId = "";
let draggedPanel = "";
let pointerDraggedPanel = "";
let currentGlobalSearchResults = [];
let deferredInstallPrompt = null;
let pendingPsaPopulation = null;
let diyPreviewObjectUrl = "";
let diyGeneratedPreview = { front: "", back: "" };
let diyPreviewTimer = null;
let diyPreviewToken = 0;
let marketplaceSalesCacheSource = "";
let marketplaceSalesCache = [];
const expandedGoalIds = new Set();
migrateCurrency();
cleanupTestArtifacts();
mergeSeedCards();
mergeVerifiedMarketData();
seedDefaultGoals();
mergeMojoRedOwnedCards();
mergeOpticInsertOwnedCards();
mergeRecentPurchases();
applyRecentPurchaseCorrections();
applyCurryImmaculateTrade();
applyJuly12Trades();
applyJuly14Activity();
syncAllGoalSlotsFromCards();
setupWorkspaceControls();
applyWorkspace();

function loadCards() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCards() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  scheduleSupabaseLedgerSync();
}

function loadTrades() {
  try {
    return JSON.parse(localStorage.getItem(TRADE_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveTrades() {
  localStorage.setItem(TRADE_STORAGE_KEY, JSON.stringify(trades));
  scheduleSupabaseLedgerSync();
}

function loadGoals() {
  try {
    return JSON.parse(localStorage.getItem(GOAL_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveGoals() {
  localStorage.setItem(GOAL_STORAGE_KEY, JSON.stringify(goals));
  scheduleSupabaseLedgerSync();
}

function loadSupabaseSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(SUPABASE_SETTINGS_KEY)) || {};
    return {
      url: text(saved.url) || DEFAULT_SUPABASE_URL,
      anonKey: text(saved.anonKey) || DEFAULT_SUPABASE_PUBLISHABLE_KEY,
      accessToken: text(saved.accessToken),
      refreshToken: text(saved.refreshToken),
      userId: text(saved.userId)
    };
  } catch {
    return { url: DEFAULT_SUPABASE_URL, anonKey: DEFAULT_SUPABASE_PUBLISHABLE_KEY, accessToken: "", refreshToken: "", userId: "" };
  }
}

function saveSupabaseSettings() {
  localStorage.setItem(SUPABASE_SETTINGS_KEY, JSON.stringify(supabaseSettings));
}

function loadAuctionSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(AUCTION_SETTINGS_KEY)) || {};
    return { endpoint: text(saved.endpoint), minValue: numeric(saved.minValue) || 10000, lastSyncAt: text(saved.lastSyncAt) };
  } catch {
    return { endpoint: "", minValue: 10000, lastSyncAt: "" };
  }
}

function saveAuctionSettings() {
  localStorage.setItem(AUCTION_SETTINGS_KEY, JSON.stringify(auctionSettings));
}

function normalizeAccount(saved) {
  if (!saved || typeof saved !== "object") return { name: "", email: "", phone: "", role: "guest" };
  const email = text(saved.email).toLowerCase();
  const phone = text(saved.phone);
  const hasIdentity = Boolean(email || phone || saved.role === "collector" || saved.role === "admin");
  const name = text(saved.name) || email || (phone ? `Collector ${phone.slice(-4)}` : "");
  if (!hasIdentity && !name) return { name: "", email: "", phone: "", role: "guest" };
  return {
    name,
    email,
    phone,
    role: saved.role === "admin" ? "admin" : hasIdentity ? "collector" : "guest",
    authProviders: Array.isArray(saved.authProviders) ? saved.authProviders.map(text).filter(Boolean) : [],
    avatar: text(saved.avatar),
    description: text(saved.description),
    age: text(saved.age),
    location: text(saved.location)
  };
}

function readStoredAccount(storage, key) {
  try {
    return normalizeAccount(JSON.parse(storage.getItem(key)));
  } catch {
    return { name: "", email: "", phone: "", role: "guest" };
  }
}

function loadAccount() {
  const persisted = readStoredAccount(localStorage, ACCOUNT_KEY);
  if (persisted.role !== "guest") {
    sessionStorage.setItem(ACCOUNT_SESSION_KEY, JSON.stringify(persisted));
    return persisted;
  }
  const session = readStoredAccount(sessionStorage, ACCOUNT_SESSION_KEY);
  if (session.role !== "guest") return session;
  return { name: "", email: "", phone: "", role: "guest" };
}

function saveAccount() {
  if (account.role === "guest" && !account.email && !account.phone) {
    localStorage.removeItem(ACCOUNT_KEY);
    sessionStorage.removeItem(ACCOUNT_SESSION_KEY);
    return;
  }
  const serialized = JSON.stringify(normalizeAccount(account));
  localStorage.setItem(ACCOUNT_KEY, serialized);
  sessionStorage.setItem(ACCOUNT_SESSION_KEY, serialized);
}

function accountStorageId() {
  return text(account.email).toLowerCase() || text(account.phone) || text(supabaseSettings?.userId) || "guest";
}

function loadPlanMap(key) {
  try {
    const saved = JSON.parse(localStorage.getItem(key)) || {};
    return saved && typeof saved === "object" && !Array.isArray(saved) ? saved : {};
  } catch {
    return {};
  }
}

function currentSubscription() {
  if (account.role === "admin") return { plan: "yearly", status: "active", admin: true };
  const saved = loadPlanMap(SUBSCRIPTION_KEY)[accountStorageId()] || {};
  const plan = ["monthly", "yearly"].includes(saved.plan) ? saved.plan : "regular";
  return { ...saved, plan, status: plan === "regular" ? "active" : text(saved.status) || "prototype" };
}

function isPremiumMember() {
  return account.role === "admin" || ["monthly", "yearly"].includes(currentSubscription().plan);
}

function planUsageRecord() {
  const month = new Date().toISOString().slice(0, 7);
  const map = loadPlanMap(PLAN_USAGE_KEY);
  const saved = map[accountStorageId()] || {};
  return saved.month === month ? { ...saved, month } : { month, aiTrades: 0 };
}

function savePlanUsage(record) {
  const map = loadPlanMap(PLAN_USAGE_KEY);
  map[accountStorageId()] = record;
  localStorage.setItem(PLAN_USAGE_KEY, JSON.stringify(map));
}

function recordPlanUsage(feature) {
  const usage = planUsageRecord();
  usage[feature] = Math.max(0, numeric(usage[feature])) + 1;
  savePlanUsage(usage);
  return usage[feature];
}

function planLimit(feature) {
  return isPremiumMember() ? Infinity : REGULAR_PLAN_LIMITS[feature] ?? Infinity;
}

function openMembershipPanel() {
  if (!isMember()) {
    showLandingAuth();
    return;
  }
  setActivePage("account");
  window.setTimeout(() => els.membershipPlanPanel?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
}

function requirePlanAccess(feature, currentCount = 0, action = "use this feature") {
  if (!requireMember(action)) return false;
  const limit = planLimit(feature);
  if (!Number.isFinite(limit) || numeric(currentCount) < limit) return true;
  const featureNames = {
    goals: "collecting goals",
    aiTrades: "AI trade generations this month",
    portfolios: "portfolio spaces",
    watchlist: "watchlist cards",
    savedViews: "saved views",
    displayUploads: "direct display uploads"
  };
  window.alert(`Regular accounts include ${limit} ${featureNames[feature] || feature}. Upgrade to Premium for unlimited access.`);
  openMembershipPanel();
  return false;
}

function selectSubscriptionPlan(plan) {
  if (!isMember()) {
    localStorage.setItem("card-ledger-pending-plan", plan);
    showLandingAuth();
    return;
  }
  const normalized = ["monthly", "yearly"].includes(plan) ? plan : "regular";
  const map = loadPlanMap(SUBSCRIPTION_KEY);
  const now = new Date();
  const renewal = new Date(now);
  if (normalized === "monthly") renewal.setMonth(renewal.getMonth() + 1);
  if (normalized === "yearly") renewal.setFullYear(renewal.getFullYear() + 1);
  map[accountStorageId()] = {
    plan: normalized,
    status: normalized === "regular" ? "active" : "prototype",
    startedAt: now.toISOString(),
    renewsAt: normalized === "regular" ? "" : renewal.toISOString()
  };
  localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(map));
  localStorage.removeItem("card-ledger-pending-plan");
  render();
  openMembershipPanel();
}

function activatePendingSubscription() {
  const pending = localStorage.getItem("card-ledger-pending-plan");
  if (["monthly", "yearly"].includes(pending) && isMember()) selectSubscriptionPlan(pending);
}

function loadUsers() {
  try {
    const saved = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const users = Array.isArray(saved) ? saved : [];
    return users.map((user) => ({
      name: text(user.name) || text(user.email) || "Collector",
      email: text(user.email).toLowerCase(),
      password: String(user.password || ""),
      role: user.role === "admin" ? "admin" : "collector"
    }));
  } catch {
    return [];
  }
}

function saveUsers(users) {
  const normalized = users.map((user) => ({
    name: text(user.name) || text(user.email) || "Collector",
    email: text(user.email).toLowerCase(),
    password: String(user.password || ""),
    role: user.role === "admin" ? "admin" : "collector"
  }));
  localStorage.setItem(USERS_KEY, JSON.stringify(normalized));
}

function loadScoreSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(SCORE_SETTINGS_KEY)) || {};
    return {
      perCard: Math.max(0, numeric(saved.perCard ?? DEFAULT_SCORE_SETTINGS.perCard)),
      perThousandValue: Math.max(0, numeric(saved.perThousandValue ?? DEFAULT_SCORE_SETTINGS.perThousandValue)),
      perCompleteGoal: Math.max(0, numeric(saved.perCompleteGoal ?? DEFAULT_SCORE_SETTINGS.perCompleteGoal)),
      perTrade: Math.max(0, numeric(saved.perTrade ?? DEFAULT_SCORE_SETTINGS.perTrade))
    };
  } catch {
    return { ...DEFAULT_SCORE_SETTINGS };
  }
}

function saveScoreSettings() {
  localStorage.setItem(SCORE_SETTINGS_KEY, JSON.stringify(scoreSettings));
}

function loadSocial() {
  try {
    const saved = JSON.parse(localStorage.getItem(SOCIAL_KEY)) || {};
    return {
      privacy: ["private", "friends", "public"].includes(saved.privacy) ? saved.privacy : "private",
      friends: Array.isArray(saved.friends) ? saved.friends.map(normalizeFriend).filter((friend) => friend.email) : []
    };
  } catch {
    return { privacy: "private", friends: [] };
  }
}

function saveSocial() {
  localStorage.setItem(SOCIAL_KEY, JSON.stringify(social));
}

function normalizeFriend(friend) {
  return {
    email: text(friend.email).toLowerCase(),
    name: text(friend.name) || text(friend.email) || "Collector",
    following: friend.following !== false,
    friend: Boolean(friend.friend)
  };
}

function loadCommunityPosts() {
  try {
    const saved = JSON.parse(localStorage.getItem(COMMUNITY_KEY)) || [];
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveCommunityPosts() {
  localStorage.setItem(COMMUNITY_KEY, JSON.stringify(communityPosts));
  scheduleSupabaseLedgerSync();
}

function loadDIYCards() {
  try {
    const saved = JSON.parse(localStorage.getItem(DIY_CARD_STORAGE_KEY)) || [];
    const savedCards = Array.isArray(saved) ? saved : [];
    const savedById = new Map(savedCards.map((card) => [card.id, card]));
    return [
      ...DIY_STARTER_CARDS.map((card) => ({ ...card, ...(savedById.get(card.id) || {}) })),
      ...savedCards.filter((card) => !DIY_STARTER_CARDS.some((starter) => starter.id === card.id))
    ];
  } catch {
    return DIY_STARTER_CARDS.map((card) => ({ ...card }));
  }
}

function saveDIYCards() {
  localStorage.setItem(DIY_CARD_STORAGE_KEY, JSON.stringify(diyCards));
  scheduleSupabaseLedgerSync();
}

function loadDIYListings() {
  try {
    const saved = JSON.parse(localStorage.getItem(DIY_LISTING_STORAGE_KEY)) || [];
    const savedListings = Array.isArray(saved) ? saved : [];
    const savedById = new Map(savedListings.map((listing) => [listing.id, listing]));
    return [
      ...DIY_STARTER_LISTINGS.map((listing) => ({ ...listing, ...(savedById.get(listing.id) || {}) })),
      ...savedListings.filter((listing) => !DIY_STARTER_LISTINGS.some((starter) => starter.id === listing.id))
    ];
  } catch {
    return DIY_STARTER_LISTINGS.map((listing) => ({ ...listing }));
  }
}

function saveDIYListings() {
  localStorage.setItem(DIY_LISTING_STORAGE_KEY, JSON.stringify(diyListings));
  scheduleSupabaseLedgerSync();
}

function loadPurchaseRequests() {
  try {
    const saved = JSON.parse(localStorage.getItem(PURCHASE_REQUEST_KEY)) || [];
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function savePurchaseRequests() {
  localStorage.setItem(PURCHASE_REQUEST_KEY, JSON.stringify(purchaseRequests));
}

function loadChats() {
  try {
    const saved = JSON.parse(localStorage.getItem(CHAT_KEY)) || [];
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveChats() {
  localStorage.setItem(CHAT_KEY, JSON.stringify(chats));
}

function sportsGuyStorageKey() {
  return `${SPORTS_GUY_CHAT_KEY}:${text(account?.email || account?.phone || "guest").toLowerCase()}`;
}

function loadSportsGuyMessages() {
  try {
    const saved = JSON.parse(localStorage.getItem(sportsGuyStorageKey())) || [];
    return Array.isArray(saved) ? saved.slice(-30) : [];
  } catch {
    return [];
  }
}

function saveSportsGuyMessages() {
  localStorage.setItem(sportsGuyStorageKey(), JSON.stringify(sportsGuyMessages.slice(-30)));
}

function loadConnectedAccounts() {
  try {
    const saved = JSON.parse(localStorage.getItem(CONNECTED_ACCOUNTS_KEY)) || {};
    return {
      ebay: {
        connected: Boolean(saved.ebay?.connected),
        connectedAt: text(saved.ebay?.connectedAt),
        lastSyncAt: text(saved.ebay?.lastSyncAt)
      },
      cardhobby: {
        connected: Boolean(saved.cardhobby?.connected),
        connectedAt: text(saved.cardhobby?.connectedAt),
        lastSyncAt: text(saved.cardhobby?.lastSyncAt)
      },
      importedPurchases: Array.isArray(saved.importedPurchases) ? saved.importedPurchases : []
    };
  } catch {
    return {
      ebay: { connected: false, connectedAt: "", lastSyncAt: "" },
      cardhobby: { connected: false, connectedAt: "", lastSyncAt: "" },
      importedPurchases: []
    };
  }
}

function saveConnectedAccounts() {
  localStorage.setItem(CONNECTED_ACCOUNTS_KEY, JSON.stringify(connectedAccounts));
}

function loadGoalAssistant() {
  try {
    const saved = JSON.parse(localStorage.getItem(GOAL_ASSISTANT_KEY)) || {};
    return saved && typeof saved === "object" ? saved : {};
  } catch {
    return {};
  }
}

function saveGoalAssistant() {
  localStorage.setItem(GOAL_ASSISTANT_KEY, JSON.stringify(goalAssistant));
}

function loadDealRooms() {
  try {
    const saved = JSON.parse(localStorage.getItem(DEAL_ROOMS_KEY)) || [];
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveDealRooms() {
  localStorage.setItem(DEAL_ROOMS_KEY, JSON.stringify(dealRooms));
  scheduleSupabaseLedgerSync();
}

function loadImageSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(IMAGE_SETTINGS_KEY)) || {};
    return {
      endpoint: text(saved.endpoint),
      auto: saved.auto !== false
    };
  } catch {
    return { endpoint: "", auto: true };
  }
}

function saveImageSettings() {
  localStorage.setItem(IMAGE_SETTINGS_KEY, JSON.stringify(imageSettings));
}

function loadPeriodSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(PERIOD_SETTINGS_KEY)) || {};
    return {
      start: text(saved.start),
      end: text(saved.end)
    };
  } catch {
    return { start: "", end: "" };
  }
}

function savePeriodSettings() {
  localStorage.setItem(PERIOD_SETTINGS_KEY, JSON.stringify(periodSettings));
}

function loadMarketWorkspace() {
  try {
    const saved = JSON.parse(localStorage.getItem(MARKET_WORKSPACE_KEY)) || {};
    return {
      view: ["values", "sales", "split"].includes(saved.view) ? saved.view : "values",
      contextExpanded: Boolean(saved.contextExpanded)
    };
  } catch {
    return { view: "values", contextExpanded: false };
  }
}

function saveMarketWorkspace() {
  localStorage.setItem(MARKET_WORKSPACE_KEY, JSON.stringify(marketWorkspace));
}

function loadFocusWorkspaces() {
  try {
    const saved = JSON.parse(localStorage.getItem(FOCUS_WORKSPACE_KEY)) || {};
    return {
      collection: ["browse", "add", "imports", "photos", "people", "all"].includes(saved.collection) ? saved.collection : "browse",
      goals: ["overview", "missing", "alerts", "all"].includes(saved.goals) ? saved.goals : "overview",
      trade: ["builder", "deals", "history", "all"].includes(saved.trade) ? saved.trade : "builder"
    };
  } catch {
    return { collection: "browse", goals: "overview", trade: "builder" };
  }
}

function saveFocusWorkspaces() {
  localStorage.setItem(FOCUS_WORKSPACE_KEY, JSON.stringify(focusWorkspaces));
}

function loadWorkspace() {
  try {
    const saved = JSON.parse(localStorage.getItem(WORKSPACE_KEY)) || {};
    const defaultVisible = { ...Object.fromEntries(PANEL_ORDER.map((panel) => [panel, true])), scan: false };
    return {
      visible: { ...defaultVisible, ...(saved.visible || {}), scan: false },
      order: Array.isArray(saved.order) ? [...new Set(saved.order.filter((panel) => PANEL_ORDER.includes(panel)))].concat(PANEL_ORDER.filter((panel) => !saved.order.includes(panel))) : [...PANEL_ORDER]
    };
  } catch {
    return {
      visible: { ...Object.fromEntries(PANEL_ORDER.map((panel) => [panel, true])), scan: false },
      order: [...PANEL_ORDER]
    };
  }
}

function saveWorkspace() {
  localStorage.setItem(WORKSPACE_KEY, JSON.stringify(workspace));
}

function cleanupTestArtifacts() {
  if (localStorage.getItem(CLEANUP_KEY) === "done") return;
  cards = cards.filter((card) => card.player !== "Test Checklist Player");
  saveCards();
  localStorage.setItem(CLEANUP_KEY, "done");
}

function money(value) {
  const amount = Number(value) || 0;
  const formatted = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: value % 1 ? 2 : 0
  }).format(amount);
  return `RMB ${formatted}`;
}

function usdEquivalent(value) {
  const amount = (Number(value) || 0) / USD_TO_RMB_RATE;
  return `USD ${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: amount % 1 ? 2 : 0
  }).format(amount)}`;
}

function renderMoney(target, value) {
  target.textContent = "";
  const primary = document.createElement("span");
  const secondary = document.createElement("small");
  primary.className = "money-primary";
  secondary.className = "money-secondary";
  primary.textContent = money(value);
  secondary.textContent = usdEquivalent(value);
  target.append(primary, secondary);
}

function moneyMarkup(value) {
  return `<span class="money-primary">${escapeHtml(money(value))}</span><small class="money-secondary">${escapeHtml(
    usdEquivalent(value)
  )}</small>`;
}

function normalizedSalesIdentity(value) {
  return text(value).toLocaleLowerCase().normalize("NFKC").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

function savedMarketplaceSales() {
  const source = localStorage.getItem(MARKETPLACE_SALES_KEY) || "[]";
  if (source === marketplaceSalesCacheSource) return marketplaceSalesCache;
  marketplaceSalesCacheSource = source;
  try {
    const parsed = JSON.parse(source);
    marketplaceSalesCache = Array.isArray(parsed) ? parsed : [];
  } catch {
    marketplaceSalesCache = [];
  }
  return marketplaceSalesCache;
}

function salesRecordMatchesCard(record, card) {
  if (text(record.transaction_status) && text(record.transaction_status) !== "completed") return false;
  const haystack = normalizedSalesIdentity([record.title, record.year, record.brand, record.set_name, record.player, record.card_type, record.parallel, record.card_number, record.grade].join(" "));
  const fieldMatch = (value) => {
    const terms = normalizedSalesIdentity(value).split(/\s+/).filter(Boolean);
    return !terms.length || terms.every((term) => haystack.includes(term));
  };
  const playerMatch = fieldMatch(card.player);
  const setMatch = fieldMatch(card.setName);
  const yearMatch = fieldMatch(card.year);
  const numberMatch = fieldMatch(card.cardNumber);
  const parallelMatch = fieldMatch(card.parallel);
  const gradeMatch = fieldMatch(card.grade);
  const gradedCard = /\b(?:psa|bgs|sgc|cgc)\b/i.test(text(card.grade));
  const gradedSale = /\b(?:psa|bgs|sgc|cgc)\s*\d/i.test([record.title, record.grade].join(" "));
  if (card.player && !playerMatch) return false;
  if (!card.player && !(setMatch && numberMatch)) return false;
  if (card.year && !yearMatch) return false;
  if (card.cardNumber && !numberMatch) return false;
  if (card.parallel && !/^(?:base|n\/a|none)$/i.test(text(card.parallel)) && !parallelMatch) return false;
  if (gradedCard && !gradeMatch) return false;
  if (!gradedCard && gradedSale) return false;
  const supportingFields = [card.setName && setMatch, card.year && yearMatch, card.cardNumber && numberMatch, card.parallel && parallelMatch].filter(Boolean).length;
  return supportingFields >= (card.player ? 2 : 3);
}

function marketplaceSaleValueRmb(record) {
  const value = numeric(record.sale_price);
  const currency = text(record.currency).toUpperCase();
  if (currency === "CNY" || currency === "RMB") return value;
  if (currency === "USD") return value * USD_TO_RMB_RATE;
  return 0;
}

function marketSourceLabel(source) {
  return ({
    ebay: "eBay",
    cardhobby: "CardHobby",
    cardladder: "Card Ladder",
    market_movers: "Market Movers",
    goldin: "Goldin",
    fanatics: "Fanatics",
    alt: "ALT"
  })[text(source).toLowerCase()] || text(source);
}

function marketplaceSalesForCard(card) {
  return savedMarketplaceSales()
    .filter((record) => salesRecordMatchesCard(record, card))
    .map((record) => ({
      date: text(record.sold_at).slice(0, 10),
      value: marketplaceSaleValueRmb(record),
      source: text(record.provider).toLowerCase(),
      label: `${marketSourceLabel(record.provider)} ${record.verification_status === "provider_verified" ? "provider-verified" : "export-imported"} completed sale`
    }))
    .filter((sale) => sale.date && sale.value > 0);
}

function sortedSales(card) {
  const combined = [...(Array.isArray(card.marketSales) ? card.marketSales : []), ...marketplaceSalesForCard(card)];
  const seen = new Set();
  return combined
    .map((sale, index) => ({
      date: text(sale.date),
      value: numeric(sale.value),
      label: text(sale.label),
      source: MARKET_SOURCES.includes(text(sale.source).toLowerCase()) ? text(sale.source).toLowerCase() : index % 2 === 0 ? "ebay" : "cardhobby"
    }))
    .filter((sale) => {
      if (sale.value <= 0) return false;
      const key = `${sale.source}|${sale.date}|${sale.value.toFixed(2)}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => new Date(`${a.date || "1900-01-01"}T00:00:00`) - new Date(`${b.date || "1900-01-01"}T00:00:00`));
}

function salesBySource(card, source) {
  return sortedSales(card).filter((sale) => sale.source === source);
}

function salesInPastYear(card) {
  const sales = sortedSales(card);
  if (!sales.length) return [];
  const latestDate = new Date(`${sales.at(-1).date || new Date().toISOString().slice(0, 10)}T00:00:00`);
  const cutoff = new Date(latestDate);
  cutoff.setFullYear(cutoff.getFullYear() - 1);
  return sales.filter((sale) => !sale.date || new Date(`${sale.date}T00:00:00`) >= cutoff);
}

function estimatedCardValue(card) {
  const recentSales = sortedSales(card).slice(-ESTIMATE_SALE_COUNT);
  if (!recentSales.length) return numeric(card.value);
  return recentSales.reduce((sum, sale) => sum + sale.value, 0) / recentSales.length;
}

function estimatedValueBySource(card, source) {
  const recentSales = salesBySource(card, source).slice(-ESTIMATE_SALE_COUNT);
  if (!recentSales.length) return 0;
  return recentSales.reduce((sum, sale) => sum + sale.value, 0) / recentSales.length;
}

function valuationMethod(card) {
  const recentSales = sortedSales(card).slice(-ESTIMATE_SALE_COUNT);
  if (!recentSales.length) return "Manual estimate";
  return `Average of latest ${recentSales.length} sale${recentSales.length === 1 ? "" : "s"}`;
}

function dateLabel(value) {
  if (!value) return "No date";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(`${value}T00:00:00`));
}

function sparkline(points) {
  const values = points.map((point) => numeric(point.value));
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const width = 190;
  const height = 58;
  const coordinates = points.map((point, index) => {
    const x = points.length === 1 ? width / 2 : (index / (points.length - 1)) * width;
    const y = height - ((numeric(point.value) - min) / range) * (height - 10) - 5;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const last = coordinates.at(-1).split(",");
  return `
    <svg class="sparkline" viewBox="0 0 ${width} ${height}" role="img" aria-label="Recent sale chart">
      <polyline points="${coordinates.join(" ")}"></polyline>
      <circle cx="${last[0]}" cy="${last[1]}" r="3.5"></circle>
    </svg>
  `;
}

function dualSourceChart(card) {
  const series = MARKET_SOURCES.map((source) => ({ source, points: salesInPastYear({ ...card, marketSales: salesBySource(card, source) }) }));
  const allPoints = series.flatMap((item) => item.points);
  const fallbackDate = card.updatedAt?.slice(0, 10) || new Date().toISOString().slice(0, 10);
  const drawableSeries = allPoints.length
    ? series
    : [{ source: "ebay", points: [{ date: fallbackDate, value: numeric(card.value) }] }, { source: "cardhobby", points: [] }];
  const drawablePoints = drawableSeries.flatMap((item) => item.points);
  const legendSources = drawableSeries.filter((item) => item.points.length).map((item) => item.source);
  const values = drawablePoints.map((point) => numeric(point.value));
  const dates = drawablePoints.map((point) => new Date(`${point.date || fallbackDate}T00:00:00`).getTime());
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const minDate = Math.min(...dates);
  const maxDate = Math.max(...dates);
  const valueRange = maxValue - minValue || 1;
  const dateRange = maxDate - minDate || 1;
  const width = 260;
  const height = 86;
  const coordsFor = (point) => {
    const date = new Date(`${point.date || fallbackDate}T00:00:00`).getTime();
    const x = ((date - minDate) / dateRange) * (width - 18) + 9;
    const y = height - ((numeric(point.value) - minValue) / valueRange) * (height - 18) - 9;
    return { x, y };
  };
  const pathFor = (points) => points.map((point) => {
    const { x, y } = coordsFor(point);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return `
    <div class="chart-shell">
      <svg class="source-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="Multi-source price trend">
        ${drawableSeries
          .map((item) =>
            item.points.length
              ? `<polyline class="source-line ${item.source}" points="${pathFor(item.points)}"></polyline>${item.points
                  .map((point) => {
                    const { x, y } = coordsFor(point);
                    return `<circle class="source-dot ${item.source}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" data-source="${escapeHtml(item.source)}" data-date="${escapeHtml(point.date || fallbackDate)}" data-value="${numeric(point.value)}" data-label="${escapeHtml(point.label || "")}"></circle>`;
                  })
                  .join("")}`
              : ""
          )
          .join("")}
      </svg>
      <div class="chart-tooltip hidden"></div>
    </div>
    <div class="source-legend">
      ${legendSources.map((source) => `<span class="${escapeHtml(source)}">${escapeHtml(marketSourceLabel(source))}</span>`).join("")}
    </div>
  `;
}

function trendSearchQuery(card) {
  return [card.year, card.brand, card.setName, card.player, card.type, card.parallel, card.cardNumber && `#${card.cardNumber}`]
    .filter(Boolean)
    .join(" ");
}

function externalTrendPanel(card) {
  const query = trendSearchQuery(card);
  const encoded = encodeURIComponent(query);
  const cardLadderUrl = `https://www.cardladder.com/search?q=${encoded}`;
  const marketMoversUrl = `https://www.sportscardinvestor.com/cards?search=${encoded}`;
  const getGotCardUrl = "https://apps.apple.com/sg/app/getgot-card-scan-price-track/id6749262431";
  const hobbyCardIndexUrl = hobbyCardIndexSearchUrl(query);
  return `
    <div class="external-trend-panel">
      <div class="trend-crawl-status">
        <strong>External trend sources</strong>
        <small>Card Ladder and Market Movers trends enter Card Ledger through licensed feeds or your own exports. Their published terms prohibit direct automated harvesting, so the app keeps source links and import provenance visible.</small>
      </div>
      <div class="external-trend-links">
        <a href="${escapeHtml(hobbyCardIndexUrl)}" target="_blank" rel="noreferrer">Try HobbyCardIndex</a>
        <a href="${escapeHtml(cardLadderUrl)}" target="_blank" rel="noreferrer">Try Card Ladder</a>
        <a href="${escapeHtml(marketMoversUrl)}" target="_blank" rel="noreferrer">Try Market Movers</a>
        <a href="${escapeHtml(getGotCardUrl)}" target="_blank" rel="noreferrer">Open GetGot</a>
        <a href="${escapeHtml(goldinSearchUrl(query))}" target="_blank" rel="noreferrer">Goldin</a>
        <a href="${escapeHtml(fanaticsCollectSearchUrl(query))}" target="_blank" rel="noreferrer">Fanatics</a>
      </div>
      <details class="local-trend-fallback">
        <summary>Local sales fallback</summary>
        ${dualSourceChart(card)}
      </details>
    </div>
  `;
}

function migrateCurrency() {
  const savedCurrency = localStorage.getItem(CURRENCY_KEY);
  if (savedCurrency === "RMB" || savedCurrency === "CNY") {
    localStorage.setItem(CURRENCY_KEY, "RMB");
    return;
  }
  cards = cards.map((card) => ({
    ...card,
    paid: Math.round(numeric(card.paid) * USD_TO_RMB_RATE * 100) / 100,
    value: Math.round(numeric(card.value) * USD_TO_RMB_RATE * 100) / 100
  }));
  saveCards();
  localStorage.setItem(CURRENCY_KEY, "RMB");
}

function mergeSeedCards() {
  if (localStorage.getItem(SEED_KEY) === "done") return;
  const seededIds = new Set(SEEDED_CARDS.flatMap((card) => [card.id, ...(card.aliases || [])]));
  cards = cards.filter((card) => !seededIds.has(card.id));
  cards = SEEDED_CARDS.map(({ aliases, ...card }) => card).concat(cards);
  saveCards();
  localStorage.setItem(SEED_KEY, "done");
}

function mergeVerifiedMarketData() {
  if (localStorage.getItem(VERIFIED_MARKET_DATA_KEY) === "done") return;
  let changed = false;
  cards = cards.map((card) => {
    const verifiedSales = VERIFIED_MARKET_DATA[card.id];
    if (!verifiedSales) return card;
    changed = true;
    return { ...card, marketSales: verifiedSales };
  });
  if (changed) saveCards();
  localStorage.setItem(VERIFIED_MARKET_DATA_KEY, "done");
}

function seedDefaultGoals() {
  if (localStorage.getItem(GOAL_SEED_KEY) === "done") return;
  const now = new Date().toISOString();
  const seededGoals = [
    {
      id: "goal-curry-prizm-silver-2012-2025",
      createdAt: now,
      title: "Stephen Curry Prizm Silver Run",
      type: "year",
      player: "Stephen Curry",
      setName: "Panini Prizm",
      parallel: "Silver",
      season: "",
      startYear: 2012,
      endYear: 2025,
      startNumber: 0,
      endNumber: 0,
      notes: "Track Prizm Stephen Curry Silver from 2012 to 2025.",
      slots: buildYearRange(2012, 2025).reduce((slots, year) => {
        slots[year] = { owned: false, image: "" };
        return slots;
      }, {})
    },
    {
      id: "goal-2018-19-donruss-optic-mojo-red-88-1-200",
      createdAt: now,
      title: "2018-19 Donruss Optic Mojo Red /88 Checklist",
      type: "number",
      player: "",
      setName: "Donruss Optic",
      parallel: "mojo red /88",
      season: "2018-19",
      startYear: 0,
      endYear: 0,
      startNumber: 1,
      endNumber: 200,
      notes: "Track the full 2018-19 Donruss Optic Mojo Red /88 checklist from card #1 to #200.",
      slots: buildNumberRange(1, 200).reduce((slots, slotId) => {
        slots[slotId] = { owned: false, image: "" };
        return slots;
      }, {})
    },
    ...buildOpticInsertGoals(now)
  ];
  const existingGoalIds = new Set(goals.map((goal) => goal.id));
  seededGoals.forEach((seededGoal) => {
    const existing = goals.find((goal) => goal.id === seededGoal.id);
    if (!existing) return;
    const mergedSlots = { ...seededGoal.slots };
    Object.entries(existing.slots || {}).forEach(([slotId, slot]) => {
      mergedSlots[slotId] = { ...(mergedSlots[slotId] || {}), ...slot };
    });
    Object.assign(existing, { ...seededGoal, createdAt: existing.createdAt || seededGoal.createdAt, slots: mergedSlots });
  });
  goals.unshift(...seededGoals.filter((goal) => !existingGoalIds.has(goal.id)));
  saveGoals();
  syncAllGoalSlotsFromCards();
  localStorage.setItem(GOAL_SEED_KEY, "done");
}

function buildSlotsFromChecklist(checklist) {
  return checklist.reduce((slots, [slotId, player]) => {
    slots[slotId] = { owned: false, image: "", player };
    return slots;
  }, {});
}

function buildOpticInsertGoals(now) {
  return Object.entries(OPTIC_INSERT_CHECKLISTS).map(([name, checklist]) => ({
    id: `goal-2018-19-donruss-optic-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-red-99`,
    createdAt: now,
    title: `2018-19 Donruss Optic ${name} Red /99`,
    type: "number",
    player: "",
    setName: `${OPTIC_GOAL_SET} ${name}`,
    parallel: INSERT_RED_PARALLEL,
    season: "2018-19",
    startYear: 0,
    endYear: 0,
    startNumber: 1,
    endNumber: checklist.length,
    notes: `Track the 2018-19 Donruss Optic ${name} Red /99 checklist.`,
    slots: buildSlotsFromChecklist(checklist)
  }));
}

function opticMojoRedEstimate(slotId) {
  const player = DONRUSS_OPTIC_2018_PLAYERS[slotId] || "";
  const tiers = {
    "Luka Doncic": 6800,
    "Trae Young": 1800,
    "Shai Gilgeous-Alexander": 2200,
    "Jalen Brunson": 700,
    "LeBron James": 1200,
    "Stephen Curry": 850,
    "Kevin Durant": 420,
    "Kobe Bryant": 650,
    "Giannis Antetokounmpo": 520,
    "Jayson Tatum": 360,
    "Donovan Mitchell": 260,
    "Nikola Jokic": 340,
    "James Harden": 240,
    "Kyrie Irving": 220,
    "Kawhi Leonard": 220,
    "Devin Booker": 240,
    "Deandre Ayton": 300,
    "Michael Porter Jr.": 260,
    "Jaren Jackson Jr.": 240
  };
  return tiers[player] || (Number.parseInt(slotId.replace("#", ""), 10) >= 151 ? 80 : 45);
}

function insertRedEstimate(player) {
  const tiers = {
    "Kobe Bryant": 520,
    "LeBron James": 520,
    "Stephen Curry": 360,
    "Kevin Durant": 220,
    "Giannis Antetokounmpo": 260,
    "Larry Bird": 220,
    "Magic Johnson": 220,
    "Allen Iverson": 180,
    "Dwyane Wade": 180,
    "Reggie Miller": 160,
    "James Harden": 140,
    "Jayson Tatum": 140,
    "Luka Doncic": 450,
    "Trae Young": 180,
    "Shai Gilgeous-Alexander": 220
  };
  return tiers[player] || 55;
}

function goalSlotEstimate(goal, slotId) {
  if (isDonrussOptic2018MojoGoal(goal)) return opticMojoRedEstimate(slotId);
  if (isDonrussOptic2018InsertGoal(goal)) return insertRedEstimate(goalSlotPlayer(goal, slotId));
  return 0;
}

function mergeMojoRedOwnedCards() {
  if (localStorage.getItem(MOJO_RED_COLLECTION_KEY) === "done") return;
  const existingIds = new Set(cards.map((card) => card.id));
  const now = new Date().toISOString();
  const ownedCards = Object.entries(DONRUSS_OPTIC_2018_PLAYERS)
    .filter(([slotId]) => !MOJO_RED_MISSING_NUMBERS.has(Number.parseInt(slotId.replace("#", ""), 10)))
    .map(([slotId, player]) => {
      const number = slotId.replace("#", "");
      return {
        id: `owned-2018-19-donruss-optic-mojo-red-88-${number}`,
        createdAt: now,
        updatedAt: now,
        player,
        sport: "Basketball",
        year: "2018-19",
        setName: OPTIC_GOAL_SET,
        cardNumber: number,
        parallel: MOJO_RED_PARALLEL,
        condition: "Raw",
        grade: "",
        quantity: 1,
        paid: 0,
        value: opticMojoRedEstimate(slotId),
        location: "",
        notes: "Loaded from current 2018-19 Donruss Optic Mojo Red /88 collection. User supplied missing-number list; this card is one of the remaining owned numbers."
      };
    })
    .filter((card) => !existingIds.has(card.id));
  cards = ownedCards.concat(cards);
  saveCards();
  localStorage.setItem(MOJO_RED_COLLECTION_KEY, "done");
}

function mergeOpticInsertOwnedCards() {
  if (localStorage.getItem(OPTIC_INSERT_COLLECTION_KEY) === "done") return;
  const existingIds = new Set(cards.map((card) => card.id));
  const now = new Date().toISOString();
  const ownedCards = Object.entries(OPTIC_INSERT_CHECKLISTS).flatMap(([name, checklist]) => {
    const missingNumbers = OPTIC_INSERT_MISSING_NUMBERS[name] || new Set();
    return checklist
      .filter(([slotId]) => !missingNumbers.has(Number.parseInt(slotId.replace("#", ""), 10)))
      .map(([slotId, player]) => {
        const number = slotId.replace("#", "");
        const normalizedName = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        return {
          id: `owned-2018-19-donruss-optic-${normalizedName}-red-99-${number}`,
          createdAt: now,
          updatedAt: now,
          player,
          sport: "Basketball",
          year: "2018-19",
          setName: `${OPTIC_GOAL_SET} ${name}`,
          type: "Insert",
          cardNumber: number,
          parallel: INSERT_RED_PARALLEL,
          condition: "Raw",
          grade: "",
          quantity: 1,
          paid: 0,
          value: insertRedEstimate(player),
          location: "",
          notes: `Loaded from current 2018-19 Donruss Optic ${name} Red /99 collection. User supplied missing-number list; this card is one of the remaining owned numbers.`
        };
      });
  }).filter((card) => !existingIds.has(card.id));
  if (ownedCards.length) {
    cards = ownedCards.concat(cards);
    saveCards();
  }
  localStorage.setItem(OPTIC_INSERT_COLLECTION_KEY, "done");
}

function mergeRecentPurchases() {
  if (localStorage.getItem(RECENT_PURCHASES_KEY) === "done") return;
  const existingIds = new Set(cards.map((card) => card.id));
  const purchaseDate = "2026-07-09T12:00:00.000+08:00";
  const purchases = JULY_9_PURCHASE_CARDS.filter((card) => !existingIds.has(card.id)).map((card) => ({
    createdAt: purchaseDate,
    updatedAt: purchaseDate,
    ...card
  }));
  if (purchases.length) {
    cards = purchases.concat(cards);
    saveCards();
  }
  localStorage.setItem(RECENT_PURCHASES_KEY, "done");
}

function applyRecentPurchaseCorrections() {
  if (localStorage.getItem(RECENT_PURCHASES_CORRECTION_KEY) === "done") return;
  const corrections = {
    "purchase-2026-07-09-lamine-yamal-donruss-spain-rookie-base": {
      value: 50,
      notes: "Purchased July 9, 2026. Two copies bought for RMB 10 each. User-updated estimate on July 10, 2026: RMB 50 each."
    },
    "purchase-2026-07-09-derrick-white-mosaic-chinese-prizm-8": {
      value: 130,
      notes: "Purchased July 9, 2026. User-updated estimate on July 10, 2026: RMB 130."
    },
    "purchase-2026-07-09-neuer-select-euro-tiger-stripe-mezzanine": {
      paid: 200,
      value: 200,
      notes: "Purchased July 9, 2026. Paid price updated July 10, 2026: RMB 200. Est. value kept at paid price until an exact sold comp is added."
    }
  };
  let changed = false;
  cards = cards.map((card) => {
    const correction = corrections[card.id];
    if (!correction) return card;
    changed = true;
    return {
      ...card,
      ...correction,
      updatedAt: new Date().toISOString()
    };
  });
  if (changed) saveCards();
  localStorage.setItem(RECENT_PURCHASES_CORRECTION_KEY, "done");
}

function lineFromTradeCard(card) {
  return [card.year, card.brand, card.setName, card.player, card.type, card.parallel, card.cardNumber].filter(Boolean).join(" | ");
}

function tradeSnapshot(card, fallbackValue = 0) {
  const estimate = estimatedCardValue(card) || numeric(card.value) || fallbackValue;
  return {
    ...card,
    quantity: 1,
    tradeEstimate: estimate
  };
}

function takeTradeCard(match, fallbackCard) {
  const index = cards.findIndex(match);
  if (index < 0) return { snapshot: tradeSnapshot(fallbackCard, fallbackCard.value), found: false };
  const existing = cards[index];
  const snapshot = tradeSnapshot(existing, existing.value);
  if (quantity(existing.quantity) > 1) {
    cards[index] = { ...existing, quantity: quantity(existing.quantity) - 1, updatedAt: new Date().toISOString() };
  } else {
    cards.splice(index, 1);
  }
  return { snapshot, found: true };
}

function applyCurryImmaculateTrade() {
  if (localStorage.getItem(CURRY_IMMACULATE_TRADE_KEY) === "done") return;
  const now = new Date().toISOString();
  const tradeDate = "2026-07-11";
  const outgoingFallbacks = [
    {
      id: "trade-out-2026-07-11-wembanyama-prizm-base-136",
      createdAt: now,
      updatedAt: now,
      player: "Victor Wembanyama",
      sport: "Basketball",
      year: "2023-24",
      setName: "Panini Prizm",
      type: "Rookie",
      cardNumber: "136",
      parallel: "Base",
      condition: "Raw",
      grade: "",
      quantity: 1,
      paid: 350,
      value: 512,
      marketSales: [
        { date: "2026-07-03", value: 384.2, source: "ebay", label: "SportsCardsPro/eBay raw sale: USD 56.50" },
        { date: "2026-07-05", value: 489.6, source: "ebay", label: "SportsCardsPro/eBay raw sale: USD 72.00" },
        { date: "2026-07-05", value: 509.93, source: "ebay", label: "SportsCardsPro/eBay raw sale: USD 74.99" }
      ],
      location: "",
      notes: "Traded away on July 11, 2026. Estimate uses recent raw Wembanyama Prizm #136 sales."
    },
    {
      id: "trade-out-2026-07-11-chris-paul-contenders-suns-passport",
      createdAt: now,
      updatedAt: now,
      player: "Chris Paul",
      sport: "Basketball",
      year: "2020-21",
      setName: "Panini Contenders",
      type: "Suns Passport",
      cardNumber: "",
      parallel: "Base",
      condition: "Raw",
      grade: "",
      quantity: 1,
      paid: 0,
      value: 10,
      location: "",
      notes: "Traded away on July 11, 2026. Low-confidence estimate because exact recent sold comps were not available; checklist/source data confirms 2020-21 Contenders Chris Paul Suns cards."
    },
    {
      id: "trade-out-2026-07-11-curry-totally-certified-excellence-299",
      createdAt: now,
      updatedAt: now,
      player: "Stephen Curry",
      sport: "Basketball",
      year: "2014-15",
      setName: "Panini Totally Certified",
      type: "Certified Excellence",
      cardNumber: "10",
      parallel: "/299",
      condition: "Raw",
      grade: "",
      quantity: 1,
      paid: 0,
      value: 307,
      marketSales: [
        { date: "2026-07-11", value: 306.61, source: "ebay", label: "COMC/raw market reference: USD 45.09" }
      ],
      location: "",
      notes: "Traded away on July 11, 2026. Raw estimate uses available market reference for 2014-15 Totally Certified Excellence #10 /299."
    }
  ];
  const outgoingResults = [
    takeTradeCard(
      (card) =>
        card.id === "purchase-2026-07-09-wembanyama-prizm-rookie-base" ||
        (card.player === "Victor Wembanyama" && /prizm/i.test(card.setName) && /base|rookie/i.test(`${card.parallel} ${card.type}`) && card.cardNumber === "136"),
      outgoingFallbacks[0]
    ),
    takeTradeCard(
      (card) => /chris paul/i.test(card.player) && /contenders/i.test(card.setName) && /passport|suns/i.test(`${card.type} ${card.parallel} ${card.notes}`),
      outgoingFallbacks[1]
    ),
    takeTradeCard(
      (card) => /stephen curry/i.test(card.player) && /totally certified/i.test(card.setName) && /certified excellence/i.test(`${card.type} ${card.parallel} ${card.notes}`),
      outgoingFallbacks[2]
    )
  ];
  const incomingCard = {
    id: "trade-in-2026-07-11-curry-immaculate-standout-memorabilia-99",
    createdAt: now,
    updatedAt: now,
    player: "Stephen Curry",
    sport: "Basketball",
    year: "2021-22",
    setName: "Panini Immaculate Collection",
    type: "Standout Memorabilia Jersey",
    cardNumber: "3",
    parallel: "/99",
    condition: "Raw",
    grade: "",
    quantity: 1,
    paid: 0,
    value: 2380,
    marketSales: [
      { date: "2026-07-11", value: 2380, source: "ebay", label: "SportsCardsPro/eBay exact Standout GU Patch Jersey /99 reference: USD 350" },
      { date: "2026-05-07", value: 1326, source: "ebay", label: "Sports Card Investor comparable Remarkable Jerseys /99 sale: USD 195" },
      { date: "2026-07-11", value: 2100, source: "cardhobby", label: "CardHobby placeholder until connected-account sold comp is added" }
    ],
    location: "",
    notes: "Received by trade on July 11, 2026 for Wembanyama Prizm rookie base, 2020-21 Contenders Chris Paul Suns Passport, and 2014-15 Totally Certified Curry Certified Excellence /299."
  };
  cards = cards.filter((card) => card.id !== incomingCard.id);
  cards.unshift(incomingCard);
  const outgoingCards = outgoingResults.map((result) => result.snapshot);
  const outgoingValue = outgoingCards.reduce((sum, card) => sum + numeric(card.tradeEstimate || estimatedCardValue(card)), 0);
  const incomingValue = estimatedCardValue(incomingCard);
  const notFound = outgoingResults
    .map((result, index) => (result.found ? "" : lineFromTradeCard(outgoingFallbacks[index])))
    .filter(Boolean);
  trades = trades.filter((trade) => trade.id !== CURRY_IMMACULATE_TRADE_ID);
  trades.unshift({
    id: CURRY_IMMACULATE_TRADE_ID,
    createdAt: now,
    date: tradeDate,
    counterparty: "Completed trade",
    outgoing: outgoingCards.map((card) => `${lineFromTradeCard(card)} (${money(numeric(card.tradeEstimate || estimatedCardValue(card)))})`).join("\n"),
    incoming: `${lineFromTradeCard(incomingCard)} (${money(incomingValue)})`,
    outgoingValue,
    incomingValue,
    tradeNetValue: incomingValue - outgoingValue,
    cashPaid: 0,
    cashReceived: 0,
    notes: [
      `Collection updated: removed offered cards that were found, added ${lineFromTradeCard(incomingCard)}.`,
      `Before-trade outgoing snapshots are stored in this trade log.`,
      notFound.length ? `These outgoing cards were not found as active collection records, so they were logged from the trade details only: ${notFound.join("; ")}.` : "",
      `Value check: you gave ${money(outgoingValue)} and received ${money(incomingValue)}, estimated net ${money(incomingValue - outgoingValue)}.`
    ]
      .filter(Boolean)
      .join(" "),
    outgoingCards,
    incomingCards: [tradeSnapshot(incomingCard, incomingValue)],
    likes: 0,
    wants: 0,
    comments: []
  });
  saveCards();
  saveTrades();
  localStorage.setItem(CURRY_IMMACULATE_TRADE_KEY, "done");
}

function allocateTradeCost(incomingCards, outgoingValue) {
  const incomingTotal = incomingCards.reduce((sum, card) => sum + numeric(card.value), 0) || 1;
  return incomingCards.map((card) => ({
    ...card,
    paid: Math.round(((numeric(card.value) / incomingTotal) * outgoingValue) * 100) / 100
  }));
}

function applyLoggedTrade({ id, date, counterparty, outgoingSpecs, incomingCards, notes }) {
  const now = new Date().toISOString();
  const outgoingResults = outgoingSpecs.map(({ match, fallback }) => takeTradeCard(match, { ...fallback, createdAt: now, updatedAt: now }));
  const outgoingCards = outgoingResults.map((result, index) => ({
    ...result.snapshot,
    tradeEstimate: numeric(outgoingSpecs[index].estimate) || numeric(result.snapshot.tradeEstimate || estimatedCardValue(result.snapshot))
  }));
  const outgoingValue = outgoingCards.reduce((sum, card) => sum + numeric(card.tradeEstimate || estimatedCardValue(card)), 0);
  const allocatedIncoming = allocateTradeCost(
    incomingCards.map((card) => ({ ...card, createdAt: now, updatedAt: now })),
    outgoingValue
  );
  const incomingValue = allocatedIncoming.reduce((sum, card) => sum + estimatedCardValue(card), 0);
  const notFound = outgoingResults
    .map((result, index) => (result.found ? "" : lineFromTradeCard(outgoingSpecs[index].fallback)))
    .filter(Boolean);
  cards = cards.filter((card) => !allocatedIncoming.some((incoming) => incoming.id === card.id));
  cards.unshift(...allocatedIncoming);
  trades = trades.filter((trade) => trade.id !== id);
  trades.unshift({
    id,
    createdAt: now,
    date,
    counterparty,
    outgoing: outgoingCards.map((card) => `${lineFromTradeCard(card)} (${money(numeric(card.tradeEstimate || estimatedCardValue(card)))})`).join("\n"),
    incoming: allocatedIncoming.map((card) => `${lineFromTradeCard(card)} (${money(estimatedCardValue(card))})`).join("\n"),
    outgoingValue,
    incomingValue,
    tradeNetValue: incomingValue - outgoingValue,
    cashPaid: 0,
    cashReceived: 0,
    notes: [
      `Collection updated: removed offered cards that were found and added received cards.`,
      notes,
      `Incoming cost basis was allocated from the estimated outgoing side value of ${money(outgoingValue)}.`,
      notFound.length ? `These outgoing cards were not found as active collection records, so they were logged from the trade details only: ${notFound.join("; ")}.` : "",
      `Value check: you gave ${money(outgoingValue)} and received ${money(incomingValue)}, estimated net ${money(incomingValue - outgoingValue)}.`
    ]
      .filter(Boolean)
      .join(" "),
    outgoingCards,
    incomingCards: allocatedIncoming.map((card) => tradeSnapshot(card, estimatedCardValue(card))),
    likes: 0,
    wants: 0,
    comments: []
  });
}

function applyJuly12Trades() {
  if (localStorage.getItem(JULY_12_TRADE_KEY) === "done") return;
  const tradeDate = "2026-07-12";
  cards = cards.filter((card) => card.id !== "trade-in-2026-07-12-finest-lamine-yamal-ssp");
  applyLoggedTrade({
    id: "trade-2026-07-12-gakpo-prizm-world-cup-mojo-red-99",
    date: tradeDate,
    counterparty: "Completed trade - Gakpo Mojo Red",
    notes: "Trade entered from user message on July 12, 2026. Values are low-confidence manual estimates until eBay/CardHobby/Goldin/Fanatics comps are connected.",
    outgoingSpecs: [
      {
        match: (card) => /mbappe/i.test(card.player) && /chrome/i.test(card.setName) && /refractor|silver/i.test(`${card.parallel} ${card.notes}`),
        fallback: {
          id: "trade-out-2026-07-12-mbappe-chrome-real-madrid-silver",
          player: "Kylian Mbappe",
          sport: "Soccer",
          year: "",
          setName: "Topps Chrome Real Madrid",
          type: "Base",
          cardNumber: "",
          parallel: "Silver/Refractor",
          condition: "Raw",
          grade: "",
          quantity: 1,
          paid: 10,
          value: 10,
          location: "",
          notes: "Traded away July 12, 2026."
        }
      },
      {
        match: (card) => /olise/i.test(card.player) && /bayern/i.test(card.setName) && /refractor|silver/i.test(`${card.parallel} ${card.notes}`),
        fallback: {
          id: "trade-out-2026-07-12-olise-bayern-chrome-silver",
          player: "Michael Olise",
          sport: "Soccer",
          year: "",
          setName: "Topps Chrome Bayern Munich",
          type: "Base",
          cardNumber: "",
          parallel: "Silver/Refractor",
          condition: "Raw",
          grade: "",
          quantity: 1,
          paid: 10,
          value: 10,
          location: "",
          notes: "Traded away July 12, 2026."
        }
      },
      {
        match: (card) => /stephen curry/i.test(card.player) && /gold standard/i.test(card.setName) && /349/.test(`${card.parallel} ${card.notes}`),
        fallback: {
          id: "trade-out-2026-07-12-curry-gold-standard-base-349",
          player: "Stephen Curry",
          sport: "Basketball",
          year: "",
          setName: "Panini Gold Standard",
          type: "Base",
          cardNumber: "",
          parallel: "/349",
          condition: "Raw",
          grade: "",
          quantity: 1,
          paid: 0,
          value: 180,
          location: "",
          notes: "Traded away July 12, 2026. Low-confidence manual estimate."
        }
      }
    ],
    incomingCards: [
      {
        id: "trade-in-2026-07-12-gakpo-2022-prizm-world-cup-mojo-red-99-psa8",
        player: "Cody Gakpo",
        sport: "Soccer",
        year: "2022",
        setName: "Panini Prizm FIFA World Cup",
        type: "Base",
        cardNumber: "",
        parallel: "Mojo Red /99",
        condition: "Graded",
        grade: "PSA 8",
        quantity: 1,
        value: 260,
        location: "Trade",
        notes: "Received by trade on July 12, 2026. Low-confidence manual estimate pending sold comps."
      }
    ]
  });
  applyLoggedTrade({
    id: "trade-2026-07-12-messi-haaland-yamal-ssp",
    date: tradeDate,
    counterparty: "Completed trade - Chrome SSP lot",
    notes: "Trade entered from user message on July 12, 2026. Values revised from CardHobby estimates: Curry Optic /99 RMB 250, Curry Elite /99 RMB 100, Messi RMB 180, Haaland RMB 50, Yamal Finest Shadow SP RMB 80.",
    outgoingSpecs: [
      {
        match: (card) => /stephen curry/i.test(card.player) && /elite/i.test(card.setName) && /99/.test(`${card.parallel} ${card.notes}`),
        estimate: 100,
        fallback: {
          id: "trade-out-2026-07-12-curry-elite-base-99",
          player: "Stephen Curry",
          sport: "Basketball",
          year: "",
          setName: "Panini Elite",
          type: "Base",
          cardNumber: "",
          parallel: "/99",
          condition: "Raw",
          grade: "",
          quantity: 1,
          paid: 0,
          value: 100,
          location: "",
          notes: "Traded away July 12, 2026. CardHobby estimate supplied by user: RMB 100."
        }
      },
      {
        match: (card) => /stephen curry/i.test(card.player) && /2018-19/.test(card.year) && /optic/i.test(card.setName) && /99/.test(`${card.parallel} ${card.notes}`),
        estimate: 250,
        fallback: {
          id: "trade-out-2026-07-12-curry-2018-19-base-99",
          player: "Stephen Curry",
          sport: "Basketball",
          year: "2018-19",
          setName: "Panini Donruss Optic",
          type: "Base",
          cardNumber: "",
          parallel: "/99",
          condition: "Raw",
          grade: "",
          quantity: 1,
          paid: 0,
          value: 250,
          location: "",
          notes: "Traded away July 12, 2026. CardHobby estimate supplied by user: RMB 250."
        }
      }
    ],
    incomingCards: [
      {
        id: "trade-in-2026-07-12-2023-chrome-messi-blue-cracked-ice-ssp",
        player: "Lionel Messi",
        sport: "Soccer",
        year: "2023",
        setName: "Topps Chrome",
        type: "SSP",
        cardNumber: "",
        parallel: "Blue Cracked Ice",
        condition: "Raw",
        grade: "",
        quantity: 1,
        value: 180,
        location: "Trade",
        notes: "Received by trade on July 12, 2026. CardHobby estimate supplied by user: RMB 180."
      },
      {
        id: "trade-in-2026-07-12-2023-chrome-haaland-blue-cracked-ice-ssp",
        player: "Erling Haaland",
        sport: "Soccer",
        year: "2023",
        setName: "Topps Chrome",
        type: "SSP",
        cardNumber: "",
        parallel: "Blue Cracked Ice",
        condition: "Raw",
        grade: "",
        quantity: 1,
        value: 50,
        location: "Trade",
        notes: "Received by trade on July 12, 2026. CardHobby estimate supplied by user: RMB 50."
      },
      {
        id: "trade-in-2026-07-12-finest-lamine-yamal-shadow-sp",
        player: "Lamine Yamal",
        sport: "Soccer",
        year: "",
        setName: "Topps Finest",
        type: "Shadow SP",
        cardNumber: "",
        parallel: "Shadow SP",
        condition: "Raw",
        grade: "",
        quantity: 1,
        value: 80,
        location: "Trade",
        notes: "Received by trade on July 12, 2026. Corrected to Yamal Finest Shadow SP. CardHobby estimate supplied by user: RMB 80."
      }
    ]
  });
  saveCards();
  saveTrades();
  localStorage.setItem(JULY_12_TRADE_KEY, "done");
}

function applyJuly14Activity() {
  if (localStorage.getItem(JULY_14_ACTIVITY_KEY) === "done") return;
  const now = new Date().toISOString();
  const activityDate = "2026-07-14";
  const derrickFallback = {
    id: "sale-out-2026-07-14-derrick-white-mosaic-chinese-prizm-8",
    createdAt: now,
    updatedAt: now,
    player: "Derrick White",
    sport: "Basketball",
    year: "2020-21",
    setName: "Panini Mosaic",
    type: "Base",
    cardNumber: "",
    parallel: "Chinese Prizm /8",
    condition: "Raw",
    grade: "",
    quantity: 1,
    paid: 40,
    value: 140,
    location: "",
    notes: "Sold July 14, 2026 for RMB 140. Original paid price from July 9 purchase: RMB 40."
  };
  const saleResult = takeTradeCard(
    (card) =>
      card.id === "purchase-2026-07-09-derrick-white-mosaic-chinese-prizm-8" ||
      (/derrick white/i.test(card.player) && /mosaic/i.test(card.setName) && /chinese prizm|\/8/i.test(`${card.parallel} ${card.notes}`)),
    derrickFallback
  );
  const soldCard = {
    ...saleResult.snapshot,
    tradeEstimate: 140,
    soldPrice: 140,
    saleDate: activityDate
  };
  const paidBasis = numeric(soldCard.paid) || numeric(derrickFallback.paid);
  trades = trades.filter((trade) => trade.id !== "sale-2026-07-14-derrick-white-mosaic-chinese-prizm-8");
  trades.unshift({
    id: "sale-2026-07-14-derrick-white-mosaic-chinese-prizm-8",
    createdAt: now,
    date: activityDate,
    counterparty: "Completed sale",
    outgoing: `${lineFromTradeCard(soldCard)} (${money(140)})`,
    incoming: "Cash received",
    outgoingValue: 140,
    incomingValue: 140,
    tradeNetValue: 140 - paidBasis,
    cashPaid: 0,
    cashReceived: 140,
    notes: [
      `Sold ${lineFromTradeCard(soldCard)} for ${money(140)}.`,
      `Cost basis ${money(paidBasis)}; realized profit ${money(140 - paidBasis)}.`,
      saleResult.found ? "Collection updated: removed this card from active holdings." : "The active card was not found, so the sale was logged from the supplied details only."
    ].join(" "),
    outgoingCards: [soldCard],
    incomingCards: [],
    likes: 0,
    wants: 0,
    comments: []
  });
  const newPurchases = [
    {
      id: "purchase-2026-07-14-jamal-murray-topps-chrome-fanatical",
      player: "Jamal Murray",
      sport: "Basketball",
      year: "",
      setName: "Topps Chrome",
      type: "Fanatical",
      cardNumber: "",
      parallel: "Base",
      condition: "Raw",
      grade: "",
      quantity: 1,
      paid: 75,
      value: 75,
      location: "",
      marketSales: [{ date: activityDate, value: 75, source: "manual", label: "User purchase price: RMB 75" }],
      notes: "Purchased July 14, 2026 for RMB 75."
    },
    {
      id: "purchase-2026-07-14-jayson-tatum-artistry-in-motion-125",
      player: "Jayson Tatum",
      sport: "Basketball",
      year: "2024-25",
      setName: "Artistry in Motion",
      type: "Base",
      cardNumber: "",
      parallel: "/125",
      condition: "Raw",
      grade: "",
      quantity: 1,
      paid: 90,
      value: 90,
      location: "",
      marketSales: [{ date: activityDate, value: 90, source: "manual", label: "User purchase price: RMB 90" }],
      notes: "Purchased July 14, 2026 for RMB 90. User entered as 2024-45 artitstry in motion Jason Tatum /125; normalized to 2024-25 Artistry in Motion."
    }
  ].map((card) => ({
    createdAt: `${activityDate}T12:00:00.000+08:00`,
    updatedAt: now,
    ...card
  }));
  const existingIds = new Set(cards.map((card) => card.id));
  cards = newPurchases.filter((card) => !existingIds.has(card.id)).concat(cards);
  saveCards();
  saveTrades();
  localStorage.setItem(JULY_14_ACTIVITY_KEY, "done");
}

function resetTradeForm() {
  tradeForm.reset();
  tradeFields.date.valueAsDate = new Date();
}

function resetGoalForm() {
  goalForm.reset();
  goalFields.title.value = "";
  goalFields.player.value = "";
  goalFields.setName.value = "";
  goalFields.parallel.value = "";
  goalFields.season.value = "";
  goalFields.type.value = "year";
  goalFields.startYear.value = "";
  goalFields.endYear.value = "";
  goalFields.startNumber.value = "";
  goalFields.endNumber.value = "";
}

function setEntryMode(mode) {
  const isTrade = mode === "trade";
  els.cardEntryTab.classList.toggle("active", !isTrade);
  els.tradeEntryTab.classList.toggle("active", isTrade);
  els.cardEntryTab.setAttribute("aria-selected", String(!isTrade));
  els.tradeEntryTab.setAttribute("aria-selected", String(isTrade));
  els.cardEntryPanel.classList.toggle("hidden", isTrade);
  els.tradeEntryPanel.classList.toggle("hidden", !isTrade);
}

function panelPage(panelId) {
  if (panelId === "installApp") return "dashboard";
  if (panelId === "portfolio") return "portfolio";
  if (panelId === "entry" || panelId === "sync" || panelId === "photoImport" || panelId === "collection" || panelId === "collectors" || panelId === "scan") return "collection";
  if (panelId === "diy") return "diy";
  if (panelId === "condition") return "condition";
  if (panelId === "goals" || panelId === "alerts" || panelId === "goalAssistant") return "goals";
  if (panelId === "pricing" || panelId === "market") return "market";
  if (panelId === "community") return "community";
  if (panelId === "aiTrade" || panelId === "trades" || panelId === "dealRoom") return "trade";
  if (panelId === "account") return "account";
  return "dashboard";
}

async function initSportsGuyRobot3D() {
  const stage = els.sportsGuyRobotStage;
  const canvas = els.sportsGuyRobotCanvas;
  if (!stage || !canvas) return null;
  if (sportsGuyRobotRuntime) {
    sportsGuyRobotRuntime.setActive(activePage === "trade");
    return sportsGuyRobotRuntime;
  }
  if (stage.dataset.robotLoading === "true") return null;
  stage.dataset.robotLoading = "true";
  try {
    const THREE = await import("https://unpkg.com/three@0.160.0/build/three.module.js");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.35));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
    camera.position.set(0, 0.15, 6.35);

    const computed = getComputedStyle(stage);
    const accentColor = new THREE.Color(computed.getPropertyValue("--page-accent").trim() || "#93d6b4");
    const goldColor = new THREE.Color(computed.getPropertyValue("--page-secondary").trim() || "#e7bd63");
    const robot = new THREE.Group();
    robot.position.y = -0.15;
    scene.add(robot);

    scene.add(new THREE.HemisphereLight(0xcaffea, 0x020706, 1.35));
    const keyLight = new THREE.PointLight(accentColor, 26, 12);
    keyLight.position.set(-2.4, 2.8, 4.2);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(goldColor, 19, 10);
    rimLight.position.set(2.6, 1.2, 2.4);
    scene.add(rimLight);

    const shellMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1b5142,
      metalness: 0.82,
      roughness: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      iridescence: 0.18,
      iridescenceIOR: 1.3
    });
    const titaniumMaterial = new THREE.MeshPhysicalMaterial({ color: 0x83938e, metalness: 0.94, roughness: 0.19, clearcoat: 0.85, clearcoatRoughness: 0.15 });
    const darkMaterial = new THREE.MeshPhysicalMaterial({ color: 0x020a08, metalness: 0.62, roughness: 0.25, clearcoat: 0.82 });
    const visorMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x051411,
      emissive: accentColor,
      emissiveIntensity: 0.09,
      metalness: 0.58,
      roughness: 0.12,
      clearcoat: 1,
      transparent: true,
      opacity: 0.96
    });
    const accentMaterial = new THREE.MeshStandardMaterial({ color: accentColor, emissive: accentColor, emissiveIntensity: 1.55, metalness: 0.34, roughness: 0.18 });
    const goldMaterial = new THREE.MeshStandardMaterial({ color: goldColor, emissive: goldColor, emissiveIntensity: 0.32, metalness: 0.9, roughness: 0.16 });
    const hologramMaterial = new THREE.MeshBasicMaterial({ color: accentColor, transparent: true, opacity: 0.18, side: THREE.DoubleSide, depthWrite: false });

    function extrudedPlate(points, depth, material, bevel = 0.045) {
      const shape = new THREE.Shape();
      points.forEach(([x, y], index) => index ? shape.lineTo(x, y) : shape.moveTo(x, y));
      shape.closePath();
      const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: bevel, bevelThickness: bevel });
      geometry.center();
      return new THREE.Mesh(geometry, material);
    }

    const torso = new THREE.Group();
    const torsoBody = extrudedPlate([[-0.92, 0.52], [-0.62, 0.72], [0.62, 0.72], [0.92, 0.52], [0.68, -0.58], [0.3, -0.84], [-0.3, -0.84], [-0.68, -0.58]], 0.5, shellMaterial, 0.065);
    torsoBody.position.z = -0.2;
    torsoBody.add(new THREE.LineSegments(new THREE.EdgesGeometry(torsoBody.geometry, 28), new THREE.LineBasicMaterial({ color: accentColor, transparent: true, opacity: 0.26 })));
    torso.add(torsoBody);
    const chestInset = extrudedPlate([[-0.58, 0.34], [0.58, 0.34], [0.46, -0.46], [0, -0.66], [-0.46, -0.46]], 0.09, darkMaterial, 0.035);
    chestInset.position.set(0, -0.02, 0.13);
    torso.add(chestInset);
    const collarLeft = extrudedPlate([[-0.58, 0.2], [-0.08, 0.08], [-0.1, -0.05], [-0.7, 0.04]], 0.08, titaniumMaterial, 0.025);
    const collarRight = collarLeft.clone();
    collarLeft.position.set(-0.2, 0.52, 0.2);
    collarRight.scale.x = -1;
    collarRight.position.set(0.2, 0.52, 0.2);
    torso.add(collarLeft, collarRight);

    const chestCore = new THREE.Group();
    const coreOuter = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.035, 10, 44), goldMaterial);
    const coreMiddle = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.025, 10, 38), accentMaterial);
    coreMiddle.rotation.z = Math.PI / 4;
    const coreLens = new THREE.Mesh(new THREE.IcosahedronGeometry(0.095, 2), accentMaterial.clone());
    chestCore.add(coreOuter, coreMiddle, coreLens);
    chestCore.position.set(0, -0.08, 0.27);
    torso.add(chestCore);
    torso.position.y = -0.35;
    robot.add(torso);

    const neck = new THREE.Group();
    const neckColumn = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 0.3, 18), titaniumMaterial);
    const neckLight = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.025, 8, 28), accentMaterial);
    neckLight.rotation.x = Math.PI / 2;
    neckLight.position.y = 0.08;
    neck.add(neckColumn, neckLight);
    neck.position.y = 0.44;
    robot.add(neck);

    const head = new THREE.Group();
    const headShell = new THREE.Mesh(new THREE.CapsuleGeometry(0.49, 0.7, 9, 24), shellMaterial);
    headShell.rotation.z = Math.PI / 2;
    headShell.scale.z = 0.72;
    head.add(headShell);
    const crown = extrudedPlate([[-0.62, 0.18], [-0.28, 0.38], [0.28, 0.38], [0.62, 0.18], [0.48, -0.04], [-0.48, -0.04]], 0.16, titaniumMaterial, 0.035);
    crown.position.set(0, 0.37, 0.03);
    head.add(crown);
    const visor = new THREE.Mesh(new THREE.CapsuleGeometry(0.255, 0.68, 8, 24), visorMaterial);
    visor.rotation.z = Math.PI / 2;
    visor.scale.z = 0.25;
    visor.position.set(0, 0.05, 0.46);
    head.add(visor);
    const eyeGeometry = new THREE.BoxGeometry(0.31, 0.055, 0.025);
    const leftEye = new THREE.Mesh(eyeGeometry, accentMaterial.clone());
    const rightEye = new THREE.Mesh(eyeGeometry, accentMaterial.clone());
    leftEye.position.set(-0.29, 0.12, 0.555);
    rightEye.position.set(0.29, 0.12, 0.555);
    head.add(leftEye, rightEye);
    const eyeBridge = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.022, 0.018), goldMaterial);
    eyeBridge.position.set(0, 0.12, 0.56);
    head.add(eyeBridge);
    const mouth = new THREE.Group();
    const voiceBars = [];
    [-2, -1, 0, 1, 2].forEach((offset) => {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.1, 0.024), offset === 0 ? goldMaterial : accentMaterial.clone());
      bar.position.x = offset * 0.09;
      mouth.add(bar);
      voiceBars.push(bar);
    });
    mouth.position.set(0, -0.17, 0.555);
    head.add(mouth);
    const jaw = extrudedPlate([[-0.5, 0.12], [0.5, 0.12], [0.34, -0.2], [0, -0.31], [-0.34, -0.2]], 0.12, titaniumMaterial, 0.028);
    jaw.position.set(0, -0.42, 0.14);
    head.add(jaw);
    [-1, 1].forEach((side) => {
      const sensor = new THREE.Group();
      const sensorBody = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.12, 24), titaniumMaterial);
      sensorBody.rotation.z = Math.PI / 2;
      const sensorRing = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.02, 8, 24), goldMaterial);
      sensorRing.rotation.y = Math.PI / 2;
      sensorRing.position.x = side * 0.065;
      sensor.add(sensorBody, sensorRing);
      sensor.position.x = side * 0.82;
      head.add(sensor);
    });
    head.position.y = 0.82;
    robot.add(head);

    function createArm(side) {
      const arm = new THREE.Group();
      arm.position.set(side * 1.02, 0.02, -0.02);
      const shoulderJoint = new THREE.Mesh(new THREE.SphereGeometry(0.2, 18, 12), darkMaterial);
      const shoulderPlate = extrudedPlate([[-0.3, 0.2], [0.3, 0.2], [0.38, -0.12], [0, -0.27], [-0.38, -0.12]], 0.28, side < 0 ? shellMaterial : shellMaterial, 0.04);
      shoulderPlate.add(new THREE.LineSegments(new THREE.EdgesGeometry(shoulderPlate.geometry, 24), new THREE.LineBasicMaterial({ color: goldColor, transparent: true, opacity: 0.32 })));
      shoulderPlate.scale.x = side;
      shoulderPlate.position.set(side * 0.08, 0.04, 0.02);
      arm.add(shoulderJoint, shoulderPlate);
      const upper = new THREE.Mesh(new THREE.CapsuleGeometry(0.145, 0.45, 6, 14), titaniumMaterial);
      upper.position.y = -0.42;
      arm.add(upper);
      const forearm = new THREE.Group();
      forearm.position.y = -0.78;
      const elbow = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.03, 8, 22), accentMaterial);
      elbow.rotation.x = Math.PI / 2;
      const lower = new THREE.Mesh(new THREE.CapsuleGeometry(0.15, 0.38, 6, 14), shellMaterial);
      lower.position.y = -0.31;
      lower.scale.set(1.12, 1, 0.88);
      const hand = new THREE.Group();
      const palm = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 12), titaniumMaterial);
      palm.scale.set(1.05, 0.85, 0.72);
      hand.add(palm);
      [-1, 0, 1].forEach((finger) => {
        const digit = new THREE.Mesh(new THREE.CapsuleGeometry(0.025, 0.13, 4, 8), goldMaterial);
        digit.position.set(finger * 0.075, -0.15, 0.01);
        hand.add(digit);
      });
      hand.position.y = -0.64;
      forearm.add(elbow, lower, hand);
      arm.add(forearm);
      robot.add(arm);
      return { group: arm, forearm, hand };
    }

    const leftArm = createArm(-1);
    const rightArm = createArm(1);
    leftArm.group.rotation.z = -0.18;
    rightArm.group.rotation.z = 0.18;

    function createStabilizer(side) {
      const stabilizer = new THREE.Group();
      stabilizer.position.set(side * 0.38, -1.18, -0.05);
      const fin = extrudedPlate([[-0.2, 0.28], [0.2, 0.28], [0.28, -0.34], [0, -0.52], [-0.28, -0.34]], 0.22, shellMaterial, 0.035);
      const strip = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.035, 0.25), accentMaterial);
      strip.position.set(0, -0.22, 0.14);
      stabilizer.add(fin, strip);
      robot.add(stabilizer);
      return stabilizer;
    }
    const leftLeg = createStabilizer(-1);
    const rightLeg = createStabilizer(1);

    const platform = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 1.18, 0.22, 48), darkMaterial);
    platform.position.y = -1.72;
    robot.add(platform);
    const platformRing = new THREE.Mesh(new THREE.TorusGeometry(0.94, 0.035, 10, 72), new THREE.MeshBasicMaterial({ color: accentColor, transparent: true, opacity: 0.82 }));
    platformRing.rotation.x = Math.PI / 2;
    platformRing.position.y = -1.58;
    robot.add(platformRing);
    const lowerRing = new THREE.Mesh(new THREE.TorusGeometry(1.18, 0.018, 8, 72), new THREE.MeshBasicMaterial({ color: goldColor, transparent: true, opacity: 0.42 }));
    lowerRing.rotation.x = Math.PI / 2;
    lowerRing.position.y = -1.82;
    robot.add(lowerRing);

    const orbit = new THREE.Mesh(new THREE.TorusGeometry(1.76, 0.016, 8, 96), new THREE.MeshBasicMaterial({ color: goldColor, transparent: true, opacity: 0.28 }));
    orbit.rotation.x = 1.22;
    orbit.position.y = -0.15;
    scene.add(orbit);

    function createHologram(side) {
      const display = new THREE.Group();
      const panel = new THREE.Mesh(new THREE.PlaneGeometry(0.72, 1.02), hologramMaterial.clone());
      const frame = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(0.72, 1.02)), new THREE.LineBasicMaterial({ color: side < 0 ? goldColor : accentColor, transparent: true, opacity: 0.72 }));
      display.add(panel, frame);
      const card = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.47), new THREE.MeshBasicMaterial({ color: side < 0 ? goldColor : accentColor, transparent: true, opacity: 0.22, side: THREE.DoubleSide }));
      card.position.set(0, 0.12, 0.012);
      display.add(card);
      [0.32, 0.4, 0.24].forEach((width, index) => {
        const line = new THREE.Mesh(new THREE.PlaneGeometry(width, 0.018), new THREE.MeshBasicMaterial({ color: accentColor, transparent: true, opacity: 0.58 }));
        line.position.set(0, -0.24 - index * 0.09, 0.015);
        display.add(line);
      });
      display.position.set(side * 1.58, 0.1, -0.35);
      display.rotation.y = side * -0.28;
      scene.add(display);
      return display;
    }
    const holoLeft = createHologram(-1);
    const holoRight = createHologram(1);

    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(54 * 3);
    for (let index = 0; index < 54; index += 1) {
      particlePositions[index * 3] = (Math.random() - 0.5) * 7;
      particlePositions[index * 3 + 1] = (Math.random() - 0.5) * 5;
      particlePositions[index * 3 + 2] = -1 - Math.random() * 4;
    }
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({ color: accentColor, size: 0.035, transparent: true, opacity: 0.42 }));
    scene.add(particles);

    let active = false;
    let frameId = 0;
    let state = "idle";
    let stateUntil = 0;
    let pointerX = 0;
    let pointerY = 0;
    let lastFrame = performance.now();
    let speakingUtterance = null;

    const setBubble = (message) => {
      if (!els.sportsGuyRobotBubble || !message) return;
      const clean = text(message).replace(/\s+/g, " ");
      els.sportsGuyRobotBubble.textContent = clean.length > 105 ? `${clean.slice(0, 102)}...` : clean;
    };

    const setState = (nextState = "idle", duration = 0, message = "") => {
      state = nextState;
      stateUntil = duration ? performance.now() + duration : 0;
      stage.dataset.robotState = nextState;
      if (message) setBubble(message);
    };

    const resize = () => {
      const rect = stage.getBoundingClientRect();
      if (rect.width < 20 || rect.height < 20) return;
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
    };

    const damp = (current, target, rate, delta) => THREE.MathUtils.lerp(current, target, 1 - Math.exp(-rate * delta));
    const animate = (now) => {
      if (!active) return;
      const delta = Math.min(0.04, Math.max(0.001, (now - lastFrame) / 1000));
      lastFrame = now;
      const seconds = now / 1000;
      if (stateUntil && now >= stateUntil) setState("idle", 0, "Ready for the next move.");

      let leftTarget = -0.16;
      let rightTarget = 0.16;
      let leftForearmTarget = 0;
      let rightForearmTarget = 0;
      let torsoTarget = 0;
      let headTilt = pointerX * -0.16;
      let headNod = pointerY * 0.12;
      let bodyScale = 1;
      let mouthScale = 0.85;
      let hologramSpread = 1.58;
      let hologramLift = 0.1;

      if (state === "thinking") {
        rightTarget = 1.55;
        rightForearmTarget = -1.0;
        headTilt += -0.18;
        headNod += 0.12;
        hologramSpread = 1.42;
        hologramLift = 0.2;
      } else if (state === "talking") {
        leftTarget = -0.3 + Math.sin(seconds * 5.4) * 0.22;
        rightTarget = 0.35 + Math.sin(seconds * 5.4 + 1.4) * 0.2;
        leftForearmTarget = Math.sin(seconds * 4.6) * 0.24;
        rightForearmTarget = Math.sin(seconds * 4.6 + 1.3) * 0.22;
        headNod += Math.sin(seconds * 7) * 0.055;
        mouthScale = 1 + Math.abs(Math.sin(seconds * 13)) * 3.8;
        hologramSpread = 1.5 + Math.sin(seconds * 2.4) * 0.035;
      } else if (state === "happy") {
        leftTarget = -2.12 + Math.sin(seconds * 5) * 0.1;
        rightTarget = 2.12 - Math.sin(seconds * 5) * 0.1;
        bodyScale = 1.03 + Math.sin(seconds * 6) * 0.02;
        hologramSpread = 1.72;
        hologramLift = 0.22;
      } else if (state === "warning") {
        leftTarget = -0.56;
        rightTarget = 0.56;
        torsoTarget = Math.sin(seconds * 8) * 0.025;
        headTilt += Math.sin(seconds * 8) * 0.05;
      } else if (state === "wave") {
        rightTarget = 2.22;
        rightForearmTarget = -0.7 + Math.sin(seconds * 12) * 0.52;
        headTilt += -0.12;
      }

      leftArm.group.rotation.z = damp(leftArm.group.rotation.z, leftTarget, 8, delta);
      rightArm.group.rotation.z = damp(rightArm.group.rotation.z, rightTarget, 8, delta);
      leftArm.forearm.rotation.z = damp(leftArm.forearm.rotation.z, leftForearmTarget, 9, delta);
      rightArm.forearm.rotation.z = damp(rightArm.forearm.rotation.z, rightForearmTarget, 9, delta);
      torso.rotation.z = damp(torso.rotation.z, torsoTarget, 8, delta);
      head.rotation.y = damp(head.rotation.y, pointerX * 0.34, 6, delta);
      head.rotation.x = damp(head.rotation.x, headNod, 7, delta);
      head.rotation.z = damp(head.rotation.z, headTilt, 7, delta);
      robot.scale.setScalar(damp(robot.scale.x, bodyScale, 8, delta));
      robot.position.y = -0.15 + (reduceMotion ? 0 : Math.sin(seconds * 1.8) * 0.055);
      robot.rotation.y = damp(robot.rotation.y, pointerX * 0.08, 5, delta);
      leftLeg.rotation.z = Math.sin(seconds * 1.8) * 0.012;
      rightLeg.rotation.z = -leftLeg.rotation.z;
      mouth.scale.y = damp(mouth.scale.y, mouthScale, 13, delta);
      voiceBars.forEach((bar, index) => {
        const energy = state === "talking" ? 0.7 + Math.abs(Math.sin(seconds * 11 + index * 0.9)) * 1.8 : state === "thinking" ? 0.75 + index * 0.08 : 0.72;
        bar.scale.y = damp(bar.scale.y, energy, 15, delta);
      });
      const blink = seconds % 4.7 > 4.55 ? 0.08 : 0.62;
      leftEye.scale.y = damp(leftEye.scale.y, blink, 22, delta);
      rightEye.scale.y = damp(rightEye.scale.y, blink, 22, delta);
      const warning = state === "warning";
      leftEye.material.color.set(warning ? 0xff786f : accentColor);
      leftEye.material.emissive.set(warning ? 0xff3d36 : accentColor);
      rightEye.material.color.copy(leftEye.material.color);
      rightEye.material.emissive.copy(leftEye.material.emissive);
      coreLens.material.color.set(warning ? 0xff786f : accentColor);
      coreLens.material.emissive.set(warning ? 0xff3d36 : accentColor);
      chestCore.rotation.z += delta * (state === "thinking" ? 1.5 : 0.42);
      const corePulse = 1 + Math.sin(seconds * (state === "warning" ? 9 : 3.2)) * 0.08;
      coreLens.scale.setScalar(corePulse);
      holoLeft.position.x = damp(holoLeft.position.x, -hologramSpread, 7, delta);
      holoRight.position.x = damp(holoRight.position.x, hologramSpread, 7, delta);
      holoLeft.position.y = damp(holoLeft.position.y, hologramLift, 7, delta) + (reduceMotion ? 0 : Math.sin(seconds * 1.7) * 0.0015);
      holoRight.position.y = damp(holoRight.position.y, hologramLift, 7, delta) - (reduceMotion ? 0 : Math.sin(seconds * 1.7) * 0.0015);
      holoLeft.rotation.z = Math.sin(seconds * 0.8) * 0.025;
      holoRight.rotation.z = -holoLeft.rotation.z;
      orbit.rotation.z += delta * (state === "thinking" ? 1.2 : 0.28);
      particles.rotation.y += delta * 0.035;
      platformRing.material.opacity = 0.72 + Math.sin(seconds * 3) * 0.18;
      lowerRing.rotation.z -= delta * 0.35;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    const start = () => {
      if (active || document.hidden) return;
      active = true;
      lastFrame = performance.now();
      resize();
      frameId = requestAnimationFrame(animate);
    };
    const stop = () => {
      active = false;
      if (frameId) cancelAnimationFrame(frameId);
      frameId = 0;
      if (speakingUtterance && "speechSynthesis" in window) window.speechSynthesis.cancel();
    };

    const speak = (message) => {
      const clean = text(message);
      if (!clean) return;
      const duration = Math.min(6200, Math.max(1800, clean.length * 42));
      setState("talking", duration, clean);
      if (!sportsGuyVoiceEnabled || !("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) return;
      window.speechSynthesis.cancel();
      speakingUtterance = new SpeechSynthesisUtterance(clean);
      speakingUtterance.lang = currentLanguage === "zh-CN" ? "zh-CN" : currentLanguage === "ja" ? "ja-JP" : "en-US";
      speakingUtterance.rate = 0.98;
      speakingUtterance.pitch = 0.82;
      const voice = window.speechSynthesis.getVoices().find((candidate) => candidate.lang.toLowerCase().startsWith(speakingUtterance.lang.slice(0, 2).toLowerCase()));
      if (voice) speakingUtterance.voice = voice;
      speakingUtterance.onstart = () => setState("talking", 0, clean);
      speakingUtterance.onend = () => { speakingUtterance = null; setState("idle", 0, "Ready for the next move."); };
      speakingUtterance.onerror = () => { speakingUtterance = null; setState("idle", 0, "Ready for the next move."); };
      window.speechSynthesis.speak(speakingUtterance);
    };

    const wave = () => setState("wave", 1800, "Good to see you. Let’s make this trade count.");
    sportsGuyRobotRuntime = {
      setActive(enabled) { enabled ? start() : stop(); },
      setState,
      speak,
      wave,
      resize
    };

    const pointerMove = (event) => {
      const rect = stage.getBoundingClientRect();
      pointerX = THREE.MathUtils.clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
      pointerY = THREE.MathUtils.clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
    };
    stage.addEventListener("pointermove", pointerMove);
    stage.addEventListener("pointerleave", () => { pointerX = 0; pointerY = 0; });
    stage.addEventListener("click", (event) => { if (!event.target.closest("button")) wave(); });
    stage.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      wave();
    });
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
      else if (activePage === "trade") start();
    });
    stage.dataset.robotLoading = "false";
    stage.dataset.robotReady = "true";
    stage.dataset.robotState = "idle";
    resize();
    sportsGuyRobotRuntime.setActive(activePage === "trade");
    return sportsGuyRobotRuntime;
  } catch (error) {
    console.warn("Sports Guy 3D unavailable", error);
    stage.dataset.robotLoading = "false";
    stage.classList.add("robot-fallback");
    if (els.sportsGuyRobotBubble) els.sportsGuyRobotBubble.textContent = "Sports Guy is online and ready to negotiate.";
    return null;
  }
}

function setActivePage(page) {
  const nextPage = ["landing", "dashboard", "portfolio", "collection", "diy", "condition", "goals", "market", "community", "trade", "account"].includes(page) ? page : "landing";
  if (activePage === nextPage && document.body.dataset.activePage === nextPage) {
    syncFocusWorkspaceWithHash();
    applyFocusWorkspaceView();
    return;
  }
  const isInitialPage = !document.body.dataset.activePage;
  const transitionToken = ++pageTransitionToken;
  if (!isInitialPage && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.body.classList.add("page-transitioning");
  }
  activePage = nextPage;
  document.body.dataset.activePage = activePage;
  const navActivePage = activePage === "landing" ? "portfolio" : activePage;
  els.pageButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.pageButton === navActivePage);
  });
  if (activePage === "trade") {
    setEntryMode("trade");
    initSportsGuyRobot3D().then((runtime) => runtime?.setActive(activePage === "trade"));
  } else if (activePage === "collection") {
    setEntryMode("card");
  }
  if (activePage !== "trade") sportsGuyRobotRuntime?.setActive(false);
  if (activePage !== "condition") stopConditionCamera({ quiet: true });
  els.hero.classList.toggle("hidden", activePage !== "landing");
  if (activePage === "landing") {
    initLandingHero3D();
    initLandingCard3D();
  } else if (activePage === "collection") {
    schedulePresentationCloset3D();
  }
  syncWorkspace3D(activePage);
  syncFocusWorkspaceWithHash();
  applyWorkspace();
  applyMarketWorkspaceView();
  applyFocusWorkspaceView();
  const directorySuppressed = ["landing", "portfolio", "collection", "diy", "condition", "goals", "market", "trade", "account"].includes(activePage);
  const hasDirectoryTools = Array.from(els.directory?.querySelectorAll(".category-toggle") || []).some((item) => !item.classList.contains("hidden"));
  els.directory?.classList.toggle("hidden", directorySuppressed || !hasDirectoryTools);
  if (!isInitialPage) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (transitionToken === pageTransitionToken) document.body.classList.remove("page-transitioning");
      });
    });
  }
}

const PAGE_SCROLL_TARGETS = {
  landing: ".hero",
  dashboard: "#workspace",
  portfolio: "#portfolioArea",
  collection: "#collectionViewToolbar",
  diy: "#diyArea",
  condition: "#conditionArea",
  goals: "#goalViewToolbar",
  market: "#marketViewToolbar",
  community: "#communityArea",
  trade: "#tradeViewToolbar",
  account: "#accountArea"
};

function scrollActivePageIntoView(page = activePage) {
  const target = document.querySelector(PAGE_SCROLL_TARGETS[page] || "#workspace");
  if (!target) return;
  requestAnimationFrame(() => {
    const topbarHeight = document.querySelector(".topbar")?.getBoundingClientRect().height || 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - topbarHeight - 16;
    window.scrollTo({ top: Math.max(0, targetTop), behavior: "auto" });
  });
}

function applyMarketWorkspaceView() {
  const isMarket = activePage === "market";
  const view = ["values", "sales", "split"].includes(marketWorkspace.view) ? marketWorkspace.view : "values";
  document.body.dataset.marketView = view;
  document.body.dataset.marketContext = marketWorkspace.contextExpanded ? "expanded" : "compact";
  els.marketViewToolbar?.classList.toggle("hidden", !isMarket);
  els.pricingLabArea?.classList.toggle("market-view-hidden", isMarket && view === "sales");
  els.marketArea?.classList.toggle("market-view-hidden", isMarket && view === "values");
  els.marketViewButtons?.forEach((button) => {
    const active = button.dataset.marketView === view;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  if (els.toggleMarketContext) {
    els.toggleMarketContext.setAttribute("aria-pressed", String(marketWorkspace.contextExpanded));
    const label = els.toggleMarketContext.querySelector("span:last-child");
    if (label) label.textContent = translatedText(marketWorkspace.contextExpanded ? "Hide notes" : "Show notes");
  }
  if (els.marketNotesDrawer) els.marketNotesDrawer.open = marketWorkspace.contextExpanded;
}

function setMarketWorkspaceView(view) {
  if (!["values", "sales", "split"].includes(view)) return;
  marketWorkspace.view = view;
  saveMarketWorkspace();
  applyMarketWorkspaceView();
}

function toggleMarketContext() {
  marketWorkspace.contextExpanded = !marketWorkspace.contextExpanded;
  saveMarketWorkspace();
  applyMarketWorkspaceView();
}

const FOCUS_WORKSPACE_CONFIG = {
  collection: {
    toolbar: "#collectionViewToolbar",
    panels: ["entry", "sync", "photoImport", "collectors", "collection"],
    views: {
      browse: ["collection"],
      add: ["entry"],
      imports: ["sync"],
      photos: ["photoImport"],
      people: ["collectors"],
      all: ["entry", "sync", "photoImport", "collectors", "collection"]
    }
  },
  goals: {
    toolbar: "#goalViewToolbar",
    panels: ["goals", "goalAssistant", "alerts"],
    views: {
      overview: ["goals"],
      missing: ["goalAssistant"],
      alerts: ["alerts"],
      all: ["goals", "goalAssistant", "alerts"]
    }
  },
  trade: {
    toolbar: "#tradeViewToolbar",
    panels: ["aiTrade", "dealRoom", "trades"],
    views: {
      builder: ["aiTrade"],
      deals: ["dealRoom"],
      history: ["trades"],
      all: ["aiTrade", "dealRoom", "trades"]
    }
  }
};

function applyFocusWorkspaceView() {
  document.body.dataset.focusView = focusWorkspaces[activePage] || "";
  Object.entries(FOCUS_WORKSPACE_CONFIG).forEach(([page, config]) => {
    const isActive = activePage === page;
    const view = config.views[focusWorkspaces[page]] ? focusWorkspaces[page] : Object.keys(config.views)[0];
    const shownPanels = new Set(config.views[view]);
    document.querySelector(config.toolbar)?.classList.toggle("hidden", !isActive);
    config.panels.forEach((panelId) => {
      const panel = document.querySelector(`[data-panel="${panelId}"]`);
      panel?.classList.toggle("focus-view-hidden", isActive && !shownPanels.has(panelId));
    });
    els.focusViewButtons?.forEach((button) => {
      if (button.dataset.focusPage !== page) return;
      const selected = isActive && button.dataset.focusView === view;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-selected", String(selected));
    });
  });
}

function setFocusWorkspaceView(page, view, { scroll = true } = {}) {
  const config = FOCUS_WORKSPACE_CONFIG[page];
  if (!config?.views[view]) return;
  focusWorkspaces[page] = view;
  config.views[view].forEach((panelId) => { workspace.visible[panelId] = true; });
  saveFocusWorkspaces();
  saveWorkspace();
  applyWorkspace();
  applyFocusWorkspaceView();
  if (scroll && activePage === page) scrollActivePageIntoView(page);
}

function syncFocusWorkspaceWithHash() {
  if (pageFromHash() !== activePage) return;
  const hashViews = {
    "#collectionArea": ["collection", "browse"],
    "#entryArea": ["collection", "add"],
    "#syncArea": ["collection", "imports"],
    "#photoImportArea": ["collection", "photos"],
    "#collectorsArea": ["collection", "people"],
    "#goalArea": ["goals", "overview"],
    "#goalAssistantArea": ["goals", "missing"],
    "#alertArea": ["goals", "alerts"],
    "#aiTradeArea": ["trade", "builder"],
    "#dealRoomArea": ["trade", "deals"],
    "#tradeArea": ["trade", "history"]
  };
  const target = hashViews[location.hash];
  if (!target) return;
  const [page, view] = target;
  if (focusWorkspaces[page] === view) return;
  focusWorkspaces[page] = view;
  saveFocusWorkspaces();
}

function setSidebarExpanded(expanded) {
  els.sidebar?.classList.toggle("expanded", expanded);
  document.body.classList.remove("sidebar-expanded");
  els.sidebarToggle?.setAttribute("aria-expanded", String(expanded));
  els.sidebarToggle?.setAttribute("aria-label", expanded ? "Collapse sidebar" : "Expand sidebar");
}

function showInstallPanel(show) {
  if (!els.installAppArea) return;
  els.installAppArea.classList.toggle("hidden", !show || activePage !== "dashboard");
}

function showLandingAuth() {
  if (isMember()) {
    setActivePage("portfolio");
    document.querySelector("#portfolioArea")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  els.landingAuthCard?.classList.remove("hidden");
  els.landingAuthCard?.scrollIntoView({ behavior: "smooth", block: "center" });
  landingLoginFields.email?.focus();
}

async function handleAppDownload() {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    render();
    return;
  }
  const exportData = {
    exportedAt: new Date().toISOString(),
    app: "Card Ledger",
    cards,
    trades,
    goals,
    communityPosts,
    diyCards,
    diyListings,
    dealRooms
  };
  download("card-ledger-backup.json", JSON.stringify(exportData, null, 2), "application/json");
}

function pageFromHash() {
  if (!location.hash || location.hash === "#landing" || location.hash === "#home") return "landing";
  if (location.hash === "#workspace" || location.hash === "#dashboard") return "dashboard";
  if (location.hash === "#portfolio" || location.hash === "#portfolioArea") return "portfolio";
  if (location.hash === "#communityArea") return "community";
  if (location.hash === "#aiTradeArea" || location.hash === "#tradeArea" || location.hash === "#dealRoomArea") return "trade";
  if (["#collectionArea", "#entryArea", "#syncArea", "#photoImportArea", "#collectorsArea"].includes(location.hash)) return "collection";
  if (location.hash === "#diyArea" || location.hash === "#diy") return "diy";
  if (location.hash === "#conditionArea" || location.hash === "#condition") return "condition";
  if (location.hash === "#goalArea" || location.hash === "#goalAssistantArea" || location.hash === "#alertArea") return "goals";
  if (location.hash === "#marketArea" || location.hash === "#pricingLabArea") return "market";
  if (location.hash === "#accountArea" || location.hash === "#account") return "account";
  return "landing";
}

function isMember() {
  return Boolean(account.role === "admin" || account.role === "collector" || supabaseSettings.userId || account.email || account.phone);
}

function requireMember(action = "use this feature") {
  if (isMember()) return true;
  window.alert(`Login or sign up to ${action}.`);
  if (activePage === "landing" && els.landingAuthCard) {
    showLandingAuth();
  } else if (els.accountMenu) {
    setActivePage("account");
    document.querySelector("#accountArea")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  return false;
}

function setMemberLocked(root, locked) {
  if (!root) return;
  root.classList.toggle("member-locked", locked);
  const controls = root.matches?.("input, select, textarea, button") ? [root] : Array.from(root.querySelectorAll("input, select, textarea, button"));
  controls.forEach((control) => {
    if (control.dataset.guestAllowed === "true") return;
    control.disabled = locked;
    control.setAttribute("aria-disabled", String(locked));
  });
}

function renderAccessControls() {
  const locked = !isMember();
  [
    "#cardForm",
    ".fixed-format-panel",
    "#tradeForm",
    "#syncArea .connection-grid",
    "#purchaseImportInput",
    "#importPurchases",
    "#photoImportArea",
    "#profileSettingsForm",
    "#privacySelect",
    "#friendForm",
    "#communityPostForm",
    "#diyUploadForm",
    "#diyListingForm",
    "#chatForm",
    "#tradePostForm",
    "#aiTradeArea",
    "#conditionArea",
    "#dealRoomForm",
    "#goalForm",
    "#goalAssistantList"
  ].forEach((selector) => setMemberLocked(document.querySelector(selector), locked));
  if (els.memberAccessNotice) {
    els.memberAccessNotice.innerHTML = locked
      ? "<strong>Guest access</strong><span>You can browse, search, and view public collections. Login or sign up to add cards, trade, post, chat, choose an avatar, or change privacy.</span>"
      : "<strong>Member access</strong><span>Profile, avatar, privacy, trading, posting, goals, chats, and collection editing are unlocked.</span>";
  }
  document.querySelectorAll("[data-member-required]").forEach((item) => {
    item.classList.toggle("guest-locked", locked);
    item.setAttribute("aria-disabled", String(locked));
  });
  if (!locked) window.CardLedgerCardSelectors?.sync?.();
}

function searchMatches(query, haystack) {
  const terms = text(query)
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  const target = text(haystack).toLowerCase();
  return terms.every((term) => target.includes(term));
}

function sectionSearchItems() {
  return [
    { kind: "Page", title: "Portfolio", meta: "Performance, profit, exposure, and liquidity", page: "portfolio", target: "#portfolioArea" },
    { kind: "Page", title: "Collection", meta: "Cards, imports, people, and photo entry", page: "collection", target: "#collectionArea" },
    { kind: "Tool", title: "Add a card", meta: "Manual fixed-format card entry", page: "collection", target: "#entryArea" },
    { kind: "Tool", title: "Imports", meta: "eBay, CardHobby, purchase import, and image sources", page: "collection", target: "#syncArea" },
    { kind: "Tool", title: "Photo import", meta: "Upload a card photo and confirm details", page: "collection", target: "#photoImportArea" },
    { kind: "Tool", title: "People", meta: "Friends, followers, public collectors, purchase requests", page: "collection", target: "#collectorsArea" },
    { kind: "Page", title: "DIY Cards", meta: "Original card library and creator marketplace", page: "diy", target: "#diyArea" },
    { kind: "Tool", title: "DIY Library", meta: "Browse DIY series, players, parallels, and editions", page: "diy", target: "#diyCatalogView" },
    { kind: "Tool", title: "Creator Market", meta: "Display, trade, or sell clearly labeled DIY cards", page: "diy", target: "#diyMarketView" },
    { kind: "Page", title: "Condition Check", meta: "Upload or scan a card for PSA and BGS pre-grade estimates", page: "condition", target: "#conditionArea" },
    { kind: "Page", title: "Goals", meta: "Collecting goals, missing cards, and alerts", page: "goals", target: "#goalAssistantArea" },
    { kind: "Tool", title: "Missing Cards", meta: "Goal assistant and target price watchlist", page: "goals", target: "#goalAssistantArea" },
    { kind: "Tool", title: "Alerts", meta: "eBay and CardHobby missing-card alerts", page: "goals", target: "#alertArea" },
    { kind: "Page", title: "Market", meta: "Values, recent sales, trend charts", page: "market", target: "#pricingLabArea" },
    { kind: "Page", title: "Community", meta: "Posts, likes, wants, comments, collectors", page: "community", target: "#communityArea" },
    { kind: "Page", title: "Trade", meta: "AI trade builder, trade posts, private deals", page: "trade", target: "#aiTradeArea" },
    { kind: "Tool", title: "AI Trade Builder", meta: "Propose equal card and cash trade deals", page: "trade", target: "#aiTradeArea" },
    { kind: "Tool", title: "Deals", meta: "Private trade and sale workflow", page: "trade", target: "#dealRoomArea" }
  ];
}

function allGlobalSearchItems() {
  const cardItems = cards.map((card) => ({
    kind: cardMatchesAnyGoal(card) ? "Goal Card" : "Card",
    title: fixedCardName(card),
    meta: [cardMeta(card), card.sport, money(estimatedCardValue(card)), card.location].filter(Boolean).join(" · "),
    haystack: Object.values(card).join(" "),
    page: "collection",
    target: "#collectionArea",
    action: "card",
    query: fixedCardName(card)
  }));
  const goalItems = goals.map((goal) => {
    const progress = goalProgress(goal);
    const valueStats = goalValueStats(goal);
    return {
      kind: "Goal",
      title: goal.title || [goal.season, goal.player, goal.setName].filter(Boolean).join(" ") || "Collection goal",
      meta: `${progress.owned}/${progress.total} collected · ${money(valueStats.complete)} complete estimate`,
      haystack: [goal.title, goal.season, goal.player, goal.setName, goal.parallel, goal.description, goalIncludedDescription(goal)].join(" "),
      page: "goals",
      target: "#goalArea",
      action: "goal"
    };
  });
  const alertItems = missingGoalSlots().slice(0, 80).map(({ goal, slotId, query }) => ({
    kind: "Missing",
    title: goalSlotLabel(goal, slotId),
    meta: [goal.title, query, `Target ${money(goalSlotEstimate(goal, slotId))}`].filter(Boolean).join(" · "),
    haystack: [goal.title, query, goalSlotLabel(goal, slotId)].join(" "),
    page: "goals",
    target: "#goalAssistantArea",
    action: "missing"
  }));
  const tradeItems = trades.map((trade) => ({
    kind: "Trade",
    title: trade.counterparty || trade.participants || "Trade post",
    meta: [trade.outgoing, trade.incoming, trade.notes, trade.status, money(numeric(trade.cashReceived) - numeric(trade.cashPaid))].filter(Boolean).join(" · "),
    haystack: [trade.counterparty, trade.participants, trade.outgoing, trade.incoming, trade.notes, trade.status, ...(trade.cards || [])].join(" "),
    page: "trade",
    target: "#tradeArea",
    action: "trade"
  }));
  const dealItems = dealRooms.map((deal) => ({
    kind: "Deal",
    title: deal.participants || "Private deal",
    meta: [deal.status, deal.cards, deal.notes].filter(Boolean).join(" · "),
    haystack: Object.values(deal).join(" "),
    page: "trade",
    target: "#dealRoomArea",
    action: "deal"
  }));
  const postItems = communityDisplayPosts().map((post) => ({
    kind: "Post",
    title: post.author || "Community post",
    meta: [post.intent, post.selectedCard?.name, post.note].filter(Boolean).join(" · "),
    haystack: [post.author, post.intent, post.selectedCard?.name, post.note, ...(post.cards || []), ...(post.comments || []).map((comment) => comment.text)].join(" "),
    page: "community",
    target: "#communityArea",
    action: "post",
    query: [post.author, post.note, post.selectedCard?.name].filter(Boolean).join(" ")
  }));
  const collectorItems = allViewableProfiles().map((profile) => ({
    kind: "Collector",
    title: profile.name || profile.email || "Collector",
    meta: [profile.location, profile.description, money(profile.value), `Score ${numeric(profile.score)}`].filter(Boolean).join(" · "),
    haystack: [profile.name, profile.email, profile.location, profile.description].join(" "),
    page: "community",
    target: "#communityArea",
    action: "collector",
    owner: profile.id,
    query: profile.name
  }));
  const diyItems = diyCards.map((card) => ({
    kind: "DIY Card",
    title: card.title || `${card.series} ${card.player}`,
    meta: [card.series, card.player, card.parallel, card.cardNumber, card.printRun ? `/${card.printRun}` : ""].filter(Boolean).join(" · "),
    haystack: [card.title, card.series, card.player, card.parallel, card.cardNumber, card.finish, card.description, card.ownerName].join(" "),
    page: "diy",
    target: "#diyArea",
    action: "diy",
    query: card.title || card.player
  }));
  const chatItems = chats.map((chat) => ({
    kind: "Chat",
    title: chat.participants.join(", "),
    meta: chat.messages.at(-1)?.text || "",
    haystack: [chat.participants.join(" "), ...(chat.messages || []).map((message) => `${message.author} ${message.text}`)].join(" "),
    page: "trade",
    target: "#dealRoomArea",
    action: "chat"
  }));
  return [...sectionSearchItems(), ...cardItems, ...diyItems, ...goalItems, ...alertItems, ...tradeItems, ...dealItems, ...postItems, ...collectorItems, ...chatItems];
}

function renderGlobalSearch() {
  if (!els.globalSearch || !els.globalSearchResults) return;
  const query = text(els.globalSearch.value);
  els.clearGlobalSearch?.classList.toggle("hidden", !query);
  if (!query) {
    currentGlobalSearchResults = [];
    els.globalSearchResults.classList.add("hidden");
    els.globalSearchResults.innerHTML = "";
    return;
  }
  currentGlobalSearchResults = allGlobalSearchItems()
    .filter((item) => searchMatches(query, [item.kind, item.title, item.meta, item.haystack].join(" ")))
    .slice(0, 12);
  els.globalSearchResults.classList.remove("hidden");
  els.globalSearchResults.innerHTML = currentGlobalSearchResults.length
    ? currentGlobalSearchResults
        .map(
          (item, index) => `
            <button class="global-result" type="button" role="option" data-global-result="${index}">
              <span>${escapeHtml(item.kind)}</span>
              <strong>${escapeHtml(item.title)}</strong>
              <small>${escapeHtml(item.meta || item.page)}</small>
            </button>
          `
        )
        .join("")
    : '<div class="global-search-empty">No matches found.</div>';
}

function openGlobalSearchResult(item) {
  if (!item) return;
  setActivePage(item.page);
  const focusedTargets = {
    "#collectionArea": ["collection", "browse"],
    "#entryArea": ["collection", "add"],
    "#syncArea": ["collection", "imports"],
    "#photoImportArea": ["collection", "photos"],
    "#collectorsArea": ["collection", "people"],
    "#goalArea": ["goals", "overview"],
    "#goalAssistantArea": ["goals", "missing"],
    "#alertArea": ["goals", "alerts"],
    "#aiTradeArea": ["trade", "builder"],
    "#dealRoomArea": ["trade", "deals"],
    "#tradeArea": ["trade", "history"]
  };
  const focusedTarget = focusedTargets[item.target];
  if (focusedTarget) setFocusWorkspaceView(focusedTarget[0], focusedTarget[1], { scroll: false });
  if (item.action === "card" && els.search) {
    els.search.value = item.query || item.title;
    collectionExpanded = true;
    render();
  }
  if (item.action === "post" && els.communityFeedSearch) {
    els.communityFeedSearch.value = item.query || item.title;
    renderCommunity();
  }
  if (item.action === "collector" && els.communityCollectorSearch) {
    els.communityCollectorSearch.value = item.query || item.title;
    selectedProfileId = item.owner || "";
    renderCommunity();
  }
  if (item.action === "diy") {
    const diySearch = document.querySelector("#diySearch");
    if (diySearch) diySearch.value = item.query || item.title;
    setDIYView("catalog");
    renderDIYMarketplace();
  }
  if ((item.action === "trade" || item.action === "deal" || item.action === "chat") && els.communityTradeSearch) {
    els.communityTradeSearch.value = item.title;
    renderCommunityTradePosts();
  }
  els.globalSearchResults?.classList.add("hidden");
  if (els.globalSearch) els.globalSearch.value = "";
  els.clearGlobalSearch?.classList.add("hidden");
  const target = document.querySelector(item.target || "#workspace");
  target?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function applyWorkspace() {
  els.workspacePanels.forEach((panel) => {
    const panelId = panel.dataset.panel;
    if (panelId === "installApp") {
      const canInstall = Boolean(deferredInstallPrompt);
      const visibleInstall = canInstall && activePage === "dashboard" && workspace.visible[panelId] !== false;
      panel.classList.toggle("hidden", !visibleInstall);
      panel.style.order = String(workspace.order.indexOf(panelId) + 1);
      return;
    }
    const belongsToPage = panelPage(panelId) === activePage;
    const visible = belongsToPage && !(panelId === "scan" && SCAN_PAUSED) && workspace.visible[panelId] !== false;
    panel.classList.toggle("hidden", !visible);
    panel.style.order = String(workspace.order.indexOf(panelId) + 1);
    panel.classList.remove("drag-over", "dragging-panel");
  });
  els.panelToggles.forEach((toggle) => {
    const panelId = toggle.dataset.panelToggle;
    const belongsToPage = panelPage(panelId) === activePage;
    const visible = belongsToPage && !(panelId === "scan" && SCAN_PAUSED) && workspace.visible[panelId] !== false;
    toggle.checked = visible;
    toggle.closest(".category-toggle")?.classList.toggle("hidden", !belongsToPage || (panelId === "scan" && SCAN_PAUSED));
    toggle.closest(".category-toggle")?.classList.toggle("active", visible);
  });
}

function movePanelBefore(sourcePanel, targetPanel) {
  if (!sourcePanel || !targetPanel || sourcePanel === targetPanel) return;
  const nextOrder = workspace.order.filter((panel) => panel !== sourcePanel);
  const targetIndex = nextOrder.indexOf(targetPanel);
  nextOrder.splice(targetIndex, 0, sourcePanel);
  workspace.order = nextOrder;
  saveWorkspace();
  applyWorkspace();
}

function finishPointerDrag(event) {
  if (!pointerDraggedPanel) return;
  const targetPanel = document.elementFromPoint(event.clientX, event.clientY)?.closest("[data-panel]")?.dataset.panel;
  movePanelBefore(pointerDraggedPanel, targetPanel);
  pointerDraggedPanel = "";
  document.body.classList.remove("workspace-dragging");
  applyWorkspace();
}

function setupWorkspaceControls() {
  els.workspacePanels.forEach((panel) => {
    if (panel.dataset.panel === "account") return;
    const heading = panel.dataset.panel === "diy" ? null : panel.querySelector(".section-heading, .collection-heading");
    if (heading && !heading.querySelector(".drag-handle")) {
      const handle = document.createElement("button");
      handle.className = "drag-handle";
      handle.type = "button";
      handle.draggable = true;
      handle.dataset.dragPanel = panel.dataset.panel;
      handle.title = "Move category";
      handle.setAttribute("aria-label", "Move category");
      handle.textContent = "⋮⋮";
      heading.prepend(handle);
    }

    panel.addEventListener("dragover", (event) => {
      if (!draggedPanel || draggedPanel === panel.dataset.panel) return;
      event.preventDefault();
      panel.classList.add("drag-over");
    });
    panel.addEventListener("dragleave", () => panel.classList.remove("drag-over"));
    panel.addEventListener("drop", (event) => {
      event.preventDefault();
      panel.classList.remove("drag-over");
      movePanelBefore(draggedPanel, panel.dataset.panel);
      draggedPanel = "";
    });
  });

  document.querySelectorAll(".drag-handle").forEach((handle) => {
    handle.addEventListener("pointerdown", (event) => {
      pointerDraggedPanel = handle.dataset.dragPanel;
      document.body.classList.add("workspace-dragging");
      Array.from(els.workspacePanels)
        .find((panel) => panel.dataset.panel === pointerDraggedPanel)
        ?.classList.add("dragging-panel");
      handle.setPointerCapture?.(event.pointerId);
      event.preventDefault();
    });
    handle.addEventListener("pointerup", finishPointerDrag);
    handle.addEventListener("pointercancel", () => {
      pointerDraggedPanel = "";
      document.body.classList.remove("workspace-dragging");
      applyWorkspace();
    });
    handle.addEventListener("dragstart", (event) => {
      draggedPanel = handle.dataset.dragPanel;
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", draggedPanel);
      Array.from(els.workspacePanels)
        .find((panel) => panel.dataset.panel === draggedPanel)
        ?.classList.add("dragging-panel");
    });
    handle.addEventListener("dragend", () => {
      draggedPanel = "";
      applyWorkspace();
    });
  });

  els.panelToggles.forEach((toggle) => {
    toggle.addEventListener("change", () => {
      if (toggle.disabled) return;
      workspace.visible[toggle.dataset.panelToggle] = toggle.checked;
      saveWorkspace();
      applyWorkspace();
    });
  });
}

function text(value) {
  return String(value || "").trim();
}

function numeric(value) {
  return Number.parseFloat(value) || 0;
}

function quantity(value) {
  return Math.max(1, Number.parseInt(value, 10) || 1);
}

function buildYearRange(startYear, endYear) {
  const start = Number.parseInt(startYear, 10);
  const parsedEnd = Number.parseInt(endYear, 10);
  const end = Number.isFinite(parsedEnd) ? parsedEnd : start;
  if (!Number.isFinite(start)) return [];
  const low = Math.min(start, end);
  const high = Math.max(start, end);
  return Array.from({ length: Math.min(high - low + 1, 60) }, (_, index) => String(low + index));
}

function buildNumberRange(startNumber, endNumber) {
  const start = Number.parseInt(startNumber, 10);
  const parsedEnd = Number.parseInt(endNumber, 10);
  const end = Number.isFinite(parsedEnd) ? parsedEnd : start;
  if (!Number.isFinite(start)) return [];
  const low = Math.min(start, end);
  const high = Math.max(start, end);
  return Array.from({ length: Math.min(high - low + 1, 500) }, (_, index) => `#${low + index}`);
}

function buildGoalFromForm() {
  const type = goalFields.type.value === "number" ? "number" : "year";
  const slotIds =
    type === "number"
      ? buildNumberRange(goalFields.startNumber.value, goalFields.endNumber.value)
      : buildYearRange(goalFields.startYear.value, goalFields.endYear.value);
  const titleFallback = [text(goalFields.season.value), text(goalFields.setName.value), text(goalFields.parallel.value), type === "number" ? "Checklist" : "Run"]
    .filter(Boolean)
    .join(" ");
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    title: text(goalFields.title.value) || titleFallback || "Collection Goal",
    type,
    player: text(goalFields.player.value),
    setName: text(goalFields.setName.value),
    parallel: text(goalFields.parallel.value),
    season: text(goalFields.season.value),
    startYear: type === "year" ? Number.parseInt(slotIds[0], 10) : numeric(goalFields.startYear.value),
    endYear: type === "year" ? Number.parseInt(slotIds.at(-1), 10) : numeric(goalFields.endYear.value),
    startNumber: type === "number" ? Number.parseInt(slotIds[0]?.replace("#", ""), 10) : 0,
    endNumber: type === "number" ? Number.parseInt(slotIds.at(-1)?.replace("#", ""), 10) : 0,
    notes: text(goalFields.notes.value),
    slots: slotIds.reduce((slots, slotId) => {
      slots[slotId] = { owned: false, image: "" };
      return slots;
    }, {})
  };
}

function goalSearchQuery(goal, slotId) {
  const number = goal.type === "number" ? slotId : "";
  const slotPlayer = goalSlotPlayer(goal, slotId);
  const year = goal.type === "number" ? goal.season : slotId;
  return [year, slotPlayer || goal.player, goal.setName, goal.parallel, number].filter(Boolean).join(" ");
}

function ebaySearchUrl(query) {
  return `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(query)}&_sop=10`;
}

function cardHobbySearchUrl(query) {
  return `https://www.cardhobby.com/search?q=${encodeURIComponent(query)}`;
}

function comcSearchUrl(query) {
  return `https://www.comc.com/Cards,sr,i100,=${encodeURIComponent(query)}`;
}

function sportsCardsProSearchUrl(query) {
  return `https://www.sportscardspro.com/search-products?q=${encodeURIComponent(query)}&type=prices`;
}

function hobbyCardIndexSearchUrl(query) {
  return `https://hobbycardindex.com/search?q=${encodeURIComponent(query)}`;
}

function goldinSearchUrl(query) {
  return `https://goldin.co/search?q=${encodeURIComponent(query)}`;
}

function fanaticsCollectSearchUrl(query) {
  return `https://collect.fanatics.com/search?q=${encodeURIComponent(query)}`;
}

function cardImageQuery(card) {
  return [card.year, card.brand, card.setName, card.player, card.type, card.parallel, card.cardNumber && `#${card.cardNumber}`]
    .filter(Boolean)
    .join(" ");
}

function imageSourceLinks(card) {
  const query = cardImageQuery(card);
  return [
    ["eBay", ebaySearchUrl(query)],
    ["COMC", comcSearchUrl(query)],
    ["CardHobby", cardHobbySearchUrl(query)],
    ["HobbyCardIndex", hobbyCardIndexSearchUrl(query)],
    ["SportsCardsPro", sportsCardsProSearchUrl(query)]
  ];
}

async function lookupCardImage(card) {
  if (!imageSettings.auto || card.image) return null;
  const query = cardImageQuery(card);
  let data;
  if (text(imageSettings.endpoint)) {
    const endpoint = imageSettings.endpoint.includes("{query}")
      ? imageSettings.endpoint.replaceAll("{query}", encodeURIComponent(query))
      : `${imageSettings.endpoint}${imageSettings.endpoint.includes("?") ? "&" : "?"}q=${encodeURIComponent(query)}`;
    const response = await fetch(endpoint, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`Image lookup failed: ${response.status}`);
    data = await response.json();
  } else if (connectedAccounts.ebay?.connected) {
    const response = await marketDataRequest("ebay-search", { query, limit: 1 });
    const item = response.items?.[0];
    data = item ? { imageUrl: item.imageUrl, sourceUrl: item.itemUrl, provider: "eBay Browse API" } : {};
  } else {
    return null;
  }
  const imageUrl = text(data.imageUrl || data.image || data.url);
  if (!/^https?:\/\//i.test(imageUrl) && !imageUrl.startsWith("data:image/")) return null;
  return {
    image: imageUrl,
    imageSourceUrl: text(data.sourceUrl || data.itemUrl || data.pageUrl),
    imageProvider: text(data.provider || data.source || "Image API")
  };
}

async function attachCardImage(card) {
  try {
    const result = await lookupCardImage(card);
    if (!result) return card;
    return {
      ...card,
      ...result,
      notes: [card.notes, `Image matched by ${result.imageProvider}.`].filter(Boolean).join(" ")
    };
  } catch (error) {
    if (els.imageLookupStatus) els.imageLookupStatus.textContent = error.message;
    return card;
  }
}

function buildCardFromForm() {
  const now = new Date().toISOString();
  const existing = cards.find((card) => card.id === fields.id.value);
  return {
    id: fields.id.value || crypto.randomUUID(),
    createdAt: existing?.createdAt || now,
    updatedAt: now,
    player: catalogFieldValue("player"),
    sport: text(fields.sport.value),
    year: text(fields.year.value),
    brand: catalogFieldValue("brand"),
    setName: catalogFieldValue("setName"),
    type: text(fields.type.value),
    cardNumber: text(fields.cardNumber.value),
    parallel: text(fields.parallel.value),
    condition: text(fields.condition.value),
    grade: text(fields.grade.value),
    certification: text(fields.certification.value),
    psaPopulation: pendingPsaPopulation || existing?.psaPopulation || null,
    quantity: quantity(fields.quantity.value),
    paid: numeric(fields.paid.value),
    value: numeric(fields.value.value),
    location: text(fields.location.value),
    notes: text(fields.notes.value),
    image: existing?.image || pendingScannedCardImage || "",
    imageSourceUrl: existing?.imageSourceUrl || "",
    imageProvider: existing?.imageProvider || (pendingScannedCardImage ? "Uploaded card scan" : "")
  };
}

function catalogFieldValue(key) {
  const select = fields[key];
  if (!select) return "";
  return select.value === "__custom__" ? text(catalogCustomFields[key]?.value) : text(select.value);
}

function knownCardBrands() {
  return new Set((window.CARD_SET_CATALOG || []).map((entry) => text(entry.brand).toLowerCase()).filter(Boolean));
}

function inferBrandFromSetName(setName) {
  const source = text(setName);
  const match = [...knownCardBrands()].sort((a, b) => b.length - a.length).find((brand) => source.toLowerCase() === brand || source.toLowerCase().startsWith(`${brand} `));
  return match ? (window.CARD_SET_CATALOG || []).find((entry) => text(entry.brand).toLowerCase() === match)?.brand || match : "";
}

function fixedCardName(card) {
  const brand = text(card.brand);
  const setName = text(card.setName);
  const showBrand = brand && !setName.toLowerCase().startsWith(brand.toLowerCase());
  return [card.year, showBrand ? brand : "", setName, card.player, card.type, card.parallel, card.cardNumber && `#${card.cardNumber}`]
    .filter(Boolean)
    .join(" ");
}

function parseFixedCardParts(line, options = {}) {
  const parts = text(line).split("|").map(text);
  if (parts.length < 6) return null;
  const hasBrandColumn = parts.length >= 7 && knownCardBrands().has(text(parts[1]).toLowerCase());
  const [year, brand, setName, player, cardType, parallel, cardNumber, ...rest] = hasBrandColumn
    ? parts
    : [parts[0], "", ...parts.slice(1)];
  if (!year || !setName || !player) return null;
  const card = {
    year,
    brand,
    setName,
    player,
    type: cardType,
    parallel,
    cardNumber: cardNumber.replace(/^#/, "")
  };
  if (options.withValue) {
    card.value = numeric(rest[0]);
    card.extra = rest.slice(1);
  } else {
    card.extra = rest;
  }
  return card;
}

function buildCardsFromFixedFormat(value) {
  const now = new Date().toISOString();
  return text(value)
    .split(/\n+/)
    .map((line) => {
      const parsed = parseFixedCardParts(line);
      if (!parsed) return null;
      const [sport, condition, grade, qty, paid, cardValue, location, ...noteParts] = parsed.extra;
      return {
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
        player: parsed.player,
        sport: sport || "Basketball",
        year: parsed.year,
        brand: parsed.brand,
        setName: parsed.setName,
        type: parsed.type,
        cardNumber: parsed.cardNumber,
        parallel: parsed.parallel,
        condition: condition || "Raw",
        grade,
        quantity: quantity(qty),
        paid: numeric(paid),
        value: numeric(cardValue),
        location,
        notes: noteParts.join(" | ")
      };
    })
    .filter(Boolean);
}

function purchaseKeyFor(card) {
  return [card.purchasePlatform, card.purchaseOrderId, card.year, card.brand, card.setName, card.player, card.type, card.parallel, card.cardNumber]
    .map((part) => text(part).toLowerCase())
    .join("|");
}

function buildCardsFromPurchaseImport(value) {
  const now = new Date().toISOString();
  return text(value)
    .split(/\n+/)
    .map((line) => {
      const parsed = parseFixedCardParts(line);
      if (!parsed) return null;
      const [sport, condition, grade, qty, paid, cardValue, platform, orderId, purchaseDate, location, ...noteParts] = parsed.extra;
      const source = text(platform || "Manual purchase import");
      const order = text(orderId);
      const date = text(purchaseDate) || now.slice(0, 10);
      return {
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
        player: parsed.player,
        sport: sport || "Basketball",
        year: parsed.year,
        brand: parsed.brand,
        setName: parsed.setName,
        type: parsed.type,
        cardNumber: parsed.cardNumber,
        parallel: parsed.parallel,
        condition: condition || "Raw",
        grade,
        quantity: quantity(qty),
        paid: numeric(paid),
        value: numeric(cardValue),
        location: location || source,
        purchasePlatform: source,
        purchaseOrderId: order,
        purchaseDate: date,
        notes: [`Imported from ${source}${order ? ` order ${order}` : ""} on ${date}.`, noteParts.join(" | ")].filter(Boolean).join(" ")
      };
    })
    .filter(Boolean);
}

function compactConditionEstimate(result, extras = {}) {
  if (!result) return null;
  return {
    ...result,
    ...extras,
    sides: result.sides.map((side) => ({
      side: side.side,
      width: side.width,
      height: side.height,
      quality: Math.round(side.quality),
      horizontalRatio: Math.round(side.horizontalRatio),
      verticalRatio: Math.round(side.verticalRatio)
    }))
  };
}

function photoImportParsedCard() {
  return buildCardsFromFixedFormat(photoImportFields.line?.value || "")[0] || null;
}

function setPhotoImportPopulation(message, { state = "idle", icon = "database", html = "" } = {}) {
  const target = photoImportFields.population;
  if (!target) return;
  target.classList.toggle("is-found", state === "found");
  target.classList.toggle("is-error", state === "error");
  target.innerHTML = `<span class="material-symbols-outlined" aria-hidden="true">${escapeHtml(icon)}</span><p>${html || escapeHtml(message)}</p>`;
}

function renderPhotoImportAssessment() {
  const result = photoImportConditionResult;
  photoImportFields.assessment?.classList.toggle("has-result", Boolean(result));
  if (photoImportFields.estimatedPsa) photoImportFields.estimatedPsa.textContent = result ? result.psa : "--";
  if (photoImportFields.estimatedBgs) photoImportFields.estimatedBgs.textContent = result ? result.bgs : "--";
  if (photoImportFields.confidence) photoImportFields.confidence.textContent = result ? `${result.confidence}%` : "--";
  if (photoImportFields.analysisState && !photoImportFields.assessment?.classList.contains("is-analyzing")) {
    photoImportFields.analysisState.textContent = result
      ? conditionLocale(`${result.sides.length} side${result.sides.length === 1 ? "" : "s"} checked · ${conditionConfidenceLabel(result.confidence)}`, `${result.sides.length} 面已检测 · ${conditionConfidenceLabel(result.confidence)}`)
      : conditionLocale("Add a front photo to begin.", "上传正面照片后自动开始分析。");
  }
}

function syncPhotoImportControls() {
  const hasIdentity = Boolean(photoImportParsedCard());
  if (photoImportFields.insert) photoImportFields.insert.disabled = !isMember() || !photoImportImages.front || !photoImportConditionResult || !hasIdentity || photoImportFields.assessment?.classList.contains("is-analyzing");
  if (photoImportFields.refreshPopulation) photoImportFields.refreshPopulation.disabled = !isMember() || !photoImportConditionResult || !hasIdentity;
}

async function lookupPhotoImportPopulation({ force = false } = {}) {
  const token = ++photoImportPopulationToken;
  const card = photoImportParsedCard();
  photoImportPopulationReference = null;
  if (!photoImportConditionResult) {
    setPhotoImportPopulation(conditionLocale("Population lookup starts after the condition check.", "品相分析完成后将自动查询评级数量。"));
    syncPhotoImportControls();
    return null;
  }
  if (!card) {
    setPhotoImportPopulation(conditionLocale("Confirm a valid card identity to search PSA population.", "请确认有效的卡片信息后查询 PSA 评级数量。"), { icon: "edit_note" });
    syncPhotoImportControls();
    return null;
  }
  const cloudPopulationReady = supabaseReady() && Boolean(text(supabaseSettings.accessToken));
  const officialPsa = isPsaGrade(card.grade);
  const grade = officialPsa ? psaGradeNumber(card.grade) : numeric(photoImportConditionResult.psa);
  const lookupCard = { ...card, grade: `PSA ${grade}` };
  setPhotoImportPopulation(conditionLocale(`Searching PSA population for grade ${grade}...`, `正在查询 PSA ${grade} 的评级数量……`), { icon: "progress_activity" });
  if (photoImportFields.refreshPopulation) photoImportFields.refreshPopulation.disabled = true;
  try {
    const records = await searchPsaPopulationRecords(psaIdentityQuery(lookupCard), force ? 50 : 30);
    if (token !== photoImportPopulationToken) return null;
    const population = records.find((record) => psaPopulationMatchesCard(record, lookupCard) && record.grade === grade) || null;
    photoImportPopulationReference = population;
    if (!population) {
      const cloudHint = cloudPopulationReady ? "" : conditionLocale(" Connect Supabase to search beyond the offline index.", " 连接 Supabase 后可查询更完整的云端数据库。 ");
      setPhotoImportPopulation(conditionLocale(`No indexed PSA ${grade} population record matched this identity yet.`, `当前数据库中暂未找到与此卡对应的 PSA ${grade} POP 记录。`) + cloudHint, { icon: "search_off" });
      return null;
    }
    const basis = officialPsa ? conditionLocale("Confirmed PSA grade", "已确认 PSA 评级") : conditionLocale("Estimated-grade reference", "预估评级参考");
    setPhotoImportPopulation("", {
      state: "found",
      icon: "verified",
      html: `<strong>${escapeHtml(basis)} · PSA ${escapeHtml(grade)}</strong><br>POP ${population.populationAtGrade.toLocaleString()} · ${population.populationHigher.toLocaleString()} ${escapeHtml(conditionLocale("higher", "更高分"))}${population.populationTotal == null ? "" : ` · ${population.populationTotal.toLocaleString()} ${escapeHtml(conditionLocale("total", "总计"))}`}`
    });
    return population;
  } catch (error) {
    if (token !== photoImportPopulationToken) return null;
    setPhotoImportPopulation(conditionLocale(`Population lookup unavailable: ${error.message}`, `POP 查询暂不可用：${error.message}`), { state: "error", icon: "cloud_off" });
    return null;
  } finally {
    if (token === photoImportPopulationToken) syncPhotoImportControls();
  }
}

function schedulePhotoImportPopulationLookup() {
  window.clearTimeout(photoImportPopulationTimer);
  photoImportPopulationReference = null;
  if (photoImportConditionResult) {
    setPhotoImportPopulation(conditionLocale("Card identity changed. Updating the population match...", "卡片信息已更改，正在更新 POP 匹配……"), { icon: "progress_activity" });
  }
  photoImportPopulationTimer = window.setTimeout(() => lookupPhotoImportPopulation(), 420);
  syncPhotoImportControls();
}

async function analyzePhotoImportImages() {
  const token = ++photoImportAnalysisToken;
  photoImportConditionResult = null;
  photoImportPopulationReference = null;
  if (!photoImportImages.front) {
    renderPhotoImportAssessment();
    setPhotoImportPopulation(conditionLocale("Population lookup starts after a photo and card identity are ready.", "照片和卡片信息准备好后将自动查询 POP。"));
    syncPhotoImportControls();
    return;
  }
  photoImportFields.assessment?.classList.add("is-analyzing");
  if (photoImportFields.analysisState) photoImportFields.analysisState.textContent = conditionLocale("Analyzing centering, corners, edges, and surface visibility...", "正在分析居中、角、边和表面可见度……");
  if (els.photoImportStatus) els.photoImportStatus.textContent = conditionLocale("Running automatic condition check...", "正在自动检测品相……");
  syncPhotoImportControls();
  try {
    const sides = await Promise.all([
      analyzeConditionImage(photoImportImages.front, "front"),
      photoImportImages.back ? analyzeConditionImage(photoImportImages.back, "back") : null
    ].filter(Boolean));
    if (token !== photoImportAnalysisToken) return;
    photoImportConditionResult = buildConditionResult(sides);
    renderPhotoImportAssessment();
    if (els.photoImportStatus) els.photoImportStatus.textContent = conditionLocale("Pre-grade ready. Confirm the card identity while population lookup runs.", "预评级已生成；请确认卡片信息，系统将自动查询 POP。 ");
    await lookupPhotoImportPopulation();
  } catch (error) {
    if (token !== photoImportAnalysisToken) return;
    if (photoImportFields.analysisState) photoImportFields.analysisState.textContent = conditionLocale(`Analysis failed: ${error.message}`, `分析失败：${error.message}`);
    if (els.photoImportStatus) els.photoImportStatus.textContent = conditionLocale("Use a clear, evenly lit card photo and try again.", "请使用清晰、光线均匀的卡片照片后重试。 ");
  } finally {
    if (token === photoImportAnalysisToken) {
      photoImportFields.assessment?.classList.remove("is-analyzing");
      renderPhotoImportAssessment();
      syncPhotoImportControls();
    }
  }
}

async function handlePhotoImportImage(side, input, preview) {
  const image = await readImageFile(input);
  if (!image) return;
  photoImportImages[side] = image;
  if (preview) {
    preview.src = image;
    preview.classList.remove("hidden");
  }
  await analyzePhotoImportImages();
}

function buildPhotoImportedCard(image, backImage = "") {
  const [card] = buildCardsFromFixedFormat(photoImportFields.line.value);
  if (!card) return null;
  const conditionEstimate = compactConditionEstimate(photoImportConditionResult, photoImportPopulationReference ? { populationReference: photoImportPopulationReference } : {});
  return {
    ...card,
    image,
    backImage,
    conditionEstimate,
    ...(isPsaGrade(card.grade) && photoImportPopulationReference ? { psaPopulation: photoImportPopulationReference } : {}),
    location: card.location || "Photo import",
    notes: [card.notes, "Inserted from photo import after identity confirmation and automatic pre-grade."].filter(Boolean).join(" ")
  };
}

async function insertPhotoImportedCard() {
  if (!requireMember("insert photo-scanned cards")) return;
  if (!photoImportImages.front || !photoImportConditionResult) {
    els.photoImportStatus.textContent = conditionLocale("Add a front photo and wait for the pre-grade.", "请添加正面照片并等待预评级完成。 ");
    return;
  }
  let card = buildPhotoImportedCard(photoImportImages.front, photoImportImages.back);
  if (!card) {
    els.photoImportStatus.textContent = conditionLocale("Add one valid fixed-format card line.", "请填写一条有效的固定格式卡片信息。 ");
    return;
  }
  if (isPsaGrade(card.grade) && !card.psaPopulation) card = await attachPsaPopulation(card);
  cards.unshift(card);
  saveCards();
  syncGoalSlotsFromCard(card);
  const insertedMessage = card.psaPopulation
    ? conditionLocale(`Card inserted · estimated PSA ${card.conditionEstimate.psa} · POP ${card.psaPopulation.populationAtGrade.toLocaleString()}`, `卡片已入库 · 预估 PSA ${card.conditionEstimate.psa} · POP ${card.psaPopulation.populationAtGrade.toLocaleString()}`)
    : card.conditionEstimate?.populationReference
      ? conditionLocale(`Card inserted · estimated PSA ${card.conditionEstimate.psa} · reference POP ${card.conditionEstimate.populationReference.populationAtGrade.toLocaleString()}`, `卡片已入库 · 预估 PSA ${card.conditionEstimate.psa} · 参考 POP ${card.conditionEstimate.populationReference.populationAtGrade.toLocaleString()}`)
      : conditionLocale(`Card inserted · estimated PSA ${card.conditionEstimate.psa} · population pending`, `卡片已入库 · 预估 PSA ${card.conditionEstimate.psa} · POP 待补充`);
  clearPhotoImport();
  collectionExpanded = true;
  render();
  els.photoImportStatus.textContent = insertedMessage;
}

function clearPhotoImport() {
  photoImportAnalysisToken += 1;
  photoImportPopulationToken += 1;
  window.clearTimeout(photoImportPopulationTimer);
  photoImportImages = { front: "", back: "" };
  photoImportConditionResult = null;
  photoImportPopulationReference = null;
  if (photoImportFields.file) photoImportFields.file.value = "";
  if (photoImportFields.backFile) photoImportFields.backFile.value = "";
  if (photoImportFields.line) photoImportFields.line.value = "";
  [photoImportFields.preview, photoImportFields.backPreview].forEach((preview) => {
    if (!preview) return;
    preview.src = "";
    preview.classList.add("hidden");
  });
  photoImportFields.assessment?.classList.remove("is-analyzing", "has-result");
  renderPhotoImportAssessment();
  setPhotoImportPopulation(conditionLocale("Population lookup starts after a photo and card identity are ready.", "照片和卡片信息准备好后将自动查询 POP。"));
  syncPhotoImportControls();
  if (els.photoImportStatus) els.photoImportStatus.textContent = "";
}

function buildDealRoomFromForm() {
  return {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    participants: text(dealRoomFields.participants.value),
    type: text(dealRoomFields.type.value),
    status: text(dealRoomFields.status.value),
    mine: text(dealRoomFields.mine.value),
    theirs: text(dealRoomFields.theirs.value),
    cashPaid: numeric(dealRoomFields.cashPaid.value),
    cashReceived: numeric(dealRoomFields.cashReceived.value),
    notes: text(dealRoomFields.notes.value)
  };
}

async function connectProvider(provider) {
  if (!requireMember("connect marketplace accounts")) return;
  if (!connectedAccounts[provider]) return;
  const label = provider === "ebay" ? "eBay" : "CardHobby";
  if (els.purchaseSyncStatus) els.purchaseSyncStatus.textContent = `Checking ${label} server configuration...`;
  try {
    const status = await marketDataRequest("provider-status");
    if (provider === "ebay") {
      if (status.ebay?.connected) {
        connectedAccounts.ebay = { ...connectedAccounts.ebay, connected: true, connectedAt: connectedAccounts.ebay.connectedAt || new Date().toISOString() };
        if (els.purchaseSyncStatus) els.purchaseSyncStatus.textContent = "eBay seller sales are connected. Use Sync eBay sales to download completed orders.";
      } else {
        if (!status.ebay?.oauthConfigured) throw new Error("eBay OAuth is not configured on the Supabase Edge Function yet.");
        const returnUrl = /^https?:$/.test(location.protocol) ? location.href : "";
        const oauth = await marketDataRequest("ebay-oauth-start", { returnUrl });
        if (!oauth.authorizeUrl) throw new Error("eBay did not return an authorization URL.");
        if (els.purchaseSyncStatus) els.purchaseSyncStatus.textContent = "Opening eBay authorization...";
        location.assign(oauth.authorizeUrl);
        return;
      }
    } else if (status.cardhobby?.configured || status.cardhobby?.salesConfigured) {
      const now = new Date().toISOString();
      connectedAccounts.cardhobby = { ...connectedAccounts.cardhobby, connected: true, connectedAt: now };
      if (els.purchaseSyncStatus) els.purchaseSyncStatus.textContent = "CardHobby approved partner adapter is available.";
    } else {
      connectedAccounts.cardhobby = { ...connectedAccounts.cardhobby, connected: false };
      if (els.purchaseSyncStatus) els.purchaseSyncStatus.textContent = "CardHobby has no documented public account API. Export your completed sales and use the CSV/JSON importer above.";
    }
  } catch (error) {
    connectedAccounts[provider] = { ...connectedAccounts[provider], connected: false };
    if (els.purchaseSyncStatus) els.purchaseSyncStatus.textContent = error.message;
  }
  saveConnectedAccounts();
  renderConnectedAccounts();
}

async function disconnectProvider(provider) {
  if (!requireMember("manage connected marketplace accounts")) return;
  if (!connectedAccounts[provider]) return;
  try {
    await marketDataRequest("provider-disconnect", { provider });
  } catch {
    // Local disconnect still clears the visible state when the server is unavailable.
  }
  connectedAccounts[provider] = { connected: false, connectedAt: "", lastSyncAt: "" };
  saveConnectedAccounts();
  if (els.purchaseSyncStatus) els.purchaseSyncStatus.textContent = `${provider === "ebay" ? "eBay" : "CardHobby"} disconnected`;
  renderConnectedAccounts();
}

async function importConnectedPurchases() {
  if (!requireMember("import purchases into your collection")) return;
  const importedCards = buildCardsFromPurchaseImport(purchaseSyncFields.input.value);
  if (!importedCards.length) {
    els.purchaseSyncStatus.textContent = "No valid purchase rows found";
    return;
  }
  const existingKeys = new Set([
    ...cards.map(purchaseKeyFor),
    ...(connectedAccounts.importedPurchases || [])
  ]);
  let uniqueCards = importedCards.filter((card) => {
    const key = purchaseKeyFor(card);
    if (existingKeys.has(key)) return false;
    existingKeys.add(key);
    return true;
  });
  if (!uniqueCards.length) {
    els.purchaseSyncStatus.textContent = "All purchase rows were already imported";
    return;
  }
  uniqueCards = await Promise.all(uniqueCards.map(async (card) => attachCardImage(await attachPsaPopulation(card))));
  cards = [...uniqueCards, ...cards];
  uniqueCards.forEach(syncGoalSlotsFromCard);
  const now = new Date().toISOString();
  connectedAccounts.importedPurchases = Array.from(existingKeys);
  uniqueCards.forEach((card) => {
    const provider = text(card.purchasePlatform).toLowerCase();
    if (provider.includes("ebay")) connectedAccounts.ebay.lastSyncAt = now;
    if (provider.includes("cardhobby") || provider.includes("card hobby")) connectedAccounts.cardhobby.lastSyncAt = now;
  });
  saveCards();
  saveConnectedAccounts();
  purchaseSyncFields.input.value = "";
  els.purchaseSyncStatus.textContent = `${uniqueCards.length} purchase${uniqueCards.length === 1 ? "" : "s"} imported`;
  collectionExpanded = true;
  render();
}

function renderConnectedAccounts() {
  if (els.imageApiEndpoint) els.imageApiEndpoint.value = imageSettings.endpoint;
  if (els.autoImageLookup) els.autoImageLookup.checked = imageSettings.auto;
  if (els.auctionApiEndpoint) els.auctionApiEndpoint.value = auctionSettings.endpoint;
  if (els.auctionMinValue) els.auctionMinValue.value = auctionSettings.minValue;
  if (els.auctionSourceList) {
    els.auctionSourceList.innerHTML = PREMIUM_MARKET_SOURCES.map((source) => `<span>${source === "alt" ? "ALT" : source[0].toUpperCase() + source.slice(1)}</span>`).join("");
  }
  const statusText = (provider) => {
    const account = connectedAccounts[provider];
    if (!account?.connected) return "Not connected";
    const synced = account.lastSyncAt ? ` · Last import ${new Date(account.lastSyncAt).toLocaleDateString()}` : "";
    return `Connected ${new Date(account.connectedAt || new Date()).toLocaleDateString()}${synced}`;
  };
  if (els.ebayConnectionStatus) els.ebayConnectionStatus.textContent = statusText("ebay");
  if (els.cardhobbyConnectionStatus) els.cardhobbyConnectionStatus.textContent = statusText("cardhobby");
  if (!els.syncHistory) return;
  const imported = cards
    .filter((card) => card.purchasePlatform)
    .slice(0, 8);
  els.syncHistory.innerHTML = imported.length
    ? imported
        .map(
          (card) => `
            <article class="sync-history-row">
              <span>${escapeHtml(card.purchasePlatform)}</span>
              <strong>${escapeHtml(fixedCardName(card))}</strong>
              <small>${escapeHtml([card.purchaseDate, card.purchaseOrderId && `Order ${card.purchaseOrderId}`, money(card.paid)].filter(Boolean).join(" · "))}</small>
            </article>
          `
        )
        .join("")
    : '<div class="trade-empty">No connected-account purchases imported yet.</div>';
}

async function lookupPremiumAuctionSales(card) {
  if (!text(auctionSettings.endpoint) || estimatedCardValue(card) < numeric(auctionSettings.minValue)) return [];
  const query = trendSearchQuery(card);
  const endpoint = auctionSettings.endpoint.includes("{query}")
    ? auctionSettings.endpoint.replaceAll("{query}", encodeURIComponent(query))
    : `${auctionSettings.endpoint}${auctionSettings.endpoint.includes("?") ? "&" : "?"}q=${encodeURIComponent(query)}`;
  const response = await fetch(endpoint, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Premium auction lookup failed: ${response.status}`);
  const data = await response.json();
  const rows = Array.isArray(data) ? data : Array.isArray(data.sales) ? data.sales : [];
  return rows
    .map((sale) => ({
      date: text(sale.date || sale.soldAt || sale.endDate),
      value: numeric(sale.value || sale.priceRmb || sale.price),
      source: text(sale.source || sale.platform).toLowerCase(),
      label: text(sale.label || sale.title || sale.lot)
    }))
    .filter((sale) => sale.value > 0 && PREMIUM_MARKET_SOURCES.includes(sale.source));
}

async function refreshPremiumAuctionComps() {
  if (!requireMember("refresh premium auction comps")) return;
  if (!text(auctionSettings.endpoint)) {
    if (els.auctionLookupStatus) els.auctionLookupStatus.textContent = "Add a premium auction sales endpoint first.";
    return;
  }
  const highValueCards = cards.filter((card) => estimatedCardValue(card) >= numeric(auctionSettings.minValue)).slice(0, 12);
  let added = 0;
  for (const card of highValueCards) {
    try {
      const sales = await lookupPremiumAuctionSales(card);
      if (!sales.length) continue;
      const existing = new Set(sortedSales(card).map((sale) => [sale.source, sale.date, Math.round(sale.value)].join("|")));
      const fresh = sales.filter((sale) => !existing.has([sale.source, sale.date, Math.round(sale.value)].join("|")));
      if (!fresh.length) continue;
      card.marketSales = [...(card.marketSales || []), ...fresh];
      added += fresh.length;
    } catch (error) {
      if (els.auctionLookupStatus) els.auctionLookupStatus.textContent = error.message;
      return;
    }
  }
  auctionSettings.lastSyncAt = new Date().toISOString();
  saveCards();
  saveAuctionSettings();
  render();
  if (els.auctionLookupStatus) els.auctionLookupStatus.textContent = `${added} premium auction sale${added === 1 ? "" : "s"} added.`;
}

function conditionLocale(english, chinese) {
  return currentLanguage === "zh-CN" ? chinese : english;
}

function conditionClamp(value, minimum = 0, maximum = 100) {
  return Math.min(maximum, Math.max(minimum, Number(value) || 0));
}

function conditionGradeLabel(grade, company = "psa") {
  if (company === "bgs") {
    if (grade >= 10) return conditionLocale("Pristine", "极致完美");
    if (grade >= 9.5) return conditionLocale("Gem Mint", "完美");
    if (grade >= 9) return conditionLocale("Mint", "薄荷级");
    if (grade >= 8.5) return "NM-MT+";
    if (grade >= 8) return "NM-MT";
    if (grade >= 7) return conditionLocale("Near Mint", "近完美");
    return conditionLocale("Collector grade", "收藏级");
  }
  if (grade >= 10) return conditionLocale("Gem Mint", "完美");
  if (grade >= 9) return conditionLocale("Mint", "薄荷级");
  if (grade >= 8) return "NM-MT";
  if (grade >= 7) return conditionLocale("Near Mint", "近完美");
  if (grade >= 6) return "EX-MT";
  if (grade >= 5) return conditionLocale("Excellent", "优秀");
  return conditionLocale("Collector grade", "收藏级");
}

function conditionScoreToBgs(score) {
  return conditionClamp(Math.round((1 + conditionClamp(score) * 0.09) * 2) / 2, 1, 10);
}

function conditionScoreToPsa(score, weakestScore, confidence) {
  const thresholds = [[97, 10], [91, 9], [84, 8], [76, 7], [68, 6], [60, 5], [51, 4], [42, 3], [30, 2], [0, 1]];
  let grade = thresholds.find(([minimum]) => score >= minimum)?.[1] || 1;
  if (weakestScore < 72) grade = Math.min(grade, 6);
  if (weakestScore < 60) grade = Math.min(grade, 4);
  if (confidence < 45) grade = Math.min(grade, 8);
  return grade;
}

function conditionImageFromDataUrl(source) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(conditionLocale("The image could not be read.", "无法读取该图片。")));
    image.src = source;
  });
}

function conditionProfilePeak(profile, start, end) {
  let peakIndex = start;
  let peakValue = -1;
  let total = 0;
  let count = 0;
  for (let index = start; index <= end; index += 1) {
    const value = profile[index] || 0;
    total += value;
    count += 1;
    if (value > peakValue) {
      peakValue = value;
      peakIndex = index;
    }
  }
  const average = total / Math.max(1, count);
  return { index: peakIndex, value: peakValue, confidence: conditionClamp(((peakValue / Math.max(1, average)) - 1) * 36) };
}

async function analyzeConditionImage(source, side) {
  const image = await conditionImageFromDataUrl(source);
  const scale = Math.min(1, 720 / Math.max(image.naturalWidth, image.naturalHeight));
  const width = Math.max(120, Math.round(image.naturalWidth * scale));
  const height = Math.max(168, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  context.drawImage(image, 0, 0, width, height);
  const pixels = context.getImageData(0, 0, width, height).data;
  const luma = new Float32Array(width * height);
  let sum = 0;
  let sumSquares = 0;
  let highlights = 0;
  let shadows = 0;
  let saturation = 0;
  for (let index = 0, pixel = 0; index < pixels.length; index += 4, pixel += 1) {
    const red = pixels[index];
    const green = pixels[index + 1];
    const blue = pixels[index + 2];
    const value = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
    luma[pixel] = value;
    sum += value;
    sumSquares += value * value;
    if (value > 246) highlights += 1;
    if (value < 12) shadows += 1;
    saturation += Math.max(red, green, blue) - Math.min(red, green, blue);
  }
  const sampleCount = width * height;
  const mean = sum / sampleCount;
  const deviation = Math.sqrt(Math.max(0, sumSquares / sampleCount - mean * mean));
  const highlightRate = highlights / sampleCount;
  const shadowRate = shadows / sampleCount;
  const saturationMean = saturation / sampleCount;

  let gradientTotal = 0;
  let gradientCount = 0;
  const columnProfile = new Float32Array(width);
  const rowProfile = new Float32Array(height);
  for (let y = 1; y < height - 1; y += 2) {
    for (let x = 1; x < width - 1; x += 2) {
      const index = y * width + x;
      const dx = Math.abs(luma[index + 1] - luma[index - 1]);
      const dy = Math.abs(luma[index + width] - luma[index - width]);
      gradientTotal += dx + dy;
      gradientCount += 2;
      columnProfile[x] += dx;
      rowProfile[y] += dy;
    }
  }
  const gradientMean = gradientTotal / Math.max(1, gradientCount);
  const focusScore = conditionClamp((gradientMean - 1.7) * 10.5);
  const resolutionScore = conditionClamp((Math.min(image.naturalWidth, image.naturalHeight) / 1100) * 100);
  const exposureScore = conditionClamp(100 - Math.abs(mean - 132) * 0.72 - highlightRate * 360 - shadowRate * 110);
  const quality = conditionClamp(resolutionScore * 0.34 + focusScore * 0.42 + exposureScore * 0.24);

  const leftPeak = conditionProfilePeak(columnProfile, Math.round(width * 0.035), Math.round(width * 0.28));
  const rightPeak = conditionProfilePeak(columnProfile, Math.round(width * 0.72), Math.round(width * 0.965));
  const topPeak = conditionProfilePeak(rowProfile, Math.round(height * 0.035), Math.round(height * 0.28));
  const bottomPeak = conditionProfilePeak(rowProfile, Math.round(height * 0.72), Math.round(height * 0.965));
  const leftInset = leftPeak.index;
  const rightInset = width - 1 - rightPeak.index;
  const topInset = topPeak.index;
  const bottomInset = height - 1 - bottomPeak.index;
  const horizontalRatio = 100 * Math.min(leftInset, rightInset) / Math.max(1, leftInset + rightInset);
  const verticalRatio = 100 * Math.min(topInset, bottomInset) / Math.max(1, topInset + bottomInset);
  const borderConfidence = (leftPeak.confidence + rightPeak.confidence + topPeak.confidence + bottomPeak.confidence) / 4;
  const centering = borderConfidence < 24
    ? 84
    : conditionClamp(100 - Math.max(Math.abs(50 - horizontalRatio) * 2.8, Math.abs(50 - verticalRatio) * 2.5));

  const clarity = quality / 100;
  const glarePenalty = conditionClamp(highlightRate * 520);
  const cornerVisibilityPenalty = conditionClamp((1 - clarity) * 16 + glarePenalty * 0.18);
  const corners = conditionClamp(94 - cornerVisibilityPenalty, 62, 98);
  const edges = conditionClamp(92 - (1 - clarity) * 14 - Math.max(0, deviation - 82) * 0.05, 60, 98);
  const surface = conditionClamp(89 + focusScore * 0.08 + exposureScore * 0.04 - glarePenalty * 0.55 - Math.max(0, shadowRate - 0.14) * 80, 55, 98);

  return {
    side,
    width: image.naturalWidth,
    height: image.naturalHeight,
    quality,
    focusScore,
    exposureScore,
    highlightRate,
    shadowRate,
    saturationMean,
    borderConfidence,
    horizontalRatio,
    verticalRatio,
    scores: { centering, corners, edges, surface }
  };
}

function combineConditionMetric(sides, metric) {
  if (!sides.length) return 0;
  return sides.reduce((sum, side) => sum + side.scores[metric], 0) / sides.length;
}

function conditionConfidenceLabel(confidence) {
  if (confidence >= 80) return conditionLocale("Strong photo confidence", "照片分析置信度较高");
  if (confidence >= 60) return conditionLocale("Moderate photo confidence", "照片分析置信度中等");
  return conditionLocale("Low photo confidence", "照片分析置信度较低");
}

function buildConditionResult(sides) {
  const scores = {
    centering: combineConditionMetric(sides, "centering"),
    corners: combineConditionMetric(sides, "corners"),
    edges: combineConditionMetric(sides, "edges"),
    surface: combineConditionMetric(sides, "surface")
  };
  const subgrades = Object.fromEntries(Object.entries(scores).map(([key, value]) => [key, conditionScoreToBgs(value)]));
  const subgradeValues = Object.values(subgrades);
  const weakestSubgrade = Math.min(...subgradeValues);
  const averageSubgrade = subgradeValues.reduce((sum, value) => sum + value, 0) / subgradeValues.length;
  const bgs = Math.round(Math.min(averageSubgrade, weakestSubgrade + 0.5) * 2) / 2;
  const quality = sides.reduce((sum, side) => sum + side.quality, 0) / sides.length;
  const borderConfidence = sides.reduce((sum, side) => sum + side.borderConfidence, 0) / sides.length;
  const completeness = sides.length > 1 ? 20 : 5;
  const confidence = Math.round(conditionClamp(quality * 0.6 + borderConfidence * 0.2 + completeness, 22, sides.length > 1 ? 92 : 69));
  const weightedScore = scores.centering * 0.3 + scores.corners * 0.25 + scores.edges * 0.2 + scores.surface * 0.25;
  const psa = conditionScoreToPsa(weightedScore, Math.min(...Object.values(scores)), confidence);
  const evidence = [];
  sides.forEach((side) => {
    const sideName = side.side === "front" ? conditionLocale("Front", "正面") : conditionLocale("Back", "背面");
    const ratioText = side.borderConfidence >= 24
      ? `${Math.round(side.horizontalRatio)}/${100 - Math.round(side.horizontalRatio)} ${conditionLocale("horizontal", "横向")} · ${Math.round(side.verticalRatio)}/${100 - Math.round(side.verticalRatio)} ${conditionLocale("vertical", "纵向")}`
      : conditionLocale("Border detection was uncertain; centering is conservative.", "边框识别不确定，居中分采用保守估算。");
    evidence.push(`${sideName}: ${ratioText}`);
    evidence.push(`${sideName}: ${conditionLocale("photo quality", "照片质量")} ${Math.round(side.quality)}/100 · ${conditionLocale("focus", "清晰度")} ${Math.round(side.focusScore)}/100`);
    if (side.highlightRate > 0.025) evidence.push(`${sideName}: ${conditionLocale("glare may hide surface marks.", "反光可能遮盖表面瑕疵。")} `);
  });
  if (sides.length === 1) evidence.push(conditionLocale("Back image missing: reverse centering, corners, edges, and surface were not checked.", "缺少背面图片：未检查背面居中、角、边和表面。"));
  evidence.push(conditionLocale("Inspect under angled light before submitting; photos cannot reliably reveal dents, alterations, or restoration.", "送评前请在斜光下检查；照片无法可靠识别凹痕、改动或修复。"));
  return { psa, bgs, scores, subgrades, confidence, quality, evidence, sides, analyzedAt: new Date().toISOString(), version: 1 };
}

function renderConditionImageSide(side) {
  const source = conditionImages[side];
  const preview = side === "front" ? conditionElements.frontPreview : conditionElements.backPreview;
  const well = conditionElements.area?.querySelector(`[data-condition-side="${side}"]`);
  if (preview) {
    preview.src = source || "";
    preview.classList.toggle("hidden", !source);
  }
  well?.classList.toggle("has-image", Boolean(source));
  conditionElements.area?.querySelector(`[data-condition-progress="${side}"]`)?.classList.toggle("complete", Boolean(source));
  if (conditionElements.analyze) conditionElements.analyze.disabled = !conditionImages.front;
}

function syncConditionControlState() {
  if (!conditionElements.area || !isMember()) return;
  if (conditionElements.analyze) conditionElements.analyze.disabled = !conditionImages.front;
  if (conditionElements.captureFront) conditionElements.captureFront.disabled = !conditionStream;
  if (conditionElements.captureBack) conditionElements.captureBack.disabled = !conditionStream;
  if (conditionElements.stopCamera) conditionElements.stopCamera.disabled = !conditionStream;
  if (conditionElements.startCamera) conditionElements.startCamera.disabled = Boolean(conditionStream);
  if (conditionElements.saveReport) conditionElements.saveReport.disabled = !conditionLatestResult || !conditionElements.collectionCard?.value;
}

function renderConditionCollectionCards() {
  const select = conditionElements.collectionCard;
  if (!select) return;
  const current = select.value;
  select.innerHTML = `<option value="">${escapeHtml(conditionLocale("Choose a collection card", "选择收藏中的卡片"))}</option>${cards.map((card) => `<option value="${escapeHtml(card.id)}">${escapeHtml(fixedCardName(card) || cardTitle(card))}</option>`).join("")}`;
  if (cards.some((card) => card.id === current)) select.value = current;
  if (conditionElements.saveReport) conditionElements.saveReport.disabled = !conditionLatestResult || !select.value;
}

function renderConditionReport(result) {
  conditionElements.reportEmpty?.classList.toggle("hidden", Boolean(result));
  conditionElements.report?.classList.toggle("hidden", !result);
  if (!result) return;
  conditionElements.psaGrade.textContent = String(result.psa);
  conditionElements.psaLabel.textContent = `PSA ${conditionGradeLabel(result.psa, "psa")}`;
  conditionElements.bgsGrade.textContent = Number.isInteger(result.bgs) ? result.bgs.toFixed(1) : String(result.bgs);
  conditionElements.bgsLabel.textContent = `BGS ${conditionGradeLabel(result.bgs, "bgs")}`;
  conditionElements.confidence.textContent = `${result.confidence}%`;
  conditionElements.confidenceBar.style.width = `${result.confidence}%`;
  conditionElements.confidenceNote.textContent = conditionConfidenceLabel(result.confidence);
  const metricLabels = {
    centering: conditionLocale("Centering", "居中"),
    corners: conditionLocale("Corners", "卡角"),
    edges: conditionLocale("Edges", "卡边"),
    surface: conditionLocale("Surface", "表面")
  };
  conditionElements.metricList.innerHTML = Object.entries(result.subgrades).map(([key, grade]) => `
    <div class="condition-metric">
      <span><strong>${escapeHtml(metricLabels[key])}</strong><small>${escapeHtml(conditionLocale("BGS-style subgrade", "BGS 方式子项分"))}</small></span>
      <i><b style="width:${grade * 10}%"></b></i>
      <strong>${grade.toFixed(1)}</strong>
    </div>
  `).join("");
  conditionElements.evidenceList.innerHTML = result.evidence.map((item) => `<p><span class="material-symbols-outlined" aria-hidden="true">${/missing|缺少|cannot|无法|glare|反光/i.test(item) ? "warning" : "check_circle"}</span>${escapeHtml(item)}</p>`).join("");
  if (conditionElements.saveReport) conditionElements.saveReport.disabled = !conditionElements.collectionCard?.value;
}

async function handleConditionImageUpload(side, input) {
  const [file] = input?.files || [];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    conditionElements.cameraStatus.textContent = conditionLocale("Choose an image file.", "请选择图片文件。");
    return;
  }
  conditionImages[side] = await readImageFile(input);
  input.value = "";
  conditionLatestResult = null;
  renderConditionImageSide(side);
  renderConditionReport(null);
  if (conditionElements.saveStatus) conditionElements.saveStatus.textContent = "";
}

function setConditionMode(mode) {
  const cameraMode = mode === "camera";
  conditionElements.modeButtons.forEach((button) => {
    const active = button.dataset.conditionMode === mode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  conditionElements.uploadPane?.classList.toggle("hidden", cameraMode);
  conditionElements.cameraPane?.classList.toggle("hidden", !cameraMode);
  if (!cameraMode) stopConditionCamera({ quiet: true });
}

async function startConditionCamera() {
  if (!requireMember("check card condition")) return;
  if (!navigator.mediaDevices?.getUserMedia) {
    conditionElements.cameraStatus.textContent = conditionLocale("Camera access requires localhost or HTTPS. Upload photos on this page instead.", "相机需要通过 localhost 或 HTTPS 使用；你也可以直接上传照片。");
    return;
  }
  stopConditionCamera({ quiet: true });
  conditionElements.cameraStatus.textContent = conditionLocale("Requesting camera permission...", "正在申请相机权限……");
  try {
    try {
      conditionStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" }, width: { ideal: 1600 }, height: { ideal: 1200 } }, audio: false });
    } catch (firstError) {
      if (firstError.name === "NotAllowedError") throw firstError;
      conditionStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    }
    conditionElements.video.srcObject = conditionStream;
    await conditionElements.video.play();
    conditionElements.video.classList.remove("hidden");
    conditionElements.cameraEmpty.classList.add("hidden");
    conditionElements.captureFront.disabled = false;
    conditionElements.captureBack.disabled = false;
    conditionElements.stopCamera.disabled = false;
    conditionElements.startCamera.disabled = true;
    conditionElements.cameraStatus.textContent = conditionLocale("Camera ready. Keep the card flat and avoid reflections.", "相机已就绪。请保持卡片平整并避开反光。");
  } catch (error) {
    conditionElements.cameraStatus.textContent = error.name === "NotAllowedError"
      ? conditionLocale("Camera permission was denied. Allow camera access in browser or macOS settings, or upload photos instead.", "相机权限被拒绝。请在浏览器或 macOS 设置中允许访问，或改为上传照片。")
      : conditionLocale(`Camera unavailable: ${error.message}`, `相机不可用：${error.message}`);
  }
}

function stopConditionCamera(options = {}) {
  conditionStream?.getTracks().forEach((track) => track.stop());
  conditionStream = null;
  if (conditionElements.video) {
    conditionElements.video.pause?.();
    conditionElements.video.srcObject = null;
    conditionElements.video.classList.add("hidden");
  }
  conditionElements.cameraEmpty?.classList.remove("hidden");
  if (conditionElements.captureFront) conditionElements.captureFront.disabled = true;
  if (conditionElements.captureBack) conditionElements.captureBack.disabled = true;
  if (conditionElements.stopCamera) conditionElements.stopCamera.disabled = true;
  if (conditionElements.startCamera) conditionElements.startCamera.disabled = false;
  if (!options.quiet && conditionElements.cameraStatus) conditionElements.cameraStatus.textContent = conditionLocale("Camera stopped. Captured images remain ready to analyze.", "相机已关闭，已拍摄图片仍可继续分析。");
}

function captureConditionSide(side) {
  const video = conditionElements.video;
  if (!conditionStream || !video?.videoWidth) {
    conditionElements.cameraStatus.textContent = conditionLocale("Start the camera before capturing.", "请先启动相机再拍摄。");
    return;
  }
  const canvas = conditionElements.canvas;
  const maximum = 1800;
  const scale = Math.min(1, maximum / Math.max(video.videoWidth, video.videoHeight));
  canvas.width = Math.round(video.videoWidth * scale);
  canvas.height = Math.round(video.videoHeight * scale);
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  conditionImages[side] = canvas.toDataURL("image/jpeg", 0.92);
  conditionLatestResult = null;
  renderConditionImageSide(side);
  renderConditionReport(null);
  conditionElements.cameraStatus.textContent = side === "front"
    ? conditionLocale("Front captured. Turn the card over and capture the back.", "正面已拍摄，请翻到背面继续拍摄。")
    : conditionLocale("Back captured. Both sides are ready for analysis.", "背面已拍摄，正反面可以开始分析。 ");
}

async function analyzeCondition() {
  if (!conditionImages.front) return;
  const button = conditionElements.analyze;
  button.disabled = true;
  button.classList.add("is-analyzing");
  button.innerHTML = `<span class="material-symbols-outlined" aria-hidden="true">progress_activity</span>${escapeHtml(conditionLocale("Analyzing photos...", "正在分析图片……"))}`;
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  try {
    const sides = await Promise.all([
      analyzeConditionImage(conditionImages.front, "front"),
      conditionImages.back ? analyzeConditionImage(conditionImages.back, "back") : null
    ].filter(Boolean));
    conditionLatestResult = buildConditionResult(sides);
    renderConditionReport(conditionLatestResult);
  } catch (error) {
    conditionElements.cameraStatus.textContent = conditionLocale(`Analysis failed: ${error.message}`, `分析失败：${error.message}`);
  } finally {
    button.classList.remove("is-analyzing");
    button.innerHTML = `<span class="material-symbols-outlined" aria-hidden="true">biotech</span>${escapeHtml(conditionLocale("Analyze condition", "分析品相"))}`;
    button.disabled = !conditionImages.front;
  }
}

function resetConditionCheck() {
  stopConditionCamera({ quiet: true });
  conditionImages = { front: "", back: "" };
  conditionLatestResult = null;
  ["front", "back"].forEach(renderConditionImageSide);
  renderConditionReport(null);
  if (conditionElements.collectionCard) conditionElements.collectionCard.value = "";
  if (conditionElements.saveReport) conditionElements.saveReport.disabled = true;
  if (conditionElements.saveStatus) conditionElements.saveStatus.textContent = "";
  if (conditionElements.cameraStatus) conditionElements.cameraStatus.textContent = conditionLocale("Camera access starts only when you press Start camera.", "只有点击“启动相机”后才会申请相机权限。");
  setConditionMode("upload");
}

function saveConditionReportToCard() {
  if (!conditionLatestResult || !conditionElements.collectionCard?.value) return;
  const card = cards.find((item) => item.id === conditionElements.collectionCard.value);
  if (!card) return;
  card.conditionEstimate = compactConditionEstimate(conditionLatestResult);
  card.updatedAt = new Date().toISOString();
  saveCards();
  render();
  conditionElements.collectionCard.value = card.id;
  conditionElements.saveStatus.textContent = conditionLocale(`Saved to ${fixedCardName(card) || cardTitle(card)}. Official grade was not changed.`, `已保存至“${fixedCardName(card) || cardTitle(card)}”，未修改官方评级。`);
}

function setupConditionCheck() {
  if (!conditionElements.area || conditionElements.area.dataset.conditionReady === "true") return;
  conditionElements.area.dataset.conditionReady = "true";
  conditionElements.modeButtons.forEach((button) => button.addEventListener("click", () => setConditionMode(button.dataset.conditionMode)));
  conditionElements.frontInput?.addEventListener("change", () => handleConditionImageUpload("front", conditionElements.frontInput));
  conditionElements.backInput?.addEventListener("change", () => handleConditionImageUpload("back", conditionElements.backInput));
  conditionElements.startCamera?.addEventListener("click", startConditionCamera);
  conditionElements.stopCamera?.addEventListener("click", () => stopConditionCamera());
  conditionElements.captureFront?.addEventListener("click", () => captureConditionSide("front"));
  conditionElements.captureBack?.addEventListener("click", () => captureConditionSide("back"));
  conditionElements.analyze?.addEventListener("click", analyzeCondition);
  conditionElements.reset?.addEventListener("click", resetConditionCheck);
  conditionElements.collectionCard?.addEventListener("change", () => { conditionElements.saveReport.disabled = !conditionLatestResult || !conditionElements.collectionCard.value; });
  conditionElements.saveReport?.addEventListener("click", saveConditionReportToCard);
  renderConditionImageSide("front");
  renderConditionImageSide("back");
  renderConditionCollectionCards();
}

async function startScanCamera() {
  if (SCAN_PAUSED) {
    els.scanStatus.textContent = "Camera scanning is paused for now. Use fixed-format entry to add cards manually.";
    return;
  }
  if (!navigator.mediaDevices?.getUserMedia) {
    els.scanStatus.textContent = "Camera is not available in this browser. Try opening the local server URL instead of file://.";
    return;
  }
  stopScanCamera({ quiet: true });
  let selectedDeviceId = "";
  try {
    await requestCameraPermission();
    selectedDeviceId = scanElements.deviceSelect?.value || "";
    const frontCameraConstraints = {
      facingMode: "user",
      width: { ideal: 1280 },
      height: { ideal: 720 }
    };
    const selectedCameraConstraints = {
      deviceId: { exact: selectedDeviceId },
      width: { ideal: 1280 },
      height: { ideal: 720 }
    };
    scanStream = await navigator.mediaDevices.getUserMedia({
      video: selectedDeviceId ? selectedCameraConstraints : frontCameraConstraints,
      audio: false
    });
    scanElements.video.srcObject = scanStream;
    await scanElements.video.play();
    scanElements.preview.classList.add("hidden");
    scanElements.video.classList.remove("hidden");
    await loadScanDevices();
    els.scanStatus.textContent = "Camera ready. Center the card and press Capture + Insert.";
  } catch (error) {
    if (error.name === "NotAllowedError" || /permission|denied/i.test(error.message)) {
      els.scanStatus.textContent = "Camera permission was denied. Allow camera access for Codex or this browser in macOS System Settings > Privacy & Security > Camera, then reload this page and press Start Camera again.";
      return;
    }
    if (selectedDeviceId) {
      scanElements.deviceSelect.value = "";
      els.scanStatus.textContent = "Selected camera was unavailable. Trying the Mac front camera...";
      await startScanCamera();
      return;
    }
    els.scanStatus.textContent = `Camera blocked or unavailable: ${error.message}`;
  }
}

async function requestCameraPermission() {
  els.scanStatus.textContent = "Asking for camera permission...";
  const permissionStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
  permissionStream.getTracks().forEach((track) => track.stop());
  await loadScanDevices();
}

function stopScanCamera(options = {}) {
  scanStream?.getTracks().forEach((track) => track.stop());
  scanStream = null;
  scanElements.video.srcObject = null;
  if (!options.quiet) els.scanStatus.textContent = "Camera stopped.";
}

async function loadScanDevices() {
  if (!navigator.mediaDevices?.enumerateDevices || !scanElements.deviceSelect) return;
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const cameras = devices.filter((device) => device.kind === "videoinput");
    const currentValue = scanElements.deviceSelect.value;
    scanElements.deviceSelect.innerHTML = '<option value="">Mac front camera</option>';
    cameras.forEach((device, index) => {
      const option = document.createElement("option");
      option.value = device.deviceId;
      option.textContent = device.label || `Camera ${index + 1}`;
      scanElements.deviceSelect.append(option);
    });
    const preferredCamera = cameras.find((device) => /facetime|front|built-in|mac|camera/i.test(device.label));
    scanElements.deviceSelect.value = currentValue || preferredCamera?.deviceId || "";
  } catch {
    scanElements.deviceSelect.innerHTML = '<option value="">Mac front camera</option>';
  }
}

function parseScannedCardText(value) {
  const identity = identifyCardFromScanText(value);
  return {
    ...identity,
    player: identity.player || "Scanned Card",
    condition: identity.grade ? "Graded" : "Raw"
  };
}

async function readTextFromScan(imageDataUrl) {
  if (!window.TextDetector) return "";
  try {
    const detector = new window.TextDetector();
    const image = new Image();
    image.src = imageDataUrl;
    await image.decode();
    const detections = await detector.detect(image);
    return detections.map((item) => item.rawValue).join("\n");
  } catch {
    return "";
  }
}

function playerScanLocale(english, chinese) {
  return document.documentElement.lang.toLowerCase().startsWith("zh") ? chinese : english;
}

function beginnerRequiredFields() {
  return [
    { key: "sport", label: playerScanLocale("sport", "运动"), value: text(fields.sport?.value), target: fields.sport },
    { key: "year", label: playerScanLocale("year", "年份"), value: text(fields.year?.value), target: fields.year },
    { key: "brand", label: playerScanLocale("brand", "品牌"), value: catalogFieldValue("brand"), target: fields.brand },
    { key: "setName", label: playerScanLocale("set", "系列"), value: catalogFieldValue("setName"), target: fields.setName },
    { key: "player", label: playerScanLocale("player", "球员"), value: catalogFieldValue("player"), target: fields.player }
  ];
}

function updateBeginnerEntryGuide() {
  if (!beginnerGuideElements.count) return;
  const required = beginnerRequiredFields();
  const completed = required.filter((item) => item.value).length;
  const ready = completed === required.length;
  const identityComplete = Boolean(required.find((item) => item.key === "player")?.value || playerScanElements.match?.value);
  const detailsComplete = required.filter((item) => item.key !== "player").every((item) => item.value);
  const stepState = {
    identify: identityComplete,
    describe: detailsComplete,
    save: ready
  };
  const activeStep = ready ? "save" : (!identityComplete ? "identify" : (!detailsComplete ? "describe" : "save"));

  beginnerGuideElements.count.textContent = playerScanLocale(`${completed} / ${required.length} ready`, `已完成 ${completed} / ${required.length}`);
  beginnerGuideElements.count.classList.toggle("complete", ready);
  beginnerGuideElements.bar.style.width = `${Math.round((completed / required.length) * 100)}%`;
  beginnerGuideElements.steps.forEach((step) => {
    const key = step.dataset.beginnerStep;
    step.classList.toggle("complete", Boolean(stepState[key]));
    step.classList.toggle("active", key === activeStep);
  });

  const missing = required.find((item) => !item.value);
  if (ready) {
    beginnerGuideElements.status.textContent = playerScanLocale(
      "The card identity is complete. Save it now, or open advanced details first.",
      "卡片身份信息已完整。现在可以保存，也可以先补充进阶信息。"
    );
    beginnerGuideElements.saveTitle.textContent = playerScanLocale("Ready to save", "可以保存了");
    beginnerGuideElements.saveHint.textContent = playerScanLocale("Optional details can always be added later.", "其他细节随时可以补充。");
  } else if (completed === 0) {
    beginnerGuideElements.status.textContent = playerScanLocale(
      "Start with a photo, or choose the sport and year below.",
      "可以先拍照识别，也可以从下方选择运动和年份。"
    );
    beginnerGuideElements.saveTitle.textContent = playerScanLocale("Finish the five basics to save", "完成五项基础信息后即可保存");
  } else {
    beginnerGuideElements.status.textContent = playerScanLocale(`Next: choose the ${missing.label}.`, `下一步：请选择${missing.label}。`);
    beginnerGuideElements.saveTitle.textContent = playerScanLocale(`${required.length - completed} basics left`, `还差 ${required.length - completed} 项基础信息`);
  }
  beginnerGuideElements.saveBar?.classList.toggle("ready", ready);
  beginnerGuideElements.saveBar?.querySelector("button[type='submit']")?.setAttribute("aria-label", ready
    ? playerScanLocale("Save this card", "保存这张卡")
    : playerScanLocale(`Complete ${required.length - completed} more basics before saving`, `再完成 ${required.length - completed} 项后保存`));
}

function focusBeginnerMissingField() {
  const missing = beginnerRequiredFields().find((item) => !item.value);
  if (!missing) return false;
  beginnerGuideElements.status.textContent = playerScanLocale(`Choose the ${missing.label} before saving.`, `保存前请先选择${missing.label}。`);
  const target = missing.target?.disabled
    ? beginnerRequiredFields().find((item) => !item.value && !item.target?.disabled)?.target
    : missing.target;
  target?.focus();
  target?.scrollIntoView({ behavior: "smooth", block: "center" });
  return true;
}

function normalizedPlayerScanText(value) {
  return text(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function playerScanDistance(left, right) {
  const a = normalizedPlayerScanText(left);
  const b = normalizedPlayerScanText(right);
  if (!a) return b.length;
  if (!b) return a.length;
  const row = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    let diagonal = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const previous = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, diagonal + (a[i - 1] === b[j - 1] ? 0 : 1));
      diagonal = previous;
    }
  }
  return row[b.length];
}

function playerScanCandidateScore(candidate, scanText) {
  const name = normalizedPlayerScanText(candidate);
  const source = normalizedPlayerScanText(scanText);
  if (!name || !source) return 0;
  if (` ${source} `.includes(` ${name} `)) return 1;
  const sourceWords = source.split(" ").filter((word) => word.length > 1);
  const nameWords = name.split(" ").filter((word) => word.length > 1);
  if (!sourceWords.length || !nameWords.length) return 0;
  const wordScore = nameWords.reduce((total, word) => {
    const best = sourceWords.reduce((score, sourceWord) => {
      const similarity = 1 - playerScanDistance(word, sourceWord) / Math.max(word.length, sourceWord.length, 1);
      return Math.max(score, similarity);
    }, 0);
    return total + Math.max(0, best);
  }, 0) / nameWords.length;
  const exactWords = nameWords.filter((word) => sourceWords.includes(word)).length / nameWords.length;
  return Math.min(0.99, wordScore * 0.72 + exactWords * 0.28);
}

function playerScanPhraseEvidence(candidate, scanText) {
  const phrase = normalizedPlayerScanText(candidate);
  const source = normalizedPlayerScanText(scanText);
  const tokens = phrase.split(" ").filter((token) => token.length > 1);
  const sourceTokens = new Set(source.split(" ").filter(Boolean));
  const exactPhrase = Boolean(phrase && ` ${source} `.includes(` ${phrase} `));
  const exactTokens = tokens.filter((token) => sourceTokens.has(token)).length;
  const tokenCoverage = tokens.length ? exactTokens / tokens.length : 0;
  const fuzzy = playerScanCandidateScore(candidate, scanText);
  let score = 0;
  if (exactPhrase) score = 1;
  else if (tokens.length === 1 && tokenCoverage === 1) score = 0.94;
  else if (tokenCoverage === 1) score = 0.9;
  else if (tokenCoverage >= 0.67 && fuzzy >= 0.72) score = 0.74 + (tokenCoverage - 0.67) * 0.3;
  else if (tokenCoverage >= 0.5 && fuzzy >= 0.82) score = 0.64;
  else score = Math.min(0.42, fuzzy * 0.46);
  return { score: Math.min(1, score), exactPhrase, tokenCoverage, fuzzy, tokens };
}

function playerScanTitleCase(value) {
  return text(value).toLowerCase().replace(/(^|[\s-])([a-z])/g, (_match, prefix, letter) => `${prefix}${letter.toUpperCase()}`);
}

function playerScanYear(value) {
  const source = text(value);
  const match = source.match(/\b((?:19|20)\d{2})(?:\s*[-/]\s*((?:19|20)?\d{2}))?\b/);
  if (!match) return "";
  const end = match[2] ? match[2].slice(-2) : "";
  return end ? `${match[1]}-${end}` : match[1];
}

function playerScanCatalogMatches(scanText) {
  const catalog = Array.isArray(window.CARD_SET_CATALOG) ? window.CARD_SET_CATALOG : [];
  return catalog
    .map((entry) => {
      const setEvidence = playerScanPhraseEvidence(entry.setName, scanText);
      const brandEvidence = playerScanPhraseEvidence(entry.brand, scanText);
      const specificity = Math.min(0.04, normalizedPlayerScanText(entry.setName).length / 500);
      const score = Math.min(1, setEvidence.score * 0.88 + brandEvidence.score * 0.12 + (setEvidence.exactPhrase ? specificity : 0));
      return { ...entry, setScore: setEvidence.score, brandScore: brandEvidence.score, score, setEvidence, brandEvidence };
    })
    .filter((entry) => entry.setScore >= 0.64 && (entry.setEvidence.exactPhrase || entry.setEvidence.tokenCoverage >= 0.67 || entry.brandScore >= 0.9))
    .sort((left, right) => right.score - left.score || normalizedPlayerScanText(right.setName).length - normalizedPlayerScanText(left.setName).length);
}

function playerScanBrandMatch(scanText) {
  const brands = [...new Set((window.CARD_SET_CATALOG || []).map((entry) => entry.brand).filter(Boolean))];
  return brands
    .map((brand) => ({ brand, ...playerScanPhraseEvidence(brand, scanText) }))
    .sort((left, right) => right.score - left.score || right.brand.length - left.brand.length)[0] || { brand: "", score: 0 };
}

function playerScanGenericPlayers(lines) {
  const blocked = /\b(?:PSA|BGS|BECKETT|SGC|GEM|MINT|ROOKIE|CARD|LEDGER|COLLECTOR|COLLECTORS|LEAGUE|ASSET|MANAGER|TEAM|CLUB|STATE|UNITED|NBA|NFL|MLB|NHL|FC|WARRIORS|LAKERS|CELTICS|AUTHENTIC|AUTOGRAPH|PRIZM|OPTIC|SELECT|DONRUSS|PANINI|TOPPS|BOWMAN|CHROME|REFRACTOR|HOLO|MOJO|SILVER|GOLD|RED|BLUE|GREEN|BLACK|WHITE|PARALLEL|VARIANT|EDITION|SERIES|WORLD CUP|UEFA|FIFA|POKEMON|ILLUSTRATION|RARE|CERTIFIED|EXCELLENCE|NUMBER|NO\.?|BASE)\b/i;
  const catalogNames = (window.CARD_SET_CATALOG || []).flatMap((entry) => [entry.brand, entry.setName]);
  const candidates = lines
    .map((line, index) => ({ line: text(line).replace(/^[^A-Za-z]+|[^A-Za-z.' -]+$/g, ""), index }))
    .filter(({ line }) => line && !/\d|\.(?:JPE?G|PNG|WEBP|SVG)$/i.test(line) && !blocked.test(line))
    .filter(({ line }) => {
      const words = line.split(/\s+/).filter(Boolean);
      return words.length >= 2
        && words.length <= 5
        && words.every((word) => /^[A-Za-z][A-Za-z.'-]*$/.test(word) && word.replace(/[^A-Za-z]/g, "").length >= 2)
        && words.some((word) => word.replace(/[^A-Za-z]/g, "").length >= 4);
    })
    .filter(({ line }) => !catalogNames.some((name) => playerScanCandidateScore(name, line) >= 0.9))
    .map(({ line, index }) => ({
      name: playerScanTitleCase(line),
      score: Math.max(0.48, Math.min(0.7, 0.62 - index * 0.015 + (/^[A-Z .'-]+$/.test(line) ? 0.08 : 0)))
    }))
    .sort((left, right) => right.score - left.score);
  return candidates.filter((candidate, index) => candidates.findIndex((item) => normalizedPlayerScanText(item.name) === normalizedPlayerScanText(candidate.name)) === index).slice(0, 5);
}

function playerScanGenericPlayer(lines) {
  return playerScanGenericPlayers(lines)[0] || null;
}

function playerScanCardNumber(value) {
  const source = text(value).toUpperCase();
  const patterns = [
    /(?:#|CARD\s*(?:NO\.?|NUMBER)|\bNO\.?)\s*([A-Z]{0,4}-?\d{1,4})\b/,
    /\b([A-Z]{1,4}-\d{1,4})\b/
  ];
  return patterns.map((pattern) => source.match(pattern)?.[1] || "").find(Boolean) || "";
}

function playerScanType(value) {
  const source = normalizedPlayerScanText(value);
  const types = [];
  if (/\brated rookie\b/.test(source)) types.push("Rated Rookie");
  else if (/\b(?:rookie ticket|rookie card|rookie|rc)\b/.test(source)) types.push("Rookie");
  if (/\b(?:on card autograph|on card auto)\b/.test(source)) types.push("On-card Autograph");
  else if (/\b(?:sticker autograph|sticker auto)\b/.test(source)) types.push("Sticker Autograph");
  else if (/\b(?:autograph|auto|signature|signed)\b/.test(source)) types.push("Autograph");
  if (/\b(?:patch autograph|rpa)\b/.test(source)) types.push("Patch");
  else if (/\b(?:patch|jersey|memorabilia|relic|materials)\b/.test(source)) types.push("Memorabilia");
  if (/\b(?:ssp|super short print|case hit)\b/.test(source)) types.push("SSP Insert");
  else if (/\b(?:sp|short print|insert)\b/.test(source)) types.push("Insert");
  if (!types.length && /\bbase\b/.test(source)) types.push("Base");
  return types.join(" ");
}

function playerScanParallel(value) {
  const source = normalizedPlayerScanText(value);
  const terms = [
    ["special illustration rare", "Special Illustration Rare"], ["blue cracked ice", "Blue Cracked Ice"],
    ["white sparkle", "White Sparkle"], ["gold vinyl", "Gold Vinyl"], ["black finite", "Black Finite"],
    ["neon green", "Neon Green"], ["blue shimmer", "Blue Shimmer"], ["gold shimmer", "Gold Shimmer"],
    ["red shimmer", "Red Shimmer"], ["blue wave", "Blue Wave"], ["gold wave", "Gold Wave"],
    ["red wave", "Red Wave"], ["tiger stripe", "Tiger Stripe"], ["zebra stripe", "Zebra Stripe"],
    ["mojo red", "Mojo Red"], ["red mojo", "Mojo Red"], ["silver prizm", "Silver Prizm"],
    ["rainbow foil", "Rainbow Foil"], ["x fractor", "X-Fractor"], ["superfractor", "Superfractor"],
    ["checkerboard", "Checkerboard"], ["color blast", "Color Blast"], ["downtown", "Downtown"],
    ["kaboom", "Kaboom"], ["genesis", "Genesis"], ["stained glass", "Stained Glass"],
    ["refractor", "Refractor"], ["cracked ice", "Cracked Ice"], ["sapphire", "Sapphire"],
    ["logofractor", "Logofractor"], ["speckle", "Speckle"], ["sepia", "Sepia"],
    ["negative", "Negative"], ["scope", "Scope"], ["shimmer", "Shimmer"], ["pulsar", "Pulsar"],
    ["disco", "Disco"], ["hyper", "Hyper"], ["choice", "Choice"], ["photon", "Photon"],
    ["cosmic", "Cosmic"], ["sparkle", "Sparkle"], ["wave", "Wave"], ["holo", "Holo"],
    ["mojo", "Mojo"], ["silver", "Silver"], ["gold", "Gold"], ["purple", "Purple"],
    ["orange", "Orange"], ["pink", "Pink"], ["aqua", "Aqua"], ["teal", "Teal"],
    ["green", "Green"], ["red", "Red"], ["blue", "Blue"], ["bronze", "Bronze"], ["black", "Black"]
  ];
  const paddedSource = ` ${source} `;
  const match = terms.find(([needle]) => paddedSource.includes(` ${needle} `));
  const serial = text(value).match(/\b\d{1,4}\s*\/\s*(\d{1,4})\b/)?.[1]
    || text(value).match(/(?:\/|\bOF\s+)(\d{1,4})\b/i)?.[1]
    || "";
  return [match?.[1] || "", serial && `/${serial}`].filter(Boolean).join(" ");
}

function playerScanGrade(value) {
  const source = text(value).toUpperCase();
  const company = source.match(/\b(PSA|BGS|BECKETT|SGC)\b/)?.[1];
  if (!company) return "";
  const normalizedCompany = company === "BECKETT" ? "BGS" : company;
  const explicit = source.match(/(?:GEM\s*(?:MT|MINT)|MINT|NM[- ]?MT|GRADE)\s*(10|9\.5|9|8\.5|8|7\.5|7|6\.5|6|5\.5|5)\b/)?.[1];
  const nearby = source.match(/\b(?:PSA|BGS|BECKETT|SGC)\b[^\n]{0,28}?\b(10|9\.5|9|8\.5|8|7\.5|7|6\.5|6|5\.5|5)\b/)?.[1];
  return explicit || nearby ? `${normalizedCompany} ${explicit || nearby}` : "";
}

function playerScanCertification(value) {
  const source = text(value);
  const labeled = source.match(/(?:CERT(?:IFICATION)?(?:\s*(?:NO\.?|NUMBER))?)\s*[:#-]?\s*(\d{6,12})\b/i)?.[1];
  if (labeled) return labeled;
  return source.split(/\n+/).map(text).find((line) => /^\d{7,12}$/.test(line)) || "";
}

function playerScanSport(scanText, playerMatch, catalogMatch) {
  const source = normalizedPlayerScanText(scanText);
  const scores = new Map();
  const add = (sport, score) => {
    if (!sport) return;
    scores.set(sport, Math.max(scores.get(sport) || 0, score));
  };
  if (playerMatch?.sports instanceof Set) playerMatch.sports.forEach((sport) => add(sport, 0.78 + playerMatch.score * 0.22));
  else if (playerMatch?.sport) add(playerMatch.sport, 0.78 + playerMatch.score * 0.22);
  (catalogMatch?.sports || []).forEach((sport) => add(sport, 0.58 + (catalogMatch.score || 0) * 0.32));
  const hints = {
    PTCG: ["pokemon", "trainer", "charizard", "pikachu"], Soccer: ["soccer", "uefa", "fifa", "premier league", "la liga", "world cup"],
    Baseball: ["baseball", "mlb"], Basketball: ["basketball", "nba", "wnba"], Football: ["football", "nfl"],
    Hockey: ["hockey", "nhl"], Racing: ["formula 1", "f1", "racing"], Golf: ["golf", "pga"]
  };
  Object.entries(hints).forEach(([sport, terms]) => {
    if (terms.some((term) => source.includes(term))) add(sport, 0.92);
  });
  return [...scores.entries()].sort((left, right) => right[1] - left[1])[0] || ["", 0];
}

function identifyCardFromScanText(value) {
  const scanText = text(value);
  const lines = scanText.split(/\n+/).map(text).filter(Boolean);
  const rankedPlayers = rankPlayerScanMatches(scanText);
  let playerMatch = rankedPlayers[0]?.score >= 0.62 ? rankedPlayers[0] : null;
  const genericPlayer = playerScanGenericPlayer(lines);
  if (genericPlayer && (!playerMatch || genericPlayer.score > playerMatch.score + 0.08)) {
    playerMatch = { ...genericPlayer, sports: new Set(), sport: "" };
  }
  const catalogMatches = playerScanCatalogMatches(scanText);
  const catalogMatch = catalogMatches[0] || null;
  const directBrand = playerScanBrandMatch(scanText);
  const [sport, sportScore] = playerScanSport(scanText, playerMatch, catalogMatch);
  const year = playerScanYear(scanText);
  const cardNumber = playerScanCardNumber(scanText);
  const type = playerScanType(scanText);
  const parallel = playerScanParallel(scanText);
  const grade = playerScanGrade(scanText);
  const certification = playerScanCertification(scanText);
  const catalogSupported = Boolean(catalogMatch && catalogMatch.setScore >= 0.72 && (
    catalogMatch.setEvidence?.exactPhrase
    || catalogMatch.setEvidence?.tokenCoverage === 1
    || year
    || cardNumber
    || directBrand.score >= 0.9
    || grade
  ));
  const setName = catalogSupported ? catalogMatch.setName : "";
  const brand = directBrand.score >= 0.82 ? directBrand.brand : (catalogSupported ? catalogMatch.brand : "");
  const fieldConfidence = {
    player: playerMatch?.score || 0,
    sport: sport ? sportScore : 0,
    year: year ? 0.97 : 0,
    brand: brand ? Math.max(directBrand.score, catalogMatch?.brandScore || 0) : 0,
    setName: setName ? catalogMatch?.setScore || 0 : 0,
    type: type ? 0.88 : 0,
    parallel: parallel ? 0.9 : 0,
    cardNumber: cardNumber ? 0.94 : 0,
    grade: grade ? 0.97 : 0,
    certification: certification ? 0.98 : 0
  };
  const coreScores = [fieldConfidence.player, fieldConfidence.sport, fieldConfidence.year, fieldConfidence.brand, fieldConfidence.setName, fieldConfidence.cardNumber];
  const confidence = Math.round(coreScores.reduce((sum, score) => sum + score, 0) / coreScores.length * 100);
  const strongFields = Object.values(fieldConfidence).filter((score) => score >= 0.8).length;
  return {
    player: playerMatch?.name || "",
    sport,
    year,
    brand,
    setName,
    type,
    parallel,
    cardNumber,
    grade,
    certification,
    confidence,
    fieldConfidence,
    matchLevel: strongFields >= 7 ? "exact" : strongFields >= 4 ? "strong" : "partial",
    matchSource: playerScanLocale("On-device OCR + card catalog", "本机文字识别 + 卡片目录"),
    playerScore: playerMatch?.score || 0,
    setAlternatives: catalogMatches.filter((entry) => entry.setScore >= 0.64).slice(0, 5).map((entry) => ({ brand: entry.brand, setName: entry.setName, score: entry.score })),
    rawText: scanText
  };
}

function playerScanRecalculateConfidence(identity) {
  const fieldConfidence = { ...(identity.fieldConfidence || {}) };
  const core = ["player", "sport", "year", "brand", "setName", "cardNumber"];
  const confidence = Math.round(core.reduce((sum, key) => sum + (fieldConfidence[key] || 0), 0) / core.length * 100);
  const strongFields = Object.values(fieldConfidence).filter((score) => score >= 0.8).length;
  return { ...identity, fieldConfidence, confidence, matchLevel: strongFields >= 7 ? "exact" : strongFields >= 4 ? "strong" : "partial" };
}

function playerScanNormalizedSetName(setName, brand) {
  const rawSet = text(setName);
  const rawBrand = text(brand);
  if (!rawBrand || !rawSet.toLowerCase().startsWith(`${rawBrand.toLowerCase()} `)) return rawSet;
  const stripped = rawSet.slice(rawBrand.length).trim();
  return (window.CARD_SET_CATALOG || []).some((entry) => normalizedPlayerScanText(entry.setName) === normalizedPlayerScanText(stripped)) ? stripped : rawSet;
}

function playerScanKnownIdentityCandidates() {
  const collectionCandidates = cards.map((card) => ({
    id: card.id,
    source: "collection",
    year: card.year,
    brand: card.brand || inferBrandFromSetName(card.setName),
    setName: card.setName,
    player: card.player,
    sport: card.sport,
    type: card.type,
    parallel: card.parallel,
    cardNumber: card.cardNumber,
    grade: card.grade,
    certification: card.certification,
    image: card.image
  }));
  const populationCandidates = (typeof LOCAL_PSA_POPULATION_INDEX === "undefined" ? [] : LOCAL_PSA_POPULATION_INDEX)
    .map(normalizePsaPopulation)
    .filter(Boolean)
    .map((record) => ({
      id: `psa-${record.id || record.identityKey || record.sampleCertNumber}`,
      source: "psa-index",
      year: record.year,
      brand: record.brand || inferBrandFromSetName(record.setName),
      setName: playerScanNormalizedSetName(record.setName, record.brand),
      player: record.subject,
      sport: /basketball/i.test(record.category) ? "Basketball" : "",
      type: "",
      parallel: record.variety,
      cardNumber: record.cardNumber,
      grade: record.grade ? `PSA ${record.grade}` : "",
      certification: record.sampleCertNumber,
      psaPopulation: record
    }));
  return [...collectionCandidates, ...populationCandidates];
}

function playerScanKnownIdentityMatch(identity) {
  const yearKey = (value) => text(value).match(/(?:19|20)\d{2}/)?.[0] || "";
  const candidates = playerScanKnownIdentityCandidates().map((candidate) => {
    const playerExact = Boolean(identity.player && candidate.player && normalizedPlayerScanText(identity.player) === normalizedPlayerScanText(candidate.player));
    const yearExact = Boolean(identity.year && candidate.year && yearKey(identity.year) === yearKey(candidate.year));
    const numberExact = Boolean(identity.cardNumber && candidate.cardNumber && normalizedPlayerScanText(identity.cardNumber) === normalizedPlayerScanText(candidate.cardNumber));
    const certExact = Boolean(identity.certification && candidate.certification && text(identity.certification).replace(/\D/g, "") === text(candidate.certification).replace(/\D/g, ""));
    const setEvidence = playerScanPhraseEvidence(candidate.setName, identity.rawText);
    const setExact = Boolean(identity.setName && candidate.setName && normalizedPlayerScanText(identity.setName) === normalizedPlayerScanText(candidate.setName));
    const setSupported = setExact || setEvidence.score >= 0.9;
    const supported = certExact || (playerExact && numberExact) || (playerExact && yearExact && setSupported);
    const score = certExact ? 1 : (playerExact ? 0.34 : 0) + (numberExact ? 0.24 : 0) + (yearExact ? 0.16 : 0) + (setSupported ? 0.18 : 0) + (identity.parallel && candidate.parallel && normalizedPlayerScanText(identity.parallel) === normalizedPlayerScanText(candidate.parallel) ? 0.08 : 0);
    return { candidate, supported, score };
  }).filter((entry) => entry.supported).sort((left, right) => right.score - left.score);
  return candidates[0]?.score >= 0.74 ? candidates[0] : null;
}

function playerScanMergeKnownIdentity(identity, match) {
  if (!match?.candidate) return identity;
  const candidate = match.candidate;
  const merged = { ...identity };
  ["player", "sport", "year", "brand", "setName", "type", "parallel", "cardNumber", "grade", "certification"].forEach((key) => {
    if (!merged[key] && candidate[key]) merged[key] = candidate[key];
  });
  merged.fieldConfidence = { ...(identity.fieldConfidence || {}) };
  ["player", "sport", "year", "brand", "setName", "cardNumber"].forEach((key) => {
    if (merged[key] && candidate[key] && normalizedPlayerScanText(merged[key]) === normalizedPlayerScanText(candidate[key])) {
      merged.fieldConfidence[key] = Math.max(merged.fieldConfidence[key] || 0, match.score >= 0.9 ? 0.98 : 0.92);
    }
  });
  ["type", "parallel", "grade", "certification"].forEach((key) => {
    if (merged[key] && candidate[key]) merged.fieldConfidence[key] = Math.max(merged.fieldConfidence[key] || 0, 0.92);
  });
  if (candidate.psaPopulation) merged.psaPopulation = candidate.psaPopulation;
  merged.matchSource = candidate.source === "psa-index"
    ? playerScanLocale("Exact match in the PSA population index", "PSA POP 数据库精确匹配")
    : playerScanLocale("Exact match in your collection library", "个人收藏库精确匹配");
  return playerScanRecalculateConfidence(merged);
}

function playerScanIdentityFromPsaRecord(identity, sourceRecord) {
  const record = normalizePsaPopulation(sourceRecord);
  if (!record) return identity;
  const brand = record.brand || inferBrandFromSetName(record.setName);
  const merged = {
    ...identity,
    player: record.subject || identity.player,
    sport: /basketball/i.test(record.category) ? "Basketball" : identity.sport,
    year: record.year || identity.year,
    brand: brand || identity.brand,
    setName: playerScanNormalizedSetName(record.setName, brand) || identity.setName,
    parallel: record.variety || identity.parallel,
    cardNumber: record.cardNumber || identity.cardNumber,
    grade: record.grade ? `PSA ${record.grade}` : identity.grade,
    certification: identity.certification || record.sampleCertNumber,
    psaPopulation: record,
    recognitionMethod: "certificate",
    matchSource: playerScanLocale("Official PSA certificate match", "PSA 证书精确匹配")
  };
  merged.fieldConfidence = { ...(identity.fieldConfidence || {}) };
  ["player", "sport", "year", "brand", "setName", "parallel", "cardNumber", "grade", "certification"].forEach((key) => {
    if (merged[key]) merged.fieldConfidence[key] = 0.99;
  });
  return playerScanRecalculateConfidence(merged);
}

async function enrichPlayerScanIdentity(identity) {
  const certNumber = text(identity.certification).replace(/\D/g, "");
  if (/^PSA\b/i.test(identity.grade) && certNumber.length >= 7) {
    const localRecord = (typeof LOCAL_PSA_POPULATION_INDEX === "undefined" ? [] : LOCAL_PSA_POPULATION_INDEX)
      .find((record) => text(record.sampleCertNumber).replace(/\D/g, "") === certNumber);
    if (localRecord) return playerScanIdentityFromPsaRecord(identity, localRecord);
    if (supabaseReady() && text(supabaseSettings.accessToken)) {
      try {
        const data = await marketDataRequest("psa-cert", { certNumber });
        if (data.record) return playerScanIdentityFromPsaRecord(identity, data.record);
      } catch {
        // Keep the local OCR result available when the certificate service is offline.
      }
    }
  }
  return playerScanMergeKnownIdentity(identity, playerScanKnownIdentityMatch(identity));
}

function playerScanCardTitle(identity = {}) {
  const brand = text(identity.brand);
  const setName = text(identity.setName);
  const showBrand = brand && !normalizedPlayerScanText(setName).startsWith(normalizedPlayerScanText(brand));
  return [
    identity.year,
    showBrand ? brand : "",
    setName,
    identity.player,
    identity.parallel,
    identity.cardNumber && `#${identity.cardNumber}`,
    identity.grade
  ].filter(Boolean).join(" · ");
}

function playerScanCardCandidateId(identity = {}, prefix = "scan") {
  const key = [identity.year, identity.brand, identity.setName, identity.player, identity.parallel, identity.cardNumber, identity.grade]
    .map(normalizedPlayerScanText).filter(Boolean).join("|");
  let hash = 2166136261;
  for (const character of key || prefix) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return `${prefix}-${hash.toString(16)}`;
}

function playerScanCardFieldMatch(left, right, mode = "exact") {
  const actual = normalizedPlayerScanText(left);
  const expected = normalizedPlayerScanText(right);
  if (!actual || !expected) return 0;
  if (actual === expected) return 1;
  if (mode === "year") return actual.slice(0, 4) === expected.slice(0, 4) ? 0.94 : 0;
  const evidence = playerScanPhraseEvidence(right, left);
  return evidence.exactPhrase || evidence.tokenCoverage === 1 ? 0.9 : evidence.score >= 0.72 ? evidence.score * 0.78 : 0;
}

function playerScanKnownCardScore(candidate, identity) {
  const certExact = Boolean(identity.certification && candidate.certification
    && text(identity.certification).replace(/\D/g, "") === text(candidate.certification).replace(/\D/g, ""));
  if (certExact) return { score: 1, matchedFields: 7, conflicts: 0, certExact: true };
  const fieldsToCompare = [
    ["player", 0.3, "exact"], ["year", 0.14, "year"], ["brand", 0.08, "tokens"],
    ["setName", 0.18, "tokens"], ["cardNumber", 0.17, "exact"], ["parallel", 0.09, "tokens"],
    ["grade", 0.04, "tokens"]
  ];
  let score = 0;
  let matchedFields = 0;
  let conflicts = 0;
  fieldsToCompare.forEach(([key, weight, mode]) => {
    if (!identity[key] || !candidate[key]) return;
    const similarity = playerScanCardFieldMatch(candidate[key], identity[key], mode);
    if (similarity >= 0.72) {
      score += weight * similarity;
      matchedFields += 1;
    } else {
      conflicts += 1;
      score -= weight * 0.7;
    }
  });
  return { score: Math.max(0, Math.min(1, score)), matchedFields, conflicts, certExact: false };
}

async function playerScanImageSignatures(source, cacheKey = "") {
  if (!source) return [];
  if (cacheKey && playerScanImageSignatureCache.has(cacheKey)) return playerScanImageSignatureCache.get(cacheKey);
  const image = await loadPlayerFaceImage(source);
  const signatures = [1, 0.82, 0.66].map((scale) => {
    const canvas = document.createElement("canvas");
    canvas.width = 12;
    canvas.height = 16;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    const cropWidth = image.naturalWidth * scale;
    const cropHeight = image.naturalHeight * scale;
    context.drawImage(image, (image.naturalWidth - cropWidth) / 2, (image.naturalHeight - cropHeight) / 2, cropWidth, cropHeight, 0, 0, canvas.width, canvas.height);
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    const luminance = [];
    const color = [];
    for (let index = 0; index < pixels.length; index += 4) {
      luminance.push(pixels[index] * 0.299 + pixels[index + 1] * 0.587 + pixels[index + 2] * 0.114);
      color.push(pixels[index] / 255, pixels[index + 1] / 255, pixels[index + 2] / 255);
    }
    const mean = luminance.reduce((sum, value) => sum + value, 0) / Math.max(1, luminance.length);
    const deviation = Math.sqrt(luminance.reduce((sum, value) => sum + (value - mean) ** 2, 0) / Math.max(1, luminance.length)) || 1;
    return { luminance: luminance.map((value) => (value - mean) / deviation), color };
  });
  if (cacheKey) playerScanImageSignatureCache.set(cacheKey, signatures);
  return signatures;
}

function playerScanImageSignatureScore(left, right) {
  if (!left?.luminance?.length || !right?.luminance?.length || left.luminance.length !== right.luminance.length) return 0;
  const correlation = left.luminance.reduce((sum, value, index) => sum + value * right.luminance[index], 0) / left.luminance.length;
  const colorDifference = left.color.reduce((sum, value, index) => sum + Math.abs(value - right.color[index]), 0) / Math.max(1, left.color.length);
  return Math.max(0, Math.min(1, ((correlation + 1) / 2) * 0.72 + (1 - colorDifference) * 0.28));
}

async function playerScanImageMatchScore(querySignatures, source, cacheKey) {
  if (!querySignatures.length || !source) return 0;
  try {
    const referenceSignatures = await playerScanImageSignatures(source, cacheKey);
    return querySignatures.reduce((best, query) => Math.max(best, ...referenceSignatures.map((reference) => playerScanImageSignatureScore(query, reference))), 0);
  } catch {
    return 0;
  }
}

function playerScanCandidateIdentity(candidate, score, visualScore = 0) {
  const fieldConfidence = {};
  ["player", "sport", "year", "brand", "setName", "type", "parallel", "cardNumber", "grade", "certification"].forEach((key) => {
    if (candidate[key]) fieldConfidence[key] = Math.max(0.82, Math.min(0.98, score + (visualScore >= 0.86 ? 0.08 : 0)));
  });
  return {
    player: text(candidate.player), sport: text(candidate.sport), year: text(candidate.year), brand: text(candidate.brand),
    setName: playerScanNormalizedSetName(candidate.setName, candidate.brand), type: text(candidate.type), parallel: text(candidate.parallel),
    cardNumber: text(candidate.cardNumber), grade: text(candidate.grade), certification: text(candidate.certification),
    psaPopulation: candidate.psaPopulation || null, confidence: Math.round(score * 100), fieldConfidence,
    matchLevel: score >= 0.9 ? "exact" : score >= 0.72 ? "strong" : "partial",
    recognitionMethod: candidate.source === "psa-index" ? "certificate" : "catalog",
    matchSource: candidate.source === "psa-index"
      ? playerScanLocale("Verified card identity from the PSA index.", "已通过 PSA 数据库核验卡片身份。")
      : visualScore >= 0.86
        ? playerScanLocale("Matched against a known card identity and its image. Confirm before applying.", "已匹配已知卡片信息及图片，使用前请确认。")
        : playerScanLocale("Matched against a known card identity. Confirm every field before applying.", "已匹配已知卡片信息，使用前请逐项确认。"),
    rawText: ""
  };
}

async function rankPlayerScanCardCandidates(identity, imageSource) {
  const known = playerScanKnownIdentityCandidates();
  const scored = known.map((candidate) => ({ candidate, ...playerScanKnownCardScore(candidate, identity), visualScore: 0 }));
  let querySignatures = [];
  try { querySignatures = await playerScanImageSignatures(imageSource); } catch { querySignatures = []; }
  const visualPool = scored
    .filter((entry) => entry.candidate.image && (entry.score >= 0.14 || !identity.player))
    .sort((left, right) => right.score - left.score)
    .slice(0, 24);
  await Promise.all(visualPool.map(async (entry) => {
    entry.visualScore = await playerScanImageMatchScore(querySignatures, entry.candidate.image, `card:${entry.candidate.id}`);
    if (entry.visualScore >= 0.74) entry.score = Math.min(1, entry.score + (entry.visualScore - 0.7) * 0.72);
    if (entry.visualScore >= 0.9 && entry.matchedFields >= 1) entry.score = Math.max(entry.score, 0.8);
  }));
  const knownMatches = scored
    .filter((entry) => entry.certExact || entry.score >= 0.48 || (entry.visualScore >= 0.88 && entry.matchedFields >= 1))
    .sort((left, right) => right.score - left.score || right.visualScore - left.visualScore)
    .slice(0, 5)
    .map((entry) => {
      const cardIdentity = playerScanCandidateIdentity(entry.candidate, entry.score, entry.visualScore);
      cardIdentity.rawText = identity.rawText;
      return {
        id: playerScanCardCandidateId(cardIdentity, entry.candidate.source),
        name: cardIdentity.player,
        sport: cardIdentity.sport,
        score: entry.score,
        visualScore: entry.visualScore,
        identity: cardIdentity,
        matchReason: entry.certExact ? "certificate" : entry.visualScore >= 0.86 ? "catalog-image" : "catalog"
      };
    });
  const coreDetectedFields = [identity.year, identity.brand, identity.setName, identity.cardNumber].filter(Boolean).length;
  const detectedFields = coreDetectedFields + (identity.player ? 1 : 0) + (identity.parallel ? 1 : 0);
  const detectedCandidate = identity.player && coreDetectedFields >= 2 && detectedFields >= 3 ? {
    id: playerScanCardCandidateId(identity, "detected"),
    name: identity.player || playerScanLocale("Unconfirmed subject", "未确认主体"),
    sport: identity.sport,
    score: Math.max(0.42, Math.min(0.88, identity.confidence / 100)),
    visualScore: 0,
    identity: { ...identity, recognitionMethod: "text-card", matchSource: playerScanLocale("Identity assembled from text visible on the uploaded card. Review each field.", "根据上传卡片中的可见文字组合身份信息，请逐项核对。") },
    matchReason: "text-card"
  } : null;
  const candidates = [...knownMatches, ...(detectedCandidate ? [detectedCandidate] : [])]
    .filter((entry, index, all) => all.findIndex((item) => playerScanCardCandidateId(item.identity) === playerScanCardCandidateId(entry.identity)) === index)
    .sort((left, right) => right.score - left.score)
    .slice(0, 6);
  return candidates;
}

window.CardLedgerScanner = Object.freeze({
  identifyText: identifyCardFromScanText
});

function playerScanDirectory() {
  const entries = new Map();
  Object.entries(window.CARD_PLAYER_DIRECTORY || {}).forEach(([sport, players]) => {
    (Array.isArray(players) ? players : []).forEach((name) => {
      const key = normalizedPlayerScanText(name);
      if (!key) return;
      const prior = entries.get(key) || { name: text(name), sports: new Set() };
      prior.sports.add(sport);
      entries.set(key, prior);
    });
  });
  cards.forEach((card) => {
    const name = text(card.player);
    const key = normalizedPlayerScanText(name);
    if (!key) return;
    const prior = entries.get(key) || { name, sports: new Set() };
    if (card.sport) prior.sports.add(card.sport);
    entries.set(key, prior);
  });
  return [...entries.values()].map((entry) => ({ ...entry, sport: [...entry.sports][0] || "" }));
}

function rankPlayerScanMatches(scanText) {
  const directory = playerScanDirectory();
  const sourceWords = new Set(normalizedPlayerScanText(scanText).split(" ").filter(Boolean));
  const surnameFrequency = new Map();
  directory.forEach((entry) => {
    const tokens = normalizedPlayerScanText(entry.name).split(" ").filter((token) => token && !/^(?:jr|sr|ii|iii|iv)$/.test(token));
    const surname = tokens.at(-1) || "";
    if (surname.length >= 4) surnameFrequency.set(surname, (surnameFrequency.get(surname) || 0) + 1);
  });
  return directory
    .map((entry) => {
      const evidence = playerScanPhraseEvidence(entry.name, scanText);
      const tokens = normalizedPlayerScanText(entry.name).split(" ").filter((token) => token && !/^(?:jr|sr|ii|iii|iv)$/.test(token));
      const surname = tokens.at(-1) || "";
      const uniqueSurname = surname.length >= 4 && surnameFrequency.get(surname) === 1 && sourceWords.has(surname);
      const score = Math.max(evidence.score, uniqueSurname ? 0.84 : 0);
      return { ...entry, score, evidence, matchReason: evidence.exactPhrase ? "full-name" : uniqueSurname ? "surname" : "name-parts" };
    })
    .sort((left, right) => right.score - left.score || right.name.length - left.name.length || left.name.localeCompare(right.name));
}

function identifyPlayerOnlyFromText(scanText) {
  const ranked = rankPlayerScanMatches(scanText);
  const knownCandidates = ranked.filter((entry) => entry.score >= 0.62).slice(0, 6);
  const genericCandidates = playerScanGenericPlayers(text(scanText).split(/\n+/))
    .filter((entry) => entry.score >= 0.58)
    .map((entry) => ({ ...entry, sport: "", sports: new Set(), matchReason: "printed-line" }));
  const candidates = [...knownCandidates, ...genericCandidates]
    .filter((candidate, index, all) => all.findIndex((entry) => normalizedPlayerScanText(entry.name) === normalizedPlayerScanText(candidate.name)) === index)
    .sort((left, right) => right.score - left.score)
    .slice(0, 6);
  const selected = (candidates[0]?.score || 0) >= 0.78 ? candidates[0] : null;
  const selectedSports = selected?.sports instanceof Set ? [...selected.sports] : [];
  return {
    player: selected?.name || "",
    sport: selectedSports.length === 1 ? selectedSports[0] : text(selected?.sport),
    confidence: Math.round((candidates[0]?.score || 0) * 100),
    matchLevel: (candidates[0]?.score || 0) >= 0.9 ? "clear" : (candidates[0]?.score || 0) >= 0.78 ? "likely" : "review",
    candidates,
    rawText: text(scanText)
  };
}

function loadPlayerScanOcr() {
  if (window.Tesseract?.recognize) return Promise.resolve(window.Tesseract);
  if (playerScanOcrPromise) return playerScanOcrPromise;
  playerScanOcrPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
    script.async = true;
    script.addEventListener("load", () => window.Tesseract?.recognize ? resolve(window.Tesseract) : reject(new Error("Text reader did not initialize.")));
    script.addEventListener("error", () => reject(new Error("Text reader could not be downloaded.")));
    document.head.append(script);
  });
  return playerScanOcrPromise;
}

function loadPlayerFaceApi() {
  if (window.faceapi?.nets?.faceRecognitionNet) return Promise.resolve(window.faceapi);
  if (playerFaceApiPromise) return playerFaceApiPromise;
  playerFaceApiPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "./vendor/face-api/face-api.js?v=1.7.12";
    script.async = true;
    script.addEventListener("load", () => window.faceapi?.nets?.faceRecognitionNet ? resolve(window.faceapi) : reject(new Error("Visual matcher did not initialize.")));
    script.addEventListener("error", () => reject(new Error("Visual matcher could not be loaded.")));
    document.head.append(script);
  }).then(async (faceapi) => {
    const modelUri = new URL("./vendor/face-api/model", location.href).href.replace(/\/$/, "");
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(modelUri),
      faceapi.nets.faceLandmark68TinyNet.loadFromUri(modelUri),
      faceapi.nets.faceRecognitionNet.loadFromUri(modelUri)
    ]);
    return faceapi;
  });
  return playerFaceApiPromise;
}

function loadPlayerFaceImage(source) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.addEventListener("load", () => resolve(image), { once: true });
    image.addEventListener("error", () => reject(new Error("Player image could not be read.")), { once: true });
    image.src = source;
  });
}

async function detectPlayerFaceDescriptor(faceapi, imageSource, scoreThreshold = 0.14) {
  const image = await loadPlayerFaceImage(imageSource);
  const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 512, scoreThreshold });
  const detections = await faceapi.detectAllFaces(image, options).withFaceLandmarks(true).withFaceDescriptors();
  if (!detections.length) return null;
  return detections.sort((left, right) => {
    const leftBox = left.detection?.box;
    const rightBox = right.detection?.box;
    return (rightBox?.width || 0) * (rightBox?.height || 0) - (leftBox?.width || 0) * (leftBox?.height || 0);
  })[0];
}

function cachedPlayerFaceReferences() {
  try {
    const cached = JSON.parse(localStorage.getItem("card-ledger-player-face-references-v1") || "null");
    if (!Array.isArray(cached) || !cached.length) return null;
    const expected = new Set(DIY_PLAYER_LIBRARY.map((player) => player.id));
    if (cached.some((entry) => !expected.has(entry.id) || !Array.isArray(entry.descriptor) || entry.descriptor.length !== 128)) return null;
    return cached.map((entry) => ({ ...entry, descriptor: new Float32Array(entry.descriptor) }));
  } catch {
    return null;
  }
}

async function loadPlayerFaceReferences(faceapi) {
  const cached = cachedPlayerFaceReferences();
  if (playerFaceReferencePromise) return playerFaceReferencePromise;
  playerFaceReferencePromise = (async () => {
    const publicReferences = cached || [];
    if (!cached) {
      for (let index = 0; index < DIY_PLAYER_LIBRARY.length; index += 1) {
        const player = DIY_PLAYER_LIBRARY[index];
        setPlayerScanStatus(playerScanLocale(
          `Preparing visual player library ${index + 1}/${DIY_PLAYER_LIBRARY.length}...`,
          `正在准备球员照片库 ${index + 1}/${DIY_PLAYER_LIBRARY.length}……`
        ));
        try {
          const result = await detectPlayerFaceDescriptor(faceapi, player.image, 0.12);
          if (result?.descriptor) publicReferences.push({ id: player.id, name: player.name, sport: player.sport, descriptor: result.descriptor });
        } catch {
          // One unusable reference should not disable the rest of the visual library.
        }
      }
      try {
        localStorage.setItem("card-ledger-player-face-references-v1", JSON.stringify(publicReferences.map((entry) => ({ ...entry, descriptor: [...entry.descriptor] }))));
      } catch {
        // Matching still works for this session when browser storage is unavailable.
      }
    }

    const coveredPlayers = new Set(publicReferences.map((entry) => normalizedPlayerScanText(entry.name)));
    const collectionSources = cards
      .filter((card) => text(card.player) && text(card.image) && !coveredPlayers.has(normalizedPlayerScanText(card.player)))
      .filter((card, index, all) => all.findIndex((entry) => normalizedPlayerScanText(entry.player) === normalizedPlayerScanText(card.player)) === index)
      .slice(0, 20);
    const collectionReferences = [];
    for (let index = 0; index < collectionSources.length; index += 1) {
      const card = collectionSources[index];
      setPlayerScanStatus(playerScanLocale(
        `Learning from collection photos ${index + 1}/${collectionSources.length}...`,
        `正在读取收藏照片 ${index + 1}/${collectionSources.length}……`
      ));
      try {
        const result = await detectPlayerFaceDescriptor(faceapi, card.image, 0.1);
        if (result?.descriptor) collectionReferences.push({ id: `collection-${card.id}`, name: card.player, sport: card.sport, descriptor: result.descriptor });
      } catch {
        // Remote images without cross-origin access are simply skipped.
      }
    }
    return [...publicReferences, ...collectionReferences];
  })();
  return playerFaceReferencePromise;
}

async function identifyPlayerFromFace(imageSource) {
  const faceapi = await loadPlayerFaceApi();
  setPlayerScanStatus(playerScanLocale("No reliable name found. Looking for a face...", "未找到可靠姓名，正在检测卡面人物……"));
  const query = await detectPlayerFaceDescriptor(faceapi, imageSource, 0.1);
  if (!query?.descriptor) return { player: "", sport: "", confidence: 0, candidates: [], faceFound: false, referenceCount: 0 };
  const references = await loadPlayerFaceReferences(faceapi);
  const candidates = references
    .map((reference) => {
      const distance = faceapi.euclideanDistance(query.descriptor, reference.descriptor);
      return {
        name: reference.name,
        sport: reference.sport,
        sports: new Set(reference.sport ? [reference.sport] : []),
        distance,
        score: Math.max(0.35, Math.min(0.98, 1.28 - distance)),
        matchReason: "visual-face"
      };
    })
    .filter((candidate) => candidate.distance <= 0.72)
    .sort((left, right) => left.distance - right.distance)
    .slice(0, 4);
  const selected = candidates[0]?.distance <= 0.5 ? candidates[0] : null;
  return {
    player: selected?.name || "",
    sport: selected?.sport || "",
    confidence: Math.round((candidates[0]?.score || 0) * 100),
    matchLevel: selected ? "likely" : "review",
    candidates,
    faceFound: true,
    referenceCount: references.length
  };
}

async function preprocessPlayerScanImage(imageSource) {
  const image = new Image();
  image.src = imageSource;
  await image.decode();
  const sourceWidth = Math.max(1, image.naturalWidth);
  const sourceHeight = Math.max(1, image.naturalHeight);
  const targetWidth = Math.round(Math.min(1600, Math.max(1200, sourceWidth * 1.8)));
  const regions = [
    { y: 0, height: sourceHeight },
    { y: 0, height: Math.max(1, sourceHeight * 0.3) },
    { y: sourceHeight * 0.62, height: Math.max(1, sourceHeight * 0.38) }
  ].map((region) => ({ ...region, outputHeight: Math.max(1, Math.round(region.height * targetWidth / sourceWidth)) }));
  const gap = 24;
  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = regions.reduce((sum, region) => sum + region.outputHeight, 0) + gap * (regions.length - 1);
  const context = canvas.getContext("2d", { alpha: false });
  context.fillStyle = "#fff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.filter = "grayscale(1) contrast(1.45) brightness(1.08)";
  let offsetY = 0;
  regions.forEach((region, index) => {
    context.drawImage(image, 0, region.y, sourceWidth, region.height, 0, offsetY, targetWidth, region.outputHeight);
    offsetY += region.outputHeight;
    if (index < regions.length - 1) {
      context.filter = "none";
      context.fillStyle = "#fff";
      context.fillRect(0, offsetY, targetWidth, gap);
      context.filter = "grayscale(1) contrast(1.45) brightness(1.08)";
      offsetY += gap;
    }
  });
  return canvas.toDataURL("image/png");
}

async function readPlayerScanBarcodes(imageSource) {
  if (!window.BarcodeDetector) return "";
  try {
    const supported = typeof window.BarcodeDetector.getSupportedFormats === "function"
      ? await window.BarcodeDetector.getSupportedFormats()
      : ["code_128", "qr_code", "data_matrix"];
    const formats = ["code_128", "qr_code", "data_matrix", "ean_13"].filter((format) => supported.includes(format));
    if (!formats.length) return "";
    const detector = new window.BarcodeDetector({ formats });
    const image = new Image();
    image.src = imageSource;
    await image.decode();
    const detections = await detector.detect(image);
    return detections.map((entry) => text(entry.rawValue)).filter(Boolean).join("\n");
  } catch {
    return "";
  }
}

function playerScanTextHasStrongIdentity(value) {
  return (rankPlayerScanMatches(value)[0]?.score || 0) >= 0.84;
}

function setPlayerScanStatus(message) {
  if (playerScanElements.status) playerScanElements.status.textContent = message;
  if (globalScanElements.status && !globalScanElements.drawer?.classList.contains("hidden")) {
    globalScanElements.status.textContent = message;
  }
}

async function readPlayerScanText(image, filename = "") {
  const [nativeText, barcodeText] = await Promise.all([readTextFromScan(image), readPlayerScanBarcodes(image)]);
  const nativeScanText = `${nativeText}\n${barcodeText}`;
  if (playerScanTextHasStrongIdentity(nativeScanText)) return nativeScanText;
  setPlayerScanStatus(playerScanLocale("Loading the on-device text reader...", "正在加载本机文字识别器……"));
  const tesseract = await loadPlayerScanOcr();
  const preparedImage = await preprocessPlayerScanImage(image);
  const result = await tesseract.recognize(preparedImage, "eng", {
    logger: (event) => {
      if (event.status !== "recognizing text") return;
      const percent = Math.round((event.progress || 0) * 100);
      setPlayerScanStatus(playerScanLocale(`Finding the printed player name... ${percent}%`, `正在识别卡面球员姓名……${percent}%`));
    },
    preserve_interword_spaces: "1"
  });
  return `${nativeText}\n${barcodeText}\n${text(result?.data?.text)}`;
}

function renderPlayerScanMatches(matches, confident = true) {
  playerScanMatches = matches;
  if (!playerScanElements.match) return;
  if (!matches.length) {
    playerScanElements.match.innerHTML = `<option value="">${playerScanLocale("No card match found", "未找到匹配卡片")}</option>`;
    playerScanElements.match.disabled = true;
    setPlayerScanApplyState();
    return;
  }
  const firstLabel = confident ? "" : `<option value="">${playerScanLocale("Choose the closest card", "请选择最接近的卡片")}</option>`;
  playerScanElements.match.innerHTML = `${firstLabel}${matches.map((match) => {
    const method = match.matchReason === "certificate"
      ? playerScanLocale("PSA", "PSA")
      : match.matchReason === "catalog-image"
        ? playerScanLocale("catalog + image", "目录 + 图片")
        : match.matchReason === "catalog"
          ? playerScanLocale("catalog", "目录")
          : playerScanLocale("card text", "卡面文字");
    const label = playerScanCardTitle(match.identity) || match.name;
    return `<option value="${escapeHtml(match.id)}">${escapeHtml(label)}${match.score ? ` · ${method} ${Math.round(match.score * 100)}%` : ""}</option>`;
  }).join("")}`;
  playerScanElements.match.disabled = false;
  setPlayerScanApplyState();
}

function playerScanReviewIdentity() {
  const selectedId = text(playerScanElements.match?.value);
  const selectedMatch = playerScanMatches.find((entry) => entry.id === selectedId);
  return selectedMatch?.identity
    ? { ...selectedMatch.identity, confidence: Math.round(selectedMatch.score * 100) }
    : { ...(playerScanIdentity || {}) };
}

function setPlayerScanApplyState() {
  if (!playerScanElements.apply) return;
  const identity = playerScanReviewIdentity();
  const coreFields = [identity.year, identity.brand, identity.setName, identity.cardNumber].filter(Boolean).length;
  playerScanElements.apply.disabled = !identity.player || coreFields < 2;
}

function renderPlayerScanIdentity(identity) {
  playerScanIdentity = identity;
  playerScanElements.identity?.classList.remove("hidden");
  if (playerScanElements.selectedName) playerScanElements.selectedName.textContent = identity.player || playerScanLocale("Choose a card candidate", "请选择候选卡片");
  if (playerScanElements.selectedSport) {
    playerScanElements.selectedSport.textContent = [identity.sport, identity.year, identity.brand, identity.setName].filter(Boolean).join(" · ")
      || playerScanLocale("Card identity not confirmed", "卡片身份尚未确认");
  }
  if (playerScanElements.confidence) {
    const level = identity.recognitionMethod === "certificate"
      ? playerScanLocale("Certificate match", "证书匹配")
      : identity.recognitionMethod === "catalog"
        ? playerScanLocale("Catalog match", "目录匹配")
        : identity.confidence >= 90
      ? playerScanLocale("Strong identity", "高可信身份")
      : identity.confidence >= 72
        ? playerScanLocale("Likely", "较可能")
        : playerScanLocale("Review", "请确认");
    playerScanElements.confidence.textContent = `${level} · ${identity.confidence}%`;
    playerScanElements.confidence.classList.toggle("low", identity.confidence < 72);
  }
  if (playerScanElements.source) playerScanElements.source.textContent = identity.matchSource || playerScanLocale("Review the detected identity before applying it.", "应用前请核对识别出的卡片身份。");
  if (playerScanElements.cardDetails) {
    const details = [
      [playerScanLocale("Year", "年份"), identity.year], [playerScanLocale("Brand", "品牌"), identity.brand],
      [playerScanLocale("Set", "系列"), identity.setName], [playerScanLocale("Card no.", "卡号"), identity.cardNumber],
      [playerScanLocale("Parallel", "平行版本"), identity.parallel], [playerScanLocale("Grade", "评级"), identity.grade]
    ].filter(([, value]) => value);
    playerScanElements.cardDetails.innerHTML = details.map(([label, value]) => `<span><small>${escapeHtml(label)}</small><strong>${escapeHtml(value)}</strong></span>`).join("");
    playerScanElements.cardDetails.classList.toggle("hidden", !details.length);
  }
  if (playerScanElements.evidence) playerScanElements.evidence.textContent = identity.rawText || playerScanLocale("No readable text was found.", "未读取到清晰文字。");
  setPlayerScanApplyState();
}

function resetPlayerScanIdentity() {
  playerScanIdentity = null;
  playerScanMatches = [];
  pendingScannedCardImage = "";
  if (playerScanElements.file) playerScanElements.file.value = "";
  if (playerScanElements.preview) {
    playerScanElements.preview.src = "";
    playerScanElements.preview.classList.add("hidden");
  }
  if (playerScanElements.match) {
    playerScanElements.match.innerHTML = `<option value="">${playerScanLocale("Scan a card first", "请先扫描卡片")}</option>`;
    playerScanElements.match.disabled = true;
  }
  playerScanElements.identity?.classList.add("hidden");
  if (playerScanElements.selectedName) playerScanElements.selectedName.textContent = playerScanLocale("No card selected", "尚未选择卡片");
  if (playerScanElements.selectedSport) playerScanElements.selectedSport.textContent = playerScanLocale("Card identity not confirmed", "卡片身份尚未确认");
  if (playerScanElements.cardDetails) playerScanElements.cardDetails.innerHTML = "";
  if (playerScanElements.evidence) playerScanElements.evidence.textContent = playerScanLocale("No text read yet.", "尚未读取文字。");
  if (playerScanElements.source) playerScanElements.source.textContent = playerScanLocale("Review every detected field before applying it.", "应用前请逐项核对识别结果。");
  setPlayerScanStatus(playerScanLocale("Ready to identify a card.", "可以开始识别卡片。"));
  if (playerScanElements.apply) playerScanElements.apply.disabled = true;
  if (globalScanElements.file) globalScanElements.file.value = "";
  if (globalScanElements.preview) globalScanElements.preview.removeAttribute("src");
  globalScanElements.empty?.classList.remove("hidden");
  globalScanElements.result?.classList.add("hidden");
  if (globalScanElements.review) globalScanElements.review.disabled = true;
}

function renderGlobalScanResult(identity, image) {
  if (!globalScanElements.result) return;
  const reviewed = playerScanReviewIdentity();
  const coreFields = [reviewed.year, reviewed.brand, reviewed.setName, reviewed.cardNumber].filter(Boolean).length;
  const cardConfirmed = Boolean(reviewed.player && coreFields >= 2);
  const selectedId = text(playerScanElements.match?.value);
  const alternatives = playerScanMatches.filter((entry) => entry.id !== selectedId).slice(0, 3);
  const details = alternatives.map((entry) => [
    playerScanLocale("Other candidate", "其他候选"),
    `${playerScanCardTitle(entry.identity) || entry.name} · ${Math.round(entry.score * 100)}%`
  ]);
  if (globalScanElements.preview) globalScanElements.preview.src = image;
  if (globalScanElements.confidence) {
    const confidence = Number(reviewed.confidence || identity.confidence || 0);
    const level = reviewed.recognitionMethod === "certificate"
      ? playerScanLocale("Certificate match", "证书匹配")
      : reviewed.recognitionMethod === "catalog"
        ? playerScanLocale("Catalog match", "目录匹配")
        : confidence >= 86
          ? playerScanLocale("Strong identity", "高可信身份")
          : confidence >= 64
            ? playerScanLocale("Possible identity", "可能身份")
            : playerScanLocale("Review required", "需要确认");
    globalScanElements.confidence.textContent = `${level} · ${confidence}%`;
    globalScanElements.confidence.classList.toggle("low", confidence < 64);
  }
  if (globalScanElements.title) {
    globalScanElements.title.textContent = cardConfirmed
      ? playerScanCardTitle(reviewed)
      : reviewed.player
        ? `${reviewed.player} · ${playerScanLocale("exact card not confirmed", "具体卡片未确认")}`
        : playerScanLocale("Card not confirmed", "尚未确认卡片");
  }
  if (globalScanElements.meta) {
    globalScanElements.meta.textContent = [reviewed.sport, reviewed.type, reviewed.parallel, reviewed.grade].filter(Boolean).join(" · ")
      || playerScanLocale("Choose a candidate or try clearer front and back photos.", "请选择候选卡片，或重新上传更清晰的正反面照片。");
  }
  if (globalScanElements.details) {
    globalScanElements.details.innerHTML = details.map(([label, value]) => `<span><small>${escapeHtml(label)}</small>${escapeHtml(value)}</span>`).join("");
    globalScanElements.details.classList.toggle("hidden", !details.length);
  }
  globalScanElements.empty?.classList.add("hidden");
  globalScanElements.result.classList.remove("hidden");
  if (globalScanElements.review) globalScanElements.review.disabled = !reviewed.player && !playerScanMatches.length;
}

function syncGlobalScannerLanguage() {
  const copy = [
    ["#globalScanTitle", "Identify the exact card", "识别具体卡片"],
    ["#globalScanDescription", "Card Ledger reads slab labels and card text, checks known card identities, then ranks the closest matches for you to confirm.", "卡藏账本会读取评级标签与卡面文字，对照已知卡片目录，再由你确认最接近的结果。"],
    ["#globalScanChoose strong", "Take or upload the card", "拍摄或上传卡片"],
    ["#globalScanChoose small", "Select the front and optional back together. Keep the full card, label, and printed text sharp.", "可同时选择正面和反面。请确保卡片边缘、评级标签及卡面文字清晰。"],
    ["#globalScanEmpty p", "Your result will appear here without leaving the page.", "无需离开当前页面，识别结果会显示在这里。"],
    ["#globalScanAgain", "Scan another", "继续扫描"],
    ["#globalScanReview", "Review card in Add Card", "前往添加卡片确认"],
    ["#openGlobalScanner span:last-child", "Identify card", "识别卡片"]
  ];
  copy.forEach(([selector, english, chinese]) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = currentLanguage === "zh-CN" ? chinese : translatedText(english);
  });
  const scanLabel = currentLanguage === "zh-CN" ? "识别卡片" : translatedText("Identify card");
  globalScanElements.open?.setAttribute("title", scanLabel);
  globalScanElements.open?.setAttribute("aria-label", scanLabel);
}

function openGlobalScanner() {
  if (!requireMember("scan a card from the top toolbar")) return;
  globalScannerReturnFocus = document.activeElement;
  syncGlobalScannerLanguage();
  globalScanElements.backdrop?.classList.remove("hidden");
  globalScanElements.drawer?.classList.remove("hidden");
  document.body.classList.add("global-scan-open");
  globalScanElements.open?.setAttribute("aria-expanded", "true");
  if (!globalScanElements.result?.classList.contains("hidden") && globalScanElements.status && playerScanElements.status) {
    globalScanElements.status.textContent = playerScanElements.status.textContent;
  }
  window.setTimeout(() => globalScanElements.choose?.focus(), 30);
}

function closeGlobalScanner({ restoreFocus = true } = {}) {
  globalScanElements.backdrop?.classList.add("hidden");
  globalScanElements.drawer?.classList.add("hidden");
  document.body.classList.remove("global-scan-open");
  globalScanElements.open?.setAttribute("aria-expanded", "false");
  if (restoreFocus && globalScannerReturnFocus instanceof HTMLElement) globalScannerReturnFocus.focus();
}

function chooseGlobalScanPhoto() {
  if (!globalScanElements.file) return;
  globalScanElements.file.value = "";
  globalScanElements.file.click();
}

function reviewGlobalScanInAddCard() {
  closeGlobalScanner({ restoreFocus: false });
  setActivePage("collection");
  setEntryMode("card");
  setFocusWorkspaceView("collection", "add", { scroll: false });
  history.replaceState(null, "", `${location.pathname}${location.search}#entryArea`);
  requestAnimationFrame(() => {
    document.querySelector("#entryArea")?.scrollIntoView({ behavior: "smooth", block: "start" });
    playerScanElements.match?.focus();
  });
}

function readPlayerScanFile(file) {
  if (!file) return Promise.resolve("");
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(file);
  });
}

async function identifyPlayerFromPhoto(input = playerScanElements.file) {
  const files = [...(input?.files || [])].slice(0, 2);
  if (!files.length) return;
  if (!requireMember("scan a card photo")) {
    input.value = "";
    return;
  }
  const images = await Promise.all(files.map(readPlayerScanFile));
  const image = images[0];
  if (!image) return;
  pendingScannedCardImage = image;
  playerScanElements.preview.src = image;
  playerScanElements.preview.classList.remove("hidden");
  playerScanElements.match.disabled = true;
  playerScanElements.apply.disabled = true;
  playerScanElements.identity?.classList.add("hidden");
  setPlayerScanStatus(playerScanLocale("Reading the card identity...", "正在读取卡片身份……"));
  const scanParts = [];
  const scanErrors = [];
  for (let index = 0; index < images.length; index += 1) {
    setPlayerScanStatus(playerScanLocale(`Reading image ${index + 1} of ${images.length}...`, `正在识别第 ${index + 1}/${images.length} 张图片……`));
    try {
      scanParts.push(await readPlayerScanText(images[index], files[index].name));
    } catch (error) {
      scanErrors.push(text(error?.message) || `image ${index + 1} could not be read`);
      scanParts.push("");
    }
  }
  const scanText = scanParts.join("\n");
  const scanError = scanErrors.join("; ");
  let identity = identifyCardFromScanText(scanText);
  let visualError = "";
  if (!identity.player) {
    try {
      const visualResult = await identifyPlayerFromFace(image);
      if (visualResult.player) {
        identity.player = visualResult.player;
        identity.sport ||= visualResult.sport;
        identity.fieldConfidence = { ...(identity.fieldConfidence || {}), player: visualResult.confidence / 100 };
        if (identity.sport) identity.fieldConfidence.sport = Math.max(identity.fieldConfidence.sport || 0, visualResult.confidence / 100 * 0.86);
        identity = playerScanRecalculateConfidence(identity);
        identity.matchSource = playerScanLocale(
          `Card text was incomplete. The player was suggested from a local comparison with ${visualResult.referenceCount} player photos; confirm every card field.`,
          `卡面文字不完整。球员由本机 ${visualResult.referenceCount} 张照片比对提示；请确认所有卡片字段。`
        );
      }
    } catch (error) {
      visualError = text(error?.message) || playerScanLocale("Visual matching was unavailable.", "图像匹配暂不可用。");
    }
  }
  identity = await enrichPlayerScanIdentity(identity);
  const candidates = await rankPlayerScanCardCandidates(identity, image);
  const top = candidates[0];
  const runnerUp = candidates[1];
  const autoSelect = Boolean(top && (
    top.matchReason === "certificate"
    || (top.score >= 0.76 && top.score - (runnerUp?.score || 0) >= 0.06)
  ));
  renderPlayerScanMatches(candidates, autoSelect);
  if (autoSelect && top) playerScanElements.match.value = top.id;
  const reviewedIdentity = autoSelect && top ? top.identity : identity;
  renderPlayerScanIdentity(reviewedIdentity);
  const resultMessage = top?.matchReason === "certificate"
    ? playerScanLocale("PSA certificate matched. Confirm the card details before adding it.", "PSA 证书已匹配，添加前请确认卡片信息。")
    : candidates.length
      ? autoSelect
        ? playerScanLocale("A strong card match was found. Confirm it before applying.", "已找到高可信卡片匹配，使用前请确认。")
        : playerScanLocale("Several possible cards were found. Choose the closest match, then confirm every field.", "已找到多个可能结果。请选择最接近的卡片，并逐项确认。")
      : scanError
        ? playerScanLocale(`The text reader was limited (${scanError}). Try a sharper front and back photo.`, `文字识别受限（${scanError}）。请重试更清晰的正反面照片。`)
        : visualError
          ? playerScanLocale(`No exact identity was found. Visual fallback: ${visualError}`, `未找到具体卡片身份。图像辅助：${visualError}`)
          : playerScanLocale("No exact card identity was found. Try a straight-on image with the full label and card number visible.", "未找到具体卡片身份。请上传正对、标签与卡号完整可见的照片。");
  setPlayerScanStatus(resultMessage);
  renderGlobalScanResult(reviewedIdentity, image);
}

function applyPlayerScanMatch() {
  if (!requireMember("apply a scanned card")) return;
  const identity = playerScanReviewIdentity();
  if (!identity.player) return;
  if (identity.sport) fields.sport.value = identity.sport;
  if (identity.year) fields.year.value = identity.year;
  const selectedSport = identity.sport || fields.sport.value;
  const seed = {
    sport: selectedSport,
    year: identity.year || fields.year.value,
    brand: identity.brand,
    setName: identity.setName,
    player: identity.player
  };
  window.CardLedgerCardSelectors?.setPendingPlayer?.(identity.player, selectedSport);
  window.CardLedgerCardSelectors?.sync?.(seed);
  window.CardLedgerAdvanced?.syncCardSelectors?.(seed);
  if (identity.type) fields.type.value = identity.type;
  if (identity.parallel) fields.parallel.value = identity.parallel;
  if (identity.cardNumber) fields.cardNumber.value = identity.cardNumber;
  if (identity.grade) fields.grade.value = identity.grade;
  if (identity.certification) fields.certification.value = identity.certification;
  if (identity.grade) fields.condition.value = "Graded";
  pendingPsaPopulation = identity.psaPopulation || null;
  renderPsaCardLookup();
  playerScanElements.status.textContent = playerScanLocale(
    `${playerScanCardTitle(identity)} is ready in the form. Review the highlighted identity before saving.`,
    `${playerScanCardTitle(identity)} 已填入表单。保存前请复核卡片身份。`
  );
  queueMicrotask(updateBeginnerEntryGuide);
}

async function captureScanCard() {
  if (SCAN_PAUSED) {
    els.scanStatus.textContent = "Camera scanning is paused for now.";
    return;
  }
  if (!scanElements.video.srcObject || !scanElements.video.videoWidth) {
    els.scanStatus.textContent = "Start the camera before capturing.";
    return;
  }
  const canvas = scanElements.canvas;
  canvas.width = scanElements.video.videoWidth;
  canvas.height = scanElements.video.videoHeight;
  canvas.getContext("2d").drawImage(scanElements.video, 0, 0, canvas.width, canvas.height);
  const image = canvas.toDataURL("image/jpeg", 0.86);
  scanElements.preview.src = image;
  scanElements.preview.classList.remove("hidden");
  const scanText = await readTextFromScan(image);
  const parsed = parseScannedCardText(scanText);
  const now = new Date().toISOString();
  const card = {
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    ...parsed,
    grade: "",
    quantity: 1,
    paid: 0,
    value: 0,
    location: "Camera scan",
    image,
    notes: scanText ? `Camera scan OCR:\n${scanText}` : "Camera scan inserted automatically. Browser text recognition was unavailable, so edit the card details if needed."
  };
  cards.unshift(card);
  saveCards();
  syncGoalSlotsFromCard(card);
  collectionExpanded = true;
  render();
  els.scanStatus.textContent = scanText ? "Card inserted from camera scan. OCR text was added to notes." : "Card image inserted. Edit the card details when ready.";
}

function comparableText(value) {
  return text(value)
    .toLowerCase()
    .replaceAll("&", " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\bpanini\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hasAllWords(haystack, needle) {
  const source = comparableText(haystack);
  return comparableText(needle)
    .split(" ")
    .filter(Boolean)
    .every((word) => source.includes(word));
}

function cardSlotId(card) {
  const number = text(card.cardNumber).replace(/^#/, "").replace(/^no\.?\s*/i, "");
  const numericPart = number.match(/\d+/)?.[0];
  return numericPart ? `#${Number.parseInt(numericPart, 10)}` : number ? `#${number}` : "";
}

function isDonrussOptic2018Goal(goal) {
  return (
    goal.type === "number" &&
    text(goal.season) === "2018-19" &&
    hasAllWords(goal.setName, "Donruss Optic")
  );
}

function isDonrussOptic2018MojoGoal(goal) {
  return isDonrussOptic2018Goal(goal) && hasAllWords(goal.parallel, "Mojo Red /88");
}

function isDonrussOptic2018InsertGoal(goal) {
  return isDonrussOptic2018Goal(goal) && hasAllWords(goal.parallel, "Red /99");
}

function goalSlotPlayer(goal, slotId) {
  return goal.slots?.[slotId]?.player || (isDonrussOptic2018MojoGoal(goal) ? DONRUSS_OPTIC_2018_PLAYERS[slotId] || "" : "");
}

function goalSlotLabel(goal, slotId) {
  return [slotId, goalSlotPlayer(goal, slotId)].filter(Boolean).join(" ");
}

function cardMatchesGoalBase(card, goal) {
  if (goal.player && !hasAllWords(card.player, goal.player)) return false;
  if (goal.setName && !hasAllWords(card.setName, goal.setName)) return false;
  if (goal.parallel && !hasAllWords(card.parallel, goal.parallel)) return false;
  return true;
}

function cardMatchesGoalSlot(card, goal, slotId) {
  if (!cardMatchesGoalBase(card, goal)) return false;
  if (goal.type === "number") {
    return text(card.year) === text(goal.season) && cardSlotId(card) === slotId;
  }
  return text(card.year) === slotId;
}

function syncGoalSlotsFromCard(card) {
  let changed = false;
  goals.forEach((goal) => {
    Object.keys(goal.slots || {}).forEach((slotId) => {
      if (!goal.slots[slotId]?.owned && cardMatchesGoalSlot(card, goal, slotId)) {
        goal.slots[slotId].owned = true;
        changed = true;
      }
    });
  });
  if (changed) saveGoals();
  return changed;
}

function syncAllGoalSlotsFromCards() {
  let changed = false;
  cards.forEach((card) => {
    changed = syncGoalSlotsFromCard(card) || changed;
  });
  if (changed) saveGoals();
}

function resetForm() {
  form.reset();
  resetPlayerScanIdentity();
  window.CardLedgerCardSelectors?.clearPendingPlayer?.();
  Object.values(catalogCustomFields).forEach((input) => {
    if (!input) return;
    input.value = "";
    input.required = false;
    input.classList.add("hidden");
  });
  pendingPsaPopulation = null;
  fields.id.value = "";
  fields.quantity.value = "1";
  fields.condition.value = "Raw";
  form.querySelector(".primary-button").textContent = "Save Card";
  window.CardLedgerCardSelectors?.sync?.();
  window.CardLedgerAdvanced?.syncCardSelectors?.();
  renderPsaCardLookup();
  queueMicrotask(updateBeginnerEntryGuide);
}

function cardTitle(card) {
  return [card.year, card.player].filter(Boolean).join(" ") || fixedCardName(card) || "Untitled card";
}

function cardMeta(card) {
  const setLine = [card.brand, card.setName, card.cardNumber && `#${card.cardNumber}`]
    .filter((value, index, values) => value && !(index === 0 && text(values[1]).toLowerCase().startsWith(text(value).toLowerCase())))
    .join(" ");
  return [setLine, card.type, card.parallel, card.grade || card.condition, card.certification && `Cert ${card.certification}`].filter(Boolean).join(" · ");
}

function displayNote(note) {
  return text(note).replace(/^Entered from user list:\s*/i, "");
}

function cardNeedsCollectionReview(card) {
  const missingIdentity = !text(card.year) || !text(card.setName) || !text(card.player) || !text(card.cardNumber);
  const missingGradedCert = /\b(?:psa|bgs|sgc)\b/i.test(text(card.grade)) && !text(card.certification);
  return missingIdentity || missingGradedCert;
}

function cardMatchesCollectionQuickFilter(card) {
  switch (collectionQuickFilter) {
    case "psa": return isPsaGrade(card.grade);
    case "missing-image": return !text(card.image);
    case "review": return cardNeedsCollectionReview(card);
    default: return true;
  }
}

function filteredCards() {
  const query = text(els.search.value).toLowerCase();
  const sport = els.sportFilter.value;
  const portfolioCards = window.CardLedgerAdvanced?.portfolioCards?.(cards) || cards;
  const matching = portfolioCards.filter((card) => {
    if (cardMatchesAnyGoal(card)) return false;
    const haystack = Object.values(card).join(" ").toLowerCase();
    return (!query || haystack.includes(query)) && (!sport || card.sport === sport) && cardMatchesCollectionQuickFilter(card);
  });

  const sorted = matching.sort((a, b) => {
    switch (els.sortBy.value) {
      case "playerAsc":
        return a.player.localeCompare(b.player);
      case "valueDesc":
        return estimatedCardValue(b) * b.quantity - estimatedCardValue(a) * a.quantity;
      case "yearDesc":
        return Number(b.year) - Number(a.year);
      case "sportAsc":
        return a.sport.localeCompare(b.sport);
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });
  return window.CardLedgerAdvanced?.paginateCards?.(sorted) || sorted;
}

function renderStats() {
  const totals = cards.reduce(
    (sum, card) => {
      sum.count += card.quantity;
      sum.value += estimatedCardValue(card) * card.quantity;
      sum.cost += card.paid * card.quantity;
      return sum;
    },
    { count: 0, value: 0, cost: 0 }
  );

  els.totalCards.textContent = totals.count.toLocaleString();
  renderMoney(els.totalValue, totals.value);
  renderMoney(els.totalCost, totals.cost);
  renderMoney(els.netValue, totals.value - totals.cost);
  if (els.landingCards) els.landingCards.textContent = totals.count.toLocaleString();
  if (els.landingValue) els.landingValue.textContent = money(totals.value);
  if (els.landingGoals) els.landingGoals.textContent = goals.length.toLocaleString();
  renderNextBestAction(totals);
}

function renderCollectionHealth() {
  const total = cards.length;
  const photos = cards.filter((card) => text(card.image)).length;
  const psaVerified = cards.filter((card) => normalizePsaPopulation(card.psaPopulation)).length;
  const needsReview = cards.filter(cardNeedsCollectionReview).length;
  let earned = 0;
  let possible = 0;
  cards.forEach((card) => {
    [card.year, card.setName, card.player, card.cardNumber, card.image].forEach((value) => {
      possible += 1;
      if (text(value)) earned += 1;
    });
    if (/\b(?:psa|bgs|sgc)\b/i.test(text(card.grade))) {
      possible += 1;
      if (text(card.certification)) earned += 1;
    }
  });
  const health = possible ? Math.round((earned / possible) * 100) : 0;
  const photoCoverage = total ? Math.round((photos / total) * 100) : 0;
  if (els.collectionHealthSummary) {
    els.collectionHealthSummary.textContent = total
      ? `${health}% complete · ${Math.max(total - needsReview, 0)} of ${total} records ready`
      : "Add cards to see catalog coverage.";
  }
  if (els.collectionHealthBar) els.collectionHealthBar.style.width = `${health}%`;
  if (els.collectionPhotoCoverage) els.collectionPhotoCoverage.textContent = `${photoCoverage}%`;
  if (els.collectionPsaCoverage) els.collectionPsaCoverage.textContent = psaVerified.toLocaleString();
  if (els.collectionReviewCount) els.collectionReviewCount.textContent = needsReview.toLocaleString();
  if (els.collectionReviewIssues) els.collectionReviewIssues.disabled = needsReview === 0;
  els.collectionQuickFilters?.forEach((button) => button.classList.toggle("active", button.dataset.collectionFilter === collectionQuickFilter));
}

function renderNextBestAction(totals) {
  if (!els.nextBestAction) return;
  const missing = missingGoalSlots();
  const lowConfidence = cards.find((card) => pricingConfidence(card).score < 45);
  const activeDeal = dealRooms.find((deal) => deal.status !== "completed");
  let action = {
    title: "Add your first card",
    body: "Start with fixed-format entry or photo import.",
    href: "#entryArea",
    label: "Add Card"
  };
  if (missing.length) {
    const target = missing[0];
    action = {
      title: `${missing.length} missing card${missing.length === 1 ? "" : "s"} to watch`,
      body: target.query,
      href: "#goalAssistantArea",
      label: "Review Missing"
    };
  } else if (lowConfidence) {
    action = {
      title: "Improve pricing confidence",
      body: `${fixedCardName(lowConfidence)} needs better sales data.`,
      href: "#pricingLabArea",
      label: "Check Values"
    };
  } else if (activeDeal) {
    action = {
      title: "Deal still open",
      body: `${activeDeal.participants || "Private deal"} is ${activeDeal.status}.`,
      href: "#dealRoomArea",
      label: "Open Deals"
    };
  } else if (totals.count) {
    action = {
      title: "Collection is up to date",
      body: "Review performance or add the next purchase.",
      href: "#portfolioArea",
      label: "View Performance"
    };
  }
  els.nextBestAction.innerHTML = `
    <div>
      <small>Next best action</small>
      <strong>${escapeHtml(action.title)}</strong>
      <span>${escapeHtml(action.body)}</span>
    </div>
    <a href="${escapeHtml(action.href)}">${escapeHtml(action.label)}</a>
  `;
}

function collectionTotals() {
  return cards.reduce(
    (sum, card) => {
      sum.count += quantity(card.quantity);
      sum.value += estimatedCardValue(card) * quantity(card.quantity);
      return sum;
    },
    { count: 0, value: 0 }
  );
}

function completedGoalCount() {
  return goals.filter((goal) => {
    const progress = goalProgress(goal);
    return progress.total > 0 && progress.owned === progress.total;
  }).length;
}

function collectorMetrics() {
  const totals = collectionTotals();
  const completeGoals = completedGoalCount();
  const valuePoints = Math.floor(totals.value / 1000) * scoreSettings.perThousandValue;
  const cardPoints = totals.count * scoreSettings.perCard;
  const goalPoints = completeGoals * scoreSettings.perCompleteGoal;
  const tradePoints = trades.length * scoreSettings.perTrade;
  return {
    totalCards: totals.count,
    totalValue: totals.value,
    completeGoals,
    trades: trades.length,
    score: Math.round(cardPoints + valuePoints + goalPoints + tradePoints),
    breakdown: { cardPoints, valuePoints, goalPoints, tradePoints }
  };
}

function collectorBadges(metrics) {
  const badges = [
    {
      id: "value-10000",
      name: "RMB 10K Club",
      detail: "Collection value over RMB 10,000",
      earned: metrics.totalValue >= 10000
    },
    {
      id: "goal-complete",
      name: "Goal Finisher",
      detail: "Completed at least one collecting goal",
      earned: metrics.completeGoals > 0
    },
    {
      id: "hundred-cards",
      name: "Century Collector",
      detail: "Recorded 100 cards",
      earned: metrics.totalCards >= 100
    },
    {
      id: "trade-maker",
      name: "Trade Maker",
      detail: "Recorded at least one trade",
      earned: metrics.trades > 0
    }
  ];
  return badges.map((badge) => ({ ...badge, className: badge.earned ? "earned" : "locked" }));
}

function currentCollectorProfile() {
  const metrics = collectorMetrics();
  const profile = {
    id: account.email || "local-collector",
    name: account.name || "You",
    email: account.email || "",
    privacy: social.privacy,
    avatar: text(account.avatar),
    description: text(account.description),
    age: text(account.age),
    location: text(account.location),
    score: metrics.score,
    value: metrics.totalValue,
    cards: cards.slice(0, 24).map((card) => ({
      id: card.id,
      year: card.year,
      setName: card.setName,
      player: card.player,
      type: card.type,
      parallel: card.parallel,
      cardNumber: card.cardNumber,
      value: estimatedCardValue(card)
    })),
    goals: goals.slice(0, 8).map((goal) => ({
      title: goal.title,
      meta: [goal.season, goal.player, goal.setName, goal.parallel].filter(Boolean).join(" · "),
      ...goalProgress(goal)
    }))
  };
  return window.CardLedgerAdvanced?.publicProfile?.(profile) || profile;
}

function sampleCollectorProfiles() {
  return [
    {
      id: "alex-public",
      name: "Alex Chen",
      email: "alex.collects@example.com",
      privacy: "public",
      score: 2840,
      value: 42600,
      avatar: "",
      description: "Collecting Curry Prizm Silver and 2018-19 Optic rookies.",
      age: "31",
      location: "Los Angeles, CA",
      cards: [
        { id: "alex-1", year: "2018-19", setName: "Panini Donruss Optic", player: "Luka Doncic", type: "Base", parallel: "Holo", cardNumber: "177", value: 9800 },
        { id: "alex-2", year: "2012-13", setName: "Panini Prizm", player: "Stephen Curry", type: "Base", parallel: "Silver", cardNumber: "245", value: 15600 },
        { id: "alex-3", year: "2023-24", setName: "Panini Prizm", player: "Victor Wembanyama", type: "Rookie", parallel: "Base", cardNumber: "136", value: 420 }
      ],
      goals: [
        { title: "Stephen Curry Prizm Silver Run", meta: "2012-2025 · Panini Prizm · Silver", owned: 9, total: 14, pct: 64 },
        { title: "2018-19 Optic Holo Rookies", meta: "2018-19 · Panini Donruss Optic · Holo", owned: 18, total: 50, pct: 36 }
      ]
    },
    {
      id: "mia-friend",
      name: "Mia Wang",
      email: "mia.hoops@example.com",
      privacy: "friends",
      score: 1720,
      value: 18800,
      avatar: "",
      description: "Optic autos, SGA, and modern rookie parallels.",
      age: "27",
      location: "Shanghai, China",
      cards: [
        { id: "mia-1", year: "2018-19", setName: "Panini Donruss Optic", player: "Trae Young", type: "Rated Rookie Auto", parallel: "Blue", cardNumber: "198", value: 2600 },
        { id: "mia-2", year: "2018-19", setName: "Panini Donruss Optic", player: "Shai Gilgeous-Alexander", type: "Base", parallel: "Holo", cardNumber: "162", value: 1105 }
      ],
      goals: [
        { title: "2018-19 Rated Rookie Autos", meta: "2018-19 · Donruss Optic · Auto", owned: 11, total: 35, pct: 31 }
      ]
    }
  ];
}

function isFriendEmail(email) {
  return social.friends.some((friend) => friend.email === text(email).toLowerCase() && friend.friend);
}

function visibleCollectorProfiles() {
  const current = currentCollectorProfile();
  const profiles = sampleCollectorProfiles();
  if (current.privacy === "public") profiles.unshift(current);
  if (current.privacy === "friends") profiles.unshift({ ...current, name: `${current.name} (friends only)` });
  return profiles.filter((profile) => profile.privacy === "public" || isFriendEmail(profile.email) || profile.id === current.id);
}

function allViewableProfiles() {
  const current = currentCollectorProfile();
  return [current, ...sampleCollectorProfiles()];
}

function renderSocial() {
  els.friendList.innerHTML = "";
  if (!social.friends.length) {
    els.friendList.innerHTML = '<div class="trade-empty">No friends or follows yet.</div>';
  } else {
    social.friends.forEach((friend) => {
      const item = document.createElement("article");
      item.className = "friend-card";
      item.innerHTML = `
        <div>
          <strong>${escapeHtml(friend.name)}</strong>
          <small>${escapeHtml(friend.email)}</small>
        </div>
        <div class="form-actions">
          <button class="ghost-button compact-button" type="button" data-action="toggle-friend" data-email="${escapeHtml(friend.email)}">${friend.friend ? "Friend" : "Follow"}</button>
          <button class="delete-button compact-button" type="button" data-action="remove-friend" data-email="${escapeHtml(friend.email)}">Remove</button>
        </div>
      `;
      els.friendList.append(item);
    });
  }

  const profiles = visibleCollectorProfiles();
  els.publicCollectorCount.textContent = `${profiles.length} visible`;
  els.publicCollectors.innerHTML = profiles
    .map(
      (profile) => `
        <article class="public-collector-card">
          <div class="trade-card-header">
            <div>
              <h3>${escapeHtml(profile.name)}</h3>
              <p>${escapeHtml(profile.privacy === "friends" ? "Friends only" : "Public")} · ${escapeHtml(money(profile.value))} · ${profile.score.toLocaleString()} pts</p>
            </div>
            <button class="ghost-button compact-button" type="button" data-action="view-profile" data-owner="${escapeHtml(profile.id)}">View</button>
          </div>
          <div class="public-card-list">
            ${profile.cards
              .map(
                (card) => `
                  <div class="public-card-row">
                    <span>${escapeHtml(fixedCardName(card))}</span>
                    <strong>${escapeHtml(money(card.value))}</strong>
                    <button class="ghost-button compact-button" type="button" data-action="purchase-request" data-owner="${escapeHtml(profile.id)}" data-card="${escapeHtml(card.id)}">Request</button>
                  </div>
                `
              )
              .join("")}
          </div>
        </article>
      `
    )
    .join("");
  renderProfileViewer(profiles);

  els.purchaseRequestCount.textContent = `${purchaseRequests.length} request${purchaseRequests.length === 1 ? "" : "s"}`;
  els.purchaseRequests.innerHTML = purchaseRequests.length
    ? purchaseRequests
        .map(
          (request) => `
            <article class="request-card">
              <strong>${escapeHtml(request.cardName)}</strong>
              <small>${escapeHtml(request.buyerName)} requested from ${escapeHtml(request.ownerName)} · ${escapeHtml(request.createdAt.slice(0, 10))}</small>
            </article>
          `
        )
        .join("")
    : '<div class="trade-empty">No purchase requests yet.</div>';
}

function renderProfileViewer(profiles = visibleCollectorProfiles(), target = els.profileViewer) {
  const profile = profiles.find((item) => item.id === selectedProfileId);
  target.classList.toggle("hidden", !profile);
  if (!profile) {
    target.innerHTML = "";
    return;
  }
  target.innerHTML = `
    <div class="profile-header">
      ${avatarMarkup(profile, "large")}
      <div>
        <h3>${escapeHtml(profile.name)}</h3>
        <p>${escapeHtml(profile.privacy === "friends" ? "Friends-only profile" : "Public profile")} · ${escapeHtml(money(profile.value))}</p>
        <p>${escapeHtml([profile.location, profile.age && `Age ${profile.age}`].filter(Boolean).join(" · "))}</p>
        ${profile.description ? `<p>${escapeHtml(profile.description)}</p>` : ""}
      </div>
      <button class="ghost-button compact-button" type="button" data-action="close-profile">Close</button>
    </div>
    <div class="profile-columns">
      <section>
        <h4>Collection</h4>
        <div class="public-card-list">
          ${profile.cards
            .map(
              (card) => `
                <div class="public-card-row">
                  <span>${escapeHtml(fixedCardName(card))}</span>
                  <strong>${escapeHtml(money(card.value))}</strong>
                  <button class="ghost-button compact-button" type="button" data-action="purchase-request" data-owner="${escapeHtml(profile.id)}" data-card="${escapeHtml(card.id)}">Request</button>
                </div>
              `
            )
            .join("")}
        </div>
      </section>
      <section>
        <h4>Goals</h4>
        <div class="profile-goals">
          ${(profile.goals || [])
            .map(
              (goal) => `
                <article class="profile-goal">
                  <strong>${escapeHtml(goal.title)}</strong>
                  <small>${escapeHtml(goal.meta || "")}</small>
                  <div class="goal-progress"><span style="width: ${numeric(goal.pct)}%"></span></div>
                  <p>${numeric(goal.owned)}/${numeric(goal.total)} owned · ${numeric(goal.pct)}% complete</p>
                </article>
              `
            )
            .join("") || '<div class="trade-empty">No public goals.</div>'}
        </div>
      </section>
    </div>
  `;
}

function addPurchaseRequest(ownerId, cardId) {
  if (!requireMember("send purchase requests")) return;
  const owner = visibleCollectorProfiles().find((profile) => profile.id === ownerId);
  const card = owner?.cards.find((item) => item.id === cardId);
  if (!owner || !card) return;
  purchaseRequests.unshift({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    buyerName: account.name || "Guest collector",
    ownerName: owner.name,
    ownerId,
    cardId,
    cardName: fixedCardName(card),
    status: "requested"
  });
  savePurchaseRequests();
  renderSocial();
}

function communityDisplayPosts() {
  const samplePosts = [
    {
      id: "sample-post-1",
      createdAt: "2026-07-09T00:00:00.000Z",
      authorId: "alex-public",
      author: "Alex Chen",
      avatar: "",
      cards: ["2018-19 | Panini Donruss Optic | Jalen Brunson | Base | Mojo Red /88 | 179"],
      note: "Trying to finish the 2018-19 Optic Mojo Red run.",
      intent: "want",
      likes: 8,
      wants: 3,
      comments: [{ author: "Mia Wang", text: "I saw one listed yesterday. Condition looked clean." }]
    }
  ];
  const savedIds = new Set(communityPosts.map((post) => post.id));
  return [...communityPosts, ...samplePosts.filter((post) => !savedIds.has(post.id))].map(normalizeSocialPost);
}

function renderCommunity() {
  renderCommunityCardOptions();
  renderCommunityCollectors();
  renderCommunityTradePosts();
  renderChats();
  const query = text(els.communityFeedSearch.value).toLowerCase();
  const intent = els.communityFeedFilter.value;
  const posts = communityDisplayPosts().filter((post) => {
    const haystack = [post.author, post.note, post.intent, post.selectedCard?.name, ...(post.cards || [])].join(" ").toLowerCase();
    return (!query || haystack.includes(query)) && (!intent || text(post.intent) === intent);
  });
  els.communityFeed.innerHTML = "";
  els.communityEmpty.classList.toggle("hidden", posts.length > 0);
  posts.forEach((post) => {
    const item = document.createElement("article");
    item.className = "community-post";
    item.innerHTML = `
      <div class="post-author">
        <button class="profile-chip" type="button" data-action="view-community-profile" data-owner="${escapeHtml(post.authorId || "")}">
          ${avatarMarkup(post)}
          <span>
            <strong>${escapeHtml(post.author || "Collector")}</strong>
            <small>${escapeHtml(new Date(post.createdAt).toLocaleDateString())}</small>
          </span>
        </button>
      </div>
      ${post.intent ? `<span class="post-intent ${escapeHtml(post.intent)}">${escapeHtml(post.intent === "want" ? "Want another" : post.intent)}</span>` : ""}
      ${
        post.selectedCard
          ? `<div class="selected-card-pill"><strong>${escapeHtml(post.selectedCard.name)}</strong><small>${escapeHtml(money(post.selectedCard.value))}</small></div>`
          : ""
      }
      ${post.image ? `<img class="post-photo" src="${escapeHtml(post.image)}" alt="${escapeHtml(`${post.author || "Collector"} post photo`)}" />` : ""}
      <div class="public-card-list">
        ${(post.cards || []).map((cardLine) => `<div class="public-card-row"><span>${escapeHtml(cardLine)}</span></div>`).join("")}
      </div>
      <p>${escapeHtml(post.note || "")}</p>
      ${socialActionsMarkup(post, "community")}
    `;
    els.communityFeed.append(item);
  });
}

function renderCommunityCardOptions() {
  const currentValue = communityFields.selectedCard.value;
  communityFields.selectedCard.innerHTML = '<option value="">No card selected</option>';
  cards.slice(0, 80).forEach((card) => {
    const option = document.createElement("option");
    option.value = card.id;
    option.textContent = `${fixedCardName(card)} · ${money(estimatedCardValue(card))}`;
    communityFields.selectedCard.append(option);
  });
  communityFields.selectedCard.value = cards.some((card) => card.id === currentValue) ? currentValue : "";
}

function renderCommunityCollectors() {
  const query = text(els.communityCollectorSearch.value).toLowerCase();
  const profiles = allViewableProfiles()
    .filter((profile) => [profile.name, profile.location, profile.description].join(" ").toLowerCase().includes(query))
    .sort((a, b) => {
      if (els.communityCollectorSort.value === "nameAsc") return a.name.localeCompare(b.name);
      if (els.communityCollectorSort.value === "scoreDesc") return numeric(b.score) - numeric(a.score);
      return numeric(b.value) - numeric(a.value);
    });
  els.communityCollectors.innerHTML = profiles
    .map(
      (profile) => `
        <article class="community-mini-card">
          <button class="profile-chip" type="button" data-action="view-community-profile" data-owner="${escapeHtml(profile.id)}">
            ${avatarMarkup(profile)}
            <span>
              <strong>${escapeHtml(profile.name)}</strong>
              <small>${escapeHtml([profile.location, money(profile.value)].filter(Boolean).join(" · "))}</small>
            </span>
          </button>
        </article>
      `
    )
    .join("");
}

function renderCommunityTradePosts() {
  const query = text(els.communityTradeSearch.value).toLowerCase();
  const tradePosts = trades
    .map(normalizeSocialPost)
    .filter((trade) => [trade.counterparty, trade.outgoing, trade.incoming, trade.notes].join(" ").toLowerCase().includes(query))
    .sort((a, b) => {
      if (els.communityTradeSort.value === "wantsDesc") return numeric(b.wants) - numeric(a.wants);
      if (els.communityTradeSort.value === "likesDesc") return numeric(b.likes) - numeric(a.likes);
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    .slice(0, 8);
  els.communityTradePosts.innerHTML = tradePosts.length
    ? tradePosts
        .map(
          (trade) => `
            <article class="community-mini-card">
              ${trade.image ? `<img class="mini-post-photo" src="${escapeHtml(trade.image)}" alt="${escapeHtml(trade.counterparty || "Trade post")}" />` : ""}
              <strong>${escapeHtml(trade.counterparty || "Trade post")}</strong>
              <small>${escapeHtml([trade.outgoing, trade.notes].filter(Boolean).join(" · "))}</small>
            </article>
          `
        )
        .join("")
    : '<div class="trade-empty">No trade posts match.</div>';
}

function renderChats() {
  els.chatList.innerHTML = chats.length
    ? chats
        .map(
          (chat) => `
            <article class="chat-card">
              <strong>${escapeHtml(chat.participants.join(", "))}</strong>
              <p>${escapeHtml(chat.messages.at(-1)?.text || "")}</p>
              <small>${escapeHtml(chat.createdAt.slice(0, 10))}</small>
            </article>
          `
        )
        .join("")
    : '<div class="trade-empty">No private chats yet.</div>';
}

function fixedLineFromMissingGoal(goal, slotId) {
  const year = goal.type === "number" ? goal.season : slotId;
  const number = goal.type === "number" ? slotId.replace(/^#/, "") : "";
  return [year, goal.setName, goalSlotPlayer(goal, slotId) || goal.player || "Any player", goal.type === "number" ? "Checklist" : "Goal", goal.parallel, number]
    .filter((value, index) => index < 6 || value)
    .join(" | ");
}

function readImageFile(input) {
  const [file] = input?.files || [];
  if (!file) return Promise.resolve("");
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(file);
  });
}

function normalizeSocialPost(post) {
  return {
    ...post,
    likes: numeric(post.likes),
    wants: numeric(post.wants),
    comments: Array.isArray(post.comments) ? post.comments : [],
    image: text(post.image)
  };
}

function avatarMarkup(profile, size = "") {
  const name = text(profile?.name || profile?.author || "Collector");
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  const classes = ["profile-avatar", size].filter(Boolean).join(" ");
  return profile?.avatar
    ? `<span class="${classes}" style="background-image: url('${escapeHtml(profile.avatar)}')" aria-hidden="true"></span>`
    : `<span class="${classes}" aria-hidden="true">${escapeHtml(initials || "CL")}</span>`;
}

function socialActionsMarkup(post, type) {
  return `
    <div class="post-actions">
      <button class="ghost-button compact-button" type="button" data-post-action="like" data-post-type="${type}" data-post-id="${escapeHtml(post.id)}">Like · ${numeric(post.likes)}</button>
      <button class="ghost-button compact-button" type="button" data-post-action="want" data-post-type="${type}" data-post-id="${escapeHtml(post.id)}">Also Want · ${numeric(post.wants)}</button>
      <span class="comment-count">Comment · ${post.comments?.length || 0}</span>
    </div>
    <form class="post-comment-form" data-post-type="${type}" data-post-id="${escapeHtml(post.id)}">
      <input name="comment" type="text" placeholder="Write a comment" autocomplete="off" />
      <button class="ghost-button compact-button" type="submit">Send</button>
    </form>
    ${
      post.comments?.length
        ? `<div class="post-comments">${post.comments
            .map((comment) => `<p><strong>${escapeHtml(comment.author || "Collector")}</strong> ${escapeHtml(comment.text)}</p>`)
            .join("")}</div>`
        : ""
    }
  `;
}

function authIdentityProviders() {
  const identities = Array.isArray(authUser?.identities) ? authUser.identities : [];
  const providers = identities.map((identity) => text(identity.provider).replace(/^custom:/, "").toLowerCase()).filter(Boolean);
  if (text(authUser?.phone || account.phone)) providers.push("phone");
  if (text(authUser?.email || account.email)) providers.push("email");
  return new Set(providers);
}

function renderLinkedAuthIdentities() {
  const providers = authIdentityProviders();
  els.linkedIdentityCards.forEach((card) => {
    const provider = text(card.dataset.identityProvider).toLowerCase();
    const connected = providers.has(provider);
    const status = card.querySelector("[data-identity-status]");
    const button = card.querySelector("button");
    card.classList.toggle("connected", connected);
    if (status) {
      if (provider === "phone" && connected) status.textContent = text(authUser?.phone || account.phone) || localizedAuthCopy("Connected", "已绑定");
      else status.textContent = connected ? localizedAuthCopy("Connected", "已绑定") : localizedAuthCopy("Not connected", "未绑定");
    }
    if (button) {
      const unavailable = authProviderAvailability[provider] === false;
      button.textContent = connected
        ? localizedAuthCopy("Connected", "已绑定")
        : unavailable
          ? localizedAuthCopy("Setup required", "需要配置")
          : localizedAuthCopy("Connect", "连接");
      button.disabled = connected || unavailable;
      button.title = unavailable ? "Enable this provider in Supabase Authentication settings." : "";
    }
  });
}

function renderAccount() {
  const signedIn = isMember();
  const isAdmin = account.role === "admin";
  const isChinese = currentLanguage === "zh-CN";
  const metrics = collectorMetrics();
  const badges = collectorBadges(metrics);
  const earnedBadges = badges.filter((badge) => badge.earned);
  const subscription = currentSubscription();
  const premium = isPremiumMember();
  const usage = planUsageRecord();
  const displayName = text(account.name) || text(account.email) || text(account.phone) || "Collector";
  const initials = signedIn
    ? displayName
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase()
    : "ME";

  document.body.classList.toggle("member-signed-in", signedIn);
  document.querySelectorAll(".landing-login-link").forEach((button) => {
    button.textContent = signedIn ? displayName || "Account" : "Log In";
    button.dataset.action = signedIn ? "" : "show-landing-auth";
  });
  document.querySelectorAll(".landing-get-started").forEach((button) => {
    button.textContent = signedIn ? "Open App" : "Get Started";
    button.dataset.action = signedIn ? "" : "show-landing-auth";
  });
  els.accountName.textContent = signedIn ? displayName : "Guest";
  els.accountMenuName.textContent = signedIn ? displayName : "Login";
  els.accountInitials.textContent = initials || "ME";
  els.accountInitials.style.backgroundImage = account.avatar ? `url("${account.avatar}")` : "";
  els.accountInitials.classList.toggle("has-avatar", Boolean(account.avatar));
  if (els.accountPageAvatar) {
    els.accountPageAvatar.textContent = initials || "ME";
    els.accountPageAvatar.style.backgroundImage = account.avatar ? `url("${account.avatar}")` : "";
    els.accountPageAvatar.classList.toggle("has-avatar", Boolean(account.avatar));
  }
  if (els.accountPageDescription) els.accountPageDescription.textContent = text(account.description) || "Manage your profile, privacy, login, marketplace access, and collector score.";
  if (els.accountPageEmail) els.accountPageEmail.textContent = signedIn ? text(account.email) || text(account.phone) || "Supabase account" : "Guest account";
  if (els.accountPageLocation) els.accountPageLocation.textContent = text(account.location) || "Location not set";
  if (els.accountPageScore) els.accountPageScore.textContent = metrics.score.toLocaleString();
  els.accountRoleBadge.textContent = signedIn ? (isAdmin ? "Admin" : premium ? "Premium" : "Collector") : "Guest";
  els.accountRoleBadge.classList.toggle("admin", isAdmin);
  els.accountRoleBadge.classList.toggle("premium", premium && !isAdmin);
  if (els.currentPlanBadge) els.currentPlanBadge.textContent = isAdmin ? (isChinese ? "管理员高级权限" : "Admin Premium") : premium ? (isChinese ? `高级会员${subscription.plan === "yearly" ? "年付" : "月付"}` : `Premium ${subscription.plan === "yearly" ? "Yearly" : "Monthly"}`) : (isChinese ? "普通版" : "Regular");
  if (els.membershipStatusText) {
    const renewal = subscription.renewsAt ? (isChinese ? ` · 体验期至 ${new Date(subscription.renewsAt).toLocaleDateString()}` : ` · prototype through ${new Date(subscription.renewsAt).toLocaleDateString()}`) : "";
    els.membershipStatusText.textContent = isAdmin ? (isChinese ? "管理员 · 不限量" : "Admin · unlimited") : premium ? (isChinese ? `高级会员${subscription.plan === "yearly" ? "年付" : "月付"}${renewal}` : `Premium ${subscription.plan}${renewal}`) : (isChinese ? "普通版" : "Regular plan");
  }
  if (els.aiTradeUsageText) els.aiTradeUsageText.textContent = premium ? `${numeric(usage.aiTrades)} / ${isChinese ? "不限量" : "Unlimited"}` : `${numeric(usage.aiTrades)} / ${REGULAR_PLAN_LIMITS.aiTrades}`;
  if (els.goalUsageText) els.goalUsageText.textContent = premium
    ? `${goals.length} / ${isChinese ? "不限量" : "Unlimited"}`
    : goals.length > REGULAR_PLAN_LIMITS.goals
      ? (isChinese ? `现有 ${goals.length} 个 · 上限 ${REGULAR_PLAN_LIMITS.goals} 个` : `${goals.length} existing · limit ${REGULAR_PLAN_LIMITS.goals}`)
      : `${goals.length} / ${REGULAR_PLAN_LIMITS.goals}`;
  if (els.aiTradeQuotaBadge) els.aiTradeQuotaBadge.textContent = premium ? (isChinese ? "不限量" : "Unlimited") : (isChinese ? `本月 ${numeric(usage.aiTrades)} / ${REGULAR_PLAN_LIMITS.aiTrades}` : `${numeric(usage.aiTrades)} / ${REGULAR_PLAN_LIMITS.aiTrades} this month`);
  if (els.goalQuotaBadge) els.goalQuotaBadge.textContent = premium
    ? (isChinese ? "不限量" : "Unlimited")
    : goals.length > REGULAR_PLAN_LIMITS.goals
      ? (isChinese ? `现有 ${goals.length} 个 · 上限 ${REGULAR_PLAN_LIMITS.goals} 个` : `${goals.length} existing · limit ${REGULAR_PLAN_LIMITS.goals}`)
      : (isChinese ? `${goals.length} / ${REGULAR_PLAN_LIMITS.goals} 个目标` : `${goals.length} / ${REGULAR_PLAN_LIMITS.goals} goals`);
  document.querySelectorAll(".side-tier-label").forEach((label) => { label.textContent = isAdmin ? (isChinese ? "管理员权限" : "Admin Tier") : premium ? (isChinese ? "高级会员" : "Premium Tier") : (isChinese ? "普通版" : "Regular Tier"); });
  document.querySelectorAll("[data-select-plan]").forEach((button) => button.classList.toggle("active-plan", button.dataset.selectPlan === subscription.plan));
  document.querySelector("#selectRegularPlan")?.classList.toggle("active-plan", !premium);
  if (els.supabaseUrl) els.supabaseUrl.value = supabaseSettings.url;
  if (els.supabaseAnonKey && !els.supabaseAnonKey.value) els.supabaseAnonKey.value = supabaseSettings.anonKey;
  if (els.supabaseStatus) {
    els.supabaseStatus.textContent = supabaseReady()
      ? `Supabase ready${supabaseSettings.userId ? ` · User ${supabaseSettings.userId.slice(0, 8)}` : ""}`
      : "Using local browser login until Supabase URL and anon key are saved.";
  }
  els.collectorScore.textContent = metrics.score.toLocaleString();
  els.badgeCount.textContent = `${earnedBadges.length}/${badges.length}`;
  els.friendCount.textContent = social.friends.filter((friend) => friend.friend).length.toLocaleString();
  els.followingCount.textContent = social.friends.filter((friend) => friend.following).length.toLocaleString();
  els.followerCount.textContent = social.friends.filter((friend) => friend.follower).length.toLocaleString();
  els.guestAuthControls.forEach((control) => control.classList.toggle("hidden", signedIn));
  els.accountIdentitySettings?.classList.toggle("hidden", !signedIn);
  els.logoutButton.classList.toggle("hidden", !signedIn);
  loginFields.email.value = signedIn ? text(account.email) : loginFields.email.value;
  loginFields.password.value = "";
  profileFields.description.value = text(account.description);
  profileFields.age.value = text(account.age);
  profileFields.location.value = text(account.location);
  els.avatarPresetButtons.forEach((button) => {
    button.classList.toggle("active", text(account.avatar) === text(button.dataset.avatarPreset));
  });
  els.privacySelect.value = social.privacy;
  adminScoreForm.classList.toggle("hidden", !isAdmin);
  renderLinkedAuthIdentities();
  renderAccessControls();

  scoreFields.perCard.value = scoreSettings.perCard;
  scoreFields.perThousandValue.value = scoreSettings.perThousandValue;
  scoreFields.perCompleteGoal.value = scoreSettings.perCompleteGoal;
  scoreFields.perTrade.value = scoreSettings.perTrade;

  els.badgeList.innerHTML = badges
    .map(
      (badge) => `
        <article class="badge-card ${badge.className}">
          <span>${badge.earned ? "ON" : "--"}</span>
          <div>
            <strong>${escapeHtml(badge.name)}</strong>
            <small>${escapeHtml(badge.detail)}</small>
          </div>
        </article>
      `
    )
    .join("");

  els.scoreBreakdown.innerHTML = `
    <div><dt>Cards</dt><dd>${metrics.breakdown.cardPoints.toLocaleString()} pts</dd></div>
    <div><dt>Value</dt><dd>${metrics.breakdown.valuePoints.toLocaleString()} pts</dd></div>
    <div><dt>Complete Goals</dt><dd>${metrics.breakdown.goalPoints.toLocaleString()} pts</dd></div>
    <div><dt>Trades</dt><dd>${metrics.breakdown.tradePoints.toLocaleString()} pts</dd></div>
  `;
}

function renderSportFilter() {
  const current = els.sportFilter.value;
  const sports = [...new Set(cards.map((card) => card.sport).filter(Boolean))].sort();
  els.sportFilter.innerHTML = '<option value="">All sports</option>';
  sports.forEach((sport) => {
    const option = document.createElement("option");
    option.value = sport;
    option.textContent = sport;
    els.sportFilter.append(option);
  });
  els.sportFilter.value = sports.includes(current) ? current : "";
}

function conditionEstimateDetails(card, { includeDate = false } = {}) {
  const estimate = card?.conditionEstimate;
  if (!estimate) return "";
  const population = normalizePsaPopulation(estimate.populationReference);
  const populationText = population
    ? ` · ${conditionLocale("estimated-grade reference", "预估评级参考")} POP ${population.populationAtGrade.toLocaleString()} · ${population.populationHigher.toLocaleString()} ${conditionLocale("higher", "更高分")}`
    : "";
  const estimateDate = includeDate ? text(estimate.analyzedAt).slice(0, 10) : "";
  return `PSA ${estimate.psa} · BGS ${estimate.bgs} · ${estimate.confidence}% ${conditionLocale("confidence", "置信度")}${populationText}${estimateDate ? ` · ${estimateDate}` : ""}`;
}

function renderGrid(list) {
  els.gridList.innerHTML = "";
  list.forEach((card) => {
    const node = els.cardTemplate.content.firstElementChild.cloneNode(true);
    node.dataset.cardId = card.id;
    node.querySelector("h3").textContent = cardTitle(card);
    node.querySelector(".meta").textContent = cardMeta(card);
    const noteText = displayNote(card.notes);
    node.querySelector(".notes").textContent = noteText;
    node.querySelector(".notes-details").classList.toggle("hidden", !noteText);
    node.querySelector(".qty").textContent = card.quantity;
    renderMoney(node.querySelector(".paid"), card.paid);
    renderMoney(node.querySelector(".value"), estimatedCardValue(card));
    renderMoney(node.querySelector(".ebay-value"), estimatedValueBySource(card, "ebay"));
    renderMoney(node.querySelector(".cardhobby-value"), estimatedValueBySource(card, "cardhobby"));
    node.querySelector(".valuation-method").textContent = valuationMethod(card);
    const populationSummary = node.querySelector(".psa-population-summary");
    populationSummary.innerHTML = psaPopulationBadgeMarkup(card);
    populationSummary.classList.toggle("hidden", !isPsaGrade(card.grade));
    populationSummary.querySelector("[data-refresh-psa-pop]")?.addEventListener("click", (event) => refreshPsaPopulationForCard(card.id, event.currentTarget));
    const conditionSummary = node.querySelector(".condition-estimate-summary");
    if (card.conditionEstimate) {
      conditionSummary.innerHTML = `<span class="material-symbols-outlined" aria-hidden="true">fact_check</span><strong>${escapeHtml(conditionLocale("Pre-grade", "预评级"))}</strong> ${escapeHtml(conditionEstimateDetails(card, { includeDate: true }))}`;
      conditionSummary.classList.remove("hidden");
    } else {
      conditionSummary.classList.add("hidden");
    }
    const assessment = investmentAssessment(card);
    node.querySelector(".investment-score-value").textContent = `${assessment.score}/100`;
    node.querySelector(".investment-score-summary").textContent = `${translatedText(assessment.label)} · ${translatedText("Confidence")} ${translatedText(assessment.confidence.label)} (${assessment.confidence.score}%)`;
    node.querySelector(".investment-score-breakdown").innerHTML = assessment.components.map((component) => `
      <div class="investment-factor">
        <span><strong>${escapeHtml(translatedText(component.key))}</strong><small>${escapeHtml(localizedInvestmentDetail(component.detail))}</small></span>
        <span class="investment-factor-score">${Math.round(component.score)}</span>
        <i aria-hidden="true"><b style="width:${Math.round(component.score)}%"></b></i>
      </div>
    `).join("");
    node.querySelector(".card-price-chart").innerHTML = externalTrendPanel(card);
    node.querySelector(".location").textContent = card.location ? `Stored: ${card.location}` : "";
    const miniCard = node.querySelector(".mini-card");
    if (card.image) {
      miniCard.classList.add("scanned-mini-card");
      miniCard.style.backgroundImage = `url("${card.image}")`;
    }
    node.querySelector(".mini-sport").textContent = card.image ? "SCAN" : card.sport || "CARD";
    node.querySelector(".mini-year").textContent = card.year || "N/A";
    const actions = node.querySelector(".actions");
    const sourceLinks = imageSourceLinks(card)
      .map(([label, url]) => `<a class="image-source-link" href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`)
      .join("");
    actions.insertAdjacentHTML(
      "afterbegin",
      card.image
        ? `<a class="image-source-link" href="${escapeHtml(card.imageSourceUrl || card.image)}" target="_blank" rel="noreferrer">${escapeHtml(card.imageProvider || "Image")}</a>`
        : `<details class="image-source-details"><summary>Find image</summary><div>${sourceLinks}</div></details>`
    );
    node.querySelector(".edit-button").addEventListener("click", () => editCard(card.id));
    node.querySelector(".delete-button").addEventListener("click", () => deleteCard(card.id));
    els.gridList.append(node);
  });
}

function renderTable(list) {
  els.tableBody.innerHTML = "";
  list.forEach((card) => {
    const row = document.createElement("tr");
    row.dataset.cardId = card.id;
    row.innerHTML = `
      <td><strong>${escapeHtml(cardTitle(card))}</strong><br><span>${escapeHtml(cardMeta(card))}</span>${card.psaPopulation ? `<span class="psa-population-summary">${psaPopulationBadgeMarkup(card)}</span>` : isPsaGrade(card.grade) ? '<small class="psa-population-summary psa-pop-pending-text">PSA population pending</small>' : ""}${card.conditionEstimate ? `<small class="table-condition-estimate">${escapeHtml(conditionLocale("Pre-grade", "预评级"))} · ${escapeHtml(conditionEstimateDetails(card))}</small>` : ""}</td>
      <td>${escapeHtml(card.sport)}</td>
      <td>${escapeHtml([card.condition, card.grade].filter(Boolean).join(" / "))}</td>
      <td>${card.quantity}</td>
      <td>${moneyMarkup(card.paid)}</td>
      <td>
        ${moneyMarkup(estimatedCardValue(card))}
        <small class="valuation-method">${escapeHtml(valuationMethod(card))}</small>
        <small class="valuation-method">eBay ${escapeHtml(money(estimatedValueBySource(card, "ebay")))} · CardHobby ${escapeHtml(money(estimatedValueBySource(card, "cardhobby")))}</small>
      </td>
      <td>${(() => { const assessment = investmentAssessment(card); return `<strong class="table-investment-score">${assessment.score}</strong><small class="valuation-method">${escapeHtml(translatedText(assessment.label))}</small>`; })()}</td>
      <td>${escapeHtml(card.location)}</td>
      <td><div class="table-actions"></div></td>
    `;
    const actions = row.querySelector(".table-actions");
    const edit = document.createElement("button");
    const remove = document.createElement("button");
    edit.className = "edit-button";
    remove.className = "delete-button";
    edit.type = "button";
    remove.type = "button";
    edit.textContent = "Edit";
    remove.textContent = "Delete";
    if (isPsaGrade(card.grade)) {
      const refreshPopulation = document.createElement("button");
      refreshPopulation.className = "ghost-button compact-button";
      refreshPopulation.type = "button";
      refreshPopulation.textContent = "Refresh Pop";
      refreshPopulation.addEventListener("click", () => refreshPsaPopulationForCard(card.id, refreshPopulation));
      actions.append(refreshPopulation);
    }
    edit.addEventListener("click", () => editCard(card.id));
    remove.addEventListener("click", () => deleteCard(card.id));
    actions.append(edit, remove);
    els.tableBody.append(row);
  });
}

function cardsForGoal(goal) {
  return cards.filter((card) => Object.keys(goal.slots || {}).some((slotId) => cardMatchesGoalSlot(card, goal, slotId)));
}

function cardMatchesAnyGoal(card) {
  return goals.some((goal) => Object.keys(goal.slots || {}).some((slotId) => cardMatchesGoalSlot(card, goal, slotId)));
}

function goalIncludedDescription(goal) {
  const ownedSlots = Object.keys(goal.slots || {}).filter((slotId) => goal.slots[slotId]?.owned);
  const label = goal.type === "number" ? "Numbers" : "Years";
  const values = ownedSlots.map((slotId) => goal.type === "number" ? slotId.replace(/^#/, "") : slotId);
  return `${label} included: ${values.length ? values.join(", ") : "None yet"}`;
}

function renderGoalCollections() {
  els.goalCollectionList.innerHTML = "";
  const collections = goals
    .map((goal) => ({ goal, cards: cardsForGoal(goal) }))
    .filter((collection) => collection.cards.length);
  if (!collections.length) return;
  const uniqueCards = new Map();
  collections.forEach(({ cards: goalCards }) => goalCards.forEach((card) => uniqueCards.set(card.id, card)));
  const total = Array.from(uniqueCards.values()).reduce((sum, card) => sum + estimatedCardValue(card) * quantity(card.quantity), 0);
  const item = document.createElement("details");
  item.className = "goal-collection";
  item.innerHTML = `
    <summary>
      <span>
        <strong>Collection Goal</strong>
        <small>${uniqueCards.size} card${uniqueCards.size === 1 ? "" : "s"} inside · ${collections.length} goal${collections.length === 1 ? "" : "s"}</small>
      </span>
      <span>${moneyMarkup(total)}</span>
    </summary>
    <div class="goal-collection-cards">
      ${collections
        .map(({ goal, cards: goalCards }) => {
          const progress = goalProgress(goal);
          const value = goalCards.reduce((sum, card) => sum + estimatedCardValue(card) * quantity(card.quantity), 0);
          return `
            <section class="goal-collection-group">
              <div class="goal-collection-card">
                <strong>${escapeHtml(goal.title || "Collection Goal")}</strong>
                <span>${progress.owned}/${progress.total} checklist · ${goalCards.length} matched single${goalCards.length === 1 ? "" : "s"}</span>
                <small>${moneyMarkup(value)}</small>
                <details class="goal-included-details">
                  <summary>Included ${goal.type === "number" ? "numbers" : "years"}</summary>
                  <p>${escapeHtml(goalIncludedDescription(goal))}</p>
                </details>
              </div>
            </section>
          `;
        })
        .join("")}
    </div>
  `;
  els.goalCollectionList.append(item);
}

function setupChartTooltips() {
  document.querySelectorAll(".chart-shell").forEach((chart) => {
    if (chart.dataset.tooltipReady === "true") return;
    chart.dataset.tooltipReady = "true";
    const tooltip = chart.querySelector(".chart-tooltip");
    const svg = chart.querySelector(".source-chart");
    chart.addEventListener("mousemove", (event) => {
      const dots = Array.from(chart.querySelectorAll(".source-dot"));
      if (!dots.length || !tooltip || !svg) return;
      const rect = svg.getBoundingClientRect();
      const viewBox = svg.viewBox.baseVal;
      const mouseX = ((event.clientX - rect.left) / rect.width) * viewBox.width;
      const mouseY = ((event.clientY - rect.top) / rect.height) * viewBox.height;
      const nearest = dots
        .map((dot) => {
          const x = numeric(dot.getAttribute("cx"));
          const y = numeric(dot.getAttribute("cy"));
          return { dot, x, y, distance: Math.hypot(mouseX - x, mouseY - y) };
        })
        .sort((a, b) => a.distance - b.distance)[0];
      const rawSource = nearest.dot.dataset.source || "ebay";
      const source = marketSourceLabel(rawSource);
      tooltip.innerHTML = `
        <strong>${escapeHtml(source)} · ${escapeHtml(money(nearest.dot.dataset.value))}</strong>
        <span>${escapeHtml(dateLabel(nearest.dot.dataset.date))}</span>
        ${nearest.dot.dataset.label ? `<small>${escapeHtml(nearest.dot.dataset.label)}</small>` : ""}
      `;
      tooltip.style.left = `${Math.min(Math.max((nearest.x / viewBox.width) * rect.width, 8), rect.width - 160)}px`;
      tooltip.style.top = `${Math.max((nearest.y / viewBox.height) * rect.height - 52, 8)}px`;
      tooltip.classList.remove("hidden");
    });
    chart.addEventListener("mouseleave", () => tooltip?.classList.add("hidden"));
  });
}

function renderMarketCharts(list) {
  els.marketCharts.innerHTML = "";
  list.slice(0, 8).forEach((card) => {
    const points = salesInPastYear(card);
    const fallbackDate = card.updatedAt?.slice(0, 10) || new Date().toISOString().slice(0, 10);
    const chartPoints = points.length ? points : [{ date: fallbackDate, value: estimatedCardValue(card), label: money(estimatedCardValue(card)) }];
    const estimate = estimatedCardValue(card);
    const chartLatest = chartPoints.at(-1);
    const chartFirst = chartPoints[0];
    const change = numeric(chartLatest.value) - numeric(chartFirst.value);
    const item = document.createElement("article");
    item.className = "chart-card";
    item.innerHTML = `
      <div class="chart-card-header">
        <div>
          <h3>${escapeHtml(cardTitle(card))}</h3>
          <p>${escapeHtml(cardMeta(card))}</p>
        </div>
        <span class="${change >= 0 ? "trend-up" : "trend-down"}">${change >= 0 ? "+" : ""}${escapeHtml(money(change))}</span>
      </div>
      <div class="valuation-row">
        <span>Past year trend</span>
        <strong>${moneyMarkup(estimate)}</strong>
      </div>
      ${dualSourceChart(card)}
      <div class="chart-foot">
        <span>${escapeHtml(dateLabel(chartFirst.date))}</span>
        <strong>${escapeHtml(valuationMethod(card))}</strong>
        <span>${escapeHtml(dateLabel(chartLatest.date))}</span>
      </div>
    `;
    els.marketCharts.append(item);
  });
}

function pricingConfidence(card) {
  const sales = salesInPastYear(card);
  const sourceCount = new Set(sales.map((sale) => sale.source || "manual")).size;
  const recentSale = sales.some((sale) => (Date.now() - new Date(`${sale.date}T00:00:00`).getTime()) / 86400000 <= 90);
  let score = Math.min(95, sales.length * 18 + sourceCount * 12 + (recentSale ? 16 : 0));
  if (!sales.length && numeric(card.value)) score = 35;
  return {
    score,
    label: score >= 75 ? "High" : score >= 45 ? "Medium" : "Low",
    sales: sales.length,
    sources: sourceCount || 0
  };
}

function clampScore(value, minimum = 0, maximum = 100) {
  return Math.min(maximum, Math.max(minimum, Number.isFinite(value) ? value : minimum));
}

function normalizedSportName(value) {
  const sport = text(value).trim();
  const key = sport.toLowerCase();
  if (/pokemon|pokémon|ptcg|tcg|trading game/.test(key)) return "PTCG / TCG";
  if (/basketball|nba/.test(key)) return "Basketball";
  if (/baseball|mlb/.test(key)) return "Baseball";
  if (/soccer|football association|fifa/.test(key)) return "Soccer";
  if (/american football|nfl/.test(key)) return "Football";
  if (/hockey|nhl/.test(key)) return "Hockey";
  if (/formula|racing|f1|motorsport/.test(key)) return "Racing";
  if (/tennis/.test(key)) return "Tennis";
  if (/golf/.test(key)) return "Golf";
  return sport || "Other";
}

function serialPrintRun(card) {
  const haystack = [card.parallel, card.type, card.notes, card.cardNumber].map(text).join(" ");
  const match = haystack.match(/(?:\/|\bof\s+)(\d{1,6})\b/i);
  return match ? numeric(match[1]) : 0;
}

function numericGrade(card) {
  const match = text(card.grade).match(/(?:PSA|BGS|SGC|CGC)?\s*(10|9\.5|9|8\.5|8|7\.5|7|6\.5|6|5\.5|5|4\.5|4|3\.5|3|2\.5|2|1\.5|1)\b/i);
  return match ? numeric(match[1]) : 0;
}

function investmentAssessment(card) {
  const sales = salesInPastYear(card);
  const sources = new Set(sales.map((sale) => sale.source || "manual")).size;
  const recent = sales.filter((sale) => (Date.now() - new Date(`${sale.date}T00:00:00`).getTime()) / 86400000 <= 120).length;
  let momentum = 25;
  let momentumDetail = "Needs 2+ completed sales";
  if (sales.length >= 2 && numeric(sales[0].value) > 0) {
    const sampleSize = Math.min(3, Math.floor(sales.length / 2) || 1);
    const firstAverage = sales.slice(0, sampleSize).reduce((sum, sale) => sum + numeric(sale.value), 0) / sampleSize;
    const lastAverage = sales.slice(-sampleSize).reduce((sum, sale) => sum + numeric(sale.value), 0) / sampleSize;
    const changePercent = firstAverage ? ((lastAverage - firstAverage) / firstAverage) * 100 : 0;
    momentum = clampScore(50 + changePercent * 1.25);
    momentumDetail = `${changePercent >= 0 ? "+" : ""}${changePercent.toFixed(1)}% across completed sales`;
  }

  const liquidity = clampScore(8 + Math.min(sales.length, 6) * 11 + Math.min(sources, 3) * 9 + Math.min(recent, 2) * 6);
  const liquidityDetail = sales.length
    ? `${sales.length} sale${sales.length === 1 ? "" : "s"} · ${sources} source${sources === 1 ? "" : "s"}`
    : "No completed sales attached";

  const printRun = serialPrintRun(card);
  const psaPopulation = numeric(card.psaPopulation?.populationAtGrade || card.psaPopulation?.population_at_grade);
  const scarcitySignals = [];
  if (printRun) scarcitySignals.push(printRun <= 10 ? 100 : printRun <= 25 ? 92 : printRun <= 50 ? 84 : printRun <= 99 ? 74 : printRun <= 199 ? 62 : printRun <= 499 ? 48 : 35);
  if (psaPopulation) scarcitySignals.push(psaPopulation <= 10 ? 96 : psaPopulation <= 25 ? 88 : psaPopulation <= 50 ? 80 : psaPopulation <= 100 ? 70 : psaPopulation <= 500 ? 55 : psaPopulation <= 2000 ? 42 : 30);
  const scarcity = scarcitySignals.length ? Math.max(...scarcitySignals) : 35;
  const scarcityDetail = [printRun ? `Serial /${printRun}` : "", psaPopulation ? `PSA pop ${psaPopulation}` : ""].filter(Boolean).join(" · ") || "No verified scarcity signal";

  const grade = numericGrade(card);
  const gradeScore = grade ? clampScore(35 + grade * 6) : 42;
  const gradeDetail = grade ? `${text(card.grade)} recorded` : "Raw or grade not recorded";

  const identityFields = [card.year, card.brand, card.setName, card.player, card.type, card.parallel, card.cardNumber];
  const completeness = identityFields.filter((value) => text(value)).length / identityFields.length;
  const evidence = clampScore(completeness * 42 + Math.min(sales.length, 4) * 8 + Math.min(sources, 2) * 7 + (card.image ? 6 : 0) + (card.certification ? 6 : 0));
  const evidenceDetail = `${Math.round(completeness * 100)}% identity · ${sales.length ? `${sales.length} comp${sales.length === 1 ? "" : "s"}` : "no comps"}`;

  const components = [
    { key: "Momentum", score: momentum, weight: 25, detail: momentumDetail },
    { key: "Liquidity", score: liquidity, weight: 20, detail: liquidityDetail },
    { key: "Scarcity", score: scarcity, weight: 20, detail: scarcityDetail },
    { key: "Grade", score: gradeScore, weight: 15, detail: gradeDetail },
    { key: "Evidence", score: evidence, weight: 20, detail: evidenceDetail }
  ];
  const score = Math.round(components.reduce((sum, component) => sum + component.score * (component.weight / 100), 0));
  const label = score >= 75 ? "Strong evidence" : score >= 55 ? "Developing" : score >= 35 ? "Speculative" : "Limited evidence";
  const confidence = pricingConfidence(card);
  return { score, label, confidence, components };
}

function localizedInvestmentDetail(value) {
  if (currentLanguage !== "zh-CN") return value;
  if (value === "Needs 2+ completed sales") return "至少需要 2 笔已成交记录";
  if (value === "No completed sales attached") return "尚未关联已成交记录";
  if (value === "No verified scarcity signal") return "暂无已核验的稀缺数据";
  if (value === "Raw or grade not recorded") return "未评级或未填写评级";
  if (/^[+-]?\d+(?:\.\d+)?% across completed sales$/.test(value)) return value.replace("across completed sales", "已成交走势");
  if (/^\d+ sales? · \d+ sources?$/.test(value)) return value.replace(/sales?/, "笔成交").replace(/sources?/, "个来源");
  if (/ recorded$/.test(value)) return value.replace(" recorded", " 已记录");
  if (/^\d+% identity · /.test(value)) return value.replace("identity", "信息完整度").replace("comps", "笔成交").replace("no comps", "暂无成交");
  return value.replace("Serial", "限量").replace("PSA pop", "PSA 评级数量");
}

function sportIndexSnapshots(list) {
  const coreSports = ["Basketball", "Baseball", "Soccer", "Football", "Hockey", "PTCG / TCG"];
  const observedSports = list.map((card) => normalizedSportName(card.sport));
  const sports = [...new Set([...coreSports, ...observedSports])];
  return sports.map((sport) => {
    const sportCards = list.filter((card) => normalizedSportName(card.sport) === sport);
    const eligible = sportCards
      .map((card) => ({ card, sales: salesInPastYear(card) }))
      .filter(({ sales }) => sales.length >= 2 && numeric(sales[0].value) > 0)
      .map(({ card, sales }) => {
        const level = clampScore((numeric(sales.at(-1).value) / numeric(sales[0].value)) * 100, 25, 400);
        return { card, level, latestDate: sales.at(-1).date };
      });
    const level = eligible.length ? eligible.reduce((sum, item) => sum + item.level, 0) / eligible.length : null;
    const breadth = eligible.length ? eligible.filter((item) => item.level >= 100).length / eligible.length : null;
    const confidence = sportCards.length ? sportCards.reduce((sum, card) => sum + pricingConfidence(card).score, 0) / sportCards.length : 0;
    const latestDate = eligible.map((item) => item.latestDate).filter(Boolean).sort().at(-1) || "";
    return { sport, cards: sportCards.length, eligible: eligible.length, level, breadth, confidence, latestDate };
  });
}

function renderSportIndices(list) {
  if (!els.sportIndices) return;
  const snapshots = sportIndexSnapshots(list);
  els.sportIndices.innerHTML = snapshots.map((snapshot) => {
    const hasIndex = snapshot.level !== null;
    const change = hasIndex ? snapshot.level - 100 : 0;
    const direction = change >= 0 ? "trend-up" : "trend-down";
    return `
      <button class="sport-index-card" type="button" data-index-sport="${escapeHtml(snapshot.sport)}" aria-label="${escapeHtml(`${snapshot.sport} index`)}">
        <span class="sport-index-name">${escapeHtml(snapshot.sport)}</span>
        <strong>${hasIndex ? snapshot.level.toFixed(1) : "--"}</strong>
        <span class="${direction}">${hasIndex ? `${change >= 0 ? "+" : ""}${change.toFixed(1)}%` : escapeHtml(translatedText("Awaiting verified sales"))}</span>
        <small>${escapeHtml(translatedText("Coverage"))} ${snapshot.eligible}/${snapshot.cards} · ${escapeHtml(translatedText("Confidence"))} ${Math.round(snapshot.confidence)}%</small>
        <span class="sport-index-bar" aria-hidden="true"><i style="width:${Math.round(snapshot.breadth === null ? 0 : snapshot.breadth * 100)}%"></i></span>
      </button>
    `;
  }).join("");
  els.sportIndices.querySelectorAll("[data-index-sport]").forEach((button) => button.addEventListener("click", () => {
    const sport = button.dataset.indexSport;
    const option = Array.from(els.sportFilter.options).find((item) => normalizedSportName(item.value) === sport);
    els.sportFilter.value = option?.value || "";
    location.hash = "#collectionArea";
    render();
  }));
  const latestDate = snapshots.map((snapshot) => snapshot.latestDate).filter(Boolean).sort().at(-1);
  els.sportIndexUpdated.textContent = latestDate
    ? `${translatedText("Index updated")} ${dateLabel(latestDate)} · ${translatedText("Base 100, completed sales only")}`
    : translatedText("No eligible completed-sale history yet. Index space is ready for connected market data.");
}

function latestSaleTimestamp(card) {
  const latest = sortedSales(card).at(-1);
  const value = latest?.date ? new Date(`${latest.date}T00:00:00`).getTime() : 0;
  return Number.isFinite(value) ? value : 0;
}

function cardReviewDetails(card) {
  const sales = sortedSales(card);
  const latestAt = latestSaleTimestamp(card);
  const ageDays = latestAt ? Math.floor((Date.now() - latestAt) / 86400000) : Infinity;
  const sources = new Set(sales.map((sale) => sale.source)).size;
  const reasons = [];
  if (!sales.length) reasons.push("No verified comps");
  else if (ageDays > 180) reasons.push(`Stale ${ageDays}d`);
  if (sales.length && sources < 2) reasons.push("Single source");
  if (!text(card.year) || !text(card.setName)) reasons.push("Incomplete identity");
  if (!text(card.cardNumber)) reasons.push("Missing card number");
  if (/\b(?:psa|bgs|sgc)\b/i.test(text(card.grade)) && !text(card.certification)) reasons.push("Missing certification");
  return { card, sales: sales.length, sources, ageDays, reasons, latestAt };
}

function renderTrendCardSelect() {
  if (!els.trendCardSelect) return;
  const selected = els.trendCardSelect.value;
  const ordered = cards.slice().sort((a, b) => fixedCardName(a).localeCompare(fixedCardName(b)));
  els.trendCardSelect.innerHTML = ordered.length
    ? ordered.map((card) => `<option value="${escapeHtml(card.id)}">${escapeHtml(fixedCardName(card))}</option>`).join("")
    : '<option value="">Add a card first</option>';
  if (ordered.some((card) => card.id === selected)) els.trendCardSelect.value = selected;
}

function mergeTrendRecords(records) {
  const merged = new Map(savedMarketplaceSales().map((record) => [`${record.provider}|${record.source_fingerprint}`, record]));
  records.forEach((record) => {
    if (!record?.provider || !record?.source_fingerprint) return;
    const key = `${record.provider}|${record.source_fingerprint}`;
    merged.set(key, { ...merged.get(key), ...record });
  });
  const next = [...merged.values()].sort((a, b) => new Date(b.sold_at || 0) - new Date(a.sold_at || 0));
  localStorage.setItem(MARKETPLACE_SALES_KEY, JSON.stringify(next));
  marketplaceSalesCacheSource = "";
  marketplaceSalesCache = [];
}

async function refreshTrendForCard(card, provider = "both") {
  if (!card) throw new Error("Choose a collection card first.");
  if (!requireMember("refresh licensed card trends")) return { records: [], errors: [] };
  const actions = provider === "both"
    ? ["cardladder-sold-search", "market_movers-sold-search"]
    : [`${provider}-sold-search`];
  const query = trendSearchQuery(card);
  const responses = await Promise.allSettled(actions.map((action) => marketDataRequest(action, { query, limit: 40 })));
  const records = responses.flatMap((result) => result.status === "fulfilled" && Array.isArray(result.value.records) ? result.value.records : []);
  const errors = responses.filter((result) => result.status === "rejected").map((result) => result.reason?.message).filter(Boolean);
  if (records.length) mergeTrendRecords(records);
  if (!records.length && errors.length) throw new Error(errors.join(" · "));
  return { records, errors };
}

async function refreshTrendFromControls() {
  const card = cards.find((item) => item.id === els.trendCardSelect?.value);
  const provider = text(els.trendProviderSelect?.value) || "both";
  if (els.trendSourceStatus) els.trendSourceStatus.textContent = "Checking licensed trend sources...";
  try {
    const result = await refreshTrendForCard(card, provider);
    render();
    if (els.trendSourceStatus) {
      els.trendSourceStatus.textContent = [
        `${result.records.length} completed sale${result.records.length === 1 ? "" : "s"} matched`,
        ...result.errors
      ].join(" · ");
    }
  } catch (error) {
    if (els.trendSourceStatus) els.trendSourceStatus.textContent = `${error.message} Import a provider export above, or ask the provider for licensed API access.`;
  }
}

function openTrendImport(cardId = "") {
  setActivePage("collection");
  if (cardId && els.trendCardSelect) els.trendCardSelect.value = cardId;
  location.hash = "#syncArea";
  document.querySelector("#trendSourcePanel")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderCollectorReviewQueue() {
  if (!els.collectorReviewQueue) return;
  const reviews = cards.map(cardReviewDetails);
  const needsReview = reviews
    .filter((item) => item.reasons.length)
    .sort((a, b) => b.reasons.length - a.reasons.length || estimatedCardValue(b.card) - estimatedCardValue(a.card));
  const noComps = reviews.filter((item) => item.sales === 0).length;
  const stale = reviews.filter((item) => item.sales > 0 && item.ageDays > 180).length;
  const identityGaps = reviews.filter((item) => item.reasons.some((reason) => /identity|number|certification/i.test(reason))).length;
  els.collectorReviewQueue.innerHTML = `
    <div class="collector-review-head">
      <div><h3>Collector review queue</h3><p>Exact identity, grade, recency, and source coverage are checked before a trend affects your estimate.</p></div>
      <button class="ghost-button compact-button" type="button" data-open-trend-import>Import trend data</button>
    </div>
    <div class="collector-review-metrics">
      <div><strong>${noComps}</strong><span>No verified comps</span></div>
      <div><strong>${stale}</strong><span>Stale over 180 days</span></div>
      <div><strong>${identityGaps}</strong><span>Identity gaps</span></div>
    </div>
    <div class="collector-review-list">
      ${needsReview.length ? needsReview.slice(0, 8).map((item) => `
        <div class="collector-review-row">
          <div><strong>${escapeHtml(fixedCardName(item.card))}</strong><p>${item.sales ? `${item.sales} saved sale${item.sales === 1 ? "" : "s"} · ${item.sources} source${item.sources === 1 ? "" : "s"}` : "Manual estimate only"}</p></div>
          <div class="review-reasons">${item.reasons.map((reason) => `<span>${escapeHtml(reason)}</span>`).join("")}</div>
          <button class="ghost-button compact-button" type="button" data-review-card="${escapeHtml(item.card.id)}">Resolve</button>
        </div>`).join("") : '<div class="trade-empty">Every card has recent, well-identified trend data.</div>'}
    </div>`;
}

function renderPricingLab() {
  if (!els.pricingLabList) return;
  renderCollectorReviewQueue();
  const pricedCards = cards
    .map((card) => ({ card, confidence: pricingConfidence(card) }))
    .sort((a, b) => estimatedCardValue(b.card) - estimatedCardValue(a.card))
    .slice(0, 12);
  els.pricingLabList.innerHTML = pricedCards.length
    ? pricedCards
        .map(({ card, confidence }) => `
          <article class="intel-card">
            <div>
              <h3>${escapeHtml(fixedCardName(card))}</h3>
              <p>${escapeHtml(valuationMethod(card))}</p>
            </div>
            <dl>
              <div><dt>Estimate</dt><dd>${moneyMarkup(estimatedCardValue(card))}</dd></div>
              <div><dt>Confidence</dt><dd>${escapeHtml(confidence.label)} · ${confidence.score}%</dd></div>
              <div><dt>Sources</dt><dd>${confidence.sources} source${confidence.sources === 1 ? "" : "s"} · ${confidence.sales} sale${confidence.sales === 1 ? "" : "s"}</dd></div>
            </dl>
            <div class="intel-actions">
              <a href="${escapeHtml(ebaySearchUrl(trendSearchQuery(card)))}" target="_blank" rel="noreferrer">eBay comps</a>
              <a href="${escapeHtml(cardHobbySearchUrl(trendSearchQuery(card)))}" target="_blank" rel="noreferrer">CardHobby comps</a>
              <a href="${escapeHtml(`https://www.cardladder.com/search?q=${encodeURIComponent(trendSearchQuery(card))}`)}" target="_blank" rel="noreferrer">Card Ladder</a>
              <a href="${escapeHtml(`https://www.sportscardinvestor.com/cards?search=${encodeURIComponent(trendSearchQuery(card))}`)}" target="_blank" rel="noreferrer">Market Movers</a>
            </div>
          </article>
        `)
        .join("")
    : '<div class="trade-empty">No cards to price yet.</div>';
}

function groupTotals(key) {
  const groups = new Map();
  cards.forEach((card) => {
    const label = text(card[key]) || "Unknown";
    const existing = groups.get(label) || { label, count: 0, value: 0, cost: 0 };
    existing.count += quantity(card.quantity);
    existing.value += estimatedCardValue(card) * quantity(card.quantity);
    existing.cost += numeric(card.paid) * quantity(card.quantity);
    groups.set(label, existing);
  });
  return Array.from(groups.values()).sort((a, b) => b.value - a.value);
}

function liquidityScore(card) {
  const sales = salesInPastYear(card).length;
  const score = Math.min(100, sales * 22 + (estimatedCardValue(card) > 1000 ? 10 : 0));
  return score >= 70 ? "High" : score >= 35 ? "Medium" : "Low";
}

function gradingSignal(card) {
  const raw = estimatedCardValue(card);
  const upside = raw * 2.2 - raw - 180;
  return { upside, label: upside > 300 ? "Grade candidate" : upside > 0 ? "Watch" : "Do not grade" };
}

function cardActivityDate(card) {
  return text(card.purchaseDate) || text(card.createdAt).slice(0, 10) || text(card.updatedAt).slice(0, 10);
}

function cardInPeriod(card, start, end) {
  const date = cardActivityDate(card);
  if (!date) return !start && !end;
  return (!start || date >= start) && (!end || date <= end);
}

function periodLabel(start, end) {
  if (start && end) return `${dateLabel(start)} to ${dateLabel(end)}`;
  if (start) return `Since ${dateLabel(start)}`;
  if (end) return `Through ${dateLabel(end)}`;
  return "All time";
}

function totalsForCards(list) {
  return list.reduce(
    (sum, card) => {
      const qty = quantity(card.quantity);
      sum.count += qty;
      sum.value += estimatedCardValue(card) * qty;
      sum.cost += numeric(card.paid) * qty;
      return sum;
    },
    { count: 0, value: 0, cost: 0 }
  );
}

function renderPeriodSummary() {
  if (!els.periodSummary) return;
  const start = text(periodSettings.start);
  const end = text(periodSettings.end);
  if (els.periodStart) els.periodStart.value = start;
  if (els.periodEnd) els.periodEnd.value = end;
  const periodCards = cards.filter((card) => cardInPeriod(card, start, end));
  const totals = totalsForCards(periodCards);
  const earning = totals.value - totals.cost;
  els.periodSummary.innerHTML = `
    <div><small>Period</small><strong>${escapeHtml(periodLabel(start, end))}</strong></div>
    <div><small>Cards In Period</small><strong>${totals.count.toLocaleString()}</strong></div>
    <div><small>Period Cost</small><strong>${moneyMarkup(totals.cost)}</strong></div>
    <div><small>Current Value</small><strong>${moneyMarkup(totals.value)}</strong></div>
    <div><small>Current Earning</small><strong class="${earning >= 0 ? "trend-up" : "trend-down"}">${moneyMarkup(earning)}</strong></div>
  `;
}

function renderRiskMatrix(totals) {
  if (!els.riskMatrix) return;
  const value = totals?.value || totalsForCards(cards).value || 1;
  const rows = [
    { label: "Player", items: groupTotals("player") },
    { label: "Sport", items: groupTotals("sport") },
    { label: "Set", items: groupTotals("setName") },
    { label: "Parallel", items: groupTotals("parallel") }
  ].map((row) => {
    const top = row.items[0] || { label: "None", value: 0, count: 0 };
    const share = value ? Math.round((top.value / value) * 100) : 0;
    const level = share >= 45 ? "High" : share >= 25 ? "Medium" : "Balanced";
    return { ...row, top, share, level };
  });
  els.riskMatrix.innerHTML = `
    <div class="section-heading compact-heading">
      <h3>Portfolio Risk</h3>
      <span class="role-badge">Concentration</span>
    </div>
    <div class="risk-grid">
      ${rows
        .map(
          (row) => `
            <article class="risk-card ${row.level.toLowerCase()}">
              <small>${escapeHtml(row.label)}</small>
              <strong>${escapeHtml(row.top.label)}</strong>
              <div class="confidence-bar"><span class="confidence-fill" style="width:${Math.min(row.share, 100)}%"></span></div>
              <p>${row.share}% of value · ${escapeHtml(row.level)} risk</p>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function timelineEvents() {
  const cardEvents = cards.slice(0, 120).map((card) => ({
    date: cardActivityDate(card),
    type: card.purchasePlatform ? "Purchase" : cardMatchesAnyGoal(card) ? "Goal Card" : "Card Added",
    title: fixedCardName(card),
    value: estimatedCardValue(card) * quantity(card.quantity),
    meta: [card.purchasePlatform, card.location, card.sport].filter(Boolean).join(" · ")
  }));
  const tradeEvents = trades.map((trade) => ({
    date: text(trade.date) || text(trade.createdAt).slice(0, 10),
    type: "Trade",
    title: trade.counterparty || "Recorded trade",
    value: numeric(trade.tradeNetValue) || numeric(trade.cashReceived) - numeric(trade.cashPaid),
    meta: [trade.outgoing, trade.incoming].filter(Boolean).join(" ⇄ ")
  }));
  const goalEvents = goals
    .filter((goal) => {
      const progress = goalProgress(goal);
      return progress.total > 0 && progress.owned === progress.total;
    })
    .map((goal) => ({
      date: text(goal.createdAt).slice(0, 10) || new Date().toISOString().slice(0, 10),
      type: "Goal Complete",
      title: goal.title || "Collection goal",
      value: goalValueStats(goal).complete,
      meta: goalIncludedDescription(goal)
    }));
  return [...cardEvents, ...tradeEvents, ...goalEvents]
    .filter((event) => event.date)
    .sort((a, b) => new Date(`${b.date}T00:00:00`) - new Date(`${a.date}T00:00:00`))
    .slice(0, 12);
}

function renderCollectionTimeline() {
  if (!els.collectionTimeline) return;
  const events = timelineEvents();
  els.collectionTimeline.innerHTML = `
    <div class="section-heading compact-heading">
      <h3>Collection Timeline</h3>
      <span class="role-badge">${events.length} events</span>
    </div>
    ${
      events.length
        ? events
            .map(
              (event) => `
                <article class="timeline-item">
                  <span>${escapeHtml(dateLabel(event.date))}</span>
                  <div>
                    <strong>${escapeHtml(event.type)} · ${escapeHtml(event.title)}</strong>
                    <small>${escapeHtml(event.meta || "Tracked in Card Ledger")}</small>
                  </div>
                  <b>${moneyMarkup(event.value)}</b>
                </article>
              `
            )
            .join("")
        : '<div class="trade-empty">No timeline activity yet.</div>'
    }
  `;
}

function roomKey(card) {
  if (cardMatchesAnyGoal(card)) return "Collection Goal";
  return text(card.location) || text(card.sport) || "Unsorted";
}

function renderCollectionRooms() {
  if (!els.collectionRooms) return;
  const rooms = new Map();
  cards.forEach((card) => {
    const key = roomKey(card);
    const room = rooms.get(key) || { name: key, count: 0, value: 0, cards: [] };
    room.count += quantity(card.quantity);
    room.value += estimatedCardValue(card) * quantity(card.quantity);
    room.cards.push(card);
    rooms.set(key, room);
  });
  const sortedRooms = Array.from(rooms.values()).sort((a, b) => b.value - a.value).slice(0, 8);
  els.collectionRooms.innerHTML = sortedRooms.length
    ? `
      <div class="section-heading compact-heading">
        <h3>Collection Rooms</h3>
        <span class="role-badge">${rooms.size} rooms</span>
      </div>
      <div class="room-grid">
        ${sortedRooms
          .map(
            (room) => `
              <details class="room-card">
                <summary>
                  <span><strong>${escapeHtml(room.name)}</strong><small>${room.count} card${room.count === 1 ? "" : "s"}</small></span>
                  <b>${moneyMarkup(room.value)}</b>
                </summary>
                <p>${escapeHtml(room.cards.slice(0, 12).map(fixedCardName).join(", "))}</p>
              </details>
            `
          )
          .join("")}
      </div>
    `
    : "";
}

function renderPwaChecklist() {
  if (!els.pwaChecklist) return;
  const checks = [
    { label: "Installable app shell", done: Boolean(window.matchMedia("(display-mode: standalone)").matches || "serviceWorker" in navigator) },
    { label: "Offline collection cache", done: "serviceWorker" in navigator },
    { label: "Member-only trading and posting", done: isMember() },
    { label: "Supabase Auth configured", done: supabaseReady() },
    { label: "Premium auction comps endpoint", done: Boolean(text(auctionSettings.endpoint)) }
  ];
  els.pwaChecklist.innerHTML = `
    <div class="section-heading compact-heading">
      <h3>App Readiness</h3>
      <span class="role-badge">${checks.filter((item) => item.done).length}/${checks.length}</span>
    </div>
    <div class="check-grid">
      ${checks.map((item) => `<span class="${item.done ? "done" : ""}">${item.done ? "✓" : "○"} ${escapeHtml(item.label)}</span>`).join("")}
    </div>
  `;
}

function renderPortfolioIQ() {
  if (!els.portfolioSummary || !els.portfolioInsights) return;
  const totals = totalsForCards(cards);
  const topSports = groupTotals("sport").slice(0, 3);
  const topPlayers = groupTotals("player").slice(0, 3);
  els.portfolioSummary.innerHTML = `
    <div><small>Total Cards</small><strong>${totals.count.toLocaleString()}</strong></div>
    <div><small>Market Value</small><strong>${moneyMarkup(totals.value)}</strong></div>
    <div><small>Cost Basis</small><strong>${moneyMarkup(totals.cost)}</strong></div>
    <div><small>Unrealized P/L</small><strong class="${totals.value - totals.cost >= 0 ? "trend-up" : "trend-down"}">${moneyMarkup(totals.value - totals.cost)}</strong></div>
  `;
  renderPeriodSummary();
  renderRiskMatrix(totals);
  renderCollectionTimeline();
  renderPwaChecklist();
  const grading = cards
    .map((card) => ({ card, signal: gradingSignal(card) }))
    .sort((a, b) => b.signal.upside - a.signal.upside)
    .slice(0, 5);
  els.portfolioInsights.innerHTML = `
    <article class="intel-card">
      <h3>Top Sport Exposure</h3>
      ${topSports.map((item) => `<p>${escapeHtml(item.label)} · ${moneyMarkup(item.value)} · ${item.count} card${item.count === 1 ? "" : "s"}</p>`).join("") || "<p>No exposure yet.</p>"}
    </article>
    <article class="intel-card">
      <h3>Top Player Exposure</h3>
      ${topPlayers.map((item) => `<p>${escapeHtml(item.label)} · ${moneyMarkup(item.value)} · ${item.count} card${item.count === 1 ? "" : "s"}</p>`).join("") || "<p>No players yet.</p>"}
    </article>
    <article class="intel-card">
      <h3>Grading Candidates</h3>
      ${grading.map(({ card, signal }) => `<p>${escapeHtml(cardTitle(card))} · ${escapeHtml(signal.label)} · upside ${moneyMarkup(signal.upside)}</p>`).join("") || "<p>No candidates yet.</p>"}
    </article>
    <article class="intel-card">
      <h3>Liquidity Watch</h3>
      ${cards.slice(0, 5).map((card) => `<p>${escapeHtml(cardTitle(card))} · ${escapeHtml(liquidityScore(card))} liquidity</p>`).join("") || "<p>No cards yet.</p>"}
    </article>
  `;
}

function assistantKey(goalId, slotId) {
  return `${goalId}::${slotId}`;
}

function renderGoalAssistant() {
  if (!els.goalAssistantList) return;
  const missing = missingGoalSlots().slice(0, 30);
  els.goalAssistantList.innerHTML = missing.length
    ? missing
        .map(({ goal, slotId, query }) => {
          const key = assistantKey(goal.id, slotId);
          const saved = goalAssistant[key] || {};
          const estimate = goalSlotEstimate(goal, slotId);
          const target = numeric(saved.target) || Math.round(estimate * 0.88);
          const status = text(saved.status) || "watching";
          const dealBand = target <= estimate * 0.82 ? "Undervalued target" : target <= estimate ? "Fair target" : "Aggressive target";
          return `
            <article class="intel-card assistant-card" data-goal-key="${escapeHtml(key)}">
              <div>
                <h3>${escapeHtml(goalSlotLabel(goal, slotId))}</h3>
                <p>${escapeHtml(goal.title || "Collection Goal")}</p>
              </div>
              <dl>
                <div><dt>Est.</dt><dd>${moneyMarkup(estimate)}</dd></div>
                <div><dt>Target</dt><dd><input data-assistant-target="${escapeHtml(key)}" type="number" min="0" step="10" value="${target}" /></dd></div>
                <div><dt>Deal Finder</dt><dd>${escapeHtml(dealBand)}</dd></div>
                <div><dt>Status</dt><dd>
                  <select data-assistant-status="${escapeHtml(key)}">
                    ${["watching", "negotiating", "bought", "skip"].map((item) => `<option value="${item}" ${item === status ? "selected" : ""}>${item}</option>`).join("")}
                  </select>
                </dd></div>
              </dl>
              <div class="intel-actions">
                <a href="${escapeHtml(ebaySearchUrl(query))}" target="_blank" rel="noreferrer">Find on eBay</a>
                <a href="${escapeHtml(cardHobbySearchUrl(query))}" target="_blank" rel="noreferrer">Find on CardHobby</a>
                <a href="${escapeHtml(goldinSearchUrl(query))}" target="_blank" rel="noreferrer">Goldin</a>
                <a href="${escapeHtml(fanaticsCollectSearchUrl(query))}" target="_blank" rel="noreferrer">Fanatics</a>
                <button class="ghost-button compact-button" type="button" data-action="assistant-mark-have" data-goal-id="${escapeHtml(goal.id)}" data-slot-id="${escapeHtml(slotId)}">Mark Have</button>
              </div>
            </article>
          `;
        })
        .join("")
    : '<div class="trade-empty">No missing goal cards. All active goals are complete.</div>';
}

function renderDealRooms() {
  if (!els.dealRoomList) return;
  els.dealRoomList.innerHTML = dealRooms.length
    ? dealRooms
        .map((deal) => {
          const mineValue = comboValue(parseTradeAiCards(deal.mine));
          const theirValue = comboValue(parseTradeAiCards(deal.theirs));
          const net = theirValue + numeric(deal.cashReceived) - mineValue - numeric(deal.cashPaid);
          return `
            <article class="trade-card">
              <div class="trade-card-header">
                <div>
                  <h3>${escapeHtml(deal.participants || "Private deal")}</h3>
                  <p>${escapeHtml(deal.type)} · ${escapeHtml(deal.status)} · ${escapeHtml(new Date(deal.createdAt).toLocaleDateString())}</p>
                </div>
                <button class="delete-button compact-button" type="button" data-delete-deal-room="${escapeHtml(deal.id)}">Delete</button>
              </div>
              <dl>
                <div><dt>My Side</dt><dd>${escapeHtml(deal.mine || "None").replaceAll("\n", "<br>")}</dd></div>
                <div><dt>Their Side</dt><dd>${escapeHtml(deal.theirs || "None").replaceAll("\n", "<br>")}</dd></div>
                <div><dt>Net Edge</dt><dd class="${net >= 0 ? "trend-up" : "trend-down"}">${moneyMarkup(net)}</dd></div>
              </dl>
              <p>${escapeHtml(deal.notes || "")}</p>
            </article>
          `;
        })
        .join("")
    : '<div class="trade-empty">No private deal rooms yet.</div>';
}

function findMatchingCardFromLine(line) {
  const parsed = parseFixedCardParts(line, { withValue: true });
  if (!parsed) return null;
  return cards.find((card) => {
    const sameNumber = !parsed.cardNumber || text(card.cardNumber).replace(/^#/, "") === text(parsed.cardNumber).replace(/^#/, "");
    const sameBrand = !parsed.brand || hasAllWords(card.brand || inferBrandFromSetName(card.setName), parsed.brand);
    return sameBrand && hasAllWords(card.year, parsed.year) && hasAllWords(card.setName, parsed.setName) && hasAllWords(card.player, parsed.player) && sameNumber;
  });
}

function tradeLineValue(line) {
  const parsed = parseFixedCardParts(line, { withValue: true });
  const explicit = numeric(parsed?.value);
  if (explicit) return explicit;
  const inline = numeric(text(line).match(/(?:rmb|¥)\s*([0-9]+(?:\.[0-9]+)?)/i)?.[1]);
  if (inline) return inline;
  const match = findMatchingCardFromLine(line);
  return match ? estimatedCardValue(match) * quantity(match.quantity) : 0;
}

function tradeSideValue(value) {
  return text(value)
    .split(/\n+/)
    .map(text)
    .filter(Boolean)
    .reduce((sum, line) => sum + tradeLineValue(line), 0);
}

function buildTradeFromForm() {
  const now = new Date().toISOString();
  const outgoingValue = tradeSideValue(tradeFields.outgoing.value);
  const incomingValue = tradeSideValue(tradeFields.incoming.value);
  const cashNet = numeric(tradeFields.cashReceived.value) - numeric(tradeFields.cashPaid.value);
  const tradeNetValue = incomingValue + cashNet - outgoingValue;
  return {
    id: crypto.randomUUID(),
    createdAt: now,
    date: tradeFields.date.value || now.slice(0, 10),
    counterparty: text(tradeFields.counterparty.value),
    outgoing: text(tradeFields.outgoing.value),
    incoming: text(tradeFields.incoming.value),
    cashPaid: numeric(tradeFields.cashPaid.value),
    cashReceived: numeric(tradeFields.cashReceived.value),
    outgoingValue,
    incomingValue,
    tradeNetValue,
    notes: text(tradeFields.notes.value),
    likes: 0,
    wants: 0,
    comments: []
  };
}

async function buildTradePostFromForm() {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    createdAt: now,
    date: now.slice(0, 10),
    counterparty: `${account.name || "Collector"} trade post`,
    outgoing: text(tradePostFields.cards.value),
    incoming: "Open to offers",
    cashPaid: 0,
    cashReceived: 0,
    notes: text(tradePostFields.note.value),
    image: await readImageFile(tradePostFields.photo),
    likes: 0,
    wants: 0,
    comments: []
  };
}

function parseTradeAiLine(line) {
  const raw = text(line);
  const parts = raw.split("|").map(text);
  let parsed = null;
  let grade = "";
  let manualValue = 0;
  if (parts.length >= 8) {
    const [year, brand, setName, player, cardType, parallel, cardNumber, ...tail] = parts;
    if (year && setName && player) {
      parsed = { year, brand, setName, player, type: cardType, parallel, cardNumber: cardNumber.replace(/^#/, "") };
      if (tail.length >= 2) {
        grade = tail[0];
        manualValue = numeric(tail[1]);
      } else {
        manualValue = numeric(tail[0]);
      }
    }
  } else if (parts.length >= 7) {
    const [year, setName, player, cardType, parallel, cardNumber, value] = parts;
    if (year && setName && player) {
      parsed = { year, brand: "", setName, player, type: cardType, parallel, cardNumber: cardNumber.replace(/^#/, "") };
      manualValue = numeric(value);
    }
  }
  if (!manualValue) manualValue = numeric(raw.match(/(?:rmb|¥)\s*([0-9]+(?:\.[0-9]+)?)\s*$/i)?.[1]);
  return { raw, parsed, grade, manualValue };
}

function matchingCollectionCardForTrade(parsed) {
  if (!parsed) return null;
  const candidates = cards
    .map((card) => {
      const sameNumber = !parsed.cardNumber || text(card.cardNumber).replace(/^#/, "") === text(parsed.cardNumber).replace(/^#/, "");
      const sameYear = hasAllWords(card.year, parsed.year);
      const samePlayer = hasAllWords(card.player, parsed.player);
      const sameSet = hasAllWords(card.setName, parsed.setName) || hasAllWords(`${card.brand} ${card.setName}`, `${parsed.brand} ${parsed.setName}`);
      const sameParallel = !parsed.parallel || hasAllWords(`${card.type} ${card.parallel}`, parsed.parallel);
      const score = (sameYear ? 2 : 0) + (samePlayer ? 4 : 0) + (sameSet ? 4 : 0) + (sameNumber ? 3 : 0) + (sameParallel ? 1 : 0);
      return { card, score, valid: sameYear && samePlayer && sameSet && sameNumber && sameParallel };
    })
    .filter((candidate) => candidate.valid)
    .sort((a, b) => b.score - a.score);
  return candidates[0]?.card || null;
}

function median(values) {
  const ordered = values.slice().sort((a, b) => a - b);
  if (!ordered.length) return 0;
  const middle = Math.floor(ordered.length / 2);
  return ordered.length % 2 ? ordered[middle] : (ordered[middle - 1] + ordered[middle]) / 2;
}

function tradeAiValuation(parsedLine) {
  const match = matchingCollectionCardForTrade(parsedLine.parsed);
  const evidenceCard = match || parsedLine.parsed || {};
  const recentSales = sortedSales(evidenceCard).slice(-5);
  const middle = median(recentSales.map((sale) => sale.value));
  const acceptedSales = recentSales.length >= 4
    ? recentSales.filter((sale) => Math.abs(sale.value - middle) <= Math.max(100, middle * 0.5))
    : recentSales;
  const usableSales = acceptedSales.length >= 2 ? acceptedSales : recentSales;
  const sourceNames = [...new Set(usableSales.map((sale) => marketSourceLabel(sale.source)))];
  const salesEstimate = usableSales.length ? usableSales.reduce((sum, sale) => sum + sale.value, 0) / usableSales.length : 0;
  const collectionEstimate = match ? estimatedCardValue(match) : 0;
  const value = salesEstimate || collectionEstimate || parsedLine.manualValue;
  const sourceCount = sourceNames.length;
  const outliersRemoved = Math.max(0, recentSales.length - usableSales.length);
  let confidenceScore = 0;
  let confidence = "Needs value";
  let source = "No estimate evidence";
  let method = "Add a manual value or import completed sales";
  if (salesEstimate) {
    confidenceScore = Math.min(96, 52 + usableSales.length * 10 + Math.min(2, sourceCount) * 7);
    confidence = confidenceScore >= 80 ? "High" : "Medium";
    source = `${usableSales.length} saved completed sale${usableSales.length === 1 ? "" : "s"} · ${sourceNames.join(", ") || "saved data"}`;
    method = `Average of latest ${usableSales.length}${outliersRemoved ? ` after removing ${outliersRemoved} outlier${outliersRemoved === 1 ? "" : "s"}` : ""}`;
  } else if (collectionEstimate) {
    confidenceScore = 58;
    confidence = "Medium";
    source = "Matched collection record";
    method = valuationMethod(match);
  } else if (parsedLine.manualValue) {
    confidenceScore = 34;
    confidence = "Manual";
    source = "User-entered value";
    method = "Manual fallback; no completed-sale evidence attached";
  }
  const saleValues = usableSales.map((sale) => sale.value);
  const rangeLow = saleValues.length ? Math.min(...saleValues) : value ? value * (confidenceScore >= 50 ? 0.85 : 0.75) : 0;
  const rangeHigh = saleValues.length ? Math.max(...saleValues) : value ? value * (confidenceScore >= 50 ? 1.15 : 1.25) : 0;
  return {
    value,
    rangeLow,
    rangeHigh,
    confidence,
    confidenceScore,
    source,
    method,
    sourceCount,
    salesCount: usableSales.length,
    liquidityScore: Math.min(100, usableSales.length * 18 + sourceCount * 12),
    match,
    manualValue: parsedLine.manualValue
  };
}

function parseTradeAiCards(value) {
  return text(value)
    .split(/\n+/)
    .map((line, index) => {
      const parsedLine = parseTradeAiLine(line);
      if (!parsedLine.raw) return null;
      const valuation = tradeAiValuation(parsedLine);
      const name = parsedLine.parsed ? fixedCardName(parsedLine.parsed) : parsedLine.raw.replace(/(?:rmb|¥)\s*[0-9]+(?:\.[0-9]+)?\s*$/i, "").trim();
      return {
        id: `trade-ai-${index}-${parsedLine.raw.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        name: name || parsedLine.raw,
        parsed: parsedLine.parsed,
        grade: parsedLine.grade,
        raw: parsedLine.raw,
        ...valuation
      };
    })
    .filter(Boolean);
}

function tradeAiLineFromCard(card) {
  return [card.year, card.brand || inferBrandFromSetName(card.setName), card.setName, card.player, card.type, card.parallel, card.cardNumber, card.grade || card.condition || "Raw", Math.round(estimatedCardValue(card) * 100) / 100]
    .map((value) => text(value))
    .join(" | ");
}

function appendTradeAiLine(field, line) {
  const current = text(field.value);
  field.value = current ? `${current}\n${line}` : line;
  field.dispatchEvent(new Event("input", { bubbles: true }));
}

function tradeAiConfidenceAverage(side) {
  const valued = side.filter((card) => card.value > 0);
  return valued.length ? valued.reduce((sum, card) => sum + card.confidenceScore, 0) / valued.length : 0;
}

function tradeAiEvidenceMarkup(card) {
  const confidenceClass = card.confidenceScore >= 80 ? "high" : card.confidenceScore >= 50 ? "medium" : card.value ? "manual" : "missing";
  return `
    <div class="trade-evidence-row ${confidenceClass}">
      <div class="trade-evidence-title"><strong>${escapeHtml(card.name)}</strong>${card.grade ? `<span>${escapeHtml(card.grade)}</span>` : ""}</div>
      <div class="trade-evidence-value"><strong>${card.value ? moneyMarkup(card.value) : "Value needed"}</strong><span class="evidence-confidence ${confidenceClass}">${escapeHtml(card.confidence)}</span></div>
      <div class="trade-evidence-meta"><span>${escapeHtml(card.source)}</span>${card.value ? `<span>Range ${moneyMarkup(card.rangeLow)}–${moneyMarkup(card.rangeHigh)}</span>` : ""}</div>
      <small>${escapeHtml(card.method)}</small>
    </div>
  `;
}

function renderTradeAiSide(value, target, summary) {
  if (!target || !summary) return [];
  const side = parseTradeAiCards(value);
  const valued = side.filter((card) => card.value > 0);
  const total = comboValue(valued);
  const missing = side.length - valued.length;
  summary.innerHTML = `<strong>${side.length}</strong> card${side.length === 1 ? "" : "s"} · ${moneyMarkup(total)}${missing ? ` · <em>${missing} needs value</em>` : ""}`;
  target.innerHTML = side.length ? side.map(tradeAiEvidenceMarkup).join("") : '<div class="trade-evidence-empty">No cards added yet.</div>';
  return side;
}

function renderTradeAiCollectionPicker() {
  if (!els.tradeAiCollectionSelect) return;
  const selected = els.tradeAiCollectionSelect.value;
  const sorted = cards.slice().sort((a, b) => fixedCardName(a).localeCompare(fixedCardName(b)));
  els.tradeAiCollectionSelect.innerHTML = `<option value="">Choose from collection</option>${sorted.map((card) => `<option value="${escapeHtml(card.id)}">${escapeHtml(fixedCardName(card))} · ${escapeHtml(money(estimatedCardValue(card)))}</option>`).join("")}`;
  if (sorted.some((card) => card.id === selected)) els.tradeAiCollectionSelect.value = selected;
}

function renderTradeAiWorkspace() {
  const mine = renderTradeAiSide(tradeAiFields.mine?.value, els.tradeAiMinePreview, els.tradeAiMineSummary);
  const theirs = renderTradeAiSide(tradeAiFields.theirs?.value, els.tradeAiTheirsPreview, els.tradeAiTheirsSummary);
  const mineValue = comboValue(mine.filter((card) => card.value > 0));
  const theirValue = comboValue(theirs.filter((card) => card.value > 0));
  const missing = [...mine, ...theirs].filter((card) => !card.value).length;
  if (els.sportsGuyStatus) {
    if (!mine.length || !theirs.length) {
      els.sportsGuyStatus.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">radar</span>Add both sides to activate deal analysis.';
      sportsGuyRobotRuntime?.setState("idle", 0, translatedText("Ready to scout this trade."));
    } else if (missing) {
      els.sportsGuyStatus.innerHTML = `<span class="material-symbols-outlined" aria-hidden="true">warning</span>${missing} card${missing === 1 ? " needs" : "s need"} a value before comparison.`;
      sportsGuyRobotRuntime?.setState("warning", 0, `${missing} card${missing === 1 ? " needs" : "s need"} a value.`);
    } else {
      const difference = theirValue - mineValue;
      els.sportsGuyStatus.innerHTML = `<span class="material-symbols-outlined" aria-hidden="true">analytics</span>Current raw edge: <strong class="${difference >= 0 ? "trend-up" : "trend-down"}">${difference >= 0 ? "+" : ""}${escapeHtml(money(difference))}</strong>`;
      sportsGuyRobotRuntime?.setState("idle", 0, `Current raw edge: ${difference >= 0 ? "+" : ""}${money(difference)}.`);
    }
  }
  return { mine, theirs };
}

function combinations(items, maxSize) {
  const result = [];
  const cappedItems = items.slice(0, 8);
  function walk(start, selected) {
    if (selected.length) result.push(selected);
    if (selected.length >= maxSize) return;
    for (let index = start; index < cappedItems.length; index += 1) {
      walk(index + 1, selected.concat(cappedItems[index]));
    }
  }
  walk(0, []);
  return result;
}

function comboValue(combo) {
  return combo.reduce((sum, card) => sum + numeric(card.value), 0);
}

function comboLabel(combo) {
  return combo.map((card) => `${card.name} (${money(card.value)})`).join("\n");
}

function tradeAiGoalFit(card) {
  if (!card?.parsed || !goals.length) return 0;
  const cardText = `${card.name} ${card.parsed.player || ""} ${card.parsed.setName || ""}`.toLowerCase();
  return goals.reduce((best, goal) => {
    const goalText = `${goal.title || ""} ${goal.player || ""} ${goal.setName || ""}`.toLowerCase();
    const playerMatch = card.parsed.player && goalText.includes(card.parsed.player.toLowerCase());
    const setMatch = card.parsed.setName && goalText.includes(card.parsed.setName.toLowerCase());
    const titleWords = goalText.split(/\W+/).filter((word) => word.length > 3);
    const shared = titleWords.filter((word) => cardText.includes(word)).length;
    return Math.max(best, Math.min(100, (playerMatch ? 55 : 0) + (setMatch ? 30 : 0) + shared * 8));
  }, 0);
}

function roundTradeCash(value) {
  return Math.round(numeric(value) / 10) * 10;
}

function tradeCashPhrase(cashNet) {
  if (Math.abs(cashNet) < 1) return "No cash needed";
  return cashNet > 0 ? `They add ${money(cashNet)}` : `You add ${money(Math.abs(cashNet))}`;
}

function proposalFromCandidate(candidate, strategy, options) {
  const averageValue = Math.max(1, (candidate.mineValue + candidate.theirValue) / 2);
  const confidence = (tradeAiConfidenceAverage(candidate.mine) + tradeAiConfidenceAverage(candidate.theirs)) / 2;
  let cashNet = Math.abs(candidate.difference) <= options.tolerance ? 0 : roundTradeCash(candidate.difference);
  if (strategy.id === "protect") {
    const targetEdge = Math.max(50, Math.min(500, averageValue * 0.025));
    cashNet = roundTradeCash(candidate.difference + targetEdge);
  }
  if (Math.abs(cashNet) > options.maxCash) cashNet = Math.sign(cashNet) * options.maxCash;
  const netAfterCash = candidate.theirValue + cashNet - candidate.mineValue;
  const balanceScore = Math.max(0, 100 - (Math.abs(netAfterCash) / averageValue) * 180);
  const fairnessScore = Math.round(Math.max(0, Math.min(99, balanceScore * 0.72 + confidence * 0.28)));
  const theirLiquidity = candidate.theirs.reduce((sum, card) => sum + card.liquidityScore, 0) / candidate.theirs.length;
  const mineLiquidity = candidate.mine.reduce((sum, card) => sum + card.liquidityScore, 0) / candidate.mine.length;
  const goalFit = candidate.theirs.reduce((best, card) => Math.max(best, tradeAiGoalFit(card)), 0);
  const risk = confidence >= 78 ? "Low" : confidence >= 55 ? "Moderate" : "High";
  return {
    ...candidate,
    strategy: strategy.id,
    title: strategy.title,
    subtitle: strategy.subtitle,
    rationale: strategy.rationale({ cashNet, netAfterCash, confidence, goalFit, theirLiquidity, mineLiquidity }),
    cashNet,
    netAfterCash,
    fairnessScore,
    confidence: Math.round(confidence),
    goalFit,
    liquidityGain: Math.round(theirLiquidity - mineLiquidity),
    risk
  };
}

function proposeTradeDeals(mine, theirs, options) {
  const valuedMine = mine.filter((card) => card.value > 0);
  const valuedTheirs = theirs.filter((card) => card.value > 0);
  const mineCombos = combinations(valuedMine, options.maxCards);
  const theirCombos = combinations(valuedTheirs, options.maxCards);
  const candidates = [];
  mineCombos.forEach((mineCombo) => {
    const mineValue = comboValue(mineCombo);
    theirCombos.forEach((theirCombo) => {
      const theirValue = comboValue(theirCombo);
      const difference = mineValue - theirValue;
      if (Math.abs(difference) > options.maxCash + options.tolerance) return;
      const confidence = (tradeAiConfidenceAverage(mineCombo) + tradeAiConfidenceAverage(theirCombo)) / 2;
      const base = Math.max(1, (mineValue + theirValue) / 2);
      const gapRatio = Math.abs(difference) / base;
      candidates.push({
        mine: mineCombo,
        theirs: theirCombo,
        mineValue,
        theirValue,
        difference,
        confidence,
        gapRatio,
        cardCount: mineCombo.length + theirCombo.length
      });
    });
  });
  if (!candidates.length) return [];
  const strategies = [
    {
      id: "balanced",
      title: "Fair Market",
      subtitle: "Closest evidence-backed match",
      score: (candidate) => candidate.gapRatio * 120 + candidate.cardCount * 1.8 - candidate.confidence * 0.22,
      rationale: ({ cashNet, confidence }) => `${tradeCashPhrase(cashNet)} keeps the estimated values close. Evidence confidence is ${Math.round(confidence)}%.`
    },
    {
      id: "protect",
      title: "Value Shield",
      subtitle: "Protects your downside",
      score: (candidate) => candidate.gapRatio * 100 + candidate.cardCount * 1.2 - candidate.confidence * 0.28,
      rationale: ({ cashNet, netAfterCash, confidence }) => `${tradeCashPhrase(cashNet)} targets a ${money(Math.max(0, netAfterCash))} cushion for uncertainty. Evidence confidence is ${Math.round(confidence)}%.`
    },
    {
      id: "collector",
      title: "Collector Fit",
      subtitle: "Favors goals and liquidity",
      score: (candidate) => {
        const goalFit = candidate.theirs.reduce((best, card) => Math.max(best, tradeAiGoalFit(card)), 0);
        const liquidity = candidate.theirs.reduce((sum, card) => sum + card.liquidityScore, 0) / candidate.theirs.length;
        return candidate.gapRatio * 105 + candidate.cardCount * 1.4 - goalFit * 0.38 - liquidity * 0.16;
      },
      rationale: ({ cashNet, goalFit, theirLiquidity }) => `${tradeCashPhrase(cashNet)} while prioritizing ${goalFit ? "a collection-goal match" : "the receiving side"} and a liquidity signal of ${Math.round(theirLiquidity)}/100.`
    }
  ];
  return strategies.map((strategy) => {
    const candidate = candidates.slice().sort((a, b) => strategy.score(a) - strategy.score(b))[0];
    return proposalFromCandidate(candidate, strategy, options);
  });
}

function renderTradeAiResults(proposals) {
  latestTradeAiProposals = proposals;
  els.tradeAiResults.innerHTML = "";
  els.tradeAiEmpty.classList.toggle("hidden", proposals.length > 0);
  if (els.tradeAiResultSummary) els.tradeAiResultSummary.textContent = proposals.length ? `${proposals.length} strategies · evidence checked` : "No proposal yet";
  if (!proposals.length) {
    els.tradeAiEmpty.textContent = "No balanced deal found. Add values, increase max cash, or allow more cards per side.";
    sportsGuyRobotRuntime?.setState("warning", 2600, "No balanced match yet. Try a wider cash range.");
    return;
  }
  sportsGuyRobotRuntime?.setState("happy", 1900, `${proposals.length} ranked trade strategies are ready.`);
  proposals.forEach((proposal, index) => {
    const cashLine = tradeCashPhrase(proposal.cashNet);
    const item = document.createElement("article");
    item.className = `trade-ai-card strategy-${proposal.strategy}`;
    item.innerHTML = `
      <div class="trade-proposal-topline">
        <span class="proposal-rank">0${index + 1}</span>
        <div>
          <span class="proposal-kicker">${escapeHtml(proposal.subtitle)}</span>
          <h3>${escapeHtml(proposal.title)}</h3>
        </div>
        <div class="proposal-score"><strong>${proposal.fairnessScore}</strong><span>deal score</span></div>
      </div>
      <div class="proposal-score-track"><i style="width:${proposal.fairnessScore}%"></i></div>
      <div class="proposal-sides">
        <div><span>You give · ${moneyMarkup(proposal.mineValue)}</span><ul>${proposal.mine.map((card) => `<li><strong>${escapeHtml(card.name)}</strong><small>${escapeHtml(card.confidence)} confidence · ${escapeHtml(card.source)}</small></li>`).join("")}</ul></div>
        <span class="proposal-swap material-symbols-outlined" aria-hidden="true">swap_horiz</span>
        <div><span>You receive · ${moneyMarkup(proposal.theirValue)}</span><ul>${proposal.theirs.map((card) => `<li><strong>${escapeHtml(card.name)}</strong><small>${escapeHtml(card.confidence)} confidence · ${escapeHtml(card.source)}</small></li>`).join("")}</ul></div>
      </div>
      <div class="proposal-terms">
        <div><span>Cash adjustment</span><strong>${escapeHtml(cashLine)}</strong></div>
        <div><span>Evidence</span><strong>${proposal.confidence}%</strong></div>
        <div><span>Risk</span><strong class="risk-${proposal.risk.toLowerCase()}">${escapeHtml(proposal.risk)}</strong></div>
        <div><span>Liquidity change</span><strong class="${proposal.liquidityGain >= 0 ? "trend-up" : "trend-down"}">${proposal.liquidityGain >= 0 ? "+" : ""}${proposal.liquidityGain}</strong></div>
      </div>
      <p class="proposal-rationale">${escapeHtml(proposal.rationale)}</p>
      <div class="proposal-actions"><button class="ghost-button compact-button" type="button" data-action="sports-guy-proposal">Ask Sports Guy</button><button class="primary-button compact-button" type="button" data-action="use-ai-trade">Use Deal</button></div>
    `;
    item.querySelector('[data-action="use-ai-trade"]').addEventListener("click", () => {
      tradeFields.outgoing.value = comboLabel(proposal.mine);
      tradeFields.incoming.value = comboLabel(proposal.theirs);
      tradeFields.cashPaid.value = proposal.cashNet < 0 ? Math.abs(proposal.cashNet).toFixed(2) : "0";
      tradeFields.cashReceived.value = proposal.cashNet > 0 ? proposal.cashNet.toFixed(2) : "0";
      tradeFields.notes.value = `${proposal.title} proposal. ${cashLine}. Deal score ${proposal.fairnessScore}/100; estimate confidence ${proposal.confidence}%. You give ${money(proposal.mineValue)}, receive ${money(proposal.theirValue)}. ${proposal.rationale}`;
      setEntryMode("trade");
    });
    item.querySelector('[data-action="sports-guy-proposal"]').addEventListener("click", () => runSportsGuyAction("counter", "", proposal));
    els.tradeAiResults.append(item);
  });
  applyTranslations(els.tradeAiResults);
}

function sportsGuyDefaultMessage() {
  return {
    id: "sports-guy-welcome",
    role: "agent",
    text: "I’m Sports Guy. Build both sides, then I’ll pressure-test the values and draft a reply you can approve before sending.",
    createdAt: new Date().toISOString()
  };
}

function updateSportsGuyVoiceControl() {
  if (!els.sportsGuyVoiceToggle) return;
  const available = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
  sportsGuyVoiceEnabled = available && sportsGuyVoiceEnabled;
  els.sportsGuyVoiceToggle.disabled = !available;
  els.sportsGuyVoiceToggle.setAttribute("aria-pressed", String(sportsGuyVoiceEnabled));
  els.sportsGuyVoiceToggle.setAttribute("title", sportsGuyVoiceEnabled ? translatedText("Turn off Sports Guy voice") : translatedText("Turn on Sports Guy voice"));
  els.sportsGuyVoiceToggle.innerHTML = `<span class="material-symbols-outlined" aria-hidden="true">${sportsGuyVoiceEnabled ? "volume_up" : "volume_off"}</span><span>${translatedText(sportsGuyVoiceEnabled ? "Voice on" : "Voice off")}</span>`;
}

function setSportsGuyVoiceEnabled(enabled) {
  sportsGuyVoiceEnabled = Boolean(enabled);
  localStorage.setItem(SPORTS_GUY_VOICE_KEY, String(sportsGuyVoiceEnabled));
  updateSportsGuyVoiceControl();
  if (sportsGuyVoiceEnabled) sportsGuyRobotRuntime?.speak(translatedText("Voice is on. I’ll talk through the trade with you."));
  else if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

function renderSportsGuyMessages() {
  if (!els.sportsGuyMessages) return;
  if (!sportsGuyMessages.length) sportsGuyMessages = [sportsGuyDefaultMessage()];
  els.sportsGuyMessages.innerHTML = sportsGuyMessages.map((message) => `
    <div class="sports-guy-message ${message.role}">
      <span>${message.role === "agent" ? "SG" : "YOU"}</span>
      <div><p>${escapeHtml(message.text)}</p>${message.draft ? `<blockquote>${escapeHtml(message.draft)}</blockquote>` : ""}<time>${escapeHtml(new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))}</time></div>
    </div>
  `).join("");
  latestSportsGuyDraft = [...sportsGuyMessages].reverse().find((message) => message.draft)?.draft || "";
  els.sportsGuyCopyReply?.classList.toggle("hidden", !latestSportsGuyDraft);
  els.sportsGuyMessages.scrollTop = els.sportsGuyMessages.scrollHeight;
}

function pushSportsGuyMessage(role, message, draft = "") {
  sportsGuyMessages.push({ id: crypto.randomUUID(), role, text: text(message), draft: text(draft), createdAt: new Date().toISOString() });
  sportsGuyMessages = sportsGuyMessages.slice(-30);
  saveSportsGuyMessages();
  renderSportsGuyMessages();
  if (role === "agent") sportsGuyRobotRuntime?.speak(message);
}

function sportsGuyContext(proposal) {
  const mine = parseTradeAiCards(tradeAiFields.mine.value);
  const theirs = parseTradeAiCards(tradeAiFields.theirs.value);
  const valuedMine = mine.filter((card) => card.value > 0);
  const valuedTheirs = theirs.filter((card) => card.value > 0);
  return {
    mine,
    theirs,
    mineValue: comboValue(valuedMine),
    theirValue: comboValue(valuedTheirs),
    missing: [...mine, ...theirs].filter((card) => !card.value),
    confidence: Math.round((tradeAiConfidenceAverage(valuedMine) + tradeAiConfidenceAverage(valuedTheirs)) / 2),
    proposal: proposal || latestTradeAiProposals[0] || null
  };
}

function sportsGuyDraft(context, proposal) {
  const chosen = proposal || context.proposal;
  const cashNet = chosen ? chosen.cashNet : roundTradeCash(context.mineValue - context.theirValue);
  const receiveNames = (chosen?.theirs || context.theirs).map((card) => card.name).join(", ");
  return `I’m interested in ${receiveNames || "the deal"}. Based on the completed-sale evidence I have my side at ${money(chosen?.mineValue || context.mineValue)} and yours at ${money(chosen?.theirValue || context.theirValue)}. ${cashNet > 0 ? `Could you add ${money(cashNet)} to balance it?` : cashNet < 0 ? `I can add ${money(Math.abs(cashNet))} to balance it.` : "The values look close enough for a straight trade."} If that works, I’m ready to confirm the exact cards and condition.`;
}

function sportsGuyAdvice(action, dealerMessage = "", proposal = null) {
  const context = sportsGuyContext(proposal);
  if (!context.mine.length || !context.theirs.length) {
    return { text: "Add at least one card to each side first. I need both sides before I can judge leverage or draft a counter.", draft: "" };
  }
  if (context.missing.length) {
    return { text: `${context.missing.length} card${context.missing.length === 1 ? " has" : "s have"} no usable estimate. Add a manual value or completed-sale evidence before negotiating; otherwise the deal score can be misleading.`, draft: "" };
  }
  const chosen = proposal || context.proposal;
  const rawEdge = context.theirValue - context.mineValue;
  const base = Math.max(1, (context.mineValue + context.theirValue) / 2);
  const gapPercent = Math.abs(rawEdge) / base * 100;
  const messageCash = numeric(text(dealerMessage).match(/(?:rmb|¥)\s*([0-9]+(?:\.[0-9]+)?)/i)?.[1]);
  const normalizedMessage = text(dealerMessage).toLowerCase();
  const userAddsCash = /(?:i|you|my side|your side).{0,24}(?:add|pay|include)|(?:add|pay).{0,24}(?:i|you|my side|your side)/i.test(normalizedMessage);
  const dealerAddsCash = /(?:dealer|they|their side|other side).{0,24}(?:add|pay|include)|(?:add|pay).{0,24}(?:dealer|they|their side|other side)/i.test(normalizedMessage);
  if (dealerMessage && messageCash && (userAddsCash || dealerAddsCash)) {
    const cashNet = dealerAddsCash && !userAddsCash ? messageCash : -messageCash;
    const postCashEdge = rawEdge + cashNet;
    const postCashGap = Math.abs(postCashEdge) / base * 100;
    const fairCashNet = roundTradeCash(context.mineValue - context.theirValue);
    const favorable = postCashEdge >= -numeric(tradeAiFields.tolerance.value);
    return {
      text: `${favorable ? "That cash term is within your current tolerance." : "That cash term works against you."} After ${cashNet > 0 ? "the dealer adds" : "you add"} ${money(messageCash)}, your estimated net is ${postCashEdge >= 0 ? "+" : ""}${money(postCashEdge)} (${postCashGap.toFixed(1)}% of the average side value). A fair-market adjustment is ${tradeCashPhrase(fairCashNet)}.`,
      draft: favorable
        ? `I can work with ${tradeCashPhrase(cashNet).toLowerCase()}, subject to confirming condition and the exact cards.`
        : `I can’t add ${money(messageCash)} on top. Based on the current completed-sale estimates, my side is ${money(context.mineValue)} and yours is ${money(context.theirValue)}. A fair adjustment is ${tradeCashPhrase(fairCashNet).toLowerCase()}. If that works, I’m ready to verify condition and finalize.`
    };
  }
  if (action === "walk") {
    const weakEvidence = context.confidence < 55;
    const warning = gapPercent > 12 || weakEvidence;
    return {
      text: warning
        ? `Do not rush this one. The raw value gap is ${gapPercent.toFixed(1)}% and estimate confidence is ${context.confidence}%. Verify condition, serial number, and the latest completed sale before agreeing.`
        : `No automatic walk-away signal. The raw gap is ${gapPercent.toFixed(1)}% with ${context.confidence}% estimate confidence, but still verify condition and authenticity in person.`,
      draft: warning ? "I’m interested, but the value gap and comp confidence are outside my comfort zone. I’d like to pause and verify the latest completed sales and card condition before continuing." : ""
    };
  }
  if (action === "middle") {
    const fairCashNet = roundTradeCash(context.mineValue - context.theirValue);
    const compromiseCash = roundTradeCash(fairCashNet * 0.85);
    return {
      text: `Fair market calls for ${tradeCashPhrase(fairCashNet)}. A reasonable closing compromise is ${tradeCashPhrase(compromiseCash)}, which leaves a small concession without ignoring the evidence.`,
      draft: sportsGuyDraft(context, chosen ? { ...chosen, cashNet: compromiseCash } : { mineValue: context.mineValue, theirValue: context.theirValue, mine: context.mine, theirs: context.theirs, cashNet: compromiseCash })
    };
  }
  if (action === "counter") {
    return {
      text: `${chosen ? `${chosen.title} is the strongest current counter at ${chosen.fairnessScore}/100.` : "I built a fair-market counter from the current totals."} ${messageCash ? `The dealer mentioned ${money(messageCash)}; compare that with ${tradeCashPhrase(chosen?.cashNet ?? context.mineValue - context.theirValue)}.` : "Lead with the evidence and keep condition verification in the deal."}`,
      draft: sportsGuyDraft(context, chosen)
    };
  }
  const direction = rawEdge >= 0 ? `you receive about ${money(rawEdge)} more before cash` : `you give about ${money(Math.abs(rawEdge))} more before cash`;
  return {
    text: `Current read: ${direction}. The raw gap is ${gapPercent.toFixed(1)}%, estimate confidence is ${context.confidence}%, and ${chosen ? `${chosen.title} scores ${chosen.fairnessScore}/100 after its cash adjustment` : "no ranked proposal has been generated yet"}. ${dealerMessage ? "I treated your message as dealer context, not as verified sale evidence." : ""}`,
    draft: ""
  };
}

function runSportsGuyAction(action, dealerMessage = "", proposal = null) {
  const label = ({ evaluate: "Evaluate the current offer", counter: "Draft a counteroffer", middle: "Find a fair middle", walk: "Check my walk-away point" })[action] || dealerMessage;
  if (label) pushSportsGuyMessage("user", dealerMessage || label);
  const advice = sportsGuyAdvice(action, dealerMessage, proposal);
  window.clearTimeout(sportsGuyResponseTimer);
  sportsGuyRobotRuntime?.setState("thinking", 0, translatedText("Checking both sides..."));
  sportsGuyResponseTimer = window.setTimeout(() => {
    pushSportsGuyMessage("agent", advice.text, advice.draft);
    sportsGuyResponseTimer = 0;
  }, 420);
}

function renderTrades() {
  const net = trades.reduce((sum, trade) => sum + numeric(trade.cashReceived) - numeric(trade.cashPaid), 0);
  renderMoney(els.tradeNet, net);
  els.tradeList.innerHTML = "";
  els.tradeEmpty.classList.toggle("hidden", trades.length > 0);
  trades.map(normalizeSocialPost).forEach((trade) => {
    const item = document.createElement("article");
    item.className = "trade-card";
    item.innerHTML = `
      <div class="trade-card-header">
        <div>
          <h3>${escapeHtml(trade.counterparty || "Trade")}</h3>
          <p>${escapeHtml(new Date(`${trade.date}T00:00:00`).toLocaleDateString())}</p>
        </div>
        <button class="delete-button" type="button">Delete</button>
      </div>
      ${trade.image ? `<img class="post-photo" src="${escapeHtml(trade.image)}" alt="${escapeHtml(`${trade.counterparty || "Trade"} photo`)}" />` : ""}
      <dl>
        <div><dt>Outgoing</dt><dd>${escapeHtml(trade.outgoing || "None")}</dd></div>
        <div><dt>Incoming</dt><dd>${escapeHtml(trade.incoming || "None")}</dd></div>
        <div><dt>Cash</dt><dd>${moneyMarkup(numeric(trade.cashReceived) - numeric(trade.cashPaid))}</dd></div>
        ${
          numeric(trade.outgoingValue) || numeric(trade.incomingValue)
            ? `<div><dt>Value Check</dt><dd>${moneyMarkup(numeric(trade.outgoingValue))} out / ${moneyMarkup(numeric(trade.incomingValue))} in</dd></div>
              <div><dt>Net Value</dt><dd>${moneyMarkup(numeric(trade.tradeNetValue) || numeric(trade.incomingValue) - numeric(trade.outgoingValue))}</dd></div>`
            : ""
        }
      </dl>
      <p>${escapeHtml(trade.notes)}</p>
      ${socialActionsMarkup(trade, "trade")}
    `;
    item.querySelector("button").addEventListener("click", () => deleteTrade(trade.id));
    els.tradeList.append(item);
  });
}

function deleteTrade(id) {
  if (!requireMember("delete trades")) return;
  trades = trades.filter((trade) => trade.id !== id);
  saveTrades();
  renderTrades();
  renderAccount();
}

function goalProgress(goal) {
  const years = Object.keys(goal.slots || {});
  const owned = years.filter((year) => goal.slots[year]?.owned).length;
  return { owned, total: years.length, pct: years.length ? Math.round((owned / years.length) * 100) : 0 };
}

function goalValueStats(goal) {
  const slotIds = Object.keys(goal.slots || {});
  const complete = slotIds.reduce((sum, slotId) => sum + goalSlotEstimate(goal, slotId), 0);
  const current = slotIds
    .filter((slotId) => goal.slots[slotId]?.owned)
    .reduce((sum, slotId) => sum + goalSlotEstimate(goal, slotId), 0);
  return { current, complete };
}

function renderGoals() {
  els.goalList.innerHTML = "";
  els.goalEmpty.classList.toggle("hidden", goals.length > 0);
  if (els.goalLibraryCount) {
    const totalSlots = goals.reduce((sum, goal) => sum + Object.keys(goal.slots || {}).length, 0);
    const ownedSlots = goals.reduce((sum, goal) => sum + goalProgress(goal).owned, 0);
    els.goalLibraryCount.textContent = currentLanguage === "zh-CN"
      ? `${goals.length} 个目标 · ${ownedSlots}/${totalSlots} 张已拥有`
      : `${goals.length} goal${goals.length === 1 ? "" : "s"} · ${ownedSlots}/${totalSlots} cards owned`;
  }
  els.expandAllGoals?.toggleAttribute("disabled", !goals.length || goals.every((goal) => expandedGoalIds.has(goal.id)));
  els.collapseAllGoals?.toggleAttribute("disabled", !goals.some((goal) => expandedGoalIds.has(goal.id)));
  goals.forEach((goal) => {
    const progress = goalProgress(goal);
    const values = goalValueStats(goal);
    const expanded = expandedGoalIds.has(goal.id);
    const item = document.createElement("article");
    item.className = `goal-card ${expanded ? "expanded" : "collapsed"}`;
    item.innerHTML = `
      <div class="goal-card-header">
        <div class="goal-card-identity">
          <h3>${escapeHtml(goal.title || "Collection Goal")}</h3>
          <p>${escapeHtml([goal.season, goal.player, goal.setName, goal.parallel].filter(Boolean).join(" · "))}</p>
        </div>
        <button class="ghost-button goal-disclosure" type="button" data-action="toggle-goal-slots" data-goal-id="${escapeHtml(goal.id)}" aria-expanded="${expanded}" aria-controls="goal-details-${escapeHtml(goal.id)}">
          <span class="material-symbols-outlined" aria-hidden="true">${expanded ? "expand_less" : "expand_more"}</span>
          <span>${currentLanguage === "zh-CN" ? (expanded ? "收起卡片" : "查看卡片") : (expanded ? "Hide cards" : "View cards")}</span>
        </button>
      </div>
      <div class="goal-progress" aria-label="${progress.owned} of ${progress.total} owned">
        <span style="width: ${progress.pct}%"></span>
      </div>
      <div class="goal-progress-meta">
        <strong>${progress.owned}/${progress.total} owned</strong>
        <span>${progress.pct}% complete</span>
      </div>
      <dl class="goal-values">
        <div><dt>Current Est.</dt><dd>${moneyMarkup(values.current)}</dd></div>
        <div><dt>Complete Est.</dt><dd>${moneyMarkup(values.complete)}</dd></div>
      </dl>
      <div id="goal-details-${escapeHtml(goal.id)}" class="goal-details ${expanded ? "" : "hidden"}">
        <div class="goal-details-heading">
          <span>${currentLanguage === "zh-CN" ? `目标内共 ${progress.total} 张卡片` : `${progress.total} cards in this goal`}</span>
          <button class="delete-button compact-button" type="button" data-action="delete-goal" data-goal-id="${escapeHtml(goal.id)}">${currentLanguage === "zh-CN" ? "删除目标" : "Delete goal"}</button>
        </div>
        <div class="goal-grid"></div>
        ${goal.notes ? `<p class="goal-notes">${escapeHtml(goal.notes)}</p>` : ""}
      </div>
    `;
    if (expanded) {
      const grid = item.querySelector(".goal-grid");
      Object.keys(goal.slots || {}).forEach((slotId) => {
        const slot = goal.slots[slotId] || { owned: false, image: "" };
        const slotLabel = goalSlotLabel(goal, slotId);
        const tile = document.createElement("div");
        tile.className = `goal-slot ${slot.owned ? "owned" : "missing"}`;
        tile.innerHTML = `
          <div class="goal-image">
            ${
              slot.image
                ? `<img src="${escapeHtml(slot.image)}" alt="${escapeHtml(`${goal.title} ${slotLabel}`)}" />`
                : `<span>${escapeHtml(slotId)}</span>`
            }
          </div>
          <div class="goal-slot-body">
            <strong>${escapeHtml(slotLabel)}</strong>
            <small>${currentLanguage === "zh-CN" ? (slot.owned ? "已拥有" : "缺失") : (slot.owned ? "Have" : "Missing")}</small>
            <div class="goal-slot-actions">
              <button type="button" class="ghost-button" data-action="toggle-slot" data-goal-id="${escapeHtml(goal.id)}" data-slot-id="${escapeHtml(slotId)}">${
                currentLanguage === "zh-CN" ? (slot.owned ? "标记缺失" : "标记已有") : (slot.owned ? "Mark Missing" : "Mark Have")
              }</button>
              <label class="ghost-button image-import">
                ${currentLanguage === "zh-CN" ? "图片" : "Image"}
                <input type="file" accept="image/*" data-action="image-slot" data-goal-id="${escapeHtml(goal.id)}" data-slot-id="${escapeHtml(slotId)}" />
              </label>
            </div>
          </div>
        `;
        grid.append(tile);
      });
    }
    els.goalList.append(item);
  });
}

function missingGoalSlots() {
  return goals.flatMap((goal) =>
    Object.keys(goal.slots || {})
      .filter((slotId) => !goal.slots[slotId]?.owned)
      .map((slotId) => ({ goal, slotId, query: goalSearchQuery(goal, slotId) }))
  );
}

function renderAlerts() {
  const missing = missingGoalSlots();
  els.alertList.innerHTML = "";
  els.alertCount.textContent = `${missing.length} watching`;
  els.alertEmpty.classList.toggle("hidden", missing.length > 0);
  els.toggleAlerts.classList.toggle("hidden", missing.length === 0);
  els.toggleAlerts.textContent = alertsExpanded ? "Hide Alerts" : "Show Alerts";
  els.alertList.classList.toggle("hidden", !alertsExpanded);
  missing.forEach(({ goal, slotId, query }) => {
    const slotLabel = goalSlotLabel(goal, slotId);
    const item = document.createElement("article");
    item.className = "alert-card";
    item.innerHTML = `
      <div>
        <h3>${escapeHtml(query)}</h3>
        <p>${escapeHtml(goal.title || "Collection Goal")} · Missing ${escapeHtml(slotLabel)}</p>
      </div>
      <div class="alert-actions">
        <a href="${escapeHtml(ebaySearchUrl(query))}" target="_blank" rel="noreferrer">eBay</a>
        <a href="${escapeHtml(cardHobbySearchUrl(query))}" target="_blank" rel="noreferrer">CardHobby</a>
        <button class="ghost-button" type="button" data-action="toggle-slot" data-goal-id="${escapeHtml(goal.id)}" data-slot-id="${escapeHtml(slotId)}">Mark Have</button>
      </div>
    `;
    els.alertList.append(item);
  });
}

function deleteGoal(id) {
  if (!requireMember("delete collecting goals")) return;
  goals = goals.filter((goal) => goal.id !== id);
  saveGoals();
  renderGoals();
  renderAlerts();
  renderConnectedAccounts();
  renderAccount();
}

function toggleGoalSlot(goalId, year) {
  if (!requireMember("update collecting goals")) return;
  const goal = goals.find((item) => item.id === goalId);
  if (!goal || !goal.slots?.[year]) return;
  goal.slots[year].owned = !goal.slots[year].owned;
  saveGoals();
  renderGoals();
  renderAlerts();
  renderAccount();
}

async function addGoalSlotImage(goalId, year, file) {
  if (!requireMember("upload goal card images")) return;
  const goal = goals.find((item) => item.id === goalId);
  if (!goal || !goal.slots?.[year] || !file) return;
  goal.slots[year].image = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(file);
  });
  goal.slots[year].owned = true;
  saveGoals();
  renderGoals();
  renderAlerts();
  renderAccount();
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function loadLanguage() {
  const requested = new URLSearchParams(window.location.search).get("lang");
  if (requested === "zh" || requested === "zh-CN") {
    localStorage.setItem(LANGUAGE_KEY, "zh-CN");
    return "zh-CN";
  }
  const saved = localStorage.getItem(LANGUAGE_KEY);
  return saved && (saved === "en" || TRANSLATIONS[saved]) ? saved : "en";
}

let currentLanguage = loadLanguage();
let translationApplying = false;

function loadTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  return ["emerald", "midnight", "crimson", "titanium"].includes(saved) ? saved : "emerald";
}

let currentTheme = loadTheme();

function applyTheme() {
  document.documentElement.dataset.theme = currentTheme;
  if (els.themeSelect) els.themeSelect.value = currentTheme;
  const colors = { emerald: "#090d0c", midnight: "#07101d", crimson: "#16080d", titanium: "#0d0f13" };
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", colors[currentTheme]);
}

applyTheme();

function translatedText(value) {
  const source = String(value || "");
  const trimmed = source.trim();
  if (!trimmed || currentLanguage === "en") return source;
  const dictionary = TRANSLATIONS[currentLanguage] || {};
  const showCardsMatch = trimmed.match(/^Show Cards \((\d+)\)$/);
  if (showCardsMatch && dictionary["Show Cards"]) return source.replace(trimmed, `${dictionary["Show Cards"]} (${showCardsMatch[1]})`);
  const translated = dictionary[trimmed];
  return translated ? source.replace(trimmed, translated) : source;
}

function translateElementAttribute(element, attr) {
  if (!element?.hasAttribute(attr)) return;
  const originalAttr = `data-i18n-original-${attr}`;
  if (!element.hasAttribute(originalAttr)) {
    element.setAttribute(originalAttr, element.getAttribute(attr) || "");
  }
  const original = element.getAttribute(originalAttr) || "";
  element.setAttribute(attr, currentLanguage === "en" ? original : translatedText(original));
}

function translateTextNode(node) {
  if (!node.parentElement) return;
  const original = node._i18nOriginalText || node.nodeValue;
  node._i18nOriginalText = original;
  node.nodeValue = currentLanguage === "en" ? original : translatedText(original);
}

function applyTranslations(root = document.body) {
  if (!root || translationApplying) return;
  translationApplying = true;
  document.documentElement.lang = currentLanguage;
  document.title = currentLanguage === "en" ? "Card Ledger" : translatedText("Card Ledger");
  if (els.languageSelect) els.languageSelect.value = currentLanguage;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      const parent = node.parentElement;
      if (!parent || parent.closest("script, style, textarea, input, .card-grid, .trade-list, .community-feed, .public-collectors, .goal-list, .market-charts")) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(translateTextNode);
  root.querySelectorAll?.("input[placeholder], textarea[placeholder], button[title], label[title], [aria-label]").forEach((element) => {
    translateElementAttribute(element, "placeholder");
    translateElementAttribute(element, "title");
    translateElementAttribute(element, "aria-label");
  });
  root.querySelectorAll?.("option").forEach((option) => {
    if (!option.dataset.i18nOriginalText) option.dataset.i18nOriginalText = option.textContent;
    option.textContent = currentLanguage === "en" ? option.dataset.i18nOriginalText : translatedText(option.dataset.i18nOriginalText);
  });
  translationApplying = false;
}

function render() {
  const list = filteredCards();
  const isEmpty = list.length === 0;
  renderPresentationCloset();
  renderConditionCollectionCards();
  renderConditionReport(conditionLatestResult);
  renderStats();
  renderCollectionHealth();
  renderSportFilter();
  renderGrid(list);
  renderTable(list);
  renderGoalCollections();
  renderCollectionRooms();
  renderSportIndices(cards);
  renderMarketCharts(list);
  renderTrendCardSelect();
  renderPricingLab();
  renderPortfolioIQ();
  renderGoalAssistant();
  renderDealRooms();
  renderTradeAiCollectionPicker();
  renderTradeAiWorkspace();
  renderSportsGuyMessages();
  renderTrades();
  renderGoals();
  renderAlerts();
  renderAccount();
  renderSocial();
  renderCommunity();
  renderDIYMarketplace();
  syncConditionControlState();
  syncPhotoImportControls();
  const collectionToggleLabel = collectionExpanded ? "Collapse collection" : "Expand collection";
  els.toggleCollectionContent.textContent = collectionToggleLabel;
  els.collectionInventory?.classList.toggle("hidden", !collectionExpanded);
  if (els.collectionViewerCount) {
    els.collectionViewerCount.textContent = currentLanguage === "zh-CN"
      ? `${list.length} 张卡片可浏览`
      : `${list.length} card${list.length === 1 ? "" : "s"} ready to browse`;
  }
  if (els.quickToggleCollection) {
    els.quickToggleCollection.setAttribute("aria-expanded", String(collectionExpanded));
    els.quickToggleCollection.innerHTML = `<span class="material-symbols-outlined" aria-hidden="true">${collectionExpanded ? "unfold_less" : "unfold_more"}</span><span>${collectionToggleLabel}</span>`;
  }
  [els.gridView, els.quickGridView].forEach((button) => button?.classList.toggle("active", viewMode === "grid"));
  [els.tableView, els.quickTableView].forEach((button) => button?.classList.toggle("active", viewMode === "table"));
  els.emptyState.classList.toggle("hidden", !collectionExpanded || !isEmpty);
  els.gridList.classList.toggle("hidden", !collectionExpanded || viewMode !== "grid" || isEmpty);
  els.tableWrap.classList.toggle("hidden", !collectionExpanded || viewMode !== "table" || isEmpty);
  setupChartTooltips();
  updateBeginnerEntryGuide();
  applyTranslations();
  window.CardLedgerAdvanced?.afterRender?.(list);
}

function editCard(id) {
  if (!requireMember("edit cards")) return;
  const card = cards.find((item) => item.id === id);
  if (!card) return;
  pendingPsaPopulation = normalizePsaPopulation(card.psaPopulation);
  window.CardLedgerCardSelectors?.sync?.(card);
  window.CardLedgerAdvanced?.syncCardSelectors?.(card);
  Object.entries(fields).forEach(([key, field]) => {
    if (["brand", "setName", "player"].includes(key)) return;
    field.value = key === "id" ? card.id : card[key] ?? "";
  });
  form.querySelector(".primary-button").textContent = "Update Card";
  renderPsaCardLookup();
  queueMicrotask(updateBeginnerEntryGuide);
  document.querySelector(".entry-panel").scrollIntoView({ behavior: "smooth", block: "start" });
}

function deleteCard(id) {
  if (!requireMember("delete cards")) return;
  const card = cards.find((item) => item.id === id);
  if (!card) return;
  const confirmed = window.confirm(`Delete ${cardTitle(card)}?`);
  if (!confirmed) return;
  window.CardLedgerAdvanced?.recordDeletion?.("cards", id, card);
  cards = cards.filter((item) => item.id !== id);
  saveCards();
  render();
}

function download(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function toCsv(rows) {
  const headers = [
    "year",
    "brand",
    "setName",
    "player",
    "type",
    "parallel",
    "cardNumber",
    "sport",
    "condition",
    "grade",
    "certification",
    "quantity",
    "paid",
    "value",
    "purchasePlatform",
    "purchaseOrderId",
    "purchaseDate",
    "location",
    "notes"
  ];
  const escapeCell = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  return [headers.join(","), ...rows.map((row) => headers.map((key) => escapeCell(row[key])).join(","))].join("\n");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!requireMember("add cards to your collection")) return;
  if (focusBeginnerMissingField()) return;
  if (isPsaGrade(fields.grade.value)) await lookupPsaCardPopulation({ silent: true });
  const baseCard = buildCardFromForm();
  const builtCard = window.CardLedgerAdvanced?.enrichCard?.(baseCard) || baseCard;
  const card = await attachCardImage(await attachPsaPopulation(builtCard));
  const index = cards.findIndex((item) => item.id === card.id);
  if (index >= 0) {
    cards[index] = card;
  } else {
    cards.unshift(card);
  }
  saveCards();
  syncGoalSlotsFromCard(card);
  resetForm();
  render();
});

els.resetForm.addEventListener("click", resetForm);
els.startScanCamera.addEventListener("click", startScanCamera);
els.stopScanCamera.addEventListener("click", stopScanCamera);
els.captureScanCard.addEventListener("click", captureScanCard);
playerScanElements.file?.addEventListener("change", () => identifyPlayerFromPhoto(playerScanElements.file));
globalScanElements.open?.addEventListener("click", openGlobalScanner);
globalScanElements.close?.addEventListener("click", () => closeGlobalScanner());
globalScanElements.backdrop?.addEventListener("click", () => closeGlobalScanner());
globalScanElements.choose?.addEventListener("click", chooseGlobalScanPhoto);
globalScanElements.again?.addEventListener("click", chooseGlobalScanPhoto);
globalScanElements.file?.addEventListener("change", () => identifyPlayerFromPhoto(globalScanElements.file));
globalScanElements.review?.addEventListener("click", reviewGlobalScanInAddCard);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !globalScanElements.drawer?.classList.contains("hidden")) closeGlobalScanner();
});
playerScanElements.match?.addEventListener("change", () => {
  const match = playerScanMatches.find((entry) => entry.id === playerScanElements.match.value);
  renderPlayerScanIdentity(match?.identity || playerScanIdentity || {});
  if (!globalScanElements.result?.classList.contains("hidden")) renderGlobalScanResult(playerScanIdentity, globalScanElements.preview?.src || pendingScannedCardImage);
  updateBeginnerEntryGuide();
});
playerScanElements.apply?.addEventListener("click", applyPlayerScanMatch);
form.addEventListener("input", () => queueMicrotask(updateBeginnerEntryGuide));
form.addEventListener("change", () => queueMicrotask(updateBeginnerEntryGuide));
scanElements.deviceSelect?.addEventListener("change", () => {
  if (scanStream) startScanCamera();
});
function updateCollectionViewer({ expanded = collectionExpanded, mode = viewMode, scroll = false } = {}) {
  collectionExpanded = Boolean(expanded);
  viewMode = mode === "table" ? "table" : "grid";
  render();
  if (scroll && collectionExpanded) {
    requestAnimationFrame(() => els.collectionInventory?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }
}

els.toggleCollectionContent.addEventListener("click", () => updateCollectionViewer({ expanded: !collectionExpanded, scroll: !collectionExpanded }));
els.quickToggleCollection?.addEventListener("click", () => updateCollectionViewer({ expanded: !collectionExpanded, scroll: !collectionExpanded }));
els.quickGridView?.addEventListener("click", () => updateCollectionViewer({ expanded: true, mode: "grid", scroll: true }));
els.quickTableView?.addEventListener("click", () => updateCollectionViewer({ expanded: true, mode: "table", scroll: true }));
els.refreshCollectionPsa?.addEventListener("click", refreshCollectionPsaPopulation);
els.importBulkCards.addEventListener("click", async () => {
  if (!requireMember("bulk import cards")) return;
  let importedCards = buildCardsFromFixedFormat(bulkCardFields.input.value);
  if (!importedCards.length) {
    els.bulkCardStatus.textContent = "No valid lines found";
    return;
  }
  importedCards = await Promise.all(importedCards.map(async (card) => attachCardImage(await attachPsaPopulation(card))));
  cards = [...importedCards, ...cards];
  saveCards();
  importedCards.forEach(syncGoalSlotsFromCard);
  bulkCardFields.input.value = "";
  els.bulkCardStatus.textContent = `${importedCards.length} card${importedCards.length === 1 ? "" : "s"} imported`;
  render();
});
els.clearBulkCards.addEventListener("click", () => {
  bulkCardFields.input.value = "";
  els.bulkCardStatus.textContent = "";
});
els.connectButtons.forEach((button) => {
  button.addEventListener("click", () => connectProvider(button.dataset.connectProvider));
});
els.disconnectButtons.forEach((button) => {
  button.addEventListener("click", () => disconnectProvider(button.dataset.disconnectProvider));
});
els.searchMarketplaces?.addEventListener("click", searchMarketplaceListings);
els.marketplaceSearchQuery?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") { event.preventDefault(); searchMarketplaceListings(); }
});
els.searchPsaPopulation?.addEventListener("click", searchPsaPopulationBrowser);
els.psaPopulationQuery?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") { event.preventDefault(); searchPsaPopulationBrowser(); }
});
els.lookupPsaCard?.addEventListener("click", () => lookupPsaCardPopulation());
fields.certification?.addEventListener("change", () => lookupPsaCardPopulation());
fields.grade?.addEventListener("input", () => {
  if (!isPsaGrade(fields.grade.value)) pendingPsaPopulation = null;
  renderPsaCardLookup();
});
els.saveImageSettings?.addEventListener("click", () => {
  imageSettings = {
    endpoint: text(els.imageApiEndpoint.value),
    auto: Boolean(els.autoImageLookup.checked)
  };
  saveImageSettings();
  els.imageLookupStatus.textContent = imageSettings.endpoint ? "Image lookup settings saved" : "Image lookup disabled until an endpoint is added";
});
els.saveAuctionSettings?.addEventListener("click", () => {
  auctionSettings = {
    ...auctionSettings,
    endpoint: text(els.auctionApiEndpoint.value),
    minValue: numeric(els.auctionMinValue.value) || 10000
  };
  saveAuctionSettings();
  renderConnectedAccounts();
  if (els.auctionLookupStatus) {
    els.auctionLookupStatus.textContent = auctionSettings.endpoint
      ? "Premium auction settings saved. Refreshing high-value comps..."
      : "Premium auction lookup disabled until an endpoint is added.";
  }
  if (auctionSettings.endpoint) refreshPremiumAuctionComps();
});
els.saveSupabaseSettings?.addEventListener("click", () => {
  supabaseSettings = {
    ...supabaseSettings,
    url: text(els.supabaseUrl.value),
    anonKey: text(els.supabaseAnonKey.value)
  };
  saveSupabaseSettings();
  renderAccount();
});
els.applyPeriod?.addEventListener("click", () => {
  periodSettings = {
    start: text(els.periodStart.value),
    end: text(els.periodEnd.value)
  };
  if (periodSettings.start && periodSettings.end && periodSettings.start > periodSettings.end) {
    [periodSettings.start, periodSettings.end] = [periodSettings.end, periodSettings.start];
  }
  savePeriodSettings();
  renderPortfolioIQ();
});
els.clearPeriod?.addEventListener("click", () => {
  periodSettings = { start: "", end: "" };
  savePeriodSettings();
  renderPortfolioIQ();
});
els.importPurchases?.addEventListener("click", importConnectedPurchases);
els.fillPurchaseSample?.addEventListener("click", () => {
  purchaseSyncFields.input.value = [
    "2023-24 | Panini Prizm | Victor Wembanyama | Rookie | Base | 136 | Basketball | Raw |  | 1 | 350 | 419 | eBay | EBAY-20260709-001 | 2026-07-09 | Box A | Buyer purchase import",
    "2018-19 | Panini Donruss Optic | Jalen Brunson | Base | Mojo Red /88 | 179 | Basketball | Raw |  | 1 | 0 | 3173 | CardHobby | CH-20260709-002 | 2026-07-09 | Box A | Buyer purchase import"
  ].join("\n");
  els.purchaseSyncStatus.textContent = "Sample rows ready";
});
els.clearPurchaseImport?.addEventListener("click", () => {
  purchaseSyncFields.input.value = "";
  els.purchaseSyncStatus.textContent = "";
});
photoImportFields.file?.addEventListener("change", () => handlePhotoImportImage("front", photoImportFields.file, photoImportFields.preview));
photoImportFields.backFile?.addEventListener("change", () => handlePhotoImportImage("back", photoImportFields.backFile, photoImportFields.backPreview));
photoImportFields.line?.addEventListener("input", schedulePhotoImportPopulationLookup);
photoImportFields.refreshPopulation?.addEventListener("click", () => lookupPhotoImportPopulation({ force: true }));
els.photoImportSample?.addEventListener("click", () => {
  photoImportFields.line.value = "2023-24 | Panini | Prizm | Victor Wembanyama | Rookie | Base | 136 | Basketball | Raw | | 1 | 350 | 419 | Photo box | Photo import sample";
  els.photoImportStatus.textContent = photoImportImages.front
    ? conditionLocale("Sample identity ready. Automatic population lookup is updating.", "示例卡片信息已填写，正在自动更新 POP。")
    : conditionLocale("Sample identity ready. Add a front photo for automatic checking.", "示例卡片信息已填写，请添加正面照片进行自动检测。 ");
  schedulePhotoImportPopulationLookup();
});
els.insertPhotoCard?.addEventListener("click", insertPhotoImportedCard);
els.clearPhotoImport?.addEventListener("click", clearPhotoImport);
els.goalAssistantList?.addEventListener("change", (event) => {
  const key = event.target.dataset.assistantStatus || event.target.dataset.assistantTarget;
  if (!key) return;
  if (!requireMember("update missing-card alerts")) {
    renderGoalAssistant();
    return;
  }
  goalAssistant[key] = {
    ...(goalAssistant[key] || {}),
    status: document.querySelector(`[data-assistant-status="${CSS.escape(key)}"]`)?.value || "watching",
    target: numeric(document.querySelector(`[data-assistant-target="${CSS.escape(key)}"]`)?.value)
  };
  saveGoalAssistant();
});
els.goalAssistantList?.addEventListener("click", (event) => {
  if (event.target.dataset.action !== "assistant-mark-have") return;
  toggleGoalSlot(event.target.dataset.goalId, event.target.dataset.slotId);
  render();
});
dealRoomForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!requireMember("create private deal rooms")) return;
  dealRooms.unshift(buildDealRoomFromForm());
  saveDealRooms();
  dealRoomForm.reset();
  renderDealRooms();
});
els.clearDealRoom?.addEventListener("click", () => dealRoomForm?.reset());
els.dealRoomList?.addEventListener("click", (event) => {
  const id = event.target.dataset.deleteDealRoom;
  if (!id) return;
  if (!requireMember("delete private deals")) return;
  dealRooms = dealRooms.filter((deal) => deal.id !== id);
  saveDealRooms();
  renderDealRooms();
});
els.search.addEventListener("input", () => {
  window.CardLedgerAdvanced?.resetCollectionPage?.();
  render();
});
els.globalSearch?.addEventListener("input", renderGlobalSearch);
els.globalSearch?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    openGlobalSearchResult(currentGlobalSearchResults[0]);
  }
  if (event.key === "Escape") {
    els.globalSearch.value = "";
    renderGlobalSearch();
  }
});
els.clearGlobalSearch?.addEventListener("click", () => {
  els.globalSearch.value = "";
  renderGlobalSearch();
  els.globalSearch.focus();
});
els.globalSearchResults?.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-global-result]");
  if (!trigger) return;
  openGlobalSearchResult(currentGlobalSearchResults[Number(trigger.dataset.globalResult)]);
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".global-search")) {
    els.globalSearchResults?.classList.add("hidden");
  }
});
els.sportFilter.addEventListener("change", () => { window.CardLedgerAdvanced?.resetCollectionPage?.(); render(); });
els.sortBy.addEventListener("change", () => { window.CardLedgerAdvanced?.resetCollectionPage?.(); render(); });
els.collectionQuickFilters?.forEach((button) => button.addEventListener("click", () => {
  collectionQuickFilter = button.dataset.collectionFilter || "all";
  collectionExpanded = true;
  window.CardLedgerAdvanced?.resetCollectionPage?.();
  render();
}));
els.collectionAddCard?.addEventListener("click", () => {
  setFocusWorkspaceView("collection", "add", { scroll: false });
  document.querySelector("#entryArea")?.scrollIntoView({ behavior: "smooth", block: "start" });
});
els.collectionReviewIssues?.addEventListener("click", () => {
  collectionQuickFilter = "review";
  collectionExpanded = true;
  window.CardLedgerAdvanced?.resetCollectionPage?.();
  render();
  document.querySelector(".collection-heading")?.scrollIntoView({ behavior: "smooth", block: "start" });
});
els.sidebarToggle?.addEventListener("click", () => {
  setSidebarExpanded(!els.sidebar?.classList.contains("expanded"));
});
els.sidebar?.addEventListener("mouseenter", () => {
  if (activePage !== "landing") setSidebarExpanded(true);
});
els.sidebar?.addEventListener("mouseleave", () => {
  setSidebarExpanded(false);
});
document.querySelectorAll("[data-action='show-landing-auth']").forEach((button) => {
  button.addEventListener("click", showLandingAuth);
});
document.querySelectorAll("[data-action='show-membership']").forEach((button) => {
  button.addEventListener("click", () => {
    if (isMember()) openMembershipPanel();
    else showLandingAuth();
  });
});
document.querySelectorAll("[data-select-plan]").forEach((button) => {
  button.addEventListener("click", () => selectSubscriptionPlan(button.dataset.selectPlan));
});
document.querySelector("#selectRegularPlan")?.addEventListener("click", () => selectSubscriptionPlan("regular"));
document.querySelectorAll("[data-action='download-app']").forEach((button) => {
  button.addEventListener("click", handleAppDownload);
});
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  render();
});
window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  render();
});
els.installAppButton?.addEventListener("click", handleAppDownload);
els.accountSettingsMount?.append(els.accountSettingsPanel);
const workspaceRoot = document.querySelector("#workspace");
if (workspaceRoot && els.directory && els.directory.parentElement !== document.body) workspaceRoot.before(els.directory);
els.accountMenu?.querySelector("summary")?.addEventListener("click", (event) => {
  event.preventDefault();
  els.accountMenu.open = false;
  setActivePage("account");
  document.querySelector("#accountArea")?.scrollIntoView({ behavior: "smooth", block: "start" });
});
document.querySelectorAll("[data-account-target]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(`#${button.dataset.accountTarget}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});
els.marketViewButtons?.forEach((button) => button.addEventListener("click", () => setMarketWorkspaceView(button.dataset.marketView)));
els.focusViewButtons?.forEach((button) => button.addEventListener("click", () => setFocusWorkspaceView(button.dataset.focusPage, button.dataset.focusView)));
els.toggleMarketContext?.addEventListener("click", toggleMarketContext);
els.marketNotesDrawer?.addEventListener("toggle", () => {
  if (marketWorkspace.contextExpanded === els.marketNotesDrawer.open) return;
  marketWorkspace.contextExpanded = els.marketNotesDrawer.open;
  saveMarketWorkspace();
  applyMarketWorkspaceView();
});
els.pageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.memberRequired === "true" && !isMember()) {
      setActivePage("landing");
      showLandingAuth();
      return;
    }
    setActivePage(button.dataset.pageButton);
    scrollActivePageIntoView(activePage);
  });
});
window.addEventListener("hashchange", () => {
  setActivePage(pageFromHash());
  scrollActivePageIntoView(activePage);
});
document.querySelectorAll("[data-profile-jump]").forEach((button) => {
  button.addEventListener("click", () => {
    setActivePage("collection");
    setFocusWorkspaceView("collection", "people", { scroll: false });
    els.accountMenu.open = false;
    document.querySelector("#collectorsArea").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
els.privacySelect.addEventListener("change", () => {
  if (!requireMember("change collection privacy")) {
    els.privacySelect.value = social.privacy;
    return;
  }
  social.privacy = els.privacySelect.value;
  saveSocial();
  render();
});

friendForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!requireMember("add friends and followers")) return;
  const friend = normalizeFriend({
    email: friendFields.email.value,
    name: friendFields.name.value || friendFields.email.value,
    following: true,
    friend: true
  });
  if (!friend.email) return;
  social.friends = [friend, ...social.friends.filter((item) => item.email !== friend.email)];
  saveSocial();
  friendForm.reset();
  render();
});

els.friendList.addEventListener("click", (event) => {
  if (!requireMember("manage friends")) return;
  const action = event.target.dataset.action;
  const email = event.target.dataset.email;
  if (!action || !email) return;
  if (action === "remove-friend") {
    social.friends = social.friends.filter((friend) => friend.email !== email);
  }
  if (action === "toggle-friend") {
    social.friends = social.friends.map((friend) => (friend.email === email ? { ...friend, friend: !friend.friend } : friend));
  }
  saveSocial();
  render();
});

els.publicCollectors.addEventListener("click", (event) => {
  if (event.target.dataset.action === "purchase-request") {
    addPurchaseRequest(event.target.dataset.owner, event.target.dataset.card);
  }
  if (event.target.dataset.action === "view-profile") {
    selectedProfileId = event.target.dataset.owner;
    renderSocial();
    els.profileViewer.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

els.profileViewer.addEventListener("click", (event) => {
  if (event.target.dataset.action === "purchase-request") {
    addPurchaseRequest(event.target.dataset.owner, event.target.dataset.card);
  }
  if (event.target.dataset.action === "close-profile") {
    selectedProfileId = "";
    renderSocial();
  }
});

function findSocialPost(type, id) {
  const list = type === "trade" ? trades : communityPosts;
  let index = list.findIndex((post) => post.id === id);
  if (index >= 0) return { list, index };
  if (type !== "community") return null;
  const sample = communityDisplayPosts().find((post) => post.id === id);
  if (!sample) return null;
  list.unshift(normalizeSocialPost(sample));
  index = 0;
  return { list, index };
}

function saveSocialPost(type, list, index, post) {
  list[index] = post;
  if (type === "trade") {
    saveTrades();
    renderTrades();
  } else {
    saveCommunityPosts();
    renderCommunity();
  }
}

function updateSocialPost(type, id, action) {
  if (!requireMember(action === "want" ? "mark cards as wanted" : "like posts")) return;
  const match = findSocialPost(type, id);
  if (!match) return;
  const { list, index } = match;
  const post = normalizeSocialPost(list[index]);
  if (action === "like") post.likes += 1;
  if (action === "want") post.wants += 1;
  saveSocialPost(type, list, index, post);
}

function addSocialComment(type, id, value) {
  if (!requireMember("comment on posts")) return;
  const comment = text(value);
  if (!comment) return;
  const match = findSocialPost(type, id);
  if (!match) return;
  const { list, index } = match;
  const post = normalizeSocialPost(list[index]);
  post.comments.push({ author: account.name || "Collector", text: comment, createdAt: new Date().toISOString() });
  saveSocialPost(type, list, index, post);
}

function handlePostAction(event) {
  const { postAction, postType, postId } = event.target.dataset;
  if (!postAction || !postType || !postId) return;
  updateSocialPost(postType, postId, postAction);
}

els.communityFeed.addEventListener("click", handlePostAction);
els.tradeList.addEventListener("click", handlePostAction);

function handleCommentSubmit(event) {
  const form = event.target.closest(".post-comment-form");
  if (!form) return;
  event.preventDefault();
  const input = form.querySelector("input[name='comment']");
  addSocialComment(form.dataset.postType, form.dataset.postId, input?.value);
  if (input) input.value = "";
}

els.communityFeed.addEventListener("submit", handleCommentSubmit);
els.tradeList.addEventListener("submit", handleCommentSubmit);

els.communityFeed.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-action='view-community-profile']");
  if (!trigger) return;
  selectedProfileId = trigger.dataset.owner || "";
  renderProfileViewer(allViewableProfiles(), els.communityProfileViewer);
  els.communityProfileViewer.scrollIntoView({ behavior: "smooth", block: "start" });
});

els.communityProfileViewer.addEventListener("click", (event) => {
  if (event.target.dataset.action === "purchase-request") {
    addPurchaseRequest(event.target.dataset.owner, event.target.dataset.card);
  }
  if (event.target.dataset.action === "close-profile") {
    selectedProfileId = "";
    renderProfileViewer(allViewableProfiles(), els.communityProfileViewer);
  }
});

els.communityCollectors.addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-action='view-community-profile']");
  if (!trigger) return;
  selectedProfileId = trigger.dataset.owner || "";
  renderProfileViewer(allViewableProfiles(), els.communityProfileViewer);
  els.communityProfileViewer.scrollIntoView({ behavior: "smooth", block: "start" });
});

els.communityFeedSearch.addEventListener("input", renderCommunity);
els.communityFeedFilter.addEventListener("change", renderCommunity);
els.communityCollectorSearch.addEventListener("input", renderCommunityCollectors);
els.communityCollectorSort.addEventListener("change", renderCommunityCollectors);
els.communityTradeSearch.addEventListener("input", renderCommunityTradePosts);
els.communityTradeSort.addEventListener("change", renderCommunityTradePosts);

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!requireMember("start private chats")) return;
  const participants = text(chatFields.participants.value)
    .split(",")
    .map(text)
    .filter(Boolean);
  if (!participants.length || !text(chatFields.message.value)) {
    window.alert("Add participants and a message.");
    return;
  }
  chats.unshift({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    participants: [account.name || "Me", ...participants],
    messages: [{ author: account.name || "Me", text: text(chatFields.message.value), createdAt: new Date().toISOString() }]
  });
  saveChats();
  chatForm.reset();
  renderChats();
});

communityPostForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!requireMember("post in the community")) return;
  const selectedCard = cards.find((card) => card.id === communityFields.selectedCard.value);
  const lines = text(communityFields.cards.value)
    .split(/\n+/)
    .map(text)
    .filter((line) => parseFixedCardParts(line));
  if (!lines.length && !text(communityFields.note.value) && !communityFields.photo.files?.length) {
    window.alert("Add a post, photo, or optional card line.");
    return;
  }
  communityPosts.unshift({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    authorId: account.email || "local-collector",
    author: account.name || "Guest collector",
    avatar: text(account.avatar),
    intent: communityFields.intent.value,
    selectedCard: selectedCard
      ? { id: selectedCard.id, name: fixedCardName(selectedCard), value: estimatedCardValue(selectedCard) }
      : null,
    cards: lines,
    note: text(communityFields.note.value),
    image: await readImageFile(communityFields.photo),
    likes: 0,
    wants: 0,
    comments: []
  });
  saveCommunityPosts();
  communityPostForm.reset();
  renderCommunity();
});

els.clearCommunityPost.addEventListener("click", () => {
  communityPostForm.reset();
});

tradePostForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!requireMember("post trade listings")) return;
  if (!text(tradePostFields.cards.value) && !text(tradePostFields.note.value)) {
    window.alert("Add cards or a trade post description.");
    return;
  }
  trades.unshift(await buildTradePostFromForm());
  saveTrades();
  tradePostForm.reset();
  render();
});

els.clearTradePost.addEventListener("click", () => {
  tradePostForm.reset();
});

profileSettingsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!requireMember("save profile settings")) return;
  readImageFile(profileFields.photo).then((avatar) => {
    account = {
      ...account,
      avatar: avatar || account.avatar || "",
      description: text(profileFields.description.value),
      age: text(profileFields.age.value),
      location: text(profileFields.location.value)
    };
    saveAccount();
    profileSettingsForm.reset();
    syncCurrentProfileToSupabase("Profile settings saved to Supabase.");
    render();
  });
});

els.avatarPresetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!requireMember("choose an avatar")) return;
    account = {
      ...account,
      avatar: text(button.dataset.avatarPreset)
    };
    saveAccount();
    syncCurrentProfileToSupabase("Avatar saved to Supabase.");
    render();
  });
});

els.postMissingGoals.addEventListener("click", () => {
  if (!requireMember("post missing goals")) return;
  const missing = missingGoalSlots().slice(0, 50);
  if (!missing.length) {
    window.alert("No missing goal cards to post.");
    return;
  }
  communityFields.cards.value = missing.map(({ goal, slotId }) => fixedLineFromMissingGoal(goal, slotId)).join("\n");
  communityFields.note.value = "Posting missing cards from my collection goals.";
});

els.gridView.addEventListener("click", () => {
  updateCollectionViewer({ expanded: true, mode: "grid" });
});

els.tableView.addEventListener("click", () => {
  updateCollectionViewer({ expanded: true, mode: "table" });
});

function supabaseReady() {
  return /^https:\/\/.+\.supabase\.co$/i.test(text(supabaseSettings.url)) && text(supabaseSettings.anonKey).length > 20;
}

function supabaseAuthHeaders(accessToken = "") {
  const token = text(accessToken) || text(supabaseSettings.accessToken) || supabaseSettings.anonKey;
  return {
    apikey: supabaseSettings.anonKey,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
}

async function supabaseAuthRequest(path, body) {
  if (!supabaseReady()) throw new Error("Supabase is not configured.");
  const response = await fetch(`${supabaseSettings.url.replace(/\/$/, "")}/auth/v1/${path}`, {
    method: "POST",
    headers: supabaseAuthHeaders(supabaseSettings.anonKey),
    body: JSON.stringify(body)
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error_description || data.msg || data.message || `Supabase auth failed (${response.status})`);
  return data;
}

async function supabaseAuthUserRequest(path = "user", options = {}) {
  if (!supabaseReady()) throw new Error("Supabase is not configured.");
  const accessToken = text(options.accessToken || supabaseSettings.accessToken);
  if (!accessToken) throw new Error("A Supabase session is required.");
  const response = await fetch(`${supabaseSettings.url.replace(/\/$/, "")}/auth/v1/${path}`, {
    method: options.method || "GET",
    headers: supabaseAuthHeaders(accessToken),
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  const data = response.status === 204 ? {} : await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error_description || data.msg || data.message || `Supabase auth failed (${response.status})`);
  return data;
}

async function supabaseDataRequest(path, options = {}) {
  if (!supabaseReady()) throw new Error("Supabase is not configured.");
  const method = options.method || "GET";
  const response = await fetch(`${supabaseSettings.url.replace(/\/$/, "")}/rest/v1/${path}`, {
    method,
    headers: {
      ...supabaseAuthHeaders(options.accessToken),
      ...(options.headers || {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  if (response.status === 204) return null;
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.message || data?.hint || `Supabase data request failed (${response.status})`);
  return data;
}

async function marketDataRequest(action, payload = {}) {
  if (!supabaseReady()) throw new Error("Supabase is not configured.");
  if (!text(supabaseSettings.accessToken)) throw new Error("Sign in with Supabase to use marketplace and PSA data.");
  const response = await fetch(`${supabaseSettings.url.replace(/\/$/, "")}/functions/v1/market-data`, {
    method: "POST",
    headers: supabaseAuthHeaders(supabaseSettings.accessToken),
    body: JSON.stringify({ action, ...payload })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || `Market data request failed (${response.status}).`);
  return data;
}

function isPsaGrade(value) {
  return /\bpsa\b/i.test(text(value));
}

const LOCAL_PSA_POPULATION_INDEX = [
  { identityKey: "2013|panini prizm|stephen curry|176|", year: "2013", brand: "Panini", setName: "Panini Prizm", subject: "Stephen Curry", cardNumber: "176", variety: "", category: "Basketball Cards", grade: 9, gradeLabel: "MINT 9", populationAtGrade: 265, populationHigher: 498, sampleCertNumber: "67051452", sourceUrl: "https://www.psacard.com/cert/67051452/psa", fetchedAt: "2026-07-19T00:00:00Z" },
  { identityKey: "2020|panini prizm|stephen curry|159|gold shimmer", year: "2020", brand: "Panini", setName: "Panini Prizm", subject: "Stephen Curry", cardNumber: "159", variety: "Gold Shimmer", category: "Basketball Cards", grade: 9, gradeLabel: "MINT 9", populationAtGrade: 6, populationHigher: 2, sampleCertNumber: "63057541", sourceUrl: "https://www.psacard.com/cert/63057541/psa", fetchedAt: "2026-07-19T00:00:00Z" },
  { identityKey: "2023|panini prizm draft picks fireworks|stephen curry|16|fireworks-gold prizm", year: "2023", brand: "Panini", setName: "Panini Prizm Draft Picks Fireworks", subject: "Stephen Curry", cardNumber: "16", variety: "Fireworks-Gold Prizm", category: "Basketball Cards", grade: 8, gradeLabel: "NM-MT 8", populationAtGrade: 1, populationHigher: 5, sampleCertNumber: "85654664", sourceUrl: "https://www.psacard.com/cert/85654664/psa", fetchedAt: "2026-07-19T00:00:00Z" },
  { identityKey: "2024|panini prizm manga|stephen curry|4|", year: "2024", brand: "Panini", setName: "Panini Prizm Manga", subject: "Stephen Curry", cardNumber: "4", variety: "", category: "Basketball Cards", grade: 10, gradeLabel: "GEM MT 10", populationAtGrade: 24, populationHigher: 0, sampleCertNumber: "116385064", sourceUrl: "https://www.psacard.com/cert/116385064/psa", fetchedAt: "2026-07-19T00:00:00Z" },
  { identityKey: "2024|panini prizm black|stephen curry|7|blue shimmer fotl", year: "2024", brand: "Panini", setName: "Panini Prizm Black", subject: "Stephen Curry", cardNumber: "7", variety: "Blue Shimmer FOTL", category: "Basketball Cards", grade: 10, gradeLabel: "GEM MT 10", populationAtGrade: 17, populationHigher: 0, sampleCertNumber: "131586385", sourceUrl: "https://www.psacard.com/cert/131586385/psa", fetchedAt: "2026-07-19T00:00:00Z" }
];

function psaGradeNumber(value) {
  return numeric(text(value).match(/\d+(?:\.\d+)?/)?.[0]);
}

function psaIdentityQuery(card) {
  return [card.year, card.brand, card.setName, card.player, card.cardNumber, card.parallel].filter(Boolean).join(" ");
}

function normalizePsaPopulation(record) {
  if (!record || typeof record !== "object") return null;
  return {
    id: record.id,
    specId: Math.max(0, Math.trunc(numeric(record.psa_spec_id ?? record.specId))),
    identityKey: text(record.identity_key || record.identityKey),
    year: text(record.year),
    brand: text(record.brand),
    setName: text(record.set_name || record.setName),
    subject: text(record.subject || record.player),
    cardNumber: text(record.card_number || record.cardNumber),
    variety: text(record.variety),
    category: text(record.category),
    grade: numeric(record.grade),
    gradeLabel: text(record.grade_label || record.gradeLabel),
    populationAtGrade: Math.max(0, Math.trunc(numeric(record.population_at_grade ?? record.populationAtGrade))),
    populationHigher: Math.max(0, Math.trunc(numeric(record.population_higher ?? record.populationHigher))),
    populationTotal: record.population_total == null ? null : Math.max(0, Math.trunc(numeric(record.population_total))),
    sampleCertNumber: text(record.sample_cert_number || record.sampleCertNumber),
    sourceUrl: text(record.source_url || record.sourceUrl),
    fetchedAt: text(record.fetched_at || record.fetchedAt)
  };
}

function psaPopulationLabel(population) {
  if (!population) return "";
  const grade = population.gradeLabel || `PSA ${population.grade}`;
  return `${grade} · POP ${population.populationAtGrade.toLocaleString()} · ${population.populationHigher.toLocaleString()} higher`;
}

function psaPopulationBadgeMarkup(card) {
  if (!isPsaGrade(card.grade)) return "";
  const population = normalizePsaPopulation(card.psaPopulation);
  if (!population) {
    return `<button class="psa-pop-badge psa-pop-pending" type="button" data-refresh-psa-pop="${escapeHtml(card.id)}"><span>PSA</span><strong>Check population</strong></button>`;
  }
  const grade = population.gradeLabel || `PSA ${population.grade}`;
  const updated = population.fetchedAt ? new Date(population.fetchedAt).toLocaleDateString() : "PSA API";
  return `<span class="psa-pop-badge" title="Updated ${escapeHtml(updated)}">
    <span>${escapeHtml(grade)}</span><strong>POP ${population.populationAtGrade.toLocaleString()}</strong><small>${population.populationHigher.toLocaleString()} higher${population.populationTotal == null ? "" : ` · ${population.populationTotal.toLocaleString()} total`}</small>
  </span>`;
}

function psaPopulationMatchesCard(population, card) {
  if (!population) return false;
  const exactField = (left, right) => !text(right) || normalizedSalesIdentity(left) === normalizedSalesIdentity(right);
  const containsEveryToken = (left, right) => {
    const expected = normalizedSalesIdentity(right).split(" ").filter(Boolean);
    const actual = new Set(normalizedSalesIdentity(left).split(" ").filter(Boolean));
    return !expected.length || expected.every((token) => actual.has(token));
  };
  return exactField(population.year, card.year)
    && exactField(population.subject, card.player)
    && exactField(population.cardNumber, card.cardNumber)
    && containsEveryToken(population.brand || population.setName, card.brand)
    && containsEveryToken(population.setName, card.setName)
    && containsEveryToken(population.variety, card.parallel);
}

async function attachPsaPopulation(card, { force = false } = {}) {
  if (!isPsaGrade(card.grade) || !supabaseReady() || !text(supabaseSettings.accessToken)) return card;
  if (card.psaPopulation && !force) return card;
  try {
    const certNumber = text(card.certification).replace(/\D/g, "");
    let population = null;
    if (certNumber.length >= 7) {
      const data = await marketDataRequest("psa-cert", { certNumber });
      population = normalizePsaPopulation(data.record);
    } else {
      const records = await searchPsaPopulationRecords(psaIdentityQuery(card), 30);
      const grade = psaGradeNumber(card.grade);
      population = records.find((record) => psaPopulationMatchesCard(record, card) && (!grade || record.grade === grade)) || null;
    }
    return population ? { ...card, psaPopulation: population, updatedAt: new Date().toISOString() } : card;
  } catch {
    return card;
  }
}

async function refreshPsaPopulationForCard(cardId, trigger) {
  const index = cards.findIndex((card) => card.id === cardId);
  if (index < 0) return;
  const originalText = trigger?.textContent;
  if (trigger) { trigger.disabled = true; trigger.textContent = "Checking PSA..."; }
  const next = await attachPsaPopulation(cards[index], { force: true });
  if (next.psaPopulation) {
    cards[index] = next;
    saveCards();
    render();
    return;
  }
  if (trigger) {
    trigger.disabled = false;
    trigger.textContent = originalText || "Check population";
    trigger.title = text(cards[index].certification)
      ? "PSA did not return a population record. Check the certification number."
      : "Add the PSA certification number for an exact live lookup, or seed the shared population index.";
  }
}

async function refreshCollectionPsaPopulation() {
  if (!requireMember("refresh PSA population data")) return;
  const button = els.refreshCollectionPsa;
  const now = Date.now();
  const candidates = cards.filter((card) => {
    if (!isPsaGrade(card.grade)) return false;
    const fetchedAt = normalizePsaPopulation(card.psaPopulation)?.fetchedAt;
    const age = fetchedAt ? now - new Date(fetchedAt).getTime() : Infinity;
    return !fetchedAt || !Number.isFinite(age) || age > 7 * 86400000;
  }).slice(0, 20);
  if (!candidates.length) {
    if (button) button.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">verified</span>PSA Pop current';
    return;
  }
  if (button) button.disabled = true;
  let refreshed = 0;
  for (let index = 0; index < candidates.length; index += 1) {
    const card = candidates[index];
    if (button) button.textContent = `Checking ${index + 1}/${candidates.length}`;
    const before = normalizePsaPopulation(card.psaPopulation)?.fetchedAt || "";
    const next = await attachPsaPopulation(card, { force: true });
    const cardIndex = cards.findIndex((item) => item.id === card.id);
    if (cardIndex >= 0 && next.psaPopulation) {
      cards[cardIndex] = next;
      if ((normalizePsaPopulation(next.psaPopulation)?.fetchedAt || "") !== before) refreshed += 1;
    }
    if (index < candidates.length - 1) await new Promise((resolve) => window.setTimeout(resolve, 120));
  }
  saveCards();
  render();
  if (button) {
    button.disabled = false;
    button.innerHTML = `<span class="material-symbols-outlined" aria-hidden="true">verified</span>${refreshed} PSA Pop refreshed`;
  }
}

function psaPopulationMarkup(record) {
  const population = normalizePsaPopulation(record);
  if (!population) return "";
  return `
    <article class="psa-population-record">
      <div><span class="psa-source-mark">PSA</span><strong>${escapeHtml([population.year, population.setName, population.subject, population.cardNumber && `#${population.cardNumber}`, population.variety].filter(Boolean).join(" · "))}</strong></div>
      <dl><div><dt>Grade</dt><dd>${escapeHtml(population.gradeLabel || `PSA ${population.grade}`)}</dd></div><div><dt>Population</dt><dd>${population.populationAtGrade.toLocaleString()}</dd></div><div><dt>Higher</dt><dd>${population.populationHigher.toLocaleString()}</dd></div>${population.populationTotal == null ? "" : `<div><dt>All grades</dt><dd>${population.populationTotal.toLocaleString()}</dd></div>`}</dl>
      <footer><span>${population.fetchedAt ? `Updated ${escapeHtml(new Date(population.fetchedAt).toLocaleDateString())}` : "PSA public data"}</span>${population.sourceUrl ? `<a href="${escapeHtml(population.sourceUrl)}" target="_blank" rel="noreferrer">Verify at PSA</a>` : ""}</footer>
    </article>`;
}

function renderPsaCardLookup(message = "") {
  if (!els.psaCardLookupResult) return;
  const psa = isPsaGrade(fields.grade?.value);
  els.psaCardLookup?.classList.toggle("is-psa-card", psa);
  if (pendingPsaPopulation) {
    els.psaCardLookupResult.innerHTML = psaPopulationMarkup(pendingPsaPopulation);
    return;
  }
  els.psaCardLookupResult.textContent = message || (psa ? "Enter a PSA certification number or search by card details." : "Waiting for a PSA card.");
}

async function searchPsaPopulationRecords(query, limit = 25) {
  const queryTokens = normalizedSalesIdentity(query).split(" ").filter(Boolean);
  const localMatches = LOCAL_PSA_POPULATION_INDEX
    .map(normalizePsaPopulation)
    .filter(Boolean)
    .filter((record) => {
      const haystack = normalizedSalesIdentity([record.year, record.brand, record.setName, record.subject, record.cardNumber, record.variety].join(" "));
      return queryTokens.every((token) => haystack.includes(token));
    });
  if (!supabaseReady() || !text(supabaseSettings.accessToken)) return localMatches.slice(0, limit);
  try {
    const data = await marketDataRequest("psa-search", { query, limit });
    const cloudMatches = (Array.isArray(data.records) ? data.records : []).map(normalizePsaPopulation).filter(Boolean);
    return [...cloudMatches, ...localMatches]
      .filter((record, index, records) => index === records.findIndex((candidate) => candidate.identityKey === record.identityKey && candidate.grade === record.grade))
      .slice(0, limit);
  } catch (error) {
    if (localMatches.length) return localMatches.slice(0, limit);
    throw error;
  }
}

async function lookupPsaCardPopulation({ silent = false } = {}) {
  if (!isPsaGrade(fields.grade?.value)) {
    pendingPsaPopulation = null;
    renderPsaCardLookup();
    return null;
  }
  const certNumber = text(fields.certification?.value).replace(/\D/g, "");
  const formCard = {
    year: text(fields.year?.value), brand: text(fields.brand?.value), setName: text(fields.setName?.value),
    player: text(fields.player?.value), cardNumber: text(fields.cardNumber?.value), parallel: text(fields.parallel?.value)
  };
  if (!silent) renderPsaCardLookup(certNumber ? "Checking the official PSA cert API..." : "Searching the shared PSA population index...");
  try {
    if (certNumber.length >= 7) {
      const data = await marketDataRequest("psa-cert", { certNumber });
      pendingPsaPopulation = normalizePsaPopulation(data.record);
    } else {
      const records = await searchPsaPopulationRecords(psaIdentityQuery(formCard), 30);
      const grade = psaGradeNumber(fields.grade?.value);
      pendingPsaPopulation = records.find((record) => psaPopulationMatchesCard(record, formCard) && (!grade || record.grade === grade)) || null;
    }
    renderPsaCardLookup(pendingPsaPopulation ? "" : "No matching PSA population record was found.");
    return pendingPsaPopulation;
  } catch (error) {
    if (!silent) renderPsaCardLookup(error.message);
    return null;
  }
}

async function searchPsaPopulationBrowser() {
  const query = text(els.psaPopulationQuery?.value);
  if (!query) return;
  els.psaPopulationStatus.textContent = "Searching Supabase PSA population data...";
  els.psaPopulationResults.innerHTML = "";
  try {
    const records = await searchPsaPopulationRecords(query, 40);
    els.psaPopulationResults.innerHTML = records.map(psaPopulationMarkup).join("") || '<div class="trade-empty">No PSA population records matched this search.</div>';
    els.psaPopulationStatus.textContent = `${records.length} population record${records.length === 1 ? "" : "s"} found.`;
  } catch (error) {
    els.psaPopulationStatus.textContent = error.message;
  }
}

function marketplaceListingMarkup(item) {
  const provider = text(item.provider) === "cardhobby" ? "CardHobby" : "eBay";
  return `<article class="marketplace-listing-card">
    ${item.imageUrl ? `<img src="${escapeHtml(item.imageUrl)}" alt="" />` : '<span class="material-symbols-outlined listing-placeholder" aria-hidden="true">image</span>'}
    <div><span>${provider}</span><strong>${escapeHtml(item.title || "Untitled listing")}</strong><small>Active listing · not a sold comp${item.condition ? ` · ${escapeHtml(item.condition)}` : ""}</small></div>
    ${item.itemUrl ? `<a href="${escapeHtml(item.itemUrl)}" target="_blank" rel="noreferrer" aria-label="Open ${provider} listing"><span class="material-symbols-outlined" aria-hidden="true">open_in_new</span></a>` : ""}
  </article>`;
}

async function searchMarketplaceListings() {
  const query = text(els.marketplaceSearchQuery?.value);
  const provider = text(els.marketplaceSearchProvider?.value) || "ebay";
  if (!query) return;
  const actions = provider === "both" ? ["ebay-search", "cardhobby-search"] : [`${provider}-search`];
  els.marketplaceSearchStatus.textContent = "Searching connected active listings...";
  els.marketplaceSearchResults.innerHTML = "";
  const responses = await Promise.allSettled(actions.map((action) => marketDataRequest(action, { query, limit: 12 })));
  const items = responses.flatMap((result) => result.status === "fulfilled" && Array.isArray(result.value.items) ? result.value.items : []);
  const errors = responses.filter((result) => result.status === "rejected").map((result) => result.reason?.message).filter(Boolean);
  els.marketplaceSearchResults.innerHTML = items.map(marketplaceListingMarkup).join("") || '<div class="trade-empty">No active listings returned.</div>';
  els.marketplaceSearchStatus.textContent = [`${items.length} active listing${items.length === 1 ? "" : "s"}`, ...errors].join(" · ");
}

function scheduleSupabaseLedgerSync() {
  if (!ledgerCloudReady || ledgerCloudHydrating || !supabaseSettings.accessToken || !supabaseSettings.userId) return;
  window.clearTimeout(ledgerCloudSyncTimer);
  ledgerCloudSyncTimer = window.setTimeout(() => {
    syncLedgerToSupabase().catch((error) => {
      if (els.supabaseStatus) els.supabaseStatus.textContent = `Ledger sync failed: ${error.message}`;
    });
  }, 900);
}

function cardCloudRow(card) {
  return {
    user_id: supabaseSettings.userId,
    id: text(card.id),
    year: text(card.year),
    brand: text(card.brand),
    set_name: text(card.setName),
    player: text(card.player),
    card_type: text(card.type),
    parallel: text(card.parallel),
    card_number: text(card.cardNumber),
    sport: text(card.sport),
    condition: text(card.condition) || "Raw",
    grade: text(card.grade),
    certification: text(card.certification),
    psa_population: card.psaPopulation || null,
    quantity: Math.max(1, Math.trunc(numeric(card.quantity) || 1)),
    paid: Math.max(0, numeric(card.paid)),
    estimated_value: Math.max(0, numeric(card.value)),
    location: text(card.location),
    notes: text(card.notes),
    image_url: text(card.image) || null,
    portfolio_id: text(card.portfolioId) || "personal",
    revision: Math.max(1, Math.trunc(numeric(card.revision) || 1)),
    device_id: text(card.deviceId) || null,
    deleted_at: card.deletedAt || null,
    market_sales: Array.isArray(card.marketSales) ? card.marketSales : [],
    raw_payload: card,
    created_at: text(card.createdAt) || new Date().toISOString(),
    updated_at: text(card.updatedAt || card.createdAt) || new Date().toISOString()
  };
}

function tradeCloudRow(trade) {
  return {
    user_id: supabaseSettings.userId,
    id: text(trade.id),
    trade_date: text(trade.date) || null,
    counterparty: text(trade.counterparty),
    outgoing_summary: text(trade.outgoing),
    incoming_summary: text(trade.incoming),
    outgoing_value: numeric(trade.outgoingValue),
    incoming_value: numeric(trade.incomingValue),
    trade_net_value: numeric(trade.tradeNetValue),
    cash_paid: Math.max(0, numeric(trade.cashPaid)),
    cash_received: Math.max(0, numeric(trade.cashReceived)),
    outgoing_cards: Array.isArray(trade.outgoingCards) ? trade.outgoingCards : [],
    incoming_cards: Array.isArray(trade.incomingCards) ? trade.incomingCards : [],
    notes: text(trade.notes),
    comments: Array.isArray(trade.comments) ? trade.comments : [],
    likes: Math.max(0, Math.trunc(numeric(trade.likes))),
    wants: Math.max(0, Math.trunc(numeric(trade.wants))),
    raw_payload: trade,
    created_at: text(trade.createdAt) || new Date().toISOString(),
    updated_at: text(trade.updatedAt || trade.createdAt) || new Date().toISOString()
  };
}

function goalCloudRow(goal) {
  const optionalInteger = (value) => (text(value) === "" ? null : Math.trunc(numeric(value)));
  return {
    user_id: supabaseSettings.userId,
    id: text(goal.id),
    title: text(goal.title),
    goal_type: text(goal.type) || "year",
    player: text(goal.player),
    set_name: text(goal.setName),
    parallel: text(goal.parallel),
    season: text(goal.season),
    start_year: optionalInteger(goal.startYear),
    end_year: optionalInteger(goal.endYear),
    start_number: optionalInteger(goal.startNumber),
    end_number: optionalInteger(goal.endNumber),
    notes: text(goal.notes),
    slots: goal.slots && typeof goal.slots === "object" ? goal.slots : {},
    raw_payload: goal,
    created_at: text(goal.createdAt) || new Date().toISOString(),
    updated_at: text(goal.updatedAt || goal.createdAt) || new Date().toISOString()
  };
}

function postCloudRow(post) {
  return {
    user_id: supabaseSettings.userId,
    id: text(post.id),
    post_type: text(post.intent || post.type) || "showcase",
    body: text(post.body || post.text || post.description),
    card_id: text(post.cardId) || null,
    image_url: text(post.image) || null,
    likes: Math.max(0, Math.trunc(numeric(post.likes))),
    wants: Math.max(0, Math.trunc(numeric(post.wants))),
    comments: Array.isArray(post.comments) ? post.comments : [],
    raw_payload: post,
    created_at: text(post.createdAt) || new Date().toISOString(),
    updated_at: text(post.updatedAt || post.createdAt) || new Date().toISOString()
  };
}

function diyCardCloudRow(card) {
  return {
    user_id: supabaseSettings.userId,
    id: text(card.id),
    series: text(card.series),
    player_subject: text(card.player),
    parallel: text(card.parallel),
    card_number: text(card.cardNumber),
    print_run: numeric(card.printRun) > 0 ? Math.trunc(numeric(card.printRun)) : null,
    finish: text(card.finish),
    title: text(card.title),
    description: text(card.description),
    front_image_data: text(card.front) || null,
    back_image_data: text(card.back) || null,
    raw_payload: card,
    created_at: text(card.createdAt) || new Date().toISOString(),
    updated_at: text(card.updatedAt || card.createdAt) || new Date().toISOString()
  };
}

function diyListingCloudRow(listing) {
  return {
    user_id: supabaseSettings.userId,
    id: text(listing.id),
    card_id: text(listing.cardId),
    listing_type: ["showcase", "trade", "sale"].includes(listing.type) ? listing.type : "showcase",
    asking_price: Math.max(0, numeric(listing.price)),
    wanted: text(listing.wanted),
    note: text(listing.note),
    location: text(listing.location),
    archived: Boolean(listing.archived),
    raw_payload: listing,
    created_at: text(listing.createdAt) || new Date().toISOString(),
    updated_at: text(listing.updatedAt || listing.createdAt) || new Date().toISOString()
  };
}

function dealRoomCloudRow(room) {
  const status = ["open", "agreed", "completed", "cancelled"].includes(room.status) ? room.status : "open";
  return {
    user_id: supabaseSettings.userId,
    id: text(room.id),
    title: text(room.title || room.name),
    participants: Array.isArray(room.participants) ? room.participants : [],
    offered_cards: Array.isArray(room.offeredCards || room.offering) ? room.offeredCards || room.offering : [],
    requested_cards: Array.isArray(room.requestedCards || room.requesting) ? room.requestedCards || room.requesting : [],
    cash_adjustment: numeric(room.cashAdjustment || room.cash),
    messages: Array.isArray(room.messages) ? room.messages : [],
    status,
    raw_payload: room,
    created_at: text(room.createdAt) || new Date().toISOString(),
    updated_at: text(room.updatedAt || room.createdAt) || new Date().toISOString()
  };
}

async function syncSupabaseTable(table, rows) {
  const userId = encodeURIComponent(supabaseSettings.userId);
  if (rows.length) {
    try {
      await supabaseDataRequest(`${table}?on_conflict=user_id,id`, {
        method: "POST",
        accessToken: supabaseSettings.accessToken,
        headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
        body: rows
      });
    } catch (error) {
      if (table !== "cards") throw error;
      const legacyRows = rows.map(({ brand, portfolio_id, revision, device_id, deleted_at, certification, psa_population, ...row }) => row);
      await supabaseDataRequest(`${table}?on_conflict=user_id,id`, {
        method: "POST",
        accessToken: supabaseSettings.accessToken,
        headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
        body: legacyRows
      });
    }
  }
  const existing = await supabaseDataRequest(`${table}?user_id=eq.${userId}&select=id`, {
    accessToken: supabaseSettings.accessToken
  });
  const localIds = new Set(rows.map((row) => row.id));
  const staleIds = (Array.isArray(existing) ? existing : []).map((row) => text(row.id)).filter((id) => !localIds.has(id));
  if (table === "cards" && window.CardLedgerAdvanced) return;
  await Promise.all(
    staleIds.map((id) =>
      supabaseDataRequest(`${table}?user_id=eq.${userId}&id=eq.${encodeURIComponent(id)}`, {
        method: "DELETE",
        accessToken: supabaseSettings.accessToken
      })
    )
  );
}

async function syncLedgerToSupabase() {
  if (!ledgerCloudReady || ledgerCloudHydrating || !supabaseSettings.userId) return false;
  await Promise.all([
    syncSupabaseTable("cards", cards.map(cardCloudRow)),
    syncSupabaseTable("trade_deals", trades.map(tradeCloudRow)),
    syncSupabaseTable("collection_goals", goals.map(goalCloudRow)),
    syncSupabaseTable("community_posts", communityPosts.map(postCloudRow)),
    syncSupabaseTable("deal_rooms", dealRooms.map(dealRoomCloudRow))
  ]);
  let diyCloudSynced = true;
  try {
    await Promise.all([
      syncSupabaseTable("diy_cards", diyCards.filter(diyOwnsCard).map(diyCardCloudRow)),
      syncSupabaseTable("diy_listings", diyListings.filter(diyOwnsListing).map(diyListingCloudRow))
    ]);
  } catch {
    diyCloudSynced = false;
  }
  if (els.supabaseStatus) {
    els.supabaseStatus.textContent = diyCloudSynced
      ? "Profile, ledger, and DIY marketplace synced to Supabase."
      : "Profile and ledger synced. Run card-ledger-diy-marketplace.sql to enable online DIY publishing.";
  }
  return true;
}

async function loadPublicDIYMarketplace() {
  if (!supabaseReady()) return false;
  try {
    const accessToken = text(supabaseSettings.accessToken);
    const [cardRows, listingRows] = await Promise.all([
      supabaseDataRequest("diy_cards?select=id,raw_payload&order=created_at.desc&limit=300", { accessToken }),
      supabaseDataRequest("diy_listings?archived=eq.false&select=id,raw_payload&order=created_at.desc&limit=300", { accessToken })
    ]);
    const remoteCards = (Array.isArray(cardRows) ? cardRows : []).map((row) => row.raw_payload).filter(Boolean);
    const remoteListings = (Array.isArray(listingRows) ? listingRows : []).map((row) => row.raw_payload).filter(Boolean);
    const cardMap = new Map([...DIY_STARTER_CARDS, ...remoteCards, ...diyCards].map((card) => [card.id, card]));
    const listingMap = new Map([...DIY_STARTER_LISTINGS, ...remoteListings, ...diyListings].map((listing) => [listing.id, listing]));
    diyCards = [...cardMap.values()];
    diyListings = [...listingMap.values()];
    localStorage.setItem(DIY_CARD_STORAGE_KEY, JSON.stringify(diyCards));
    localStorage.setItem(DIY_LISTING_STORAGE_KEY, JSON.stringify(diyListings));
    renderDIYMarketplace();
    return true;
  } catch {
    return false;
  }
}

async function createDIYCloudRequest(listing, card) {
  const requesterId = text(supabaseSettings.userId);
  const ownerId = text(listing.ownerId);
  if (!supabaseReady() || !supabaseSettings.accessToken || !requesterId || !ownerId || ownerId === "card-ledger-studio") return false;
  const requestType = listing.type === "sale" ? "purchase" : listing.type === "trade" ? "trade" : "message";
  try {
    await supabaseDataRequest("diy_listing_requests", {
      method: "POST",
      accessToken: supabaseSettings.accessToken,
      headers: { Prefer: "return=minimal" },
      body: {
        id: crypto.randomUUID(),
        listing_user_id: ownerId,
        listing_id: listing.id,
        requester_id: requesterId,
        request_type: requestType,
        message: `Interested in DIY card: ${diyCardTitle(card)}`
      }
    });
    return true;
  } catch {
    return false;
  }
}

async function loadLedgerFromSupabase() {
  if (!supabaseSettings.userId || !supabaseSettings.accessToken) return false;
  const userId = encodeURIComponent(supabaseSettings.userId);
  const tableNames = ["cards", "trade_deals", "collection_goals", "community_posts", "deal_rooms"];
  const results = await Promise.all(
    tableNames.map((table) =>
      supabaseDataRequest(`${table}?user_id=eq.${userId}&select=id,raw_payload`, {
        accessToken: supabaseSettings.accessToken
      })
    )
  );
  const hasCloudLedger = results.some((rows) => Array.isArray(rows) && rows.length);
  ledgerCloudReady = true;
  if (!hasCloudLedger) {
    await syncLedgerToSupabase();
    return true;
  }
  ledgerCloudHydrating = true;
  try {
    const cloudCards = (results[0] || []).map((row) => row.raw_payload).filter(Boolean);
    cards = window.CardLedgerAdvanced?.mergeCloudCards?.(cards, cloudCards) || cloudCards;
    trades = (results[1] || []).map((row) => row.raw_payload).filter(Boolean);
    goals = (results[2] || []).map((row) => row.raw_payload).filter(Boolean);
    communityPosts = (results[3] || []).map((row) => row.raw_payload).filter(Boolean);
    dealRooms = (results[4] || []).map((row) => row.raw_payload).filter(Boolean);
    saveCards();
    saveTrades();
    saveGoals();
    saveCommunityPosts();
    saveDealRooms();
    syncAllGoalSlotsFromCards();
  } finally {
    ledgerCloudHydrating = false;
  }
  return true;
}

function applyProfileRow(row, fallbackName, fallbackEmail) {
  if (!row || typeof row !== "object") return;
  const email = text(row.email || fallbackEmail || account.email).toLowerCase();
  account = {
    ...account,
    name: text(row.name || fallbackName || account.name || email || account.phone || "Collector"),
    email,
    role: row.role === "admin" || email === ADMIN_USER.email ? "admin" : "collector",
    avatar: text(row.avatar || account.avatar),
    description: text(row.description || account.description),
    age: text(row.age || account.age),
    location: text(row.location || account.location)
  };
}

function currentProfilePayload(overrides = {}) {
  const email = text(overrides.email || account.email).toLowerCase();
  return {
    id: text(overrides.id || supabaseSettings.userId),
    email: email || null,
    name: text(overrides.name || account.name || overrides.email || account.email || account.phone || "Collector"),
    avatar: text(overrides.avatar ?? account.avatar),
    description: text(overrides.description ?? account.description),
    age: text(overrides.age ?? account.age),
    location: text(overrides.location ?? account.location)
  };
}

async function upsertSupabaseProfile(overrides = {}, accessToken = "") {
  const payload = currentProfilePayload(overrides);
  if (!payload.id || !payload.name || !supabaseReady()) return null;
  const rows = await supabaseDataRequest("profiles?on_conflict=id&select=*", {
    method: "POST",
    accessToken,
    headers: { Prefer: "resolution=merge-duplicates,return=representation" },
    body: payload
  });
  const row = Array.isArray(rows) ? rows[0] : rows;
  if (row) {
    applyProfileRow(row, payload.name, payload.email);
    saveAccount();
  }
  return row;
}

async function loadSupabaseProfile(userId, accessToken = "", fallbackName = "", fallbackEmail = "") {
  if (!userId || !supabaseReady()) return null;
  const rows = await supabaseDataRequest(`profiles?id=eq.${encodeURIComponent(userId)}&select=*`, { accessToken });
  const row = Array.isArray(rows) ? rows[0] : rows;
  if (row) {
    applyProfileRow(row, fallbackName, fallbackEmail);
    saveAccount();
  }
  return row;
}

async function syncCurrentProfileToSupabase(statusMessage = "Profile synced to Supabase.") {
  if (!supabaseReady() || !supabaseSettings.accessToken || !supabaseSettings.userId) return false;
  try {
    await upsertSupabaseProfile({}, supabaseSettings.accessToken);
    if (els.supabaseStatus) els.supabaseStatus.textContent = statusMessage;
    return true;
  } catch (error) {
    if (els.supabaseStatus) els.supabaseStatus.textContent = `Profile sync failed: ${error.message}`;
    return false;
  }
}

async function applySupabaseSession(data, fallbackName, fallbackEmail) {
  const user = data.user || {};
  const email = text(user.email || fallbackEmail).toLowerCase();
  const phone = text(user.phone || account.phone);
  const metadata = user.user_metadata || {};
  const name = text(metadata.name || metadata.full_name || metadata.nickname || metadata.preferred_username || fallbackName || email || (phone ? `Collector ${phone.slice(-4)}` : "Collector"));
  authUser = user;
  supabaseSettings = {
    ...supabaseSettings,
    accessToken: text(data.access_token) || text(supabaseSettings.accessToken),
    refreshToken: text(data.refresh_token) || text(supabaseSettings.refreshToken),
    userId: text(user.id)
  };
  saveSupabaseSettings();
  account = {
    ...account,
    name,
    email,
    phone,
    authProviders: Array.from(authIdentityProviders()),
    role: email === ADMIN_USER.email ? "admin" : "collector"
  };
  saveAccount();
  activatePendingSubscription();
  if (supabaseSettings.accessToken && supabaseSettings.userId) {
    await upsertSupabaseProfile({ id: supabaseSettings.userId, email: email || null, name }, supabaseSettings.accessToken);
    await loadSupabaseProfile(supabaseSettings.userId, supabaseSettings.accessToken, name, email);
    await loadLedgerFromSupabase();
  }
  window.CardLedgerAdvanced?.afterSupabaseSession?.(data);
}

async function restoreSupabaseSession() {
  if (!supabaseReady() || !supabaseSettings.refreshToken) return false;
  try {
    const data = await supabaseAuthRequest("token?grant_type=refresh_token", { refresh_token: supabaseSettings.refreshToken });
    await applySupabaseSession(data, account.name, account.email);
    render();
    return true;
  } catch {
    supabaseSettings = { ...supabaseSettings, accessToken: "", refreshToken: "", userId: "" };
    saveSupabaseSettings();
    return false;
  }
}

async function loginWithEmail(emailValue, passwordValue) {
  const email = text(emailValue).toLowerCase();
  const password = String(passwordValue || "");
  if (supabaseReady()) {
    try {
      const data = await supabaseAuthRequest("token?grant_type=password", { email, password });
      await applySupabaseSession(data, "", email);
      if (els.supabaseStatus) els.supabaseStatus.textContent = "Signed in with Supabase.";
      render();
      setActivePage("portfolio");
      return true;
    } catch (error) {
      window.alert(`Supabase login failed: ${error.message}`);
      return false;
    }
  }
  const user = loadUsers().find((item) => item.email === email && item.password === password);
  if (!user) {
    window.alert("Email or password is incorrect.");
    return false;
  }
  account = {
    name: user.name,
    email: user.email,
    role: user.role
  };
  saveAccount();
  activatePendingSubscription();
  render();
  setActivePage("portfolio");
  return true;
}

async function signupWithEmail(nameValue, emailValue, passwordValue) {
  const email = text(emailValue).toLowerCase();
  const password = String(passwordValue || "");
  if (!email || !password) return false;
  if (supabaseReady()) {
    try {
      const data = await supabaseAuthRequest("signup", { email, password, data: { name: text(nameValue) || email } });
      const hasSession = Boolean(data.session || data.access_token);
      if (hasSession) await applySupabaseSession(data, text(nameValue), email);
      if (els.supabaseStatus) {
        els.supabaseStatus.textContent = hasSession
          ? "Account and profile stored in Supabase."
          : "Supabase account created. Profile row is created by the database trigger; confirm email if required.";
      }
      if (hasSession) {
        render();
        setActivePage("portfolio");
      } else {
        window.alert("Account created and profile saved. Check your email to confirm the account, then log in.");
      }
      return true;
    } catch (error) {
      window.alert(`Supabase signup failed: ${error.message}`);
      return false;
    }
  }
  const users = loadUsers();
  if (users.some((user) => user.email === email)) {
    window.alert("An account with this email already exists.");
    return false;
  }
  const user = {
    name: text(nameValue) || email,
    email,
    password,
    role: "collector"
  };
  users.push(user);
  saveUsers(users);
  account = { name: user.name, email: user.email, role: user.role };
  saveAccount();
  activatePendingSubscription();
  render();
  setActivePage("portfolio");
  return true;
}

function localizedAuthCopy(english, chinese) {
  return currentLanguage === "zh-CN" ? chinese : english;
}

function normalizePhoneNumber(value) {
  const raw = text(value).replace(/[\s()-]/g, "");
  if (/^1\d{10}$/.test(raw)) return `+86${raw}`;
  if (/^\+\d{8,15}$/.test(raw)) return raw;
  throw new Error(localizedAuthCopy("Enter a valid international phone number, such as +86 138 0000 0000.", "请输入有效的国际格式手机号码，例如 +86 138 0000 0000。"));
}

function setAuthMode(scopeName, mode) {
  const scope = mode === "phone" ? "phone" : "email";
  const tabGroup = document.querySelector(`[data-auth-scope="${scopeName}"]`);
  tabGroup?.querySelectorAll("[data-auth-mode]").forEach((button) => button.classList.toggle("active", button.dataset.authMode === scope));
  document.querySelectorAll(`[data-email-auth="${scopeName}"]`).forEach((pane) => pane.classList.toggle("hidden", scope !== "email"));
  document.querySelectorAll(`[data-phone-auth="${scopeName}"]`).forEach((pane) => pane.classList.toggle("hidden", scope !== "phone"));
  if (scope === "phone") phoneAuthScopes[scopeName]?.phone?.focus();
}

function setPhoneAuthStatus(scope, message, isError = false) {
  const status = scope?.form?.querySelector(".phone-auth-status");
  if (!status) return;
  status.textContent = message;
  status.classList.toggle("error", isError);
}

function revealPhoneCode(scope, revealed = true) {
  scope?.form?.querySelector(".phone-code-field")?.classList.toggle("hidden", !revealed);
  scope?.form?.querySelector(".phone-verify-button")?.classList.toggle("hidden", !revealed);
  if (revealed) scope?.code?.focus();
}

async function sendPhoneOtpForScope(scopeName) {
  const scope = phoneAuthScopes[scopeName];
  if (!scope) return false;
  try {
    const phone = normalizePhoneNumber(scope.phone.value);
    scope.send.disabled = true;
    setPhoneAuthStatus(scope, localizedAuthCopy("Sending verification code...", "正在发送验证码……"));
    await supabaseAuthRequest("otp", {
      phone,
      create_user: true,
      data: { name: `Collector ${phone.slice(-4)}` }
    });
    scope.pendingPhone = phone;
    revealPhoneCode(scope, true);
    setPhoneAuthStatus(scope, localizedAuthCopy("Code sent. Check your phone.", "验证码已发送，请查看手机短信。"));
    return true;
  } catch (error) {
    setPhoneAuthStatus(scope, error.message, true);
    return false;
  } finally {
    scope.send.disabled = authProviderAvailability.phone === false;
  }
}

async function verifyPhoneOtpForScope(scopeName) {
  const scope = phoneAuthScopes[scopeName];
  if (!scope) return false;
  try {
    const phone = scope.pendingPhone || normalizePhoneNumber(scope.phone.value);
    const token = text(scope.code.value).replace(/\s/g, "");
    if (!/^\d{6,8}$/.test(token)) throw new Error(localizedAuthCopy("Enter the verification code from your SMS.", "请输入短信中的验证码。"));
    setPhoneAuthStatus(scope, localizedAuthCopy("Verifying...", "正在验证……"));
    const data = await supabaseAuthRequest("verify", { phone, token, type: "sms" });
    await applySupabaseSession(data, `Collector ${phone.slice(-4)}`, "");
    setPhoneAuthStatus(scope, localizedAuthCopy("Phone verified.", "手机号验证成功。"));
    scope.form.reset();
    scope.pendingPhone = "";
    revealPhoneCode(scope, false);
    render();
    setActivePage("portfolio");
    return true;
  } catch (error) {
    setPhoneAuthStatus(scope, error.message, true);
    return false;
  }
}

function authCallbackUrl() {
  const url = location.protocol === "file:"
    ? new URL("http://127.0.0.1:4180/index.html")
    : new URL(location.href);
  const language = new URLSearchParams(location.search).get("lang");
  url.hash = "";
  url.search = "";
  if (language) url.searchParams.set("lang", language);
  url.searchParams.set("auth_return", "1");
  return url.toString();
}

function cleanAuthCallbackUrl(page = "account") {
  const url = new URL(location.href);
  url.searchParams.delete("auth_return");
  url.searchParams.delete("error");
  url.searchParams.delete("error_code");
  url.searchParams.delete("error_description");
  url.hash = page === "portfolio" ? "#portfolioArea" : "#accountArea";
  history.replaceState({}, "", url);
}

function socialProviderId(provider) {
  return `custom:${text(provider).replace(/^custom:/, "").toLowerCase()}`;
}

async function loadAuthProviderAvailability() {
  if (!supabaseReady()) return authProviderAvailability;
  try {
    const response = await fetch(`${supabaseSettings.url.replace(/\/$/, "")}/auth/v1/settings`, {
      headers: { apikey: supabaseSettings.anonKey }
    });
    if (!response.ok) return authProviderAvailability;
    const settings = await response.json();
    const external = settings.external || {};
    const providerKeys = Object.keys(external).reduce((map, key) => {
      map[key.replace(/^custom:/, "").toLowerCase()] = Boolean(external[key]);
      return map;
    }, {});
    authProviderAvailability = {
      phone: Boolean(external.phone),
      wechat: Boolean(providerKeys.wechat),
      qq: Boolean(providerKeys.qq)
    };
    document.querySelectorAll('[data-auth-purpose="login"][data-auth-provider]').forEach((button) => {
      const provider = text(button.dataset.authProvider).toLowerCase();
      const unavailable = authProviderAvailability[provider] === false;
      button.disabled = unavailable;
      button.title = unavailable ? "Enable this custom OAuth provider in Supabase Authentication settings." : "";
    });
    Object.values(phoneAuthScopes).forEach((scope) => {
      if (scope.send) {
        scope.send.disabled = authProviderAvailability.phone === false;
        scope.send.title = authProviderAvailability.phone === false ? "Enable Phone authentication in Supabase." : "";
      }
      if (authProviderAvailability.phone === false) {
        setPhoneAuthStatus(scope, localizedAuthCopy("Phone login needs to be enabled in Supabase first.", "请先在 Supabase 中启用手机号登录。"));
      }
    });
    const missing = [
      authProviderAvailability.phone ? "" : localizedAuthCopy("Phone", "手机号"),
      authProviderAvailability.wechat ? "" : localizedAuthCopy("WeChat", "微信"),
      authProviderAvailability.qq ? "" : "QQ"
    ].filter(Boolean);
    if (els.socialAuthSetupNote && missing.length) {
      els.socialAuthSetupNote.textContent = localizedAuthCopy(
        `Setup required in Supabase: ${missing.join(", ")}.`,
        `需在 Supabase 中完成配置：${missing.join("、")}。`
      );
    }
    renderLinkedAuthIdentities();
  } catch {
    // Keep controls available when provider settings cannot be inspected offline.
  }
  return authProviderAvailability;
}

async function startSocialAuth(provider, purpose = "login") {
  const providerName = text(provider).replace(/^custom:/, "").toLowerCase();
  if (!["wechat", "qq"].includes(providerName)) return false;
  if (!supabaseReady()) {
    window.alert(localizedAuthCopy("Save the Supabase project URL and publishable key before using social login.", "请先保存 Supabase 项目地址与公开密钥，再使用社交账号登录。"));
    return false;
  }
  if (purpose === "link" && !isMember()) {
    requireMember("connect a login method");
    return false;
  }
  const pending = { provider: providerName, purpose, startedAt: new Date().toISOString() };
  localStorage.setItem(SOCIAL_OAUTH_PENDING_KEY, JSON.stringify(pending));
  const providerId = socialProviderId(providerName);
  const redirectTo = authCallbackUrl();
  try {
    if (purpose === "link") {
      const path = `user/identities/authorize?provider=${encodeURIComponent(providerId)}&redirect_to=${encodeURIComponent(redirectTo)}&skip_http_redirect=true`;
      const data = await supabaseAuthUserRequest(path);
      if (!data.url) throw new Error(localizedAuthCopy("Supabase did not return a provider authorization URL.", "Supabase 未返回授权地址。"));
      location.assign(data.url);
      return true;
    }
    const authorizeUrl = `${supabaseSettings.url.replace(/\/$/, "")}/auth/v1/authorize?provider=${encodeURIComponent(providerId)}&redirect_to=${encodeURIComponent(redirectTo)}`;
    location.assign(authorizeUrl);
    return true;
  } catch (error) {
    localStorage.removeItem(SOCIAL_OAUTH_PENDING_KEY);
    const message = localizedAuthCopy(
      `${providerName === "wechat" ? "WeChat" : "QQ"} is not ready: ${error.message}. Enable the custom OAuth provider and manual identity linking in Supabase.`,
      `${providerName === "wechat" ? "微信" : "QQ"} 尚未配置完成：${error.message}。请在 Supabase 中启用自定义 OAuth 与手动身份绑定。`
    );
    if (els.socialAuthSetupNote) els.socialAuthSetupNote.textContent = message;
    window.alert(message);
    return false;
  }
}

async function refreshCurrentAuthUser({ rerender = true } = {}) {
  if (!supabaseSettings.accessToken) return null;
  const data = await supabaseAuthUserRequest("user");
  authUser = data.user || data;
  const email = text(authUser.email).toLowerCase();
  const phone = text(authUser.phone);
  const metadata = authUser.user_metadata || {};
  account = {
    ...account,
    name: text(account.name || metadata.name || metadata.full_name || metadata.nickname || email || (phone ? `Collector ${phone.slice(-4)}` : "Collector")),
    email,
    phone,
    authProviders: Array.from(authIdentityProviders()),
    role: email === ADMIN_USER.email ? "admin" : "collector"
  };
  saveAccount();
  if (rerender) render();
  return authUser;
}

async function handleSupabaseOAuthCallback() {
  const hashParams = new URLSearchParams(location.hash.replace(/^#/, ""));
  const queryParams = new URLSearchParams(location.search);
  const errorDescription = hashParams.get("error_description") || queryParams.get("error_description");
  const returned = queryParams.get("auth_return") === "1";
  if (errorDescription) {
    cleanAuthCallbackUrl("account");
    localStorage.removeItem(SOCIAL_OAUTH_PENDING_KEY);
    window.alert(decodeURIComponent(errorDescription.replace(/\+/g, " ")));
    return true;
  }
  const accessToken = hashParams.get("access_token");
  const refreshToken = hashParams.get("refresh_token");
  if (accessToken) {
    const userData = await supabaseAuthUserRequest("user", { accessToken });
    const user = userData.user || userData;
    await applySupabaseSession({
      access_token: accessToken,
      refresh_token: refreshToken || supabaseSettings.refreshToken,
      expires_in: numeric(hashParams.get("expires_in")),
      token_type: hashParams.get("token_type") || "bearer",
      user
    }, "", text(user.email));
    cleanAuthCallbackUrl("account");
    localStorage.removeItem(SOCIAL_OAUTH_PENDING_KEY);
    render();
    setActivePage("account");
    if (els.socialAuthSetupNote) els.socialAuthSetupNote.textContent = localizedAuthCopy("Login method connected and ready.", "登录方式已绑定并可使用。" );
    return true;
  }
  if (returned) {
    const restored = await restoreSupabaseSession();
    if (restored) {
      await refreshCurrentAuthUser({ rerender: false });
      cleanAuthCallbackUrl("account");
      localStorage.removeItem(SOCIAL_OAUTH_PENDING_KEY);
      render();
      setActivePage("account");
      if (els.socialAuthSetupNote) els.socialAuthSetupNote.textContent = localizedAuthCopy("Login methods refreshed after authorization.", "授权完成，登录方式已刷新。" );
    }
    return true;
  }
  return false;
}

async function initializeAuthentication() {
  try {
    await loadAuthProviderAvailability();
    const handled = await handleSupabaseOAuthCallback();
    if (!handled) {
      const restored = await restoreSupabaseSession();
      if (restored) await refreshCurrentAuthUser({ rerender: false });
      render();
    }
  } catch (error) {
    if (els.supabaseStatus) els.supabaseStatus.textContent = `Authentication error: ${error.message}`;
    render();
  }
}

async function sendLinkPhoneOtp() {
  try {
    const phone = normalizePhoneNumber(linkPhoneFields.phone.value);
    linkPhoneFields.send.disabled = true;
    linkPhoneFields.status.textContent = localizedAuthCopy("Sending verification code...", "正在发送验证码……");
    const data = await supabaseAuthUserRequest("user", { method: "PUT", body: { phone } });
    authUser = data.user || authUser;
    linkPhoneForm.dataset.pendingPhone = phone;
    linkPhoneForm.querySelector(".link-phone-code-field")?.classList.remove("hidden");
    linkPhoneForm.querySelector(".link-phone-verify-button")?.classList.remove("hidden");
    linkPhoneFields.status.textContent = localizedAuthCopy("Code sent. Check your phone.", "验证码已发送，请查看手机短信。" );
    linkPhoneFields.code.focus();
    return true;
  } catch (error) {
    linkPhoneFields.status.textContent = error.message;
    return false;
  } finally {
    linkPhoneFields.send.disabled = false;
  }
}

async function verifyLinkedPhone() {
  try {
    const phone = linkPhoneForm.dataset.pendingPhone || normalizePhoneNumber(linkPhoneFields.phone.value);
    const token = text(linkPhoneFields.code.value).replace(/\s/g, "");
    if (!/^\d{6,8}$/.test(token)) throw new Error(localizedAuthCopy("Enter the verification code from your SMS.", "请输入短信中的验证码。"));
    linkPhoneFields.status.textContent = localizedAuthCopy("Verifying...", "正在验证……");
    const data = await supabaseAuthRequest("verify", { phone, token, type: "phone_change" });
    if (data.access_token) await applySupabaseSession(data, account.name, account.email);
    else await refreshCurrentAuthUser({ rerender: false });
    account = { ...account, phone, authProviders: Array.from(authIdentityProviders()) };
    saveAccount();
    linkPhoneFields.status.textContent = localizedAuthCopy("Phone connected.", "手机号已绑定。" );
    linkPhoneForm.reset();
    linkPhoneForm.dataset.pendingPhone = "";
    linkPhoneForm.querySelector(".link-phone-code-field")?.classList.add("hidden");
    linkPhoneForm.querySelector(".link-phone-verify-button")?.classList.add("hidden");
    render();
    return true;
  } catch (error) {
    linkPhoneFields.status.textContent = error.message;
    return false;
  }
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  loginWithEmail(loginFields.email.value, loginFields.password.value).then((ok) => {
    if (!ok) return;
    loginFields.password.value = "";
  });
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  signupWithEmail(signupFields.name.value, signupFields.email.value, signupFields.password.value).then((ok) => {
    if (!ok) return;
    signupForm.reset();
  });
});

landingLoginForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  loginWithEmail(landingLoginFields.email.value, landingLoginFields.password.value).then((ok) => {
    if (!ok) return;
    landingLoginFields.password.value = "";
  });
});

landingSignupForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  signupWithEmail(landingSignupFields.name.value, landingSignupFields.email.value, landingSignupFields.password.value).then((ok) => {
    if (!ok) return;
    landingSignupForm.reset();
  });
});

els.authMethodTabs.forEach((tabGroup) => {
  tabGroup.addEventListener("click", (event) => {
    const button = event.target.closest("[data-auth-mode]");
    if (!button) return;
    setAuthMode(tabGroup.dataset.authScope, button.dataset.authMode);
  });
});

Object.entries(phoneAuthScopes).forEach(([scopeName, scope]) => {
  scope.send?.addEventListener("click", () => sendPhoneOtpForScope(scopeName));
  scope.form?.addEventListener("submit", (event) => {
    event.preventDefault();
    verifyPhoneOtpForScope(scopeName);
  });
});

els.authProviderButtons.forEach((button) => {
  button.addEventListener("click", () => startSocialAuth(button.dataset.authProvider, button.dataset.authPurpose));
});

els.showLinkPhone?.addEventListener("click", () => {
  linkPhoneForm?.classList.toggle("hidden");
  if (!linkPhoneForm?.classList.contains("hidden")) linkPhoneFields.phone?.focus();
});

linkPhoneFields.send?.addEventListener("click", sendLinkPhoneOtp);
linkPhoneForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  verifyLinkedPhone();
});

els.refreshAuthIdentities?.addEventListener("click", async () => {
  try {
    els.refreshAuthIdentities.disabled = true;
    await refreshCurrentAuthUser();
    if (els.socialAuthSetupNote) els.socialAuthSetupNote.textContent = localizedAuthCopy("Login methods refreshed.", "登录方式已刷新。" );
  } catch (error) {
    if (els.socialAuthSetupNote) els.socialAuthSetupNote.textContent = error.message;
  } finally {
    els.refreshAuthIdentities.disabled = false;
  }
});

els.logoutButton.addEventListener("click", () => {
  account = { name: "", email: "", phone: "", role: "guest" };
  authUser = null;
  ledgerCloudReady = false;
  window.clearTimeout(ledgerCloudSyncTimer);
  supabaseSettings = { ...supabaseSettings, accessToken: "", refreshToken: "", userId: "" };
  saveSupabaseSettings();
  localStorage.removeItem(SOCIAL_OAUTH_PENDING_KEY);
  loginForm.reset();
  saveAccount();
  render();
});

adminScoreForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (account.role !== "admin") return;
  scoreSettings = {
    perCard: Math.max(0, numeric(scoreFields.perCard.value)),
    perThousandValue: Math.max(0, numeric(scoreFields.perThousandValue.value)),
    perCompleteGoal: Math.max(0, numeric(scoreFields.perCompleteGoal.value)),
    perTrade: Math.max(0, numeric(scoreFields.perTrade.value))
  };
  saveScoreSettings();
  render();
});

els.cardEntryTab.addEventListener("click", () => setEntryMode("card"));
els.tradeEntryTab.addEventListener("click", () => setEntryMode("trade"));

let tradeAiPreviewFrame = 0;
function scheduleTradeAiPreview() {
  window.cancelAnimationFrame(tradeAiPreviewFrame);
  tradeAiPreviewFrame = window.requestAnimationFrame(() => renderTradeAiWorkspace());
}

[tradeAiFields.mine, tradeAiFields.theirs].forEach((field) => field?.addEventListener("input", scheduleTradeAiPreview));

els.addTradeAiCollection?.addEventListener("click", () => {
  const card = cards.find((item) => item.id === els.tradeAiCollectionSelect?.value);
  if (!card) {
    if (els.tradeAiStructuredStatus) els.tradeAiStructuredStatus.textContent = "Choose a collection card first.";
    return;
  }
  appendTradeAiLine(tradeAiFields.mine, tradeAiLineFromCard(card));
  els.tradeAiCollectionSelect.value = "";
});

els.tradeAiAddStructured?.addEventListener("click", () => {
  const required = [tradeAiFields.year, tradeAiFields.setName, tradeAiFields.player];
  if (required.some((field) => !text(field?.value))) {
    els.tradeAiStructuredStatus.textContent = "Year, set, and player are required.";
    required.find((field) => !text(field?.value))?.focus();
    return;
  }
  const line = [
    tradeAiFields.year.value,
    tradeAiFields.brand.value,
    tradeAiFields.setName.value,
    tradeAiFields.player.value,
    tradeAiFields.type.value,
    tradeAiFields.parallel.value,
    tradeAiFields.cardNumber.value,
    tradeAiFields.grade.value || "Raw",
    tradeAiFields.value.value
  ].map((value) => text(value)).join(" | ");
  const target = tradeAiFields.structuredSide.value === "theirs" ? tradeAiFields.theirs : tradeAiFields.mine;
  appendTradeAiLine(target, line);
  els.tradeAiStructuredStatus.textContent = `Added to ${tradeAiFields.structuredSide.value === "theirs" ? "their" : "your"} side.`;
  [tradeAiFields.year, tradeAiFields.brand, tradeAiFields.setName, tradeAiFields.player, tradeAiFields.type, tradeAiFields.parallel, tradeAiFields.cardNumber, tradeAiFields.grade, tradeAiFields.value].forEach((field) => { field.value = ""; });
  tradeAiFields.year.focus();
});

els.generateTradeAi.addEventListener("click", () => {
  if (!requirePlanAccess("aiTrades", numeric(planUsageRecord().aiTrades), "build AI trade proposals")) return;
  sportsGuyRobotRuntime?.setState("thinking", 0, translatedText("Checking both sides..."));
  const mine = parseTradeAiCards(tradeAiFields.mine.value);
  const theirs = parseTradeAiCards(tradeAiFields.theirs.value);
  if (!mine.length || !theirs.length) {
    els.tradeAiResults.innerHTML = "";
    els.tradeAiEmpty.textContent = "Add at least one card to each side.";
    els.tradeAiEmpty.classList.remove("hidden");
    if (els.tradeAiResultSummary) els.tradeAiResultSummary.textContent = "Waiting for both sides";
    sportsGuyRobotRuntime?.setState("warning", 2200, "I need at least one card on each side.");
    return;
  }
  const missing = [...mine, ...theirs].filter((card) => !card.value);
  if (missing.length) {
    els.tradeAiResults.innerHTML = "";
    els.tradeAiEmpty.textContent = `${missing.length} card${missing.length === 1 ? " needs" : "s need"} a value. Add a manual value or saved completed-sale evidence.`;
    els.tradeAiEmpty.classList.remove("hidden");
    if (els.tradeAiResultSummary) els.tradeAiResultSummary.textContent = "Estimate evidence incomplete";
    sportsGuyRobotRuntime?.setState("warning", 2600, `${missing.length} card${missing.length === 1 ? " needs" : "s need"} a value first.`);
    return;
  }
  const proposals = proposeTradeDeals(mine, theirs, {
    maxCards: Math.min(4, Math.max(1, quantity(tradeAiFields.maxCards.value))),
    tolerance: numeric(tradeAiFields.tolerance.value),
    maxCash: numeric(tradeAiFields.maxCash.value)
  });
  if (proposals.length) recordPlanUsage("aiTrades");
  renderTradeAiResults(proposals);
  renderAccount();
});

els.clearTradeAi.addEventListener("click", () => {
  tradeAiFields.mine.value = "";
  tradeAiFields.theirs.value = "";
  latestTradeAiProposals = [];
  els.tradeAiResults.innerHTML = "";
  els.tradeAiEmpty.textContent = "Add cards to both sides to build fair-market, value-protection, and collector-fit proposals.";
  els.tradeAiEmpty.classList.remove("hidden");
  if (els.tradeAiResultSummary) els.tradeAiResultSummary.textContent = "Waiting for both sides";
  renderTradeAiWorkspace();
});

els.sportsGuyActions?.forEach((button) => button.addEventListener("click", () => runSportsGuyAction(button.dataset.sportsGuyAction)));

els.sportsGuyRobotWave?.addEventListener("click", () => {
  sportsGuyRobotRuntime?.wave();
  window.setTimeout(() => sportsGuyRobotRuntime?.speak(translatedText("Good to see you. Let’s make this trade count.")), 520);
});

els.sportsGuyVoiceToggle?.addEventListener("click", () => setSportsGuyVoiceEnabled(!sportsGuyVoiceEnabled));

els.sportsGuyForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = text(els.sportsGuyInput.value);
  if (!message) return;
  els.sportsGuyInput.value = "";
  runSportsGuyAction("evaluate", message);
});

els.sportsGuyInput?.addEventListener("focus", () => sportsGuyRobotRuntime?.setState("thinking", 0, translatedText("I’m listening. Show me the deal.")));
els.sportsGuyInput?.addEventListener("blur", () => {
  if (!sportsGuyResponseTimer) sportsGuyRobotRuntime?.setState("idle", 0, translatedText("Ready for the next move."));
});

els.clearSportsGuy?.addEventListener("click", () => {
  sportsGuyMessages = [sportsGuyDefaultMessage()];
  latestSportsGuyDraft = "";
  saveSportsGuyMessages();
  renderSportsGuyMessages();
});

els.sportsGuyCopyReply?.addEventListener("click", async () => {
  if (!latestSportsGuyDraft) return;
  try {
    await navigator.clipboard.writeText(latestSportsGuyDraft);
    els.sportsGuyCopyReply.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">check</span>Draft copied';
    window.setTimeout(() => { els.sportsGuyCopyReply.innerHTML = '<span class="material-symbols-outlined" aria-hidden="true">content_copy</span>Copy latest draft'; }, 1600);
  } catch {
    els.sportsGuyInput.value = latestSportsGuyDraft;
    els.sportsGuyInput.focus();
  }
});

tradeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!requireMember("record trades")) return;
  const completedTrade = buildTradeFromForm();
  trades.unshift(completedTrade);
  window.CardLedgerAdvanced?.completeTradeInventory?.(completedTrade);
  saveTrades();
  resetTradeForm();
  setEntryMode("card");
  renderTrades();
  render();
});

els.resetTradeForm.addEventListener("click", resetTradeForm);

goalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!requirePlanAccess("goals", goals.length, "create collecting goals")) return;
  const goal = buildGoalFromForm();
  if (!Object.keys(goal.slots || {}).length) {
    window.alert("Add a year range or card-number range.");
    return;
  }
  goals.unshift(goal);
  saveGoals();
  resetGoalForm();
  renderGoals();
  renderAlerts();
  render();
});

els.resetGoalForm.addEventListener("click", resetGoalForm);

els.toggleGoalForm?.addEventListener("click", () => {
  const expanded = els.toggleGoalForm.getAttribute("aria-expanded") !== "true";
  els.toggleGoalForm.setAttribute("aria-expanded", String(expanded));
  els.toggleGoalForm.querySelector(".material-symbols-outlined").textContent = expanded ? "close" : "add";
  els.toggleGoalForm.querySelector("span:last-child").textContent = currentLanguage === "zh-CN"
    ? (expanded ? "关闭表单" : "添加目标")
    : (expanded ? "Close form" : "Add goal");
  goalForm.classList.toggle("hidden", !expanded);
  if (expanded) goalFields.title?.focus();
});

els.expandAllGoals?.addEventListener("click", () => {
  goals.forEach((goal) => expandedGoalIds.add(goal.id));
  renderGoals();
});

els.collapseAllGoals?.addEventListener("click", () => {
  expandedGoalIds.clear();
  renderGoals();
});

els.goalList.addEventListener("click", (event) => {
  const actionControl = event.target.closest("[data-action]");
  if (!actionControl) return;
  const action = actionControl.dataset.action;
  if ((action === "toggle-slot" || action === "delete-goal") && !requireMember("manage collecting goals")) return;
  if (action === "toggle-slot") {
    toggleGoalSlot(actionControl.dataset.goalId, actionControl.dataset.slotId);
  }
  if (action === "delete-goal") {
    deleteGoal(actionControl.dataset.goalId);
  }
  if (action === "toggle-goal-slots") {
    const goalId = actionControl.dataset.goalId;
    if (!goalId) return;
    if (expandedGoalIds.has(goalId)) {
      expandedGoalIds.delete(goalId);
    } else {
      expandedGoalIds.add(goalId);
    }
    renderGoals();
  }
});

els.alertList.addEventListener("click", (event) => {
  if (event.target.dataset.action === "toggle-slot") {
    if (!requireMember("mark missing alerts as owned")) return;
    toggleGoalSlot(event.target.dataset.goalId, event.target.dataset.slotId);
  }
});

els.toggleAlerts.addEventListener("click", () => {
  alertsExpanded = !alertsExpanded;
  renderAlerts();
});

els.goalList.addEventListener("change", async (event) => {
  if (event.target.dataset.action !== "image-slot") return;
  const [file] = event.target.files;
  await addGoalSlotImage(event.target.dataset.goalId, event.target.dataset.slotId, file);
});

els.exportJson.addEventListener("click", () => {
  download("card-ledger-collection.json", JSON.stringify(cards, null, 2), "application/json");
});

els.exportCsv.addEventListener("click", () => {
  download("card-ledger-collection.csv", toCsv(cards), "text/csv");
});

els.importJson.addEventListener("change", async (event) => {
  const [file] = event.target.files;
  if (!file) return;
  try {
    const imported = JSON.parse(await file.text());
    if (!Array.isArray(imported)) throw new Error("Expected a collection array.");
    const normalized = imported.map((card) => ({
      ...card,
      id: card.id || crypto.randomUUID(),
      type: text(card.type),
      quantity: quantity(card.quantity),
      paid: numeric(card.paid),
      value: numeric(card.value),
      createdAt: card.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    const existingIds = new Set(cards.map((card) => card.id));
    cards = [...normalized.filter((card) => !existingIds.has(card.id)), ...cards];
    saveCards();
    render();
  } catch (error) {
    window.alert(`Import failed: ${error.message}`);
  } finally {
    event.target.value = "";
  }
});

let landingCardRuntime = null;
let landingHeroRuntime = null;
let workspace3DRuntime = null;
let presentationClosetRuntime = null;
let workspace3DInitTimer = 0;
let presentationClosetInitTimer = 0;

const WORKSPACE_3D_THEMES = {
  dashboard: { primary: 0x71e1b3, secondary: 0xf0bd5b, deep: 0x061d18, motif: "portfolio" },
  portfolio: { primary: 0x71e1b3, secondary: 0xf0bd5b, deep: 0x061d18, motif: "portfolio" },
  collection: { primary: 0x58c7ff, secondary: 0x8ff0ce, deep: 0x071a24, motif: "cards" },
  diy: { primary: 0x45e2c2, secondary: 0xff9c75, deep: 0x071b1b, motif: "cards" },
  goals: { primary: 0xf2c56b, secondary: 0xff8d75, deep: 0x241708, motif: "targets" },
  market: { primary: 0x62b7ff, secondary: 0xf3c969, deep: 0x071525, motif: "market" },
  community: { primary: 0xff82ad, secondary: 0x75e3c0, deep: 0x210b19, motif: "network" },
  trade: { primary: 0x9d8cff, secondary: 0xffb45f, deep: 0x150d25, motif: "trade" },
  condition: { primary: 0x75d5ff, secondary: 0x9de8ca, deep: 0x061927, motif: "cards" },
  account: { primary: 0x70e6c0, secondary: 0xd9a8ff, deep: 0x0b1720, motif: "identity" }
};

function syncWorkspace3D(page) {
  if (!els.pageWebglCanvas) return;
  const isWorkspace = Object.hasOwn(WORKSPACE_3D_THEMES, page);
  els.pageWebglCanvas.classList.toggle("hidden", !isWorkspace);
  if (!isWorkspace) return;
  if (workspace3DRuntime) {
    workspace3DRuntime.setTheme(page);
  } else {
    window.clearTimeout(workspace3DInitTimer);
    workspace3DInitTimer = window.setTimeout(() => {
      if (Object.hasOwn(WORKSPACE_3D_THEMES, activePage)) initWorkspace3D(activePage);
    }, 170);
  }
}

function schedulePresentationCloset3D() {
  if (presentationClosetRuntime || els.closetCardStage?.dataset.webglStatus === "starting") return;
  window.clearTimeout(presentationClosetInitTimer);
  presentationClosetInitTimer = window.setTimeout(() => {
    if (activePage === "collection") initPresentationCloset3D();
  }, 170);
}

async function initWorkspace3D(initialPage = "dashboard") {
  if (!els.pageWebglCanvas || workspace3DRuntime || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  els.pageWebglCanvas.dataset.webglStatus = "starting";
  try {
    const THREE = await import("https://unpkg.com/three@0.160.0/build/three.module.js");
    const renderer = new THREE.WebGLRenderer({ canvas: els.pageWebglCanvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
    camera.position.set(0, 0.25, 10.5);
    const world = new THREE.Group();
    scene.add(world);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x020706, 0.8));
    const primaryLight = new THREE.PointLight(0x71e1b3, 28, 24);
    const secondaryLight = new THREE.PointLight(0xf0bd5b, 22, 22);
    primaryLight.position.set(-4, 4, 5);
    secondaryLight.position.set(4, -2, 4);
    scene.add(primaryLight, secondaryLight);

    const pointer = { x: 0, y: 0 };
    document.addEventListener("pointermove", (event) => {
      pointer.x = (event.clientX / Math.max(window.innerWidth, 1) - 0.5) * 2;
      pointer.y = (event.clientY / Math.max(window.innerHeight, 1) - 0.5) * -2;
    }, { passive: true });

    const themeWorldCache = new Map();

    const addBox = (group, config, materials) => {
      const geometry = new THREE.BoxGeometry(config.w, config.h, config.d || 0.12, 2, 2, 1);
      const mesh = new THREE.Mesh(geometry, materials.body.clone());
      mesh.position.set(config.x, config.y, config.z || 0);
      mesh.rotation.set(config.rx || 0, config.ry || 0, config.rz || 0);
      mesh.userData = { baseY: config.y, phase: config.phase || 0, float: config.float ?? 0.08 };
      const edge = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), materials.edge.clone());
      mesh.add(edge);
      group.add(mesh);
      return mesh;
    };

    const buildThemeWorld = (page) => {
      if (themeWorldCache.has(page)) return themeWorldCache.get(page);
      const theme = WORKSPACE_3D_THEMES[page] || WORKSPACE_3D_THEMES.dashboard;
      const materials = {
        body: new THREE.MeshPhysicalMaterial({ color: theme.deep, emissive: theme.primary, emissiveIntensity: 0.16, roughness: 0.38, metalness: 0.46, clearcoat: 0.8, transparent: true, opacity: 0.56 }),
        edge: new THREE.LineBasicMaterial({ color: theme.primary, transparent: true, opacity: 0.7 }),
        secondary: new THREE.MeshPhysicalMaterial({ color: theme.secondary, emissive: theme.secondary, emissiveIntensity: 0.2, roughness: 0.34, metalness: 0.42, transparent: true, opacity: 0.6 })
      };
      const ambient = new THREE.Group();

      if (theme.motif === "portfolio") {
        const heights = [1.1, 1.8, 1.4, 2.65, 2.1, 3.35, 2.75];
        heights.forEach((height, index) => addBox(ambient, { x: -5.1 + index * 1.65, y: -2.7 + height / 2, z: -2.4 + (index % 2) * 0.3, w: 0.82, h: height, d: 0.82, ry: -0.18, phase: index }, materials));
        const ring = new THREE.Mesh(new THREE.TorusGeometry(3.5, 0.035, 10, 128), materials.secondary.clone());
        ring.rotation.x = 1.2;
        ring.position.set(1.6, 0.2, -3.5);
        ambient.add(ring);
      } else if (theme.motif === "cards") {
        for (let index = 0; index < 9; index += 1) {
          addBox(ambient, { x: -4.5 + index * 1.15, y: Math.sin(index * 0.8) * 0.52, z: -2.6 - Math.abs(index - 4) * 0.16, w: 1.45, h: 2.05, d: 0.08, ry: (index - 4) * -0.12, rz: (index - 4) * 0.045, phase: index }, materials);
        }
      } else if (theme.motif === "targets") {
        [3.5, 2.55, 1.62].forEach((radius, index) => {
          const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.075 + index * 0.025, 12, 128), index % 2 ? materials.secondary.clone() : materials.body.clone());
          ring.position.set(2.5, 0, -3.3 + index * 0.12);
          ring.rotation.x = 0.15;
          ring.userData = { phase: index, spin: 0.0015 + index * 0.0006 };
          ambient.add(ring);
        });
        for (let index = 0; index < 5; index += 1) addBox(ambient, { x: -5.2 + index * 1.15, y: -1.7 + index * 0.8, z: -2.5, w: 0.72, h: 0.72, d: 0.3, rz: index * 0.12, phase: index }, materials);
      } else if (theme.motif === "market") {
        const heights = [1.3, 2.4, 1.75, 3.3, 2.55, 4.1, 3.45, 4.7, 4.25];
        heights.forEach((height, index) => addBox(ambient, { x: -5.4 + index * 1.35, y: -2.65 + height / 2, z: -3.1, w: 0.48, h: height, d: 0.48, phase: index }, index % 3 === 1 ? { ...materials, body: materials.secondary } : materials));
        const points = heights.map((height, index) => new THREE.Vector3(-5.4 + index * 1.35, -2.15 + height, -2.5));
        const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), new THREE.LineBasicMaterial({ color: theme.secondary, transparent: true, opacity: 0.9 }));
        ambient.add(line);
      } else if (theme.motif === "network") {
        const positions = [[-4, 1.8], [-2.2, -0.8], [-0.2, 1.1], [2.2, -1.2], [4.4, 1.55], [0, -2.3], [3.4, 2.8]];
        const points = positions.map(([x, y]) => new THREE.Vector3(x, y, -3));
        const links = [[0,1],[0,2],[1,2],[1,5],[2,3],[2,4],[2,6],[3,4],[3,5],[4,6]];
        links.forEach(([from, to]) => ambient.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([points[from], points[to]]), new THREE.LineBasicMaterial({ color: theme.secondary, transparent: true, opacity: 0.35 }))));
        points.forEach((position, index) => {
          const node = new THREE.Mesh(new THREE.IcosahedronGeometry(index === 2 ? 0.38 : 0.25, 2), index === 2 ? materials.secondary.clone() : materials.body.clone());
          node.position.copy(position);
          node.userData = { baseY: position.y, phase: index, float: 0.12 };
          ambient.add(node);
        });
      } else if (theme.motif === "identity") {
        const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.65, 4), materials.body.clone());
        core.position.set(2.4, 0.1, -3.1);
        core.userData = { baseY: 0.1, phase: 0, float: 0.12 };
        ambient.add(core);
        [2.35, 3.05, 3.8].forEach((radius, index) => {
          const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.035 + index * 0.012, 10, 128), index === 1 ? materials.secondary.clone() : materials.body.clone());
          ring.position.set(2.4, 0.1, -3.1);
          ring.rotation.set(0.65 + index * 0.4, 0.24 + index * 0.35, index * 0.45);
          ring.userData = { phase: index, spin: 0.0012 + index * 0.0005 };
          ambient.add(ring);
        });
        for (let index = 0; index < 5; index += 1) addBox(ambient, { x: -5.2 + index * 0.8, y: 2.1 - index * 0.9, z: -2.8, w: 0.58 + index * 0.12, h: 0.58 + index * 0.12, d: 0.22, rz: index * 0.18, phase: index }, materials);
      } else {
        [-1, 1].forEach((side) => {
          for (let index = 0; index < 4; index += 1) addBox(ambient, { x: side * (2.5 + index * 0.16), y: (index - 1.5) * 0.34, z: -2.5 - index * 0.12, w: 2.15, h: 3.05, d: 0.09, ry: side * (0.38 + index * 0.04), rz: side * -0.06, phase: index + (side > 0 ? 4 : 0) }, side > 0 ? { ...materials, body: materials.secondary } : materials);
        });
        const orbit = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.045, 10, 128), materials.secondary.clone());
        orbit.rotation.set(1.08, 0.2, 0.12);
        orbit.position.z = -2.6;
        ambient.add(orbit);
      }

      const particleGeometry = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(180 * 3);
      for (let index = 0; index < 180; index += 1) {
        particlePositions[index * 3] = (Math.random() - 0.5) * 16;
        particlePositions[index * 3 + 1] = (Math.random() - 0.5) * 9;
        particlePositions[index * 3 + 2] = -1 - Math.random() * 8;
      }
      particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
      ambient.add(new THREE.Points(particleGeometry, new THREE.PointsMaterial({ color: theme.primary, size: 0.035, transparent: true, opacity: 0.42 })));
      const cachedTheme = { theme, ambient };
      themeWorldCache.set(page, cachedTheme);
      return cachedTheme;
    };

    const rebuildTheme = (page) => {
      const { theme, ambient } = buildThemeWorld(page);
      world.clear();
      world.add(ambient);
      world.rotation.set(-0.05, 0, 0);
      primaryLight.color.setHex(theme.primary);
      secondaryLight.color.setHex(theme.secondary);
      scene.fog = new THREE.FogExp2(theme.deep, 0.055);
      renderer.setClearColor(theme.deep, 0.12);
      els.pageWebglCanvas.dataset.theme = page;
    };

    const resize = () => {
      renderer.setSize(Math.max(window.innerWidth, 1), Math.max(window.innerHeight, 1), false);
      camera.aspect = Math.max(window.innerWidth, 1) / Math.max(window.innerHeight, 1);
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize, { passive: true });
    resize();

    const runtime = {
      renderer,
      scene,
      camera,
      currentTheme: "",
      setTheme(page) {
        if (!WORKSPACE_3D_THEMES[page] || this.currentTheme === page) return;
        this.currentTheme = page;
        rebuildTheme(page);
      },
      animationFrame: 0
    };
    workspace3DRuntime = runtime;
    window.cardLedgerWorkspace3D = runtime;
    runtime.setTheme(Object.hasOwn(WORKSPACE_3D_THEMES, activePage) ? activePage : initialPage);
    els.pageWebglCanvas.dataset.webglStatus = "running";

    const remainingThemes = Object.keys(WORKSPACE_3D_THEMES).filter((page) => page !== runtime.currentTheme);
    const warmNextTheme = () => {
      const page = remainingThemes.shift();
      if (!page) return;
      buildThemeWorld(page);
      if (remainingThemes.length) {
        if ("requestIdleCallback" in window) window.requestIdleCallback(warmNextTheme, { timeout: 1200 });
        else window.setTimeout(warmNextTheme, 80);
      }
    };
    if ("requestIdleCallback" in window) window.requestIdleCallback(warmNextTheme, { timeout: 1200 });
    else window.setTimeout(warmNextTheme, 240);

    let lastRenderAt = 0;
    const animate = (now = performance.now()) => {
      runtime.animationFrame = requestAnimationFrame(animate);
      if (document.hidden || !Object.hasOwn(WORKSPACE_3D_THEMES, activePage) || els.pageWebglCanvas.classList.contains("hidden")) return;
      if (now - lastRenderAt < 1000 / 32) return;
      lastRenderAt = now;
      const time = now * 0.001;
      world.rotation.y += (pointer.x * 0.055 - world.rotation.y) * 0.025;
      world.rotation.x += (pointer.y * 0.025 - world.rotation.x) * 0.025;
      world.children.forEach((group) => group.children.forEach((item, index) => {
        if (item.userData?.baseY !== undefined) item.position.y = item.userData.baseY + Math.sin(time * 0.65 + item.userData.phase) * item.userData.float;
        if (item.userData?.spin) item.rotation.z += item.userData.spin;
        if (item.isPoints) item.rotation.y = time * 0.015;
      }));
      primaryLight.position.x = -4 + Math.sin(time * 0.4) * 2;
      secondaryLight.position.y = -2 + Math.cos(time * 0.5) * 2;
      els.pageWebglCanvas.dataset.webglFrame = String(Number(els.pageWebglCanvas.dataset.webglFrame || 0) + 1);
      renderer.render(scene, camera);
    };
    animate();
  } catch {
    els.pageWebglCanvas.dataset.webglStatus = "failed";
    els.pageWebglCanvas.classList.add("hidden");
  }
}

function loadLandingCardImages() {
  try {
    const saved = JSON.parse(localStorage.getItem(LANDING_CARD_IMAGE_KEY)) || {};
    return {
      front: text(saved.front),
      back: text(saved.back),
      name: text(saved.name) || "Card Ledger Showcase",
      certNumber: /^\d{10}$/.test(text(saved.certNumber)) ? text(saved.certNumber) : randomCertificationNumber(10),
      format: CARD_HOLDER_SPECS[saved.format] ? saved.format : "raw",
      grade: text(saved.grade) || "10"
    };
  } catch {
    return { front: "", back: "", name: "Card Ledger Showcase", certNumber: randomCertificationNumber(10), format: "raw", grade: "10" };
  }
}

function loadPresentationCloset() {
  try {
    const saved = JSON.parse(localStorage.getItem(PRESENTATION_CLOSET_KEY)) || {};
    const usesTheaterLayout = Number(saved.layoutVersion) === 2;
    return {
      layoutVersion: 2,
      displayMode: saved.displayMode === "storage" ? "storage" : "theater",
      selectedId: text(saved.selectedId) || CLOSET_STARTER_CARDS[0].id,
      custom: Array.isArray(saved.custom)
        ? saved.custom.filter((item) => item?.id && item?.name && item?.front)
        : [],
      formats: saved.formats && typeof saved.formats === "object" ? saved.formats : {},
      placements: usesTheaterLayout && saved.placements && typeof saved.placements === "object" ? saved.placements : {},
      flipped: saved.flipped && typeof saved.flipped === "object" ? saved.flipped : {}
    };
  } catch {
    return { layoutVersion: 2, displayMode: "theater", selectedId: CLOSET_STARTER_CARDS[0].id, custom: [], formats: {}, placements: {}, flipped: {} };
  }
}

function savePresentationCloset() {
  try {
    localStorage.setItem(PRESENTATION_CLOSET_KEY, JSON.stringify(presentationCloset));
    return true;
  } catch {
    if (els.closetStatus) els.closetStatus.textContent = "The browser storage is full. Remove an uploaded display card and try again.";
    return false;
  }
}

function presentationClosetCards() {
  const collectionPhotos = cards
    .filter((card) => text(card.image))
    .map((card) => {
      const grade = text(card.grade).toUpperCase();
      const gradeValue = grade.match(/\d+(?:\.\d+)?/)?.[0] || "10";
      const format = grade.startsWith("PSA") ? "psa" : grade.startsWith("BGS") ? "bgs" : "raw";
      return {
        id: `collection-display-${card.id}`,
        sourceCardId: card.id,
        name: fixedCardName(card) || cardTitle(card),
        subtitle: "Collection photo",
        front: card.image,
        back: text(card.backImage),
        collectionCard: true,
        custom: false,
        format,
        grade: format === "raw" ? "" : gradeValue,
        colors: ["#173b4b", "#07141c", "#58c7ff"]
      };
    });
  const displayOnlyUploads = presentationCloset.custom.filter((item) => !item.sourceCardId);
  return [...CLOSET_STARTER_CARDS, ...collectionPhotos, ...displayOnlyUploads].map((item) => {
    const savedFormat = presentationCloset.formats[item.id] || {};
    return {
      ...item,
      format: CARD_HOLDER_SPECS[savedFormat.format] ? savedFormat.format : (CARD_HOLDER_SPECS[item.format] ? item.format : "raw"),
      grade: text(savedFormat.grade ?? item.grade),
      placement: presentationCloset.placements[item.id] || null,
      flipped: Boolean(presentationCloset.flipped[item.id])
    };
  });
}

function selectedPresentationCard() {
  const items = presentationClosetCards();
  return items.find((item) => item.id === presentationCloset.selectedId) || items[0];
}

function selectPresentationCard(id) {
  const item = presentationClosetCards().find((card) => card.id === id);
  if (!item) return;
  presentationCloset.selectedId = item.id;
  savePresentationCloset();
  renderPresentationCloset();
}

function updateSelectedPresentationHolder() {
  const selected = selectedPresentationCard();
  if (!selected) return;
  const format = CARD_HOLDER_SPECS[els.closetCardFormat?.value] ? els.closetCardFormat.value : "raw";
  presentationCloset.formats[selected.id] = {
    format,
    grade: format === "raw" ? "" : text(els.closetCardGrade?.value) || "10"
  };
  savePresentationCloset();
  renderPresentationCloset();
}

function removePresentationCard(id) {
  if (!requireMember("manage presentation cards")) return;
  const item = presentationCloset.custom.find((card) => card.id === id);
  if (!item || !window.confirm(`Remove ${item.name} from the Display Cabinet/Box?`)) return;
  presentationCloset.custom = presentationCloset.custom.filter((card) => card.id !== id);
  delete presentationCloset.formats[id];
  delete presentationCloset.placements[id];
  delete presentationCloset.flipped[id];
  if (presentationCloset.selectedId === id) presentationCloset.selectedId = CLOSET_STARTER_CARDS[0].id;
  savePresentationCloset();
  renderPresentationCloset();
}

function renderPresentationCloset() {
  if (!els.closetCardRail) return;
  const items = presentationClosetCards();
  const selected = selectedPresentationCard();
  if (selected && presentationCloset.selectedId !== selected.id) presentationCloset.selectedId = selected.id;
  const displayMode = presentationCloset.displayMode === "storage" ? "storage" : "theater";
  if (els.closetDisplayMode) els.closetDisplayMode.value = displayMode;
  els.closetCardStage?.classList.toggle("storage-mode", displayMode === "storage");
  els.closetCardStage?.setAttribute("aria-label", displayMode === "storage"
    ? "Interactive card storage box. Scroll to browse and click a card to lift and rotate it."
    : "Interactive display cabinet. Click cards to flip and drag to arrange.");
  if (els.closetStageHint) els.closetStageHint.textContent = translatedText(displayMode === "storage"
    ? "Scroll to browse · click a card to lift and inspect"
    : "Click to flip · drag to arrange");
  if (els.closetSelectedName) els.closetSelectedName.textContent = selected.name;
  if (els.closetCardFormat) els.closetCardFormat.value = selected.format;
  if (els.closetCardGrade) {
    els.closetCardGrade.value = selected.grade || "10";
    els.closetCardGrade.disabled = selected.format === "raw";
  }
  if (els.closetCardCount) els.closetCardCount.textContent = String(items.length);
  els.closetCardRail.innerHTML = "";

  items.forEach((item) => {
    const wrapper = document.createElement("div");
    wrapper.className = `closet-card-option${item.id === selected.id ? " selected" : ""}`;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "closet-card-choice";
    button.dataset.closetCardId = item.id;
    button.setAttribute("role", "option");
    button.setAttribute("aria-selected", item.id === selected.id ? "true" : "false");
    const preview = document.createElement("span");
    preview.className = "closet-card-thumbnail";
    preview.style.setProperty("--closet-color-a", item.colors?.[0] || "#0f5b42");
    preview.style.setProperty("--closet-color-b", item.colors?.[1] || "#07110e");
    preview.style.setProperty("--closet-color-c", item.colors?.[2] || "#d8aa55");
    if (item.front) preview.style.backgroundImage = `url("${item.front.replaceAll('"', "%22")}")`;
    preview.innerHTML = item.front ? "" : `<span>${escapeHtml(item.name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2))}</span>`;
    const copy = document.createElement("span");
    copy.className = "closet-card-option-copy";
    copy.innerHTML = `<strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.format === "raw" ? "Raw card" : `${item.format.toUpperCase()} ${item.grade || "10"}`)} · ${escapeHtml(item.custom ? "Display only" : item.subtitle)}</small>`;
    button.append(preview, copy);
    button.addEventListener("click", () => selectPresentationCard(item.id));
    wrapper.append(button);
    if (item.custom) {
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "closet-remove-card";
      remove.title = `Remove ${item.name}`;
      remove.setAttribute("aria-label", `Remove ${item.name}`);
      remove.textContent = "×";
      remove.addEventListener("click", () => removePresentationCard(item.id));
      wrapper.append(remove);
    }
    els.closetCardRail.append(wrapper);
  });

  if (els.closetCollectionCard) {
    const previous = els.closetCollectionCard.value;
    const imageCards = cards.filter((card) => text(card.image));
    els.closetCollectionCard.innerHTML = imageCards.length
      ? imageCards.map((card) => `<option value="${escapeHtml(card.id)}">${escapeHtml(fixedCardName(card) || cardTitle(card))}</option>`).join("")
      : '<option value="">No collection cards with images yet</option>';
    if (imageCards.some((card) => card.id === previous)) els.closetCollectionCard.value = previous;
    if (els.addCollectionCardToCloset) els.addCollectionCardToCloset.disabled = !imageCards.length;
  }

  presentationClosetRuntime?.updateItems(items);
  presentationClosetRuntime?.setMode(displayMode);
}

function previewClosetUploads() {
  if (!els.closetUploadPreview) return;
  const front = els.closetFrontUpload?.files?.[0];
  const back = els.closetBackUpload?.files?.[0];
  els.closetUploadPreview.innerHTML = "";
  [front, back].forEach((file, index) => {
    if (!file) return;
    const preview = document.createElement("span");
    preview.style.backgroundImage = `url("${URL.createObjectURL(file)}")`;
    preview.setAttribute("aria-label", index === 0 ? "Front image selected" : "Back image selected");
    els.closetUploadPreview.append(preview);
  });
}

async function addUploadedPresentationCard(event) {
  event.preventDefault();
  const directUploads = presentationCloset.custom.filter((item) => !item.sourceCardId).length;
  if (!requirePlanAccess("displayUploads", directUploads, "upload presentation cards")) return;
  const frontFile = els.closetFrontUpload?.files?.[0];
  const backFile = els.closetBackUpload?.files?.[0];
  const name = text(els.closetUploadName?.value);
  if (!name || !frontFile) {
    if (els.closetStatus) els.closetStatus.textContent = "Add a display name and front photo first.";
    return;
  }
  if (els.closetStatus) els.closetStatus.textContent = "Preparing your 3D display card...";
  try {
    const [front, back] = await Promise.all([
      fileToCardFaceDataUrl(frontFile),
      backFile ? fileToCardFaceDataUrl(backFile) : Promise.resolve("")
    ]);
    const item = {
      id: crypto.randomUUID(),
      name,
      subtitle: "Personal display card",
      front,
      back,
      custom: true,
      format: "raw",
      grade: "",
      colors: ["#194c42", "#091210", "#a5e3c7"]
    };
    presentationCloset.custom.push(item);
    presentationCloset.selectedId = item.id;
    if (!savePresentationCloset()) {
      presentationCloset.custom.pop();
      presentationCloset.selectedId = CLOSET_STARTER_CARDS[0].id;
      return;
    }
    els.closetUploadForm.reset();
    els.closetUploadPreview.innerHTML = "";
    els.closetStatus.textContent = `${name} is now in the display only. It was not added to your collection.`;
    renderPresentationCloset();
  } catch (error) {
    if (els.closetStatus) els.closetStatus.textContent = `Could not prepare this card: ${error.message}`;
  }
}

function addCollectionImageToCloset() {
  if (!requireMember("add collection cards to the display cabinet/box")) return;
  const card = cards.find((item) => item.id === els.closetCollectionCard?.value && text(item.image));
  if (!card) return;
  const displayId = `collection-display-${card.id}`;
  presentationCloset.selectedId = displayId;
  savePresentationCloset();
  if (els.closetStatus) els.closetStatus.textContent = `${fixedCardName(card) || cardTitle(card)} is already synced from your collection photo.`;
  renderPresentationCloset();
}

function saveLandingCardImages(images) {
  localStorage.setItem(LANDING_CARD_IMAGE_KEY, JSON.stringify(images));
}

async function imageFromDataUrl(dataUrl) {
  if (!dataUrl) return null;
  const image = new Image();
  image.src = dataUrl;
  await image.decode();
  return image;
}

async function fileToCardFaceDataUrl(file) {
  if (!file) return "";
  const raw = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(file);
  });
  const image = await imageFromDataUrl(raw);
  const canvas = document.createElement("canvas");
  canvas.width = 768;
  canvas.height = 1076;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#0c0f0f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawCoverImage(ctx, image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.82);
}

function drawCoverImage(ctx, image, x, y, width, height) {
  const sourceRatio = image.width / image.height;
  const targetRatio = width / height;
  const sourceWidth = sourceRatio > targetRatio ? image.height * targetRatio : image.width;
  const sourceHeight = sourceRatio > targetRatio ? image.height : image.width / targetRatio;
  const sourceX = (image.width - sourceWidth) / 2;
  const sourceY = (image.height - sourceHeight) / 2;
  ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
}

async function makeCardTexture(side = "front", imageUrl = "") {
  const canvas = document.createElement("canvas");
  canvas.width = 768;
  canvas.height = 1076;
  const ctx = canvas.getContext("2d");
  const uploadedImage = await imageFromDataUrl(imageUrl).catch(() => null);
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, side === "front" ? "#0f4633" : "#131716");
  gradient.addColorStop(0.5, side === "front" ? "#101817" : "#06402b");
  gradient.addColorStop(1, side === "front" ? "#d8aa55" : "#0a1010");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (uploadedImage) {
    drawCoverImage(ctx, uploadedImage, 58, 58, canvas.width - 116, canvas.height - 116);
    const shine = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    shine.addColorStop(0, "rgba(255,255,255,0.18)");
    shine.addColorStop(0.38, "rgba(255,255,255,0)");
    shine.addColorStop(0.72, "rgba(229,193,110,0.16)");
    shine.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = shine;
    ctx.fillRect(58, 58, canvas.width - 116, canvas.height - 116);
  }
  ctx.strokeStyle = "#e5c16e";
  ctx.lineWidth = 18;
  ctx.strokeRect(38, 38, canvas.width - 76, canvas.height - 76);
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.lineWidth = 4;
  ctx.strokeRect(72, 72, canvas.width - 144, canvas.height - 144);
  if (uploadedImage) return canvas;
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  for (let index = 0; index < 10; index += 1) {
    ctx.beginPath();
    ctx.arc(120 + index * 62, 230 + Math.sin(index) * 26, 54, 0, Math.PI * 2);
    ctx.fill();
  }
  if (side === "front") {
    ctx.fillStyle = "#f4f7f3";
    ctx.font = "900 72px Arial, sans-serif";
    ctx.fillText("CARD", 96, 170);
    ctx.fillText("LEDGER", 96, 245);
    ctx.fillStyle = "#9cd2b5";
    ctx.font = "800 38px Arial, sans-serif";
    ctx.fillText("PORTFOLIO ASSET", 96, 320);
    ctx.fillStyle = "rgba(0,0,0,0.32)";
    ctx.fillRect(108, 400, 552, 390);
    ctx.fillStyle = "#e5c16e";
    ctx.beginPath();
    ctx.arc(384, 570, 122, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0d1413";
    ctx.font = "900 120px Arial, sans-serif";
    ctx.fillText("CL", 278, 610);
    ctx.fillStyle = "#f4f7f3";
    ctx.font = "900 54px Arial, sans-serif";
    ctx.fillText("ROOKIE VAULT", 96, 884);
    ctx.fillStyle = "#9cd2b5";
    ctx.font = "800 34px Arial, sans-serif";
    ctx.fillText("VALUE TRACKED", 96, 940);
  } else {
    ctx.fillStyle = "#9cd2b5";
    ctx.font = "900 54px Arial, sans-serif";
    ["COLLECT", "VALUE", "TRADE"].forEach((line, index) => ctx.fillText(line, 112, 210 + index * 74));
    ctx.fillStyle = "#f4f7f3";
    ctx.font = "800 34px Arial, sans-serif";
    ["eBay · CardHobby · Goldin", "Goal Runs · Deal Receipts", "Private Rooms · AI Trades"].forEach((line, index) => ctx.fillText(line, 112, 486 + index * 62));
    ctx.fillStyle = "#e5c16e";
    ctx.font = "900 92px Arial, sans-serif";
    ctx.fillText("360", 112, 820);
    ctx.font = "800 32px Arial, sans-serif";
    ctx.fillText("DRAG TO SPIN", 112, 872);
  }
  return canvas;
}

function drawClosetTextureTitle(ctx, value, x, y, maxWidth) {
  const words = text(value).toUpperCase().split(/\s+/);
  const lines = [];
  let line = "";
  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  });
  if (line) lines.push(line);
  lines.slice(0, 3).forEach((item, index) => ctx.fillText(item, x, y + index * 64));
}

async function makeClosetCardTexture(item, side = "front") {
  const canvas = document.createElement("canvas");
  canvas.width = 768;
  canvas.height = 1076;
  const ctx = canvas.getContext("2d");
  const colors = item.colors || ["#0f5b42", "#07110e", "#d8aa55"];
  const imageUrl = side === "front" ? item.front : item.back;
  const uploadedImage = imageUrl ? await imageFromDataUrl(imageUrl).catch(() => null) : null;
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, colors[0]);
  gradient.addColorStop(0.58, colors[1]);
  gradient.addColorStop(1, colors[2]);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (uploadedImage) {
    drawCoverImage(ctx, uploadedImage, 34, 34, canvas.width - 68, canvas.height - 68);
    const gloss = ctx.createLinearGradient(40, 40, 700, 980);
    gloss.addColorStop(0, "rgba(255,255,255,0.24)");
    gloss.addColorStop(0.28, "rgba(255,255,255,0)");
    gloss.addColorStop(0.74, "rgba(255,255,255,0.08)");
    gloss.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gloss;
    ctx.fillRect(34, 34, canvas.width - 68, canvas.height - 68);
  } else if (side === "front") {
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    for (let index = 0; index < 12; index += 1) {
      ctx.beginPath();
      ctx.arc(80 + index * 64, 250 + Math.sin(index * 0.8) * 44, 76, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "rgba(0,0,0,0.36)";
    ctx.beginPath();
    ctx.arc(384, 500, 156, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(244, 600, 280, 246);
    ctx.fillStyle = colors[2];
    ctx.beginPath();
    ctx.arc(384, 484, 116, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = colors[1];
    ctx.font = "900 96px Arial, sans-serif";
    ctx.fillText(item.id.includes("silver") ? "SP" : item.id.includes("gold") ? "GM" : "RC", 308, 518);
    ctx.fillStyle = "#f4f7f3";
    ctx.font = "900 52px Arial, sans-serif";
    drawClosetTextureTitle(ctx, item.name, 82, 890, 610);
    ctx.fillStyle = colors[2];
    ctx.font = "800 28px Arial, sans-serif";
    ctx.fillText(text(item.subtitle).toUpperCase(), 84, 1010);
  } else {
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    for (let index = 0; index < 5; index += 1) {
      ctx.strokeStyle = index % 2 ? colors[2] : "rgba(255,255,255,0.16)";
      ctx.lineWidth = 18;
      ctx.strokeRect(90 + index * 28, 120 + index * 28, 588 - index * 56, 836 - index * 56);
    }
    ctx.fillStyle = "#f4f7f3";
    ctx.font = "900 84px Arial, sans-serif";
    ctx.fillText("CARD", 118, 430);
    ctx.fillText("LEDGER", 118, 520);
    ctx.fillStyle = colors[2];
    ctx.font = "800 34px Arial, sans-serif";
    ctx.fillText("PRESENTATION CLOSET", 118, 610);
    ctx.font = "700 26px Arial, sans-serif";
    ctx.fillText("COLLECT · VALUE · TRADE", 118, 680);
  }

  ctx.strokeStyle = colors[2];
  ctx.lineWidth = 20;
  ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
  ctx.strokeStyle = "rgba(255,255,255,0.36)";
  ctx.lineWidth = 4;
  ctx.strokeRect(62, 62, canvas.width - 124, canvas.height - 124);
  return canvas;
}

function normalizeCardHolder(format) {
  return CARD_HOLDER_SPECS[format] ? format : "raw";
}

function stableCertificationNumber(seed, digits = 10) {
  let state = 2166136261;
  for (const character of String(seed || "card-ledger")) {
    state ^= character.charCodeAt(0);
    state = Math.imul(state, 16777619) >>> 0;
  }
  let result = "";
  while (result.length < digits) {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    result += String(state >>> 0).padStart(10, "0");
  }
  result = result.slice(0, digits);
  return result[0] === "0" ? `4${result.slice(1)}` : result;
}

function randomCertificationNumber(digits = 10) {
  const values = new Uint32Array(2);
  if (globalThis.crypto?.getRandomValues) {
    globalThis.crypto.getRandomValues(values);
  } else {
    values[0] = Math.floor(Math.random() * 0xffffffff);
    values[1] = Math.floor(Math.random() * 0xffffffff);
  }
  return stableCertificationNumber(`${values[0]}-${values[1]}-${Date.now()}`, digits);
}

function roundedCanvasRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function fitCanvasText(ctx, value, maxWidth, initialSize, minSize = 16) {
  let size = initialSize;
  do {
    ctx.font = `800 ${size}px Arial, sans-serif`;
    if (ctx.measureText(value).width <= maxWidth) return size;
    size -= 1;
  } while (size > minSize);
  return minSize;
}

function drawCertificationBarcode(ctx, certification, x, y, width, height) {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x, y, width, height);
  const pattern = [...certification].flatMap((digit, index) => {
    const value = Number(digit) + index * 3;
    return [1, value % 3 + 1, 1, value % 2 + 1, 2];
  });
  const total = pattern.reduce((sum, value) => sum + value, 0);
  let cursor = x + 4;
  ctx.fillStyle = "#111111";
  pattern.forEach((unit, index) => {
    const barWidth = Math.max(1, (width - 8) * unit / total);
    if (index % 2 === 0) ctx.fillRect(cursor, y + 3, barWidth, height - 6);
    cursor += barWidth;
  });
}

function makeHolderSurfaceTexture(cardCanvas, format = "raw", grade = "10", cardInfo = {}) {
  const holder = normalizeCardHolder(format);
  if (holder === "raw") return cardCanvas;
  const spec = CARD_HOLDER_SPECS[holder];
  const canvas = document.createElement("canvas");
  canvas.width = 760;
  canvas.height = Math.round(canvas.width * spec.height / spec.width);
  const ctx = canvas.getContext("2d");
  const isPsa = holder === "psa";
  const cardName = (text(cardInfo.name) || "CARD LEDGER SHOWCASE").toUpperCase();
  const cardSubtitle = (text(cardInfo.subtitle) || "COLLECTOR CARD").toUpperCase();
  const baseCertification = /^\d{10}$/.test(text(cardInfo.certNumber))
    ? text(cardInfo.certNumber)
    : stableCertificationNumber(cardInfo.id || `${cardName}-${cardSubtitle}`, 10);
  const certification = isPsa ? baseCertification.slice(-8) : baseCertification;
  const numericGrade = Number.parseFloat(text(grade)) || 10;
  const gradeText = text(grade) || "10";
  const gradeLabel = numericGrade >= 10 ? "GEM MT" : numericGrade >= 9 ? "MINT" : numericGrade >= 8 ? "NM-MT" : numericGrade >= 7 ? "NM" : "EX-MT";

  const shell = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  shell.addColorStop(0, "#151a1c");
  shell.addColorStop(0.18, "#667176");
  shell.addColorStop(0.48, "#242b2e");
  shell.addColorStop(0.82, "#7b878b");
  shell.addColorStop(1, "#171d1f");
  ctx.fillStyle = shell;
  roundedCanvasRect(ctx, 2, 2, canvas.width - 4, canvas.height - 4, 24);
  ctx.fill();
  [10, 17, 25].forEach((edge, index) => {
    ctx.strokeStyle = index % 2 ? "rgba(8,12,13,0.82)" : "rgba(225,238,241,0.38)";
    ctx.lineWidth = index === 1 ? 5 : 3;
    roundedCanvasRect(ctx, edge, edge, canvas.width - edge * 2, canvas.height - edge * 2, 19 - index * 3);
    ctx.stroke();
  });

  const inset = 38;
  const labelY = 42;
  const labelHeight = isPsa ? 176 : 188;
  const labelWidth = canvas.width - inset * 2;
  ctx.textBaseline = "alphabetic";

  if (isPsa) {
    ctx.fillStyle = "#f8f8f4";
    roundedCanvasRect(ctx, inset, labelY, labelWidth, labelHeight, 6);
    ctx.fill();
    ctx.strokeStyle = "#d92335";
    ctx.lineWidth = 12;
    roundedCanvasRect(ctx, inset + 2, labelY + 2, labelWidth - 4, labelHeight - 4, 5);
    ctx.stroke();
    ctx.fillStyle = "#d92335";
    ctx.fillRect(inset + 6, labelY + 6, labelWidth - 12, 31);
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 28px Arial, sans-serif";
    ctx.fillText("PSA", canvas.width / 2, labelY + 31);

    const leftX = inset + 24;
    const rightX = canvas.width - inset - 22;
    ctx.textAlign = "left";
    ctx.fillStyle = "#111416";
    fitCanvasText(ctx, cardName, labelWidth * 0.58, 30, 20);
    ctx.fillText(cardName, leftX, labelY + 73);
    ctx.font = "700 22px Arial, sans-serif";
    ctx.fillText(cardSubtitle.slice(0, 32), leftX, labelY + 101);
    drawCertificationBarcode(ctx, certification, leftX, labelY + 116, 255, 36);

    ctx.textAlign = "right";
    ctx.font = "800 22px Arial, sans-serif";
    ctx.fillText(gradeLabel, rightX, labelY + 67);
    ctx.font = "900 36px Arial, sans-serif";
    ctx.fillText(gradeText, rightX, labelY + 104);
    ctx.font = "700 22px 'Courier New', monospace";
    ctx.fillText(certification, rightX, labelY + 145);
    ctx.fillStyle = "#1e4b8f";
    ctx.font = "900 17px Arial, sans-serif";
    ctx.fillText("PSA", rightX - 138, labelY + 145);
  } else {
    const premiumLabel = numericGrade >= 9.5;
    const labelGradient = ctx.createLinearGradient(inset, labelY, canvas.width - inset, labelY + labelHeight);
    labelGradient.addColorStop(0, premiumLabel ? "#9a7a25" : "#aeb5b7");
    labelGradient.addColorStop(0.45, premiumLabel ? "#f5df8e" : "#f0f2ef");
    labelGradient.addColorStop(1, premiumLabel ? "#80631b" : "#90999c");
    ctx.fillStyle = labelGradient;
    roundedCanvasRect(ctx, inset, labelY, labelWidth, labelHeight, 6);
    ctx.fill();
    ctx.strokeStyle = premiumLabel ? "#ead477" : "#dce1e2";
    ctx.lineWidth = 6;
    roundedCanvasRect(ctx, inset + 3, labelY + 3, labelWidth - 6, labelHeight - 6, 5);
    ctx.stroke();

    const logoWidth = 126;
    ctx.fillStyle = "#121719";
    ctx.fillRect(inset + 8, labelY + 8, logoWidth, labelHeight - 16);
    ctx.textAlign = "center";
    ctx.fillStyle = "#f4f6f3";
    ctx.font = "900 40px Georgia, serif";
    ctx.fillText("B", inset + 8 + logoWidth / 2, labelY + 68);
    ctx.font = "800 18px Arial, sans-serif";
    ctx.fillText("BECKETT", inset + 8 + logoWidth / 2, labelY + 99);
    ctx.font = "700 13px Arial, sans-serif";
    ctx.fillText("GRADING", inset + 8 + logoWidth / 2, labelY + 122);

    const centerX = inset + logoWidth + 28;
    const gradeBoxWidth = 142;
    const centerWidth = labelWidth - logoWidth - gradeBoxWidth - 48;
    ctx.textAlign = "left";
    ctx.fillStyle = "#111416";
    fitCanvasText(ctx, cardName, centerWidth, 27, 18);
    ctx.fillText(cardName, centerX, labelY + 46);
    ctx.font = "700 20px Arial, sans-serif";
    ctx.fillText(cardSubtitle.slice(0, 28), centerX, labelY + 75);
    ctx.font = "700 14px 'Courier New', monospace";
    ctx.fillText(`CENTERING  ${numericGrade >= 9.5 ? "9.5" : "9"}   CORNERS  ${numericGrade >= 9 ? "9" : "8.5"}`, centerX, labelY + 111);
    ctx.fillText(`EDGES      ${numericGrade >= 9.5 ? "9.5" : "9"}   SURFACE  ${numericGrade >= 9 ? "9" : "8.5"}`, centerX, labelY + 133);

    const gradeX = canvas.width - inset - gradeBoxWidth - 8;
    ctx.strokeStyle = "rgba(15,20,21,0.48)";
    ctx.lineWidth = 2;
    ctx.strokeRect(gradeX, labelY + 10, gradeBoxWidth, labelHeight - 20);
    ctx.textAlign = "center";
    ctx.font = "900 58px Arial, sans-serif";
    ctx.fillText(gradeText, gradeX + gradeBoxWidth / 2, labelY + 75);
    ctx.font = "800 17px Arial, sans-serif";
    ctx.fillText(gradeLabel, gradeX + gradeBoxWidth / 2, labelY + 103);
    ctx.font = "700 15px 'Courier New', monospace";
    ctx.fillText(certification, gradeX + gradeBoxWidth / 2, labelY + 137);
  }

  const availableTop = labelY + labelHeight + 34;
  const availableBottom = canvas.height - 45;
  const cardHeight = Math.min(availableBottom - availableTop, canvas.height * spec.cardHeight);
  const cardWidth = cardHeight * (2.5 / 3.5);
  const cardX = (canvas.width - cardWidth) / 2;
  const cardY = availableTop + Math.max(0, (availableBottom - availableTop - cardHeight) / 2);
  ctx.fillStyle = "rgba(5,8,9,0.94)";
  roundedCanvasRect(ctx, cardX - 15, cardY - 15, cardWidth + 30, cardHeight + 30, 5);
  ctx.fill();
  ctx.strokeStyle = "rgba(220,231,233,0.42)";
  ctx.lineWidth = 4;
  roundedCanvasRect(ctx, cardX - 9, cardY - 9, cardWidth + 18, cardHeight + 18, 4);
  ctx.stroke();
  ctx.drawImage(cardCanvas, cardX, cardY, cardWidth, cardHeight);
  const gloss = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gloss.addColorStop(0, "rgba(255,255,255,0.2)");
  gloss.addColorStop(0.24, "rgba(255,255,255,0.02)");
  gloss.addColorStop(0.68, "rgba(255,255,255,0.08)");
  gloss.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gloss;
  roundedCanvasRect(ctx, 13, 13, canvas.width - 26, canvas.height - 26, 19);
  ctx.fill();
  return canvas;
}

async function initPresentationCloset3D() {
  if (!els.closetCardStage || !els.closetCardCanvas || presentationClosetRuntime) return;
  els.closetCardStage.dataset.webglStatus = "starting";
  try {
    const THREE = await import("https://unpkg.com/three@0.160.0/build/three.module.js");
    const renderer = new THREE.WebGLRenderer({ canvas: els.closetCardCanvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x030806, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0.2, 10.8);
    scene.add(new THREE.HemisphereLight(0xdaf6e9, 0x020604, 0.72));
    const keyLight = new THREE.SpotLight(0xfff5cf, 72, 22, Math.PI / 7, 0.58, 1.1);
    keyLight.position.set(0, 6.4, 5.8);
    keyLight.target.position.set(0, 0.25, -0.6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    const emeraldLight = new THREE.PointLight(0x21a66f, 22, 15);
    emeraldLight.position.set(-4.6, 1.2, 3.8);
    const goldLight = new THREE.PointLight(0xe2bd67, 30, 16);
    goldLight.position.set(4.2, -1.6, 3.2);
    scene.add(keyLight, keyLight.target, emeraldLight, goldLight);

    const theaterEnvironment = new THREE.Group();
    scene.add(theaterEnvironment);
    const room = new THREE.Group();
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x06100c, roughness: 0.92, metalness: 0.04 });
    const wall = new THREE.Mesh(new THREE.BoxGeometry(11.8, 7.2, 0.18), wallMaterial);
    wall.position.set(0, 0.15, -2.25);
    wall.receiveShadow = true;
    room.add(wall);
    [-3.7, 3.7].forEach((x) => {
      const panel = new THREE.Mesh(
        new THREE.BoxGeometry(0.035, 6.6, 0.08),
        new THREE.MeshStandardMaterial({ color: 0xb99043, roughness: 0.34, metalness: 0.82 })
      );
      panel.position.set(x, 0.1, -2.1);
      room.add(panel);
    });
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(13, 8),
      new THREE.MeshPhysicalMaterial({ color: 0x160f0a, roughness: 0.28, metalness: 0.12, clearcoat: 0.82, clearcoatRoughness: 0.22 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, -3.12, 0.4);
    floor.receiveShadow = true;
    room.add(floor);
    for (let index = -7; index <= 7; index += 1) {
      const seam = new THREE.Mesh(
        new THREE.BoxGeometry(0.018, 0.012, 7.5),
        new THREE.MeshStandardMaterial({ color: index % 2 ? 0x3a2818 : 0x5a3b20, roughness: 0.42 })
      );
      seam.position.set(index * 0.72, -3.105, 0.35);
      room.add(seam);
    }
    theaterEnvironment.add(room);

    const curtainMaterial = (color) => new THREE.MeshPhysicalMaterial({ color, roughness: 0.78, sheen: 1, sheenColor: 0x3fd18e, sheenRoughness: 0.62 });
    const curtains = new THREE.Group();
    [-1, 1].forEach((side) => {
      const wing = new THREE.Group();
      for (let fold = 0; fold < 7; fold += 1) {
        const strip = new THREE.Mesh(
          new THREE.CapsuleGeometry(0.26, 5.55 - fold * 0.13, 6, 12),
          curtainMaterial(fold % 2 ? 0x073d2b : 0x0b563b)
        );
        strip.scale.x = 1 - fold * 0.055;
        strip.rotation.z = side * (0.105 + fold * 0.026);
        strip.position.set(side * (3.48 + fold * 0.2), 0.35 + fold * 0.05, -0.3 + fold * 0.02);
        strip.castShadow = true;
        wing.add(strip);
      }
      const rope = new THREE.Mesh(
        new THREE.TorusGeometry(0.58, 0.055, 10, 40, Math.PI),
        new THREE.MeshStandardMaterial({ color: 0xd5ae56, roughness: 0.26, metalness: 0.86 })
      );
      rope.rotation.z = side < 0 ? Math.PI / 2 : -Math.PI / 2;
      rope.position.set(side * 3.54, -0.15, 0.25);
      wing.add(rope);
      curtains.add(wing);
    });
    for (let fold = -6; fold <= 6; fold += 1) {
      const valance = new THREE.Mesh(new THREE.SphereGeometry(0.68, 20, 12), curtainMaterial(fold % 2 ? 0x063723 : 0x0a4b32));
      valance.scale.set(1.15, 0.64, 0.42);
      valance.position.set(fold * 0.72, 3.35 - Math.abs(fold) * 0.045, -0.15);
      valance.castShadow = true;
      curtains.add(valance);
    }
    theaterEnvironment.add(curtains);

    const beam = new THREE.Mesh(
      new THREE.ConeGeometry(2.85, 7.4, 48, 1, true),
      new THREE.MeshBasicMaterial({ color: 0xfff2c2, transparent: true, opacity: 0.018, side: THREE.DoubleSide, depthWrite: false })
    );
    beam.position.set(0, 0.35, 0.3);
    theaterEnvironment.add(beam);

    const cabinet = new THREE.Group();
    const shelfMaterial = new THREE.MeshPhysicalMaterial({ color: 0x111b16, roughness: 0.46, metalness: 0.38, clearcoat: 0.78, clearcoatRoughness: 0.18 });
    const trimMaterial = new THREE.MeshPhysicalMaterial({ color: 0xc9a34e, emissive: 0x4f3610, emissiveIntensity: 0.22, roughness: 0.22, metalness: 0.9, clearcoat: 0.75 });
    const backMaterial = new THREE.MeshPhysicalMaterial({ color: 0x060a08, roughness: 0.96, metalness: 0.02 });
    const glassMaterial = new THREE.MeshPhysicalMaterial({ color: 0xbdebd9, transparent: true, opacity: 0.035, roughness: 0.12, metalness: 0.04, transmission: 0.18, thickness: 0.025, clearcoat: 1, depthWrite: false });
    const backWall = new THREE.Mesh(new THREE.BoxGeometry(5.65, 5.35, 0.16), backMaterial);
    backWall.position.set(0, 0.05, -1.52);
    backWall.receiveShadow = true;
    cabinet.add(backWall);
    [-1.03, 0.52].forEach((y) => {
      const innerShelf = new THREE.Mesh(new THREE.BoxGeometry(5.45, 0.07, 1.12), shelfMaterial);
      innerShelf.position.set(0, y, -0.82);
      innerShelf.receiveShadow = true;
      cabinet.add(innerShelf);
    });
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(5.95, 0.22, 1.72), shelfMaterial);
    shelf.position.set(0, -2.6, -0.56);
    shelf.castShadow = true;
    cabinet.add(shelf);
    [-2.83, 2.83].forEach((x) => {
      const upright = new THREE.Mesh(new THREE.BoxGeometry(0.13, 5.55, 0.24), trimMaterial);
      upright.position.set(x, 0.06, -1.23);
      upright.castShadow = true;
      cabinet.add(upright);
    });
    [-2.7, 2.78].forEach((y) => {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.13, 0.24), trimMaterial);
      rail.position.set(0, y, -1.23);
      rail.castShadow = true;
      cabinet.add(rail);
    });
    const glass = new THREE.Mesh(new THREE.BoxGeometry(5.7, 5.42, 0.07), glassMaterial);
    glass.position.set(0, 0.05, 0.42);
    cabinet.add(glass);
    [-2.1, 2.1].forEach((x) => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.8, 0.2), trimMaterial);
      leg.position.set(x, -3.0, -0.55);
      leg.rotation.z = x < 0 ? -0.08 : 0.08;
      cabinet.add(leg);
    });
    const foot = new THREE.Mesh(new THREE.BoxGeometry(4.75, 0.12, 0.36), trimMaterial);
    foot.position.set(0, -3.36, -0.5);
    cabinet.add(foot);
    theaterEnvironment.add(cabinet);

    const storageEnvironment = new THREE.Group();
    const leatherMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x101915,
      roughness: 0.7,
      metalness: 0.08,
      clearcoat: 0.3,
      clearcoatRoughness: 0.52
    });
    const leatherEdgeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x26352e,
      roughness: 0.6,
      clearcoat: 0.42,
      clearcoatRoughness: 0.4
    });
    const storageGold = new THREE.MeshStandardMaterial({ color: 0xc6a353, roughness: 0.32, metalness: 0.72 });
    const storageBackdrop = new THREE.Mesh(new THREE.BoxGeometry(12, 7.2, 0.18), new THREE.MeshStandardMaterial({ color: 0x06110d, roughness: 0.94 }));
    storageBackdrop.position.set(0, 0.15, -3.2);
    storageBackdrop.receiveShadow = true;
    storageEnvironment.add(storageBackdrop);
    const storageFloor = new THREE.Mesh(new THREE.PlaneGeometry(13, 8), new THREE.MeshPhysicalMaterial({ color: 0x10231b, roughness: 0.42, metalness: 0.1, clearcoat: 0.55 }));
    storageFloor.rotation.x = -Math.PI / 2;
    storageFloor.position.set(0, -3.08, 0.25);
    storageFloor.receiveShadow = true;
    storageEnvironment.add(storageFloor);

    const box = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(8.9, 0.36, 2.55), leatherMaterial);
    base.position.set(0, -2.5, -0.05);
    base.castShadow = true;
    base.receiveShadow = true;
    box.add(base);
    const backWallBox = new THREE.Mesh(new THREE.BoxGeometry(8.9, 1.55, 0.24), leatherMaterial);
    backWallBox.position.set(0, -1.68, -1.28);
    box.add(backWallBox);
    [-4.33, 4.33].forEach((x) => {
      const side = new THREE.Mesh(new THREE.BoxGeometry(0.24, 1.55, 2.35), leatherMaterial);
      side.position.set(x, -1.68, -0.04);
      side.castShadow = true;
      box.add(side);
    });
    const frontWallBox = new THREE.Mesh(new THREE.BoxGeometry(8.9, 1.08, 0.28), leatherMaterial);
    frontWallBox.position.set(0, -1.9, 1.18);
    frontWallBox.castShadow = true;
    box.add(frontWallBox);
    const frontInset = new THREE.Mesh(new THREE.BoxGeometry(7.95, 0.52, 0.04), leatherEdgeMaterial);
    frontInset.position.set(0, -1.9, 1.34);
    box.add(frontInset);
    [-3.96, 3.96].forEach((x) => {
      const stitch = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.9, 0.025), storageGold);
      stitch.position.set(x, -1.9, 1.37);
      box.add(stitch);
    });
    [-2.9, -1.45, 0, 1.45, 2.9].forEach((x) => {
      const divider = new THREE.Mesh(new THREE.BoxGeometry(0.065, 1.0, 2.05), leatherEdgeMaterial);
      divider.position.set(x, -1.6, -0.08);
      box.add(divider);
    });
    const lid = new THREE.Mesh(new THREE.BoxGeometry(8.65, 2.25, 0.22), leatherMaterial);
    lid.position.set(0, 0.08, -1.9);
    lid.rotation.x = -0.28;
    lid.castShadow = true;
    box.add(lid);
    const lidTrim = new THREE.Mesh(new THREE.BoxGeometry(7.95, 1.78, 0.03), leatherEdgeMaterial);
    lidTrim.position.set(0, 0.08, -1.78);
    lidTrim.rotation.x = -0.28;
    box.add(lidTrim);
    storageEnvironment.add(box);
    storageEnvironment.visible = false;
    scene.add(storageEnvironment);

    const cardLayer = new THREE.Group();
    scene.add(cardLayer);
    const interactiveMeshes = [];
    const cardGroups = new Map();
    const state = {
      dragging: null,
      x: 0,
      y: 0,
      startX: 0,
      startY: 0,
      moved: false,
      topZ: 0.4,
      mode: presentationCloset.displayMode === "storage" ? "storage" : "theater",
      storageIndex: 0,
      floatingId: ""
    };
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const resize = () => {
      const rect = els.closetCardStage.getBoundingClientRect();
      renderer.setSize(Math.max(rect.width, 1), Math.max(rect.height, 1), false);
      camera.aspect = Math.max(rect.width, 1) / Math.max(rect.height, 1);
      camera.updateProjectionMatrix();
    };
    new ResizeObserver(resize).observe(els.closetCardStage);
    resize();

    const hitCard = (event) => {
      const rect = els.closetCardStage.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / Math.max(rect.height, 1)) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      return raycaster.intersectObjects(interactiveMeshes, false)[0]?.object?.userData?.cardGroup || null;
    };
    const selectGroup = (group) => {
      if (!group) return;
      presentationCloset.selectedId = group.userData.itemId;
      state.topZ += 0.01;
      group.position.z = state.topZ;
      els.closetCardStage.dataset.selectedCard = group.userData.itemId;
      els.closetCardStage.dataset.selectedHolder = group.userData.format;
      els.closetCardStage.dataset.selectedDimensions = `${group.userData.width}x${group.userData.height}x${group.userData.depth}`;
      els.closetCardStage.dataset.selectedPosition = `${group.position.x.toFixed(3)},${group.position.y.toFixed(3)}`;
      els.closetCardStage.dataset.selectedCertification = group.userData.format === "psa"
        ? group.userData.certification.slice(-8)
        : group.userData.certification;
      savePresentationCloset();
      const item = selectedPresentationCard();
      if (els.closetSelectedName) els.closetSelectedName.textContent = item.name;
      if (els.closetCardFormat) els.closetCardFormat.value = item.format;
      if (els.closetCardGrade) {
        els.closetCardGrade.value = item.grade || "10";
        els.closetCardGrade.disabled = item.format === "raw";
      }
      els.closetCardRail?.querySelectorAll(".closet-card-option").forEach((option) => {
        const selected = option.querySelector("[data-closet-card-id]")?.dataset.closetCardId === item.id;
        option.classList.toggle("selected", selected);
        option.querySelector("[role=option]")?.setAttribute("aria-selected", selected ? "true" : "false");
      });
    };
    const start = (event) => {
      const group = hitCard(event);
      if (!group && state.mode !== "storage") return;
      state.dragging = group;
      state.x = event.clientX;
      state.y = event.clientY;
      state.startX = event.clientX;
      state.startY = event.clientY;
      state.moved = false;
      if (group) selectGroup(group);
      els.closetCardStage.setPointerCapture?.(event.pointerId);
    };
    const move = (event) => {
      if (!state.dragging && state.mode !== "storage") return;
      if (state.mode === "storage") {
        if (Math.hypot(event.clientX - state.startX, event.clientY - state.startY) > 8) state.moved = true;
        state.x = event.clientX;
        state.y = event.clientY;
        return;
      }
      const rect = els.closetCardStage.getBoundingClientRect();
      const dx = (event.clientX - state.x) / Math.max(rect.width, 1) * 6.2;
      const dy = -(event.clientY - state.y) / Math.max(rect.height, 1) * 5.1;
      state.dragging.position.x = Math.max(-2.25, Math.min(2.25, state.dragging.position.x + dx));
      state.dragging.position.y = Math.max(-1.88, Math.min(2.0, state.dragging.position.y + dy));
      state.dragging.userData.theaterPosition = {
        x: state.dragging.position.x,
        y: state.dragging.position.y,
        z: state.dragging.position.z
      };
      if (Math.hypot(event.clientX - state.startX, event.clientY - state.startY) > 6) state.moved = true;
      state.x = event.clientX;
      state.y = event.clientY;
    };
    const end = (event) => {
      const group = state.dragging;
      if (state.mode === "storage") {
        const deltaX = (event?.clientX || state.x) - state.startX;
        if (state.moved && Math.abs(deltaX) > 36) {
          runtime?.stepStorage(deltaX < 0 ? 1 : -1);
        } else if (group) {
          const id = group.userData.itemId;
          const index = [...cardGroups.keys()].indexOf(id);
          state.storageIndex = Math.max(0, index);
          state.floatingId = state.floatingId === id ? "" : id;
          presentationCloset.selectedId = id;
          savePresentationCloset();
          els.closetCardStage.dataset.lastAction = `${state.floatingId ? "float" : "return"}:${id}`;
        }
        state.dragging = null;
        state.moved = false;
        return;
      }
      if (!group) return;
      if (state.moved) {
        presentationCloset.placements[group.userData.itemId] = { x: group.position.x, y: group.position.y };
        els.closetCardStage.dataset.lastAction = `drag:${group.userData.itemId}`;
        els.closetCardStage.dataset.lastPosition = `${group.position.x.toFixed(3)},${group.position.y.toFixed(3)}`;
      } else {
        const id = group.userData.itemId;
        presentationCloset.flipped[id] = !presentationCloset.flipped[id];
        group.userData.targetY = presentationCloset.flipped[id] ? Math.PI : 0;
        els.closetCardStage.dataset.lastAction = `flip:${id}:${presentationCloset.flipped[id] ? "back" : "front"}`;
      }
      savePresentationCloset();
      state.dragging = null;
    };
    els.closetCardStage.addEventListener("pointerdown", start);
    els.closetCardStage.addEventListener("pointermove", move);
    els.closetCardStage.addEventListener("pointerup", end);
    els.closetCardStage.addEventListener("pointercancel", end);
    els.closetCardStage.addEventListener("wheel", (event) => {
      if (state.mode !== "storage") return;
      event.preventDefault();
      runtime?.stepStorage(Math.sign(event.deltaY || event.deltaX));
    }, { passive: false });
    let updateVersion = 0;
    let renderedSignature = "";
    const disposeCards = () => {
      interactiveMeshes.length = 0;
      cardGroups.clear();
      while (cardLayer.children.length) {
        const child = cardLayer.children.pop();
        child.traverse((node) => {
          node.geometry?.dispose?.();
          if (Array.isArray(node.material)) node.material.forEach((material) => { material.map?.dispose?.(); material.dispose?.(); });
          else { node.material?.map?.dispose?.(); node.material?.dispose?.(); }
        });
      }
    };
    const defaultPosition = (index) => ({
      x: (index % 3 - 1) * 1.65,
      y: 1.62 - Math.floor(index / 3) * 1.58
    });
    const buildCard = async (item, index, version) => {
      const format = normalizeCardHolder(item.format);
      const spec = CARD_HOLDER_SPECS[format];
      const [rawFront, rawBack] = await Promise.all([makeClosetCardTexture(item, "front"), makeClosetCardTexture(item, "back")]);
      if (version !== updateVersion) return null;
      const labelInfo = {
        id: item.id,
        name: item.name,
        subtitle: item.subtitle,
        certNumber: stableCertificationNumber(item.id, 10)
      };
      const frontCanvas = makeHolderSurfaceTexture(rawFront, format, item.grade, labelInfo);
      const backCanvas = makeHolderSurfaceTexture(rawBack, format, item.grade, labelInfo);
      const frontTexture = new THREE.CanvasTexture(frontCanvas);
      const backTexture = new THREE.CanvasTexture(backCanvas);
      [frontTexture, backTexture].forEach((texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
      });
      const scale = 0.285;
      const width = spec.width * scale;
      const height = spec.height * scale;
      const depth = Math.max(spec.depth * scale, 0.04);
      const group = new THREE.Group();
      group.userData = { itemId: item.id, targetY: item.flipped ? Math.PI : 0, format, width, height, depth, certification: labelInfo.certNumber };
      const shell = new THREE.Mesh(
        new THREE.BoxGeometry(width, height, depth),
        new THREE.MeshPhysicalMaterial({ color: format === "raw" ? 0x21333a : 0xdce8eb, transparent: true, opacity: format === "raw" ? 0.82 : 0.3, roughness: 0.18, metalness: 0.2, transmission: format === "raw" ? 0 : 0.18, clearcoat: 0.95 })
      );
      const faceGeometry = new THREE.PlaneGeometry(width * 0.965, height * 0.97);
      const front = new THREE.Mesh(faceGeometry, new THREE.MeshPhysicalMaterial({ map: frontTexture, roughness: 0.3, metalness: 0.08, clearcoat: 0.88 }));
      const back = new THREE.Mesh(faceGeometry, new THREE.MeshPhysicalMaterial({ map: backTexture, roughness: 0.34, metalness: 0.06, clearcoat: 0.72 }));
      front.position.z = depth / 2 + 0.006;
      back.position.z = -depth / 2 - 0.006;
      back.rotation.y = Math.PI;
      shell.castShadow = true;
      front.castShadow = true;
      back.castShadow = true;
      front.userData.cardGroup = group;
      back.userData.cardGroup = group;
      interactiveMeshes.push(front, back);
      group.add(shell, front, back);
      const placement = item.placement || defaultPosition(index);
      group.position.set(placement.x, placement.y, 0.14 + index * 0.006);
      group.userData.theaterPosition = { x: placement.x, y: placement.y, z: 0.14 + index * 0.006 };
      group.userData.itemIndex = index;
      group.castShadow = true;
      group.rotation.y = group.userData.targetY;
      cardGroups.set(item.id, group);
      return group;
    };
    const storageTarget = (index) => {
      const delta = index - state.storageIndex;
      const distance = Math.abs(delta);
      return {
        x: delta * 0.76,
        y: -0.78 - Math.min(distance, 4) * 0.045,
        z: 0.78 - distance * 0.12,
        rotationY: -delta * 0.1,
        scale: Math.max(0.74, 1.0 - distance * 0.045),
        visible: distance <= 4
      };
    };
    const runtime = {
      async updateItems(items) {
        const signature = items.map((item) => `${item.id}:${item.format}:${item.grade}:${text(item.front).length}:${text(item.back).length}`).join("|");
        if (signature === renderedSignature) {
          this.select(presentationCloset.selectedId);
          return;
        }
        renderedSignature = signature;
        const version = ++updateVersion;
        disposeCards();
        const groups = await Promise.all(items.map((item, index) => buildCard(item, index, version)));
        if (version !== updateVersion) return;
        groups.filter(Boolean).forEach((group) => cardLayer.add(group));
        const selectedIndex = items.findIndex((item) => item.id === presentationCloset.selectedId);
        state.storageIndex = selectedIndex >= 0 ? selectedIndex : 0;
        this.select(presentationCloset.selectedId);
      },
      select(id) {
        const group = cardGroups.get(id);
        selectGroup(group);
        if (state.mode === "storage" && group) {
          state.storageIndex = group.userData.itemIndex;
          state.floatingId = id;
        }
      },
      setMode(mode) {
        state.mode = mode === "storage" ? "storage" : "theater";
        presentationCloset.displayMode = state.mode;
        theaterEnvironment.visible = state.mode === "theater";
        storageEnvironment.visible = state.mode === "storage";
        els.closetCardStage.classList.toggle("storage-mode", state.mode === "storage");
        if (state.mode === "storage") {
          const selectedIndex = [...cardGroups.keys()].indexOf(presentationCloset.selectedId);
          state.storageIndex = selectedIndex >= 0 ? selectedIndex : 0;
        } else {
          state.floatingId = "";
          cardGroups.forEach((group) => {
            const target = group.userData.theaterPosition;
            group.position.set(target.x, target.y, target.z);
            group.scale.setScalar(1);
            group.rotation.x = 0;
            group.visible = true;
          });
        }
      },
      stepStorage(delta = 1) {
        if (state.mode !== "storage" || !cardGroups.size) return;
        const next = Math.max(0, Math.min(cardGroups.size - 1, state.storageIndex + (delta < 0 ? -1 : 1)));
        state.storageIndex = next;
        state.floatingId = "";
        const group = [...cardGroups.values()][next];
        if (group) selectGroup(group);
        els.closetCardStage.dataset.storageIndex = String(next);
      },
      reset() {
        presentationCloset.placements = {};
        presentationCloset.flipped = {};
        cardGroups.forEach((group, id) => {
          const index = presentationClosetCards().findIndex((item) => item.id === id);
          const position = defaultPosition(index);
          group.position.set(position.x, position.y, 0.1 + index * 0.005);
          group.userData.theaterPosition = { x: position.x, y: position.y, z: 0.1 + index * 0.005 };
          group.userData.targetY = 0;
        });
        state.storageIndex = 0;
        state.floatingId = "";
        savePresentationCloset();
      },
      getState() {
        return [...cardGroups.values()].map((group) => ({ id: group.userData.itemId, format: group.userData.format, x: group.position.x, y: group.position.y, rotationY: group.rotation.y, targetY: group.userData.targetY, width: group.userData.width, height: group.userData.height, depth: group.userData.depth }));
      }
    };
    presentationClosetRuntime = runtime;
    window.cardLedgerPresentationCloset = runtime;
    await runtime.updateItems(presentationClosetCards());
    runtime.setMode(presentationCloset.displayMode);
    els.closetCardStage.dataset.webglStatus = "running";

    let lastRenderAt = 0;
    const animate = (now = performance.now()) => {
      requestAnimationFrame(animate);
      if (document.hidden || activePage !== "collection" || els.closetCardStage.closest(".hidden")) return;
      if (now - lastRenderAt < 1000 / 32) return;
      lastRenderAt = now;
      cardGroups.forEach((group) => {
        if (state.mode === "storage") {
          const isFloating = state.floatingId === group.userData.itemId;
          const target = isFloating
            ? { x: 0, y: 1.08, z: 2.8, rotationY: group.rotation.y + 0.025, scale: 1.58, visible: true }
            : storageTarget(group.userData.itemIndex);
          group.visible = target.visible;
          group.position.x += (target.x - group.position.x) * 0.12;
          group.position.y += (target.y - group.position.y) * 0.12;
          group.position.z += (target.z - group.position.z) * 0.12;
          group.scale.x += (target.scale - group.scale.x) * 0.12;
          group.scale.y += (target.scale - group.scale.y) * 0.12;
          group.scale.z += (target.scale - group.scale.z) * 0.12;
          group.rotation.x += ((isFloating ? -0.04 : -0.14) - group.rotation.x) * 0.1;
          if (isFloating) group.rotation.y += 0.018;
          else group.rotation.y += (target.rotationY - group.rotation.y) * 0.14;
        } else {
          group.rotation.y += (group.userData.targetY - group.rotation.y) * 0.16;
        }
      });
      els.closetCardStage.dataset.webglFrame = String(Number(els.closetCardStage.dataset.webglFrame || 0) + 1);
      renderer.render(scene, camera);
    };
    animate();
  } catch (error) {
    els.closetCardStage.dataset.webglStatus = "failed";
    els.closetCardStage.classList.add("closet-3d-fallback");
    if (els.closetStatus) els.closetStatus.textContent = `3D display unavailable: ${error.message}`;
  }
}

async function initLandingHero3D() {
  if (!els.landingHeroCanvas || landingHeroRuntime || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  els.landingHeroCanvas.dataset.webglStatus = "starting";
  try {
    const THREE = await import("https://unpkg.com/three@0.160.0/build/three.module.js");
    els.landingHeroCanvas.dataset.webglStatus = "imported";
    const renderer = new THREE.WebGLRenderer({ canvas: els.landingHeroCanvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.4));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 90);
    camera.position.set(0, 0.35, 11);

    const rig = new THREE.Group();
    scene.add(rig);
    scene.add(new THREE.HemisphereLight(0xb8ffe0, 0x06100d, 1.15));
    const goldLight = new THREE.PointLight(0xe5c16e, 40, 22);
    goldLight.position.set(-5, 4, 6);
    scene.add(goldLight);
    const mintLight = new THREE.PointLight(0x9cd2b5, 32, 24);
    mintLight.position.set(5, -2, 5);
    scene.add(mintLight);

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x9cd2b5, transparent: true, opacity: 0.18 });
    const gridGroup = new THREE.Group();
    for (let i = -9; i <= 9; i += 1) {
      const horizontal = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-9, -2.9, i * 0.58), new THREE.Vector3(9, -2.9, i * 0.58)]);
      const vertical = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i, -2.9, -5.2), new THREE.Vector3(i, -2.9, 5.2)]);
      gridGroup.add(new THREE.Line(horizontal, lineMaterial), new THREE.Line(vertical, lineMaterial));
    }
    gridGroup.rotation.x = -0.22;
    rig.add(gridGroup);

    const slabMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0f4633,
      roughness: 0.42,
      metalness: 0.22,
      clearcoat: 0.72,
      clearcoatRoughness: 0.22,
      transparent: true,
      opacity: 0.42,
      side: THREE.DoubleSide
    });
    const slabEdgeMaterial = new THREE.MeshBasicMaterial({ color: 0xe5c16e, transparent: true, opacity: 0.45 });
    const slabs = [];
    const slabPositions = [
      [-4.8, 1.55, -1.8, -0.34, 0.62],
      [4.8, 1.05, -2.35, 0.26, -0.48],
      [-2.1, -1.28, -1.15, 0.2, 0.34],
      [2.65, -1.45, -0.65, -0.18, -0.28],
      [0.8, 2.05, -3.4, 0.12, 0.2]
    ];
    const entranceOffsets = [
      { x: -12, y: 2.8, rotationX: -0.42, rotationY: -0.78, rotationZ: -0.42 },
      { x: 1.4, y: 9, rotationX: 0.48, rotationY: 0.28, rotationZ: 0.34 },
      { x: 12, y: -1.8, rotationX: -0.24, rotationY: 0.82, rotationZ: 0.48 }
    ];
    slabPositions.forEach(([x, y, z, rx, ry], index) => {
      const slab = new THREE.Group();
      const body = new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.62, 0.045), slabMaterial.clone());
      const edge = new THREE.LineSegments(new THREE.EdgesGeometry(body.geometry), slabEdgeMaterial.clone());
      slab.add(body, edge);
      const targetRotationZ = index % 2 ? -0.1 : 0.12;
      const entrance = entranceOffsets[index];
      slab.position.set(entrance ? entrance.x : x, entrance ? entrance.y : y, z);
      slab.rotation.set(
        entrance ? entrance.rotationX : rx,
        entrance ? entrance.rotationY : ry,
        entrance ? entrance.rotationZ : targetRotationZ
      );
      slab.scale.setScalar(entrance ? 0.74 : 1);
      slab.userData = {
        targetPosition: new THREE.Vector3(x, y, z),
        targetRotation: new THREE.Euler(rx, ry, targetRotationZ),
        entranceIndex: entrance ? index : -1,
        settled: !entrance
      };
      slabs.push(slab);
      rig.add(slab);
    });

    const dotGeometry = new THREE.SphereGeometry(0.035, 12, 12);
    const dotMaterial = new THREE.MeshBasicMaterial({ color: 0x9cd2b5, transparent: true, opacity: 0.78 });
    const dots = [];
    for (let index = 0; index < 42; index += 1) {
      const dot = new THREE.Mesh(dotGeometry, dotMaterial.clone());
      dot.position.set((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 5.2, -1 - Math.random() * 5);
      dot.userData = { speed: 0.35 + Math.random() * 0.9, phase: Math.random() * Math.PI * 2 };
      dots.push(dot);
      rig.add(dot);
    }

    const pointer = { x: 0, y: 0 };
    const updatePointer = (event) => {
      const rect = els.landingHeroCanvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2;
      pointer.y = ((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * -2;
    };
    document.addEventListener("pointermove", updatePointer, { passive: true });

    const resize = () => {
      const rect = els.hero?.getBoundingClientRect() || els.landingHeroCanvas.getBoundingClientRect();
      renderer.setSize(Math.max(rect.width, 1), Math.max(rect.height, 1), false);
      camera.aspect = Math.max(rect.width, 1) / Math.max(rect.height, 1);
      camera.updateProjectionMatrix();
    };
    new ResizeObserver(resize).observe(els.hero || els.landingHeroCanvas);
    resize();

    const entranceStartedAt = performance.now();
    const easeOutQuart = (value) => 1 - Math.pow(1 - value, 4);
    let lastRenderAt = 0;
    function animate(now = performance.now()) {
      landingHeroRuntime.animationFrame = requestAnimationFrame(animate);
      if (document.hidden || activePage !== "landing") return;
      if (now - lastRenderAt < 1000 / 32) return;
      lastRenderAt = now;
      const time = now * 0.001;
      const entranceElapsed = (now - entranceStartedAt) / 1000;
      rig.rotation.y += (pointer.x * 0.09 - rig.rotation.y) * 0.035;
      rig.rotation.x += (pointer.y * 0.035 - rig.rotation.x) * 0.035;
      gridGroup.position.z = (time * 0.35) % 0.58;
      slabs.forEach((slab) => {
        if (slab.userData.settled) return;
        const delay = 1.35 + slab.userData.entranceIndex * 0.16;
        const progress = Math.min(Math.max((entranceElapsed - delay) / 1.18, 0), 1);
        if (progress <= 0) return;
        const eased = easeOutQuart(progress);
        slab.position.lerp(slab.userData.targetPosition, eased === 1 ? 1 : 0.075 + eased * 0.18);
        slab.rotation.x += (slab.userData.targetRotation.x - slab.rotation.x) * (0.075 + eased * 0.18);
        slab.rotation.y += (slab.userData.targetRotation.y - slab.rotation.y) * (0.075 + eased * 0.18);
        slab.rotation.z += (slab.userData.targetRotation.z - slab.rotation.z) * (0.075 + eased * 0.18);
        const scale = 0.74 + eased * 0.26;
        slab.scale.setScalar(scale);
        if (progress >= 1) {
          slab.position.copy(slab.userData.targetPosition);
          slab.rotation.copy(slab.userData.targetRotation);
          slab.scale.setScalar(1);
          slab.userData.settled = true;
        }
      });
      dots.forEach((dot) => {
        dot.position.y += Math.sin(time * dot.userData.speed + dot.userData.phase) * 0.0015;
        dot.material.opacity = 0.32 + Math.sin(time * dot.userData.speed + dot.userData.phase) * 0.22;
      });
      goldLight.position.x = -5 + Math.sin(time * 0.55) * 1.3;
      mintLight.position.y = -2 + Math.cos(time * 0.42) * 1.2;
      els.landingHeroCanvas.dataset.webglFrame = String(Number(els.landingHeroCanvas.dataset.webglFrame || 0) + 1);
      renderer.render(scene, camera);
    }

    landingHeroRuntime = { renderer, scene, camera, animationFrame: 0 };
    window.cardLedgerLandingHeroRuntime = landingHeroRuntime;
    els.landingHeroCanvas.dataset.webglStatus = "running";
    animate();
  } catch {
    els.landingHeroCanvas.dataset.webglStatus = "failed";
    els.landingHeroCanvas?.classList.add("hidden");
  }
}

async function initLandingCard3D() {
  if (!els.landingCardStage || !els.landingCardCanvas || els.landingCardStage.dataset.threeReady === "true") return;
  els.landingCardStage.dataset.threeReady = "true";
  els.landingCardStage.dataset.webglStatus = "starting";
  try {
    const THREE = await import("https://unpkg.com/three@0.160.0/build/three.module.js");
    els.landingCardStage.dataset.webglStatus = "imported";
    const renderer = new THREE.WebGLRenderer({ canvas: els.landingCardCanvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 10.5);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x1a2d24, 2.3));
    const keyLight = new THREE.DirectionalLight(0xf4d38a, 2.8);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0x9cd2b5, 2.2);
    rimLight.position.set(-3, 2, -4);
    scene.add(rimLight);
    const savedImages = loadLandingCardImages();
    saveLandingCardImages(savedImages);
    if (els.landingCardName) els.landingCardName.value = savedImages.name;
    if (els.landingCardFormat) els.landingCardFormat.value = savedImages.format;
    if (els.landingCardGrade) {
      els.landingCardGrade.value = savedImages.grade;
      els.landingCardGrade.disabled = savedImages.format === "raw";
    }
    els.landingCardStage.dataset.customFront = savedImages.front ? "true" : "false";
    els.landingCardStage.dataset.customBack = savedImages.back ? "true" : "false";
    const card = new THREE.Group();
    let front = null;
    let back = null;
    const cardSettings = { ...savedImages };
    const disposeLandingCard = () => {
      while (card.children.length) {
        const child = card.children.pop();
        child.traverse((node) => {
          node.geometry?.dispose?.();
          if (Array.isArray(node.material)) node.material.forEach((material) => { material.map?.dispose?.(); material.dispose?.(); });
          else { node.material?.map?.dispose?.(); node.material?.dispose?.(); }
        });
      }
    };
    const buildLandingHolder = async () => {
      const format = normalizeCardHolder(cardSettings.format);
      const spec = CARD_HOLDER_SPECS[format];
      const [rawFront, rawBack] = await Promise.all([
        makeCardTexture("front", cardSettings.front),
        makeCardTexture("back", cardSettings.back)
      ]);
      const labelInfo = {
        id: "landing-display-card",
        name: cardSettings.name,
        subtitle: "CARD LEDGER COLLECTION",
        certNumber: cardSettings.certNumber
      };
      const frontTexture = new THREE.CanvasTexture(makeHolderSurfaceTexture(rawFront, format, cardSettings.grade, labelInfo));
      const backTexture = new THREE.CanvasTexture(makeHolderSurfaceTexture(rawBack, format, cardSettings.grade, labelInfo));
      [frontTexture, backTexture].forEach((texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 8;
      });
      disposeLandingCard();
      const scale = 0.9;
      const width = spec.width * scale;
      const height = spec.height * scale;
      const depth = Math.max(spec.depth * scale, 0.05);
      const shell = new THREE.Mesh(
        new THREE.BoxGeometry(width, height, depth),
        new THREE.MeshPhysicalMaterial({ color: format === "raw" ? 0xd8aa55 : 0xdfe9ec, transparent: true, opacity: format === "raw" ? 0.86 : 0.32, roughness: 0.16, metalness: 0.2, transmission: format === "raw" ? 0 : 0.2, clearcoat: 0.98 })
      );
      const faceGeometry = new THREE.PlaneGeometry(width * 0.965, height * 0.97, 16, 16);
      front = new THREE.Mesh(faceGeometry, new THREE.MeshPhysicalMaterial({ map: frontTexture, roughness: 0.34, metalness: 0.12, clearcoat: 0.8 }));
      back = new THREE.Mesh(faceGeometry, new THREE.MeshPhysicalMaterial({ map: backTexture, roughness: 0.38, metalness: 0.1, clearcoat: 0.62 }));
      front.position.z = depth / 2 + 0.008;
      back.position.z = -depth / 2 - 0.008;
      back.rotation.y = Math.PI;
      card.add(shell, front, back);
      card.userData.dimensions = { format, width: spec.width, height: spec.height, depth: spec.depth };
      els.landingCardStage.dataset.holder = format;
      els.landingCardStage.dataset.holderDimensions = `${spec.width}x${spec.height}x${spec.depth}`;
      els.landingCardStage.dataset.certification = format === "psa" ? cardSettings.certNumber.slice(-8) : cardSettings.certNumber;
    };
    await buildLandingHolder();
    card.rotation.set(-0.18, 0.42, -0.06);
    scene.add(card);
    const target = { x: card.rotation.x, y: card.rotation.y };
    const state = { dragging: false, x: 0, y: 0, idle: true };
    const resize = () => {
      const rect = els.landingCardStage.getBoundingClientRect();
      renderer.setSize(Math.max(rect.width, 1), Math.max(rect.height, 1), false);
      camera.aspect = Math.max(rect.width, 1) / Math.max(rect.height, 1);
      camera.updateProjectionMatrix();
    };
    const start = (event) => {
      state.dragging = true;
      state.idle = false;
      els.landingCardStage.dataset.dragged = "true";
      state.x = event.clientX;
      state.y = event.clientY;
      els.landingCardStage.setPointerCapture?.(event.pointerId);
    };
    const move = (event) => {
      if (!state.dragging) return;
      target.y += (event.clientX - state.x) * 0.012;
      target.x += (event.clientY - state.y) * 0.01;
      state.x = event.clientX;
      state.y = event.clientY;
    };
    const end = () => {
      state.dragging = false;
      window.setTimeout(() => {
        state.idle = true;
      }, 900);
    };
    els.landingCardStage.addEventListener("pointerdown", start);
    els.landingCardStage.addEventListener("pointermove", move);
    els.landingCardStage.addEventListener("pointerup", end);
    els.landingCardStage.addEventListener("pointercancel", end);
    new ResizeObserver(resize).observe(els.landingCardStage);
    resize();
    landingCardRuntime = {
      THREE,
      async updateFace(side, imageUrl) {
        cardSettings[side] = imageUrl;
        await buildLandingHolder();
        els.landingCardStage.dataset[side === "front" ? "customFront" : "customBack"] = imageUrl ? "true" : "false";
      },
      async updateHolder(format, grade, name) {
        cardSettings.format = normalizeCardHolder(format);
        cardSettings.grade = text(grade) || "10";
        cardSettings.name = text(name) || "Card Ledger Showcase";
        await buildLandingHolder();
      },
      getState() {
        return { ...card.userData.dimensions, rotationY: card.rotation.y };
      }
    };
    window.cardLedgerLandingCardRuntime = landingCardRuntime;
    els.landingCardStage.dataset.webglStatus = "running";
    let lastRenderAt = 0;
    function animate(now = performance.now()) {
      requestAnimationFrame(animate);
      if (document.hidden || activePage !== "landing") return;
      if (now - lastRenderAt < 1000 / 32) return;
      lastRenderAt = now;
      if (state.idle) target.y += 0.006;
      card.rotation.x += (target.x - card.rotation.x) * 0.12;
      card.rotation.y += (target.y - card.rotation.y) * 0.12;
      card.rotation.z = Math.sin(now * 0.001) * 0.04;
      els.landingCardStage.dataset.webglFrame = String(Number(els.landingCardStage.dataset.webglFrame || 0) + 1);
      renderer.render(scene, camera);
    }
    animate();
  } catch {
    els.landingCardStage.dataset.webglStatus = "failed";
    els.landingCardStage.classList.add("three-fallback");
    els.landingCardStage.innerHTML = '<div class="fallback-3d-card"><strong>Card Ledger</strong><span>3D preview unavailable</span></div>';
  }
}

function diyLocale(english, chinese) {
  return currentLanguage === "zh-CN" ? chinese : english;
}

function diySeriesDefinition(value) {
  const normalized = text(value).trim().toLowerCase();
  return DIY_SERIES_LIBRARY.find((series) => [series.id, series.name.toLowerCase(), series.nameZh].includes(normalized)) || null;
}

function diyPlayerDefinition(value) {
  const normalized = text(value).trim().toLowerCase();
  return DIY_PLAYER_LIBRARY.find((player) => [player.id, player.name.toLowerCase()].includes(normalized)) || null;
}

function diyCurrentDraft() {
  const seriesName = text(document.querySelector("#diySeries")?.value) || "City Lights";
  const playerName = text(document.querySelector("#diyPlayer")?.value) || diyLocale("Original Subject", "原创主题");
  const selectedSeries = diySeriesDefinition(seriesName) || diySeriesDefinition(document.querySelector("#diySeriesTemplate")?.value) || DIY_SERIES_LIBRARY[0];
  const selectedPlayer = diyPlayerDefinition(playerName) || diyPlayerDefinition(document.querySelector("#diyPlayerImage")?.value);
  return {
    series: seriesName,
    player: playerName,
    parallel: text(document.querySelector("#diyParallel")?.value) || "Base",
    cardNumber: text(document.querySelector("#diyNumber")?.value) || "D-01",
    printRun: numeric(document.querySelector("#diyPrintRun")?.value),
    finish: text(document.querySelector("#diyFinish")?.value) || "Digital print",
    title: text(document.querySelector("#diyTitleInput")?.value) || selectedSeries.tagline,
    description: text(document.querySelector("#diyDescription")?.value),
    seriesTemplate: selectedSeries.id,
    playerImage: selectedPlayer?.id || "",
    creator: diyCurrentOwnerName(),
    seriesDefinition: selectedSeries,
    playerDefinition: selectedPlayer
  };
}

function diyRoundedPath(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function diyFitText(ctx, value, maxWidth, startSize, minimumSize = 18, weight = 800) {
  let size = startSize;
  const content = text(value);
  while (size > minimumSize) {
    ctx.font = `${weight} ${size}px "Hanken Grotesk", system-ui, sans-serif`;
    if (ctx.measureText(content).width <= maxWidth) break;
    size -= 2;
  }
  return size;
}

function diyDrawSeriesPattern(ctx, series, width, height) {
  ctx.save();
  ctx.globalAlpha = 0.34;
  ctx.strokeStyle = series.accent;
  ctx.fillStyle = series.accent;
  if (series.id === "city-lights") {
    for (let index = 0; index < 12; index += 1) {
      const buildingWidth = 34 + ((index * 17) % 45);
      const buildingHeight = 80 + ((index * 47) % 250);
      const x = index * 68 - 25;
      ctx.fillRect(x, height - buildingHeight - 115, buildingWidth, buildingHeight);
      ctx.clearRect(x + 9, height - buildingHeight - 94, 5, 9);
      ctx.clearRect(x + 21, height - buildingHeight - 67, 5, 9);
    }
  } else if (series.id === "future-icons") {
    for (let index = -3; index < 8; index += 1) {
      ctx.lineWidth = 12;
      ctx.beginPath();
      ctx.moveTo(index * 145, height);
      ctx.lineTo(index * 145 + 420, 0);
      ctx.stroke();
    }
    ctx.globalAlpha = 0.18;
    ctx.beginPath();
    ctx.arc(width * 0.72, height * 0.27, 210, 0, Math.PI * 2);
    ctx.stroke();
  } else if (series.id === "legends-recut") {
    ctx.lineWidth = 3;
    for (let inset = 24; inset < 95; inset += 18) {
      ctx.strokeRect(inset, inset, width - inset * 2, height - inset * 2);
    }
    for (let index = 0; index < 18; index += 1) {
      ctx.fillRect(52 + index * 38, 82, 2, height - 164);
    }
  } else if (series.id === "velocity") {
    ctx.lineCap = "round";
    for (let index = 0; index < 10; index += 1) {
      ctx.lineWidth = 4 + (index % 3) * 3;
      ctx.beginPath();
      ctx.moveTo(-80, 170 + index * 73);
      ctx.lineTo(width + 120, 50 + index * 68);
      ctx.stroke();
    }
  } else if (series.id === "crown-atelier") {
    ctx.lineWidth = 3;
    for (let index = 0; index < 4; index += 1) {
      const inset = 34 + index * 19;
      diyRoundedPath(ctx, inset, inset, width - inset * 2, height - inset * 2, 30);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(width / 2 - 100, 118);
    ctx.lineTo(width / 2 - 45, 55);
    ctx.lineTo(width / 2, 118);
    ctx.lineTo(width / 2 + 45, 55);
    ctx.lineTo(width / 2 + 100, 118);
    ctx.stroke();
  } else {
    const spotlight = ctx.createRadialGradient(width / 2, 190, 10, width / 2, 190, width * 0.65);
    spotlight.addColorStop(0, "rgba(255,255,255,0.55)");
    spotlight.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = spotlight;
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = series.accent;
    ctx.lineWidth = 2;
    for (let index = 0; index < 7; index += 1) {
      ctx.beginPath();
      ctx.arc(width / 2, height + 70, 160 + index * 62, Math.PI, Math.PI * 2);
      ctx.stroke();
    }
  }
  ctx.restore();
}

function diyDrawParallelEffect(ctx, draft, width, height) {
  const parallel = text(draft.parallel).toLowerCase();
  ctx.save();
  if (parallel.includes("aurora") || parallel.includes("prism") || parallel.includes("refractor")) {
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = 0.24;
    const rainbow = ["#ff477e", "#ffca3a", "#8ac926", "#31d8ff", "#8b5cf6"];
    rainbow.forEach((color, index) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.moveTo(-120 + index * 95, height);
      ctx.lineTo(width * 0.65 + index * 80, 0);
      ctx.stroke();
    });
  }
  if (parallel.includes("gold")) {
    ctx.globalAlpha = 0.72;
    ctx.strokeStyle = "#f6cf6d";
    ctx.lineWidth = 8;
    diyRoundedPath(ctx, 23, 23, width - 46, height - 46, 28);
    ctx.stroke();
  }
  if (parallel.includes("neon")) {
    ctx.shadowColor = "#58ffe0";
    ctx.shadowBlur = 28;
    ctx.strokeStyle = "#72f2d0";
    ctx.lineWidth = 5;
    diyRoundedPath(ctx, 35, 35, width - 70, height - 70, 24);
    ctx.stroke();
  }
  if (parallel.includes("red")) {
    ctx.globalAlpha = 0.5;
    ctx.strokeStyle = "#ff4f61";
    ctx.lineWidth = 12;
    for (let index = 0; index < 5; index += 1) {
      ctx.beginPath();
      ctx.arc(width + 40, height * 0.28, 110 + index * 52, 0.45 * Math.PI, 1.55 * Math.PI);
      ctx.stroke();
    }
  }
  ctx.restore();
}

function diyDrawFrontCard(ctx, draft, playerImage) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const series = draft.seriesDefinition;
  const background = ctx.createLinearGradient(0, 0, width, height);
  background.addColorStop(0, series.colors[0]);
  background.addColorStop(0.54, series.colors[1]);
  background.addColorStop(1, series.colors[2]);
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);
  diyDrawSeriesPattern(ctx, series, width, height);

  ctx.save();
  diyRoundedPath(ctx, 38, 126, width - 76, 655, 25);
  ctx.clip();
  if (playerImage) {
    drawCoverImage(ctx, playerImage, 38, 126, width - 76, 655);
  } else {
    const monogram = draft.player
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
    const silhouette = ctx.createRadialGradient(width / 2, 360, 20, width / 2, 360, 360);
    silhouette.addColorStop(0, "rgba(255,255,255,0.24)");
    silhouette.addColorStop(1, "rgba(0,0,0,0.2)");
    ctx.fillStyle = silhouette;
    ctx.fillRect(38, 126, width - 76, 655);
    ctx.fillStyle = "rgba(255,255,255,0.86)";
    ctx.textAlign = "center";
    ctx.font = '900 180px "Hanken Grotesk", system-ui, sans-serif';
    ctx.fillText(monogram || "DIY", width / 2, 510);
  }
  const photoShade = ctx.createLinearGradient(0, 126, 0, 781);
  photoShade.addColorStop(0, "rgba(0,0,0,0.03)");
  photoShade.addColorStop(0.65, "rgba(0,0,0,0.04)");
  photoShade.addColorStop(1, "rgba(0,0,0,0.86)");
  ctx.fillStyle = photoShade;
  ctx.fillRect(38, 126, width - 76, 655);
  ctx.restore();

  ctx.strokeStyle = series.accent;
  ctx.lineWidth = 4;
  diyRoundedPath(ctx, 38, 126, width - 76, 655, 25);
  ctx.stroke();

  ctx.textAlign = "left";
  ctx.fillStyle = series.accent;
  ctx.font = '800 25px "Hanken Grotesk", system-ui, sans-serif';
  ctx.fillText(currentLanguage === "zh-CN" ? series.nameZh : series.name.toUpperCase(), 48, 79);
  ctx.fillStyle = "rgba(255,255,255,0.76)";
  ctx.font = '700 18px "Hanken Grotesk", system-ui, sans-serif';
  ctx.fillText(currentLanguage === "zh-CN" ? series.taglineZh : series.tagline.toUpperCase(), 48, 106);

  ctx.textAlign = "right";
  ctx.fillStyle = "rgba(255,255,255,0.78)";
  ctx.font = '800 17px "Hanken Grotesk", system-ui, sans-serif';
  ctx.fillText(diyLocale("DIY / UNOFFICIAL", "自制卡 / 非官方"), width - 48, 72);
  ctx.fillStyle = series.accent;
  ctx.fillText(draft.cardNumber, width - 48, 99);

  ctx.textAlign = "left";
  ctx.fillStyle = "#ffffff";
  const playerSize = diyFitText(ctx, draft.player.toUpperCase(), width - 96, 56, 28, 900);
  ctx.font = `900 ${playerSize}px "Hanken Grotesk", system-ui, sans-serif`;
  ctx.fillText(draft.player.toUpperCase(), 48, 854);
  ctx.fillStyle = series.accent;
  const titleSize = diyFitText(ctx, draft.title.toUpperCase(), width - 96, 30, 18, 800);
  ctx.font = `800 ${titleSize}px "Hanken Grotesk", system-ui, sans-serif`;
  ctx.fillText(draft.title.toUpperCase(), 48, 896);

  ctx.fillStyle = "rgba(6,10,9,0.72)";
  diyRoundedPath(ctx, 48, 927, width - 96, 49, 15);
  ctx.fill();
  ctx.fillStyle = "#f8fbfa";
  ctx.font = '800 17px "Hanken Grotesk", system-ui, sans-serif';
  ctx.fillText(draft.parallel.toUpperCase(), 66, 958);
  ctx.textAlign = "right";
  const edition = draft.printRun ? `${draft.cardNumber}  /${draft.printRun}` : draft.cardNumber;
  ctx.fillText(edition, width - 66, 958);
  diyDrawParallelEffect(ctx, draft, width, height);
}

function diyDrawBackCard(ctx, draft) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const series = draft.seriesDefinition;
  const player = draft.playerDefinition;
  const background = ctx.createLinearGradient(0, 0, width, height);
  background.addColorStop(0, series.colors[0]);
  background.addColorStop(0.58, series.colors[1]);
  background.addColorStop(1, "#050807");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);
  diyDrawSeriesPattern(ctx, series, width, height);
  ctx.fillStyle = "rgba(4,8,7,0.68)";
  diyRoundedPath(ctx, 42, 42, width - 84, height - 84, 28);
  ctx.fill();
  ctx.strokeStyle = series.accent;
  ctx.lineWidth = 4;
  diyRoundedPath(ctx, 42, 42, width - 84, height - 84, 28);
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.fillStyle = series.accent;
  ctx.font = '900 26px "Hanken Grotesk", system-ui, sans-serif';
  ctx.fillText(currentLanguage === "zh-CN" ? series.nameZh : series.name.toUpperCase(), width / 2, 115);
  ctx.fillStyle = "#ffffff";
  const nameSize = diyFitText(ctx, draft.player.toUpperCase(), width - 130, 48, 25, 900);
  ctx.font = `900 ${nameSize}px "Hanken Grotesk", system-ui, sans-serif`;
  ctx.fillText(draft.player.toUpperCase(), width / 2, 190);
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.font = '700 22px "Hanken Grotesk", system-ui, sans-serif';
  ctx.fillText(draft.title, width / 2, 232);

  const initials = draft.player
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.font = '900 245px "Hanken Grotesk", system-ui, sans-serif';
  ctx.fillText(initials || "DIY", width / 2, 480);

  ctx.textAlign = "left";
  const detailRows = [
    [diyLocale("SERIES", "系列"), draft.series],
    [diyLocale("PARALLEL", "平行版本"), draft.parallel],
    [diyLocale("FINISH", "工艺"), draft.finish],
    [diyLocale("EDITION", "限量"), draft.printRun ? `${draft.cardNumber} /${draft.printRun}` : draft.cardNumber],
    [diyLocale("CREATOR", "创作者"), draft.creator]
  ];
  detailRows.forEach(([label, value], index) => {
    const y = 555 + index * 62;
    ctx.fillStyle = series.accent;
    ctx.font = '800 16px "Hanken Grotesk", system-ui, sans-serif';
    ctx.fillText(label, 78, y);
    ctx.fillStyle = "#ffffff";
    const valueSize = diyFitText(ctx, value, width - 285, 22, 16, 700);
    ctx.font = `700 ${valueSize}px "Hanken Grotesk", system-ui, sans-serif`;
    ctx.fillText(value, 245, y);
  });

  ctx.fillStyle = "rgba(255,255,255,0.1)";
  ctx.fillRect(78, 868, width - 156, 1);
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.font = '700 16px "Hanken Grotesk", system-ui, sans-serif';
  ctx.fillText(diyLocale("UNOFFICIAL CREATOR CARD - NOT A LICENSED ISSUE", "非官方创作者卡 - 非卡厂授权发行"), 78, 906);
  ctx.fillStyle = "rgba(255,255,255,0.54)";
  ctx.font = '600 13px "Hanken Grotesk", system-ui, sans-serif';
  const credit = player
    ? `${diyLocale("Photo", "图片")}: ${player.credit} · ${player.license}`
    : diyLocale("Original text-only subject treatment", "原创文字主题设计");
  const creditSize = diyFitText(ctx, credit, width - 156, 13, 10, 600);
  ctx.font = `600 ${creditSize}px "Hanken Grotesk", system-ui, sans-serif`;
  ctx.fillText(credit, 78, 940);
  ctx.fillStyle = series.accent;
  ctx.font = '800 14px "Hanken Grotesk", system-ui, sans-serif';
  ctx.fillText(diyLocale("CARD LEDGER CREATOR STUDIO", "卡藏创作者工坊"), 78, 970);
}

async function generateDIYCardFaces(draft = diyCurrentDraft()) {
  const playerImage = draft.playerDefinition?.image
    ? await imageFromDataUrl(draft.playerDefinition.image).catch(() => null)
    : null;
  const frontCanvas = document.createElement("canvas");
  const backCanvas = document.createElement("canvas");
  frontCanvas.width = backCanvas.width = 720;
  frontCanvas.height = backCanvas.height = 1008;
  diyDrawFrontCard(frontCanvas.getContext("2d"), draft, playerImage);
  diyDrawBackCard(backCanvas.getContext("2d"), draft);
  return {
    front: frontCanvas.toDataURL("image/jpeg", 0.86),
    back: backCanvas.toDataURL("image/jpeg", 0.84),
    draft
  };
}

function renderDIYGeneratorChoices() {
  const selectedSeries = text(document.querySelector("#diySeriesTemplate")?.value) || DIY_SERIES_LIBRARY[0].id;
  const selectedPlayer = text(document.querySelector("#diyPlayerImage")?.value);
  const seriesChoices = document.querySelector("#diySeriesTemplateChoices");
  const playerChoices = document.querySelector("#diyPlayerImageChoices");
  if (seriesChoices) {
    seriesChoices.innerHTML = DIY_SERIES_LIBRARY.map(
      (series) => `
        <button class="diy-series-option ${series.id === selectedSeries ? "selected" : ""}" type="button" data-diy-series-template="${escapeHtml(series.id)}" style="--series-a:${series.colors[0]};--series-b:${series.colors[1]};--series-accent:${series.accent}">
          <strong>${escapeHtml(currentLanguage === "zh-CN" ? series.nameZh : series.name)}</strong>
          <small>${escapeHtml(currentLanguage === "zh-CN" ? series.taglineZh : series.tagline)}</small>
        </button>
      `
    ).join("");
  }
  if (playerChoices) {
    playerChoices.innerHTML = DIY_PLAYER_LIBRARY.map(
      (player) => `
        <button class="diy-player-option ${player.id === selectedPlayer ? "selected" : ""}" type="button" data-diy-player-image="${escapeHtml(player.id)}" title="${escapeHtml(`${player.name} - ${player.license}`)}">
          <img src="${escapeHtml(player.image)}" alt="" />
          <span>${escapeHtml(player.name)}</span>
        </button>
      `
    ).join("");
  }
  const player = diyPlayerDefinition(selectedPlayer);
  const credit = document.querySelector("#diyGeneratorCredit");
  if (credit) {
    credit.textContent = player
      ? diyLocale(`Photo: ${player.credit} (${player.license}). Credit is printed on the generated back.`, `图片：${player.credit}（${player.license}）。署名会印在自动生成的卡背。`)
      : diyLocale("Custom subjects use a text-only image treatment unless you upload a photo.", "自定义球员在未上传照片时会使用文字主题设计。");
  }
}

function selectDIYSeriesTemplate(seriesId) {
  const series = diySeriesDefinition(seriesId);
  if (!series) return;
  const hidden = document.querySelector("#diySeriesTemplate");
  if (hidden) hidden.value = series.id;
  const seriesInput = document.querySelector("#diySeries");
  if (seriesInput) seriesInput.value = series.name;
  const recommended = {
    "city-lights": ["Neon Foil", "Night Court"],
    "future-icons": ["Aurora Prism", "Orbit"],
    "legends-recut": ["Gold Canvas", "Final Frame"],
    velocity: ["Red Wave", "Breakaway"],
    "crown-atelier": ["Black Gold", "Royal Study"],
    "stadium-noir": ["Silver Refractor", "After Hours"]
  }[series.id];
  if (recommended) {
    const parallel = document.querySelector("#diyParallel");
    const title = document.querySelector("#diyTitleInput");
    if (parallel) parallel.value = recommended[0];
    if (title) title.value = recommended[1];
  }
  renderDIYGeneratorChoices();
  scheduleDIYGeneratedPreview(0);
}

function selectDIYPlayerImage(playerId) {
  const player = diyPlayerDefinition(playerId);
  if (!player) return;
  const hidden = document.querySelector("#diyPlayerImage");
  if (hidden) hidden.value = player.id;
  const input = document.querySelector("#diyPlayer");
  if (input) input.value = player.name;
  renderDIYGeneratorChoices();
  scheduleDIYGeneratedPreview(0);
}

function syncDIYGeneratorSelectionFromText(inputType) {
  if (inputType === "player") {
    const player = diyPlayerDefinition(document.querySelector("#diyPlayer")?.value);
    const hidden = document.querySelector("#diyPlayerImage");
    if (hidden) hidden.value = player?.id || "";
  } else {
    const series = diySeriesDefinition(document.querySelector("#diySeries")?.value);
    const hidden = document.querySelector("#diySeriesTemplate");
    if (series && hidden) hidden.value = series.id;
  }
  renderDIYGeneratorChoices();
  scheduleDIYGeneratedPreview();
}

function scheduleDIYGeneratedPreview(delay = 180) {
  window.clearTimeout(diyPreviewTimer);
  diyPreviewTimer = window.setTimeout(() => previewDIYUpload(), delay);
}

function diyCurrentOwnerId() {
  return text(supabaseSettings.userId || account.email || account.phone || "local-collector").toLowerCase();
}

function diyCurrentOwnerName() {
  return text(account.name || account.email || account.phone || "Card Ledger Collector");
}

function diyCardTitle(card) {
  return text(card.title) || [card.series, card.player].filter(Boolean).join(" ") || "Untitled DIY card";
}

function diyCardEdition(card) {
  return [card.cardNumber, card.printRun ? `/${card.printRun}` : ""].filter(Boolean).join(" ");
}

function diyOwnsCard(card) {
  return !card?.starter && (!card.ownerId || text(card.ownerId).toLowerCase() === diyCurrentOwnerId());
}

function diyOwnsListing(listing) {
  return !listing?.starter && text(listing.ownerId).toLowerCase() === diyCurrentOwnerId();
}

function diyPalette(card) {
  if (Array.isArray(card.colors) && card.colors.length >= 2) return card.colors;
  const palettes = [
    ["#0f6a5a", "#19284c"],
    ["#74430f", "#28183f"],
    ["#155273", "#3f1434"],
    ["#5b276e", "#123e45"],
    ["#6c2825", "#263c6b"]
  ];
  const seed = [card.series, card.player, card.parallel].join("").split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return palettes[seed % palettes.length];
}

function diyCardVisualMarkup(card, imageSide = "front") {
  const includedPlayer = diyPlayerDefinition(card.playerImage || card.player);
  const image = imageSide === "back" ? card.back : card.front || includedPlayer?.image;
  const [colorA, colorB] = diyPalette(card);
  const initials = text(card.player || card.series || "DIY")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  return `
    <div class="diy-card-visual" style="--diy-color-a:${colorA};--diy-color-b:${colorB}">
      ${image ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(`${diyCardTitle(card)} ${imageSide}`)}" />` : `<span class="diy-card-monogram">${escapeHtml(initials || "DIY")}</span>`}
      <span class="diy-unofficial-badge">${diyLocale("DIY / Unofficial", "自制卡 / 非官方")}</span>
    </div>
  `;
}

function diyListingTypeLabel(type) {
  if (type === "sale") return diyLocale("For sale", "可出售");
  if (type === "trade") return diyLocale("For trade", "可交换");
  return diyLocale("Display only", "仅展示");
}

function diyUniqueValues(key) {
  return [...new Set(diyCards.map((card) => text(card[key])).filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function diySetSelectOptions(select, values, emptyLabel) {
  if (!select) return;
  const previous = select.value;
  select.innerHTML = `<option value="">${escapeHtml(emptyLabel)}</option>${values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("")}`;
  if (values.includes(previous)) select.value = previous;
}

function diySetDatalistOptions(id, values) {
  const datalist = document.querySelector(`#${id}`);
  if (datalist) datalist.innerHTML = values.map((value) => `<option value="${escapeHtml(value)}"></option>`).join("");
}

function renderDIYMarketplace() {
  const area = document.querySelector("#diyArea");
  if (!area) return;
  renderDIYGeneratorChoices();
  const search = text(document.querySelector("#diySearch")?.value).toLowerCase();
  const seriesFilter = text(document.querySelector("#diySeriesFilter")?.value);
  const playerFilter = text(document.querySelector("#diyPlayerFilter")?.value);
  const parallelFilter = text(document.querySelector("#diyParallelFilter")?.value);
  const libraryGrid = document.querySelector("#diyLibraryGrid");
  const libraryEmpty = document.querySelector("#diyLibraryEmpty");
  const series = [...new Set([...DIY_SERIES_LIBRARY.map((item) => item.name), ...diyUniqueValues("series")])].sort((a, b) => a.localeCompare(b));
  const players = [...new Set([...DIY_PLAYER_LIBRARY.map((item) => item.name), ...diyUniqueValues("player")])].sort((a, b) => a.localeCompare(b));
  const parallels = [...new Set([...DIY_PARALLEL_LIBRARY, ...diyUniqueValues("parallel")])].sort((a, b) => a.localeCompare(b));

  diySetDatalistOptions("diySeriesOptions", series);
  diySetDatalistOptions("diyPlayerOptions", players);
  diySetDatalistOptions("diyParallelOptions", parallels);
  diySetSelectOptions(document.querySelector("#diySeriesFilter"), series, diyLocale("All series", "全部系列"));
  diySetSelectOptions(document.querySelector("#diyPlayerFilter"), players, diyLocale("All players", "全部球员"));
  diySetSelectOptions(document.querySelector("#diyParallelFilter"), parallels, diyLocale("All parallels", "全部平行版本"));

  const filteredCards = diyCards.filter((card) => {
    const haystack = [card.title, card.series, card.player, card.parallel, card.cardNumber, card.finish, card.description, card.ownerName].join(" ").toLowerCase();
    return (!search || haystack.includes(search)) && (!seriesFilter || card.series === seriesFilter) && (!playerFilter || card.player === playerFilter) && (!parallelFilter || card.parallel === parallelFilter);
  });
  const summary = document.querySelector("#diyLibrarySummary");
  if (summary) summary.textContent = diyLocale(`${filteredCards.length} original cards`, `${filteredCards.length} 张原创卡`);
  if (libraryEmpty) libraryEmpty.classList.toggle("hidden", filteredCards.length > 0);
  if (libraryGrid) {
    libraryGrid.innerHTML = filteredCards
      .map((card) => {
        const owned = diyOwnsCard(card);
        return `
          <article class="diy-card" data-diy-card="${escapeHtml(card.id)}">
            ${diyCardVisualMarkup(card)}
            <div class="diy-card-body">
              <div>
                <h4>${escapeHtml(diyCardTitle(card))}</h4>
                <small>${escapeHtml(card.ownerName || diyLocale("Unknown creator", "未知创作者"))}</small>
              </div>
              <div class="diy-card-meta">
                <span>${escapeHtml(card.series)}</span>
                <span>${escapeHtml(card.player)}</span>
                <span>${escapeHtml(card.parallel)}</span>
                ${diyCardEdition(card) ? `<span>${escapeHtml(diyCardEdition(card))}</span>` : ""}
              </div>
              <p>${escapeHtml(card.description || diyLocale("No creator notes yet.", "暂无创作说明。"))}</p>
              <div class="diy-card-actions">
                ${
                  card.starter
                    ? `<button class="ghost-button compact-button" type="button" data-diy-action="copy" data-diy-id="${escapeHtml(card.id)}">${diyLocale("Use template", "使用模板")}</button>`
                    : `<button class="primary-button compact-button" type="button" data-diy-action="list" data-diy-id="${escapeHtml(card.id)}">${diyLocale("List card", "发布卡片")}</button>`
                }
                ${card.back ? `<button class="icon-command" type="button" data-diy-action="flip" data-diy-id="${escapeHtml(card.id)}" title="${diyLocale("Show back", "查看背面")}" aria-label="${diyLocale("Show back", "查看背面")}"><span class="material-symbols-outlined" aria-hidden="true">flip</span></button>` : ""}
                ${owned ? `<button class="icon-command" type="button" data-diy-action="delete" data-diy-id="${escapeHtml(card.id)}" title="${diyLocale("Delete DIY card", "删除自制卡")}" aria-label="${diyLocale("Delete DIY card", "删除自制卡")}"><span class="material-symbols-outlined" aria-hidden="true">delete</span></button>` : ""}
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  const listingCardSelect = document.querySelector("#diyListingCard");
  const ownedCards = diyCards.filter((card) => diyOwnsCard(card) && text(card.front));
  if (listingCardSelect) {
    const previous = listingCardSelect.value;
    listingCardSelect.innerHTML = `<option value="">${diyLocale("Choose a DIY card", "选择一张自制卡")}</option>${ownedCards.map((card) => `<option value="${escapeHtml(card.id)}">${escapeHtml(`${diyCardTitle(card)} · ${card.parallel}`)}</option>`).join("")}`;
    if (ownedCards.some((card) => card.id === previous)) listingCardSelect.value = previous;
  }

  const marketFilter = text(document.querySelector("#diyMarketFilter")?.value);
  const marketSort = text(document.querySelector("#diyMarketSort")?.value) || "newest";
  const marketGrid = document.querySelector("#diyMarketGrid");
  const marketEmpty = document.querySelector("#diyMarketEmpty");
  const activeListings = diyListings
    .filter((listing) => !listing.archived && (!marketFilter || listing.type === marketFilter) && diyCards.some((card) => card.id === listing.cardId))
    .sort((a, b) => {
      if (marketSort === "priceLow") return numeric(a.price) - numeric(b.price);
      if (marketSort === "priceHigh") return numeric(b.price) - numeric(a.price);
      if (marketSort === "popular") return numeric(b.requests) - numeric(a.requests);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  const marketSummary = document.querySelector("#diyMarketSummary");
  if (marketSummary) marketSummary.textContent = diyLocale(`${activeListings.length} active listings`, `${activeListings.length} 条有效发布`);
  if (marketEmpty) marketEmpty.classList.toggle("hidden", activeListings.length > 0);
  if (marketGrid) {
    marketGrid.innerHTML = activeListings
      .map((listing) => {
        const card = diyCards.find((item) => item.id === listing.cardId);
        const owner = diyOwnsListing(listing);
        const actionLabel = listing.type === "sale" ? diyLocale("Purchase request", "购买咨询") : listing.type === "trade" ? diyLocale("Propose trade", "提出交换") : diyLocale("Message creator", "联系创作者");
        return `
          <article class="diy-listing-card" data-listing-type="${escapeHtml(listing.type)}">
            ${diyCardVisualMarkup(card)}
            <span class="diy-listing-type">${escapeHtml(diyListingTypeLabel(listing.type))}</span>
            <div class="diy-card-body">
              <div class="diy-listing-owner">
                <span><strong>${escapeHtml(listing.ownerName || "Creator")}</strong><small>${escapeHtml(listing.location || diyLocale("Location not set", "未填写发货地"))}</small></span>
                <span class="diy-unofficial-badge">${diyLocale("DIY", "自制卡")}</span>
              </div>
              <div>
                <h4>${escapeHtml(diyCardTitle(card))}</h4>
                <div class="diy-card-meta"><span>${escapeHtml(card.series)}</span><span>${escapeHtml(card.player)}</span><span>${escapeHtml(card.parallel)}</span></div>
              </div>
              <p>${escapeHtml(listing.note || card.description || "")}</p>
              ${
                listing.type === "sale"
                  ? `<div class="diy-listing-offer"><small>${diyLocale("Asking price", "卖家报价")}</small><strong>${money(listing.price)}</strong></div>`
                  : listing.type === "trade"
                    ? `<div class="diy-listing-offer"><small>${diyLocale("Looking for", "希望换取")}</small><strong>${escapeHtml(listing.wanted || diyLocale("Open offers", "接受报价"))}</strong></div>`
                    : ""
              }
              <span class="diy-listing-request-count">${diyLocale(`${numeric(listing.requests)} requests`, `${numeric(listing.requests)} 次咨询`)}</span>
              <div class="diy-listing-actions">
                ${
                  owner
                    ? `<button class="ghost-button compact-button" type="button" data-diy-action="archive" data-diy-listing-id="${escapeHtml(listing.id)}">${diyLocale("Archive", "下架")}</button>`
                    : `<button class="primary-button compact-button" type="button" data-diy-action="request" data-diy-listing-id="${escapeHtml(listing.id)}">${actionLabel}</button>`
                }
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }
}

function setDIYView(view) {
  const catalog = view !== "market";
  document.querySelectorAll("[data-diy-tab]").forEach((button) => {
    const selected = button.dataset.diyTab === (catalog ? "catalog" : "market");
    button.classList.toggle("active", selected);
    button.setAttribute("aria-selected", String(selected));
  });
  document.querySelector("#diyCatalogView")?.classList.toggle("hidden", !catalog);
  document.querySelector("#diyMarketView")?.classList.toggle("hidden", catalog);
}

function updateDIYListingFields() {
  const type = document.querySelector("#diyListingType")?.value;
  document.querySelector("#diyListingPriceField")?.classList.toggle("hidden", type !== "sale");
  document.querySelector("#diyListingWantedField")?.classList.toggle("hidden", type !== "trade");
}

function updateDIYQuickPublishFields() {
  const intent = document.querySelector("#diyPublishIntent")?.value;
  document.querySelector("#diyQuickPriceField")?.classList.toggle("hidden", intent !== "sale");
}

async function previewDIYUpload() {
  const preview = document.querySelector("#diyUploadPreview");
  const file = document.querySelector("#diyFrontImage")?.files?.[0];
  if (!preview) return;
  const token = ++diyPreviewToken;
  if (diyPreviewObjectUrl) URL.revokeObjectURL(diyPreviewObjectUrl);
  diyPreviewObjectUrl = file ? URL.createObjectURL(file) : "";
  preview.classList.remove("is-generating");
  if (file) {
    diyGeneratedPreview = { front: "", back: "" };
    preview.classList.add("has-image");
    preview.style.backgroundImage = `url("${diyPreviewObjectUrl}")`;
    preview.innerHTML = `<span>${escapeHtml(file.name)} · ${diyLocale("Custom front", "自定义正面")}</span>`;
    return;
  }
  if (!document.querySelector("#diyAutoGenerate")?.checked) {
    diyGeneratedPreview = { front: "", back: "" };
    preview.classList.remove("has-image");
    preview.style.backgroundImage = "";
    preview.innerHTML = `<span class="material-symbols-outlined" aria-hidden="true">add_photo_alternate</span><span>${diyLocale("Upload a front image or enable auto-generation.", "请上传正面图片，或开启自动生成。")}</span>`;
    return;
  }
  preview.classList.remove("has-image");
  preview.classList.add("is-generating");
  preview.style.backgroundImage = "";
  preview.innerHTML = `<span>${diyLocale("Building your card artwork...", "正在生成卡图……")}</span>`;
  try {
    const generated = await generateDIYCardFaces();
    if (token !== diyPreviewToken) return;
    diyGeneratedPreview = generated;
    preview.classList.remove("is-generating");
    preview.classList.add("has-image");
    preview.style.backgroundImage = `url("${generated.front}")`;
    preview.innerHTML = `<span>${diyLocale("Generated front · matching back ready", "正面已生成 · 配套卡背已就绪")}</span>`;
  } catch (error) {
    if (token !== diyPreviewToken) return;
    diyGeneratedPreview = { front: "", back: "" };
    preview.classList.remove("has-image", "is-generating");
    preview.style.backgroundImage = "";
    preview.innerHTML = `<span>${escapeHtml(diyLocale(`Preview failed: ${error.message}`, `预览生成失败：${error.message}`))}</span>`;
  }
}

function crossPostDIYListing(listing, card) {
  communityPosts.unshift({
    id: crypto.randomUUID(),
    createdAt: listing.createdAt,
    authorId: listing.ownerId,
    author: listing.ownerName,
    avatar: text(account.avatar),
    intent: listing.type === "sale" ? "sell" : listing.type === "trade" ? "trade" : "share",
    selectedCard: { id: card.id, name: `[DIY] ${diyCardTitle(card)}`, value: numeric(listing.price) },
    cards: [`DIY | ${card.series} | ${card.player} | ${card.parallel} | ${card.cardNumber}`],
    note: `[DIY / Unofficial] ${listing.note || card.description || diyListingTypeLabel(listing.type)}`,
    image: text(card.front),
    likes: 0,
    wants: 0,
    comments: []
  });
  saveCommunityPosts();
}

function publishDIYListing(card, type, details = {}) {
  const now = new Date().toISOString();
  const listing = {
    id: crypto.randomUUID(),
    cardId: card.id,
    type: ["sale", "trade", "showcase"].includes(type) ? type : "showcase",
    price: numeric(details.price),
    wanted: text(details.wanted),
    note: text(details.note),
    location: text(details.location || account.location),
    ownerName: diyCurrentOwnerName(),
    ownerId: diyCurrentOwnerId(),
    requests: 0,
    createdAt: now
  };
  diyListings.unshift(listing);
  saveDIYListings();
  crossPostDIYListing(listing, card);
  return listing;
}

async function handleDIYUpload(event) {
  event.preventDefault();
  if (!requireMember("upload DIY cards")) return;
  const form = event.currentTarget;
  const status = document.querySelector("#diyUploadStatus");
  const frontFile = document.querySelector("#diyFrontImage")?.files?.[0];
  const backFile = document.querySelector("#diyBackImage")?.files?.[0];
  const autoGenerate = Boolean(document.querySelector("#diyAutoGenerate")?.checked);
  const publishIntent = document.querySelector("#diyPublishIntent")?.value || "library";
  const quickPrice = numeric(document.querySelector("#diyQuickPrice")?.value);
  if ((!frontFile && !autoGenerate) || !document.querySelector("#diyAttestation")?.checked) {
    if (status) status.textContent = diyLocale("Upload a front image or enable auto-generation, then confirm the creator disclosure.", "请上传正面图片或开启自动生成，并确认创作者声明。");
    return;
  }
  if (publishIntent === "sale" && quickPrice <= 0) {
    if (status) status.textContent = diyLocale("Add an asking price before publishing a sale listing.", "发布出售前请填写售价。");
    return;
  }
  if (status) status.textContent = diyLocale("Generating and preparing your DIY card...", "正在生成并处理自制卡图……");
  try {
    const draft = diyCurrentDraft();
    const [customFront, customBack, generated] = await Promise.all([
      frontFile ? fileToCardFaceDataUrl(frontFile) : Promise.resolve(""),
      backFile ? fileToCardFaceDataUrl(backFile) : Promise.resolve(""),
      autoGenerate && (!frontFile || !backFile) ? generateDIYCardFaces(draft) : Promise.resolve({ front: "", back: "", draft })
    ]);
    const front = customFront || generated.front;
    const back = customBack || generated.back;
    const card = {
      id: crypto.randomUUID(),
      series: draft.series,
      player: draft.player,
      parallel: draft.parallel,
      cardNumber: draft.cardNumber,
      printRun: draft.printRun,
      finish: draft.finish,
      title: draft.title,
      description: draft.description,
      front,
      back,
      seriesTemplate: draft.seriesTemplate,
      playerImage: draft.playerDefinition?.id || "",
      playerImageCredit: draft.playerDefinition?.credit || "",
      playerImageLicense: draft.playerDefinition?.license || "",
      playerImageSource: draft.playerDefinition?.source || "",
      autoGenerated: !customFront,
      colors: draft.seriesDefinition.colors.slice(0, 2),
      ownerName: diyCurrentOwnerName(),
      ownerId: diyCurrentOwnerId(),
      createdAt: new Date().toISOString(),
      custom: true
    };
    diyCards.unshift(card);
    saveDIYCards();
    if (publishIntent !== "library") {
      publishDIYListing(card, publishIntent, { price: quickPrice });
      setDIYView("market");
      if (status) status.textContent = diyLocale("DIY card saved and published in the creator market.", "自制卡已保存并发布到创作者市场。");
    } else if (status) {
      status.textContent = diyLocale("DIY card saved to your library.", "自制卡已保存到卡库。");
    }
    form.reset();
    updateDIYQuickPublishFields();
    renderDIYGeneratorChoices();
    previewDIYUpload();
    renderDIYMarketplace();
    renderCommunity();
  } catch (error) {
    if (status) status.textContent = diyLocale(`Could not prepare this image: ${error.message}`, `图片处理失败：${error.message}`);
  }
}

function handleDIYListingSubmit(event) {
  event.preventDefault();
  if (!requireMember("publish DIY listings")) return;
  const card = diyCards.find((item) => item.id === document.querySelector("#diyListingCard")?.value && diyOwnsCard(item));
  const type = document.querySelector("#diyListingType")?.value || "showcase";
  const price = numeric(document.querySelector("#diyListingPrice")?.value);
  const status = document.querySelector("#diyListingStatus");
  if (!card) {
    if (status) status.textContent = diyLocale("Choose a DIY card from your library.", "请从自制卡库选择一张卡。");
    return;
  }
  if (type === "sale" && price <= 0) {
    if (status) status.textContent = diyLocale("Add an asking price for a sale listing.", "出售发布需要填写售价。");
    return;
  }
  publishDIYListing(card, type, {
    price,
    wanted: document.querySelector("#diyListingWanted")?.value,
    note: document.querySelector("#diyListingNote")?.value,
    location: document.querySelector("#diyListingLocation")?.value
  });
  event.currentTarget.reset();
  updateDIYListingFields();
  if (status) status.textContent = diyLocale("Listing published and shared to the community feed.", "发布成功，并已同步到社区动态。");
  renderDIYMarketplace();
  renderCommunity();
}

function copyDIYStarter(cardId) {
  if (!requireMember("use DIY card templates")) return;
  const source = diyCards.find((card) => card.id === cardId && card.starter);
  if (!source) return;
  document.querySelector("#diySeries").value = source.series;
  document.querySelector("#diyPlayer").value = source.player;
  document.querySelector("#diyParallel").value = source.parallel;
  document.querySelector("#diyNumber").value = source.cardNumber;
  document.querySelector("#diyPrintRun").value = source.printRun || "";
  document.querySelector("#diyFinish").value = source.finish || "Other";
  document.querySelector("#diyTitleInput").value = `${source.title} ${diyLocale("Study", "习作")}`;
  document.querySelector("#diyDescription").value = diyLocale(
    "Personal study based on a Card Ledger starter structure. The included player image and matching card back are generated automatically.",
    "基于卡藏模板结构建立的个人习作。系统会自动生成所选球员图片与配套卡背。"
  );
  const series = diySeriesDefinition(source.series);
  const player = diyPlayerDefinition(source.player);
  if (series) document.querySelector("#diySeriesTemplate").value = series.id;
  if (player) document.querySelector("#diyPlayerImage").value = player.id;
  const autoGenerate = document.querySelector("#diyAutoGenerate");
  if (autoGenerate) autoGenerate.checked = true;
  renderDIYGeneratorChoices();
  scheduleDIYGeneratedPreview(0);
  const status = document.querySelector("#diyUploadStatus");
  if (status) status.textContent = diyLocale("Template loaded. Review the generated artwork and confirm the creator disclosure to save.", "模板已载入。请检查自动生成的卡图，并确认创作者声明后保存。");
  document.querySelector("#diyUploadForm")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function listDIYCard(cardId) {
  if (!requireMember("list DIY cards")) return;
  const card = diyCards.find((item) => item.id === cardId && diyOwnsCard(item));
  if (!card) return;
  setDIYView("market");
  const select = document.querySelector("#diyListingCard");
  if (select) select.value = card.id;
  document.querySelector(".diy-listing-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function deleteDIYCard(cardId) {
  const card = diyCards.find((item) => item.id === cardId && diyOwnsCard(item));
  if (!card || !window.confirm(diyLocale(`Delete ${diyCardTitle(card)} and its active listings?`, `删除“${diyCardTitle(card)}”及相关发布吗？`))) return;
  diyCards = diyCards.filter((item) => item.id !== cardId);
  diyListings = diyListings.filter((listing) => listing.cardId !== cardId);
  saveDIYCards();
  saveDIYListings();
  renderDIYMarketplace();
}

function toggleDIYCardImage(button) {
  const card = diyCards.find((item) => item.id === button.dataset.diyId);
  const image = button.closest(".diy-card, .diy-listing-card")?.querySelector(".diy-card-visual img");
  if (!card?.back || !image) return;
  const showingBack = button.dataset.showingBack === "true";
  button.dataset.showingBack = String(!showingBack);
  image.src = showingBack ? card.front : card.back;
  image.alt = `${diyCardTitle(card)} ${showingBack ? "front" : "back"}`;
  button.title = showingBack ? diyLocale("Show back", "查看背面") : diyLocale("Show front", "查看正面");
}

async function handleDIYListingAction(listingId, action) {
  const listing = diyListings.find((item) => item.id === listingId);
  if (!listing) return;
  if (action === "archive" && diyOwnsListing(listing)) {
    listing.archived = true;
    saveDIYListings();
    renderDIYMarketplace();
    return;
  }
  if (action !== "request" || !requireMember("contact DIY creators")) return;
  listing.requests = numeric(listing.requests) + 1;
  saveDIYListings();
  const card = diyCards.find((item) => item.id === listing.cardId);
  const cloudRequestSaved = await createDIYCloudRequest(listing, card);
  const requester = diyCurrentOwnerName();
  chats.unshift({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    participants: [requester, listing.ownerName || "DIY creator"],
    messages: [
      {
        author: requester,
        text: diyLocale(`I am interested in your DIY card: ${diyCardTitle(card)} (${diyListingTypeLabel(listing.type)}).`, `我对你的自制卡“${diyCardTitle(card)}”感兴趣（${diyListingTypeLabel(listing.type)}）。`),
        createdAt: new Date().toISOString()
      }
    ]
  });
  saveChats();
  const status = document.querySelector("#diyListingStatus");
  if (status) {
    status.textContent = cloudRequestSaved
      ? diyLocale("Request sent online and a private conversation was opened.", "咨询已在线发送，并已建立私聊。")
      : diyLocale("Request recorded locally and a private conversation was opened.", "咨询已在本机记录，并已建立私聊。");
  }
  renderDIYMarketplace();
  renderChats();
}

function setupDIYMarketplace() {
  const area = document.querySelector("#diyArea");
  if (!area) return;
  document.querySelectorAll("[data-diy-tab]").forEach((button) => button.addEventListener("click", () => setDIYView(button.dataset.diyTab)));
  document.querySelector("#diyUploadForm")?.addEventListener("submit", handleDIYUpload);
  document.querySelector("#diyListingForm")?.addEventListener("submit", handleDIYListingSubmit);
  document.querySelector("#diyFrontImage")?.addEventListener("change", previewDIYUpload);
  document.querySelector("#diyBackImage")?.addEventListener("change", scheduleDIYGeneratedPreview);
  document.querySelector("#diyAutoGenerate")?.addEventListener("change", () => scheduleDIYGeneratedPreview(0));
  document.querySelector("#diyRegeneratePreview")?.addEventListener("click", () => scheduleDIYGeneratedPreview(0));
  document.querySelector("#diySeriesTemplateChoices")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-diy-series-template]");
    if (button) selectDIYSeriesTemplate(button.dataset.diySeriesTemplate);
  });
  document.querySelector("#diyPlayerImageChoices")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-diy-player-image]");
    if (button) selectDIYPlayerImage(button.dataset.diyPlayerImage);
  });
  document.querySelector("#diySeries")?.addEventListener("input", () => syncDIYGeneratorSelectionFromText("series"));
  document.querySelector("#diyPlayer")?.addEventListener("input", () => syncDIYGeneratorSelectionFromText("player"));
  ["#diyParallel", "#diyNumber", "#diyPrintRun", "#diyFinish", "#diyTitleInput"].forEach((selector) => {
    document.querySelector(selector)?.addEventListener("input", () => scheduleDIYGeneratedPreview());
  });
  document.querySelector("#diyPublishIntent")?.addEventListener("change", updateDIYQuickPublishFields);
  document.querySelector("#diyListingType")?.addEventListener("change", updateDIYListingFields);
  ["#diySearch", "#diySeriesFilter", "#diyPlayerFilter", "#diyParallelFilter", "#diyMarketFilter", "#diyMarketSort"].forEach((selector) => {
    const control = document.querySelector(selector);
    control?.addEventListener(control.matches("input") ? "input" : "change", renderDIYMarketplace);
  });
  document.querySelector("#diyClearFilters")?.addEventListener("click", () => {
    ["#diySearch", "#diySeriesFilter", "#diyPlayerFilter", "#diyParallelFilter"].forEach((selector) => {
      const control = document.querySelector(selector);
      if (control) control.value = "";
    });
    renderDIYMarketplace();
  });
  area.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-diy-action]");
    if (!trigger) return;
    const action = trigger.dataset.diyAction;
    if (action === "copy") copyDIYStarter(trigger.dataset.diyId);
    if (action === "list") listDIYCard(trigger.dataset.diyId);
    if (action === "delete") deleteDIYCard(trigger.dataset.diyId);
    if (action === "flip") toggleDIYCardImage(trigger);
    if (action === "request" || action === "archive") handleDIYListingAction(trigger.dataset.diyListingId, action);
  });
  renderDIYGeneratorChoices();
  scheduleDIYGeneratedPreview(0);
  updateDIYQuickPublishFields();
  updateDIYListingFields();
}

els.languageSelect?.addEventListener("change", () => {
  currentLanguage = els.languageSelect.value;
  localStorage.setItem(LANGUAGE_KEY, currentLanguage);
  render();
  syncGlobalScannerLanguage();
  updateSportsGuyVoiceControl();
});

els.themeSelect?.addEventListener("change", () => {
  currentTheme = els.themeSelect.value;
  localStorage.setItem(THEME_KEY, currentTheme);
  applyTheme();
});

async function updateLandingCardImage(side, file) {
  if (!file) return;
  const images = loadLandingCardImages();
  const dataUrl = await fileToCardFaceDataUrl(file);
  images[side] = dataUrl;
  saveLandingCardImages(images);
  await initLandingCard3D();
  await landingCardRuntime?.updateFace(side, dataUrl);
}

async function handleLandingCardUpload(side, input) {
  const [file] = input?.files || [];
  await updateLandingCardImage(side, file);
  input.value = "";
}

els.landingCardUploadButtons?.forEach((button) => {
  button.addEventListener("click", () => {
    const side = button.dataset.cardUpload;
    const input = side === "back" ? els.landingCardBackUpload : els.landingCardFrontUpload;
    input?.click();
  });
});
els.landingCardFrontUpload?.addEventListener("change", () => handleLandingCardUpload("front", els.landingCardFrontUpload));
els.landingCardBackUpload?.addEventListener("change", () => handleLandingCardUpload("back", els.landingCardBackUpload));
els.landingCardStage?.addEventListener("dragover", (event) => {
  event.preventDefault();
  els.landingCardStage.classList.add("is-card-dragover");
});
els.landingCardStage?.addEventListener("dragleave", () => {
  els.landingCardStage.classList.remove("is-card-dragover");
});
els.landingCardStage?.addEventListener("drop", async (event) => {
  event.preventDefault();
  els.landingCardStage.classList.remove("is-card-dragover");
  const files = [...(event.dataTransfer?.files || [])].filter((file) => file.type.startsWith("image/"));
  if (!files.length) return;
  await updateLandingCardImage("front", files[0]);
  if (files[1]) await updateLandingCardImage("back", files[1]);
});
els.resetLandingCardImages?.addEventListener("click", async () => {
  const current = loadLandingCardImages();
  saveLandingCardImages({ ...current, front: "", back: "" });
  await initLandingCard3D();
  await landingCardRuntime?.updateFace("front", "");
  await landingCardRuntime?.updateFace("back", "");
});
const updateLandingHolder = async () => {
  const saved = loadLandingCardImages();
  saved.name = text(els.landingCardName?.value) || "Card Ledger Showcase";
  saved.format = normalizeCardHolder(els.landingCardFormat?.value);
  saved.grade = text(els.landingCardGrade?.value) || "10";
  if (els.landingCardGrade) els.landingCardGrade.disabled = saved.format === "raw";
  saveLandingCardImages(saved);
  await landingCardRuntime?.updateHolder(saved.format, saved.grade, saved.name);
};
els.landingCardName?.addEventListener("change", updateLandingHolder);
els.landingCardFormat?.addEventListener("change", updateLandingHolder);
els.landingCardGrade?.addEventListener("change", updateLandingHolder);

els.closetFrontUpload?.addEventListener("change", previewClosetUploads);
els.closetBackUpload?.addEventListener("change", previewClosetUploads);
els.closetUploadForm?.addEventListener("submit", addUploadedPresentationCard);
els.addCollectionCardToCloset?.addEventListener("click", addCollectionImageToCloset);
els.closetDisplayMode?.addEventListener("change", () => {
  presentationCloset.displayMode = els.closetDisplayMode.value === "storage" ? "storage" : "theater";
  savePresentationCloset();
  renderPresentationCloset();
});
els.closetCardFormat?.addEventListener("change", updateSelectedPresentationHolder);
els.closetCardGrade?.addEventListener("change", updateSelectedPresentationHolder);
els.closetResetView?.addEventListener("click", () => presentationClosetRuntime?.reset());
els.closetPreviousCard?.addEventListener("click", () => presentationClosetRuntime?.stepStorage(-1));
els.closetNextCard?.addEventListener("click", () => presentationClosetRuntime?.stepStorage(1));
els.refreshTrendData?.addEventListener("click", refreshTrendFromControls);
els.collectorReviewQueue?.addEventListener("click", async (event) => {
  const importButton = event.target.closest("[data-open-trend-import]");
  if (importButton) {
    openTrendImport();
    return;
  }
  const reviewButton = event.target.closest("[data-review-card]");
  if (!reviewButton) return;
  openTrendImport(reviewButton.dataset.reviewCard || "");
});
window.addEventListener("cardledger:sales-updated", () => render());

window.cardLedgerBridge = {
  getCards: () => cards,
  setCards: (nextCards) => {
    cards = Array.isArray(nextCards) ? nextCards : cards;
  },
  getTrades: () => trades,
  getGoals: () => goals,
  getAccount: () => ({ ...account }),
  isPremiumMember,
  planLimit,
  requirePlanAccess,
  getSupabaseSettings: () => ({ ...supabaseSettings }),
  saveCards,
  saveTrades,
  render,
  requireMember,
  syncGoalSlotsFromCard,
  attachCardImage,
  attachPsaPopulation,
  parseFixedCardParts,
  buildCardsFromFixedFormat,
  fixedCardName,
  estimatedCardValue,
  escapeHtml,
  download,
  readImageFile,
  supabaseDataRequest,
  marketDataRequest,
  supabaseReady
};

resetTradeForm();
resetGoalForm();
if (!SCAN_PAUSED) loadScanDevices();
setSidebarExpanded(false);
setupDIYMarketplace();
setupConditionCheck();
updateSportsGuyVoiceControl();
setActivePage(activePage);
render();
initializeAuthentication().finally(() => loadPublicDIYMarketplace());
