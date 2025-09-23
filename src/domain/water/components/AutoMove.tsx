import { t } from 'i18next';
import {
  AUTO_MOVE_CATEGORY,
  WAIT_CATEGORY,
  type Props,
} from '../constants/controlDefinitions';
import { useTooltip } from '@/shared/hooks/useTooltip';
import { useControl } from '../hooks/useControl';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useMobileSelect } from '../hooks/useMobileSelect';

export const AutoMoveComponent: React.FC<Props> = ({ protocol, status }) => {
  const toolTip = useTooltip<HTMLDivElement>();
  const { value, update, isPending } = useControl({ protocol, status });
  const [autoMove, setAutoMove] = useState(value);
  useEffect(() => {
    setAutoMove(value);
  }, [value]);

  const selected = useMemo(
    () => AUTO_MOVE_CATEGORY.find((it) => it.rValue === autoMove),
    [autoMove],
  );

  const triggerRef = useRef<HTMLDivElement>(null);

  const handleConfirm = useCallback(
    (nextRValue: string) => {
      setAutoMove(nextRValue);
      update(nextRValue);
    },
    [update],
  );

  const { openWheel } = useMobileSelect({
    triggerRef,
    items: AUTO_MOVE_CATEGORY,
    title: t('HIDDEN.CONTROL.AUTO_MOVE'),
    currentRValue: autoMove,
    onPickRValue: handleConfirm,
  });

  return (
    <div className="row">
      <div
        className={`title cw_help_tooltipWrap ${toolTip.isOpen ? 'cw_open' : ''}`}
        ref={toolTip.containerRef}
      >
        <button type="button" className="cw_btn_help" onClick={toolTip.toggle}>
          <span>{t('HIDDEN.CONTROL.AUTO_MOVE')}</span>
          <span className="cw_tooltip_box">
            {t('HIDDEN.CONTROL.TOOL_TIP.AUTO_MOVE')}
          </span>
        </button>
      </div>
      <div className="option">
        <div className="dropdownWrap" id="waitMode">
          <div className="selected" ref={triggerRef}>
            <span>{selected?.value}</span>
            <button
              type="button"
              name="004C"
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
