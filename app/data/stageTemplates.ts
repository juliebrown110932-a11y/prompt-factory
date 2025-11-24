/**
 * 关系发展阶段模板
 */

// ==================== 1. 映射表 ====================

const RELATION_TO_TEMPLATE: Record<string, 'A' | 'B' | 'C'> = {
  // 模板A：陌生→亲近
  'daily_companionship': 'A',
  'care_mutual': 'A',
  'childhood_friends': 'A',
  'ambiguous_testing': 'A',
  'bickering_lovers': 'A',
  'care_grooming': 'A',

  // 模板B：对立→和解
  'enemies_to_lovers': 'B',
  'power_imbalance': 'B',
  'cat_mouse': 'B',
  'forced_bond': 'B',

  // 模板C：特殊起点
  'forbidden': 'C',
  'contract_marriage': 'C',
  'pretend_to_real': 'C',
  'redemption': 'C',
  'second_chance': 'C',
  'amnesia': 'C',
};

// ==================== 2. 三个模板 ====================

const STAGE_TEMPLATE_A = `\`\`\`stages
Current: Stage 1

Stage 1: Casual Contact (Turn 1-8)
Allow: daily conversation, brief eye contact, small favors, curiosity about each other
Tension: create "almost said it" / "almost touched" moments
Forbid: confession, intentional physical contact, pet names
Advance when: one party makes excuses to get closer

Stage 2: Ambiguous Tension (Turn 9-20)
Allow: finding excuses to meet, light touch (hands brush when passing items), half-spoken hints
Tension: create "interrupted by others" / "words left unsaid" regret
Forbid: explicit confession, defining the relationship
Advance when: emotional outburst or major event

Stage 3: Breakthrough (Turn 20+)
Allow: confession, relationship confirmation, intimate contact
Maintain: create new conflicts after confirmation (misunderstanding / external obstacles)
Forbid: smooth, conflict-free sweetness
\`\`\``;

const STAGE_TEMPLATE_B = `\`\`\`stages
Current: Stage 1

Stage 1: Hostile Standoff (Turn 1-10)
Allow: verbal sparring, mutual provocation, reluctant cooperation, secretly observing each other
Tension: create "forced to rely on enemy" humiliation
Forbid: showing weakness, admitting care, voluntary concern
Advance when: one saves the other / sees vulnerability

Stage 2: Reluctant Alliance (Turn 11-25)
Allow: harsh words but caring actions, admitting "not bad", instinctive protection in crisis
Tension: create "clearly care but cannot admit" awkwardness
Forbid: direct confession, completely dropping hostility
Advance when: life-or-death moment or truth revealed

Stage 3: Surrender (Turn 25+)
Allow: admitting feelings, abandoning original stance, betraying former side for each other
Maintain: external pressure (faction conflict / third party interference)
Forbid: easy reconciliation, forgetting past hostility
\`\`\``;

const STAGE_TEMPLATE_C = `\`\`\`stages
Current: Stage 1

Stage 1: Fractured Foundation (Turn 1-10)
Status: relationship already exists, but with cracks / facade / distance
Allow: maintaining surface normalcy, suppressing true feelings, careful probing
Tension: create "almost exposed" / "almost broke down" moments
Forbid: immediate honesty, quick emotional repair
Advance when: facade cracks / suppressed emotions explode

Stage 2: Cracks Appear (Turn 11-25)
Allow: accidentally revealing true feelings, facade harder to maintain, questioning "is this real"
Tension: create "want to confirm but afraid to" anxiety
Forbid: direct confrontation, easy forgiveness
Advance when: truth or lies exposed

Stage 3: Truth Revealed (Turn 25+)
Allow: facing the real relationship, choosing again: continue or end
Maintain: past fractures remain as hidden dangers even after resolution
Forbid: perfect reconciliation, pretending nothing happened
\`\`\``;

const STAGE_TEMPLATES = {
  A: STAGE_TEMPLATE_A,
  B: STAGE_TEMPLATE_B,
  C: STAGE_TEMPLATE_C,
};

// ==================== 3. 导出函数 ====================

/**
 * 根据关系动态ID获取对应的Stage模板
 */
export function getStageTemplate(relationId: string | null): string {
  if (!relationId) {
    return STAGE_TEMPLATE_A;
  }

  const templateKey = RELATION_TO_TEMPLATE[relationId] || 'A';
  return STAGE_TEMPLATES[templateKey];
}
