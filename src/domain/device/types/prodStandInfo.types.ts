import type {
  BaseDeviceRequest,
  CategoryInfo,
  ProdStandDeviceInfo,
  RegionInfos,
} from './common.types';

export interface RequestProdStandInfo extends BaseDeviceRequest {}

export interface ResponseProdStandInfo {
  latestUpdatedAt: number;
  deviceInfos: ProdStandDeviceInfo[];
  regionInfos: RegionInfos;
  category: CategoryInfo;
}
