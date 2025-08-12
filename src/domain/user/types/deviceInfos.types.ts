import type { DeviceInfo } from '@/domain/deivce/types/device.types';

export type RequestDeviceInfos = {
  pageIndex: '0'; // 페이징 index값 0 부터 시작
  pageSize: '100'; // 페이지 당 보여지는 갯수
};

export type ResponseDeviceInfos = {
  deviceInfos: DeviceInfo[];
};
