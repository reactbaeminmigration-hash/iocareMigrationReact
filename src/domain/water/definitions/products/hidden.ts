import type { ProductUISpec } from '@/domain/device/types/productUISpec.types';
import type { WaterFeatures, WaterHomeSectionHeaderProps } from '../../types/features.types';
import { defaultTabsInfo } from '../common';

export const hidden: ProductUISpec<WaterFeatures, WaterHomeSectionHeaderProps> = {
  family: 'HIDDEN',
  region: 'KR',
  tabs: defaultTabsInfo,
  pages: {
    home: {
      header: [
        {
          section: 'home-header',
          components: [
            {
              name: 'WaterHomeSectionHeader',
              props: {
                title: 'WATER.WATER_STATUS',
                buttonText: 'WATER.WATER_MORE_SEE',
                onButtonClick: () =>
                  console.log('WaterHomeSectionHeader clicked'),
              },
            },
          ],
        },
      ],
      content: [
        {
          section: 'main-status',
          components: [{ name: 'WaterMainStatus', props: {} }],
        },
      ],
    },
  },
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
};
