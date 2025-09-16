import { t } from 'i18next';
type ControlProps = { protocol: string; status: string };

export const WaitModeComponent: React.FC<ControlProps> = ({
  protocol,
  status,
}) => {
  console.log(protocol);
  console.log(status);
  return (
    // 004B
    // <div className="gridWrap">
    <div className="row">
      <div className="title cw_help_tooltipWrap">
        <button type="button" className="cw_btn_help">
          <span>{t('HIDDEN.CONTROL.WAIT_MODE')}</span>
          <span className="cw_tooltip_box">
            {t('HIDDEN.CONTROL.TOOL_TIP.WAIT_MODE')}
          </span>
        </button>
      </div>
      <div className="option">
        <div className="dropdownWrap" id="waitMode">
          <div className="selected">
            <span className="txt">{t('HIDDEN.CONTROL.WAIT_MODE_ITM_0')}</span>
            <span className="txt">{t('HIDDEN.CONTROL.WAIT_MODE_ITM_1')}</span>
            <span className="txt">{t('HIDDEN.CONTROL.WAIT_MODE_ITM_3')}</span>
            <button type="button" className="btn_dropdown">
              <span>list show/hide</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};
