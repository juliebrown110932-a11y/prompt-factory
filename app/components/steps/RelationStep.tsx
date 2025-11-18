'use client';

import { useState } from 'react';
import { useSelectionStore } from '@/app/store/selection';
import { RELATIONS } from '@/app/data/relations';
import { UI_QUESTIONS } from '@/app/data/uiPrompts';

export function RelationStep() {
  const {
    relationThemeId,
    setRelationTheme,
    setRelationArc,
  } = useSelectionStore();

  // 展开状态
  const [expandedId, setExpandedId] = useState<string | null>(relationThemeId);

  const handleClickRelation = (id: string) => {
    const theme = RELATIONS.find(r => r.id === id);

    // 如果点击已展开的，收起它
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      // 展开新的（自动收起旧的）
      setExpandedId(id);
      // 同时更新选中状态
      setRelationTheme(id);
      // 自动选择第一个 arc
      if (theme && theme.arcs.length > 0) {
        setRelationArc(theme.arcs[0].id);
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-medium mb-6">{UI_QUESTIONS.relation}</h2>

      <div className="space-y-2">
        {RELATIONS.map((relation) => {
          const isExpanded = expandedId === relation.id;
          const isSelected = relationThemeId === relation.id;
          const firstArc = relation.arcs[0]; // 显示第一个 arc 的详情

          return (
            <div key={relation.id}>
              {/* 关系按钮 */}
              <button
                onClick={() => handleClickRelation(relation.id)}
                className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                  isSelected
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <span className="font-medium">{relation.label}</span>
              </button>

              {/* 展开的描述框 */}
              {isExpanded && firstArc && (
                <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-1">起点</h4>
                      <p className="text-sm text-gray-600">{firstArc.start}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-1">转折</h4>
                      <p className="text-sm text-gray-600">{firstArc.turn}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-1">终点</h4>
                      <p className="text-sm text-gray-600">{firstArc.end}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
