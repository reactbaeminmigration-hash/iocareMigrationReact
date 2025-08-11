import { Button } from '@/shared/components/Button';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/queries/useAuth';
import type { AuthMessageData } from '../types/auth.types';

// 타입 가드 함수
function isAuthMessageData(data: any): data is AuthMessageData {
  return (
    typeof data === 'object' &&
    data !== null &&
    ('code' in data || 'error' in data || 'session_state' in data)
  );
}

export const LoginActions = () => {
  const { t } = useTranslation();
  const { getTokenMutation } = useAuth();
  const handleSubmit = () => {
    const authURL =
      import.meta.env.VITE_API_IDP_URL +
      import.meta.env.VITE_API_INTEGRATED_MEMBER_URL;
    window.onmessage = async (event: MessageEvent) => {
      if (isAuthMessageData(event.data)) {
        const { code, error, session_state } = event.data;
        console.log(code);
        console.log(error);
        console.log(session_state);
        getTokenMutation.mutate(
          {
            authCode: code!,
            redirectUrl: import.meta.env.VITE_DEV_REDIRECT_URL,
          },
          // {
          //   onSuccess: ({ accessToken, refreshToken }) => {
          //     console.log('성공');
          //     console.log(accessToken);
          //     console.log(refreshToken);
          //   },
          // },
        );
      } else {
      }
    };
    let url =
      `${authURL}?auth_type=0` +
      `&response_type=code` +
      `&client_id=${import.meta.env.VITE_CLIENT_ID}` +
      `&ui_locales=ko-KR` +
      `&dvc_cntry_id=KR` +
      `&redirect_uri=${import.meta.env.VITE_DEV_REDIRECT_URL}`;
    window.open(url);
  };

  return (
    <div className="cw_login_btns">
      <div>
        <Button className="cw_btn_login" onClick={handleSubmit}>
          <span>{t('BTN.LOGIN')}</span>
        </Button>
      </div>
      <div>
        <Button className="cw_btn_tut" onClick={handleSubmit}>
          <span>{t('CON.SERVICE_EXPERIENCE')}</span>
        </Button>
      </div>
    </div>
  );
};
