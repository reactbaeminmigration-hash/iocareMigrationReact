import { AIR_PRODUCT_DEFINITIONS } from '@/domain/air/constants/airDefinitions';
import { DEHUMID_PRODUCT_DEFINITIONS } from '@/domain/dehumid/constants/dehumidDefinitions';
import type {
  FoundProductUISpec,
  ProductUISpec,
} from '@/domain/device/types/productUISpec.types';
import { WATER_PRODUCT_DEFINITIONS } from '@/domain/water/constants/waterDefinitions';

const allDeviceUISpecs = [
  ...AIR_PRODUCT_DEFINITIONS,
  ...WATER_PRODUCT_DEFINITIONS,
  ...DEHUMID_PRODUCT_DEFINITIONS,
];

export function findProductUISpecByCode<T_Features>(
  prodCode: string,
): FoundProductUISpec<T_Features> | undefined {
  for (const deviceUISpec of allDeviceUISpecs as ProductUISpec<T_Features>[]) {
    const foundModel = deviceUISpec.models.find((model) =>
      model.productCodes.includes(prodCode),
    );
    if (foundModel) {
      const resolvedFeatures = {
        ...deviceUISpec.features,
        ...foundModel.features,
      };
      return {
        family: deviceUISpec.family,
        tabs: deviceUISpec.tabs,
        region: deviceUISpec.region,
        model: {
          ...foundModel,
          features: resolvedFeatures,
        },
      };
    }
  }
  return undefined;
}
