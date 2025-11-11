'use client';

import { useState } from 'react';
import { usePromptBlocks, type BlockKey } from '@/app/store/promptBlocks';

type Props = {
  title: string;
  blockKey: BlockKey;
  subtitle?: string;
};

// 简易 toast 状态
let toastTimer: NodeJS.Timeout | null = null;

export default function EditableBlock({ title, blockKey, subtitle }: Props) {
  const { current, resetBlock, setBlock } = usePromptBlocks();
  const value = current[blockKey] || '';
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value);
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => setToastMsg(''), 2000);
  };

  const onEdit = () => {
    setDraft(value);
    setOpen(true);
  };

  const onSave = () => {
    setBlock(blockKey, draft);
    setOpen(false);
    showToast('已保存修改');
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      showToast('已复制此块');
    } catch (err) {
      console.error('复制失败', err);
      showToast('复制失败');
    }
  };

  const onReset = () => {
    resetBlock(blockKey);
    showToast('已恢复至生成版本');
  };

  const charCount = draft.length;

  return (
    <>
      <div className="rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm bg-white/60 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">{title}</h3>
            {subtitle && <p className="text-xs sm:text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            <button
              onClick={onEdit}
              className="px-3 py-1.5 text-sm rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium transition-colors"
            >
              ✎ 编辑
            </button>
            <button
              onClick={onCopy}
              className="px-3 py-1.5 text-sm rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium transition-colors"
            >
              ⧉ 复制此块
            </button>
            <button
              onClick={onReset}
              className="px-3 py-1.5 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
            >
              ↺ 重置此块
            </button>
          </div>
        </div>

        <pre className="whitespace-pre-wrap leading-7 mt-4 text-sm sm:text-base text-gray-700 font-sans">
          {value || '（暂无内容）'}
        </pre>
      </div>

      {/* 编辑对话框 */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-xl bg-white p-4 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="font-semibold text-lg mb-2 text-gray-800">编辑：{title}</h4>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="w-full h-72 resize-none rounded-lg border border-gray-300 p-3 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:border-transparent font-sans"
              placeholder="在此输入内容..."
              autoFocus
            />
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-gray-500">{charCount} 字</p>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
                  onClick={() => setOpen(false)}
                >
                  取消
                </button>
                <button
                  className="px-4 py-2 text-sm rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors"
                  onClick={onSave}
                >
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast 提示 */}
      {toastMsg && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in text-sm">
          {toastMsg}
        </div>
      )}
    </>
  );
}
