export interface WaterHomeSectionHeaderProps {
  title: string;
  buttonText: string;
  onButtonClick: () => void;
}

export interface WaterFeatures {
  home?: {
    waterQualityGraph?: {
      waterDataSource: typeof WATER_DATA_SOURCE[keyof typeof WATER_DATA_SOURCE];
      mainIndicator: typeof WATER_INDICATOR[keyof typeof WATER_INDICATOR];
      thresholdProfile: typeof THRESHOLD_PROFILE[keyof typeof THRESHOLD_PROFILE];
    };
  };
}

export const WATER_DATA_SOURCE = {
  TDS: 'TDS',
  PH: 'PH',
} as const;

export const WATER_INDICATOR = {
  TDS: 'TDS',
  PH: 'PH',
} as const;

export const THRESHOLD_PROFILE = {
  STANDARD: 'STANDARD',
  CUSTOM: 'CUSTOM',
} as const;