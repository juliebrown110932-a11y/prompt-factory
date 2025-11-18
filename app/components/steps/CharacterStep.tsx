'use client';

import { useState } from 'react';
import { useSelectionStore } from '@/app/store/selection';
import { CHARACTER_MOTHERS, UI_QUESTIONS } from '@/app/data/uiPrompts';
import { characterOptions } from '@/app/data/options';

export function CharacterStep() {
  const {
    characterMotherId,
    setCharacterMother,
    archetypeId,
    setArchetype,
  } = useSelectionStore();

  // 展开状态（用于显示描述）
  const [expandedId, setExpandedId] = useState<string | null>(archetypeId);

  const selectedMother = CHARACTER_MOTHERS.find(m => m.id === characterMotherId);

  const handleClickArchetype = (id: string) => {
    // 如果点击已展开的，收起它
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      // 展开新的（自动收起旧的）
      setExpandedId(id);
      // 同时更新选中状态
      setArchetype(id);
    }
  };

  return (
    <div>
      {/* 第一步：选择恋爱体验 */}
      {!characterMotherId && (
        <div>
          <h2 className="text-xl font-medium mb-6">{UI_QUESTIONS.characterA}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {CHARACTER_MOTHERS.map((mother) => (
              <button
                key={mother.id}
                onClick={() => setCharacterMother(mother.id)}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-400 transition-colors text-center"
              >
                <span className="text-lg font-medium">{mother.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 第二步：选择具体人设（手风琴式） */}
      {characterMotherId && selectedMother && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm mb-2">
                {selectedMother.label}
              </div>
              <h2 className="text-xl font-medium">{UI_QUESTIONS.characterB}</h2>
            </div>
            <button
              onClick={() => {
                setCharacterMother('');
                setArchetype('');
                setExpandedId(null);
              }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← 返回重选
            </button>
          </div>

          <div className="space-y-2">
            {selectedMother.archetypes.map((arch) => {
              const detail = characterOptions.find(opt => opt.id === arch.id);
              const isExpanded = expandedId === arch.id;
              const isSelected = archetypeId === arch.id;

              return (
                <div key={arch.id}>
                  {/* 人设按钮 */}
                  <button
                    onClick={() => handleClickArchetype(arch.id)}
                    className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <span className="font-medium">{arch.label}</span>
                  </button>

                  {/* 展开的描述框 */}
                  {isExpanded && detail && (
                    <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                        {detail.description}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
