import type { DeviceInfo } from '@/domain/device/types/device.types';

export interface RequestDeviceInfos {
  pageIndex: string; // 페이징 index값 0 부터 시작
  pageSize: string; // 페이지 당 보여지는 갯수
}

export interface ResponseDeviceInfos {
  deviceInfos: DeviceInfo[];
}
