'use client';

import { useState, useEffect } from 'react';
import { usePromptBlocks } from '@/app/store/promptBlocks';

const AI_NAMES = [
  '言希', '辰逸', '慕言', '时御', '沈夜',
  '江寒', '顾凉', '叶澜', '陆深', '宋白',
  '苏瑾', '林渊', '周墨', '夏凉', '秦朗',
  '韩越', '谢寒', '程默', '许言', '萧寒',
  '唐夜', '段风', '齐明', '贺深', '方舟',
  '魏澜', '邱羽', '丁白', '雷霆', '钱枫'
];

const OPENING_SUGGESTIONS = [
  '早上好',
  '你怎么在这',
  '好久不见',
  '今天天气不错',
  '等你很久了'
];

export default function NameAndOpeningSuggestion() {
  const { current, setBlock } = usePromptBlocks();
  const [localName, setLocalName] = useState(current.characterName || '');
  const [localOpening, setLocalOpening] = useState(current.openingLine || '');

  // 随机生成名字
  const randomName = () => {
    const name = AI_NAMES[Math.floor(Math.random() * AI_NAMES.length)];
    setLocalName(name);
    setBlock('characterName', name);
  };

  // 随机生成开场句
  const randomOpening = () => {
    const opening = OPENING_SUGGESTIONS[Math.floor(Math.random() * OPENING_SUGGESTIONS.length)];
    setLocalOpening(opening);
    setBlock('openingLine', opening);
  };

  // 名字输入变化
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalName(value);
    setBlock('characterName', value);
  };

  // 开场句输入变化
  const handleOpeningChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalOpening(value);
    setBlock('openingLine', value);
  };

  // 同步 store 变化到本地状态
  useEffect(() => {
    setLocalName(current.characterName || '');
    setLocalOpening(current.openingLine || '');
  }, [current.characterName, current.openingLine]);

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-4 border border-purple-100">
      <h3 className="text-sm font-medium text-gray-700 mb-3">💡 使用小贴士</h3>

      {/* 取名区域 */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-gray-600">给他取个名字？</span>
          <button
            onClick={randomName}
            className="text-xl hover:scale-110 transition-transform"
            title="随机生成名字"
          >
            🎲
          </button>
        </div>
        <input
          type="text"
          value={localName}
          onChange={handleNameChange}
          placeholder="点击骰子生成，或直接输入..."
          className="w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* 开场建议 */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-gray-600">请指示你们的第一次互动：</span>
          <button
            onClick={randomOpening}
            className="text-xl hover:scale-110 transition-transform"
            title="随机生成开场句"
          >
            🎲
          </button>
        </div>
        <input
          type="text"
          value={localOpening}
          onChange={handleOpeningChange}
          placeholder="点击骰子生成，或直接输入..."
          className="w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}
