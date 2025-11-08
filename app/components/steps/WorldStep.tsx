'use client';

import { useSelectionStore } from '@/app/store/selection';
import { WORLDS } from '@/app/data/worlds';
import { UI_QUESTIONS } from '@/app/data/uiPrompts';

export function WorldStep() {
  const { worldMotherId, worldBranchId, setWorldMother, setWorldBranch } =
    useSelectionStore();

  const selectedWorld = WORLDS.find((w) => w.id === worldMotherId);

  return (
    <div className="space-y-8">
      {/* 第一层: 选择世界母观 */}
      {!worldMotherId && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800">
            {UI_QUESTIONS.world}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WORLDS.map((world) => (
              <button
                key={world.id}
                onClick={() => setWorldMother(world.id)}
                className="p-4 rounded-xl border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all text-left"
              >
                <p className="font-semibold text-gray-800 mb-2">{world.label}</p>
                {world.tagline && (
                  <p className="text-sm text-gray-600 italic">{world.tagline}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 第二层: 选择世界分支 */}
      {worldMotherId && !worldBranchId && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">
              {UI_QUESTIONS.worldBranch}
            </h3>
            <button
              onClick={() => setWorldMother('')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← 返回重选
            </button>
          </div>
          <div className="mb-4 p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-700 font-medium mb-1">
              {selectedWorld?.label}
            </p>
            {selectedWorld?.tagline && (
              <p className="text-xs text-purple-600 italic">
                {selectedWorld.tagline}
              </p>
            )}
            {selectedWorld?.summary && (
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                {selectedWorld.summary}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-3">
            {selectedWorld?.children.map((branch) => (
              <button
                key={branch.id}
                onClick={() => setWorldBranch(branch.id)}
                className="p-4 rounded-xl border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all text-left"
              >
                <p className="font-semibold text-gray-800 mb-1">{branch.label}</p>
                {branch.branchBrief && (
                  <p className="text-sm text-gray-600">{branch.branchBrief}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 已选择状态 */}
      {worldMotherId && worldBranchId && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">已选择</h3>
            <button
              onClick={() => setWorldBranch('')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← 返回重选
            </button>
          </div>
          <div className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">{selectedWorld?.label}</p>
              <p className="text-lg font-bold text-gray-800">
                {selectedWorld?.children.find((b) => b.id === worldBranchId)?.label}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
