import type { AuthMessageData } from '../types/auth.types';
import useAuth from './queries/useAuth';

// 타입 가드 함수
function isAuthMessageData(data: any): data is AuthMessageData {
  return (
    typeof data === 'object' &&
    data !== null &&
    ('code' in data || 'error' in data || 'session_state' in data)
  );
}

export function useLogin() {
  const { getTokenMutation } = useAuth();

  const handleLogin = () => {
    const authURL =
      import.meta.env.VITE_API_IDP_URL +
      import.meta.env.VITE_API_INTEGRATED_MEMBER_URL;

    window.onmessage = async (event: MessageEvent) => {
      if (isAuthMessageData(event.data)) {
        const { code } = event.data;
        if (code) {
          getTokenMutation.mutate({
            authCode: code,
            redirectUrl: import.meta.env.VITE_DEV_REDIRECT_URL,
          });
        }
      }
    };

    const url =
      `${authURL}?auth_type=0` +
      `&response_type=code` +
      `&client_id=${import.meta.env.VITE_CLIENT_ID}` +
      `&ui_locales=ko-KR` +
      `&dvc_cntry_id=KR` +
      `&redirect_uri=${import.meta.env.VITE_DEV_REDIRECT_URL}`;

    window.open(url);
  };

  return { handleLogin };
}
