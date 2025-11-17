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
  variant?: number; // 保留以兼容现有接口，但不再使用
};

/**
 * 生成开场白（3行）
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

  // 拼接3行：人设 -> 关系 -> 世界
  const lines = [archetypeLine, relationLine, worldLine];

  // 拼接成完整开场白（3行）
  return lines.join('\n');
}
