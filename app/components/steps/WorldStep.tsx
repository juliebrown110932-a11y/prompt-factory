'use client';

import { useState } from 'react';
import { useSelectionStore } from '@/app/store/selection';
import { WORLDS } from '@/app/data/worlds';
import { UI_QUESTIONS } from '@/app/data/uiPrompts';
import { WORLD_ECHO } from '@/app/data/echoTexts';

export function WorldStep() {
  const { worldBranchId, setWorldMother, setWorldBranch } = useSelectionStore();
  const [expandedWorldId, setExpandedWorldId] = useState<string | null>(null);

  const handleWorldClick = (worldId: string) => {
    if (expandedWorldId === worldId) {
      setExpandedWorldId(null);
    } else {
      setExpandedWorldId(worldId);
    }
  };

  const handleBranchSelect = (worldId: string, branchId: string) => {
    setWorldMother(worldId);
    setWorldBranch(branchId);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800">
        {UI_QUESTIONS.world}
      </h3>

      <div className="space-y-3">
        {WORLDS.map((world) => {
          const isExpanded = expandedWorldId === world.id;
          const hasSelection = world.children.some((b) => b.id === worldBranchId);

          return (
            <div key={world.id} className="transition-all">
              {/* 母世界观标题 */}
              <button
                onClick={() => handleWorldClick(world.id)}
                className={`w-full p-4 text-left rounded-lg transition-all ${
                  isExpanded || hasSelection
                    ? 'bg-purple-50 hover:bg-purple-100'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-gray-800">{world.label}</p>
                  <span className="text-gray-500 text-sm">
                    {isExpanded ? '▼' : '▶'}
                  </span>
                </div>
              </button>

              {/* 展开的分支卡片 */}
              {isExpanded && (
                <div className="pl-6 mt-3 space-y-3">
                  {world.children.map((branch) => {
                    const isSelected = branch.id === worldBranchId;
                    const echoText = WORLD_ECHO[branch.id] || '';

                    return (
                      <div
                        key={branch.id}
                        className={`p-5 rounded-lg transition-all ${
                          isSelected
                            ? 'bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-400'
                            : 'bg-purple-50 hover:bg-purple-100'
                        }`}
                      >
                        {/* 分支名称 */}
                        <h4 className="font-medium text-purple-900 mb-1">
                          {branch.label}
                        </h4>

                        {/* Echo句（副标题） */}
                        {echoText && (
                          <p className="text-sm text-purple-700 font-medium mb-2">
                            {echoText}
                          </p>
                        )}

                        {/* 完整描述 */}
                        {branch.description && (
                          <p className="text-sm text-gray-700 leading-relaxed mb-4">
                            {branch.description}
                          </p>
                        )}

                        {/* 选择按钮 */}
                        <button
                          onClick={() => handleBranchSelect(world.id, branch.id)}
                          className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                            isSelected
                              ? 'bg-purple-600 text-white cursor-default'
                              : 'bg-purple-500 text-white hover:bg-purple-600'
                          }`}
                        >
                          {isSelected ? '✓ 已选择' : '选择此世界观'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
