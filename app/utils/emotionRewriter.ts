export type EmotionParams = {
  tone: 'soft' | 'balanced' | 'intense';
  risk: 0 | 1 | 2; // 0=安全 1=暧昧 2=暗黑
};

/**
 * 根据语气和危险度参数改写 Echo 句子
 * 系统逻辑不变，只通过模板切换让文字"呼吸"
 */
export function rewriteEchoLine(
  baseLine: string,
  params: EmotionParams
): string {
  const { tone, risk } = params;
  let line = baseLine;

  // === 语气层：影响句式风格 ===
  if (tone === 'soft') {
    // 柔和：缓和语气，去掉强烈词汇
    line = line
      .replace(/失控/g, '动摇')
      .replace(/退无可退/g, '无处可逃')
      .replace(/吞没/g, '包围')
      .replace(/撕碎/g, '打破')
      .replace(/崩溃/g, '动容');
  } else if (tone === 'intense') {
    // 强烈：加强情绪张力
    line = line
      .replace(/动摇/g, '失控')
      .replace(/靠近/g, '逼近')
      .replace(/看着/g, '盯着')
      .replace(/说/g, '低吼')
      .replace(/。$/g, '——像要把你吞没。');
  }
  // balanced 保持原样

  // === 危险度层：影响词汇浓度 ===
  if (risk === 0) {
    // 安全：温和化表达
    line = line
      .replace(/占有/g, '珍视')
      .replace(/囚禁/g, '守护')
      .replace(/猎物/g, '心上人')
      .replace(/掠夺/g, '追求')
      .replace(/刀/g, '目光')
      .replace(/血/g, '心意')
      .replace(/深渊/g, '未知');
  } else if (risk === 2) {
    // 暗黑：强化危险感
    line = line
      .replace(/靠近/g, '压制')
      .replace(/抱/g, '锁住')
      .replace(/看/g, '审视')
      .replace(/他/g, '他在你耳边');

    // 为暗黑模式添加前缀氛围
    if (!line.includes('空气') && !line.includes('耳边')) {
      line = line.replace(/^/, '空气凝滞——');
    }
  }
  // risk=1 保持原样（暧昧）

  return line;
}

/**
 * 获取语气标签文本
 */
export function getToneLabel(tone: EmotionParams['tone']): string {
  const labels = {
    soft: '柔和',
    balanced: '中性',
    intense: '强烈',
  };
  return labels[tone];
}

/**
 * 获取危险度标签文本
 */
export function getRiskLabel(risk: EmotionParams['risk']): string {
  const labels = {
    0: '安全',
    1: '暧昧',
    2: '暗黑',
  };
  return labels[risk];
}
