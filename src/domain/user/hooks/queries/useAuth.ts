import type { UseMutationCustomOptions } from '@/shared/types/common';
import { useMutation } from '@tanstack/react-query';
import { getToken, postLogin, postLogout } from '../../api';
import { useUserStore } from '../../stores/useUserStore';

function useGetToken(mutationOption?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: getToken,
    onSuccess: ({ accessToken, refreshToken }) => {
      console.log(refreshToken);
      useUserStore.getState().setAuthTokens({ accessToken, refreshToken });
    },
    ...mutationOption,
  });
}

function useLogin(mutationOption?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin,
    ...mutationOption,
  });
}

function useLogout(mutationOption?: UseMutationCustomOptions) {
  const { resetUser } = useUserStore.getState();
  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      resetUser();
      window.location.href = '/';
    },
    ...mutationOption,
  });
}

function useAuth() {
  const getTokenMutation = useGetToken();
  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  return {
    getTokenMutation,
    loginMutation,
    logoutMutation,
  };
}

export default useAuth;
