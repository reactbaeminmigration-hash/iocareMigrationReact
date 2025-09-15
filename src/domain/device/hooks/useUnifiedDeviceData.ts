import {
  type DeviceContextType,
  defaultContextValue,
} from '@/app/contexts/DeviceContext.types';
import { defaultTabsInfo } from '@/domain/air/constants/airDefinitions';
import type { DeviceInfo } from '@/domain/device/types/device.types';
import type { ITab } from '@/shared/components/Layout/LayoutTab';
import type { TranslationKey } from '@/shared/types/common';
import { useMemo } from 'react';
import { useDeviceCategory } from './useDeviceCategory';
import { useDeviceStandInfo } from './useDeviceStandInfo';
import { useDeviceUISpec } from './useDeviceUISpec';

export const useUnifiedDeviceData = (
  deviceState: DeviceInfo | null,
): DeviceContextType => {
  const prodCd = deviceState?.prodCd;

  const deviceUISpec = useDeviceUISpec(prodCd);
  const deviceStandInfo = useDeviceStandInfo(prodCd);
  const deviceCategory = useDeviceCategory(prodCd);

  // 2. 최종 데이터를 조립합니다.
  const unifiedData = useMemo((): DeviceContextType => {
    if (!deviceState) {
      return defaultContextValue;
    }

    const productTabs = deviceUISpec?.tabs ?? defaultTabsInfo;
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
  }, [deviceState, deviceUISpec, deviceStandInfo, deviceCategory]);

  return unifiedData;
};
