import { AIR_UI_CONFIGURATIONS } from '@/domain/air/definitions'; // 우리가 정의한 UI 스펙 목록 임포트
import type { AirUIConfigSpec } from '@/domain/air/definitions/types'; // 우리가 정의한 UI 스펙 타입 임포트
// import type { AirFeatures } from '@/domain/air/types/features.types'; // 제거
import type { FoundProductUISpec } from '@/domain/device/types/productUISpec.types'; // 기존 제품 데이터 타입
import { findProductUISpecByCode } from '@/domain/device/utils/findProductUISpec.utils';
import type { IndexedObject } from '@/shared/utils/deepMerge';
import { useMemo } from 'react';

// 훅의 반환 타입을 AirUIConfigSpec으로 변경합니다.
export const useDeviceUISpec = <T_Features extends IndexedObject>( // T_Features 제네릭 다시 추가
  prodCd: string | null | undefined,
): AirUIConfigSpec<any, T_Features> | undefined => {
  // 반환 타입 변경
  return useMemo(() => {
    if (!prodCd) {
      return undefined; // prodCd가 없으면 UI 스펙을 찾을 수 없음
    }

    // 1. prodCd를 사용하여 기존 '제품 데이터'를 찾습니다.
    const productData: FoundProductUISpec<T_Features> | undefined =
      findProductUISpecByCode<T_Features>(prodCd);

    if (!productData || !productData.model.modelName || !productData.family) {
      return undefined; // 제품 데이터, 모델명, 또는 제품군 정보가 없으면 UI 스펙을 찾을 수 없음
    }

    const deviceModelName = productData.model.modelName;
    const deviceFamily = productData.family; // 제품군 정보 (예: 'MARVEL')

    // 2. '제품 데이터'의 modelName을 사용하여 'UI 설정 목록'에서 UI 스펙을 찾습니다.
    // 2-1. prodCd를 직접 키로 사용하여 UI 스펙을 찾습니다. (최우선)
    const prodCdUISpec = AIR_UI_CONFIGURATIONS.find(
      (spec) => spec.model === prodCd,
    );
    if (prodCdUISpec) {
      return prodCdUISpec as AirUIConfigSpec<any, T_Features>;
    }

    // 2-2. 정확히 일치하는 모델명으로 UI 스펙을 찾습니다.
    const exactMatchUISpec = AIR_UI_CONFIGURATIONS.find(
      (spec) => spec.model === deviceModelName,
    );
    if (exactMatchUISpec) {
      return exactMatchUISpec as AirUIConfigSpec<any, T_Features>;
    }

    // 2-3. 정확히 일치하는 스펙이 없으면, 제품군(family) 기본 스펙을 찾습니다.
    const familyUISpec = AIR_UI_CONFIGURATIONS.find(
      (spec) => spec.model === `${deviceFamily}_FAMILY`,
    );

    if (familyUISpec) {
      return familyUISpec as AirUIConfigSpec<any, T_Features>;
    }

    return undefined; // 일치하는 UI 스펙을 찾지 못함
  }, [prodCd]); // prodCd가 변경될 때만 재계산
};
