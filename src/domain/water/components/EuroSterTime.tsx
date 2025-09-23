import { t } from 'i18next';
import { type Props } from '../constants/controlDefinitions';
import { useTooltip } from '@/shared/hooks/useTooltip';
import { useControl } from '../hooks/useControl';
import { HourTimePicker } from './HourTimePicker';
import { useHourTimePicker } from '../hooks/useHourTimePicker';

export const EuroSterTimeComponent: React.FC<Props> = ({
  protocol,
  status,
}) => {
  const toolTip = useTooltip<HTMLDivElement>();
  const { value, update, isPending } = useControl({
    protocol,
    status,
  });

  const mer = Number(value) < 12 ? t('CON.MORNING') : t('CON.AFTERNOON');
  const time = String(Number(value) % 12 || 12).padStart(2, '0');

  const initValue = {
    ampm: mer,
    hour: time,
  };
  const timePicker = useHourTimePicker(initValue, (picked) => {
    const MORNING = t('CON.MORNING');
    const h24 =
      picked.ampm === MORNING
        ? Number(picked.hour) % 12
        : (Number(picked.hour) % 12) + 12;
    update(String(h24));
  });

  return (
    <>
      <div className="row">
        <div
          className={`title cw_help_tooltipWrap ${toolTip.isOpen ? 'cw_open' : ''}`}
          ref={toolTip.containerRef}
        >
          <button
            type="button"
            className="cw_btn_help"
            onClick={toolTip.toggle}
          >
            <span>{t('HIDDEN.CONTROL.WATER_COURSE_STER_TIME')}</span>
            <span className="cw_tooltip_box">
              {t('HIDDEN.CONTROL.TOOL_TIP.WATER_COURSE_STER_TIME')}
            </span>
          </button>
        </div>
        <div className="option">
          <button
            type="button"
            className="btn_time"
            onClick={() => timePicker.openPicker(initValue)}
            disabled={isPending}
          >
            <span>
              {`${mer} ${time}`}
              {t('AIR.AIR_HOUR')}
            </span>
          </button>
        </div>
      </div>
      {timePicker.open && (
        <HourTimePicker
          title={t('HIDDEN.CONTROL.WATER_COURSE_STER_TIME')}
          init={initValue}
          onCancel={timePicker.closePicker}
          onConfirm={(picked) => {
            timePicker.change(picked);
            timePicker.confirm();
          }}
        />
      )}
    </>
  );
};
