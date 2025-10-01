import type { ProductUISpec } from '@/domain/device/types/productUISpec.types';
import type { WaterFeatures, WaterHomeSectionHeaderProps } from '../../types/features.types';
import { defaultTabsInfo } from '../common';

export const elite: ProductUISpec<WaterFeatures, WaterHomeSectionHeaderProps> = {
  family: 'ELITE',
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
      modelName: 'ELITE',
      productCodes: ['112379'],
      manuals: { fileName: 'CHP-482L.pdf' },
      features: {},
    },
  ],
};
