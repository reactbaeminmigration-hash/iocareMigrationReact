import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type {
  CategoryInfo,
  ProdStandDeviceInfo,
  RegionInfos,
} from '../types/common.types';
import type { DeviceInfo } from '../types/device.types';

interface DeviceState {
  latestUpdatedAt: string | null;
  setLatestUpdatedAt: (latestUpdatedAt: string) => void;
  deviceInfos: DeviceInfo[];
  setDeviceInfos: (devices: DeviceInfo[]) => void;
  prodStandDeviceInfo: ProdStandDeviceInfo[];
  setProdStandDeviceInfo: (prodStandDeviceInfo: ProdStandDeviceInfo[]) => void;
  categoryInfo: CategoryInfo;
  setCategoryInfo: (categoryInfo: CategoryInfo) => void;
  regionInfos: RegionInfos;
  setRegionInfos: (regionInfos: RegionInfos) => void;
}

export type DeviceActionType =
  | 'set_latest_updated_at'
  | 'set_device_infos'
  | 'set_prod_stand_device_info'
  | 'set_category_info'
  | 'set_region_infos';

export const useDeviceStore = create<DeviceState>()(
  devtools(
    persist(
      (set) => ({
        latestUpdatedAt: null,
        setLatestUpdatedAt: (latestUpdatedAt) =>
          set(
            { latestUpdatedAt },
            false,
            'set_latest_updated_at' as DeviceActionType,
          ),
        deviceInfos: [],
        setDeviceInfos: (devices) =>
          set(
            { deviceInfos: devices },
            false,
            'set_device_infos' as DeviceActionType,
          ),
        prodStandDeviceInfo: [],
        setProdStandDeviceInfo: (prodStandDeviceInfo) =>
          set(
            { prodStandDeviceInfo },
            false,
            'set_prod_stand_device_info' as DeviceActionType,
          ),
        categoryInfo: { imageUrl: '', categories: [] },
        setCategoryInfo: (categoryInfo) =>
          set({ categoryInfo }, false, 'set_category_info' as DeviceActionType),
        regionInfos: {},
        setRegionInfos: (regionInfos) =>
          set({ regionInfos }, false, 'set_region_infos' as DeviceActionType),
      }),
      {
        name: 'device-storage',
        partialize: (state) => ({ latestUpdatedAt: state.latestUpdatedAt }),
      },
    ),
    { name: 'DeviceStore' },
  ),
);
