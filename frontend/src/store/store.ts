// src/store/store.ts
import { create } from 'zustand';

export const useStore = create<{
  expanded: boolean;
  toggleExpanded: () => void;
}>((set) => ({
  expanded: false,
  toggleExpanded: () => set((state) => ({ expanded: !state.expanded })),
}));