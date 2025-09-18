import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import useGetWaterControlStatus from '../queries/useGetWaterControlStatus';
import {
  WATER_CONTROL,
  WATER_CONTROL_REGISTRY,
  WATER_CONTROL_UI,
  type ProdList,
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

  const prodName = deviceInfo?.prodName as ProdList;
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
