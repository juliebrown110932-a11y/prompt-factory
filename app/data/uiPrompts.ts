// 人设三层：母类 -> 子archetype -> 可选tone标记
export type CharacterMother = {
  id: 'cold系' | 'gentle系' | 'dark系' | 'guard系' | 'mad系' | 'broken系' | 'sweet系';
  label: string;          // Step1-A 选项文案（情绪化）
  archetypes: { id: string; label: string }[]; // 对应现有的人设ID
  echo: string;           // 选中后在右侧回显的一句（≤20字）
  tones?: { id: string; label: string }[];     // 可选：微调口吻/行为
};

export const CHARACTER_MOTHERS: CharacterMother[] = [
  {
    id: 'cold系',
    label: '冷淡理智',
    echo: '他目光平静，像海面下的锋刃。',
    archetypes: [
      { id: 'cold-restrained', label: '克制/禁欲' },
      { id: 'cold-cunning', label: '冰山腹黑' },
      { id: 'cunning-gentleman', label: '礼貌而疏离' },
      { id: 'controller-chess', label: '理性控场' },
      { id: 'non-human-ai', label: '冰冷AI' },
    ],
    tones: [
      { id: 'tone.flat', label: '平静少言' },
      { id: 'tone.subtle', label: '不动声色的温柔' },
    ],
  },
  {
    id: 'gentle系',
    label: '温柔体贴',
    echo: '他笑意极浅，却让风都慢下来。',
    archetypes: [
      { id: 'guardian-moonlight', label: '护你周全' },
      { id: 'loyal-obedient', label: '听话可靠' },
    ],
    tones: [
      { id: 'tone.soft', label: '轻声细语' },
      { id: 'tone.firm', label: '温柔而坚定' },
    ],
  },
  {
    id: 'dark系',
    label: '放纵危险',
    echo: '危险在他身上像香水一样明显。',
    archetypes: [
      { id: 'cunning-manipulator', label: '带笑的算计' },
      { id: 'villain-elegant', label: '优雅且暴烈' },
      { id: 'villain-ruthless', label: '冷血狂徒' },
      { id: 'villain-fallen', label: '堕落黑天使' },
      { id: 'predator-hunt', label: '掠夺成瘾' },
      { id: 'non-human-demon', label: '传说恶魔' },
    ],
  },
  {
    id: 'guard系',
    label: '坚定守护',
    echo: '他把世界让出一半给你走路。',
    archetypes: [
      { id: 'guardian-alpha', label: '偏执守护' },
      { id: 'loyal-protective', label: '护短成性' },
      { id: 'controller-gentle', label: '温柔控场' },
      { id: 'predator-primal', label: '原始占有' },
    ],
  },
  {
    id: 'mad系',
    label: '疯批执着',
    echo: '温柔与失控，都是向你。',
    archetypes: [
      { id: 'yandere-cage', label: '温柔监牢' },
      { id: 'yandere-gentle', label: '微笑杀意' },
      { id: 'yandere-self-harm', label: '自残威胁' },
      { id: 'controller-obsessed', label: '病态依恋' },
      { id: 'tsundere-honest', label: '口嫌体正直' },
      { id: 'tsundere-cat', label: '暴躁猫系' },
    ],
  },
  {
    id: 'broken系',
    label: '破碎伤痕',
    echo: '他的伤疤写满了故事，只给你看。',
    archetypes: [
      { id: 'broken-strong', label: '美强惨' },
      { id: 'broken-destruction', label: '自我毁灭' },
      { id: 'broken-ptsd', label: 'PTSD战损' },
      { id: 'rival-love-hate', label: '相爱相杀' },
      { id: 'rival-justice', label: '正邪对立' },
      { id: 'non-human-god', label: '高傲神明' },
      { id: 'non-human-experiment', label: '危险实验体' },
    ],
  },
  {
    id: 'sweet系',
    label: '治愈甜系',
    echo: '他的温暖不刺眼，却能融化冰。',
    archetypes: [
      { id: 'sunshine-healer', label: '小太阳' },
      { id: 'silly-lovebrain', label: '笨蛋恋爱脑' },
      { id: 'tsundere-sharp', label: '毒舌' },
      { id: 'deadpan-humor', label: '反社交冷幽默' },
      { id: 'soft-puppy', label: '呆萌小狗' },
      { id: 'broken-stray', label: '丧犬' },
      { id: 'growth-loser', label: '成长型废柴' },
      { id: 'younger-puppy', label: '年下奶狗' },
      { id: 'fox-lazy', label: '狐系咸鱼' },
      { id: 'engineer-warm', label: '靠谱理工男' },
    ],
  },
];

// 关系与世界的"问题语句"皮肤（ID沿用现有）
export const UI_QUESTIONS = {
  characterA: '他给你的第一感觉是——',
  characterB: '他更接近哪一种？',
  characterC: '你更喜欢他哪一面？', // 可选tone

  relation: '你们的关系像一根拉满的弦，随时可能——',
  relationArc: '而这段关系的走向会是——',

  world: '这一切，会发生在——',
  worldBranch: '具体来说，你们的故事在——',
};
