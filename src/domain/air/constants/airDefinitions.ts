import type { ProductUISpec } from '@/domain/device/types/productUISpec.types';
import type { AirFeatures } from '../types/features.types';

export const defaultTabsInfo = [
  { path: '/home', label: 'BTN.HOME' },
  { path: '/report', label: 'BTN.REPORT' },
  { path: '/control', label: 'BTN.CONTROL' },
  { path: '/notice', label: 'BTN.NOTICE' },
  { path: '/settings', label: 'BTN.SETTING' },
];

// defaultFeaturesInfo 객체에 AirFeatures 타입을 명시적으로 지정합니다.
export const defaultFeaturesInfo: AirFeatures = {
  iaqDataSource: 'RAW_PM25',
  mainIndicator: 'PM10', // 쉼표로 수정
  thresholdProfile: 'STANDARD',
  vocsDisplayRule: 'GRADE_BASED',
  availableSensors: ['PM1.0', 'PM2.5', 'PM10', 'CO2', 'VOCS'],
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
        manuals: { filePath: '117' },
        features: {
          thresholdProfile: 'MARVEL_PM25',
        },
      },
      {
        modelName: 'MARVEL_20', // 노블 20평
        productCodes: ['113826'],
        manuals: { filePath: '117' },
        features: {
          thresholdProfile: 'MARVEL_PM25',
        },
      },
      {
        modelName: 'MARVEL_30', // 노블 30평
        productCodes: ['113209'],
        manuals: { filePath: '117' },
        features: {
          thresholdProfile: 'MARVEL_PM25',
        },
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
        manuals: { fileName: 'Airmega300S400S.pdf' },
        features: {},
      },
    ],
  },
];
