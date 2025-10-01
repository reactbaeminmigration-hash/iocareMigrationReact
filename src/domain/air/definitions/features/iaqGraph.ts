import {
  IAQ_DATA_SOURCE,
  MAIN_INDICATOR,
  SENSOR_TYPE,
  THRESHOLD_PROFILE,
  VOCS_DISPLAY_RULE,
} from '../../types/features.types';

export const iaqGraphFeature = {
  iaqDataSource: IAQ_DATA_SOURCE.POLLUTION_GRADE, // Corrected value
  mainIndicator: MAIN_INDICATOR.PM10,
  thresholdProfile: THRESHOLD_PROFILE.STANDARD,
  vocsDisplayRule: VOCS_DISPLAY_RULE.GRADE_BASED, // Added property
  availableSensors: [SENSOR_TYPE.PM10, SENSOR_TYPE.PM2_5, SENSOR_TYPE.VOCS], // Added property
};
