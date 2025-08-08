import { Button } from '@/shared/components/Button';
import { useTranslation } from 'react-i18next';

export const LoginActions = () => {
  const { t } = useTranslation();
  const handleSubmit = () => {
    console.log('클릭됨');
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
