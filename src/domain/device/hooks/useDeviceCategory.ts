import { defaultContextValue } from '@/app/contexts/DeviceContext.types';
import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import type { CategoryItem } from '@/domain/device/types/common.types';
import { useMemo } from 'react';

export const useDeviceCategory = (
  prodCd: string | null | undefined,
): CategoryItem => {
  const { categoryInfo } = useDeviceStore();
  return useMemo(() => {
    if (!prodCd || !categoryInfo?.categories)
      return defaultContextValue.deviceCategory;
    const foundCategory = categoryInfo.categories.find(
      (c) => c.makrModelCode === prodCd,
    );
    if (!foundCategory) {
      return defaultContextValue.deviceCategory;
    }

    return {
      ...foundCategory,
      imageUrl: categoryInfo.imageUrl,
    };
  }, [prodCd, categoryInfo]);
};
