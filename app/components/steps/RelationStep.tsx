'use client';

import { useSelectionStore } from '@/app/store/selection';
import { RELATIONS } from '@/app/data/relations';
import { UI_QUESTIONS } from '@/app/data/uiPrompts';

export function RelationStep() {
  const { relationThemeId, relationArcId, setRelationTheme, setRelationArc } =
    useSelectionStore();

  const selectedTheme = RELATIONS.find((r) => r.id === relationThemeId);

  // 选择主题时自动选中第一个 arc
  const handleThemeSelect = (themeId: string) => {
    const theme = RELATIONS.find((r) => r.id === themeId);
    setRelationTheme(themeId);
    if (theme && theme.arcs.length > 0) {
      setRelationArc(theme.arcs[0].id);
    }
  };

  return (
    <div className="space-y-8">
      {/* 第一层: 选择关系主题 */}
      {!relationThemeId && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800">
            {UI_QUESTIONS.relation}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {RELATIONS.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeSelect(theme.id)}
                className="p-4 rounded-xl border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all"
              >
                <div className="text-center">
                  <p className="font-semibold text-gray-800 mb-1">{theme.label}</p>
                  {theme.description && (
                    <p className="text-xs text-gray-500 whitespace-normal leading-relaxed">
                      {theme.description}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 第二层: 选择关系曲线 */}
      {relationThemeId && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">
              {UI_QUESTIONS.relationArc}
            </h3>
            <button
              onClick={() => setRelationTheme('')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← 返回重选
            </button>
          </div>
          <div className="mb-4 p-3 bg-purple-50 rounded-lg">
            <span className="text-sm text-purple-700 font-medium">
              {selectedTheme?.label}
            </span>
            {selectedTheme?.description && (
              <p className="text-xs text-purple-600 mt-1">
                {selectedTheme.description}
              </p>
            )}
          </div>
          <div className="space-y-3">
            {selectedTheme?.arcs.map((arc) => (
              <button
                key={arc.id}
                onClick={() => setRelationArc(arc.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  relationArcId === arc.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-400 hover:bg-purple-50'
                }`}
              >
                <p className="font-semibold text-gray-800 mb-2">{arc.label}</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="text-purple-600 font-medium">1.</span> {arc.start}
                  </p>
                  <p>
                    <span className="text-purple-600 font-medium">2.</span> {arc.turn}
                  </p>
                  <p>
                    <span className="text-purple-600 font-medium">3.</span> {arc.end}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
