import type { AirFeatures } from '../types/features.types';
import type { IaqDisplayInfo, SensorStatusResult } from '../types/airQuality.types';

// 메인 상태 표시를 위한 상태/클래스 맵
const MAIN_STATUS_MAP = {
  GOOD: { i18nKey: 'WEATHER.GOOD', className: 'cw_good' },
  NORMAL: { i18nKey: 'WEATHER.NORMAL', className: 'cw_normal' },
  BAD: { i18nKey: 'WEATHER.BAD', className: 'cw_bad' },
  VERY_BAD: { i18nKey: 'WEATHER.VERY_BAD', className: 'cw_verybad' },
  UNKNOWN: { i18nKey: 'WEATHER.UNKNOWN', className: 'cw_unknown' },
} as const;

// 텍스트 표시를 위한 상태/클래스 맵
const TEXT_STATUS_MAP = {
  GOOD: { i18nKey: 'WEATHER.GOOD', className: 'cw_txt_good' },
  NORMAL: { i18nKey: 'WEATHER.NORMAL', className: 'cw_txt_normal' },
  BAD: { i18nKey: 'WEATHER.BAD', className: 'cw_txt_bad' },
  VERY_BAD: { i18nKey: 'WEATHER.VERY_BAD', className: 'cw_txt_verybad' },
  UNKNOWN: { i18nKey: 'WEATHER.UNKNOWN', className: 'cw_txt_unknown' },
} as const;

// 레거시 코드에 있던 기준값들을 상수로 정의
const THRESHOLD_SETS = {
  STANDARD: { good: 25, normal: 50, bad: 75 },
  TYPE_7: { good: 34, bad: 66 }, // 3단계 기준
  MARVEL_PM25: { good: 15, normal: 35, bad: 75 },
};

// '먼지오염도' 등급을 숫자 값으로 변환하는 내부 헬퍼
const mapGradeToValue = (grade?: string | null): number => {
  if (grade === '1') return 12;
  if (grade === '2') return 37;
  if (grade === '3') return 62;
  if (grade === '4') return 87;
  return -1; // 알 수 없는 등급일 경우 -1 반환
};

/**
 * 제품의 features와 API 데이터를 기반으로 메인 실내 공기질 상태와 값, 단위를 결정합니다.
 * @param features - 제품의 정교화된 AirFeatures 객체
 * @param apiData - API로부터 받은 데이터 (iaq, prodStatus 포함)
 * @returns IaqDisplayInfo 객체
 */
export const getIaqStatus = (
  features: AirFeatures,
  apiData: { iaq?: any; prodStatus?: any },
): IaqDisplayInfo => {
  let primaryValue = -1;

  // 1. features.iaqDataSource를 보고 어떤 값을 사용할지 결정
  switch (features.iaqDataSource) {
    case 'POLLUTION_GRADE':
      primaryValue = mapGradeToValue(apiData.prodStatus?.dustPollution);
      break;
    case 'RAW_PM25':
      primaryValue = apiData.iaq?.dustpm25 ? parseInt(apiData.iaq.dustpm25, 10) : -1;
      break;
    case 'INTEGRATED_STATUS':
      primaryValue = apiData.iaq?.inairquality ? parseInt(apiData.iaq.inairquality, 10) : -1;
      break;
  }

  // 2. 표시할 값과 단위를 결정 (기존 getMainIndicator 로직)
  let displayValue = '--';
  let displayUnit = '';
  switch (features.mainIndicator) {
    case 'PM10':
      displayValue = apiData.iaq?.dustpm10 ?? '--';
      displayUnit = 'μg/m³';
      break;
    case 'PM2.5':
      displayValue = apiData.iaq?.dustpm25 ?? '--';
      displayUnit = 'μg/m³';
      break;
    case 'INTEGRATED':
      displayValue = apiData.iaq?.inairquality ?? '--';
      break;
  }

  if (isNaN(primaryValue) || primaryValue < 0) {
    return { ...MAIN_STATUS_MAP.UNKNOWN, value: displayValue, unit: displayUnit };
  }

  // 3. features.thresholdProfile을 보고 어떤 기준을 적용할지 결정
  const thresholds = THRESHOLD_SETS[features.thresholdProfile];

  // 4. 기준에 따라 상태 결정
  if ('normal' in thresholds) {
    if (primaryValue <= thresholds.good) return { ...MAIN_STATUS_MAP.GOOD, value: displayValue, unit: displayUnit };
    if (primaryValue <= thresholds.normal) return { ...MAIN_STATUS_MAP.NORMAL, value: displayValue, unit: displayUnit };
    if (primaryValue <= thresholds.bad) return { ...MAIN_STATUS_MAP.BAD, value: displayValue, unit: displayUnit };
    return { ...MAIN_STATUS_MAP.VERY_BAD, value: displayValue, unit: displayUnit };
  } else {
    if (primaryValue <= thresholds.good) return { ...MAIN_STATUS_MAP.GOOD, value: displayValue, unit: displayUnit };
    if (primaryValue <= thresholds.bad) return { ...MAIN_STATUS_MAP.BAD, value: displayValue, unit: displayUnit };
    return { ...MAIN_STATUS_MAP.VERY_BAD, value: displayValue, unit: displayUnit };
  }
};

/**
 * 초미세먼지(PM2.5) 수치를 기반으로 텍스트 상태 객체를 반환합니다.
 * @param pm25Value - API로부터 받은 초미세먼지 문자열 값
 * @returns SensorStatusResult 객체 (className: cw_txt_good 등)
 */
export const getPm25Status = (pm25Value?: string | null): SensorStatusResult => {
  const value = pm25Value ? parseInt(pm25Value, 10) : -1;
  if (isNaN(value) || value < 0) return TEXT_STATUS_MAP.UNKNOWN;

  if (value <= 15) return TEXT_STATUS_MAP.GOOD;
  if (value <= 35) return TEXT_STATUS_MAP.NORMAL;
  if (value <= 75) return TEXT_STATUS_MAP.BAD;
  return TEXT_STATUS_MAP.VERY_BAD;
};

/**
 * 미세먼지(PM10) 수치를 기반으로 텍스트 상태 객체를 반환합니다.
 * @param pm10Value - API로부터 받은 미세먼지 문자열 값
 * @returns SensorStatusResult 객체 (className: cw_txt_good 등)
 */
export const getPm10Status = (pm10Value?: string | null): SensorStatusResult => {
  const value = pm10Value ? parseInt(pm10Value, 10) : -1;
  if (isNaN(value) || value < 0) return TEXT_STATUS_MAP.UNKNOWN;

  if (value <= 30) return TEXT_STATUS_MAP.GOOD;
  if (value <= 80) return TEXT_STATUS_MAP.NORMAL;
  if (value <= 150) return TEXT_STATUS_MAP.BAD;
  return TEXT_STATUS_MAP.VERY_BAD;
};

/**
 * 이산화탄소(CO2) 수치를 기반으로 텍스트 상태 객체를 반환합니다.
 * @param co2Value - API로부터 받은 이산화탄소 문자열 값
 * @returns SensorStatusResult 객체 (className: cw_txt_good 등)
 */
export const getCo2Status = (co2Value?: string | null): SensorStatusResult => {
  const value = co2Value ? parseInt(co2Value, 10) : -1;
  if (isNaN(value) || value < 0) return TEXT_STATUS_MAP.UNKNOWN;

  if (value <= 450) return TEXT_STATUS_MAP.GOOD;
  if (value <= 1000) return TEXT_STATUS_MAP.NORMAL;
  if (value <= 3000) return TEXT_STATUS_MAP.BAD;
  return TEXT_STATUS_MAP.VERY_BAD;
};

/**
 * 생활가스(VOCs)를 기반으로 텍스트 상태 객체를 반환합니다.
 * @param rule - 'GRADE_BASED' | 'VALUE_BASED'
 * @param vocsValue - API로부터 받은 vocs 수치 문자열 값
 * @param vocsGrade - API로부터 받은 vocs 등급 문자열 값
 * @returns SensorStatusResult 객체 (className: cw_txt_good 등)
 */
export const getVocsStatus = (
  rule: 'GRADE_BASED' | 'VALUE_BASED',
  vocsValue?: string | null,
  vocsGrade?: string | null,
): SensorStatusResult => {
  if (rule === 'GRADE_BASED') {
    if (vocsGrade === '1') return TEXT_STATUS_MAP.GOOD;
    if (vocsGrade === '2') return TEXT_STATUS_MAP.NORMAL;
    if (vocsGrade === '3') return TEXT_STATUS_MAP.BAD;
    if (vocsGrade === '4') return TEXT_STATUS_MAP.VERY_BAD;
    return TEXT_STATUS_MAP.UNKNOWN;
  }

  const value = vocsValue ? parseInt(vocsValue, 10) : -1;
  if (isNaN(value) || value < 0) return TEXT_STATUS_MAP.UNKNOWN;

  if (value <= 55) return TEXT_STATUS_MAP.GOOD;
  if (value <= 78) return TEXT_STATUS_MAP.NORMAL;
  if (value <= 87) return TEXT_STATUS_MAP.BAD;
  return TEXT_STATUS_MAP.VERY_BAD;
};
