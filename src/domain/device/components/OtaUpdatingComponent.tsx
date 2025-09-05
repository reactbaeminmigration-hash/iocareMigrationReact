import { Trans } from 'react-i18next';

export const OtaUpdatingComponent = () => {
  return (
    <>
      <div className="cw_system_update">
        <div className="cw_msgbox">
          <p>
            <Trans i18nKey="CON.PROD_UPDATE_ING" />
          </p>
        </div>
      </div>
    </>
  );
};
