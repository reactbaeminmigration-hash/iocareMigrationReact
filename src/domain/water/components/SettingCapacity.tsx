import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import MobileSelect from 'mobile-select';
import { t } from 'i18next';
import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import useGetWaterControl from '../queries/useGetWaterControl';
import { CAPACITY_CATEGORY, type Props } from '../constants/controlDefinitions';

export const SettingCapacityComponent: React.FC<Props> = ({
  protocol,
  status,
}) => {
  const device = useDeviceStore((s) => s.lastSelectedDeviceInfos);
  const { mutate, isPending } = useGetWaterControl();

  const [capacity, setCapacity] = useState(status[protocol] ?? '');
  const selected = useMemo(
    () => CAPACITY_CATEGORY.find((it) => it.rValue === capacity),
    [capacity],
  );
  const selectedLabel = Number(capacity) > 0 ? (selected?.value ?? '-') : '-';
  useEffect(() => {
    setCapacity(status[protocol] ?? '');
  }, [status, protocol]);

  const triggerRef = useRef<HTMLDivElement>(null);
  const msRef = useRef<MobileSelect | null>(null);

  const wheelData = useMemo(
    () => [{ data: CAPACITY_CATEGORY.map((x) => x.value) }],
    [],
  );

  const handleConfirm = useCallback(
    (nextCapacity: string) => {
      const prev = capacity;
      setCapacity(nextCapacity);
      if (!device?.barcode) {
        setCapacity(prev);
        return;
      }
      mutate(
        {
          devId: device.barcode,
          dvcTypeCd: device.dvcTypeCd,
          isMultiControl: false,
          refreshFlag: false,
          funcList: [{ funcId: protocol, cmdVal: nextCapacity }],
        },
        { onError: () => setCapacity(prev) },
      );
    },
    [capacity, device, mutate, protocol],
  );

  useEffect(() => {
    if (!triggerRef.current || msRef.current) return;

    msRef.current = new MobileSelect({
      trigger: triggerRef.current,
      wheels: wheelData,
      title: t('HIDDEN.CONTROL.SETTING_CAPACITY'),
      cancelBtnText: t('BTN.CANCEL'),
      ensureBtnText: t('BTN.CONFIRM'),
      triggerDisplayValue: false,
      onShow: (_val, _idx, ctx) => {
        ctx.mobileSelect.classList.remove('cw_none');
      },
      onHide: (_val, _idx, ctx) => {
        ctx.mobileSelect.classList.add('cw_none');
      },
      onChange: (curValue) => {
        const pickedValue = String(curValue[0]);
        const found = CAPACITY_CATEGORY.find((x) => x.value === pickedValue);
        const rValue = found?.rValue ?? '';
        if (rValue) handleConfirm(rValue);
      },
    });

    return () => {
      msRef.current?.destroy();
      msRef.current = null;
    };
  }, [wheelData, handleConfirm]);

  const openWheel = useCallback(() => {
    if (!msRef.current) return;
    const idx = CAPACITY_CATEGORY.findIndex((x) => x.rValue === capacity);
    const initIndex = idx >= 0 ? idx : 43;
    try {
      msRef.current.locatePosition(0, initIndex);
    } catch {}
    msRef.current.show();
    setTimeout(() => {
      try {
        msRef.current?.locatePosition(0, initIndex);
      } catch {}
    }, 0);
  }, [capacity]);

  return (
    <div className="sub_row d-flex">
      <div className="title">
        <strong>{t('HIDDEN.CONTROL.SETTING_CAPACITY')}</strong>
      </div>

      <div className="option">
        <div className="dropdownWrap" id="settingCapacity">
          <div className="selected" ref={triggerRef}>
            <span className="txt">
              <span>{selectedLabel}</span>
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
