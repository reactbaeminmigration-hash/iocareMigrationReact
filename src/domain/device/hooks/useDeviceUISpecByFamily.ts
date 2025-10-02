import { deviceFamilyDefinitionsMap } from '@/domain/device/definitions/deviceDefinitionsMap';
import type { ProductUISpec } from '@/domain/device/types/productUISpec.types';
import { useMemo } from 'react';
import type { UnifiedProductSpec } from './useDeviceUISpec';
import { useDeviceUISpec } from './useDeviceUISpec';

export const useDeviceUISpecByFamily = <T_Features extends Record<string, any>>(
  prodCd: string | null | undefined,
  familyId: string | undefined,
): UnifiedProductSpec<T_Features> | undefined => {
  const { definitions } = useMemo(() => {
    // familyId = "01": "청정기", "02": "정수기","03": "비데","04": "제습기","05": "가습기","06": "매트리스"
    const config =
      deviceFamilyDefinitionsMap.get(familyId || 'default') ||
      deviceFamilyDefinitionsMap.get('default')!;
    return { definitions: config.definitions as ProductUISpec<T_Features>[] };
  }, [familyId]);

  const deviceUISpec = useDeviceUISpec<T_Features>(prodCd, definitions);

  return deviceUISpec;
};
