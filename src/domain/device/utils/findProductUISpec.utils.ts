import { AIR_PRODUCT_DEFINITIONS } from '@/domain/air/definitions';
import { DEHUMID_PRODUCT_DEFINITIONS } from '@/domain/dehumid/definitions';
import type {
  FoundProductUISpec,
  ProductUISpec,
} from '@/domain/device/types/productUISpec.types';
import { WATER_PRODUCT_DEFINITIONS } from '@/domain/water/definitions';
import { deepMerge, type IndexedObject } from '@/shared/utils/deepMerge';

const allDeviceUISpecs = [
  ...AIR_PRODUCT_DEFINITIONS,
  ...WATER_PRODUCT_DEFINITIONS,
  ...DEHUMID_PRODUCT_DEFINITIONS,
];

export function findProductUISpecByCode<T_Features extends IndexedObject>(
  prodCode: string,
): FoundProductUISpec<T_Features> | undefined {
  for (const deviceUISpec of allDeviceUISpecs as ProductUISpec<T_Features>[]) {
    const foundModel = deviceUISpec.models.find((model) =>
      model.productCodes.includes(prodCode),
    );
    if (foundModel) {
      const resolvedFeatures = deepMerge(
        deviceUISpec.features,
        foundModel.features,
      );
      return {
        family: deviceUISpec.family,
        region: deviceUISpec.region,
        tabs: deviceUISpec.tabs, // 다시 추가
        features: resolvedFeatures, // Added this line
        model: {
          ...foundModel,
          features: resolvedFeatures,
        },
      };
    }
  }
  return undefined;
}
