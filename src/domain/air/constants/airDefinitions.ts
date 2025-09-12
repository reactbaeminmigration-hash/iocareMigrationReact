import type { ProductUISpec } from '@/domain/device/types/productUISpec.types';

export const defaultTabsInfo = [
  { path: '/home', label: 'BTN.HOME' },
  { path: '/report', label: 'BTN.REPORT' },
  { path: '/control', label: 'BTN.CONTROL' },
  { path: '/notice', label: 'BTN.NOTICE' },
  { path: '/settings', label: 'BTN.SETTING' },
];

// 에어 도메인에 속하는 제품 정의 목록
export const AIR_PRODUCT_DEFINITIONS: ProductUISpec[] = [
  {
    family: 'MARVEL',
    region: 'KR',
    tabs: defaultTabsInfo,
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
