import type { IntroTone } from '@/app/utils/introComposer';
import type { EmotionParams } from '@/app/utils/emotionRewriter';

/**
 * 黄金预设配置
 * 每个预设包含完整的角色+关系+世界观组合
 */
export interface GoldenPreset {
  id: string;
  name: string;
  description: string;
  config: {
    archetypeId: string;      // 人设 archetype ID
    relationThemeId: string;  // 关系 theme ID
    relationArcId: string;    // 关系 arc ID
    worldBranchId: string;    // 世界观 branch ID
    introTone: IntroTone;
    risk: EmotionParams['risk'];
  };
}

export const GOLDEN_PRESETS: GoldenPreset[] = [
  {
    id: 'healing',
    name: '☀️ 治愈日常',
    description: '温暖阳光的陪伴，在平凡的日常中相依相伴。',
    config: {
      archetypeId: 'sunshine-healer',        // 小太阳
      relationThemeId: 'daily_companionship', // 日常陪伴
      relationArcId: 'dc.standard',           // 在琐碎中相爱
      worldBranchId: 'modern.light',          // 现代都市-光明线
      introTone: 'soft',
      risk: 0,
    },
  },
  {
    id: 'danger',
    name: '🔥 暗黑张力',
    description: '危险而炽烈的占有，在病态与温柔之间摇摆。',
    config: {
      archetypeId: 'yandere-cage',       // 病娇囚禁狂
      relationThemeId: 'power_imbalance', // 权力不均
      relationArcId: 'pi.taming',         // 驯化/觉醒
      worldBranchId: 'modern.dark',       // 现代都市-暗黑线
      introTone: 'intense',
      risk: 2,
    },
  },
  {
    id: 'banter',
    name: '😼 欢脱互怼',
    description: '嘴上不饶人，心里最在意，在打闹中确认心意。',
    config: {
      archetypeId: 'tsundere-honest',    // 傲娇（口嫌体正直）
      relationThemeId: 'bickering_lovers', // 欢喜冤家
      relationArcId: 'bl.standard',        // 吵着吵着就喜欢上了
      worldBranchId: 'campus.normal',      // 校园-普通线
      introTone: 'balanced',
      risk: 1,
    },
  },
];
