import { t } from 'i18next';
import { useEffect, useState } from 'react';
import useGetWaterControl from '../queries/useGetWaterControl';
import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';

type ControlProps = { protocol: string; status: string };

export const MyCapacityComponent: React.FC<ControlProps> = ({
  protocol,
  status,
}) => {
  const deviceInfo = useDeviceStore((state) => state.lastSelectedDeviceInfos);
  const [checked, setChecked] = useState(status === '1');
  useEffect(() => {
    if (status != null) setChecked(status === '1');
  }, [status]);
  const { mutate, isPending } = useGetWaterControl();
  const handleToggle = (nextChecked: boolean) => {
    const prev = checked;
    setChecked(nextChecked);

    if (!deviceInfo?.barcode) {
      setChecked(prev);
      return;
    }

    mutate(
      {
        devId: deviceInfo.barcode,
        dvcTypeCd: deviceInfo.dvcTypeCd,
        isMultiControl: false,
        refreshFlag: false,
        funcList: [{ funcId: protocol, cmdVal: nextChecked ? '1' : '0' }],
      },
      {
        onError: () => setChecked(prev),
      },
    );
  };
  return (
    // <div className="gridWrap">
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
            <input
              type="checkbox"
              className="0051"
              checked={checked}
              disabled={isPending}
              onChange={(e) => handleToggle(e.target.checked)}
            />
            <span>ON</span>
          </label>
        </div>
      </div>
      <div className={`sub_row d-flex ${!checked ? 'cw_none' : ''}`}>
        {/* <div className="sub_row d-flex"> */}
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
    // </div>
  );
};
