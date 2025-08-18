import { create } from 'zustand';
import type { DeviceInfo } from '../types/device.types';

interface DeviceState {
  deviceInfos: DeviceInfo[]; // 디바이스 정보
  setDeviceInfos: (devices: DeviceInfo[]) => void;
}

export const useDeviceStore = create<DeviceState>((set) => ({
  deviceInfos: [],
  setDeviceInfos: (devices) => set({ deviceInfos: devices }),
}));
