import { useUserStore } from '@/domain/user/stores/useUserStore';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface SideBarState {
  isOpen: boolean;
  toggle: () => void;
}

export type SideBarActionType = 'toggle_sidebar';

export const useSideBarStore = create<SideBarState>()(
  devtools(
    (set, get) => ({
      isOpen: false,
      toggle: () => {
        const { isOpen } = get();

        if (isOpen) {
          useUserStore.getState().setStartingStep(true);
        }
        set(
          (s) => ({ isOpen: !s.isOpen }),
          false,
          'toggle_sidebar' as SideBarActionType, // 타입 지정
        );
      },
    }),
    { name: 'SideBarStore' },
  ),
);
