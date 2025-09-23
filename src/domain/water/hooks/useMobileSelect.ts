import { useRef, useEffect, useMemo, useCallback } from 'react';
import type { RefObject } from 'react';
import MobileSelect from 'mobile-select';
import { t } from 'i18next';

type WheelItem = { value: string; rValue: string };

type UseMobileWheelOpts = {
  triggerRef: RefObject<HTMLElement | null>;
  items: WheelItem[]; // [{ value: '라벨', rValue: '실제값' }]
  title: string; // t('...') 결과 문자열
  currentRValue: string | undefined; // 현재 선택된 rValue
  onPickRValue: (rValue: string) => void; // 선택 시 호출
  fallbackIndex?: number; // 현재값 없을 때 초기 인덱스
};

export function useMobileSelect({
  triggerRef,
  items,
  title,
  currentRValue,
  onPickRValue,
  fallbackIndex = 0,
}: UseMobileWheelOpts) {
  const msRef = useRef<MobileSelect | null>(null);

  const wheelData = useMemo(
    () => [{ data: items.map((x) => x.value) }],
    [items],
  );

  const getInitIndex = useCallback(() => {
    const i = items.findIndex((x) => x.rValue === currentRValue);
    return i >= 0 ? i : fallbackIndex;
  }, [items, currentRValue, fallbackIndex]);

  useEffect(() => {
    if (!triggerRef.current || msRef.current) return;

    msRef.current = new MobileSelect({
      trigger: triggerRef.current,
      wheels: wheelData,
      title,
      cancelBtnText: t('BTN.CANCEL'),
      ensureBtnText: t('BTN.CONFIRM'),
      triggerDisplayValue: false,
      onShow: (_val, _idx, ctx) => ctx.mobileSelect.classList.remove('cw_none'),
      onHide: (_val, _idx, ctx) => ctx.mobileSelect.classList.add('cw_none'),
      onChange: (curValue) => {
        const picked = String(curValue[0]);
        const found = items.find((x) => x.value === picked);
        const r = found?.rValue ?? '';
        if (r) onPickRValue(r);
      },
    });

    const root = (msRef.current as any).mobileSelect as HTMLElement;
    root.classList.add('cw_none');

    return () => {
      msRef.current?.destroy();
      msRef.current = null;
    };
  }, [triggerRef, wheelData, title, items, onPickRValue]);

  // 외부에서 호출하는 오픈 함수
  const openWheel = useCallback(() => {
    if (!msRef.current) return;
    const initIndex = getInitIndex();
    try {
      msRef.current.locatePosition(0, initIndex);
    } catch {}
    msRef.current.show();
    setTimeout(() => {
      try {
        msRef.current?.locatePosition(0, initIndex);
      } catch {}
    }, 0);
  }, [getInitIndex]);

  return { openWheel };
}
