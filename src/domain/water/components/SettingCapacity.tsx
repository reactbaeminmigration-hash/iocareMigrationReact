import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { t } from 'i18next';
import { useControl } from '../hooks/useControl';
import { CAPACITY_CATEGORY, type Props } from '../constants/controlDefinitions';
import { useMobileSelect } from '../hooks/useMobileSelect';

export const SettingCapacityComponent: React.FC<Props> = ({
  protocol,
  status,
}) => {
  const { value, update, isPending } = useControl({
    protocol,
    status,
  });

  const [capacity, setCapacity] = useState(value);
  useEffect(() => {
    setCapacity(value);
  }, [value]);

  const selected = useMemo(
    () => CAPACITY_CATEGORY.find((it) => it.rValue === capacity),
    [capacity],
  );

  const triggerRef = useRef<HTMLDivElement>(null);

  const handleConfirm = useCallback(
    (nextRValue: string) => {
      setCapacity(nextRValue);
      update(nextRValue);
    },
    [update],
  );

  const { openWheel } = useMobileSelect({
    triggerRef,
    items: CAPACITY_CATEGORY,
    title: t('HIDDEN.CONTROL.SOUND_MODE'),
    currentRValue: capacity,
    onPickRValue: handleConfirm,
  });

  return (
    <div className="sub_row d-flex">
      <div className="title">
        <strong>{t('HIDDEN.CONTROL.SETTING_CAPACITY')}</strong>
      </div>

      <div className="option">
        <div className="dropdownWrap" id="settingCapacity">
          <div className="selected" ref={triggerRef}>
            <span className="txt">
              <span>{`${selected?.value}`}</span>
            </span>
            <button
              type="button"
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
