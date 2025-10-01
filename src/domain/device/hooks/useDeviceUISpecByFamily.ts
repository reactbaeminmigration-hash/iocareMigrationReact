import { deviceFamilyDefinitionsMap } from '@/domain/device/definitions/deviceDefinitionsMap';
import type { ProductUISpec } from '@/domain/device/types/productUISpec.types';
import { useMemo } from 'react';
import type { UnifiedProductSpec } from './useDeviceUISpec';
import { useDeviceUISpec } from './useDeviceUISpec';
import { useGetDeviceType } from './useGetDeviceType';

export const useDeviceUISpecByFamily = <T_Features extends Record<string, any>>(
  prodCd: string | null | undefined,
  dvcTypeCd: string | undefined,
): UnifiedProductSpec<T_Features> | undefined => {
  const { getDvcTypeRoute } = useGetDeviceType();
  const deviceFamily = getDvcTypeRoute(dvcTypeCd);

  const { definitions } = useMemo(() => {
    // Ensure the map returns a config with the correct T_Features type for definitions
    const config =
      deviceFamilyDefinitionsMap.get(deviceFamily || 'default') ||
      deviceFamilyDefinitionsMap.get('default')!;
    return { definitions: config.definitions as ProductUISpec<T_Features>[] };
  }, [deviceFamily]);

  const deviceUISpec = useDeviceUISpec<T_Features>(prodCd, definitions);

  return deviceUISpec;
};
