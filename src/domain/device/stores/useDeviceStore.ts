import { create } from 'zustand';
import type {
  CategoryInfo,
  ProdStandDeviceInfo,
  RegionInfos,
} from '../types/common.types';
import type { DeviceInfo } from '../types/device.types';

interface DeviceState {
  latestUpdatedAt: string;
  setLatestUpdatedAt: (latestUpdatedAt: string) => void;
  deviceInfos: DeviceInfo[]; // 디바이스 정보
  setDeviceInfos: (devices: DeviceInfo[]) => void;
  prodStandDeviceInfo: ProdStandDeviceInfo[]; // 디바이스 정보
  setProdStandDeviceInfo: (prodStandDeviceInfo: ProdStandDeviceInfo[]) => void;
  categoryInfo: CategoryInfo; // 디바이스 정보
  setCategoryInfo: (categoryInfo: CategoryInfo) => void;
  regionInfos: RegionInfos; // 디바이스 정보
  setRegionInfos: (regionInfos: RegionInfos) => void;
}

export const useDeviceStore = create<DeviceState>((set) => ({
  latestUpdatedAt: '',
  setLatestUpdatedAt: (latestUpdatedAt) => set({ latestUpdatedAt }),
  deviceInfos: [],
  setDeviceInfos: (devices) => set({ deviceInfos: devices }),
  prodStandDeviceInfo: [],
  setProdStandDeviceInfo: (prodStandDeviceInfo) => set({ prodStandDeviceInfo }),
  categoryInfo: {
    imageUrl: '',
    categories: [],
  },
  setCategoryInfo: (categoryInfo) => set({ categoryInfo }),
  regionInfos: {},
  setRegionInfos: (regionInfos) => set({ regionInfos }),
}));
