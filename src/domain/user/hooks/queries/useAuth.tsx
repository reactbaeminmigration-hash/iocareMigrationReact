import type { UseMutationCustomOptions } from '@/shared/types/common';
import { useMutation } from '@tanstack/react-query';
import { getToken } from '../../api/userApi';

function useGetToken(mutationOption?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: getToken,
    onSuccess: ({ accessToken, refreshToken }) => {
      console.log(accessToken);
      console.log(refreshToken);
    },
    ...mutationOption,
  });
}

function useAuth() {
  const getTokenMutation = useGetToken();
  return {
    getTokenMutation,
  };
}

export default useAuth;
