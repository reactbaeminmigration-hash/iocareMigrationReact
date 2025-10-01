import {
  defaultContextValue,
  type DeviceContextType,
} from '@/app/contexts/DeviceContext.types';
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

  // 1. 리팩토링된 훅을 통해 스펙 정보를 한번만 가져옵니다.
  const deviceUISpec = useDeviceUISpec(prodCd);

  // 나머지 훅들은 그대로 사용합니다.
  const deviceStandInfo = useDeviceStandInfo(prodCd);
  const deviceCategory = useDeviceCategory(prodCd);

  // 2. 최종 데이터를 조립합니다.
  const unifiedData = useMemo((): DeviceContextType => {
    // 스펙 정보가 없으면 기본값을 반환합니다.
    if (!deviceState || !deviceUISpec) {
      return defaultContextValue;
    }

    // 탭 정보를 스펙 객체에서 직접 가져옵니다.
    const tabs: readonly ITab[] = deviceUISpec.tabs.map((tab) => ({
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
