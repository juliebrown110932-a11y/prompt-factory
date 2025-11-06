// 选择器选项数据
export interface Option {
  id: string;
  label: string;
}

export interface Category {
  id: string;
  title: string;
  options: Option[];
}

// 世界观选项
export const worldviewOptions: Option[] = [
  { id: 'modern-city', label: '现代都市' },
  { id: 'campus', label: '校园/学园' },
  { id: 'workplace', label: '职场/办公室' },
  { id: 'entertainment', label: '演艺圈' },
  { id: 'mafia', label: '黑道/Mafia' },
  { id: 'crime', label: '警匪/悬疑' },
  { id: 'western-fantasy', label: '西幻/宫廷' },
  { id: 'eastern-fantasy', label: '东玄/仙侠' },
  { id: 'magic', label: '魔法/巫师' },
  { id: 'wasteland', label: '废土末世' },
  { id: 'cyberpunk', label: '赛博朋克' },
  { id: 'space-abo', label: '星际/ABO' },
  { id: 'time-loop', label: '时间循环' },
];

// AI 人设选项
export const characterOptions: Option[] = [
  { id: 'tsundere', label: '傲娇' },
  { id: 'cold', label: '冷面' },
  { id: 'yandere', label: '病娇' },
  { id: 'energetic', label: '元气/忠犬' },
  { id: 'cunning', label: '腹黑' },
  { id: 'controller', label: '控制者' },
  { id: 'villain', label: '反派/恶人' },
  { id: 'rival', label: '宿敌' },
  { id: 'predator', label: '掠夺者' },
  { id: 'guardian', label: '守护者' },
  { id: 'broken', label: '破碎/战损' },
  { id: 'non-human', label: '人外' },
];

// 关系动态选项
export const relationshipOptions: Option[] = [
  { id: 'enemy-to-lover', label: '从敌到爱' },
  { id: 'fake-real', label: '假戏真做' },
  { id: 'forced-bond', label: '被迫捆绑' },
  { id: 'taboo', label: '禁忌/背德' },
  { id: 'power-imbalance', label: '权力不均' },
  { id: 'second-chance', label: '破镜重圆' },
  { id: 'cat-mouse', label: '猫鼠游戏' },
  { id: 'nurturing', label: '养成' },
  { id: 'contract-marriage', label: '契约婚姻' },
  { id: 'redemption', label: '救赎' },
  { id: 'amnesia', label: '失忆' },
];

// 所有类别
export const categories: Category[] = [
  {
    id: 'worldview',
    title: '世界观',
    options: worldviewOptions,
  },
  {
    id: 'character',
    title: 'AI 人设',
    options: characterOptions,
  },
  {
    id: 'relationship',
    title: '关系动态',
    options: relationshipOptions,
  },
];
