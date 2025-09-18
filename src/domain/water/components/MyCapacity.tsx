import { t } from 'i18next';
import { useEffect, useState } from 'react';
import useGetWaterControl from '../queries/useGetWaterControl';
import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import { SettingCapacityComponent } from './SettingCapacity';
import { WATER_CONTROL, type Props } from '../constants/controlDefinitions';
import { useTooltip } from '@/shared/hooks/useTooltip';

export const MyCapacityComponent: React.FC<Props> = ({ protocol, status }) => {
  const deviceInfo = useDeviceStore((state) => state.lastSelectedDeviceInfos);
  const toolTip = useTooltip<HTMLDivElement>();
  const { mutate, isPending } = useGetWaterControl();

  const [checked, setChecked] = useState(status[protocol] === '1');
  useEffect(() => {
    setChecked(status[protocol] === '1');
  }, [status, protocol]);

  const setCapacityProto = WATER_CONTROL.controls.settingCapacity.protocol; // '0047'

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
    <div className="row">
      <div
        className={`title cw_help_tooltipWrap ${toolTip.isOpen ? 'cw_open' : ''}`}
        ref={toolTip.containerRef}
      >
        <button type="button" className="cw_btn_help" onClick={toolTip.toggle}>
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
      {checked && (
        <SettingCapacityComponent
          key={setCapacityProto}
          protocol={setCapacityProto}
          status={status}
          // isOpen={isOpen}
          // onOpen={() => setOpen(true)}
          // onClose={() => setOpen(false)}
          // 필요 시 onConfirm에서 mutate({ funcId: '0047', cmdVal: value })
        />
      )}
    </div>
  );
};
