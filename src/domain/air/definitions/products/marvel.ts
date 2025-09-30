import { defaultFeaturesInfo } from '../../constants/airDefinitions';
import { asProductSpec } from '../types';

// 'MARVEL' 제품군의 UI 스펙
export const marvelSpec = asProductSpec({
  model: 'MARVEL_FAMILY',
  pages: {
    home: {
      header: [
        {
          name: 'AirHomeSectionHeader',
          props: { title: 'AIR.AIR_QUALITY', buttonText: 'AIR.AIR_MORE_SEE' },
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
        {
          section: 'filter',
          components: [],
        },
        {
          section: 'control',
          components: [],
        },
      ],
    },
  },
  features: {
    ...defaultFeaturesInfo,
    // showAutoModeGuide: true, // Marvel 특화 기능
  },
});
