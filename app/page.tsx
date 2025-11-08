'use client';

import { useState } from 'react';
import OptionSelector from '@/app/components/OptionSelector';
import PromptResult from '@/app/components/PromptResult';
import { categories } from '@/app/data/options';
import { WORLDS } from '@/app/data/worlds';
import { RELATIONS, type RelationTheme } from '@/app/data/relations';
import { WorldMother, WorldBranch } from '@/app/data/schema';
import { generatePrompt } from '@/app/utils/promptGenerator';
import { computeCompat, COMPAT_THRESHOLD } from '@/app/logic/compat';

export default function Home() {
  // 状态管理：世界观两级选择
  const [selectedMotherId, setSelectedMotherId] = useState<WorldMother['id'] | null>(null);
  const [selectedBranchId, setSelectedBranchId] = useState<WorldBranch['id'] | null>(null);

  // 状态管理：AI人设选择
  const [selectedCharacter, setSelectedCharacter] = useState<string>('');

  // 状态管理：关系动态两级选择
  const [selectedRelationThemeId, setSelectedRelationThemeId] = useState<RelationTheme['id'] | null>(null);
  const [selectedRelationArcId, setSelectedRelationArcId] = useState<string | null>(null);

  // 兼容度补丁展开状态
  const [showPatches, setShowPatches] = useState(false);

  // 生成的提示词
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');

  // 检查是否所有选项都已选择
  const isAllSelected = selectedBranchId && selectedCharacter && selectedRelationArcId;

  // 切换母观时重置子分支
  const onSelectMother = (id: WorldMother['id']) => {
    setSelectedMotherId(id);
    setSelectedBranchId(null);
  };

  // 切换关系主题时重置曲线
  const onSelectRelationTheme = (id: RelationTheme['id']) => {
    setSelectedRelationThemeId(id);
    setSelectedRelationArcId(null);
  };

  // 生成提示词
  const handleGenerate = () => {
    if (!isAllSelected) return;

    const prompt = generatePrompt(
      selectedBranchId,
      selectedCharacter,
      selectedRelationArcId
    );

    setGeneratedPrompt(prompt);

    // 平滑滚动到结果区域
    setTimeout(() => {
      const resultElement = document.getElementById('prompt-result');
      if (resultElement) {
        resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* 头部区域 - 移动端优化 */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent leading-tight">
            AI伴侣调教工坊
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-600">
            通过简单点选，一键生成高质量AI角色扮演提示词
          </p>
        </div>

        {/* 三个选择器 - 移动端垂直排列 */}
        <div className="space-y-8 sm:space-y-10 lg:space-y-12">
          {/* 世界观选择器 - 两级点选 */}
          <div className="w-full">
            {/* 类别标题 */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 px-2">
              世界观
            </h2>

            {/* 第一级：母观按钮 */}
            <div className="mb-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
                {WORLDS.map((mother) => {
                  const isSelected = selectedMotherId === mother.id;
                  return (
                    <button
                      key={mother.id}
                      onClick={() => onSelectMother(mother.id)}
                      aria-pressed={isSelected}
                      className={`
                        min-h-[56px] px-4 py-3 rounded-xl font-medium text-sm sm:text-base
                        transition-all duration-200
                        active:scale-95
                        ${
                          isSelected
                            ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg scale-105'
                            : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm hover:shadow-md border-2 border-gray-100'
                        }
                      `}
                    >
                      {mother.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 第二级：子分支按钮（仅当已选母观） */}
            {selectedMotherId && (
              <div className="pl-0 sm:pl-4">
                <p className="text-sm text-gray-600 mb-2 px-2">选择具体分支：</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                  {WORLDS.find(m => m.id === selectedMotherId)!.children.map((branch) => {
                    const isSelected = selectedBranchId === branch.id;
                    return (
                      <button
                        key={branch.id}
                        onClick={() => setSelectedBranchId(branch.id)}
                        aria-pressed={isSelected}
                        className={`
                          min-h-[48px] px-4 py-2 rounded-lg font-medium text-sm
                          transition-all duration-200
                          active:scale-95
                          ${
                            isSelected
                              ? 'bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white shadow-md scale-105'
                              : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm hover:shadow-md border border-gray-200'
                          }
                        `}
                      >
                        {branch.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 世界观预览面板 */}
            {selectedMotherId && (
              <div className="mt-6 p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100">
                {(() => {
                  const mother = WORLDS.find(m => m.id === selectedMotherId)!;
                  const branch = selectedBranchId ? mother.children.find(b => b.id === selectedBranchId) : null;

                  return (
                    <div className="space-y-4">
                      {/* 母观信息 */}
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                          {mother.label}
                        </h3>
                        {mother.tagline && (
                          <p className="text-sm sm:text-base text-purple-600 italic mb-3">
                            {mother.tagline}
                          </p>
                        )}
                        {mother.summary && (
                          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                            {mother.summary}
                          </p>
                        )}
                      </div>

                      {/* 分支信息（仅当已选分支） */}
                      {branch && branch.branchBrief && (
                        <div className="pt-4 border-t border-gray-200">
                          <h4 className="text-sm font-semibold text-gray-600 mb-2">
                            {branch.label}
                          </h4>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {branch.branchBrief}
                          </p>
                        </div>
                      )}

                      {/* 未选分支提示 */}
                      {!selectedBranchId && (
                        <div className="pt-4 border-t border-gray-200">
                          <p className="text-sm text-gray-500 italic">
                            请选择一个分支以查看详细介绍
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 空状态提示 */}
            {!selectedMotherId && (
              <div className="mt-6 p-6 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 text-center">
                <p className="text-sm text-gray-500">
                  请选择世界观与分支，查看详细设定
                </p>
              </div>
            )}
          </div>

          {/* AI 人设选择器 */}
          <OptionSelector
            title={categories[1].title}
            options={categories[1].options}
            selectedId={selectedCharacter}
            onSelect={setSelectedCharacter}
          />

          {/* 关系动态选择器 - 两级点选 */}
          <div className="w-full">
            {/* 类别标题 */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 px-2">
              关系动态
            </h2>

            {/* 第一级：主题按钮 */}
            <div className="mb-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
                {RELATIONS.map((theme) => {
                  const isSelected = selectedRelationThemeId === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => onSelectRelationTheme(theme.id)}
                      aria-pressed={isSelected}
                      className={`
                        min-h-[56px] px-4 py-3 rounded-xl font-medium text-sm sm:text-base
                        transition-all duration-200
                        active:scale-95
                        ${
                          isSelected
                            ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg scale-105'
                            : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm hover:shadow-md border-2 border-gray-100'
                        }
                      `}
                    >
                      {theme.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 第二级：曲线按钮（仅当已选主题） */}
            {selectedRelationThemeId && (
              <div className="pl-0 sm:pl-4">
                <p className="text-sm text-gray-600 mb-2 px-2">选择情感曲线：</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                  {RELATIONS.find(t => t.id === selectedRelationThemeId)!.arcs.map((arc) => {
                    const isSelected = selectedRelationArcId === arc.id;
                    return (
                      <button
                        key={arc.id}
                        onClick={() => setSelectedRelationArcId(arc.id)}
                        aria-pressed={isSelected}
                        className={`
                          min-h-[48px] px-4 py-2 rounded-lg font-medium text-sm
                          transition-all duration-200
                          active:scale-95
                          ${
                            isSelected
                              ? 'bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white shadow-md scale-105'
                              : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm hover:shadow-md border border-gray-200'
                          }
                        `}
                      >
                        {arc.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 关系动态预览面板 */}
            {selectedRelationThemeId && (
              <div className="mt-6 p-4 sm:p-6 bg-white rounded-xl shadow-md border border-gray-100">
                {(() => {
                  const theme = RELATIONS.find(t => t.id === selectedRelationThemeId)!;
                  const arc = selectedRelationArcId ? theme.arcs.find(a => a.id === selectedRelationArcId) : null;

                  return (
                    <div className="space-y-4">
                      {/* 主题信息 */}
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                          {theme.label}
                        </h3>
                        {theme.description && (
                          <p className="text-sm sm:text-base text-purple-600 italic">
                            {theme.description}
                          </p>
                        )}
                      </div>

                      {/* 曲线信息（仅当已选曲线） */}
                      {arc && (
                        <div className="pt-4 border-t border-gray-200">
                          <h4 className="text-sm font-semibold text-gray-600 mb-3">
                            {arc.label}
                          </h4>
                          <ol className="space-y-3">
                            <li className="flex items-start">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-100 text-pink-600 text-xs font-bold flex items-center justify-center mr-3 mt-0.5">
                                1
                              </span>
                              <span className="text-sm text-gray-700 leading-relaxed">
                                {arc.start}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-xs font-bold flex items-center justify-center mr-3 mt-0.5">
                                2
                              </span>
                              <span className="text-sm text-gray-700 leading-relaxed">
                                {arc.turn}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center mr-3 mt-0.5">
                                3
                              </span>
                              <span className="text-sm text-gray-700 leading-relaxed">
                                {arc.end}
                              </span>
                            </li>
                          </ol>
                        </div>
                      )}

                      {/* 未选曲线提示 */}
                      {!selectedRelationArcId && (
                        <div className="pt-4 border-t border-gray-200">
                          <p className="text-sm text-gray-500 italic">
                            请选择一条情感曲线以查看详细发展路径
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 空状态提示 */}
            {!selectedRelationThemeId && (
              <div className="mt-6 p-6 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 text-center">
                <p className="text-sm text-gray-500">
                  请选择关系主题与情感曲线，查看发展路径
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 兼容度评分卡片 */}
        {isAllSelected && (() => {
          const compatResult = computeCompat({
            worldBranchId: selectedBranchId,
            characterArchetypeId: selectedCharacter,
            relationThemeId: selectedRelationArcId,
          });

          return (
            <div className="mt-8 p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-md border border-purple-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                  兼容度评估
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">分数:</span>
                  <span className={`text-2xl font-bold ${
                    compatResult.score >= COMPAT_THRESHOLD
                      ? 'text-green-600'
                      : compatResult.score >= 50
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}>
                    {compatResult.score}
                  </span>
                  <span className="text-sm text-gray-500">/ 100</span>
                </div>
              </div>

              {/* 分数条 */}
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
                <div
                  className={`h-full transition-all duration-500 ${
                    compatResult.score >= COMPAT_THRESHOLD
                      ? 'bg-gradient-to-r from-green-400 to-green-600'
                      : compatResult.score >= 50
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                      : 'bg-gradient-to-r from-red-400 to-red-600'
                  }`}
                  style={{ width: `${compatResult.score}%` }}
                />
              </div>

              {/* 补丁列表 */}
              {compatResult.patches.length > 0 && (
                <div className="mt-4">
                  <button
                    onClick={() => setShowPatches(!showPatches)}
                    className="flex items-center gap-2 text-sm font-semibold text-purple-700 hover:text-purple-900 transition-colors"
                  >
                    <span>设定补丁 ({compatResult.patches.length})</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${showPatches ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showPatches && (
                    <ul className="mt-3 space-y-2">
                      {compatResult.patches.map((patch, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-700 bg-white p-3 rounded-lg border border-purple-100"
                        >
                          {patch}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {/* 高分提示 */}
              {compatResult.patches.length === 0 && (
                <p className="text-sm text-green-700 italic">
                  ✨ 完美组合！无需额外设定补丁
                </p>
              )}
            </div>
          );
        })()}

        {/* 生成按钮 - 固定在底部（移动端友好） */}
        <div className="sticky bottom-4 mt-8 sm:mt-12 flex justify-center">
          <button
            onClick={handleGenerate}
            disabled={!isAllSelected}
            className={`
              min-h-[56px] px-8 py-4 rounded-full font-semibold text-base sm:text-lg
              shadow-lg transition-all duration-200
              ${
                isAllSelected
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
          >
            {isAllSelected ? '生成我的专属提示词 ✨' : '请先完成所有选择'}
          </button>
        </div>

        {/* 提示信息 - 移动端友好 */}
        {!isAllSelected && (
          <div className="mt-6 text-center">
            <p className="text-xs sm:text-sm text-gray-500">
              还需选择：
              {!selectedBranchId && ' 世界观'}
              {!selectedCharacter && ' AI人设'}
              {!selectedRelationArcId && ' 关系动态'}
            </p>
          </div>
        )}

        {/* 生成结果展示区域 */}
        {generatedPrompt && (
          <div id="prompt-result" className="scroll-mt-4">
            <PromptResult prompt={generatedPrompt} />
          </div>
        )}
      </div>
    </main>
  );
}
