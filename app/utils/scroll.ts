/**
 * 滚动定位与高亮工具
 */

/**
 * 滚动到指定元素并临时高亮
 * @param id 元素 ID
 * @returns 是否成功定位到元素
 */
export function scrollToEl(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) return false;

  // 平滑滚动到元素
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // 临时高亮（1.6秒）
  el.classList.add('ring-2', 'ring-fuchsia-400', 'ring-offset-2');
  setTimeout(() => {
    el.classList.remove('ring-2', 'ring-fuchsia-400', 'ring-offset-2');
  }, 1600);

  return true;
}

/**
 * 滚动到页面顶部
 */
export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
