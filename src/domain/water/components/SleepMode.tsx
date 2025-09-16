import { t } from 'i18next';
type ControlProps = { protocol: string; status: string };

export const SleepModeComponent: React.FC<ControlProps> = ({
  protocol,
  status,
}) => {
  console.log(protocol);
  console.log(status);
  return (
    // 0037
    // <div className="gridWrap">
    <div className="row">
      <div className="title cw_help_tooltipWrap">
        <button type="button" className="cw_btn_help">
          <span>{t('HANPPYEOM_DRIVER.SLEEP_MODE')}</span>
          <span className="cw_tooltip_box">{t('ICON_20.SLEEP_MODE_INFO')}</span>
        </button>
      </div>
      <div className="option">
        <div className="cw_onoffswitch">
          <label>
            <input type="checkbox" className="0037" name="" />
            <span>ON</span>
          </label>
        </div>
      </div>
    </div>
    // </div>
  );
};
