import type {
  Attraction,
  Badge,
  CrowdLevel,
  Experience,
  FoliageReport,
  Hotel,
  LightningTx,
  LocalEvent,
  RedeemOption,
  Reservation,
  Restaurant,
  ShrineHours,
  SocialPost,
  TransitDeparture,
  WeatherSnapshot,
} from "@/types";

/* ---------------------------------- Hotels --------------------------------- */

export const hotels: Hotel[] = [
  {
    id: "kanaya-heritage",
    name: { en: "Kanaya Heritage House", ja: "金谷ヘリテージハウス" },
    area: { en: "Nikko Town · by the Shinkyo Bridge", ja: "日光市街・神橋のほとり" },
    description: {
      en: "A classic Meiji-era resort hotel reimagined: cypress baths, a library lounge over the Daiya River, and waste-heat powered room climate.",
      ja: "明治の名門リゾートを現代に。檜風呂、大谷川を望むライブラリーラウンジ、排熱を活用した客室空調。",
    },
    priceRange: "¥28,000–¥62,000",
    sustainability: 5,
    amenities: [
      { en: "Onsen baths", ja: "温泉大浴場" },
      { en: "Waste-heat heating", ja: "排熱利用の暖房" },
      { en: "EV & e-bike charging", ja: "EV・電動自転車充電" },
      { en: "Lightning payments", ja: "ライトニング決済対応" },
      { en: "River-view library", ja: "川沿いライブラリー" },
    ],
    themes: ["heritage", "food"],
    earnRate: 320,
    art: { hues: [205, 150], variant: "bridge" },
    bookingLinks: [
      { label: "Official Website", url: "https://www.nikko-kanaya-hotel.co.jp/" },
      { label: "Booking.com", url: "https://www.booking.com/" },
      { label: "Rakuten Travel", url: "https://travel.rakuten.co.jp/" },
      { label: "Jalan", url: "https://www.jalan.net/" },
    ],
    reviews: [
      {
        rating: 5,
        reviewer: "Aiko M.",
        nationality: { en: "Japan", ja: "日本" },
        date: "2026-04-18",
        text: {
          en: "The river sound from the library lounge is unforgettable. Staff explained the waste-heat system with real pride.",
          ja: "ライブラリーから聞こえる川音が忘れられません。排熱システムをスタッフが誇らしげに説明してくれました。",
        },
      },
      {
        rating: 5,
        reviewer: "Lukas B.",
        nationality: { en: "Germany", ja: "ドイツ" },
        date: "2026-05-02",
        text: {
          en: "Paid the bar tab over Lightning in seconds. Heritage outside, future inside.",
          ja: "バーの支払いはライトニングで数秒。外観はクラシック、中身は未来。",
        },
      },
    ],
  },
  {
    id: "chuzenji-lakeside",
    name: { en: "Chūzenji Lakeside Lodge", ja: "中禅寺レイクサイドロッジ" },
    area: { en: "Lake Chūzenji shore", ja: "中禅寺湖畔" },
    description: {
      en: "Timber lodge at 1,269 m with kayak racks at the door, locally-milled cedar interiors and a zero-waste breakfast of lake-region produce.",
      ja: "標高1,269mの木造ロッジ。玄関先にカヤックラック、地元産杉の内装、湖畔の食材を使ったゼロウェイスト朝食。",
    },
    priceRange: "¥18,000–¥36,000",
    sustainability: 5,
    amenities: [
      { en: "Kayak & SUP rental", ja: "カヤック・SUPレンタル" },
      { en: "Trailhead shuttle", ja: "登山口シャトル" },
      { en: "Zero-waste breakfast", ja: "ゼロウェイスト朝食" },
      { en: "Drying room", ja: "乾燥室" },
    ],
    themes: ["nature"],
    earnRate: 240,
    art: { hues: [210, 175], variant: "lake" },
    bookingLinks: [
      { label: "Official Website", url: "https://www.nikko-kankou.org/" },
      { label: "Booking.com", url: "https://www.booking.com/" },
      { label: "Jalan", url: "https://www.jalan.net/" },
    ],
    reviews: [
      {
        rating: 5,
        reviewer: "Priya S.",
        nationality: { en: "India", ja: "インド" },
        date: "2026-05-21",
        text: {
          en: "Woke up, walked ten steps, paddled into morning mist on the lake. The eco-points for the kayak trip were a fun bonus.",
          ja: "朝起きて10歩で湖へ。朝霧の中のカヤックは最高でした。エコポイントも嬉しいおまけ。",
        },
      },
      {
        rating: 4,
        reviewer: "Kenta O.",
        nationality: { en: "Japan", ja: "日本" },
        date: "2026-03-30",
        text: {
          en: "Rooms are simple but the cedar smell and the silence are the luxury here.",
          ja: "客室はシンプルですが、杉の香りと静けさこそが贅沢です。",
        },
      },
    ],
  },
  {
    id: "yumoto-onsen-ryokan",
    name: { en: "Yumoto Onsen Ryokan Shirane", ja: "湯元温泉 旅館しらね" },
    area: { en: "Oku-Nikkō · Yumoto Onsen", ja: "奥日光・湯元温泉" },
    description: {
      en: "A nine-room ryokan on milky sulfur springs, kaiseki dinners built around yuba and mountain vegetables, futons laid out by hand each evening.",
      ja: "白濁の硫黄泉に佇む全9室の旅館。湯波と山菜の会席、毎夕手で敷かれる布団。",
    },
    priceRange: "¥22,000–¥45,000",
    sustainability: 4,
    amenities: [
      { en: "Private rotenburo", ja: "貸切露天風呂" },
      { en: "Kaiseki dinner", ja: "会席料理" },
      { en: "Yukata & geta", ja: "浴衣・下駄" },
      { en: "Geothermal heating", ja: "地熱暖房" },
    ],
    themes: ["nature", "food"],
    earnRate: 280,
    art: { hues: [25, 160], variant: "onsen" },
    bookingLinks: [
      { label: "Official Website", url: "https://www.nikkoyumoto.com/" },
      { label: "Rakuten Travel", url: "https://travel.rakuten.co.jp/" },
      { label: "Jalan", url: "https://www.jalan.net/" },
    ],
    reviews: [
      {
        rating: 5,
        reviewer: "Margaux D.",
        nationality: { en: "France", ja: "フランス" },
        date: "2026-01-12",
        text: {
          en: "Snow falling into the open-air bath, sulfur steam, total quiet. The kaiseki yuba course converted me.",
          ja: "露天風呂に降る雪、硫黄の湯けむり、完全な静寂。湯波の会席に心を奪われました。",
        },
      },
    ],
  },
  {
    id: "satoyama-machiya",
    name: { en: "Satoyama Machiya Stay", ja: "里山町家ステイ" },
    area: { en: "Imaichi old post town", ja: "今市の旧宿場町" },
    description: {
      en: "A restored 1920s townhouse for whole-house rental: earthen kitchen, garden bath, and a host who walks you to the morning market.",
      ja: "大正期の町家を一棟貸しで。土間の台所、庭の風呂、朝市まで案内してくれるホスト。",
    },
    priceRange: "¥15,000–¥26,000",
    sustainability: 4,
    amenities: [
      { en: "Whole-house rental", ja: "一棟貸し" },
      { en: "Market tour with host", ja: "ホストと朝市散歩" },
      { en: "Bicycle included", ja: "自転車付き" },
    ],
    themes: ["food", "heritage"],
    earnRate: 200,
    art: { hues: [35, 140], variant: "town" },
    bookingLinks: [
      { label: "Official Website", url: "https://www.nikko-kankou.org/" },
      { label: "Booking.com", url: "https://www.booking.com/" },
    ],
    reviews: [
      {
        rating: 5,
        reviewer: "Diego R.",
        nationality: { en: "Mexico", ja: "メキシコ" },
        date: "2026-04-05",
        text: {
          en: "We cooked soba we bought at the market in a hundred-year-old kitchen. Felt like borrowing a life, not renting a room.",
          ja: "朝市で買ったそばを百年前の台所で茹でました。部屋を借りるのではなく、暮らしを借りる感覚。",
        },
      },
    ],
  },
];

/* -------------------------------- Restaurants ------------------------------ */

export const restaurants: Restaurant[] = [
  {
    id: "soba-mizuoto",
    name: { en: "Soba Mizuoto", ja: "蕎麦 水音" },
    cuisine: { en: "Hand-cut soba", ja: "手打ちそば" },
    signature: [
      { en: "Nikko spring-water juwari soba", ja: "日光湧水の十割そば" },
      { en: "Yuba tempura", ja: "湯波の天ぷら" },
      { en: "Soba-yu chazuke", ja: "そば湯茶漬け" },
    ],
    priceRange: "¥1,200–¥2,800",
    dietary: [
      { en: "Vegetarian options", ja: "ベジタリアン対応" },
      { en: "Vegan dashi on request", ja: "ヴィーガン出汁（要相談）" },
    ],
    hours: "11:00–15:00 (Closed Tue / 火曜定休)",
    description: {
      en: "Buckwheat milled each morning, water drawn from the same springs that feed the shrine moats. Eight counter seats, no rush.",
      ja: "毎朝挽くそば粉と、社寺の堀を満たす湧水。カウンター8席、急がないお店。",
    },
    themes: ["food"],
    earnRate: 45,
    art: { hues: [95, 45], variant: "town" },
    reserveLinks: [
      { label: "Official Website", url: "https://www.nikko-kankou.org/" },
      { label: "Reservation inquiry", url: "https://www.nikko-kankou.org/contact/" },
    ],
    reviews: [
      {
        rating: 5,
        reviewer: "Haruka T.",
        nationality: { en: "Japan", ja: "日本" },
        date: "2026-05-11",
        text: {
          en: "You can taste the water. I understand that sentence now.",
          ja: "「水の味がする」という言葉の意味が、ここで分かりました。",
        },
      },
      {
        rating: 4,
        reviewer: "Sam W.",
        nationality: { en: "Australia", ja: "オーストラリア" },
        date: "2026-04-22",
        text: {
          en: "Tiny place, worth the wait. They took Lightning at the counter — instant and fee-free for me.",
          ja: "小さな店ですが並ぶ価値あり。会計はライトニングで一瞬でした。",
        },
      },
    ],
  },
  {
    id: "yuba-zen",
    name: { en: "Yuba Kaiseki Zen", ja: "湯波会席 然" },
    cuisine: { en: "Yuba kaiseki", ja: "湯波会席" },
    signature: [
      { en: "Eight-course yuba kaiseki", ja: "湯波づくし八品会席" },
      { en: "Sashimi yuba", ja: "刺身湯波" },
      { en: "Yuba hotpot", ja: "湯波鍋" },
    ],
    priceRange: "¥4,500–¥9,000",
    dietary: [
      { en: "Vegan course available", ja: "ヴィーガンコースあり" },
      { en: "Gluten-aware menu", ja: "グルテン配慮メニュー" },
    ],
    hours: "11:30–14:30, 17:30–21:00 (Closed Wed / 水曜定休)",
    description: {
      en: "Nikko's monastery food tradition, plated like a tea ceremony. Each course traces yuba from silk-soft to charcoal-seared.",
      ja: "精進の伝統を茶事のように。絹のような生湯波から炙りまで、湯波の表情を一品ずつ。",
    },
    themes: ["food", "heritage"],
    earnRate: 90,
    art: { hues: [40, 15], variant: "shrine" },
    reserveLinks: [
      { label: "Official Website", url: "https://www.nikko-kankou.org/" },
      { label: "Reservation service", url: "https://www.tablecheck.com/" },
    ],
    reviews: [
      {
        rating: 5,
        reviewer: "Elena P.",
        nationality: { en: "Italy", ja: "イタリア" },
        date: "2026-02-14",
        text: {
          en: "I didn't think tofu skin could carry a full tasting menu. I was wrong in eight different ways.",
          ja: "湯波だけでフルコース？と思っていましたが、八回も裏切られました。",
        },
      },
    ],
  },
  {
    id: "irodori-market-kitchen",
    name: { en: "Irodori Market Kitchen", ja: "いろどり市場キッチン" },
    cuisine: { en: "Farm-to-table teishoku", ja: "産直定食" },
    signature: [
      { en: "Morning-market set of the day", ja: "本日の朝市定食" },
      { en: "Tochigi wagyu sukiyaki bowl", ja: "とちぎ和牛すき焼き丼" },
      { en: "Strawberry parfait (winter–spring)", ja: "いちごパフェ（冬〜春）" },
    ],
    priceRange: "¥1,000–¥2,400",
    dietary: [
      { en: "Kids' portions", ja: "お子さまサイズ" },
      { en: "Allergy chart available", ja: "アレルギー表あり" },
    ],
    hours: "8:00–16:00 (Open daily / 無休)",
    description: {
      en: "Counter inside the farmers' market — the menu is whatever the stalls brought in that morning, chalked up by 7:45.",
      ja: "直売所の中のカウンター食堂。メニューはその朝の入荷次第、7時45分に黒板へ。",
    },
    themes: ["food", "nature"],
    earnRate: 35,
    art: { hues: [10, 95], variant: "town" },
    reserveLinks: [{ label: "Official Website", url: "https://www.nikko-kankou.org/" }],
    reviews: [
      {
        rating: 5,
        reviewer: "Naomi K.",
        nationality: { en: "Japan", ja: "日本" },
        date: "2026-05-29",
        text: {
          en: "Ate breakfast next to the farmer who grew it. Eco-certified, and the points showed up in the app instantly.",
          ja: "作った農家さんの隣で朝ごはん。エコ認証店で、ポイントもすぐアプリに反映されました。",
        },
      },
    ],
  },
  {
    id: "kissa-raiden",
    name: { en: "Kissa Raiden", ja: "喫茶 雷電" },
    cuisine: { en: "Showa-era kissaten & curry", ja: "昭和喫茶・カレー" },
    signature: [
      { en: "Charcoal-roast coffee", ja: "炭火焙煎コーヒー" },
      { en: "Bakers' curry with Nikko maitake", ja: "日光舞茸のベーカーズカレー" },
      { en: "Hard pudding", ja: "固めの自家製プリン" },
    ],
    priceRange: "¥700–¥1,600",
    dietary: [{ en: "Vegetarian curry option", ja: "ベジタリアンカレーあり" }],
    hours: "9:00–18:00 (Closed Thu / 木曜定休)",
    description: {
      en: "Vinyl records, copper kettles, and the slow drip of a proper kissaten — a sat-back basecamp between shrine visits.",
      ja: "レコードと銅ポットとネルドリップ。社寺めぐりの合間に腰を落ち着けるベースキャンプ。",
    },
    themes: ["heritage", "food"],
    earnRate: 20,
    art: { hues: [260, 30], variant: "town" },
    reserveLinks: [{ label: "Official Website", url: "https://www.nikko-kankou.org/" }],
    reviews: [
      {
        rating: 5,
        reviewer: "Jonas F.",
        nationality: { en: "Sweden", ja: "スウェーデン" },
        date: "2026-03-08",
        text: {
          en: "Lightning sticker on the door, Coltrane on the turntable. My kind of place.",
          ja: "ドアにライトニングのステッカー、ターンテーブルにはコルトレーン。最高です。",
        },
      },
    ],
  },
];

/* -------------------------------- Attractions ------------------------------ */

export const attractions: Attraction[] = [
  {
    id: "kegon-falls",
    name: { en: "Kegon Falls", ja: "華厳の滝" },
    history: {
      en: "Discovered by the monk Shōdō Shōnin in the 8th century, the 97 m fall drains Lake Chūzenji in a single drop and has inspired poets for twelve centuries.",
      ja: "8世紀に勝道上人が発見したと伝わる落差97mの名瀑。中禅寺湖の水が一気に流れ落ち、千二百年にわたり詩人たちを魅了してきました。",
    },
    description: {
      en: "One of Japan's three great waterfalls. An elevator descends 100 m to the basin platform where the spray reaches you.",
      ja: "日本三名瀑のひとつ。エレベーターで100m下ると、飛沫が届く観瀑台へ。",
    },
    duration: { en: "60–90 min", ja: "60〜90分" },
    transport: {
      en: "Tōbu bus to Chūzenji Onsen (45 min from Nikko Stn), 5 min walk. Bus riders earn eco points.",
      ja: "東武バスで中禅寺温泉へ（日光駅から45分）、徒歩5分。バス利用でエコポイント。",
    },
    sustainability: {
      en: "Stay on marked platforms; the gorge is a protected raptor nesting area.",
      ja: "観瀑台から外れないでください。渓谷は猛禽類の保護営巣地です。",
    },
    themes: ["nature"],
    ecoPoints: 30,
    art: { hues: [200, 165], variant: "falls" },
    reviews: [
      {
        rating: 5,
        reviewer: "Mei L.",
        nationality: { en: "Taiwan", ja: "台湾" },
        date: "2026-05-19",
        text: {
          en: "The sound arrives before the view. Took the bus up and the app logged my eco points automatically.",
          ja: "姿より先に音が届きます。バスで上がったらアプリが自動でエコポイントを記録してくれました。",
        },
      },
    ],
  },
  {
    id: "toshogu",
    name: { en: "Tōshōgū Shrine", ja: "日光東照宮" },
    history: {
      en: "Mausoleum of Tokugawa Ieyasu, completed 1636. Over 5,000 carvings — including the Three Wise Monkeys and the Sleeping Cat — by the era's master artisans.",
      ja: "徳川家康公を祀る霊廟。1636年完成。三猿や眠り猫など、当代随一の職人による5,000超の彫刻。",
    },
    description: {
      en: "UNESCO World Heritage. Gilded gates, cedar avenues, and the five-storey pagoda — allow a slow half day.",
      ja: "世界遺産。陽明門、杉並木、五重塔。半日かけてゆっくりと。",
    },
    duration: { en: "2–3 hours", ja: "2〜3時間" },
    transport: {
      en: "20 min walk from Tōbu-Nikkō Station along the World Heritage route, or city loop bus.",
      ja: "東武日光駅から世界遺産ルートを徒歩20分、または市内循環バス。",
    },
    sustainability: {
      en: "Walking the cedar avenue instead of driving earns eco points and protects 400-year-old roots from soil compaction.",
      ja: "杉並木を徒歩で。エコポイントが貯まり、樹齢400年の根を踏圧から守れます。",
    },
    themes: ["heritage"],
    ecoPoints: 40,
    art: { hues: [350, 40], variant: "shrine" },
    reviews: [
      {
        rating: 5,
        reviewer: "Akira S.",
        nationality: { en: "Japan", ja: "日本" },
        date: "2026-04-29",
        text: {
          en: "Came for the Yōmeimon, stayed for the quiet back paths the app's heritage itinerary suggested.",
          ja: "陽明門が目当てでしたが、アプリの行程が教えてくれた静かな裏参道に心を掴まれました。",
        },
      },
    ],
  },
  {
    id: "lake-chuzenji",
    name: { en: "Lake Chūzenji", ja: "中禅寺湖" },
    history: {
      en: "Formed 20,000 years ago when Mt. Nantai erupted and dammed the valley. In the Meiji era, foreign embassies built summer villas along its shore.",
      ja: "約2万年前、男体山の噴火が谷をせき止めて誕生。明治期には各国大使館の別荘が湖畔に並びました。",
    },
    description: {
      en: "Japan's highest large lake (1,269 m). Kayaking, the Italian Embassy Villa, and a 25 km shoreline cycling loop.",
      ja: "日本一標高の高い大きな湖（1,269m）。カヤック、イタリア大使館別荘記念公園、湖畔25kmのサイクリング。",
    },
    duration: { en: "Half day", ja: "半日" },
    transport: {
      en: "Tōbu bus via the Irohazaka winding road; e-bike rental at Chūzenji Onsen.",
      ja: "いろは坂経由の東武バス。中禅寺温泉に電動自転車レンタルあり。",
    },
    sustainability: {
      en: "Electric boats only since 2024; cycling the loop earns the highest transport eco rate.",
      ja: "2024年から電動ボートのみ。湖畔サイクリングは最高レートのエコポイント対象。",
    },
    themes: ["nature"],
    ecoPoints: 50,
    art: { hues: [215, 180], variant: "lake" },
    reviews: [
      {
        rating: 5,
        reviewer: "Tom H.",
        nationality: { en: "United Kingdom", ja: "イギリス" },
        date: "2026-05-30",
        text: {
          en: "Cycled the full loop. Legs destroyed, eco score thriving.",
          ja: "湖畔一周をサイクリング。脚は限界、エコスコアは絶好調。",
        },
      },
    ],
  },
  {
    id: "senjogahara",
    name: { en: "Senjōgahara Marshland", ja: "戦場ヶ原" },
    history: {
      en: "Its name — 'battlefield plain' — comes from a legend of gods warring over Lake Chūzenji. The 400-hectare marsh is a Ramsar-listed wetland.",
      ja: "名は中禅寺湖をめぐる神々の戦いの伝説から。400haの湿原はラムサール条約登録地。",
    },
    description: {
      en: "A 2-hour boardwalk hike between Yumoto and Ryūzu Falls, with 350 plant species and dawn birdwatching.",
      ja: "湯元と竜頭の滝を結ぶ木道ハイキング（約2時間）。350種の植物と、夜明けの野鳥観察。",
    },
    duration: { en: "2–3 hours", ja: "2〜3時間" },
    transport: {
      en: "Bus to Akanuma or Shōbugahama; the trail is one-way friendly with bus return.",
      ja: "赤沼または菖蒲ヶ浜までバス。片道ハイク＋バス帰着が便利。",
    },
    sustainability: {
      en: "Boardwalk only — one footprint off-trail can take the peat decades to recover.",
      ja: "必ず木道の上を。湿原の泥炭は一度の踏み跡の回復に数十年かかります。",
    },
    themes: ["nature"],
    ecoPoints: 60,
    art: { hues: [80, 200], variant: "marsh" },
    reviews: [
      {
        rating: 5,
        reviewer: "Hana W.",
        nationality: { en: "Japan", ja: "日本" },
        date: "2026-06-02",
        text: {
          en: "Mist on the marsh at 6 am, cuckoo calls, nobody around. The quietest place I've been this year.",
          ja: "朝6時、霧の湿原にカッコウの声。今年いちばん静かな場所でした。",
        },
      },
    ],
  },
  {
    id: "rinnoji",
    name: { en: "Rinnōji Temple", ja: "輪王寺" },
    history: {
      en: "Founded in 766 by Shōdō Shōnin, the temple anchored Nikko's mountain-worship tradition for over 1,200 years. Its Sanbutsudō hall houses three 8 m gilded Buddhas.",
      ja: "766年、勝道上人の開山。1200年以上にわたり日光山岳信仰の中心。三仏堂には高さ8mの金色三体仏。",
    },
    description: {
      en: "The spiritual heart of the World Heritage complex, with the Shōyōen strolling garden at its side.",
      ja: "世界遺産エリアの精神的中心。逍遥園の回遊式庭園も併設。",
    },
    duration: { en: "60–90 min", ja: "60〜90分" },
    transport: { en: "Adjacent to Tōshōgū; covered by the heritage walking route.", ja: "東照宮に隣接。世界遺産ウォーキングルート上。" },
    sustainability: {
      en: "Entry fees directly fund the ongoing cypress-bark roof restoration.",
      ja: "拝観料は檜皮葺屋根の保存修理に充てられています。",
    },
    themes: ["heritage"],
    ecoPoints: 35,
    art: { hues: [30, 0], variant: "shrine" },
    reviews: [
      {
        rating: 4,
        reviewer: "Carlos M.",
        nationality: { en: "Spain", ja: "スペイン" },
        date: "2026-02-20",
        text: {
          en: "The three Buddhas in candlelight stopped me mid-step. Go early, before the groups.",
          ja: "灯明に浮かぶ三体仏に足が止まりました。団体客の前、朝一番がおすすめ。",
        },
      },
    ],
  },
  {
    id: "kanmangafuchi",
    name: { en: "Kanmangafuchi Abyss", ja: "憾満ヶ淵" },
    history: {
      en: "A lava gorge carved by the Daiya River, lined with about 70 moss-covered Jizō statues — the 'Bake Jizō' said to change in number each time you count.",
      ja: "大谷川が刻んだ溶岩の渓谷。苔むした約70体の地蔵が並び、数えるたびに数が変わる「化け地蔵」と呼ばれます。",
    },
    description: {
      en: "A 30-minute riverside walk from town that most visitors miss — red-capped Jizō, river roar, deep shade.",
      ja: "市街から徒歩30分、知る人ぞ知る川沿いの小道。赤い帽子の地蔵、川音、深い木陰。",
    },
    duration: { en: "45–60 min", ja: "45〜60分" },
    transport: { en: "25 min walk from the Shinkyo Bridge — a flagship walking-route for eco points.", ja: "神橋から徒歩25分。エコポイント対象の代表的ウォーキングルート。" },
    sustainability: {
      en: "Touch nothing mossy — the moss layer takes years to regrow and protects the stone.",
      ja: "苔には触れないで。再生に何年もかかり、石仏を守る役割もあります。",
    },
    themes: ["heritage", "nature"],
    ecoPoints: 40,
    art: { hues: [150, 215], variant: "forest" },
    reviews: [
      {
        rating: 5,
        reviewer: "Yuki N.",
        nationality: { en: "Japan", ja: "日本" },
        date: "2026-05-07",
        text: {
          en: "I counted 72 Jizō on the way in and 74 on the way out. The legend stands.",
          ja: "行きは72体、帰りは74体。伝説は本当でした。",
        },
      },
    ],
  },
];

/* -------------------------------- Experiences ------------------------------ */

export const experiences: Experience[] = [
  {
    id: "dawn-kayak",
    name: { en: "Dawn Kayak on Lake Chūzenji", ja: "中禅寺湖 夜明けのカヤック" },
    description: {
      en: "Launch before sunrise with a local guide; coffee brewed on the shore as Mt. Nantai turns pink.",
      ja: "日の出前に出艇。男体山が薄紅に染まる頃、湖岸で淹れるコーヒーを。",
    },
    duration: { en: "3 hours", ja: "3時間" },
    themes: ["nature"],
    priceJpy: 8500,
    ecoPoints: 80,
    art: { hues: [220, 320], variant: "lake" },
  },
  {
    id: "cedar-walk",
    name: { en: "Cedar Avenue Heritage Walk", ja: "日光杉並木ヘリテージウォーク" },
    description: {
      en: "Walk a preserved stretch of the 35 km Edo-period cedar avenue with a conservation guide.",
      ja: "全長35kmの江戸期の杉並木。保全ガイドと歩く特別区間。",
    },
    duration: { en: "2 hours", ja: "2時間" },
    themes: ["heritage", "nature"],
    priceJpy: 3000,
    ecoPoints: 60,
    art: { hues: [140, 90], variant: "forest" },
  },
  {
    id: "yuba-workshop",
    name: { en: "Yuba Lifting Workshop", ja: "湯波引き体験" },
    description: {
      en: "Lift your own yuba sheets from simmering soy milk at a 150-year-old workshop, then eat them three ways.",
      ja: "創業150年の湯波屋で、湯葉引きに挑戦。引きたてを三つの味わいで。",
    },
    duration: { en: "90 min", ja: "90分" },
    themes: ["food", "heritage"],
    priceJpy: 4200,
    ecoPoints: 30,
    art: { hues: [45, 25], variant: "town" },
  },
  {
    id: "goshuin-trail",
    name: { en: "Goshuin Stamp Trail", ja: "御朱印トレイル" },
    description: {
      en: "Collect hand-brushed temple stamps across five sites on foot — your Nikko Passport mirrors each one digitally.",
      ja: "5つの社寺を徒歩でめぐり御朱印を拝受。日光パスポートにもデジタル印影が刻まれます。",
    },
    duration: { en: "Half day", ja: "半日" },
    themes: ["heritage"],
    priceJpy: 2500,
    ecoPoints: 70,
    art: { hues: [355, 35], variant: "shrine" },
  },
  {
    id: "marsh-birding",
    name: { en: "Senjōgahara Dawn Birding", ja: "戦場ヶ原 早朝バードウォッチング" },
    description: {
      en: "A naturalist-led boardwalk circuit at first light — scopes provided, sightings logged to your eco journal.",
      ja: "夜明けの木道をナチュラリストと。スコープ貸出、観察記録はエコ日誌へ。",
    },
    duration: { en: "2.5 hours", ja: "2.5時間" },
    themes: ["nature"],
    priceJpy: 3800,
    ecoPoints: 90,
    art: { hues: [85, 195], variant: "marsh" },
  },
  {
    id: "market-breakfast",
    name: { en: "Morning Market Breakfast Tour", ja: "朝市あさごはんツアー" },
    description: {
      en: "Meet the growers at the farmers' market, assemble a seasonal breakfast, pay stall-to-stall with Lightning.",
      ja: "直売所で生産者と話しながら旬の朝食を組み立て、屋台ごとにライトニングで支払い。",
    },
    duration: { en: "2 hours", ja: "2時間" },
    themes: ["food"],
    priceJpy: 2800,
    ecoPoints: 45,
    art: { hues: [15, 95], variant: "town" },
  },
];

/* ------------------------------ Rewards content ---------------------------- */

export const badges: Badge[] = [
  { id: "first-steps", threshold: 50, icon: "footprints", name: { en: "First Steps", ja: "はじめの一歩" }, description: { en: "Earn your first 50 eco points.", ja: "最初の50エコポイントを獲得。" } },
  { id: "cedar-guardian", threshold: 150, icon: "trees", name: { en: "Cedar Guardian", ja: "杉並木の守り手" }, description: { en: "150 points — you chose feet over wheels.", ja: "150pt。車ではなく、足で旅した証。" } },
  { id: "lake-circler", threshold: 300, icon: "bike", name: { en: "Lake Circler", ja: "湖畔一周" }, description: { en: "300 points — the Chūzenji loop bows to you.", ja: "300pt。中禅寺湖一周の覇者。" } },
  { id: "marsh-whisperer", threshold: 500, icon: "bird", name: { en: "Marsh Whisperer", ja: "湿原の語り部" }, description: { en: "500 points — Senjōgahara knows your footsteps.", ja: "500pt。戦場ヶ原があなたの足音を覚えました。" } },
  { id: "carbon-neutral", threshold: 800, icon: "leaf", name: { en: "Carbon Neutral Traveler", ja: "カーボンニュートラル旅人" }, description: { en: "800 points — your trip removes more than it emits.", ja: "800pt。排出より削減が多い旅。" } },
  { id: "nikko-laureate", threshold: 1200, icon: "award", name: { en: "Nikko Laureate", ja: "日光の栄誉" }, description: { en: "1,200 points — the city's highest travel honor.", ja: "1,200pt。市が贈る最高の旅の栄誉。" } },
];

export const redeemOptions: RedeemOption[] = [
  { id: "hotel-10", cost: 400, name: { en: "10% off a partner hotel stay", ja: "提携ホテル10%割引" }, kind: { en: "Hotel discount", ja: "ホテル割引" } },
  { id: "soba-set", cost: 150, name: { en: "Soba lunch set at Mizuoto", ja: "水音のそばランチセット" }, kind: { en: "Restaurant", ja: "レストラン" } },
  { id: "kegon-ticket", cost: 120, name: { en: "Kegon Falls elevator ticket", ja: "華厳の滝エレベーター券" }, kind: { en: "Attraction", ja: "観光施設" } },
  { id: "tenugui", cost: 200, name: { en: "Indigo-dyed Nikko tenugui", ja: "藍染の日光手ぬぐい" }, kind: { en: "Souvenir", ja: "お土産" } },
  { id: "next-trip", cost: 600, name: { en: "¥3,000 credit toward your next trip", ja: "次回の旅で使える3,000円クレジット" }, kind: { en: "Future travel", ja: "次回旅行" } },
];

export const leaderboard = [
  { name: "Sora", points: 1340 },
  { name: "Abhishek", points: 1180 },
  { name: "Mika", points: 960 },
  { name: "you", points: 0 }, // replaced at runtime
  { name: "Ken", points: 540 },
  { name: "Lena", points: 410 },
];

/* ------------------------- Home page dynamic content ------------------------ */

export const announcements = [
  {
    id: "a1",
    date: "2026-06-08",
    text: {
      en: "Lake Chūzenji electric ferry adds a sunset service through August.",
      ja: "中禅寺湖の電動遊覧船、8月までサンセット便を増便。",
    },
  },
  {
    id: "a2",
    date: "2026-06-05",
    text: {
      en: "Firefly viewing nights at Kanmangafuchi begin June 20 — walking visitors only.",
      ja: "憾満ヶ淵のホタル観賞会は6月20日から。徒歩来場者限定です。",
    },
  },
  {
    id: "a3",
    date: "2026-06-01",
    text: {
      en: "30 new merchants now accept Lightning payments across Nikko Town.",
      ja: "日光市街で新たに30店舗がライトニング決済に対応しました。",
    },
  },
];

export const promotions = [
  {
    id: "p1",
    text: {
      en: "Double Nikko Coin on all Lightning payments this weekend.",
      ja: "今週末はライトニング決済の日光コインが2倍。",
    },
  },
  {
    id: "p2",
    text: {
      en: "Rainy-season special: +20 eco points for every umbrella-walk itinerary completed.",
      ja: "梅雨の特別企画：雨の日ウォーキング行程の完了で＋20エコポイント。",
    },
  },
];

export const initialTransactions: LightningTx[] = [
  {
    id: "tx-3",
    kind: "send",
    sats: 4200,
    memo: { en: "Soba lunch — Mizuoto", ja: "そばランチ（水音）" },
    date: "2026-06-09T12:14:00+09:00",
    coinEarned: 4,
    counterparty: "soba-mizuoto@pay.nikko.jp",
  },
  {
    id: "tx-2",
    kind: "send",
    sats: 1800,
    memo: { en: "Bus fare — Chūzenji line", ja: "バス運賃（中禅寺線）" },
    date: "2026-06-09T09:31:00+09:00",
    coinEarned: 2,
    counterparty: "tobu-bus@pay.nikko.jp",
  },
  {
    id: "tx-1",
    kind: "receive",
    sats: 25000,
    memo: { en: "Wallet top-up", ja: "ウォレットチャージ" },
    date: "2026-06-08T18:02:00+09:00",
    coinEarned: 0,
    counterparty: "self",
  },
];

export const initialReservations: Reservation[] = [
  {
    id: "r1",
    what: { en: "Yuba Lifting Workshop", ja: "湯波引き体験" },
    where: { en: "Nikko Town workshop district", ja: "日光市街・職人町" },
    date: "2026-06-12",
    time: "10:00",
  },
];

export const lightningWallets = [
  { id: "wos", name: "Wallet of Satoshi" },
  { id: "phoenix", name: "Phoenix" },
  { id: "alby", name: "Alby" },
  { id: "breez", name: "Breez" },
  { id: "blink", name: "Blink" },
];

/* --------------------------------- Social --------------------------------- */

export const initialSocialPosts: SocialPost[] = [
  {
    id: "post-1",
    author: "Mei L.",
    nationality: { en: "Taiwan", ja: "台湾" },
    kind: "itinerary",
    themes: ["nature", "heritage"],
    title: {
      en: "Two-day slow Nikko: shrines, marsh, lake",
      ja: "ゆっくり日光 二日間：社寺・湿原・湖",
    },
    body: {
      en: "Day 1: cedar avenue walk → Tōshōgū → Rinnōji at dusk. Day 2: dawn marsh boardwalk, then kayak Chūzenji. Paid every bus and meal with Lightning — wallet barely noticed.",
      ja: "1日目：杉並木を歩いて東照宮、夕暮れに輪王寺。2日目：夜明けの戦場ヶ原、中禅寺湖でカヤック。バスも食事もライトニングで支払い、財布いらず。",
    },
    spots: ["toshogu", "rinnoji", "senjogahara", "lake-chuzenji"],
    date: "2026-06-08",
    likes: 124,
    comments: [
      {
        id: "c1",
        author: "Akira S.",
        text: "Cedar avenue at sunrise is the secret. Thank you for the loop tip!",
        date: "2026-06-09",
      },
      {
        id: "c2",
        author: "Sam W.",
        text: "Did this last week. The dawn marsh part is unreal.",
        date: "2026-06-10",
      },
    ],
    art: { hues: [205, 160], variant: "shrine" },
  },
  {
    id: "post-2",
    author: "Priya S.",
    nationality: { en: "India", ja: "インド" },
    kind: "photo",
    themes: ["nature"],
    title: {
      en: "Morning mist over Lake Chūzenji",
      ja: "中禅寺湖の朝霧",
    },
    body: {
      en: "Ten steps from the lodge door, kayak on the rack, lake to myself. The eco points were a bonus — the silence was the prize.",
      ja: "ロッジから10歩、ラックのカヤック、湖は独り占め。エコポイントはおまけ、本当のごほうびは静けさでした。",
    },
    spots: ["chuzenji-lakeside", "lake-chuzenji"],
    date: "2026-06-04",
    likes: 318,
    comments: [
      {
        id: "c3",
        author: "Tom H.",
        text: "Saving this for next spring. Which lodge did you stay at?",
        date: "2026-06-05",
      },
    ],
    art: { hues: [215, 180], variant: "lake" },
  },
  {
    id: "post-3",
    author: "Jonas F.",
    nationality: { en: "Sweden", ja: "スウェーデン" },
    kind: "tip",
    themes: ["food", "heritage"],
    title: {
      en: "Lightning-friendly cafés around the shrine route",
      ja: "社寺ルート周辺のライトニング対応カフェ",
    },
    body: {
      en: "Kissa Raiden, Irodori Market Kitchen, and the soba counter at Mizuoto all took sats. Tap, ten seconds, done.",
      ja: "喫茶雷電、いろどり市場キッチン、水音のカウンター。どこもsatsで一瞬支払い完了。",
    },
    spots: ["kissa-raiden", "irodori-market-kitchen", "soba-mizuoto"],
    date: "2026-05-29",
    likes: 96,
    comments: [],
    art: { hues: [260, 30], variant: "town" },
  },
  {
    id: "post-4",
    author: "Margaux D.",
    nationality: { en: "France", ja: "フランス" },
    kind: "itinerary",
    themes: ["food", "heritage"],
    title: {
      en: "A winter onsen + yuba weekend",
      ja: "冬の温泉と湯波の週末" ,
    },
    body: {
      en: "Yumoto Onsen Ryokan for two nights, yuba kaiseki dinner, sulfur baths in falling snow. Sleep, soak, eat — repeat.",
      ja: "湯元温泉の旅館に2泊、湯波の会席、雪の中の硫黄泉。寝て、浸かって、食べて、繰り返し。",
    },
    spots: ["yumoto-onsen-ryokan", "yuba-zen"],
    date: "2026-05-20",
    likes: 211,
    comments: [
      {
        id: "c4",
        author: "Elena P.",
        text: "The yuba kaiseki at Zen converted me too.",
        date: "2026-05-21",
      },
    ],
    art: { hues: [25, 160], variant: "onsen" },
  },
];

/* ------------------------------- Live data -------------------------------- */

export const liveWeather: WeatherSnapshot = {
  tempC: 19,
  feelsC: 17,
  humidity: 78,
  windMs: 2,
  condition: { en: "Partly cloudy", ja: "晴れ時々曇り" },
  icon: "cloud",
  updated: "2026-06-19T08:00:00+09:00",
};

export const transitDepartures: TransitDeparture[] = [
  {
    id: "t1",
    line: { en: "Tōbu Bus · Chūzenji line", ja: "東武バス・中禅寺線" },
    destination: { en: "Chūzenji Onsen", ja: "中禅寺温泉" },
    from: { en: "Tōbu-Nikkō Stn (Bay 2A)", ja: "東武日光駅 2A乗り場" },
    scheduled: "09:15",
    delayMin: 0,
    mode: "bus",
  },
  {
    id: "t2",
    line: { en: "Tōbu Bus · Yumoto line", ja: "東武バス・湯元線" },
    destination: { en: "Yumoto Onsen", ja: "湯元温泉" },
    from: { en: "Tōbu-Nikkō Stn (Bay 2B)", ja: "東武日光駅 2B乗り場" },
    scheduled: "09:32",
    delayMin: 4,
    mode: "bus",
  },
  {
    id: "t3",
    line: { en: "JR Nikkō Line", ja: "JR日光線" },
    destination: { en: "Utsunomiya", ja: "宇都宮" },
    from: { en: "JR Nikkō Station", ja: "JR日光駅" },
    scheduled: "09:48",
    delayMin: 0,
    mode: "train",
  },
  {
    id: "t4",
    line: { en: "City Loop Bus · World Heritage route", ja: "市内循環・世界遺産ルート" },
    destination: { en: "Tōshōgū / Rinnōji", ja: "東照宮・輪王寺" },
    from: { en: "Shinkyo Bridge stop", ja: "神橋バス停" },
    scheduled: "09:21",
    delayMin: 0,
    mode: "bus",
  },
  {
    id: "t5",
    line: { en: "Tōbu Spacia X · Limited Express", ja: "東武スペーシアX・特急" },
    destination: { en: "Asakusa", ja: "浅草" },
    from: { en: "Tōbu-Nikkō Stn", ja: "東武日光駅" },
    scheduled: "10:05",
    delayMin: 0,
    mode: "train",
  },
];

export const shrineHours: ShrineHours[] = [
  {
    id: "toshogu",
    name: { en: "Tōshōgū Shrine", ja: "日光東照宮" },
    open: "08:00",
    close: "17:00",
    lastEntry: "16:30",
    status: "open",
  },
  {
    id: "rinnoji",
    name: { en: "Rinnōji Temple", ja: "輪王寺" },
    open: "08:00",
    close: "17:00",
    lastEntry: "16:00",
    status: "open",
  },
  {
    id: "futarasan",
    name: { en: "Futarasan Shrine", ja: "二荒山神社" },
    open: "08:00",
    close: "17:00",
    lastEntry: "16:30",
    status: "open",
  },
  {
    id: "taiyuin",
    name: { en: "Taiyū-in Mausoleum", ja: "大猷院" },
    open: "08:30",
    close: "16:30",
    lastEntry: "16:00",
    status: "closing-soon",
    note: {
      en: "Roof restoration in progress on the east wing.",
      ja: "東翼で屋根保存修理中。",
    },
  },
];

export const foliageReports: FoliageReport[] = [
  {
    id: "f1",
    location: { en: "Irohazaka winding road", ja: "いろは坂" },
    kind: "foliage",
    stage: "buds",
    forecastDays: 120,
    note: {
      en: "Green now — peak forecast mid-October.",
      ja: "現在は新緑。見頃は10月中旬の予報。",
    },
  },
  {
    id: "f2",
    location: { en: "Senjōgahara Marshland", ja: "戦場ヶ原" },
    kind: "azalea",
    stage: "peak",
    forecastDays: 0,
    note: {
      en: "Azalea bloom at peak this week — best at sunrise.",
      ja: "今週、ツツジが見頃。朝が一番です。",
    },
  },
  {
    id: "f3",
    location: { en: "Kanmangafuchi Abyss", ja: "憾満ヶ淵" },
    kind: "foliage",
    stage: "early",
    forecastDays: 14,
    note: {
      en: "Moss is at its richest after the rainy spell.",
      ja: "梅雨明けの苔がいちばん深い緑です。",
    },
  },
  {
    id: "f4",
    location: { en: "Yumoto Onsen forest", ja: "湯元温泉の森" },
    kind: "foliage",
    stage: "off",
    forecastDays: 95,
    note: {
      en: "Wait for late September — larch turns gold first.",
      ja: "9月下旬から。カラマツが先に黄金色に。",
    },
  },
];

export const crowdLevels: CrowdLevel[] = [
  { id: "cl-toshogu", spot: { en: "Tōshōgū main gate", ja: "東照宮 表門" }, level: "moderate", trend: "up", waitMin: 8 },
  { id: "cl-kegon", spot: { en: "Kegon Falls elevator", ja: "華厳の滝エレベーター" }, level: "busy", trend: "steady", waitMin: 22 },
  { id: "cl-shinkyo", spot: { en: "Shinkyo Bridge", ja: "神橋" }, level: "quiet", trend: "steady", waitMin: 0 },
  { id: "cl-yuba", spot: { en: "Yuba Kaiseki Zen counter", ja: "湯波会席 然 カウンター" }, level: "quiet", trend: "down", waitMin: 0 },
  { id: "cl-chuzenji", spot: { en: "Chūzenji Onsen bus stop", ja: "中禅寺温泉バス停" }, level: "packed", trend: "up", waitMin: 35 },
];

export const localEvents: LocalEvent[] = [
  {
    id: "ev-firefly",
    name: { en: "Kanmangafuchi Firefly Nights", ja: "憾満ヶ淵ホタル観賞会" },
    where: { en: "Kanmangafuchi riverside", ja: "憾満ヶ淵 川沿い" },
    start: "2026-06-20T19:30:00+09:00",
    end: "2026-07-12T21:30:00+09:00",
    description: {
      en: "Guided low-light walks; walking visitors only to protect the gorge.",
      ja: "低照度ガイドウォーク。渓谷保護のため徒歩来場者限定。",
    },
    themes: ["nature"],
  },
  {
    id: "ev-ferry",
    name: { en: "Chūzenji Sunset Electric Ferry", ja: "中禅寺湖 夕暮れ電動遊覧船" },
    where: { en: "Lake Chūzenji pier", ja: "中禅寺湖 桟橋" },
    start: "2026-06-15T17:30:00+09:00",
    end: "2026-08-31T19:30:00+09:00",
    description: {
      en: "Extra sunset service added through August.",
      ja: "8月までサンセット便を増便。",
    },
    themes: ["nature"],
  },
  {
    id: "ev-shrine-night",
    name: { en: "Tōshōgū Lantern Evening", ja: "東照宮 灯篭の夕べ" },
    where: { en: "Tōshōgū Yōmeimon", ja: "東照宮 陽明門" },
    start: "2026-07-04T18:30:00+09:00",
    end: "2026-07-04T21:00:00+09:00",
    description: {
      en: "Once-a-year candle-lit opening of the Yōmeimon precinct.",
      ja: "年に一度、陽明門境内のろうそく特別拝観。",
    },
    themes: ["heritage"],
  },
  {
    id: "ev-yuba-market",
    name: { en: "Yuba & Soba Open Market", ja: "湯波とそば 青空市" },
    where: { en: "Imaichi market square", ja: "今市 市場広場" },
    start: "2026-06-22T08:00:00+09:00",
    end: "2026-06-22T13:00:00+09:00",
    description: {
      en: "Tasting stalls from 14 producers — Lightning accepted at most.",
      ja: "生産者14店の試食市。多くがライトニング決済対応。",
    },
    themes: ["food"],
  },
];
