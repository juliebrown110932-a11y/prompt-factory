/**
 * 多策略复制工具
 * 兼容 Edge/Bing WebView/iOS 限制
 */

/**
 * 尝试复制文本到剪贴板
 * 策略：
 * 1. 优先使用 navigator.clipboard API
 * 2. 失败则降级到 textarea + execCommand
 * 3. 都失败返回 false，由调用方处理（如弹窗手动复制）
 *
 * @param text 要复制的文本
 * @returns 是否成功复制
 */
export async function copyText(text: string): Promise<boolean> {
  // 策略 1: Clipboard API (现代浏览器 + HTTPS)
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    console.warn('Clipboard API 失败:', err);
  }

  // 策略 2: textarea + execCommand (兼容性兜底)
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    ta.style.top = '-9999px';
    ta.style.opacity = '0';
    document.body.appendChild(ta);

    ta.focus();
    ta.select();

    // 尝试执行复制命令
    const success = document.execCommand('copy');
    document.body.removeChild(ta);

    if (success) return true;
  } catch (err) {
    console.warn('execCommand 失败:', err);
  }

  // 都失败
  return false;
}

/**
 * 复制文本并返回结果信息
 * @param text 要复制的文本
 * @returns { success: boolean, message: string }
 */
export async function copyTextWithMessage(
  text: string
): Promise<{ success: boolean; message: string }> {
  const success = await copyText(text);

  if (success) {
    return { success: true, message: '已复制' };
  } else {
    return { success: false, message: '复制失败，请长按手动复制' };
  }
}
