import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface LoadingState {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

export type LoadingActionType = 'set_loading';

export const useLoadingStore = create<LoadingState>()(
  devtools(
    (set) => ({
      isLoading: false,
      setLoading: (isLoading) =>
        set({ isLoading }, false, 'set_loading' as LoadingActionType),
    }),
    { name: 'LoadingStore' },
  ),
);
