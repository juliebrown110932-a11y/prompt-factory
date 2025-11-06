'use client';

import { useState } from 'react';

interface PromptResultProps {
  prompt: string;
}

export default function PromptResult({ prompt }: PromptResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
      alert('复制失败，请手动选择文本复制');
    }
  };

  return (
    <div className="w-full mt-8 sm:mt-10">
      {/* 结果标题 */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          ✨ 你的专属调教指令
        </h2>
        <button
          onClick={handleCopy}
          className={`
            px-4 py-2 rounded-lg font-medium text-sm sm:text-base
            min-h-[44px] transition-all duration-200
            ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white hover:shadow-lg active:scale-95'
            }
          `}
        >
          {copied ? '✓ 已复制' : '📋 复制指令'}
        </button>
      </div>

      {/* 结果文本区域 - 移动端优化 */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border-2 border-gray-100">
        <pre className="whitespace-pre-wrap text-sm sm:text-base text-gray-800 font-sans leading-relaxed">
          {prompt}
        </pre>
      </div>

      {/* 使用提示 */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-xs sm:text-sm text-blue-800">
          <span className="font-semibold">💡 使用提示：</span>
          点击&ldquo;复制指令&rdquo;按钮，然后粘贴到你的 AI 对话框中（如 Claude、ChatGPT 等），开始你的专属角色扮演之旅！
        </p>
      </div>
    </div>
  );
}
