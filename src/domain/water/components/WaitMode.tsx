import { t } from 'i18next';
import { WAIT_CATEGORY, type Props } from '../constants/controlDefinitions';
import { useTooltip } from '@/shared/hooks/useTooltip';
import { useControl } from '../hooks/useControl';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useMobileSelect } from '../hooks/useMobileSelect';

export const WaitModeComponent: React.FC<Props> = ({ protocol, status }) => {
  const toolTip = useTooltip<HTMLDivElement>();
  const { value, update, isPending } = useControl({ protocol, status });
  const [sound, setSound] = useState(value);
  useEffect(() => {
    setSound(value);
  }, [value]);

  const selected = useMemo(
    () => WAIT_CATEGORY.find((it) => it.rValue === sound),
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
    items: WAIT_CATEGORY,
    title: t('HIDDEN.CONTROL.WAIT_MODE'),
    currentRValue: sound,
    onPickRValue: handleConfirm,
  });

  return (
    <div className="row">
      <div
        className={`title cw_help_tooltipWrap ${toolTip.isOpen ? 'cw_open' : ''}`}
        ref={toolTip.containerRef}
      >
        <button type="button" className="cw_btn_help" onClick={toolTip.toggle}>
          <span>{t('HIDDEN.CONTROL.WAIT_MODE')}</span>
          <span className="cw_tooltip_box">
            {t('HIDDEN.CONTROL.TOOL_TIP.WAIT_MODE')}
          </span>
        </button>
      </div>
      <div className="option">
        <div className="dropdownWrap" id="waitMode">
          <div className="selected" ref={triggerRef}>
            <span>{selected?.value}</span>
            <button
              type="button"
              name="004B"
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
