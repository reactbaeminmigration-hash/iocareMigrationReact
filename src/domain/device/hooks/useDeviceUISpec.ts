import { defaultContextValue } from '@/app/contexts/DeviceContext.types';
import type { FoundProductUISpec } from '@/domain/device/types/productUISpec.types';
import { findProductUISpecByCode } from '@/domain/device/utils/findProductUISpec.utils';
import { useMemo } from 'react';

export const useDeviceUISpec = <T_Features>(
  prodCd: string | null | undefined,
): FoundProductUISpec<T_Features> => {
  return useMemo(() => {
    if (!prodCd)
      return defaultContextValue.deviceUISpec as FoundProductUISpec<T_Features>;
    return (
      findProductUISpecByCode<T_Features>(prodCd) ??
      (defaultContextValue.deviceUISpec as FoundProductUISpec<T_Features>)
    );
  }, [prodCd]);
};
