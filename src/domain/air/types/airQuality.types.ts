/**
 * 메인 공기질 표시에 필요한 모든 정보를 담는 결과 타입
 */
export interface IaqDisplayInfo {
  i18nKey: 'WEATHER.GOOD' | 'WEATHER.NORMAL' | 'WEATHER.BAD' | 'WEATHER.VERY_BAD' | 'WEATHER.UNKNOWN';
  className: string;
  value: string;
  unit: string;
}

/**
 * 개별 센서 텍스트 상태의 결과 타입을 정의합니다.
 */
export interface SensorStatusResult {
  i18nKey: 'WEATHER.GOOD' | 'WEATHER.NORMAL' | 'WEATHER.BAD' | 'WEATHER.VERY_BAD' | 'WEATHER.UNKNOWN';
  className: string;
}
