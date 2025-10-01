import { AIR_PRODUCT_DEFINITIONS } from '@/domain/air/definitions';
import type { AirFeatures } from '@/domain/air/types/features.types';
import { DEHUMID_PRODUCT_DEFINITIONS } from '@/domain/dehumid/definitions';
import type { DehumidFeatures } from '@/domain/dehumid/types/features.types';
import type { ProductUISpec } from '@/domain/device/types/productUISpec.types';
import { WATER_PRODUCT_DEFINITIONS } from '@/domain/water/definitions';
import type { WaterFeatures } from '@/domain/water/types/features.types';

// Define a type for the configuration entry
interface DeviceFamilyConfig<T_Features extends Record<string, any>> {
  definitions: ProductUISpec<T_Features>[];
  // We use a placeholder object for features to help with type inference
  // The actual features will come from the deviceUISpec
  featuresPlaceholder: T_Features;
}

// Use a Map for better type safety and extensibility
export const deviceFamilyDefinitionsMap = new Map<
  string,
  DeviceFamilyConfig<any>
>();

deviceFamilyDefinitionsMap.set('air', {
  definitions: AIR_PRODUCT_DEFINITIONS as ProductUISpec<AirFeatures>[],
  featuresPlaceholder: {} as AirFeatures,
});

deviceFamilyDefinitionsMap.set('water', {
  definitions: WATER_PRODUCT_DEFINITIONS as ProductUISpec<WaterFeatures>[],
  featuresPlaceholder: {} as WaterFeatures,
});

deviceFamilyDefinitionsMap.set('dehumid', {
  definitions: DEHUMID_PRODUCT_DEFINITIONS as ProductUISpec<DehumidFeatures>[],
  featuresPlaceholder: {} as DehumidFeatures,
});

// Add a default entry for unknown device families
deviceFamilyDefinitionsMap.set('default', {
  definitions: [],
  featuresPlaceholder: {} as Record<string, any>,
});
