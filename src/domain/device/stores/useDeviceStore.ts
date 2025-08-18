import type { StateCreator } from 'zustand';
import { create } from 'zustand'; // ✨ StateCreator 임포트\
import { devtools } from 'zustand/middleware'; // ✨ devtools 임포트
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

// ✨ storeCreator 정의 (devtools 미들웨어 타입 포함)
const storeCreator: StateCreator<
  DeviceState,
  [],
  [['zustand/devtools', never]]
> = (set) => ({
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
});

export const useDeviceStore = create(
  // ✨ create<DeviceState>에서 <DeviceState> 제거
  devtools(storeCreator), // ✨ devtools 미들웨어 적용
);
