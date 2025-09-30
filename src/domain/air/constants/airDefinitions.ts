import { defaultTabsInfo } from '@/domain/air/definitions/common/defaultTabsInfo'; // 다시 추가
import { iaqGraphFeature } from '@/domain/air/definitions/features/iaqGraph'; // 추가
import type { ProductUISpec } from '@/domain/device/types/productUISpec.types';
import {
  IAQ_DATA_SOURCE,
  MAIN_INDICATOR,
  THRESHOLD_PROFILE,
  type AirFeatures,
} from '../types/features.types';

export const defaultFeaturesInfo: AirFeatures = {
  home: {
    iaqGraph: iaqGraphFeature, // iaqGraphFeature 참조
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
    tabs: defaultTabsInfo, // 다시 추가
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
