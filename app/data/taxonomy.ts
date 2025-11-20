// 标签分类体系

export type Tag =
  // 时代背景
  | 'era.modern' | 'era.academy' | 'era.court' | 'era.future' | 'era.apoc'
  // 超自然程度
  | 'super.none' | 'super.low' | 'super.high' | 'super.sci'
  // 秩序程度
  | 'order.daily' | 'order.rules' | 'order.dark' | 'order.anarchy'
  // 暴力程度
  | 'violence.low' | 'violence.mid' | 'violence.high'
  // 基调
  | 'tone.light' | 'tone.neutral' | 'tone.dark'
  // 关系属性
  | 'rel.gentle' | 'rel.protect' | 'rel.control' | 'rel.obsess' | 'rel.enemy' | 'rel.hunt' | 'rel.redemption';

// 世界观分支 → 标签映射
export const WORLD_TAGS: Record<string, Tag[]> = {
  'modern.light': ['era.modern','super.none','order.daily','violence.low','tone.light'],
  'modern.dark':  ['era.modern','super.none','order.dark','violence.mid','tone.dark'],
  'modern.mafia': ['era.modern','super.none','order.dark','violence.high','tone.dark'],

  'campus.normal': ['era.academy','super.none','order.rules','violence.low','tone.light'],
  'campus.elite':  ['era.academy','super.none','order.rules','violence.mid','tone.neutral'],

  'court.intrigue': ['era.court','super.low','order.rules','violence.mid','tone.dark'],
  'court.magic':    ['era.court','super.high','order.rules','violence.mid','tone.neutral'],

  'future.cyber': ['era.future','super.sci','order.dark','violence.mid','tone.neutral'],
  'future.abo':   ['era.future','super.sci','order.rules','violence.mid','tone.neutral'],

  'apoc.survival': ['era.apoc','super.none','order.anarchy','violence.high','tone.dark'],
  'apoc.virus':    ['era.apoc','super.low','order.anarchy','violence.high','tone.dark'],

  'ancient-jianghu':     ['era.court','super.low','order.dark','violence.high','tone.neutral'],
  'ancient-cultivation': ['era.court','super.high','order.rules','violence.mid','tone.neutral'],
  'ancient-court':       ['era.court','super.none','order.rules','violence.mid','tone.dark'],
};

// 人设 archetype → 标签映射
export const ARCHETYPE_TAGS: Record<string, Tag[]> = {
  // 傲娇
  'tsundere-honest': ['rel.gentle','tone.neutral','violence.low','order.daily'],
  'tsundere-cat':    ['rel.obsess','tone.neutral','violence.mid','order.daily'],

  // 冷面
  'cold-restrained': ['rel.control','tone.neutral','violence.low','order.rules'],
  'cold-cunning':    ['rel.control','tone.dark','violence.mid','order.dark'],

  // 病娇
  'yandere-cage':      ['rel.obsess','tone.dark','violence.high','order.dark'],
  'yandere-gentle':    ['rel.obsess','tone.dark','violence.high','order.dark'],
  'yandere-self-harm': ['rel.obsess','tone.dark','violence.mid','order.dark'],

  // 忠犬
  'loyal-obedient':   ['rel.protect','tone.light','violence.low','order.daily'],
  'loyal-protective': ['rel.protect','rel.obsess','violence.high','tone.dark','order.dark'],

  // 腹黑
  'cunning-gentleman':   ['rel.control','tone.neutral','violence.low','order.rules'],
  'cunning-manipulator': ['rel.control','tone.dark','violence.mid','order.dark'],

  // 掌控
  'controller-chess':    ['rel.control','tone.neutral','violence.low','order.rules'],
  'controller-obsessed': ['rel.obsess','rel.control','tone.dark','violence.mid','order.dark'],
  'controller-gentle':   ['rel.control','rel.protect','tone.neutral','violence.low','order.rules'],

  // 反派
  'villain-ruthless': ['rel.hunt','tone.dark','violence.high','order.anarchy'],
  'villain-elegant':  ['rel.hunt','tone.dark','violence.high','order.dark'],
  'villain-fallen':   ['rel.hunt','tone.dark','violence.high','rel.redemption','order.dark'],

  // 宿敌
  'rival-love-hate': ['rel.enemy','tone.dark','violence.mid','order.dark'],
  'rival-justice':   ['rel.enemy','tone.dark','violence.mid','order.rules'],

  // 掠夺
  'predator-primal': ['rel.hunt','tone.dark','violence.high','order.anarchy'],
  'predator-hunt':   ['rel.hunt','tone.dark','violence.mid','order.dark'],

  // 守护
  'guardian-moonlight': ['rel.protect','tone.light','violence.low','order.daily'],
  'guardian-alpha':     ['rel.protect','rel.obsess','violence.mid','tone.dark','order.dark'],

  // 战损 / 破碎
  'broken-strong':      ['rel.redemption','tone.dark','violence.mid','order.dark'],
  'broken-destruction': ['rel.redemption','tone.dark','violence.mid','order.dark'],
  'broken-ptsd':        ['rel.redemption','tone.dark','violence.mid','order.dark'],

  // 人外
  'non-human-god':        ['super.high','rel.control','tone.neutral','order.rules'],
  'non-human-demon':      ['super.high','rel.hunt','tone.dark','order.dark'],
  'non-human-ai':         ['super.sci','rel.control','tone.neutral','order.rules'],
  'non-human-experiment': ['super.sci','rel.hunt','tone.dark','violence.high','order.anarchy'],

  // 治愈甜系（新增10个）
  'sunshine-healer':   ['rel.gentle','rel.protect','tone.light','violence.low','order.daily'],
  'silly-lovebrain':   ['rel.gentle','tone.light','violence.low','order.daily'],
  'tsundere-sharp':    ['rel.gentle','tone.neutral','violence.low','order.daily'],
  'deadpan-humor':     ['rel.gentle','tone.neutral','violence.low','order.daily'],
  'soft-puppy':        ['rel.gentle','rel.protect','tone.light','violence.low','order.daily'],
  'broken-stray':      ['rel.gentle','rel.redemption','tone.neutral','violence.low','order.daily'],
  'growth-loser':      ['rel.gentle','rel.redemption','tone.light','violence.low','order.daily'],
  'younger-puppy':     ['rel.gentle','rel.protect','tone.light','violence.low','order.daily'],
  'fox-lazy':          ['rel.gentle','tone.neutral','violence.low','order.daily'],
  'engineer-warm':     ['rel.gentle','rel.protect','tone.neutral','violence.low','order.rules'],
};

// 关系主题 → 标签映射
export const RELATION_TAGS: Record<string, Tag[]> = {
  'enemies_to_lovers':  ['rel.enemy','tone.dark'],
  'pretend_to_real':    ['rel.gentle','tone.neutral'],
  'forced_bond':        ['rel.protect','tone.neutral'],
  'forbidden':          ['rel.control','tone.dark'],
  'power_imbalance':    ['rel.control','tone.neutral'],
  'second_chance':      ['rel.gentle','rel.redemption','tone.neutral'],
  'cat_mouse':          ['rel.hunt','tone.dark'],
  'care_grooming':      ['rel.protect','rel.control','tone.neutral'],
  'contract_marriage':  ['rel.control','tone.neutral'],
  'redemption':         ['rel.redemption','tone.dark'],
  'amnesia':            ['rel.gentle','rel.redemption','tone.neutral'],

  // 日常甜向（新增5个）
  'daily_companionship': ['rel.gentle','tone.light','violence.low'],
  'care_mutual':         ['rel.gentle','rel.protect','tone.light','violence.low'],
  'childhood_friends':   ['rel.gentle','tone.light','violence.low'],
  'ambiguous_testing':   ['rel.gentle','tone.neutral','violence.low'],
  'bickering_lovers':    ['rel.gentle','rel.enemy','tone.neutral','violence.low'],
};

// 关键轴（用于加权评分）
export const KEY_AXES: Array<(tags: Tag[]) => string> = [
  // era - 时代背景
  (t) => String(t.find(x => x.startsWith('era.'))),
  // super - 超自然程度
  (t) => String(t.find(x => x.startsWith('super.'))),
  // order - 秩序程度
  (t) => String(t.find(x => x.startsWith('order.'))),
  // relation tone - 关系属性
  (t) => String(t.find(x => x.startsWith('rel.'))),
  // global tone - 整体基调
  (t) => String(t.find(x => x.startsWith('tone.'))),
];
