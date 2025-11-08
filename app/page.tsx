'use client';

import { useState } from 'react';
import OptionSelector from '@/app/components/OptionSelector';
import PromptResult from '@/app/components/PromptResult';
import { categories } from '@/app/data/options';
import { WORLDS, WorldMother, WorldBranch } from '@/app/data/schema';
import { generatePrompt } from '@/app/utils/promptGenerator';

export default function Home() {
  // 状态管理：世界观两级选择
  const [selectedMotherId, setSelectedMotherId] = useState<WorldMother['id'] | null>(null);
  const [selectedBranchId, setSelectedBranchId] = useState<WorldBranch['id'] | null>(null);

  // 状态管理：AI人设和关系动态的选择
  const [selectedCharacter, setSelectedCharacter] = useState<string>('');
  const [selectedRelationship, setSelectedRelationship] = useState<string>('');

  // 生成的提示词
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');

  // 检查是否所有选项都已选择
  const isAllSelected = selectedBranchId && selectedCharacter && selectedRelationship;

  // 切换母观时重置子分支
  const onSelectMother = (id: WorldMother['id']) => {
    setSelectedMotherId(id);
    setSelectedBranchId(null);
  };

  // 生成提示词
  const handleGenerate = () => {
    if (!isAllSelected) return;

    const prompt = generatePrompt(
      selectedBranchId,
      selectedCharacter,
      selectedRelationship
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
          </div>

          {/* AI 人设选择器 */}
          <OptionSelector
            title={categories[1].title}
            options={categories[1].options}
            selectedId={selectedCharacter}
            onSelect={setSelectedCharacter}
          />

          {/* 关系动态选择器 */}
          <OptionSelector
            title={categories[2].title}
            options={categories[2].options}
            selectedId={selectedRelationship}
            onSelect={setSelectedRelationship}
          />
        </div>

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
              {!selectedRelationship && ' 关系动态'}
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
