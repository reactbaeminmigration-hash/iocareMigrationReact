import type { ProductUISpec } from '@/domain/device/types/productUISpec.types';
import type { DehumidFeatures } from '../types/features.types';

export const defaultTabsInfo = [
  { path: '/home', label: 'BTN.HOME' },
  { path: '/report', label: 'BTN.REPORT' },
  { path: '/control', label: 'BTN.CONTROL' },
  { path: '/notice', label: 'BTN.NOTICE' },
  { path: '/settings', label: 'BTN.SETTING' },
];

// 제습기에 속하는 제품 정의 목록
export const DEHUMID_PRODUCT_DEFINITIONS: ProductUISpec<DehumidFeatures>[] = [
  {
    family: 'NOBLE',
    region: 'KR',
    tabs: defaultTabsInfo,
    features: {}, // 추가
    models: [
      {
        modelName: 'NOBLEAD', // 노블 15평
        productCodes: ['113260'],
        manuals: { filePath: '196' },
        features: {},
      },
    ],
  },
];
