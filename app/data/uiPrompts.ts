// 人设三层：母类 -> 子archetype -> 可选tone标记
export type CharacterMother = {
  id: 'healing' | 'banter' | 'protective' | 'manipulation' | 'danger' | 'broken';
  label: string;          // Step1-A 选项文案（情绪化）
  archetypes: { id: string; label: string }[]; // 对应现有的人设ID
  echo: string;           // 选中后在右侧回显的一句（≤20字）
  tones?: { id: string; label: string }[];     // 可选：微调口吻/行为
};

export const CHARACTER_MOTHERS: CharacterMother[] = [
  {
    id: 'healing',
    label: '治愈日常',
    echo: '他的温暖不刺眼，却能融化冰。',
    archetypes: [
      { id: 'sunshine-healer', label: '小太阳' },
      { id: 'silly-lovebrain', label: '笨蛋恋爱脑' },
      { id: 'soft-puppy', label: '呆萌小狗' },
      { id: 'broken-stray', label: '丧犬' },
      { id: 'growth-loser', label: '成长型废柴' },
      { id: 'younger-puppy', label: '年下奶狗' },
      { id: 'engineer-warm', label: '靠谱理工男' },
      { id: 'guardian-moonlight', label: '白月光' }
    ]
  },
  {
    id: 'banter',
    label: '欢脱互怼',
    echo: '他嘴上不饶人，心里最在意。',
    archetypes: [
      { id: 'tsundere-honest', label: '傲娇（口嫌体正直）' },
      { id: 'tsundere-cat', label: '暴躁猫系' },
      { id: 'tsundere-sharp', label: '毒舌' },
      { id: 'deadpan-humor', label: '反社交冷幽默' },
      { id: 'fox-lazy', label: '慵懒狐系' }
    ]
  },
  {
    id: 'protective',
    label: '守护占有',
    echo: '他把世界让出一半给你走路。',
    archetypes: [
      { id: 'loyal-obedient', label: '忠犬（绝对服从）' },
      { id: 'loyal-protective', label: '忠犬（疯批护短）' },
      { id: 'guardian-alpha', label: '偏执Alpha' },
      { id: 'predator-primal', label: '掠夺者（原始兽性）' },
      { id: 'cold-restrained', label: '禁欲系' }
    ]
  },
  {
    id: 'manipulation',
    label: '极限拉扯',
    echo: '他目光平静，像海面下的锋刃。',
    archetypes: [
      { id: 'cold-cunning', label: '冷面冰山' },
      { id: 'cunning-gentleman', label: '腹黑绅士' },
      { id: 'cunning-manipulator', label: '操控者' },
      { id: 'controller-chess', label: '高冷棋手' },
      { id: 'controller-gentle', label: '温柔掌控者' },
      { id: 'predator-hunt', label: '猎手' }
    ]
  },
  {
    id: 'danger',
    label: '危险禁忌',
    echo: '温柔与失控，都是向你。',
    archetypes: [
      { id: 'yandere-cage', label: '病娇囚禁狂' },
      { id: 'yandere-gentle', label: '病娇杀手' },
      { id: 'yandere-self-harm', label: '病娇自虐者' },
      { id: 'controller-obsessed', label: '年上掌控者（病态依恋）' },
      { id: 'rival-love-hate', label: '宿敌' },
      { id: 'rival-justice', label: '对立反派' },
      { id: 'villain-ruthless', label: '冷血狂徒' },
      { id: 'villain-elegant', label: '优雅暴徒' },
      { id: 'villain-fallen', label: '堕落黑天使' }
    ]
  },
  {
    id: 'broken',
    label: '破碎救赎',
    echo: '他的伤疤写满了故事，只给你看。',
    archetypes: [
      { id: 'broken-strong', label: '美强惨' },
      { id: 'broken-destruction', label: '破碎者' },
      { id: 'broken-ptsd', label: '战损应激者' },
      { id: 'non-human-god', label: '高傲神明' },
      { id: 'non-human-demon', label: '传说恶魔' },
      { id: 'non-human-ai', label: '冰冷AI' },
      { id: 'non-human-experiment', label: '危险实验体' }
    ]
  }
];

// 关系与世界的"问题语句"皮肤（ID沿用现有）
export const UI_QUESTIONS = {
  characterA: '他给你的印象是——',
  characterB: '准确地说，他是——',
  characterC: '他对你的方式是——', // 可选tone

  relation: '你们之间，是——',
  relationArc: '而这段关系的走向会是——',

  world: '这一切，会发生在——',
  worldBranch: '更准确地说，是——',
};
