// 世界观层级数据结构

export type WorldBranch = {
  id: 'modern.light' | 'modern.dark' | 'modern.mafia'
     | 'campus.normal' | 'campus.elite'
     | 'court.intrigue' | 'court.magic'
     | 'future.cyber' | 'future.abo'
     | 'apoc.survival' | 'apoc.virus'
     | 'ancient-jianghu' | 'ancient-cultivation' | 'ancient-court';
  label: string;           // 显示名
  branchBrief?: string;    // 分支简介（40–60字）
  description?: string;    // 可选简介（UI可不显示）
  tags?: string[];         // 预留：生成/兼容度用
};

export type WorldMother = {
  id: 'modern' | 'campus' | 'court' | 'future' | 'apoc' | 'ancient-fantasy';
  label: string;           // 母观名（例：现代都市）
  tagline?: string;        // 一句话定调
  summary?: string;        // 80–120字设定简介
  children: WorldBranch[]; // 子分支列表（必填）
};

// 可选：给旧代码一个过渡辅助（若有用到平铺选项）
export const flattenWorldBranches = (list: WorldMother[]) =>
  list.flatMap(m => m.children);
