import type { BaseDeviceRequest } from './common.types';

export type deviceConn = {
  devIds: string;
};

export interface RequestProdStandInfo extends BaseDeviceRequest {}

export type RequestDeviceConn = {
  deviceList: deviceConn[];
};

export type ResponseDeviceConn = {
  devId: string;
  netStatus: boolean;
}[];
