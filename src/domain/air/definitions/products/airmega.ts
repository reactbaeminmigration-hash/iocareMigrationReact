import type { ProductUISpec } from '@/domain/device/types/productUISpec.types';
import type { AirFeatures } from '../../types/features.types';
import {
  IAQ_DATA_SOURCE,
  MAIN_INDICATOR,
  THRESHOLD_PROFILE,
} from '../../types/features.types';
import { defaultFeaturesInfo } from '../common/defaultFeaturesInfo';
import { defaultTabsInfo } from '../common/defaultTabsInfo';

export const airmegaSpec: ProductUISpec<AirFeatures> = {
  family: 'AIRMEGA',
  region: 'US',
  tabs: defaultTabsInfo,
  features: {
    ...defaultFeaturesInfo,
    // showAutoModeGuide: true, // Marvel 특화 기능
  },
  pages: {}, // 요청하신 대로 pages는 빈 객체로 둡니다.
  models: [
    {
      modelName: 'AIRMEGA_400S',
      productCodes: ['111012', '112571'],
      manuals: { fileName: 'Airmega300S400S.pdf' },
      features: {
        home: {
          iaqGraph: {
            iaqDataSource: IAQ_DATA_SOURCE.POLLUTION_GRADE,
            mainIndicator: MAIN_INDICATOR.PM2_5,
            thresholdProfile: THRESHOLD_PROFILE.STANDARD,
          },
        },
      },
    },
    {
      modelName: 'HIDDEN_B',
      productCodes: ['HIDDEN_B_CODE_1', 'HIDDEN_B_CODE_2'],
      manuals: { type: 'filePath', value: 'HIDDEN_B_MANUAL' },
      features: {},
    },
    {
      modelName: 'ICON_20',
      productCodes: ['ICON_20_CODE_1', 'ICON_20_CODE_2'],
      manuals: { type: 'filePath', value: 'ICON_20_MANUAL' },
      features: {},
    },
    {
      modelName: 'ELITE',
      productCodes: ['ELITE_CODE_1', 'ELITE_CODE_2'],
      manuals: { type: 'filePath', value: 'ELITE_MANUAL' },
      features: {},
    },
  ],
};
