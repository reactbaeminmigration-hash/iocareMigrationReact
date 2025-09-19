import type { ProductUISpec } from '@/domain/device/types/productUISpec.types';
import type { AirFeatures } from '../types/features.types';
import {
  IAQ_DATA_SOURCE,
  MAIN_INDICATOR,
  SENSOR_TYPE,
  THRESHOLD_PROFILE,
  VOCS_DISPLAY_RULE,
} from '../types/features.types';

export const defaultTabsInfo = [
  { path: '/home', label: 'BTN.HOME' },
  { path: '/report', label: 'BTN.REPORT' },
  { path: '/control', label: 'BTN.CONTROL' },
  { path: '/notice', label: 'BTN.NOTICE' },
  { path: '/settings', label: 'BTN.SETTING' },
];

// defaultFeaturesInfo 객체에 AirFeatures 타입을 명시적으로 지정합니다.
export const defaultFeaturesInfo: AirFeatures = {
  home: {
    iaqGraph: {
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
    },
  },
};

// 에어 도메인에 속하는 제품 정의 목록
export const AIR_PRODUCT_DEFINITIONS: ProductUISpec<AirFeatures>[] = [
  {
    family: 'MARVEL',
    region: 'KR',
    tabs: defaultTabsInfo,
    features: defaultFeaturesInfo,
    models: [
      {
        modelName: 'MARVEL_15', // 노블 15평
        productCodes: ['113182', '113218'],
        manuals: { type: 'filePath', value: '117' },
        features: {},
      },
      {
        modelName: 'MARVEL_20', // 노블 20평
        productCodes: ['113826'],
        manuals: { type: 'filePath', value: '117' },
        features: {},
      },
      {
        modelName: 'MARVEL_30', // 노블 30평
        productCodes: ['113209'],
        manuals: { type: 'filePath', value: '117' },
        features: {},
      },
    ],
  },
  {
    family: 'AIRMEGA',
    region: 'US',
    tabs: defaultTabsInfo,
    features: defaultFeaturesInfo,
    models: [
      {
        modelName: 'AIRMEGA_400S',
        productCodes: ['111012', '112571'],
        manuals: { type: 'fileName', value: 'Airmega300S400S.pdf' },
        features: {
          home: {
            iaqGraph: {
              iaqDataSource: IAQ_DATA_SOURCE.POLLUTION_GRADE, // 실내공기질 데이터
              mainIndicator: MAIN_INDICATOR.PM2_5, // 실내공기질 표기
              thresholdProfile: THRESHOLD_PROFILE.STANDARD, // 실내공기질 단계
            },
          },
        },
      },
    ],
  },
];
