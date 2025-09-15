import { t } from 'i18next';

export const MyCapacityComponent = () => {
  return (
    <div className="gridWrap">
      <div className="row">
        <div className="title cw_help_tooltipWrap">
          <button type="button" className="cw_btn_help">
            <span>{t('HIDDEN.CONTROL.MY_CAPACITY')}</span>
            <span className="cw_tooltip_box">
              {t('HIDDEN.CONTROL.TOOL_TIP.MY_CAPACITY')}
            </span>
          </button>
        </div>
        <div className="option">
          <div className="cw_onoffswitch">
            <label>
              <input type="checkbox" className="0051" name="" />
              <span>ON</span>
            </label>
          </div>
        </div>
        <div className="sub_row d-flex">
          <div className="title">
            <strong>{t('HIDDEN.CONTROL.SETTING_CAPACITY')}</strong>
          </div>

          <div className="option">
            <div className="dropdownWrap" id="settingCapacity">
              <div className="selected">
                <span className="txt">
                  <span>item.value</span>
                </span>
                <span className="txt">-</span>
                <button type="button" className="btn_dropdown">
                  <span>list show/hide</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
