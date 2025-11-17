import { create } from 'zustand';

export type BlockKey = 'intro' | 'world' | 'archetype' | 'relation' | 'rules' | 'stageEngine' | 'modelPatch' | 'emotion' | 'characterName' | 'openingLine';

type BlockState = {
  original: Record<BlockKey, string>; // 生成时的版本
  current: Record<BlockKey, string>; // 用户可编辑版本
  setBlock: (k: BlockKey, v: string) => void;
  setOriginalAndCurrent: (data: Partial<Record<BlockKey, string>>) => void;
  resetBlock: (k: BlockKey) => void; // 恢复为 original
  resetAll: () => void;
};

const emptyBlocks: Record<BlockKey, string> = {
  intro: '',
  world: '',
  archetype: '',
  relation: '',
  rules: '',
  stageEngine: '',
  modelPatch: '',
  emotion: '',
  characterName: '',
  openingLine: '',
};

export const usePromptBlocks = create<BlockState>((set, get) => ({
  original: { ...emptyBlocks },
  current: { ...emptyBlocks },

  setBlock: (k, v) =>
    set((s) => ({ current: { ...s.current, [k]: v } })),

  setOriginalAndCurrent: (data) =>
    set((s) => ({
      original: { ...s.original, ...data },
      current: { ...s.current, ...data },
    })),

  resetBlock: (k) =>
    set((s) => ({ current: { ...s.current, [k]: s.original[k] ?? '' } })),

  resetAll: () => set((s) => ({ current: { ...s.original } })),
}));
