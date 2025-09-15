import { isMqttProduct } from '@/domain/device/helpers/device.helpers';
import type { DeviceInfo } from '@/domain/device/types/device.types';
import { formatTimestampToYyyyMmDdHhNn } from '@/shared/utils/date.utils';
import type { RequestAirDeviceHome } from '../types/airDeviceHome.types';

export const toAirDeivceHomeRequest = (
  deviceInfo: DeviceInfo,
): RequestAirDeviceHome => {
  return {
    admdongCd: deviceInfo.admdongCd,
    barcode: deviceInfo.barcode,
    deviceType: deviceInfo.dvcTypeCd,
    dvcBrandCd: deviceInfo.dvcBrandCd,
    membershipYn: deviceInfo.membershipYn,
    mqttDevice: isMqttProduct(deviceInfo),
    orderNo: deviceInfo.ordNo,
    prodName: deviceInfo.prodName,
    resetDttm: formatTimestampToYyyyMmDdHhNn(deviceInfo.regDttm),
    selfYn: deviceInfo.selfManageYn,
    stationCd: deviceInfo.stationCd,
    zipCode: '',
  };
};
