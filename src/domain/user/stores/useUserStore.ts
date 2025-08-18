import { create } from 'zustand';
import type { UserDataInfo } from '../types/userInfo.types';

interface UserState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean; // 사용자 인증 상태
  isInitialDataLoaded: boolean; // 초기데이터 로딩 완료 여부
  setAuthTokens: (tokens: {
    accessToken?: string | null;
    refreshToken?: string | null;
  }) => void;
  userInfo: UserDataInfo | null; // 사용자 데이터
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
