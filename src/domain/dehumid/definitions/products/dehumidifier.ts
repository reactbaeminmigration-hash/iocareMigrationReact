import type { ProductUISpec } from '@/domain/device/types/productUISpec.types';
import type { DehumidFeatures } from '../../types/features.types';
import { defaultFeaturesInfo } from '../common/defaultFeaturesInfo';
import { defaultTabsInfo } from '../common/defaultTabsInfo';

// Dehumid domain specific props for header components (example)
interface DehumidHomeSectionHeaderProps {
  title: string;
  buttonText: string;
  onButtonClick: () => void;
}

export const dehumidifierSpec: ProductUISpec<
  DehumidFeatures,
  DehumidHomeSectionHeaderProps
> = {
  family: 'DEHUMIDI',
  region: 'KR',
  tabs: defaultTabsInfo,
  pages: {
    home: {
      header: [
        {
          section: 'home-header',
          components: [
            {
              name: 'DehumidHomeSectionHeader', // Placeholder component name
              props: {
                title: 'DEHUMID.DEHUMID_STATUS', // Placeholder title
                buttonText: 'DEHUMID.DEHUMID_MORE_SEE', // Placeholder button text
                onButtonClick: () =>
                  console.log('DehumidHomeSectionHeader clicked'),
              },
            },
          ],
        },
      ],
      content: [
        {
          section: 'main-status',
          components: [{ name: 'DehumidMainStatus', props: {} }],
        },
      ],
    },
  },
  features: {
    ...defaultFeaturesInfo,
  },
  models: [
    {
      modelName: 'NOBLEAD',
      productCodes: ['113260'],
      manuals: { filePath: '196' },
      features: {},
    },
  ],
};
