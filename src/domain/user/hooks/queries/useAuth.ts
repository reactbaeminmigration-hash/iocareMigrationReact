import type { UseMutationCustomOptions } from '@/shared/types/common';
import { setHeader } from '@/shared/utils/header';
import { setLocalStorage } from '@/shared/utils/localStorege';
import { useMutation } from '@tanstack/react-query';
import { getToken, postLogin } from '../../api';

function useGetToken(mutationOption?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: getToken,

    onSuccess: ({ accessToken, refreshToken }) => {
      console.log(refreshToken);
      setLocalStorage('accessToken', accessToken);
      setLocalStorage('refreshToken', refreshToken);
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
