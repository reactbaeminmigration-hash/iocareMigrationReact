import { defaultTabsInfo } from '@/domain/air/constants/airDefinitions';
import type {
  CategoryItem,
  ProdStandDeviceInfo,
} from '@/domain/device/types/common.types';
import type { DeviceInfo } from '@/domain/device/types/device.types';
import type { FoundProductUISpec } from '@/domain/device/types/productUISpec.types';
import type { ITab } from '@/shared/components/Layout/LayoutTab';
import type { TranslationKey } from '@/shared/types/common';

export interface DeviceContextType {
  tabs: readonly ITab[];
  deviceState: DeviceInfo;
  deviceUISpec: FoundProductUISpec;
  deviceStandInfo: ProdStandDeviceInfo;
  deviceCategory: CategoryItem;
}

export const defaultContextValue: DeviceContextType = {
  tabs: defaultTabsInfo.map((tab) => ({
    path: tab.path,
    label: tab.label as TranslationKey,
  })),
  deviceUISpec: {
    family: '',
    region: '',
    tabs: [],
    model: {
      modelName: '',
      productCodes: [],
      manuals: {},
      features: {},
    },
  },
  deviceStandInfo: {
    familyId: '',
    familyName: '',
    productModel: '',
    productName: [],
    modelCode: '',
    makrModelCode: '',
  },
  deviceCategory: {
    imageUrl: '',
    familyId: '',
    familyName: '',
    productModel: '',
    productName: [],
    modelCode: '',
    makrModelCode: '',
    featureType: '',
    cntryCdAlpha2: '',
    searchRegion: [],
  },
};
