import { Button } from '@/shared/components/Button';
import { useTranslation } from 'react-i18next';
export const LoginActions = () => {
  const { t, i18n } = useTranslation();
  const handleSubmit = () => {
    const authURL =
      import.meta.env.VITE_API_IDP_URL +
      '/auth/realms/cw-account/protocol/openid-connect/auth';
    window.onmessage = async (res) => {
      console.log(res.data);
      if (res.data.code) {
      } else {
      }
    };
    console.log(`${i18n.language}`);
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
