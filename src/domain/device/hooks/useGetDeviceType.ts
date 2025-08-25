import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';

const dvcCode = [
  { code: '001', route: 'water', type: '정수기' },
  { code: '002', route: 'bidet', type: '비데' },
  { code: '004', route: 'air', type: '청정기' },
  { code: '005', route: 'air', type: '가습기' },
  { code: '008', route: 'mattress', type: '매트리스' },
];

const dvcComCode = [
  { code: 'WIFI', class: 'cw_power' },
  { code: 'BLE', class: 'cw_bluetooth' },
  { code: 'NFC', class: 'cw_nfc' },
];

export function useGetDeviceType() {
  const deviceInfos = useDeviceStore((state) => state.deviceInfos);

  const getDvcTypeRoute = (index: number) => {
    const userDevice = dvcCode.find(
      (value) => value.code === deviceInfos[index].dvcTypeCd,
    );
    return userDevice?.route;
  };

  const getDvcTypeName = (dvcTypeCd: string) => {
    const userDevice = dvcCode.find((value) => value.code === dvcTypeCd);
    return userDevice?.type;
  };

  const getDvcComType = (dvcComType: string) => {
    const userComType = dvcComCode.find((value) => value.code === dvcComType);
    return userComType?.class;
  };

  const getDvcWifiNetState = (dvcComType: string, deviceNetStatus: boolean) => {
    let netStatus = '';
    if (dvcComType == 'WIFI' && deviceNetStatus) {
      netStatus = 'cw_on';
    } else if (dvcComType == 'WIFI' && !deviceNetStatus) {
      netStatus = 'cw_off';
    }
    return netStatus;
  };

  return {
    getDvcTypeRoute,
    getDvcTypeName,
    getDvcComType,
    getDvcWifiNetState,
  };
}
