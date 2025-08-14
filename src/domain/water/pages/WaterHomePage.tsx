import useSyncDeviceInfos from '@/domain/device/hooks/useSyncDeviceInfos';
import { useEffect } from 'react';

export const WaterHomePage = () => {
  const { getSyncedDeviceInfos } = useSyncDeviceInfos();
  useEffect(() => {
    (async () => {
      let NewDeviceInfo = await getSyncedDeviceInfos();
      console.log(NewDeviceInfo);
    })();
  }, []);
  return (
    <>
      <div>WaterHomePage</div>
      {/* <Button className="cw_btn_tut" onClick={refreshAndStoreDeviceInfos}>
        <span>테스트 버튼</span>
      </Button> */}
    </>
  );
};
