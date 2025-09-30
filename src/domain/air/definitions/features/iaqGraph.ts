import {
  IAQ_DATA_SOURCE,
  MAIN_INDICATOR,
  SENSOR_TYPE,
  THRESHOLD_PROFILE,
  VOCS_DISPLAY_RULE,
} from '@/domain/air/types/features.types';

// AirFeatures.home.iaqGraph 타입에 맞는 구조
export const iaqGraphFeature = {
  iaqDataSource: IAQ_DATA_SOURCE.RAW_PM25, // 실내공기질 데이터
  mainIndicator: MAIN_INDICATOR.PM2_5, // 실내공기질 표기
  thresholdProfile: THRESHOLD_PROFILE.MARVEL_PM25, // 실내공기질 단계
  vocsDisplayRule: VOCS_DISPLAY_RULE.GRADE_BASED,
  availableSensors: [
    SENSOR_TYPE.PM1_0,
    SENSOR_TYPE.PM2_5,
    SENSOR_TYPE.PM10,
    SENSOR_TYPE.CO2,
    SENSOR_TYPE.VOCS,
  ],
};
