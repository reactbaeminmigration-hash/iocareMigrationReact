export const IAQ_DATA_SOURCE = {
  RAW_PM25: 'RAW_PM25',
  POLLUTION_GRADE: 'POLLUTION_GRADE',
  INTEGRATED_STATUS: 'INTEGRATED_STATUS',
} as const;

export const MAIN_INDICATOR = {
  PM10: 'PM10',
  PM2_5: 'PM2.5',
  INTEGRATED: 'INTEGRATED',
} as const;

export const THRESHOLD_PROFILE = {
  STANDARD: 'STANDARD',
  TYPE_7: 'TYPE_7',
  MARVEL_PM25: 'MARVEL_PM25',
} as const;

export const VOCS_DISPLAY_RULE = {
  GRADE_BASED: 'GRADE_BASED',
  VALUE_BASED: 'VALUE_BASED',
} as const;

export const SENSOR_TYPE = {
  PM1_0: 'PM1.0',
  PM2_5: 'PM2.5',
  PM10: 'PM10',
  CO2: 'CO2',
  VOCS: 'VOCS',
} as const;

type IaqDataSource = (typeof IAQ_DATA_SOURCE)[keyof typeof IAQ_DATA_SOURCE];
type MainIndicator = (typeof MAIN_INDICATOR)[keyof typeof MAIN_INDICATOR];
type ThresholdProfile =
  (typeof THRESHOLD_PROFILE)[keyof typeof THRESHOLD_PROFILE];
type VocsDisplayRule =
  (typeof VOCS_DISPLAY_RULE)[keyof typeof VOCS_DISPLAY_RULE];
type SensorType = (typeof SENSOR_TYPE)[keyof typeof SENSOR_TYPE];

export interface AirFeatures {
  home: {
    iaqGraph: {
      iaqDataSource: IaqDataSource; // 실내공기질 데이터
      mainIndicator: MainIndicator; // 실내공기질 표기
      thresholdProfile: ThresholdProfile; // 실내공기질 단계
      vocsDisplayRule: VocsDisplayRule;
      readonly availableSensors: SensorType[];
    };
  };
}
