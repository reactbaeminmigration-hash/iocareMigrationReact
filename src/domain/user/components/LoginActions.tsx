import { Button } from '@/shared/components/Button';
import { useTranslation } from 'react-i18next';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

export const LoginActions = () => {
  const { t } = useTranslation();
  const { handleLogin } = useLogin();
  const navigate = useNavigate();

  return (
    <div className="cw_login_btns">
      <div>
        <Button className="cw_btn_login" onClick={handleLogin}>
          <span>{t('BTN.LOGIN')}</span>
        </Button>
      </div>
      <div>
        <Button className="cw_btn_tut" onClick={() => navigate('/air_home')}>
          <span>{t('CON.SERVICE_EXPERIENCE')}</span>
        </Button>
      </div>
    </div>
  );
};
