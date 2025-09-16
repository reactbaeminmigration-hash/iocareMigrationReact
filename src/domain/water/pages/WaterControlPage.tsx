import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import useGetWaterControlStatus from '../queries/useGetWaterControlStatus';
import {
  WATER_CONTROL,
  WATER_CONTROL_REGISTRY,
} from '../constants/controlDefinitions';

export const WaterControlPage = () => {
  const deviceInfo = useDeviceStore((state) => state.lastSelectedDeviceInfos);
  const { data: dvc } = useGetWaterControlStatus(
    {
      devId: deviceInfo.barcode,
      mqttDevice: deviceInfo.wifiType == 'M',
      dvcBrandCd: 'CW',
      dvcTypeCd: deviceInfo.dvcTypeCd,
      prodName: deviceInfo.prodName,
    },
    { enabled: !!deviceInfo },
  );

  const prodName =
    deviceInfo?.prodName as keyof typeof WATER_CONTROL.controlSpec;
  const prodControl = WATER_CONTROL.controlSpec[prodName];

  return (
    <div id="controlWrap" className="cw_contentsWrap">
      <div className="cw_webcontainer">
        {prodControl.map((rows, i) => (
          <div className="gridWrap" key={i}>
            {rows.map((key) => {
              const Component = WATER_CONTROL_REGISTRY[key];
              const proto = WATER_CONTROL.controls[key]?.id;
              const status = (dvc?.controlStatus as Record<string, string>)?.[
                proto
              ];
              return <Component key={key} protocol={proto} status={status} />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
