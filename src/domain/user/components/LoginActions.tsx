import { routerPath } from '@/router/routerPath';
import { Button } from '@/shared/components/Button';
import { useSpiner } from '@/shared/hooks/useSpiner';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { useUserStore } from '../stores/useUserStore';

export const LoginActions = () => {
  const { t } = useTranslation();
  const { handleLogin } = useLogin();
  const navigate = useNavigate();
  const { isInitialDataLoaded } = useUserStore();
  const { hideSpiner } = useSpiner();
  useEffect(() => {
    if (isInitialDataLoaded) {
      hideSpiner();
      navigate(routerPath.water);
    }
  }, [isInitialDataLoaded]);

  return (
    <div className="cw_login_btns">
      <div>
        <Button className="cw_btn_login" onClick={handleLogin}>
          <span>{t('BTN.LOGIN')}</span>
        </Button>
      </div>
      <div>
        <Button className="cw_btn_tut" onClick={() => navigate('/air/home')}>
          <span>{t('CON.SERVICE_EXPERIENCE')}</span>
        </Button>
      </div>
    </div>
  );
};
