// src/domain/air/definitions/index.ts
import type { AirUIConfigSpec } from './types';

// 각기 다른 제네릭 타입을 가진 AirUIConfigSpec을 모두 담을 수 있는 공용 타입
type AnyAirUIConfigSpec = AirUIConfigSpec<string, Record<string, unknown>>;

// products/ 폴더의 각 제품별 스펙을 import 하여 배열에 추가합니다.
import { marvelSpec } from './products/marvel';
// import { airmegaSpec } from './products/airmega';

/**
 * @description 공기청정기 제품군 전체 UI 설정 목록
 * 앱에서는 이 목록을 사용하여 현재 디바이스 모델에 맞는 UI 설정을 찾습니다.
 */
export const AIR_UI_CONFIGURATIONS: AnyAirUIConfigSpec[] = [
  marvelSpec,
  // airmegaSpec,
];
