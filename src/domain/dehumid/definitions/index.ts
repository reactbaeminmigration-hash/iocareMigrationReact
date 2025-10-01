import type { ProductUISpec } from '@/domain/device/types/productUISpec.types';

// products/ 폴더의 각 제품별 스펙을 import 하여 배열에 추가합니다。
import type { DehumidFeatures } from '../types/features.types';
import { dehumidifierSpec } from './products/dehumidifier'; // Import the dehumid product spec

/**
 * @description 제습기 제품군 전체 UI 및 동작 정의 목록
 * 앱에서는 이 목록을 사용하여 현재 디바이스 모델에 맞는 설정을 찾습니다。
 */
// 변수명과 타입을 우리가 논의한 내용으로 수정
export const DEHUMID_PRODUCT_DEFINITIONS: ProductUISpec<DehumidFeatures>[] = [
  dehumidifierSpec,
];