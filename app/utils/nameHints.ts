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
  god: [
    '塞勒斯',
    '格里安',
    '瓦伦',
    '卡莱尔',
    '米迦勒',
    '拉斐尔',
  ],
  demon: [
    '艾泽尔',
    '路西恩',
    '塞巴斯',
    '奥斯汀',
    '别西卜',
    '梅菲斯特',
  ],
  ancient: [
    '慕尘',
    '沈昭',
    '司玉',
    '纪凌渊',
    '慕寒',
    '墨染',
    '魏霄云',
  ],
  modern: [
    '霍云深',
    '林一',
    '顾衍',
    '江城',
    '温如言',
    '苏见',
    '周洛',
    '傅晏',
    '陆南川',
    '许安',
    '杜叶',
    '宋恒之'
  ],
  scifi: [
    '凯尔',
    '雷昂',
    '诺亚-07',
    '赛尔法',
    '艾萨',
    '泽罗',
    '奈特',
    '幻影',
    '银翼',
    '墨菲斯',
    '西泽尔',
    '兰斯洛特',
    '奥古斯都',
    '塞壬',
    '阿瑞斯',
    '零一',
    'Ash',
    '亚当',
  ],
};

// 世界观 → 名字池映射
const WORLD_TO_NAME_POOL: Record<string, keyof typeof NAME_POOLS> = {
  // 现代都市
  'modern.light': 'modern',
  'modern.dark': 'modern',
  'modern.mafia': 'modern',

  // 校园
  'campus.normal': 'modern',
  'campus.elite': 'modern',

  // 西幻宫廷
  'court.intrigue': 'fantasy',
  'court.magic': 'fantasy',

  // 赛博星际
  'future.cyber': 'scifi',
  'future.abo': 'scifi',

  // 废土末世
  'apoc.survival': 'scifi',
  'apoc.virus': 'scifi',

  // 古言仙侠
  'ancient-jianghu': 'ancient',
  'ancient-cultivation': 'ancient',
  'ancient-court': 'ancient',
};

// 强制人设 → 名字池映射（最高优先级，不受世界观影响）
const FORCE_ARCHETYPE_TO_NAME_POOL: Record<string, keyof typeof NAME_POOLS> = {
  // 西幻名字（无论什么世界观）
  'villain-fallen': 'fantasy',      // 堕落黑天使
  'non-human-god': 'god',           // 神明
  'non-human-demon': 'demon',       // 恶魔

  // 科幻名字（无论什么世界观）
  'non-human-ai': 'scifi',          // AI
  'non-human-experiment': 'scifi',  // 实验体
};

/**
 * 根据世界观和人设获取匹配的名字池
 * 优先级：强制人设 > 世界观 > 默认
 */
function getNamePool(worldBranchId: string | null, archetypeId: string | null): string[] {
  // 1. 最高优先级：检查是否是强制人设
  if (archetypeId && FORCE_ARCHETYPE_TO_NAME_POOL[archetypeId]) {
    const poolKey = FORCE_ARCHETYPE_TO_NAME_POOL[archetypeId];
    return NAME_POOLS[poolKey];
  }

  // 2. 次优先级：检查世界观映射
  if (worldBranchId && WORLD_TO_NAME_POOL[worldBranchId]) {
    const poolKey = WORLD_TO_NAME_POOL[worldBranchId];
    return NAME_POOLS[poolKey];
  }

  // 3. 默认返回现代名字池
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
