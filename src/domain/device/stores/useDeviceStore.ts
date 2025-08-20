import type { StateCreator } from 'zustand';
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
  deviceInfos: DeviceInfo[]; // 디바이스 정보
  setDeviceInfos: (devices: DeviceInfo[]) => void;
  prodStandDeviceInfo: ProdStandDeviceInfo[]; // 디바이스 정보
  setProdStandDeviceInfo: (prodStandDeviceInfo: ProdStandDeviceInfo[]) => void;
  categoryInfo: CategoryInfo; // 디바이스 정보
  setCategoryInfo: (categoryInfo: CategoryInfo) => void;
  regionInfos: RegionInfos; // 디바이스 정보
  setRegionInfos: (regionInfos: RegionInfos) => void;
}

const storeCreator: StateCreator<
  DeviceState,
  [],
  [['zustand/devtools', never], ['zustand/persist', unknown]]
> = (set) => ({
  latestUpdatedAt: null,
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
});

const persistOptions = {
  name: 'device-storage',
  partialize: (state: DeviceState) => ({
    latestUpdatedAt: state.latestUpdatedAt,
  }),
};

export const useDeviceStore = create(
  devtools(persist(storeCreator, persistOptions), { name: 'DeviceStore' }),
);
