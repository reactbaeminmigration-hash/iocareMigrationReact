import { create } from 'zustand';
import type { DeviceInfo } from '../types/device.types';

interface DeviceState {
  deviceInfos: DeviceInfo[];
  setDeviceInfos: (devices: DeviceInfo[]) => void;
}

export const useDeviceStore = create<DeviceState>((set) => ({
  deviceInfos: [],
  setDeviceInfos: (devices) => set({ deviceInfos: devices }),
}));
