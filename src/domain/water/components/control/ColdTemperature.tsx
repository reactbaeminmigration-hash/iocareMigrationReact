import { t } from 'i18next';
import {
  COLD_TEMPERATURE_CATEGORY,
  type Props,
} from '../../constants/controlDefinitions';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useControl } from '../../hooks/useControl';
import { useMobileSelect } from '../../hooks/useMobileSelect';

export const ColdTemperatureComponent: React.FC<Props> = ({
  protocol,
  status,
}) => {
  const { value, update, isPending } = useControl({ protocol, status });
  const [sound, setSound] = useState(value);
  useEffect(() => {
    setSound(value);
  }, [value]);

  const selected = useMemo(
    () => COLD_TEMPERATURE_CATEGORY.find((it) => it.rValue === sound),
    [sound],
  );

  const triggerRef = useRef<HTMLDivElement>(null);

  const handleConfirm = useCallback(
    (nextRValue: string) => {
      setSound(nextRValue);
      update(nextRValue);
    },
    [update],
  );

  const { openWheel } = useMobileSelect({
    triggerRef,
    items: COLD_TEMPERATURE_CATEGORY,
    title: t('HIDDEN.CONTROL.COLD_DETAIL_TEMPERATURE'),
    currentRValue: sound,
    onPickRValue: handleConfirm,
  });

  return (
    <div className="row">
      <div className="title">
        <span>{t('HIDDEN.CONTROL.COLD_DETAIL_TEMPERATURE')}</span>
      </div>

      <div className="option">
        <div className="dropdownWrap" id="coldTemperature">
          <div className="selected" ref={triggerRef}>
            <span className="txt">
              <span>{selected?.value}</span>
            </span>
            <button
              type="button"
              name="003C"
              className="btn_dropdown"
              onClick={(e) => {
                e.stopPropagation();
                openWheel();
              }}
              disabled={isPending}
            >
              <span>list show/hide</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
