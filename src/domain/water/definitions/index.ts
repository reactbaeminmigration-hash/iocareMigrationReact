import type { ProductUISpec } from '@/domain/device/types/productUISpec.types';
import type {
  WaterFeatures,
  WaterHomeSectionHeaderProps,
} from '../types/features.types';

import { elite } from './products/elite';
import { hidden } from './products/hidden';
import { icon_20 } from './products/icon_20';

export const WATER_PRODUCT_DEFINITIONS: ProductUISpec<
  WaterFeatures,
  WaterHomeSectionHeaderProps
>[] = [hidden, icon_20, elite];
