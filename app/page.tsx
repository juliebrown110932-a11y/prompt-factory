'use client';

import { useState } from 'react';
import OptionSelector from '@/app/components/OptionSelector';
import { categories } from '@/app/data/options';

export default function Home() {
  // 状态管理：三个类别的选择
  const [selectedWorldview, setSelectedWorldview] = useState<string>('');
  const [selectedCharacter, setSelectedCharacter] = useState<string>('');
  const [selectedRelationship, setSelectedRelationship] = useState<string>('');

  // 检查是否所有选项都已选择
  const isAllSelected = selectedWorldview && selectedCharacter && selectedRelationship;

  // 生成提示词（目前只是占位）
  const handleGenerate = () => {
    if (!isAllSelected) return;
    // TODO: 实现生成逻辑
    alert('生成功能即将推出！');
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
          {/* 世界观选择器 */}
          <OptionSelector
            title={categories[0].title}
            options={categories[0].options}
            selectedId={selectedWorldview}
            onSelect={setSelectedWorldview}
          />

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
              {!selectedWorldview && ' 世界观'}
              {!selectedCharacter && ' AI人设'}
              {!selectedRelationship && ' 关系动态'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
