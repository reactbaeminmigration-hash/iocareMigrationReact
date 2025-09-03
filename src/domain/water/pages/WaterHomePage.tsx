import useGetDeviceConn from '@/domain/device/hooks/queries/useGetDeviceConn';
import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import { WifiConnectError } from '@/shared/components/Layout/WifiConnectError';
import WaterSterCard from '../components/WaterSterCard';
import WaterUsageCard from '../components/WaterUsageCard';
import WaterFilterCard from '../components/WaterFilterCard';

export const WaterHomePage = () => {
  const deviceList = [
    { devIds: useDeviceStore.getState().lastSelectedDeviceInfos.barcode },
  ];
  const { data: ResponseDeviceConn } = useGetDeviceConn({ deviceList });

  return (
    <div className="cw_contentsWrap">
      <div className="cw_webcontainer">
        {(() => {
          if (
            Array.isArray(ResponseDeviceConn) &&
            !ResponseDeviceConn[0].netStatus
          ) {
            return <WifiConnectError />;
          }
          return (
            <div className="cw_tab_cont cw_container01">
              <WaterUsageCard />
              <WaterSterCard />
              <WaterFilterCard />
            </div>
          );
        })()}
      </div>
    </div>
  );
};
