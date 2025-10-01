import { AIR_PRODUCT_DEFINITIONS } from '@/domain/air/definitions';
import type { AirFeatures } from '@/domain/air/types/features.types';
import type {
  ProductModel,
  ProductUISpec,
} from '@/domain/device/types/productUISpec.types';
import { deepMerge } from '@/shared/utils/deepMerge';
import { useMemo } from 'react';

// 훅이 최종적으로 반환할 통합된 스펙의 타입
export type UnifiedProductSpec = Omit<ProductUISpec<AirFeatures>, 'models'> &
  ProductModel<AirFeatures>;

/**
 * prodCd를 기반으로 AIR_PRODUCT_DEFINITIONS에서 일치하는 제품 스펙을 찾아 반환합니다.
 * @param prodCd - 찾고자 하는 장치의 제품 코드
 * @returns 병합된 최종 제품 스펙 또는 null
 */
const findSpecByProductCode = (
  prodCd?: string | null,
): UnifiedProductSpec | undefined => {
  if (!prodCd) {
    return undefined;
  }

  for (const familySpec of AIR_PRODUCT_DEFINITIONS) {
    const modelSpec = familySpec.models.find((model) =>
      model.productCodes.includes(prodCd),
    );

    if (modelSpec) {
      const mergedFeatures = deepMerge(familySpec.features, modelSpec.features);

      // familySpec에서 models 속성만 제외하고 나머지를 restOfFamilySpec에 담습니다.
      const { models, ...restOfFamilySpec } = familySpec;

      // models가 제외된 객체를 사용하여 최종 스펙을 조립합니다.
      const unifiedSpec: UnifiedProductSpec = {
        ...restOfFamilySpec,
        ...modelSpec,
        features: mergedFeatures,
      };

      // 이제 delete 구문이 필요 없습니다.
      return unifiedSpec;
    }
  }

  return undefined;
};

/**
 * 현재 제품 코드에 맞는 완전한 UI/기능 스펙을 찾아 반환하는 훅
 * @param prodCd - 현재 장치의 제품 코드
 */
export const useDeviceUISpec = (
  prodCd: string | null | undefined,
): UnifiedProductSpec | undefined => {
  const spec = useMemo(() => findSpecByProductCode(prodCd), [prodCd]);
  return spec;
};
