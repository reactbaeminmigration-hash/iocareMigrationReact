import { createContext, useContext, useMemo, type ReactNode } from 'react';

const tabs = [
  { path: '/home', label: 'BTN.HOME' },
  { path: '/report', label: 'BTN.REPORT' },
  { path: '/control', label: 'BTN.CONTROL' },
  { path: '/notice', label: 'BTN.NOTICE' },
  { path: '/settings', label: 'BTN.SETTING' },
] as const;

interface DeviceContextType {
  tabs: typeof tabs;
}

export const DeviceContext = createContext<DeviceContextType | null>(null);

export const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const value = useMemo(
    () => ({
      tabs,
    }),
    [tabs],
  );
  return (
    <DeviceContext.Provider value={value}>{children};</DeviceContext.Provider>
  );
};

export const useDeviceContext = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDeviceContext 사용 도중 에러');
  }
  return context;
};
