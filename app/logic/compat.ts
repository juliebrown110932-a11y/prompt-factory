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
  patches: string[];  // 设定加成（纯文本）
};

// 兼容度阈值
export const COMPAT_THRESHOLD = 60;

// 评分参数（优化后）
const BASE = 75;
const MATCH = 6;
const MISMATCH = -3;
const KEY_WEIGHT = 1.5;

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

// 策展加成规则（热门组合白名单）
type CuratedRule = (input: CompatInput) => number;

const CURATED_BOOSTS: CuratedRule[] = [
  // 星际ABO × 偏执守护Alpha × 救赎
  (i) => i.worldBranchId === 'future.abo'
     && i.characterArchetypeId === 'guardian-alpha'
     && i.relationThemeId === 'redemption' ? 20 : 0,

  // 都市暗黑 × 腹黑操控 × 权力不均
  (i) => i.worldBranchId === 'modern.dark'
     && i.characterArchetypeId === 'cunning-manipulator'
     && i.relationThemeId === 'power_imbalance' ? 15 : 0,

  // 宫廷魔法 × 神明 × 禁忌/背德
  (i) => i.worldBranchId === 'court.magic'
     && i.characterArchetypeId === 'non-human-god'
     && i.relationThemeId === 'forbidden' ? 15 : 0,

  // 学园特权 × 宿敌 × 从敌到爱
  (i) => i.worldBranchId === 'campus.elite'
     && (i.characterArchetypeId === 'rival-love-hate' || i.characterArchetypeId === 'rival-justice')
     && i.relationThemeId === 'enemies_to_lovers' ? 10 : 0,

  // 末世生存 × 掠夺狩猎 × 被迫捆绑
  (i) => i.worldBranchId === 'apoc.survival'
     && i.characterArchetypeId === 'predator-hunt'
     && i.relationThemeId === 'forced_bond' ? 10 : 0,

  // 黑道Mafia × 反派 × 猫鼠游戏
  (i) => i.worldBranchId === 'modern.mafia'
     && (i.characterArchetypeId === 'villain-ruthless' || i.characterArchetypeId === 'villain-elegant')
     && i.relationThemeId === 'cat_mouse' ? 12 : 0,

  // 赛博朋克 × 冰冷AI × 禁忌
  (i) => i.worldBranchId === 'future.cyber'
     && i.characterArchetypeId === 'non-human-ai'
     && i.relationThemeId === 'forbidden' ? 12 : 0,
];

/**
 * 应用策展加成
 */
function applyCuratedBoost(score: number, input: CompatInput): number {
  const plus = CURATED_BOOSTS.reduce((s, r) => s + r(input), 0);
  return Math.max(0, Math.min(100, score + plus));
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
        '【加成】AI/实验体改写为"器灵/禁术造物"，以契约维持存在。',
        '【规则】禁术需代价，越界将受审；器灵仅对你显现人格。',
        '【开局】你误触法阵/遗器，其灵识首次被唤醒。'
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
        '【加成】黑道势力以"学生会/财团社团"作为对外外壳。',
        '【规则】校方对外资源合作灰色地带默认存在，权力可被"社团条例"包装。',
        '【开局】你被邀请加入关键社团/竞选中层，卷入隐秘秩序。'
      ];
    }
    return null;
  },

  // ABO × 都市光明线 → 法规重写
  ({ worldBranchId }) => {
    if (worldBranchId === 'future.abo') {
      return [
        '【加成】信息素被纳入"生物特征保护法"，公开表达受限。',
        '【规则】职场/公共空间设有中和规范与申报制度，违规将受罚。',
        '【开局】一次突发标记反应，双方被迫按照流程同处观察区。'
      ];
    }
    return null;
  },

  // 病娇囚禁 × 都市光明线 → 合理压暗
  ({ worldBranchId, characterArchetypeId }) => {
    if (worldBranchId === 'modern.light' && characterArchetypeId === 'yandere-cage') {
      return [
        '【加成】表层为治愈日常，但存在未公开的失踪/跟踪案件。',
        '【规则】监控盲区与合租空间为可行动的灰域。',
        '【开局】他以"照顾/保护"为名先行收集你的行踪与钥匙副本。'
      ];
    }
    return null;
  },

  // 守护白月光 × 末世高暴力 → 动机桥接
  ({ worldBranchId, characterArchetypeId }) => {
    if (['apoc.survival', 'apoc.virus'].includes(worldBranchId) && characterArchetypeId === 'guardian-moonlight') {
      return [
        '【加成】守护者曾失去过同伴，对你产生替代性守护动机。',
        '【规则】根据避难所准则，结成"生存对搭"可共享口粮与弹药。',
        '【开局】他在补给战中为你让出医疗资源，从此结为对搭。'
      ];
    }
    return null;
  },

  // 权力不均 × 光明世界 → 柔化合法性
  ({ worldBranchId, relationThemeId }) => {
    if (worldBranchId === 'modern.light' && relationThemeId === 'power_imbalance') {
      return [
        '【加成】权力来源限定为"岗位/项目负责人"，并有合规边界。',
        '【规则】企业伦理条款与第三方监察在场，关系需隐蔽而合规。',
        '【开局】一次加班危机，他以负责人身份扛下责任，关系开始偏移。'
      ];
    }
    return null;
  },

  // 高暴力人设 × 校园普通线 → 压制与隐藏
  ({ worldBranchId, characterArchetypeId }) => {
    if (worldBranchId === 'campus.normal' &&
        ['villain-ruthless', 'predator-primal', 'yandere-cage'].includes(characterArchetypeId)) {
      return [
        '【加成】暴力倾向被家族/过往创伤压抑，仅在失控时显现。',
        '【规则】校规与监控系统存在，但有盲区与夜间时段。',
        '【开局】一次意外目击他真实一面，成为秘密的共享者。'
      ];
    }
    return null;
  },

  // 神明/恶魔 × 现代都市 → 隐藏身份
  ({ worldBranchId, characterArchetypeId }) => {
    if (['modern.light', 'modern.dark'].includes(worldBranchId) &&
        ['non-human-god', 'non-human-demon'].includes(characterArchetypeId)) {
      return [
        '【加成】超自然存在以人类身份隐藏，力量受到抑制或伪装。',
        '【规则】超自然法则与现代法律并行，互不干涉但需低调。',
        '【开局】一次危机中他暴露身份救你，从此你成为唯一知情者。'
      ];
    }
    return null;
  },
];

/**
 * 生成设定加成
 */
export function buildPatches(input: CompatInput, score: number): string[] {
  if (score >= COMPAT_THRESHOLD) return [];

  // 尝试匹配特定规则
  for (const rule of PATCH_RULES) {
    const res = rule(input);
    if (res) return res;
  }

  // 通用兜底加成
  return [
    '【加成】为适配舞台，本角色的身份做轻度转译但核心性格不变。',
    '【规则】在当地法规/宗门条约/帝国宪章下，关系需要隐秘推进。',
    '【开局】一次偶发事件将两人强制捆绑，成为故事起点。'
  ];
}

/**
 * 计算兼容度（总入口）
 */
export function computeCompat(input: CompatInput): CompatResult {
  const raw = computeCompatScore(input);
  const score = applyCuratedBoost(raw, input);
  const patches = buildPatches(input, score);
  return { score, patches };
}
