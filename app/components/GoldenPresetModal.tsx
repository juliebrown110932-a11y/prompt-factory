'use client';

import { useState, useEffect } from 'react';
import { GOLDEN_PRESETS, type GoldenPreset } from '@/app/data/presets';
import { generatePrompt } from '@/app/utils/promptGenerator';
import { getRandomName } from '@/app/utils/nameHints';
import { getRandomOpening } from '@/app/utils/openingHints';
import { CHARACTER_MOTHERS } from '@/app/data/uiPrompts';
import { RELATIONS } from '@/app/data/relations';
import { WORLDS } from '@/app/data/worlds';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function GoldenPresetModal({ isOpen, onClose }: Props) {
  const [currentPreset, setCurrentPreset] = useState<GoldenPreset | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [characterName, setCharacterName] = useState<string>('');
  const [openingSuggestion, setOpeningSuggestion] = useState<string>('');

  // 查找人设名称
  const getArchetypeName = (archetypeId: string): string => {
    for (const mother of CHARACTER_MOTHERS) {
      const archetype = mother.archetypes.find((a) => a.id === archetypeId);
      if (archetype) return archetype.label;
    }
    return archetypeId;
  };

  // 查找关系名称
  const getRelationName = (themeId: string, arcId: string): string => {
    const theme = RELATIONS.find((r) => r.id === themeId);
    const arc = theme?.arcs.find((a) => a.id === arcId);
    return theme && arc ? `${theme.label} · ${arc.label}` : themeId;
  };

  // 查找世界观名称
  const getWorldName = (branchId: string): string => {
    for (const world of WORLDS) {
      const branch = world.children.find((b) => b.id === branchId);
      if (branch) return `${world.label} - ${branch.label}`;
    }
    return branchId;
  };

  // 随机选择一套并生成
  const generateRandomPreset = () => {
    const randomIndex = Math.floor(Math.random() * GOLDEN_PRESETS.length);
    const preset = GOLDEN_PRESETS[randomIndex];

    // 生成名字和开场白
    const name = getRandomName(preset.config.worldBranchId, preset.config.archetypeId);
    const opening = getRandomOpening(preset.config.archetypeId, preset.config.worldBranchId, preset.config.relationThemeId);

    // 生成完整prompt
    const prompt = generatePrompt(
      preset.config.worldBranchId,
      preset.config.archetypeId,
      preset.config.relationThemeId,
      preset.config.relationArcId,
      preset.config.introTone,
      preset.config.risk
    );

    setCurrentPreset(preset);
    setCharacterName(name);
    setOpeningSuggestion(opening);
    setGeneratedPrompt(prompt);
  };

  // 复制全部
  const handleCopy = () => {
    const fullContent = `AI 角色名：${characterName}\n\n开场建议：${openingSuggestion}\n\n${generatedPrompt}`;
    navigator.clipboard.writeText(fullContent).then(
      () => {
        alert('已复制到剪贴板！');
      },
      (err) => {
        console.error('复制失败:', err);
        alert('复制失败，请手动复制');
      }
    );
  };

  // 弹窗打开时自动生成一套，关闭时清理状态
  useEffect(() => {
    if (isOpen && !currentPreset) {
      generateRandomPreset();
    } else if (!isOpen) {
      // 关闭时清理状态，下次打开重新生成
      setCurrentPreset(null);
      setCharacterName('');
      setOpeningSuggestion('');
      setGeneratedPrompt('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="p-6 border-b bg-gradient-to-r from-purple-50 to-pink-50">
          <h2 className="text-2xl font-bold text-gray-800">✨ 为你推荐</h2>
          {currentPreset && (
            <div className="mt-2">
              <p className="text-lg font-medium text-purple-600">{currentPreset.name}</p>
              <p className="text-sm text-gray-600 mt-1">{currentPreset.description}</p>
            </div>
          )}
        </div>

        {/* 内容区域 */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {currentPreset ? (
            <>
              {/* 配置信息 */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-700 mb-3">配置详情</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700">
                    <span className="font-medium">人设：</span>
                    {getArchetypeName(currentPreset.config.archetypeId)}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">关系：</span>
                    {getRelationName(currentPreset.config.relationThemeId, currentPreset.config.relationArcId)}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">世界观：</span>
                    {getWorldName(currentPreset.config.worldBranchId)}
                  </p>
                </div>
              </div>

              {/* 角色名 */}
              <div className="mb-4">
                <p className="font-medium text-gray-700 mb-2">AI 角色名：</p>
                <p className="text-gray-800 text-lg">{characterName}</p>
              </div>

              {/* 开场建议 */}
              <div className="mb-4">
                <p className="font-medium text-gray-700 mb-2">开场建议：</p>
                <p className="text-gray-800 bg-purple-50 p-3 rounded border border-purple-100">
                  {openingSuggestion}
                </p>
              </div>

              {/* 完整Prompt */}
              <div>
                <p className="font-medium text-gray-700 mb-2">完整Prompt：</p>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded border border-gray-200 max-h-60 overflow-y-auto font-mono">
                  {generatedPrompt}
                </pre>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">正在生成...</p>
            </div>
          )}
        </div>

        {/* 底部按钮 */}
        <div className="p-6 border-t bg-gray-50 flex gap-3">
          {currentPreset && (
            <>
              <button
                onClick={handleCopy}
                className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors shadow-sm"
              >
                📋 复制全部
              </button>
              <button
                onClick={generateRandomPreset}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                🎲 换一套
              </button>
            </>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}
