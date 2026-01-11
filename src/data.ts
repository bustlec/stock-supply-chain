export interface Stock {
  name: string;
  code: string;
  note?: string;
}

export interface SubCategory {
  name: string;
  stocks: Stock[];
}

export interface Stage {
  stageName: string; // e.g., "上游：矽智財"
  subCategories: SubCategory[];
}

export interface SupplyChainIndustry {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  colorClass: string;
  stages: Stage[];
}

export interface ClassicCategory {
  title: string;
  icon: string;
  colorClass: string;
  groups: SubCategory[];
}

export const MAINSTREAM_DATA: SupplyChainIndustry[] = [
  {
    id: 'ai',
    title: 'AI 伺服器供應鏈 (AI Server)',
    subtitle: '貫穿 IP 設計、晶圓製造、先進封裝至組裝的完整生態系',
    icon: '🤖',
    colorClass: 'from-indigo-600 to-violet-600',
    stages: [
      {
        stageName: '上游：矽智財與晶片設計 (IP & Design)',
        subCategories: [
          {
            name: 'IP 矽智財 (設計藍圖)',
            stocks: [
              { name: '力旺', code: '3529' },
              { name: 'M31', code: '6643' },
              { name: '晶心科', code: '6533' }
            ]
          },
          {
            name: 'ASIC 設計服務',
            stocks: [
              { name: '世芯-KY', code: '3661' },
              { name: '創意', code: '3443' },
              { name: '智原', code: '3035' },
              { name: '愛普*', code: '6531' }
            ]
          }
        ]
      },
      {
        stageName: '中游：晶圓製造與先進封裝 (Foundry & CoWoS)',
        subCategories: [
          {
            name: '晶圓代工',
            stocks: [
              { name: '台積電', code: '2330' }
            ]
          },
          {
            name: 'CoWoS 設備',
            stocks: [
              { name: '弘塑', code: '3131', note: '濕製程' },
              { name: '辛耘', code: '3583', note: '濕製程' },
              { name: '萬潤', code: '6187', note: '貼合' },
              { name: '均華', code: '6640', note: '檢測' },
              { name: '志聖', code: '2467' },
              { name: '雷科', code: '6207' }
            ]
          },
          {
            name: '檢測與耗材',
            stocks: [
              { name: '閎康', code: '3587' },
              { name: '宜特', code: '3289' },
              { name: '中砂', code: '1560' }
            ]
          },
          {
            name: '封測',
            stocks: [
              { name: '日月光投控', code: '3711' },
              { name: '京元電', code: '2449' }
            ]
          }
        ]
      },
      {
        stageName: '中游：關鍵零組件 (Components)',
        subCategories: [
          {
            name: '散熱 (氣冷/液冷)',
            stocks: [
              { name: '奇鋐', code: '3017' },
              { name: '雙鴻', code: '3324' },
              { name: '力致', code: '3483' },
              { name: '高力', code: '8996' },
              { name: '廣運', code: '6125' },
              { name: '建準', code: '2421' }
            ]
          },
          {
            name: 'PCB / CCL',
            stocks: [
              { name: '金像電', code: '2368' },
              { name: '台光電', code: '2383' },
              { name: '台燿', code: '6274' },
              { name: '聯茂', code: '6213' }
            ]
          },
          {
            name: '電源供應器',
            stocks: [
              { name: '台達電', code: '2308' },
              { name: '光寶科', code: '2301' },
              { name: '群電', code: '6412' }
            ]
          },
          {
            name: '機殼與導軌',
            stocks: [
              { name: '勤誠', code: '8210' },
              { name: '川湖', code: '2059' },
              { name: '營邦', code: '3693' }
            ]
          },
          {
            name: '高速傳輸/連接器',
            stocks: [
              { name: '嘉澤', code: '3533' },
              { name: '優群', code: '3217' }
            ]
          }
        ]
      },
      {
        stageName: '下游：組裝與品牌 (ODM / OEM)',
        subCategories: [
          {
            name: 'AI 伺服器組裝',
            stocks: [
              { name: '鴻海', code: '2317' },
              { name: '廣達', code: '2382' },
              { name: '緯創', code: '3231' },
              { name: '緯穎', code: '6669' },
              { name: '技嘉', code: '2376' },
              { name: '英業達', code: '2356' },
              { name: '神達', code: '3706' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'memory',
    title: '記憶體供應鏈 (Memory)',
    subtitle: '從顆粒製造、控制晶片到模組應用的關鍵存儲生態',
    icon: '💾',
    colorClass: 'from-purple-600 to-fuchsia-600',
    stages: [
      {
        stageName: '上游：顆粒製造 (Foundry / IDM)',
        subCategories: [
          {
            name: 'DRAM / Flash 製造',
            stocks: [
              { name: '南亞科', code: '2408', note: 'DRAM製造' },
              { name: '華邦電', code: '2344', note: 'NOR Flash' },
              { name: '旺宏', code: '2337', note: 'ROM/NOR' }
            ]
          }
        ]
      },
      {
        stageName: '上游：IC 設計與控制晶片 (Controller IC)',
        subCategories: [
          {
            name: '控制 IC 與設計',
            stocks: [
              { name: '群聯', code: '8299', note: 'NAND控制' },
              { name: '晶豪科', code: '3006' },
              { name: '點序', code: '6485' },
              { name: '鈺創', code: '5351' },
              { name: '愛普*', code: '6531', note: '3D堆疊' }
            ]
          }
        ]
      },
      {
        stageName: '下游：模組廠 (Module Makers)',
        subCategories: [
          {
            name: '消費性模組',
            stocks: [
              { name: '威剛', code: '3260', note: '模組龍頭' },
              { name: '十銓', code: '4967', note: 'DDR5' },
              { name: '創見', code: '2451' },
              { name: '廣穎', code: '4973' }
            ]
          },
          {
            name: '工控與特殊應用',
            stocks: [
              { name: '宜鼎', code: '5289', note: '工控AI' },
              { name: '宇瞻', code: '8271' }
            ]
          }
        ]
      },
      {
        stageName: '通路商 (Distributors)',
        subCategories: [
          {
            name: '半導體通路',
            stocks: [
              { name: '至上', code: '8112', note: '三星代理' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'energy',
    title: '重電與綠能供應鏈 (Grid & Energy)',
    subtitle: '受惠台電強韌電網計畫與美國基建需求',
    icon: '⚡',
    colorClass: 'from-emerald-600 to-teal-600',
    stages: [
      {
        stageName: '上游：原物料',
        subCategories: [
          {
            name: '銅材',
            stocks: [
              { name: '第一銅', code: '2009' }
            ]
          }
        ]
      },
      {
        stageName: '中游：電線電纜',
        subCategories: [
          {
            name: '線纜製造',
            stocks: [
              { name: '華新', code: '1605' },
              { name: '大亞', code: '1609' },
              { name: '合機', code: '1618' },
              { name: '宏泰', code: '1612' }
            ]
          }
        ]
      },
      {
        stageName: '下游：重電設備',
        subCategories: [
          {
            name: '重電四雄',
            stocks: [
              { name: '華城', code: '1519', note: '變壓器外銷龍頭' },
              { name: '中興電', code: '1513', note: 'GIS開關龍頭' },
              { name: '士電', code: '1503', note: '變壓器/電車樁' },
              { name: '亞力', code: '1514', note: '半導體廠配電' }
            ]
          }
        ]
      },
      {
        stageName: '綠能發電與儲能',
        subCategories: [
          {
            name: '營運與統包',
            stocks: [
              { name: '森崴能源', code: '6806' },
              { name: '雲豹能源', code: '6869' }
            ]
          },
          {
            name: '儲能系統',
            stocks: [
              { name: '盛達', code: '3027' },
              { name: '台達電', code: '2308' }
            ]
          }
        ]
      }
    ]
  }
];

export const CLASSIC_DATA: ClassicCategory[] = [
  {
    title: '蘋果 (Apple Concept)',
    icon: '🍎',
    colorClass: 'bg-gray-800 text-white',
    groups: [
      {
        name: '組裝/代工',
        stocks: [
          { name: '鴻海', code: '2317' }, { name: '和碩', code: '4938' },
          { name: '緯創', code: '3231' }, { name: '廣達', code: '2382' }, { name: '仁寶', code: '2324' }
        ]
      },
      {
        name: '光學鏡頭',
        stocks: [
          { name: '大立光', code: '3008' }, { name: '玉晶光', code: '3406' }, { name: '亞光', code: '3019' }
        ]
      },
      {
        name: '機殼/機構',
        stocks: [
          { name: '可成', code: '2474' }, { name: '鴻準', code: '2354' },
          { name: '新日興', code: '3376', note: '軸承' }, { name: '兆利', code: '3548' }
        ]
      },
      {
        name: '觸控/面板',
        stocks: [
          { name: 'TPK-KY', code: '3673' }, { name: 'GIS-KY', code: '6456' },
          { name: '瑞儀', code: '6176' }, { name: '茂林-KY', code: '4935' }
        ]
      },
      {
        name: 'PCB/軟板',
        stocks: [
          { name: '臻鼎-KY', code: '4958' }, { name: '華通', code: '2313' },
          { name: '台郡', code: '6269' }, { name: '欣興', code: '3037' },
          { name: '景碩', code: '3189' }, { name: '燿華', code: '2367' }
        ]
      }
    ]
  },
  {
    title: '特斯拉與電動車 (EV)',
    icon: '🚗',
    colorClass: 'bg-red-700 text-white',
    groups: [
      {
        name: '充電樁/電源',
        stocks: [
          { name: '台達電', code: '2308' }, { name: '華城', code: '1519' },
          { name: '飛宏', code: '2457' }, { name: '光寶科', code: '2301' }
        ]
      },
      {
        name: '電池材料',
        stocks: [
          { name: '康普', code: '4739' }, { name: '美琪瑪', code: '4721' }, { name: '立凱-KY', code: '5227' }
        ]
      },
      {
        name: '車用電子',
        stocks: [
          { name: '貿聯-KY', code: '3665' }, { name: '和大', code: '1536' },
          { name: '順德', code: '2351' }, { name: '健和興', code: '3003' }
        ]
      },
      {
        name: '車身/AM',
        stocks: [
          { name: '東陽', code: '1319' }, { name: '堤維西', code: '1522' },
          { name: '帝寶', code: '6605' }, { name: '乙盛-KY', code: '5243' }
        ]
      }
    ]
  },
  {
    title: '通訊與網通 (5G)',
    icon: '📡',
    colorClass: 'bg-sky-600 text-white',
    groups: [
      {
        name: 'PA (功率放大)',
        stocks: [
          { name: '穩懋', code: '3105' }, { name: '全新', code: '2455' }, { name: '宏捷科', code: '8086' }
        ]
      },
      {
        name: '網通設備',
        stocks: [
          { name: '智邦', code: '2345' }, { name: '智易', code: '3596' },
          { name: '中磊', code: '5388' }, { name: '啟碁', code: '6285' }
        ]
      },
      {
        name: '光通訊/矽光',
        stocks: [
          { name: '聯鈞', code: '3450' }, { name: '上詮', code: '3363' },
          { name: '光聖', code: '6442' }, { name: '波若威', code: '3163' }, { name: '訊芯-KY', code: '6451' }
        ]
      }
    ]
  },
  {
    title: '半導體與 IC 設計',
    icon: '💻',
    colorClass: 'bg-blue-800 text-white',
    groups: [
      {
        name: '矽晶圓',
        stocks: [
          { name: '環球晶', code: '6488' }, { name: '台勝科', code: '3532' }, { name: '合晶', code: '6182' }
        ]
      },
      {
        name: 'IC 設計',
        stocks: [
          { name: '聯發科', code: '2454' }, { name: '信驊', code: '5274' },
          { name: '祥碩', code: '5269' }, { name: '譜瑞-KY', code: '4966' },
          { name: '瑞昱', code: '2379' }, { name: '聯詠', code: '3034' }
        ]
      },
      {
        name: 'MOSFET',
        stocks: [
          { name: '大中', code: '6435' }, { name: '杰力', code: '5299' },
          { name: '富鼎', code: '8261' }, { name: '尼克森', code: '3317' }
        ]
      },
      {
        name: 'MCU/其他',
        stocks: [
          { name: '新唐', code: '4919' }, { name: '盛群', code: '6202' }, { name: '義隆', code: '2458' }
        ]
      }
    ]
  },
  {
    title: '傳產與其他重要族群',
    icon: '🏗️',
    colorClass: 'bg-stone-600 text-white',
    groups: [
      {
        name: '軍工航太',
        stocks: [
          { name: '漢翔', code: '2634' }, { name: '雷虎', code: '8033' },
          { name: '全訊', code: '5222' }, { name: '榮剛', code: '5009' }
        ]
      },
      {
        name: '生技醫療',
        stocks: [
          { name: '保瑞', code: '6472' }, { name: '藥華藥', code: '6446' },
          { name: '大江', code: '8436' }, { name: '美時', code: '1795' }
        ]
      },
      {
        name: '散裝/貨櫃',
        stocks: [
          { name: '長榮', code: '2603' }, { name: '陽明', code: '2609' },
          { name: '萬海', code: '2615' }, { name: '慧洋-KY', code: '2637' }
        ]
      },
      {
        name: '金融',
        stocks: [
          { name: '富邦金', code: '2881' }, { name: '國泰金', code: '2882' },
          { name: '中信金', code: '2891' }, { name: '兆豐金', code: '2886' }
        ]
      },
      {
        name: '紡織/自行車',
        stocks: [
          { name: '儒鴻', code: '1476' }, { name: '聚陽', code: '1477' },
          { name: '巨大', code: '9921' }, { name: '美利達', code: '9914' }
        ]
      }
    ]
  }
];