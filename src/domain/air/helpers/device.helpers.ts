import type { DeviceInfo } from '@/domain/device/types/device.types';

export const isMqttProduct = (
  deviceInfo: Partial<DeviceInfo> | null | undefined,
): boolean => {
  return !!deviceInfo && deviceInfo.wifiType === 'M';
};
