import { useUserStore } from '@/domain/user/stores/useUserStore';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface SideBarState {
  isSideBarOpen: boolean;
  toggle: () => void;
}

export type SideBarActionType = 'toggle_sidebar';

export const useSideBarStore = create<SideBarState>()(
  devtools(
    (set, get) => ({
      isSideBarOpen: false,
      toggle: () => {
        const { isSideBarOpen } = get();

        if (isSideBarOpen) {
          useUserStore.getState().setStartingStep(true);
        }
        set(
          (s) => ({ isSideBarOpen: !s.isSideBarOpen }),
          false,
          'toggle_sidebar' as SideBarActionType, // 타입 지정
        );
      },
    }),
    { name: 'SideBarStore' },
  ),
);
