import type { BaseDeviceRequest } from './common.types';

export interface RequestLatestUpdated extends BaseDeviceRequest {}

export interface ResponseLatestUpdated {
  updatedAt: number;
}
