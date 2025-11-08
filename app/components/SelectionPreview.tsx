'use client';

import { useState, useEffect } from 'react';
import { useSelectionStore } from '@/app/store/selection';
import { CHARACTER_MOTHERS } from '@/app/data/uiPrompts';
import { ECHO_TEXTS } from '@/app/data/echoTexts';
import { computeCompat } from '@/app/logic/compat';

export function SelectionPreview() {
  const {
    characterMotherId,
    archetypeId,
    relationThemeId,
    worldBranchId,
  } = useSelectionStore();

  const [showPatches, setShowPatches] = useState(false);

  // 获取人设Echo
  const characterEcho = (() => {
    if (!archetypeId) return null;
    // 优先使用精确archetype echo，否则使用母类echo
    const exactEcho = ECHO_TEXTS.archetype[archetypeId as keyof typeof ECHO_TEXTS.archetype];
    if (exactEcho) return exactEcho;

    const mother = CHARACTER_MOTHERS.find((m) => m.id === characterMotherId);
    return mother?.echo || null;
  })();

  // 获取关系Echo
  const relationEcho = relationThemeId
    ? ECHO_TEXTS.relation[relationThemeId as keyof typeof ECHO_TEXTS.relation] || null
    : null;

  // 获取世界Echo
  const worldEcho = worldBranchId
    ? ECHO_TEXTS.world[worldBranchId as keyof typeof ECHO_TEXTS.world] || null
    : null;

  // 计算兼容度（如果三项都选择了）
  const compatResult =
    archetypeId && relationThemeId && worldBranchId
      ? computeCompat({
          characterArchetypeId: archetypeId,
          relationThemeId,
          worldBranchId,
        })
      : null;

  // 确定兼容标签
  const badge = compatResult
    ? compatResult.score >= 85
      ? '完美适配'
      : compatResult.score >= 60
      ? '已为你定制'
      : '自由组合'
    : null;

  const badgeColor = compatResult
    ? compatResult.score >= 85
      ? 'from-green-500 to-emerald-500'
      : compatResult.score >= 60
      ? 'from-purple-500 to-pink-500'
      : 'from-gray-400 to-gray-500'
    : '';

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-800">故事预览</h3>

      {/* Echo三行 */}
      <div className="space-y-4">
        {/* 人设Echo */}
        {characterEcho && (
          <div
            className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg animate-fade-in"
            style={{ animationDelay: '0ms' }}
          >
            <p className="text-sm text-gray-600 mb-1">关于他</p>
            <p className="text-gray-800 leading-relaxed">{characterEcho}</p>
          </div>
        )}

        {/* 关系Echo */}
        {relationEcho && (
          <div
            className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg animate-fade-in"
            style={{ animationDelay: '150ms' }}
          >
            <p className="text-sm text-gray-600 mb-1">你们之间</p>
            <p className="text-gray-800 leading-relaxed">{relationEcho}</p>
          </div>
        )}

        {/* 世界Echo */}
        {worldEcho && (
          <div
            className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg animate-fade-in"
            style={{ animationDelay: '300ms' }}
          >
            <p className="text-sm text-gray-600 mb-1">故事舞台</p>
            <p className="text-gray-800 leading-relaxed">{worldEcho}</p>
          </div>
        )}

        {/* 空态提示 */}
        {!characterEcho && !relationEcho && !worldEcho && (
          <div className="p-6 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-400 text-sm">
              完成选择后，这里将浮现你的故事开场引言
            </p>
          </div>
        )}
      </div>

      {/* 兼容度标签 */}
      {compatResult && badge && (
        <div className="mt-8 p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <span
              className={`px-4 py-1.5 rounded-full text-sm font-bold text-white bg-gradient-to-r ${badgeColor}`}
            >
              {badge}
            </span>
            <button
              onClick={() => setShowPatches(!showPatches)}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              {showPatches ? '收起详情' : '查看详情'}
            </button>
          </div>

          {/* 详情区（可展开） */}
          {showPatches && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>数值评分:</span>
                <span className="font-bold text-purple-700">
                  {compatResult.score}
                </span>
              </div>

              {/* 设定加成 */}
              {compatResult.patches.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    设定加成
                  </p>
                  <ul className="space-y-2">
                    {compatResult.patches.map((patch, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-700 pl-3 border-l-2 border-purple-300"
                      >
                        {patch}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 提示文本 */}
      {!compatResult && (archetypeId || relationThemeId || worldBranchId) && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 text-center">
            完成所有选择后查看兼容度评估
          </p>
        </div>
      )}
    </div>
  );
}
