import { t } from 'i18next';
import { SettingCapacityComponent } from './SettingCapacity';
import { WATER_CONTROL, type Props } from '../constants/controlDefinitions';
import { useTooltip } from '@/shared/hooks/useTooltip';
import { useControl } from '../hooks/useControl';

export const MyCapacityComponent: React.FC<Props> = ({ protocol, status }) => {
  const toolTip = useTooltip<HTMLDivElement>();
  const { value, update, isPending } = useControl({
    protocol,
    status,
  });
  const checked = value === '1';

  const subProtocol = WATER_CONTROL.controls.settingCapacity.protocol; // '0047'

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
              onChange={(e) => update(e.target.checked ? '1' : '0')}
            />
            <span>ON</span>
          </label>
        </div>
      </div>
      {checked && (
        <SettingCapacityComponent
          key={subProtocol}
          protocol={subProtocol}
          status={status}
        />
      )}
    </div>
  );
};
