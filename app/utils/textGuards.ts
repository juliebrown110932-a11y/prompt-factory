/**
 * 文本守卫：禁词过滤、前缀去重、兜底句
 * 用于清除预览与开场白中的模板化陈词
 */

/**
 * 禁用模式列表
 */
export const BANNED_PATTERNS: RegExp[] = [
  /^空.?气/,                 // 空气/空气凝滞等
  /像要把你吞没/,            // 过于模板化的吞没句
  /假.?的演太久|真心藏不住/, // 套话
  /空气里.*甜|呼吸.*/,       // 呼吸/甜空气等陈词
];

/**
 * 兜底句：当检测到禁词或空字符串时使用
 */
export const FALLBACK = {
  archetype: '他看着你，不动声色。',
  relation: '你们之间有话没说完。',
  world: '灯光从窗外落下来。',
};

/**
 * 消毒单行文本
 * @param s 原始文本
 * @param kind 文本类型（用于选择兜底句）
 * @returns 清洁后的文本
 */
export function sanitizeLine(
  s: string,
  kind: 'archetype' | 'relation' | 'world'
): string {
  let t = (s || '').trim();
  if (!t) return FALLBACK[kind];

  // 检查禁词
  for (const pat of BANNED_PATTERNS) {
    if (pat.test(t)) return FALLBACK[kind];
  }

  // 统一句号
  t = t.replace(/[。…\s]+$/, '。');
  return t;
}

/**
 * 去重三行文本
 * @param lines 三行文本数组
 * @param kinds 对应的文本类型
 * @returns 去重后的三行文本
 */
export function dedup3(
  [a, b, c]: [string, string, string],
  kinds: ['archetype', 'relation', 'world']
): [string, string, string] {
  const seen = new Set<string>();
  const out = [a, b, c].map((s, i) => {
    let t = sanitizeLine(s, kinds[i]);
    const key = t.slice(0, 6);
    if (seen.has(key)) t = FALLBACK[kinds[i]];
    seen.add(key);
    return t;
  }) as [string, string, string];
  return out;
}
