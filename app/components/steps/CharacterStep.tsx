'use client';

import { useSelectionStore } from '@/app/store/selection';
import { CHARACTER_MOTHERS, UI_QUESTIONS } from '@/app/data/uiPrompts';

export function CharacterStep() {
  const {
    characterMotherId,
    archetypeId,
    archetypeToneId,
    setCharacterMother,
    setArchetype,
    setArchetypeTone,
  } = useSelectionStore();

  const selectedMother = CHARACTER_MOTHERS.find((m) => m.id === characterMotherId);
  const hasTones = selectedMother?.tones && selectedMother.tones.length > 0;

  return (
    <div className="space-y-8">
      {/* Step 1-A: 选择母类 */}
      {!characterMotherId && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800">
            {UI_QUESTIONS.characterA}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {CHARACTER_MOTHERS.map((mother) => (
              <button
                key={mother.id}
                onClick={() => setCharacterMother(mother.id)}
                className="p-4 rounded-xl border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all text-center"
              >
                <span className="font-semibold text-gray-800">{mother.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 1-B: 选择子archetype */}
      {characterMotherId && !archetypeId && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">
              {UI_QUESTIONS.characterB}
            </h3>
            <button
              onClick={() => setCharacterMother('')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← 返回重选
            </button>
          </div>
          <div className="mb-4 p-3 bg-purple-50 rounded-lg">
            <span className="text-sm text-purple-700 font-medium">
              {selectedMother?.label} · {selectedMother?.echo}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {selectedMother?.archetypes.map((archetype) => (
              <button
                key={archetype.id}
                onClick={() => setArchetype(archetype.id)}
                className="p-4 rounded-xl border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all text-center"
              >
                <span className="font-medium text-gray-800">{archetype.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 1-C: 可选tone微调 */}
      {characterMotherId && archetypeId && hasTones && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">
              {UI_QUESTIONS.characterC}
            </h3>
            <button
              onClick={() => setArchetype('')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← 返回重选
            </button>
          </div>
          <div className="mb-4 p-3 bg-purple-50 rounded-lg">
            <span className="text-sm text-purple-700 font-medium">
              {selectedMother?.archetypes.find((a) => a.id === archetypeId)?.label}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {selectedMother?.tones?.map((tone) => (
              <button
                key={tone.id}
                onClick={() => setArchetypeTone(tone.id)}
                className={`p-4 rounded-xl border-2 transition-all text-center ${
                  archetypeToneId === tone.id
                    ? 'border-purple-500 bg-purple-100'
                    : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                }`}
              >
                <span className="font-medium text-gray-800">{tone.label}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={() => setArchetypeTone(null)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              跳过此步（使用默认语气）
            </button>
          </div>
        </div>
      )}

      {/* Step 1-C: 无tone选项时的确认 */}
      {characterMotherId && archetypeId && !hasTones && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">已选择</h3>
            <button
              onClick={() => setArchetype('')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← 返回重选
            </button>
          </div>
          <div className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">{selectedMother?.label}</p>
              <p className="text-lg font-bold text-gray-800">
                {selectedMother?.archetypes.find((a) => a.id === archetypeId)?.label}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
