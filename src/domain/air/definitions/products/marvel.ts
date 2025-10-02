import type { ProductUISpec } from '@/domain/device/types/productUISpec.types';
import type { AirFeatures } from '../../types/features.types';
import { defaultFeaturesInfo } from '../common/defaultFeaturesInfo';
import { defaultTabsInfo } from '../common/defaultTabsInfo';

interface AirHomeHeaderProps {
  title: string;
  buttonText: string;
  onButtonClick: () => void;
}

export const marvelSpec: ProductUISpec<AirFeatures, AirHomeHeaderProps> = {
  family: 'MARVEL',
  region: 'KR',
  tabs: defaultTabsInfo,
  pages: {
    home: {
      header: [
        {
          section: 'homeHeaderSection',
          components: [
            {
              name: 'AirHomeHeader',
              props: {
                title: 'AIR.AIR_QUALITY',
                buttonText: 'AIR.AIR_MORE_SEE',
                onButtonClick: () => console.log('AirHomeHeader clicked'),
              },
            },
          ],
        },
      ],
      content: [
        {
          section: 'iaqSection',
          components: [
            { name: 'AirHomeMainQualityStatus', props: {} }, // 공기질 현황 상태 데이터
            { name: 'AirHomeIaqGraphSection', props: {} }, // 공기질 현황 그래프 모음
          ],
        },
        {
          section: 'iaqGraphSection',
          components: [
            { name: 'AirHomeMainIaqPm25Gragh', props: {} }, // 초미세먼지
            { name: 'AirHomeSubIaqPm10Gragh', props: {} }, // 미세먼지
            { name: 'AirHomeSubIaqPm1Gragh', props: {} }, // 극초미세먼지
            { name: 'AirHomeSubIaqVocsGragh', props: {} }, // 생활가스
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
