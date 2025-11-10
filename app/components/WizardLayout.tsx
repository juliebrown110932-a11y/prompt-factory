'use client';

import { ReactNode } from 'react';

type WizardLayoutProps = {
  currentStep: 1 | 2 | 3;
  onPrevious?: () => void;
  onNext?: () => void;
  onGenerate?: () => void;
  canProceed: boolean; // 当前步骤是否完成
  children: ReactNode; // 左侧步骤内容
  preview: ReactNode; // 右侧预览
};

export function WizardLayout({
  currentStep,
  onPrevious,
  onNext,
  onGenerate,
  canProceed,
  children,
  preview,
}: WizardLayoutProps) {
  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const getStepLabel = (step: number) => {
    switch (step) {
      case 1:
        return '认识他';
      case 2:
        return '你们的关系';
      case 3:
        return '故事的舞台';
      default:
        return '';
    }
  };

  const getNextButtonText = () => {
    switch (currentStep) {
      case 1:
        return '继续靠近他';
      case 2:
        return '进入故事';
      case 3:
        return '让故事开始';
      default:
        return '下一步';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 顶部进度条 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-purple-700">
              {getStepLabel(currentStep)}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 主内容区：桌面端左右布局，移动端上下布局 */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 左侧：步骤内容 */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 lg:p-8">
            {children}
          </div>

          {/* 右侧：预览面板 */}
          <div className="lg:w-96 bg-white rounded-2xl shadow-lg p-6">
            {preview}
          </div>
        </div>

        {/* 底部导航按钮 */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            onClick={onPrevious}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            上一步
          </button>

          {currentStep < 3 ? (
            <button
              onClick={onNext}
              disabled={!canProceed}
              className={`px-8 py-3 rounded-lg font-medium transition-all ${
                canProceed
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-md'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {getNextButtonText()}
            </button>
          ) : (
            <button
              onClick={onGenerate}
              disabled={!canProceed}
              className={`px-8 py-3 rounded-lg font-medium transition-all ${
                canProceed
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {getNextButtonText()}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
