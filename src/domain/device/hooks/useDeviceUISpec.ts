import type {
  ProductModel,
  ProductUISpec,
} from '@/domain/device/types/productUISpec.types';
import { deepMerge } from '@/shared/utils/deepMerge';
import { useMemo } from 'react';

// 훅이 최종적으로 반환할 통합된 스펙의 타입
export type UnifiedProductSpec<T_Features extends Record<string, any>> = Omit<ProductUISpec<T_Features>, 'models'> &
  ProductModel<T_Features>;

/**
 * prodCd를 기반으로 제품 정의 배열에서 일치하는 제품 스펙을 찾아 반환합니다.
 * @param prodCd - 찾고자 하는 장치의 제품 코드
 * @param definitions - 검색할 제품 정의 배열
 * @returns 병합된 최종 제품 스펙 또는 undefined
 */
const findSpecByProductCode = <T_Features extends Record<string, any>>(
  prodCd: string | null | undefined,
  definitions: ProductUISpec<T_Features>[],
): UnifiedProductSpec<T_Features> | undefined => {
  if (!prodCd) {
    return undefined;
  }

  for (const familySpec of definitions) {
    const modelSpec = familySpec.models.find((model) =>
      model.productCodes.includes(prodCd),
    );

    if (modelSpec) {
      const mergedFeatures = deepMerge(familySpec.features, modelSpec.features);

      // familySpec에서 models 속성만 제외하고 나머지를 restOfFamilySpec에 담습니다.
      const { models, ...restOfFamilySpec } = familySpec;

      // models가 제외된 객체를 사용하여 최종 스펙을 조립합니다.
      const unifiedSpec: UnifiedProductSpec<T_Features> = {
        ...restOfFamilySpec,
        ...modelSpec,
        features: mergedFeatures,
      };

      return unifiedSpec;
    }
  }

  return undefined;
};

/**
 * 현재 제품 코드에 맞는 완전한 UI/기능 스펙을 찾아 반환하는 훅
 * @param prodCd - 현재 장치의 제품 코드
 * @param definitions - 검색할 제품 정의 배열
 */
export const useDeviceUISpec = <T_Features extends Record<string, any>>(
  prodCd: string | null | undefined,
  definitions: ProductUISpec<T_Features>[],
): UnifiedProductSpec<T_Features> | undefined => {
  const spec = useMemo(() => findSpecByProductCode<T_Features>(prodCd, definitions), [prodCd, definitions]);
  return spec;
};
