import { t } from 'i18next';
import { type Props } from '../constants/controlDefinitions';
import { useTooltip } from '@/shared/hooks/useTooltip';
import { useControl } from '../hooks/useControl';

export const SuperHotWaterComponent: React.FC<Props> = ({
  protocol,
  status,
}) => {
  const toolTip = useTooltip<HTMLDivElement>();
  const { value, update, isPending } = useControl({
    protocol,
    status,
  });
  const checked = value === '1';
  return (
    <div className="row">
      <div
        className={`title cw_help_tooltipWrap ${toolTip.isOpen ? 'cw_open' : ''}`}
        ref={toolTip.containerRef}
      >
        <button type="button" className="cw_btn_help" onClick={toolTip.toggle}>
          <span>{t('ICON_20.SUPER_HOT_WATER')}</span>
          <span className="cw_tooltip_box">
            {t('ICON_20.SUPER_HOT_WATER_INFO')}
          </span>
        </button>
      </div>
      <div className="option">
        <div className="cw_onoffswitch">
          <label>
            <input
              type="checkbox"
              className="003B"
              checked={checked}
              disabled={isPending}
              onChange={(e) => update(e.target.checked ? '1' : '0')}
            />
            <span>ON</span>
          </label>
        </div>
      </div>
    </div>
  );
};
