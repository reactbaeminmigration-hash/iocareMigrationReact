import type { ProductUISpec } from '@/domain/device/types/productUISpec.types';
import type { WaterFeatures } from '../types/features.types';

export const defaultTabsInfo = [
  { path: '/home', label: 'BTN.HOME' },
  { path: '/report', label: 'BTN.REPORT' },
  { path: '/control', label: 'BTN.CONTROL' },
  { path: '/notice', label: 'BTN.NOTICE' },
  { path: '/settings', label: 'BTN.SETTING' },
];

// 워터 도메인에 속하는 제품 정의 목록
export const WATER_PRODUCT_DEFINITIONS: ProductUISpec<WaterFeatures>[] = [
  {
    family: 'HIDDEN',
    region: 'KR',
    tabs: defaultTabsInfo,
    features: {},
    models: [
      {
        modelName: 'HIDDEN_B',
        productCodes: [
          '113232',
          '113233',
          '113337',
          '113343',
          '113338',
          '113344',
          '113339',
          '113345',
          '113340',
          '113346',
          '113341',
          '113347',
          '113834',
          '113937',
        ],
        manuals: { filePath: '181' },
        features: {},
      },
    ],
  },
  {
    family: 'ICON_20',
    region: 'KR',
    tabs: defaultTabsInfo,
    features: {},
    models: [
      {
        modelName: 'ICON 2.0',
        productCodes: ['113417'],
        manuals: { filePath: '181' },
        features: {},
      },
    ],
  },
  {
    family: 'ELITE',
    region: 'KR',
    tabs: defaultTabsInfo,
    features: {},
    models: [
      {
        modelName: 'ELITE',
        productCodes: ['112379'],
        manuals: { fileName: 'CHP-482L.pdf' },
        features: {},
      },
    ],
  },
];
