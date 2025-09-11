import type { UseMutationCustomOptions } from '@/shared/types/common';
import { useMutation } from '@tanstack/react-query';
import { getToken, postLogin } from '../../api';
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

// function useLogout(mutationOption?: UseMutationCustomOptions) {
//   const { accessToken, refreshToken } = useUserStore.getState();
//   if (!accessToken || !refreshToken) {
//     return Promise.resolve(); // Or reject, depending on desired behavior
//   }
//   return useMutation({
//     mutationFn: postLogout,
//     onSettled: () => {
//       // resetUser();
//     },
//     ...mutationOption,
//   });
// }

function useAuth() {
  const getTokenMutation = useGetToken();
  const loginMutation = useLogin();
  // const logoutMutation = useLogout();
  return {
    getTokenMutation,
    loginMutation,
    // logoutMutation,
  };
}

export default useAuth;
