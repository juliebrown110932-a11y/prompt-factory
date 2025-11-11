import { ARCT_ECHO, REL_ECHO, WORLD_ECHO } from '@/app/data/echoTexts';
import { dedup3 } from '@/app/utils/textGuards';
import type { EmotionParams } from '@/app/utils/emotionRewriter';

export type IntroTone = 'soft' | 'balanced' | 'intense';

export type IntroInput = {
  worldId: string;
  archetypeId: string;
  relationId: string;
  tone: IntroTone;
  risk?: EmotionParams['risk']; // 可选危险度参数
  variant?: number; // 变体索引（用于再生成）
};

/**
 * 开场白结尾变体模板
 * 每个 tone 提供 2-3 个等价变体，用于「再生成一个」
 */
const INTRO_ENDINGS: Record<IntroTone, string[]> = {
  soft: [
    '故事在此刻静静展开。',
    '安静地，从这里开始。',
    '一切轻柔地，开始了。',
  ],
  balanced: [
    '而这，只是开端。',
    '故事刚好拧紧了一点。',
    '从这里，一切都不同了。',
  ],
  intense: [
    '他抬起眼，你已经退无可退。',
    '从此，每一步都算数。',
    '你们之间的距离，已经消失了。',
  ],
};

/**
 * 生成开场白
 * 使用三档句库 + 去重消毒 + 支持变体
 */
export function composeIntro(input: IntroInput): string {
  const { worldId, archetypeId, relationId, tone, variant = 0 } = input;

  // 获取原始句子
  const rawArchetypeEcho = ARCT_ECHO[archetypeId]?.[tone] || '';
  const rawRelationEcho = REL_ECHO[relationId] || '';
  const rawWorldEcho = WORLD_ECHO[worldId] || '';

  // 应用去重与消毒
  const [archetypeLine, relationLine, worldLine] = dedup3(
    [rawArchetypeEcho, rawRelationEcho, rawWorldEcho],
    ['archetype', 'relation', 'world']
  );

  // 根据语气和变体索引选择结尾
  const endingVariants = INTRO_ENDINGS[tone];
  const ending = endingVariants[variant % endingVariants.length];

  // 拼接行：人设 -> 关系 -> 世界 -> 结尾
  const lines = [archetypeLine, relationLine, worldLine, ending];

  // 拼接成完整开场白（4行）
  return lines.join('\n');
}
