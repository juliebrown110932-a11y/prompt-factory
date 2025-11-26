import {
  characterOptions,
  type Option,
} from '@/app/data/options';
import { RELATIONS } from '@/app/data/relations';
import { WORLDS } from '@/app/data/worlds';
import { composeIntro, type IntroTone } from '@/app/utils/introComposer';
import { getToneLabel, getRiskLabel, type EmotionParams } from '@/app/utils/emotionRewriter';
import { usePromptBlocks, type BlockKey } from '@/app/store/promptBlocks';
import { MODEL_PATCHES, type ModelId } from '@/app/data/modelPatches';
import { getStageTemplate } from '@/app/data/stageTemplates';

/**
 * 氛围描述映射函数 - 英文版
 */
function getMoodDescription(tone: IntroTone, risk: EmotionParams['risk']): string {
  const descriptions: Record<IntroTone, Record<EmotionParams['risk'], string>> = {
    soft: {
      0: 'Gentle language, warm atmosphere, safe distance',
      1: 'Gentle with hints, allow subtle flirting',
      2: 'Gentle surface, hidden intensity underneath'
    },
    balanced: {
      0: 'Natural and relaxed, appropriate boundaries',
      1: 'Balanced push-pull, create tension',
      2: 'Intense underneath calm, controlled desire'
    },
    intense: {
      0: 'Direct emotions, strong chemistry',
      1: 'Passionate, bold advances',
      2: 'Overwhelming desire, dangerous intimacy'
    }
  };

  return descriptions[tone]?.[risk] || 'Adjust tone and intensity as needed';
}

/**
 * 根据 ID 查找选项
 */
function findOption(options: Option[], id: string): Option | undefined {
  return options.find((option) => option.id === id);
}

/**
 * 根据分支ID从worlds.ts获取世界观描述
 */
function getWorldviewDescription(branchId: string): { label: string; description: string } | null {
  for (const world of WORLDS) {
    for (const branch of world.children) {
      if (branch.id === branchId) {
        return {
          label: `${world.label} - ${branch.label}`,
          description: branch.description || ''
        };
      }
    }
  }
  return null;
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
          description: `**起点**\n${arc.start}\n\n**转折**\n${arc.turn}\n\n**持续发展**\n${arc.end}`
        };
      }
    }
  }
  return null;
}

/**
 * 生成阶段引擎文本 - 已废弃，保留作为备用
 * 新系统使用 getStageTemplate() 直接返回模板
 */

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
  variant: number = 0,
  modelId?: ModelId
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

  // 生成阶段引擎 - 根据关系动态选择对应模板
  const stageEngine = getStageTemplate(relationshipThemeId);

  // 获取模型专属patch（如果指定了modelId）
  const modelPatch = modelId ? MODEL_PATCHES[modelId] : '';

  // 分块内容
  const blocks = {
    intro: intro,
    world: `**${worldview.label}**\n\n${worldview.description}`,
    archetype: `**${character.label}**\n\n${character.description}`,
    relation: `**${relationship.label}**\n\n${relationship.description}`,
    rules: `\`\`\`rules
MUST per turn:
- Action (in dialogue, no brackets)
- Emotion shift (show via details)
- Relationship micro-progress
- Stay in character

FORBIDDEN:
- (bracket actions)
- Emotion summaries
- Repeated action patterns
- Polite questions ("Do you want...")
- Breaking character core traits

Principles:
- Every line advances relationship
- No filler chat
- Open-ended responses
- Stay immersed, no "I'm an AI" responses
\`\`\``,
    stageEngine: stageEngine,
    modelPatch: modelPatch,
    emotion: `\`\`\`mood
Tone: ${tone} | Risk: ${risk}
${getMoodDescription(tone, risk)}
\`\`\``,
  };

  // 写入 promptBlocks store
  usePromptBlocks.getState().setOriginalAndCurrent(blocks);

  // 返回完整字符串（保持向后兼容）
  return `# Character & World Setup

## 1. 世界观设定
${blocks.world}

---

## 2. AI 角色卡 [本节"你"指代AI]
${blocks.archetype}

---

## 3. 我们的关系（核心动态）
${blocks.relation}

---

## 4. System Config

${blocks.rules}

${blocks.stageEngine}

${blocks.emotion}

---

${blocks.modelPatch ? `${blocks.modelPatch}\n\n---\n\n` : ''}现在，请以角色身份自然回应。`;
}

/**
 * 从 promptBlocks store 导出完整 Prompt
 * 优先使用用户编辑后的 current 版本
 */
export function exportPromptFromBlocks(): string {
  const { current } = usePromptBlocks.getState();
  const { intro, world, archetype, relation, rules, stageEngine, modelPatch, emotion, characterName, openingLine } = current;

  // 构建名字和开场句部分
  let nameAndOpeningSection = '';
  if (characterName || openingLine) {
    nameAndOpeningSection = '\n---\n\n';
    if (characterName) {
      nameAndOpeningSection += `**角色名字**: ${characterName}\n\n`;
    }
    if (openingLine) {
      nameAndOpeningSection += `**第一次互动**: ${openingLine}\n\n`;
    }
  }

  return `# Character & World Setup

## 1. 世界观设定
${world}

---

## 2. AI 角色卡 [本节"你"指代AI]
${archetype}

---

## 3. 我们的关系（核心动态）
${relation}

---

## 4. System Config

${rules}

${stageEngine}

${emotion}

---

${modelPatch ? `${modelPatch}\n\n---\n\n` : ''}${nameAndOpeningSection}现在，请以角色身份自然回应。`;
}
