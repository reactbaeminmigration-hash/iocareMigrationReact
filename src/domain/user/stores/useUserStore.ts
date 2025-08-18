import type { StateCreator } from 'zustand'; // ✨ 'type' 키워드 추가
import { create } from 'zustand'; // ✨ StateCreator 임포트
import { devtools } from 'zustand/middleware';
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
  error: Error | null;
  setError: (error: Error | null) => void;
}

const storeCreator: StateCreator<
  UserState,
  [],
  [['zustand/devtools', never]]
> = (set) => ({
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
  error: null,
  setError: (error) => set({ error }),
});

export const useUserStore = create(devtools(storeCreator));
