'use client';

import { useState } from 'react';
import EditableBlock from './EditableBlock';
import { exportPromptFromBlocks } from '@/app/utils/promptGenerator';

interface PromptResultProps {
  prompt: string; // 保留向后兼容，但实际使用 blocks store
}

export default function PromptResult({ prompt }: PromptResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyAll = async () => {
    try {
      const fullPrompt = exportPromptFromBlocks();
      await navigator.clipboard.writeText(fullPrompt);
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
          onClick={handleCopyAll}
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
          {copied ? '✓ 已复制' : '📋 复制全部指令'}
        </button>
      </div>

      {/* 分块展示区域 */}
      <div className="space-y-4">
        <EditableBlock
          title="开场白"
          blockKey="intro"
          subtitle="故事的开篇氛围"
        />

        <EditableBlock
          title="世界观设定"
          blockKey="world"
          subtitle="故事发生的舞台与背景"
        />

        <EditableBlock
          title="你的角色（AI人设）"
          blockKey="archetype"
          subtitle="TA 的性格与核心特质"
        />

        <EditableBlock
          title="我们的关系（核心动态）"
          blockKey="relation"
          subtitle="你们之间的情感曲线"
        />

        <EditableBlock
          title="互动规则"
          blockKey="rules"
          subtitle="对话的核心约束"
        />

        <EditableBlock
          title="氛围指导"
          blockKey="emotion"
          subtitle="语气与危险度设定"
        />
      </div>

      {/* 使用提示 */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-xs sm:text-sm text-blue-800">
          💡 使用提示：
        </p>
        <ul className="mt-2 text-xs sm:text-sm text-blue-700 space-y-1 ml-4 list-disc">
          <li>点击「✎ 编辑」可修改任意模块内容</li>
          <li>点击「⧉ 复制此块」可单独复制某个模块</li>
          <li>点击「↺ 重置此块」可恢复至生成版本</li>
          <li>点击顶部「📋 复制全部指令」可复制完整 Prompt</li>
        </ul>
      </div>
    </div>
  );
}
