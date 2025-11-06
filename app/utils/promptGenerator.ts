import {
  worldviewOptions,
  characterOptions,
  relationshipOptions,
  type Option,
} from '@/app/data/options';

/**
 * 根据 ID 查找选项
 */
function findOption(options: Option[], id: string): Option | undefined {
  return options.find((option) => option.id === id);
}

/**
 * 生成完整的AI角色扮演提示词
 */
export function generatePrompt(
  worldviewId: string,
  characterId: string,
  relationshipId: string
): string {
  const worldview = findOption(worldviewOptions, worldviewId);
  const character = findOption(characterOptions, characterId);
  const relationship = findOption(relationshipOptions, relationshipId);

  if (!worldview || !character || !relationship) {
    return '错误：请确保所有选项都已正确选择';
  }

  // 母模板
  return `# 角色卡

## 1. 世界观设定
**${worldview.label}**

${worldview.description}

---

## 2. 你的角色（AI人设）
**${character.label}**

${character.description}

---

## 3. 我们的关系（核心动态）
**${relationship.label}**

${relationship.description}

---

## 4. 核心规则
* 你（AI）必须始终沉浸在你的角色设定中。
* 你的回复必须符合上述世界观和人设，推动我们的关系动态发展。
* 你的描述应充满张力，避免平淡。
* 严禁使用任何形式的"抱歉"、"我只是一个AI"等破坏沉浸感的模板化回复。

---

现在，以这个角色开始我们的故事。`;
}
