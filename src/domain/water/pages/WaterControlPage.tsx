import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import useGetWaterControlStatus from '../queries/useGetWaterControlStatus';
import {
  WATER_CONTROL,
  WATER_CONTROL_REGISTRY,
  WATER_CONTROL_UI,
  type ProdList,
} from '../constants/controlDefinitions';

export const WaterControlPage = () => {
  const device = useDeviceStore((state) => state.lastSelectedDeviceInfos);
  const { data: dvc } = useGetWaterControlStatus(
    {
      devId: device.barcode,
      mqttDevice: device.wifiType == 'M',
      dvcBrandCd: 'CW',
      dvcTypeCd: device.dvcTypeCd,
      prodName: device.prodName,
    },
    { enabled: !!device },
  );

  const prodName = device?.prodName as ProdList;
  const controlList = WATER_CONTROL_UI[prodName] ?? [];
  const statusList = dvc?.controlStatus ?? {};

  return (
    <div id="controlWrap" className="cw_contentsWrap">
      <div className="cw_webcontainer">
        {controlList.map((rows, i) => (
          <div className="gridWrap" key={i}>
            {rows.map((id) => {
              const Component = WATER_CONTROL_REGISTRY[id];
              const protocol = WATER_CONTROL.controls[id].protocol;
              return (
                <Component
                  key={protocol}
                  protocol={protocol}
                  status={statusList}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
