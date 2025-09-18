import type { ProductUISpec } from '@/domain/device/types/productUISpec.types';
import type { Airfeatures } from '../types/features.types';

export const defaultTabsInfo = [
  { path: '/home', label: 'BTN.HOME' },
  { path: '/report', label: 'BTN.REPORT' },
  { path: '/control', label: 'BTN.CONTROL' },
  { path: '/notice', label: 'BTN.NOTICE' },
  { path: '/settings', label: 'BTN.SETTING' },
];

export const defaultFeaturesInfo = {
  iaqRule: 'PM2.5_BASED',
} as const;

// 에어 도메인에 속하는 제품 정의 목록
export const AIR_PRODUCT_DEFINITIONS: ProductUISpec<Airfeatures>[] = [
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
        features: {},
      },
      {
        modelName: 'MARVEL_20', // 노블 20평
        productCodes: ['113826'],
        manuals: { filePath: '117' },
        features: {},
      },
      {
        modelName: 'MARVEL_30', // 노블 30평
        productCodes: ['113209'],
        manuals: { filePath: '117' },
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
        manuals: { fileName: 'Airmega300S400S.pdf' },
        features: {},
      },
    ],
  },
];
