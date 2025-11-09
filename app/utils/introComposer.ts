import { ECHO_TEXTS } from '@/app/data/echoTexts';

export type IntroTone = 'soft' | 'balanced' | 'intense';

export type IntroInput = {
  worldId: string;
  archetypeId: string;
  relationId: string;
  tone: IntroTone;
};

export function composeIntro(input: IntroInput): string {
  const { worldId, archetypeId, relationId, tone } = input;

  // 从 ECHO 模板取句，缺失时使用默认文本
  const worldLine =
    ECHO_TEXTS.world[worldId as keyof typeof ECHO_TEXTS.world] ??
    '世界安静地转动，像等待一场不该开始的梦。';

  const charLine =
    ECHO_TEXTS.archetype[archetypeId as keyof typeof ECHO_TEXTS.archetype] ??
    '他看似平静，实际上暗流涌动。';

  const relLine =
    ECHO_TEXTS.relation[relationId as keyof typeof ECHO_TEXTS.relation] ??
    '你们之间隔着无法命名的东西。';

  // 根据语气选择不同的结尾
  const endings: Record<IntroTone, string> = {
    soft: '故事在此刻静静展开。',
    balanced: '而这，只是开端。',
    intense: '他抬起眼，你已经退无可退。',
  };

  // 拼接成完整开场白（3-4行）
  return [worldLine, charLine, relLine, endings[tone]].join('\n');
}
