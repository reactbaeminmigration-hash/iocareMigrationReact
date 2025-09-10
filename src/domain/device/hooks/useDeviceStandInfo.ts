import { defaultContextValue } from '@/app/contexts/DeviceContext.types';
import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import type { ProdStandDeviceInfo } from '@/domain/device/types/common.types';
import { useMemo } from 'react';

export const useDeviceStandInfo = (
  prodCd: string | null | undefined,
): ProdStandDeviceInfo => {
  const { prodStandDeviceInfo } = useDeviceStore();

  return useMemo(() => {
    if (!prodCd || !prodStandDeviceInfo)
      return defaultContextValue.deviceStandInfo;
    return (
      prodStandDeviceInfo.find((p) => p.makrModelCode === prodCd) ??
      defaultContextValue.deviceStandInfo
    );
  }, [prodCd, prodStandDeviceInfo]);
};
