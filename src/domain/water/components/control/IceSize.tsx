import { t } from 'i18next';
import {
  ICE_SIZE_CATEGORY,
  type Props,
} from '../../constants/controlDefinitions';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useControl } from '../../hooks/useControl';
import { useMobileSelect } from '../../hooks/useMobileSelect';

export const IceSizeComponent: React.FC<Props> = ({ protocol, status }) => {
  const { value, update, isPending } = useControl({ protocol, status });
  const [sound, setSound] = useState(value);
  useEffect(() => {
    setSound(value);
  }, [value]);

  const selected = useMemo(
    () => ICE_SIZE_CATEGORY.find((it) => it.rValue === sound),
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
    items: ICE_SIZE_CATEGORY,
    title: t('ICON40.CONTROL.ICE_SIZE'),
    currentRValue: sound,
    onPickRValue: handleConfirm,
  });

  return (
    <div className="row">
      <div className="title">
        <span>{t('ICON40.CONTROL.ICE_SIZE')}</span>
      </div>

      <div className="option">
        <div className="dropdownWrap" id="iceSize">
          <div className="selected" ref={triggerRef}>
            <span className="txt">
              <span>{selected?.value}</span>
            </span>
            <button
              type="button"
              name="0058"
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
