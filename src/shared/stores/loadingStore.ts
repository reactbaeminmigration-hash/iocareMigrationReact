import { create, type StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

interface LoadingState {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

const storeCreator: StateCreator<
  LoadingState,
  [],
  [['zustand/devtools', never]]
> = (set) => ({
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
});

export const useLoadingStore = create(
  devtools(storeCreator, { name: 'LoadingStore' }),
);
