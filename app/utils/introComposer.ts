import { ECHO_TEXTS } from '@/app/data/echoTexts';
import { rewriteEchoLine, type EmotionParams } from '@/app/utils/emotionRewriter';

export type IntroTone = 'soft' | 'balanced' | 'intense';

export type IntroInput = {
  worldId: string;
  archetypeId: string;
  relationId: string;
  tone: IntroTone;
  risk?: EmotionParams['risk']; // 可选危险度参数
};

export function composeIntro(input: IntroInput): string {
  const { worldId, archetypeId, relationId, tone, risk = 1 } = input;

  // 构建情绪参数
  const emotionParams: EmotionParams = { tone, risk };

  // 从 ECHO 模板取句，缺失时使用默认文本
  let worldLine =
    ECHO_TEXTS.world[worldId as keyof typeof ECHO_TEXTS.world] ??
    '世界安静地转动，像等待一场不该开始的梦。';

  let charLine =
    ECHO_TEXTS.archetype[archetypeId as keyof typeof ECHO_TEXTS.archetype] ??
    '他看似平静，实际上暗流涌动。';

  let relLine =
    ECHO_TEXTS.relation[relationId as keyof typeof ECHO_TEXTS.relation] ??
    '你们之间隔着无法命名的东西。';

  // 应用情绪改写
  worldLine = rewriteEchoLine(worldLine, emotionParams);
  charLine = rewriteEchoLine(charLine, emotionParams);
  relLine = rewriteEchoLine(relLine, emotionParams);

  // 根据语气选择不同的结尾
  const endings: Record<IntroTone, string> = {
    soft: '故事在此刻静静展开。',
    balanced: '而这，只是开端。',
    intense: '他抬起眼，你已经退无可退。',
  };

  let ending = rewriteEchoLine(endings[tone], emotionParams);

  // 拼接行
  const lines = [worldLine, charLine, relLine];

  // 危险度为 2 时，在结尾前插入氛围句
  if (risk === 2) {
    lines.push('空气里有某种压迫的甜味。');
  }

  lines.push(ending);

  // 拼接成完整开场白（3-5行）
  return lines.join('\n');
}
