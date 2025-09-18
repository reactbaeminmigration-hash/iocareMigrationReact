export interface AirFeatures {
  iaqDataSource: 'POLLUTION_GRADE' | 'INTEGRATED_STATUS' | 'RAW_PM25';
  mainIndicator: 'PM10' | 'PM2.5' | 'INTEGRATED';
  thresholdProfile: 'STANDARD' | 'TYPE_7' | 'MARVEL_PM25';
  vocsDisplayRule: 'GRADE_BASED' | 'VALUE_BASED';
  readonly availableSensors: ('PM1.0' | 'PM2.5' | 'PM10' | 'CO2' | 'VOCS')[];
}
