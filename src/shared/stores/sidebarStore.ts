import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface SideBarState {
  isSideBarOpen: boolean;
  toggle: () => void;
}

export type SideBarActionType = 'toggle_sidebar';

export const useSideBarStore = create<SideBarState>()(
  devtools(
    (set) => ({
      isSideBarOpen: false,
      toggle: () =>
        set(
          (s) => ({ isSideBarOpen: !s.isSideBarOpen }),
          false,
          'toggle_sidebar' as SideBarActionType, // 타입 지정
        ),
    }),
    { name: 'SideBarStore' },
  ),
);
