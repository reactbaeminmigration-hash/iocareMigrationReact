import { AIR_PRODUCT_DEFINITIONS } from '@/domain/air/constants/airDefinitions';
import type {
  FoundProductUISpec,
  ProductUISpec,
} from '@/domain/device/types/productUISpec.types';
import { WATER_PRODUCT_DEFINITIONS } from '@/domain/water/constants/waterDefinitions';

const allDeviceUISpecs: ProductUISpec[] = [
  ...AIR_PRODUCT_DEFINITIONS,
  ...WATER_PRODUCT_DEFINITIONS,
];

export function findProductUISpecByCode(
  prodCode: string,
): FoundProductUISpec | undefined {
  for (const deviceUISpec of allDeviceUISpecs) {
    for (const model of deviceUISpec.models) {
      if (model.productCodes.includes(prodCode)) {
        return {
          family: deviceUISpec.family,
          tabs: deviceUISpec.tabs,
          model: model,
          region: deviceUISpec.region,
        };
      }
    }
  }
  return undefined;
}
