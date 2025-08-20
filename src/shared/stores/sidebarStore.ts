import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

interface SideBarState {
  isSideBarOpen: boolean;
  toggle: () => void;
}

const storeCreator: StateCreator<
  SideBarState,
  [],
  [['zustand/devtools', never]]
> = (set) => ({
  isSideBarOpen: false,
  toggle: () => set((s) => ({ isSideBarOpen: !s.isSideBarOpen })),
});

export const useSideBarStore = create(
  devtools(storeCreator, { name: 'SideBarStore' }),
);
