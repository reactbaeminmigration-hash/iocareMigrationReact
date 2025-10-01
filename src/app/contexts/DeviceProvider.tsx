import { type DeviceContextType } from '@/app/contexts/DeviceContext.types';
import { useDeviceCategory } from '@/domain/device/hooks/useDeviceCategory';
import { useDeviceStandInfo } from '@/domain/device/hooks/useDeviceStandInfo';
import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import { createContext, useContext, type ReactNode } from 'react';

export const DeviceContext = createContext<DeviceContextType | null>(null);

export const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const { lastSelectedDeviceInfos: deviceState } = useDeviceStore();
  const prodCd = deviceState?.prodCd;

  const deviceStandInfo = useDeviceStandInfo(prodCd);
  const deviceCategory = useDeviceCategory(prodCd);

  const value: DeviceContextType = {
    deviceState: deviceState || ({} as any),
    deviceStandInfo,
    deviceCategory,
  };

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
