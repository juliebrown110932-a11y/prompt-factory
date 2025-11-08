// 兼容度评分与自动补丁生成

import { WORLD_TAGS, ARCHETYPE_TAGS, RELATION_TAGS, KEY_AXES, Tag } from '@/app/data/taxonomy';

// 类型定义
export type CompatInput = {
  worldBranchId: string;        // 例: 'modern.dark'
  characterArchetypeId: string; // 例: 'cold-restrained'
  relationThemeId: string;      // 例: 'enemies_to_lovers'
};

export type CompatResult = {
  score: number;      // 0–100
  patches: string[];  // 设定补丁（纯文本）
};

// 兼容度阈值
export const COMPAT_THRESHOLD = 70;

// 评分参数
const BASE = 60;
const MATCH = 5;
const MISMATCH = -5;
const KEY_WEIGHT = 2;

/**
 * 计算两个标签集合的重叠分数
 */
function overlapScore(a: Tag[], b: Tag[]): number {
  let score = 0;

  // 关键轴匹配（加权）
  for (const ax of KEY_AXES) {
    const ka = ax(a);
    const kb = ax(b);
    if (!ka || !kb || ka === 'undefined' || kb === 'undefined') continue;
    score += (ka === kb ? MATCH : MISMATCH) * KEY_WEIGHT;
  }

  // 次要标签匹配（小额奖励）
  for (const t of a) {
    if (!KEY_AXES.some(ax => ax([t]) === t) && b.includes(t)) {
      score += 1;
    }
  }

  return score;
}

/**
 * 计算兼容度分数（0-100）
 */
export function computeCompatScore(input: CompatInput): number {
  const w = WORLD_TAGS[input.worldBranchId] ?? [];
  const c = ARCHETYPE_TAGS[input.characterArchetypeId] ?? [];
  const r = RELATION_TAGS[input.relationThemeId] ?? [];

  let score = BASE;
  score += overlapScore(w, c);  // 世界观 × 人设
  score += overlapScore(w, r);  // 世界观 × 关系
  score += overlapScore(c, r);  // 人设 × 关系

  return Math.max(0, Math.min(100, score));
}

// 补丁生成规则
type PatchRule = (input: CompatInput) => string[] | null;

const PATCH_RULES: PatchRule[] = [
  // 科幻人设 × 宫廷/古代系 → 身份转译
  ({ worldBranchId, characterArchetypeId }) => {
    const sci = ['non-human-ai', 'non-human-experiment'].includes(characterArchetypeId);
    const court = ['court.intrigue', 'court.magic'].includes(worldBranchId);
    if (sci && court) {
      return [
        '【设定补丁】AI/实验体改写为"器灵/禁术造物"，以契约维持存在。',
        '【世界规则】禁术需代价，越界将受审；器灵仅对你显现人格。',
        '【遭遇机制】你误触法阵/遗器，其灵识首次被唤醒。'
      ];
    }
    return null;
  },

  // 黑道Mafia × 学园 → 外壳转译
  ({ worldBranchId, characterArchetypeId }) => {
    const campus = ['campus.normal', 'campus.elite'].includes(worldBranchId);
    const mafiaChar = ['villain-ruthless', 'villain-elegant', 'controller-chess', 'cunning-manipulator'].includes(characterArchetypeId);
    if (mafiaChar && campus) {
      return [
        '【设定补丁】黑道势力以"学生会/财团社团"作为对外外壳。',
        '【世界规则】校方对外资源合作灰色地带默认存在，权力可被"社团条例"包装。',
        '【遭遇机制】你被邀请加入关键社团/竞选中层，卷入隐秘秩序。'
      ];
    }
    return null;
  },

  // ABO × 都市光明线 → 法规重写
  ({ worldBranchId }) => {
    if (worldBranchId === 'future.abo') {
      return [
        '【设定补丁】信息素被纳入"生物特征保护法"，公开表达受限。',
        '【世界规则】职场/公共空间设有中和规范与申报制度，违规将受罚。',
        '【遭遇机制】一次突发标记反应，双方被迫按照流程同处观察区。'
      ];
    }
    return null;
  },

  // 病娇囚禁 × 都市光明线 → 合理压暗
  ({ worldBranchId, characterArchetypeId }) => {
    if (worldBranchId === 'modern.light' && characterArchetypeId === 'yandere-cage') {
      return [
        '【设定补丁】表层为治愈日常，但存在未公开的失踪/跟踪案件。',
        '【世界规则】监控盲区与合租空间为可行动的灰域。',
        '【遭遇机制】他以"照顾/保护"为名先行收集你的行踪与钥匙副本。'
      ];
    }
    return null;
  },

  // 守护白月光 × 末世高暴力 → 动机桥接
  ({ worldBranchId, characterArchetypeId }) => {
    if (['apoc.survival', 'apoc.virus'].includes(worldBranchId) && characterArchetypeId === 'guardian-moonlight') {
      return [
        '【设定补丁】守护者曾失去过同伴，对你产生替代性守护动机。',
        '【世界规则】根据避难所准则，结成"生存对搭"可共享口粮与弹药。',
        '【遭遇机制】他在补给战中为你让出医疗资源，从此结为对搭。'
      ];
    }
    return null;
  },

  // 权力不均 × 光明世界 → 柔化合法性
  ({ worldBranchId, relationThemeId }) => {
    if (worldBranchId === 'modern.light' && relationThemeId === 'power_imbalance') {
      return [
        '【设定补丁】权力来源限定为"岗位/项目负责人"，并有合规边界。',
        '【世界规则】企业伦理条款与第三方监察在场，关系需隐蔽而合规。',
        '【遭遇机制】一次加班危机，他以负责人身份扛下责任，关系开始偏移。'
      ];
    }
    return null;
  },

  // 高暴力人设 × 校园普通线 → 压制与隐藏
  ({ worldBranchId, characterArchetypeId }) => {
    if (worldBranchId === 'campus.normal' &&
        ['villain-ruthless', 'predator-primal', 'yandere-cage'].includes(characterArchetypeId)) {
      return [
        '【设定补丁】暴力倾向被家族/过往创伤压抑，仅在失控时显现。',
        '【世界规则】校规与监控系统存在，但有盲区与夜间时段。',
        '【遭遇机制】一次意外目击他真实一面，成为秘密的共享者。'
      ];
    }
    return null;
  },

  // 神明/恶魔 × 现代都市 → 隐藏身份
  ({ worldBranchId, characterArchetypeId }) => {
    if (['modern.light', 'modern.dark'].includes(worldBranchId) &&
        ['non-human-god', 'non-human-demon'].includes(characterArchetypeId)) {
      return [
        '【设定补丁】超自然存在以人类身份隐藏，力量受到抑制或伪装。',
        '【世界规则】超自然法则与现代法律并行，互不干涉但需低调。',
        '【遭遇机制】一次危机中他暴露身份救你，从此你成为唯一知情者。'
      ];
    }
    return null;
  },
];

/**
 * 生成设定补丁
 */
export function buildPatches(input: CompatInput, score: number): string[] {
  if (score >= COMPAT_THRESHOLD) return [];

  // 尝试匹配特定规则
  for (const rule of PATCH_RULES) {
    const res = rule(input);
    if (res) return res;
  }

  // 通用兜底补丁
  return [
    '【设定补丁】为适配舞台，本角色的身份做轻度转译但核心性格不变。',
    '【世界规则】在当地法规/宗门条约/帝国宪章下，关系需要隐秘推进。',
    '【遭遇机制】一次偶发事件将两人强制捆绑，成为故事起点。'
  ];
}

/**
 * 计算兼容度（总入口）
 */
export function computeCompat(input: CompatInput): CompatResult {
  const score = computeCompatScore(input);
  const patches = buildPatches(input, score);
  return { score, patches };
}
