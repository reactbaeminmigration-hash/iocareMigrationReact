import {
  defaultContextValue,
  type DeviceContextType,
} from '@/app/contexts/DeviceContext.types';
import { defaultTabsInfo } from '@/domain/air/definitions/common/defaultTabsInfo'; // 변경됨
import type { DeviceInfo } from '@/domain/device/types/device.types';
import type { FoundProductUISpec } from '@/domain/device/types/productUISpec.types'; // 추가
import { findProductUISpecByCode } from '@/domain/device/utils/findProductUISpec.utils'; // 추가
import type { ITab } from '@/shared/components/Layout/LayoutTab';
import type { TranslationKey } from '@/shared/types/common';
import type { IndexedObject } from '@/shared/utils/deepMerge'; // 추가
import { useMemo } from 'react';
import { useDeviceCategory } from './useDeviceCategory';
import { useDeviceStandInfo } from './useDeviceStandInfo';
import { useDeviceUISpec } from './useDeviceUISpec';

export const useUnifiedDeviceData = (
  deviceState: DeviceInfo | null,
): DeviceContextType<IndexedObject> => {
  // 타입 변경
  const prodCd = deviceState?.prodCd;

  // productData를 useUnifiedDeviceData 내에서 직접 가져옵니다.
  const productData: FoundProductUISpec<IndexedObject> | undefined = useMemo(
    () => (prodCd ? findProductUISpecByCode<IndexedObject>(prodCd) : undefined),
    [prodCd],
  );

  const deviceUISpec = useDeviceUISpec(prodCd); // useDeviceUISpec은 AirUIConfigSpec을 반환
  const deviceStandInfo = useDeviceStandInfo(prodCd);
  const deviceCategory = useDeviceCategory(prodCd);

  // 2. 최종 데이터를 조립합니다.
  const unifiedData = useMemo((): DeviceContextType<IndexedObject> => {
    // 타입 변경
    if (!deviceState) {
      return defaultContextValue;
    }

    // tabs는 productData에서 가져오고, 없으면 defaultTabsInfo 사용
    const productTabs = productData?.tabs ?? defaultTabsInfo;
    const tabs: readonly ITab[] = productTabs.map((tab) => ({
      path: tab.path,
      label: tab.label as TranslationKey,
    }));

    return {
      tabs,
      deviceState,
      deviceUISpec,
      deviceStandInfo,
      deviceCategory,
    };
  }, [deviceState, deviceUISpec, deviceStandInfo, deviceCategory, productData]); // productData 의존성 추가

  return unifiedData;
};
