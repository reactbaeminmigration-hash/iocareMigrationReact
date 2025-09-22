import { t } from 'i18next';
import {
  SOUND_CATEGORY,
  WATER_CONTROL,
  type Props,
} from '../constants/controlDefinitions';
import { useTooltip } from '@/shared/hooks/useTooltip';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useControl } from '../hooks/useControl';
import { useMobileSelect } from '../hooks/useMobileSelect';
import { SoundVolumeComponent } from './SoundVolume';

export const SoundModeComponent: React.FC<Props> = ({ protocol, status }) => {
  const toolTip = useTooltip<HTMLDivElement>();
  const { value, update, isPending } = useControl({ protocol, status });
  const subProtocol = WATER_CONTROL.controls.soundVolume.protocol;
  const [sound, setSound] = useState(value);
  useEffect(() => {
    setSound(value);
  }, [value]);

  const selected = useMemo(
    () => SOUND_CATEGORY.find((it) => it.rValue === sound),
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
    items: SOUND_CATEGORY,
    title: t('HIDDEN.CONTROL.SOUND_MODE'),
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
          <span>{t('HIDDEN.CONTROL.SOUND_MODE')}</span>
          <span className="cw_tooltip_box">
            {t('HIDDEN.CONTROL.TOOL_TIP.SOUND_MODE')}
          </span>
        </button>
      </div>

      <div className="option">
        <div className="dropdownWrap" id="soundMode">
          <div className="selected" ref={triggerRef}>
            <span className="txt">
              <span>{selected?.value}</span>
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

      {/* 부가 영역: 모드가 '1'이면 안내문, 아니면 볼륨 슬라이더 */}
      <div className="sub_row">
        {sound === '1' ? (
          <div className="cw_txt_alert04 d-flex">
            <span className="bul">※</span>
            <span>{t('HIDDEN.CONTROL.SOUND_MODE_INFO')}</span>
          </div>
        ) : (
          <SoundVolumeComponent
            key={subProtocol}
            protocol={subProtocol}
            status={status}
          />
        )}
      </div>
    </div>
  );
};
