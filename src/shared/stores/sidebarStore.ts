import { create } from 'zustand';

interface SideBarState {
  isSideBarOpen: boolean;
  toggle: () => void;
}

export const useSideBarStore = create<SideBarState>((set) => ({
  isSideBarOpen: false,
  toggle: () => set((s) => ({ isSideBarOpen: !s.isSideBarOpen })),
}));
