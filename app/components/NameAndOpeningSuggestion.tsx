'use client';

import { useState } from 'react';

const AI_NAMES = [
  '言希', '辰逸', '慕言', '时御', '沈夜',
  '江寒', '顾凉', '叶澜', '陆深', '宋白',
  // 预留空位，待用户补充到30个
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
  const [currentName, setCurrentName] = useState('');

  const randomName = () => {
    const name = AI_NAMES[Math.floor(Math.random() * AI_NAMES.length)];
    setCurrentName(name);
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-4 border border-purple-100">
      <h3 className="text-sm font-medium text-gray-700 mb-3">💡 使用小贴士</h3>

      {/* 取名区域 */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-gray-600">🎲 给他取个名字？</span>
          <button
            onClick={randomName}
            className="px-3 py-1 text-xs bg-white border border-purple-300 rounded-md hover:bg-purple-50 transition-colors"
          >
            随机生成
          </button>
        </div>
        {currentName && (
          <div className="text-lg font-medium text-purple-700 ml-6">
            {currentName}
          </div>
        )}
      </div>

      {/* 开场建议 */}
      <div>
        <div className="text-sm text-gray-600 mb-2">🎬 可以这样开场：</div>
        <div className="flex flex-wrap gap-2 ml-6">
          {OPENING_SUGGESTIONS.map((suggestion, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-white border border-gray-200 rounded-md text-gray-700"
            >
              &ldquo;{suggestion}&rdquo;
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
