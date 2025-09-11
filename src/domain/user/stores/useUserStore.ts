import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { UserDataInfo } from '../types/userInfo.types';

interface UserState {
  isStartingStep: boolean;
  setStartingStep: (isStartingStep: boolean) => void;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isInitialDataLoaded: boolean;
  isAutoLogin: boolean;
  setAuthTokens: (tokens: {
    accessToken?: string | null;
    refreshToken?: string | null;
  }) => void;
  userInfo: UserDataInfo | null;
  setUserInfo: (userInfo: UserDataInfo) => void;
  setInitialDataLoaded: (loaded: boolean) => void;
  setIsAutoLogin: (autoLogin: boolean) => void;
  setIsAuthenticated: (authenticated: boolean) => void;
  error: Error | null;
  setError: (error: Error | null) => void;
}

export type UserActionType =
  | 'set_auth_tokens'
  | 'set_user_info'
  | 'set_initial_data_loaded'
  | 'set_error'
  | 'set_isAutoLogin'
  | 'set_isAuthenticated'
  | 'logout';

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        isStartingStep: false,
        setStartingStep: (isStartingStep) =>
          set({ isStartingStep: isStartingStep }),
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        setIsAuthenticated: (authenticated) =>
          set(
            { isAuthenticated: authenticated },
            false,
            'set_isAuthenticated' as UserActionType,
          ),
        setAuthTokens: (tokens) =>
          set(
            (state) => {
              const newAccessToken = tokens.accessToken ?? state.accessToken;
              const newRefreshToken = tokens.refreshToken ?? state.refreshToken;
              return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
              };
            },
            false,
            'set_auth_tokens' as UserActionType,
          ),
        userInfo: null,
        setUserInfo: (userInfo) =>
          set({ userInfo }, false, 'set_user_info' as UserActionType),
        isInitialDataLoaded: false,
        setInitialDataLoaded: (loaded) =>
          set(
            { isInitialDataLoaded: loaded },
            false,
            'set_initial_data_loaded' as UserActionType,
          ),
        isAutoLogin: false,
        setIsAutoLogin: (autoLogin) =>
          set(
            { isAutoLogin: autoLogin },
            false,
            'set_isAutoLogin' as UserActionType,
          ),
        logout: () =>
          set(
            {
              accessToken: null,
              refreshToken: null,
              userInfo: null,
              isAutoLogin: false,
            },
            false,
            'logout' as UserActionType,
          ),
        error: null,
        setError: (error) =>
          set({ error }, false, 'set_error' as UserActionType),
      }),
      {
        name: 'user-storage',
        partialize: (state) => ({
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          isAutoLogin: state.isAutoLogin,
        }),
      },
    ),
    { name: 'UserStore' },
  ),
);
