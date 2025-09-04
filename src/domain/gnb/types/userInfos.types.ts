import type { DeviceInfo } from "@/domain/device/types/device.types";


export interface RequestUserInfo {
    dvcSeq: number;
}

export interface ResponseUserInfo {
    deviceInfos: DeviceInfo[];
    userInfo: string;
}
