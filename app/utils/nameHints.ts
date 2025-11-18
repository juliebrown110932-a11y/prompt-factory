import type { CharacterMother } from '@/app/data/uiPrompts';

/**
 * 根据人设母类提供匹配的名字库
 */
export const NAME_POOLS: Record<CharacterMother['id'], string[]> = {
  // 治愈日常 - 温暖、柔和、阳光的名字
  healing: [
    '晨曦', '暖阳', '言希', '柔风', '明朗',
    '温言', '和煦', '宁安', '清和', '景澄',
    '沐晨', '时暖', '宜修', '念安', '舒白'
  ],

  // 欢脱互怼 - 俏皮、活泼、有趣的名字
  banter: [
    '顾怼', '言啰', '墨损', '慕皮', '时怼',
    '苏吵', '夏闹', '叶皮', '林闹', '江损',
    '陆怼', '周怼', '许吵', '谢皮', '秦闹'
  ],

  // 守护占有 - 强势、霸气、可靠的名字
  protective: [
    '御天', '镇渊', '萧战', '凌霄', '慕御',
    '北辰', '轩墨', '靳野', '厉风', '云擎',
    '沈御', '陆深', '封翊', '景擎', '墨凛'
  ],

  // 极限拉扯 - 深沉、高冷、神秘的名字
  manipulation: [
    '慕寒', '寒川', '清冽', '霜白', '凛冬',
    '顾寒', '冷澈', '冰渊', '霁月', '凉薄',
    '沈寒', '谢冷', '萧澈', '林冽', '江寒'
  ],

  // 危险禁忌 - 危险、锋利、疯狂的名字
  danger: [
    '夜殇', '血凛', '魔煞', '暗夜', '冥渊',
    '罗刹', '修罗', '阎罗', '幽冥', '煞神',
    '墨染', '夜魇', '凶祟', '罪孽', '堕天'
  ],

  // 破碎救赎 - 沧桑、悲情、残破的名字
  broken: [
    '残墨', '碎影', '孤澜', '断刃', '裂痕',
    '寒烬', '灰烬', '残念', '废墟', '枯骨',
    '破晓', '余烬', '残生', '疤痕', '伤痕'
  ]
};

/**
 * 根据人设母类ID获取名字建议
 */
export function getNameSuggestions(characterMotherId: string | null): string[] {
  if (!characterMotherId) {
    // 如果没有选择人设，返回通用名字库
    return [
      '言希', '辰逸', '慕言', '时御', '沈夜',
      '江寒', '顾凉', '叶澜', '陆深', '宋白',
      '苏瑾', '林渊', '周墨', '夏凉', '秦朗'
    ];
  }

  const pool = NAME_POOLS[characterMotherId as CharacterMother['id']];
  return pool || NAME_POOLS.healing; // 默认返回治愈系名字
}

/**
 * 从名字池中随机选择一个名字
 */
export function getRandomName(characterMotherId: string | null): string {
  const pool = getNameSuggestions(characterMotherId);
  return pool[Math.floor(Math.random() * pool.length)];
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
