import { defaultContextValue } from '@/app/contexts/DeviceContext.types';
import type { FoundProductUISpec } from '@/domain/device/types/productUISpec.types';
import { findProductUISpecByCode } from '@/domain/device/utils/findProductUISpec.utils';
import { useMemo } from 'react';

export const useDeviceUISpec = (
  prodCd: string | null | undefined,
): FoundProductUISpec => {
  return useMemo(() => {
    if (!prodCd) return defaultContextValue.deviceUISpec;
    return findProductUISpecByCode(prodCd) ?? defaultContextValue.deviceUISpec;
  }, [prodCd]);
};
