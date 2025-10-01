import type { ProductUISpec } from '@/domain/device/types/productUISpec.types';
import type { AirFeatures } from '../../types/features.types';
import { defaultFeaturesInfo } from '../common/defaultFeaturesInfo';
import { defaultTabsInfo } from '../common/defaultTabsInfo';

interface AirHomeSectionHeaderProps {
  title: string;
  buttonText: string;
  onButtonClick: () => void;
}

export const marvelSpec: ProductUISpec<AirFeatures, AirHomeSectionHeaderProps> =
  {
    family: 'MARVEL',
    region: 'KR',
    tabs: defaultTabsInfo,
    pages: {
      home: {
        header: [
          {
            section: 'home-header',
            components: [
              {
                name: 'AirHomeSectionHeader',
                props: {
                  title: 'AIR.AIR_QUALITY',
                  buttonText: 'AIR.AIR_MORE_SEE',
                  onButtonClick: () =>
                    console.log('AirHomeSectionHeader clicked'),
                },
              },
            ],
          },
        ],
        content: [
          {
            section: 'iaq',
            components: [
              { name: 'AirHomeMainQualityStatus', props: {} },
              { name: 'AirHomeIaqGraphSection', props: {} },
            ],
          },
          { section: 'filter', components: [] },
          { section: 'control', components: [] },
        ],
      },
    },
    features: {
      ...defaultFeaturesInfo,
    },
    models: [
      {
        modelName: 'MARVEL_15',
        productCodes: ['113182', '113218'],
        manuals: { type: 'filePath', value: '117' },
        features: {
          showAutoModeGuide2: true, // Marvel 특화 기능
        },
      },
      {
        modelName: 'MARVEL_20',
        productCodes: ['113826'],
        manuals: { type: 'filePath', value: '117' },
        features: {},
      },
      {
        modelName: 'MARVEL_30',
        productCodes: ['113209'],
        manuals: { type: 'filePath', value: '117' },
        features: {},
      },
    ],
  };
