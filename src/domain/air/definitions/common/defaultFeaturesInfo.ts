import type { AirFeatures } from '../../types/features.types';
import { iaqGraphFeature } from '../features/iaqGraph';

export const defaultFeaturesInfo: AirFeatures = {
  home: {
    iaqGraph: iaqGraphFeature,
  },
};
