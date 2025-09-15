import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import useGetWaterControlStatus from '../queries/useGetWaterControlStatus';
import { WaitModeComponent } from '../components/WaitMode';
import { MyCapacityComponent } from '../components/MyCapacity';
import { SleepModeComponent } from '../components/SleepMode';

export const WaterControlPage = () => {
  const deviceInfo = useDeviceStore((state) => state.lastSelectedDeviceInfos);
  const { data: controlStatus } = useGetWaterControlStatus(
    {
      devId: deviceInfo.barcode,
      mqttDevice: deviceInfo.wifiType == 'M',
      dvcBrandCd: 'CW',
      dvcTypeCd: deviceInfo.dvcTypeCd,
      prodName: deviceInfo.prodName,
    },
    { enabled: !!deviceInfo },
  );
  return (
    <>
      <WaitModeComponent />
      <MyCapacityComponent />
      <SleepModeComponent />
    </>
  );
};
