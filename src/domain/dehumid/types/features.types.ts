export interface DehumidFeatures {
  home?: {
    humidityGraph?: {
      humidityDataSource: (typeof HUMIDITY_DATA_SOURCE)[keyof typeof HUMIDITY_DATA_SOURCE];
      mainIndicator: (typeof HUMIDITY_INDICATOR)[keyof typeof HUMIDITY_INDICATOR];
      thresholdProfile: (typeof THRESHOLD_PROFILE)[keyof typeof THRESHOLD_PROFILE];
    };
  };
}

export const HUMIDITY_DATA_SOURCE = {
  RELATIVE_HUMIDITY: 'RELATIVE_HUMIDITY',
  ABSOLUTE_HUMIDITY: 'ABSOLUTE_HUMIDITY',
} as const;

export const HUMIDITY_INDICATOR = {
  RELATIVE_HUMIDITY: 'RELATIVE_HUMIDITY',
  ABSOLUTE_HUMIDITY: 'ABSOLUTE_HUMIDITY',
} as const;

export const THRESHOLD_PROFILE = {
  STANDARD: 'STANDARD',
  CUSTOM: 'CUSTOM',
} as const;
