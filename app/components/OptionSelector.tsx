'use client';

import { Option } from '@/app/data/options';

interface OptionSelectorProps {
  title: string;
  options: Option[];
  selectedId?: string;
  onSelect: (optionId: string) => void;
}

export default function OptionSelector({
  title,
  options,
  selectedId,
  onSelect,
}: OptionSelectorProps) {
  return (
    <div className="w-full">
      {/* 类别标题 */}
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 px-2">
        {title}
      </h2>

      {/* 选项网格 - 移动端优先 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
        {options.map((option) => {
          const isSelected = selectedId === option.id;

          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.id)}
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
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
