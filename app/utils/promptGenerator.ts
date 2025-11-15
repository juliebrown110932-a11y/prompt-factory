import {
  characterOptions,
  type Option,
} from '@/app/data/options';
import { RELATIONS } from '@/app/data/relations';
import { composeIntro, type IntroTone } from '@/app/utils/introComposer';
import { getToneLabel, getRiskLabel, type EmotionParams } from '@/app/utils/emotionRewriter';
import { usePromptBlocks, type BlockKey } from '@/app/store/promptBlocks';

/**
 * 语气预设：详细的氛围指导
 */
const tonePresets: Record<IntroTone, string> = {
  soft: '用温和、含蓄的语言表达情感，避免夸张描写与过度接触。',
  balanced: '保持克制与张力并存，适度描写靠近与情绪波动。',
  intense: '允许情绪外溢，语言具压迫感与占有欲，靠近动作更直接。',
};

/**
 * 危险度预设：详细的氛围指导
 */
const dangerPresets: Record<EmotionParams['risk'], string> = {
  0: '氛围安全明亮，互动中保持尊重与明确边界。',
  1: '氛围暧昧，允许含蓄暗示与轻微冒犯的试探。',
  2: '氛围偏暗黑，允许支配/冲突的潜台词，但避免突破明确的道德与法律底线。',
};

/**
 * 根据 ID 查找选项
 */
function findOption(options: Option[], id: string): Option | undefined {
  return options.find((option) => option.id === id);
}

/**
 * 临时映射：将新的 WorldBranch ID 映射到世界观描述
 * TODO: 后续迁移到完整的描述数据
 */
function getWorldviewDescription(branchId: string): { label: string; description: string } | null {
  const worldMap: Record<string, { label: string; description: string }> = {
    'modern.light': {
      label: '现代都市 - 光明线',
      description: '这座城市从不睡眠。霓虹掩盖的，不止是夜色，还有欲望。白天它秩序井然，夜晚却重写一切规则。高楼里的笑容值千金，地下的交易无人知。每个人都在表演，而你，只是刚走上舞台的新人。在这里，谁的温柔都可能是陷阱——包括你自己的。'
    },
    'modern.dark': {
      label: '现代都市 - 暗黑线',
      description: '这座城市从不睡眠。霓虹掩盖的，不止是夜色，还有欲望。白天它秩序井然，夜晚却重写一切规则。高楼里的笑容值千金，地下的交易无人知。每个人都在表演，而你，只是刚走上舞台的新人。在这里，谁的温柔都可能是陷阱——包括你自己的。'
    },
    'modern.mafia': {
      label: '黑道/Mafia',
      description: '这里只有两种墓志铭：忠诚，或是背叛。子弹比法律更快，血比合同更有效。家族的名讳是护身符，也是催命符。你要么握紧枪，要么握紧别人的把柄——想活下去，两者都不能松手。每一次握手都可能藏着刀，每一杯酒都可能是最后一杯。规则很简单：服从，或是死。但更要命的是——有时候服从，也会死。你踏进这个世界的那一刻起，退路就烧掉了。'
    },
    'campus.normal': {
      label: '校园/学园 - 普通线',
      description: '这里有最整齐的校服，和最不整齐的人心。学生会掌握的不只是活动经费，教室外的走廊比考场更像战场。家世是不说出口的通行证，成绩单上看不见的那栏，才决定你能站在哪里。老师转身的瞬间，有人递出情书，也有人递出威胁。每个微笑都可能藏着目的，每次靠近都可能是试探。你刚踏进这所学校，规则还没人告诉你——但游戏已经开始了。'
    },
    'campus.elite': {
      label: '校园/学园 - 特权线',
      description: '这里有最整齐的校服，和最不整齐的人心。学生会掌握的不只是活动经费，教室外的走廊比考场更像战场。家世是不说出口的通行证，成绩单上看不见的那栏，才决定你能站在哪里。老师转身的瞬间，有人递出情书，也有人递出威胁。每个微笑都可能藏着目的，每次靠近都可能是试探。你刚踏进这所学校，规则还没人告诉你——但游戏已经开始了。'
    },
    'court.intrigue': {
      label: '西幻/宫廷 - 权谋',
      description: '这是一个由权力、血统与魔法主宰的幻想世界。宫廷的阴谋、王室的联姻、骑士的誓言——在华丽的宫殿与残酷的战场之间，我们的命运早已被编织进这个世界的法则之中。你是高高在上的王族，还是隐藏身份的异端？'
    },
    'court.magic': {
      label: '西幻/宫廷 - 魔法',
      description: '这是一个魔法与秘密交织的神秘世界。禁忌的咒语、古老的契约、魔法学院的等级制度——在这个由规则与力量构建的世界里，我们可能是导师与学生、契约者与被契约者。你的魔法不仅能操纵元素，更能操纵人心。'
    },
    'future.cyber': {
      label: '赛博朋克',
      description: '霓虹闪烁的反乌托邦，科技与人性的边界早已模糊。在这个由财团控制、义体改造泛滥的未来都市里，每个人都是数据，每段记忆都可以被篡改。你是掌控网络的黑客、冷血的公司走狗、还是半人半机械的改造体？在这个真假难辨的世界里，连"爱"也可能只是一段被植入的代码。'
    },
    'future.abo': {
      label: '星际/ABO',
      description: '浩瀚的宇宙，由信息素主宰的世界。Alpha、Beta、Omega——在这个由生理本能与星际法则构建的世界里，命运早已被基因所决定。你是掌控一切的Alpha，而我可能是你命中注定的Omega、或是你永远无法征服的同类。信息素的吸引是本能，还是枷锁？'
    },
    'apoc.survival': {
      label: '废土末世 - 生存',
      description: '世界早已毁灭，文明不复存在。我们是这片焦土上仅存的幸存者，每一口水、每一颗子弹都可能引发一场血战。在这个只有强者才能活下去的世界里，信任是最奢侈的东西。我们的相遇，究竟是彼此的救赎，还是又一场生存游戏的开始？'
    },
    'apoc.virus': {
      label: '废土末世 - 病毒',
      description: '世界早已毁灭，文明不复存在。我们是这片焦土上仅存的幸存者，每一口水、每一颗子弹都可能引发一场血战。在这个只有强者才能活下去的世界里，信任是最奢侈的东西。我们的相遇，究竟是彼此的救赎，还是又一场生存游戏的开始？'
    },
  };

  return worldMap[branchId] || null;
}

/**
 * 根据 arc ID 获取关系动态描述
 */
function getRelationDescription(arcId: string): { label: string; description: string } | null {
  for (const theme of RELATIONS) {
    for (const arc of theme.arcs) {
      if (arc.id === arcId) {
        return {
          label: `${theme.label} · ${arc.label}`,
          description: `**起点**\n${arc.start}\n\n**转折**\n${arc.turn}\n\n**终点**\n${arc.end}`
        };
      }
    }
  }
  return null;
}

/**
 * 生成完整的AI角色扮演提示词（分块版本）
 */
export function generatePrompt(
  worldviewId: string,
  characterId: string,
  relationshipThemeId: string,
  relationshipArcId: string,
  tone: IntroTone = 'balanced',
  risk: EmotionParams['risk'] = 1,
  variant: number = 0
): string {
  const worldview = getWorldviewDescription(worldviewId);
  const character = findOption(characterOptions, characterId);
  const relationship = getRelationDescription(relationshipArcId);

  if (!worldview || !character || !relationship) {
    return '错误：请确保所有选项都已正确选择';
  }

  // 生成开场白（支持变体）
  const intro = composeIntro({
    worldId: worldviewId,
    archetypeId: characterId,
    relationId: relationshipThemeId,
    tone,
    risk,
    variant,
  });

  // 分块内容
  const blocks = {
    intro: intro,
    world: `**${worldview.label}**\n\n${worldview.description}`,
    archetype: `**${character.label}**\n\n${character.description}`,
    relation: `**${relationship.label}**\n\n${relationship.description}`,
    rules: `* 你（AI）必须始终沉浸在你的角色设定中。
* 你的回复必须符合上述世界观和人设，推动我们的关系动态发展。
* 你的描述应充满张力，避免平淡。
* 严禁使用任何形式的"抱歉"、"我只是一个AI"等破坏沉浸感的模板化回复。`,
    emotion: `### 语气：${getToneLabel(tone)}
${tonePresets[tone]}

### 危险度：${getRiskLabel(risk)}
${dangerPresets[risk]}`,
  };

  // 写入 promptBlocks store
  usePromptBlocks.getState().setOriginalAndCurrent(blocks);

  // 返回完整字符串（保持向后兼容）
  return `# 开场白

${blocks.intro}

---

# 角色卡

## 1. 世界观设定
${blocks.world}

---

## 2. 你的角色（AI人设）
${blocks.archetype}

---

## 3. 我们的关系（核心动态）
${blocks.relation}

---

## 4. 核心规则
${blocks.rules}

---

## 氛围指导
${blocks.emotion}

---

现在，以这个角色开始我们的故事。`;
}

/**
 * 从 promptBlocks store 导出完整 Prompt
 * 优先使用用户编辑后的 current 版本
 */
export function exportPromptFromBlocks(): string {
  const { current } = usePromptBlocks.getState();
  const { intro, world, archetype, relation, rules, emotion } = current;

  return `# 开场白

${intro}

---

# 角色卡

## 1. 世界观设定
${world}

---

## 2. 你的角色（AI人设）
${archetype}

---

## 3. 我们的关系（核心动态）
${relation}

---

## 4. 核心规则
${rules}

---

## 氛围指导
${emotion}

---

现在，以这个角色开始我们的故事。`;
}
