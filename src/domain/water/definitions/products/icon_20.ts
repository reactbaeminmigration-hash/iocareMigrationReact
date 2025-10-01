import type { ProductUISpec } from '@/domain/device/types/productUISpec.types';
import type { WaterFeatures, WaterHomeSectionHeaderProps } from '../../types/features.types';
import { defaultTabsInfo } from '../common';

export const icon_20: ProductUISpec<WaterFeatures, WaterHomeSectionHeaderProps> = {
  family: 'ICON_20',
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
      modelName: 'ICON 2.0',
      productCodes: ['113417'],
      manuals: { filePath: '181' },
      features: {},
    },
  ],
};
