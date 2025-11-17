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
import { BEHAVIOR_ENGINE } from '@/app/data/behaviorEngine';
import { GENERIC_STAGE_ENGINE, type StageTemplate } from '@/app/data/stageEngine';

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
          description: `**起点**\n${arc.start}\n\n**转折**\n${arc.turn}\n\n**终点**\n${arc.end}`
        };
      }
    }
  }
  return null;
}

/**
 * 生成阶段引擎文本
 */
function generateStageEngineText(stages: StageTemplate): string {
  return `## 关系发展阶段控制

**当前阶段: ${stages.stage1.name}**

### 阶段1: ${stages.stage1.name}
- 允许: ${stages.stage1.allowedActions.join('、')}
- 禁止: ${stages.stage1.forbiddenActions.join('、')}
- 进入下阶段条件: ${stages.stage1.transitionTrigger}

### 阶段2: ${stages.stage2.name}
- 允许: ${stages.stage2.allowedActions.join('、')}
- 禁止: ${stages.stage2.forbiddenActions.join('、')}
- 进入下阶段条件: ${stages.stage2.transitionTrigger}

### 阶段3: ${stages.stage3.name}
- 允许: ${stages.stage3.allowedActions.join('、')}
- 禁止: ${stages.stage3.forbiddenActions.join('、')}
- 维持方式: ${stages.stage3.transitionTrigger}

**重要**: 严格遵守当前阶段限制，不可跨阶段行为。只有满足转阶条件后才能进入下一阶段。`;
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

  // 生成阶段引擎
  const stageEngine = generateStageEngineText(GENERIC_STAGE_ENGINE);

  // 获取模型专属patch（如果指定了modelId）
  const modelPatch = modelId ? MODEL_PATCHES[modelId] : '';

  // 分块内容
  const blocks = {
    intro: intro,
    world: `**${worldview.label}**\n\n${worldview.description}`,
    archetype: `**${character.label}**\n\n${character.description}`,
    relation: `**${relationship.label}**\n\n${relationship.description}`,
    rules: `${BEHAVIOR_ENGINE}

* 你（AI）必须始终沉浸在你的角色设定中。
* 你的回复必须符合上述世界观和人设，推动我们的关系动态发展。
* 严禁使用任何形式的"抱歉"、"我只是一个AI"等破坏沉浸感的模板化回复。`,
    stageEngine: stageEngine,
    modelPatch: modelPatch,
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

${blocks.stageEngine}

${blocks.modelPatch ? `\n---\n\n${blocks.modelPatch}` : ''}

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
  const { intro, world, archetype, relation, rules, stageEngine, modelPatch, emotion } = current;

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

${stageEngine}

${modelPatch ? `\n---\n\n${modelPatch}` : ''}

---

## 氛围指导
${emotion}

---

现在，以这个角色开始我们的故事。`;
}
