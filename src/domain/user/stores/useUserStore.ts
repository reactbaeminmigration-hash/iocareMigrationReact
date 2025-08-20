import type { StateCreator } from 'zustand';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { UserDataInfo } from '../types/userInfo.types';

interface UserState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isInitialDataLoaded: boolean;
  setAuthTokens: (tokens: {
    accessToken?: string | null;
    refreshToken?: string | null;
  }) => void;
  userInfo: UserDataInfo | null;
  setUserInfo: (userInfo: UserDataInfo) => void;
  setInitialDataLoaded: (loaded: boolean) => void;
  error: Error | null;
  setError: (error: Error | null) => void;
}

const storeCreator: StateCreator<
  UserState,
  [],
  [['zustand/devtools', never], ['zustand/persist', unknown]]
> = (set) => ({
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  setAuthTokens: (tokens) =>
    set((state) => {
      const newAccessToken =
        tokens.accessToken !== undefined
          ? tokens.accessToken
          : state.accessToken;
      const newRefreshToken =
        tokens.refreshToken !== undefined
          ? tokens.refreshToken
          : state.refreshToken;
      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        isAuthenticated: !!newAccessToken,
      };
    }),
  userInfo: null,
  setUserInfo: (userInfo) => set({ userInfo }),
  isInitialDataLoaded: false,
  setInitialDataLoaded: (loaded) => set({ isInitialDataLoaded: loaded }),
  error: null,
  setError: (error) => set({ error }),
});

const persistOptions = {
  name: 'user-storage',
  partialize: (state: UserState) => ({
    accessToken: state.accessToken,
    refreshToken: state.refreshToken,
  }),
};

export const useUserStore = create(
  devtools(persist(storeCreator, persistOptions), { name: 'UserStore' }),
);
