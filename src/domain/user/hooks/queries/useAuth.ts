import type { UseMutationCustomOptions } from '@/shared/types/common';
import { setHeader } from '@/shared/utils/header';
import { useMutation } from '@tanstack/react-query';
import { getToken, postLogin } from '../../api';
import { useUserStore } from '../../stores/useUserStore';

function useGetToken(mutationOption?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: getToken,

    onSuccess: ({ accessToken, refreshToken }) => {
      console.log(refreshToken);
      useUserStore.getState().setAuthTokens({ accessToken, refreshToken });
      setHeader('Authorization', `Bearer ${accessToken}`);
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

function useAuth() {
  const getTokenMutation = useGetToken();
  const loginMutation = useLogin();
  return {
    getTokenMutation,
    loginMutation,
  };
}

export default useAuth;
