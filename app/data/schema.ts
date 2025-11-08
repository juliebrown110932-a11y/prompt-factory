// 世界观层级数据结构

export type WorldBranch = {
  id: 'modern.light' | 'modern.dark' | 'modern.mafia'
     | 'campus.normal' | 'campus.elite'
     | 'court.intrigue' | 'court.magic'
     | 'future.cyber' | 'future.abo'
     | 'apoc.survival' | 'apoc.virus';
  label: string;           // 显示名
  description?: string;    // 可选简介（UI可不显示）
  tags?: string[];         // 预留：生成/兼容度用
};

export type WorldMother = {
  id: 'modern' | 'campus' | 'court' | 'future' | 'apoc';
  label: string;           // 母观名（例：现代都市）
  children: WorldBranch[]; // 子分支列表（必填）
};

export const WORLDS: WorldMother[] = [
  {
    id: 'modern',
    label: '现代都市',
    children: [
      { id: 'modern.light', label: '光明线' },
      { id: 'modern.dark',  label: '暗黑线' },
      { id: 'modern.mafia', label: '黑道Mafia' },
    ],
  },
  {
    id: 'campus',
    label: '校园/学园',
    children: [
      { id: 'campus.normal', label: '普通线' },
      { id: 'campus.elite',  label: '特权线' },
    ],
  },
  {
    id: 'court',
    label: '西幻/宫廷',
    children: [
      { id: 'court.intrigue', label: '权谋' },
      { id: 'court.magic',    label: '魔法' },
    ],
  },
  {
    id: 'future',
    label: '赛博/星际',
    children: [
      { id: 'future.cyber', label: '赛博朋克' },
      { id: 'future.abo',   label: '星际ABO' },
    ],
  },
  {
    id: 'apoc',
    label: '废土末世',
    children: [
      { id: 'apoc.survival', label: '生存' },
      { id: 'apoc.virus',    label: '病毒' },
    ],
  },
];

// 可选：给旧代码一个过渡辅助（若有用到平铺选项）
export const flattenWorldBranches = (list: WorldMother[]) =>
  list.flatMap(m => m.children);
