export interface AirFeatures {
  iaqDataSource: 'POLLUTION_GRADE' | 'INTEGRATED_STATUS' | 'RAW_PM25'; // 실외공기질 데이터
  mainIndicator: 'PM10' | 'PM2.5' | 'INTEGRATED'; // 실외공기질 표기
  thresholdProfile: 'STANDARD' | 'TYPE_7' | 'MARVEL_PM25'; // 실외공기질 단계
  vocsDisplayRule: 'GRADE_BASED' | 'VALUE_BASED';
  readonly availableSensors: ('PM1.0' | 'PM2.5' | 'PM10' | 'CO2' | 'VOCS')[];
}
