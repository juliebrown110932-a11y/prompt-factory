'use client';

import { useState } from 'react';
import EditableBlock from './EditableBlock';
import { exportPromptFromBlocks } from '@/app/utils/promptGenerator';
import { copyText } from '@/app/utils/copy';
import { usePromptBlocks } from '@/app/store/promptBlocks';

interface PromptResultProps {
  prompt: string; // 保留向后兼容，但实际使用 blocks store
  onRegenerate?: () => void; // 再生成一个回调
  onReset?: () => void; // 重新开始回调
}

export default function PromptResult({ prompt, onRegenerate, onReset }: PromptResultProps) {
  const [copied, setCopied] = useState(false);
  const [showManualCopy, setShowManualCopy] = useState(false);
  const [manualCopyText, setManualCopyText] = useState('');
  const [isSystemConfigExpanded, setIsSystemConfigExpanded] = useState(false);

  // 从 store 读取 modelPatch 来判断是否显示
  const modelPatch = usePromptBlocks((state) => state.current.modelPatch);

  const handleCopyAll = async () => {
    try {
      const fullPrompt = exportPromptFromBlocks();
      const success = await copyText(fullPrompt);

      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // 复制失败，显示手动复制弹窗
        setManualCopyText(fullPrompt);
        setShowManualCopy(true);
      }
    } catch (err) {
      console.error('复制失败:', err);
      setManualCopyText(exportPromptFromBlocks());
      setShowManualCopy(true);
    }
  };

  const handleRegenerate = () => {
    if (onRegenerate) {
      onRegenerate();
      // 滚动到顶部查看新结果
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    if (window.confirm('将清空所有选择与编辑内容，确定吗？')) {
      if (onReset) {
        onReset();
      }
    }
  };

  const selectAllText = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    (e.target as HTMLTextAreaElement).select();
  };

  return (
    <div className="w-full mt-8 sm:mt-10">
      {/* 结果标题和操作按钮 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3 sm:mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          ✨ 你的专属调教指令
        </h2>
        <div className="flex flex-wrap gap-2">
          {onRegenerate && (
            <button
              onClick={handleRegenerate}
              className="px-3 py-2 text-sm rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium transition-colors min-h-[44px]"
            >
              🔄 再生成一个
            </button>
          )}
          {onReset && (
            <button
              onClick={handleReset}
              className="px-3 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors min-h-[44px]"
            >
              ↻ 重新开始
            </button>
          )}
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
          title={'AI 角色卡（本节"你"指代AI）'}
          blockKey="archetype"
          subtitle="TA 的性格与核心特质"
        />

        <EditableBlock
          title="我们的关系（核心动态）"
          blockKey="relation"
          subtitle="你们之间的情感曲线"
        />

        {/* System Config - 可折叠区域 */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
               onClick={() => setIsSystemConfigExpanded(!isSystemConfigExpanded)}>
            <div>
              <h3 className="text-base font-semibold text-gray-800">⚙️ System Config</h3>
              <p className="text-xs text-gray-500 mt-0.5">系统配置（互动规则、阶段控制、氛围指导）</p>
            </div>
            <button className="text-sm text-gray-600 hover:text-gray-800 font-medium px-3 py-1 rounded hover:bg-gray-100 transition-colors">
              {isSystemConfigExpanded ? '▲ 收起' : '▼ 展开查看/编辑'}
            </button>
          </div>

          {isSystemConfigExpanded && (
            <div className="p-4 pt-0 space-y-4 border-t border-gray-100">
              <EditableBlock
                title="互动规则"
                blockKey="rules"
                subtitle="对话的核心约束"
              />

              <EditableBlock
                title="关系发展阶段控制"
                blockKey="stageEngine"
                subtitle="三段式阶段锁，控制关系推进节奏"
              />

              <EditableBlock
                title="氛围指导"
                blockKey="emotion"
                subtitle="语气与危险度设定"
              />
            </div>
          )}
        </div>

        {modelPatch && (
          <EditableBlock
            title="模型专属优化指令"
            blockKey="modelPatch"
            subtitle="针对目标模型的定向修正"
          />
        )}
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
          {onRegenerate && <li>点击「🔄 再生成一个」可生成新的变体（保留当前选择）</li>}
          {onReset && <li>点击「↻ 重新开始」可清空所有选择重新开始</li>}
        </ul>
      </div>

      {/* 手动复制弹窗 */}
      {showManualCopy && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={() => setShowManualCopy(false)}
        >
          <div
            className="w-full max-w-2xl rounded-xl bg-white p-4 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="font-semibold text-lg mb-2 text-gray-800">
              请手动复制以下内容
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              自动复制功能不可用，请长按文本框选择全部内容并复制
            </p>
            <textarea
              value={manualCopyText}
              onClick={selectAllText}
              readOnly
              className="w-full h-96 resize-none rounded-lg border border-gray-300 p-3 text-sm font-mono bg-gray-50"
            />
            <div className="flex justify-end gap-2 mt-3">
              <button
                className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors"
                onClick={() => setShowManualCopy(false)}
              >
                关闭
              </button>
              <button
                className="px-4 py-2 text-sm rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors"
                onClick={selectAllText as any}
              >
                全选文本
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
