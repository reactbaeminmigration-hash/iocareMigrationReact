import { useUnifiedDeviceData } from '@/domain/device/hooks/useUnifiedDeviceData';
import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import { createContext, useContext, type ReactNode } from 'react';
import type { DeviceContextType } from './DeviceContext.types';

export const DeviceContext = createContext<DeviceContextType<unknown> | null>(
  null,
);

export const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const { lastSelectedDeviceInfos: deviceState } = useDeviceStore();

  const value = useUnifiedDeviceData(deviceState);

  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  );
};

export const useDeviceContext = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDeviceContext must be used within a DeviceProvider');
  }
  return context;
};
