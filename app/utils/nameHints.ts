// 名字库定义
const NAME_POOLS = {
  fantasy: [
    '塞勒斯',
    '艾泽尔',
    '格里安',
    '路西恩',
    '瓦伦',
    '奥斯汀',
    '塞巴斯',
    '卡莱尔',
  ],
  ancient: [
    '慕寒',
    '沈昭',
    '夜冥',
    '凌渊',
    '司寒',
    '墨染',
    '霄云',
  ],
  modern: [
    '陈默',
    '林深',
    '顾衍',
    '江城',
    '温言',
    '苏见',
    '周洛',
    '傅晏',
    '宋辰',
    '许安',
  ],
  scifi: [
    '凯尔',
    '零号',
    '诺亚-07',
    '阿尔法',
    '艾登',
  ],
};

// 世界观 → 名字池映射
const WORLD_TO_NAME_POOL: Record<string, keyof typeof NAME_POOLS> = {
  // 现代都市
  'modern-light': 'modern',
  'modern-dark': 'modern',
  'modern-mafia': 'modern',

  // 校园
  'academy-normal': 'modern',
  'academy-elite': 'modern',

  // 西幻宫廷
  'fantasy-court': 'fantasy',
  'fantasy-magic': 'fantasy',

  // 赛博星际
  'cyber-punk': 'scifi',
  'cyber-abo': 'scifi',

  // 废土末世
  'apoc-survival': 'scifi',
  'apoc-virus': 'scifi',
};

// 人设 → 名字池映射（优先级高于世界观）
const ARCHETYPE_TO_NAME_POOL: Record<string, keyof typeof NAME_POOLS> = {
  'non-human-god': 'fantasy',
  'non-human-demon': 'fantasy',
  'non-human-ai': 'scifi',
  'non-human-experiment': 'scifi',
  'broken-strong': 'ancient',
  'broken-ptsd': 'ancient',
};

/**
 * 根据世界观和人设获取匹配的名字池
 */
function getNamePool(worldBranchId: string | null, archetypeId: string | null): string[] {
  // 优先检查人设映射
  if (archetypeId && ARCHETYPE_TO_NAME_POOL[archetypeId]) {
    const poolKey = ARCHETYPE_TO_NAME_POOL[archetypeId];
    return NAME_POOLS[poolKey];
  }

  // 其次检查世界观映射
  if (worldBranchId && WORLD_TO_NAME_POOL[worldBranchId]) {
    const poolKey = WORLD_TO_NAME_POOL[worldBranchId];
    return NAME_POOLS[poolKey];
  }

  // 默认返回现代名字池
  return NAME_POOLS.modern;
}

/**
 * 从名字池中随机选择一个名字
 */
export function getRandomName(worldBranchId: string | null, archetypeId: string | null): string {
  const pool = getNamePool(worldBranchId, archetypeId);
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

/**
 * 获取名字建议列表（返回匹配池中的所有名字）
 */
export function getNameSuggestions(worldBranchId: string | null, archetypeId: string | null): string[] {
  return getNamePool(worldBranchId, archetypeId);
}

/**
 * 根据人设和关系提供开场句建议
 */
export const OPENING_POOLS: Record<string, string[]> = {
  // 治愈日常类开场
  healing: [
    '早上好，今天天气不错呢',
    '你怎么在这？需要帮忙吗',
    '好久不见，最近还好吗',
    '要不要一起喝杯咖啡',
    '看起来你有点累，休息一下吧'
  ],

  // 欢脱互怼类开场
  banter: [
    '啧，怎么又是你',
    '你又来烦我了？',
    '真巧，又见面了呢',
    '你这是什么打扮',
    '哟，稀客啊'
  ],

  // 守护占有类开场
  protective: [
    '你一个人在这不安全',
    '跟紧我，别乱跑',
    '谁欺负你了？',
    '这么晚了还在外面',
    '怎么不接我电话'
  ],

  // 极限拉扯类开场
  manipulation: [
    '等你很久了',
    '我就知道你会来',
    '想见我了？',
    '你迟到了',
    '看来你还记得这里'
  ],

  // 危险禁忌类开场
  danger: [
    '总算找到你了',
    '你以为能逃得掉？',
    '你不该出现在这里',
    '别想离开我',
    '你逃不掉的'
  ],

  // 破碎救赎类开场
  broken: [
    '是你...',
    '你为什么要来',
    '别靠近我',
    '你不该来这里',
    '离我远点'
  ],

  // 通用开场（没有选择人设时）
  default: [
    '早上好',
    '你怎么在这',
    '好久不见',
    '今天天气不错',
    '等你很久了'
  ]
};

/**
 * 根据人设母类ID获取开场句建议
 */
export function getOpeningSuggestions(characterMotherId: string | null): string[] {
  if (!characterMotherId) {
    return OPENING_POOLS.default;
  }

  const pool = OPENING_POOLS[characterMotherId];
  return pool || OPENING_POOLS.default;
}

/**
 * 从开场句池中随机选择一个开场句
 */
export function getRandomOpening(characterMotherId: string | null): string {
  const pool = getOpeningSuggestions(characterMotherId);
  return pool[Math.floor(Math.random() * pool.length)];
}
