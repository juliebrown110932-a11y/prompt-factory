'use client';

import { useState } from 'react';
import { useSelectionStore } from '@/app/store/selection';
import { WizardLayout } from '@/app/components/WizardLayout';
import { CharacterStep } from '@/app/components/steps/CharacterStep';
import { RelationStep } from '@/app/components/steps/RelationStep';
import { WorldStep } from '@/app/components/steps/WorldStep';
import { SelectionPreview } from '@/app/components/SelectionPreview';
import PromptResult from '@/app/components/PromptResult';
import { generatePrompt } from '@/app/utils/promptGenerator';
import type { IntroTone } from '@/app/utils/introComposer';
import type { EmotionParams } from '@/app/utils/emotionRewriter';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [introTone, setIntroTone] = useState<IntroTone>('balanced');
  const [risk, setRisk] = useState<EmotionParams['risk']>(1);

  const {
    characterMotherId,
    archetypeId,
    archetypeToneId,
    relationThemeId,
    relationArcId,
    worldMotherId,
    worldBranchId,
  } = useSelectionStore();

  // 检查每一步是否完成
  const isStep1Complete = !!archetypeId; // 人设必须选到archetype
  const isStep2Complete = !!relationArcId; // 关系必须选到arc
  const isStep3Complete = !!worldBranchId; // 世界必须选到branch

  // 当前步骤是否可以继续
  const canProceed = (() => {
    switch (currentStep) {
      case 1:
        return isStep1Complete;
      case 2:
        return isStep2Complete;
      case 3:
        return isStep3Complete;
      default:
        return false;
    }
  })();

  // 导航到上一步
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  // 导航到下一步
  const handleNext = () => {
    if (currentStep < 3 && canProceed) {
      setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3);
    }
  };

  // 生成提示词
  const handleGenerate = () => {
    if (!worldBranchId || !archetypeId || !relationArcId) return;

    const prompt = generatePrompt(worldBranchId, archetypeId, relationArcId, introTone, risk);
    setGeneratedPrompt(prompt);

    // 平滑滚动到结果区域
    setTimeout(() => {
      const resultElement = document.getElementById('prompt-result');
      if (resultElement) {
        resultElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // 渲染当前步骤的内容
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <CharacterStep />;
      case 2:
        return <RelationStep />;
      case 3:
        return <WorldStep />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* 头部标题 */}
      <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent leading-tight">
            AI伴侣调教工坊
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-600">
            通过三步向导，一键生成高质量AI角色扮演提示词
          </p>
        </div>
      </div>

      {/* Wizard 主体 */}
      <WizardLayout
        currentStep={currentStep}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onGenerate={handleGenerate}
        canProceed={canProceed}
        preview={
          <SelectionPreview
            introTone={introTone}
            setIntroTone={setIntroTone}
            risk={risk}
            setRisk={setRisk}
          />
        }
      >
        {renderStepContent()}
      </WizardLayout>

      {/* 生成结果展示区域 */}
      {generatedPrompt && (
        <div id="prompt-result" className="scroll-mt-4 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8">
          <div className="max-w-7xl mx-auto px-4">
            <PromptResult prompt={generatedPrompt} />
          </div>
        </div>
      )}
    </>
  );
}
