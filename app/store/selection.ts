import { create } from 'zustand';

export type SelectionState = {
  // Character (三层)
  characterMotherId: string | null;
  archetypeId: string | null;
  archetypeToneId: string | null; // 可选微调

  // Relation (两层)
  relationThemeId: string | null;
  relationArcId: string | null;

  // World (两层)
  worldMotherId: string | null;
  worldBranchId: string | null;

  // Actions
  setCharacterMother: (id: string) => void;
  setArchetype: (id: string) => void;
  setArchetypeTone: (id: string | null) => void;

  setRelationTheme: (id: string) => void;
  setRelationArc: (id: string) => void;

  setWorldMother: (id: string) => void;
  setWorldBranch: (id: string) => void;

  // Reset
  reset: () => void;
  resetCharacter: () => void;
  resetRelation: () => void;
  resetWorld: () => void;
};

export const useSelectionStore = create<SelectionState>((set) => ({
  // Initial state
  characterMotherId: null,
  archetypeId: null,
  archetypeToneId: null,

  relationThemeId: null,
  relationArcId: null,

  worldMotherId: null,
  worldBranchId: null,

  // Character actions
  setCharacterMother: (id) =>
    set({
      characterMotherId: id,
      archetypeId: null, // 清空子选
      archetypeToneId: null,
    }),

  setArchetype: (id) =>
    set({
      archetypeId: id,
      // archetypeToneId 保留，因为用户可能返回修改
    }),

  setArchetypeTone: (id) =>
    set({
      archetypeToneId: id,
    }),

  // Relation actions
  setRelationTheme: (id) =>
    set({
      relationThemeId: id,
      relationArcId: null, // 清空曲线
    }),

  setRelationArc: (id) =>
    set({
      relationArcId: id,
    }),

  // World actions
  setWorldMother: (id) =>
    set({
      worldMotherId: id,
      worldBranchId: null, // 清空分支
    }),

  setWorldBranch: (id) =>
    set({
      worldBranchId: id,
    }),

  // Reset
  reset: () =>
    set({
      characterMotherId: null,
      archetypeId: null,
      archetypeToneId: null,
      relationThemeId: null,
      relationArcId: null,
      worldMotherId: null,
      worldBranchId: null,
    }),

  resetCharacter: () =>
    set({
      characterMotherId: null,
      archetypeId: null,
      archetypeToneId: null,
    }),

  resetRelation: () =>
    set({
      relationThemeId: null,
      relationArcId: null,
    }),

  resetWorld: () =>
    set({
      worldMotherId: null,
      worldBranchId: null,
    }),
}));
