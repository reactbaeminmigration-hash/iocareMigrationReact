import { create } from 'zustand';
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
}

export const useUserStore = create<UserState>((set) => ({
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  setAuthTokens: (tokens) =>
    set((state) => {
      const newAccessTokne =
        tokens.accessToken !== undefined
          ? tokens.accessToken
          : state.accessToken;
      const newRefresToken =
        tokens.refreshToken !== undefined
          ? tokens.refreshToken
          : state.refreshToken;
      return {
        accessToken: newAccessTokne,
        refreshToken: newRefresToken,
        isAuthenticated: !!newAccessTokne,
      };
    }),
  userInfo: null,
  setUserInfo: (userInfo) =>
    set({
      userInfo,
    }),
  isInitialDataLoaded: false,
  setInitialDataLoaded: (loaded) => set({ isInitialDataLoaded: loaded }),
}));
