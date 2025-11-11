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
};

/**
 * 生成开场白
 * 使用三档句库 + 去重消毒
 */
export function composeIntro(input: IntroInput): string {
  const { worldId, archetypeId, relationId, tone } = input;

  // 获取原始句子
  const rawArchetypeEcho = ARCT_ECHO[archetypeId]?.[tone] || '';
  const rawRelationEcho = REL_ECHO[relationId] || '';
  const rawWorldEcho = WORLD_ECHO[worldId] || '';

  // 应用去重与消毒
  const [archetypeLine, relationLine, worldLine] = dedup3(
    [rawArchetypeEcho, rawRelationEcho, rawWorldEcho],
    ['archetype', 'relation', 'world']
  );

  // 根据语气选择不同的结尾
  const endings: Record<IntroTone, string> = {
    soft: '故事在此刻静静展开。',
    balanced: '而这，只是开端。',
    intense: '他抬起眼，你已经退无可退。',
  };

  const ending = endings[tone];

  // 拼接行：人设 -> 关系 -> 世界 -> 结尾
  const lines = [archetypeLine, relationLine, worldLine, ending];

  // 拼接成完整开场白（4行）
  return lines.join('\n');
}
