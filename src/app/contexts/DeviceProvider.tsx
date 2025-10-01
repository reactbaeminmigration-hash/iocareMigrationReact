import { type DeviceContextType } from '@/app/contexts/DeviceContext.types';
import { useUnifiedDeviceData } from '@/domain/device/hooks/useUnifiedDeviceData';
import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import { createContext, useContext, type ReactNode } from 'react';

export const DeviceContext = createContext<DeviceContextType | null>(null);

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
