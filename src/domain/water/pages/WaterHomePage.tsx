import WaterSterCard from '../components/home/WaterSterCard';
import WaterUsageCard from '../components/home/WaterUsageCard';
import WaterFilterCard from '../components/home/WaterFilterCard';
import { useCheckProductState } from '@/domain/device/hooks/useCheckProductState';
import { LoadingLocalSpinner } from '@/shared/components/LoadingSpinner/LoadingLocalSpinner';
import { OtaBeforeNoticeComponent } from '@/domain/device/components/OtaBeforeNoticeComponent';

const WATER_HFULL_LOADING = ['waterHFullLoading'];

export const WaterHomePage = () => {
  const { productStateNode, isProductStateLoading } = useCheckProductState({
    localLoadingKey: WATER_HFULL_LOADING,
  });

  return (
    <div className="cw_contentsWrap">
      <LoadingLocalSpinner
        localLoadingKey={WATER_HFULL_LOADING}
        className="cw_webcontainer"
      >
        {!isProductStateLoading &&
          (productStateNode ?? (
            <div className="cw_tab_cont cw_container01">
              <OtaBeforeNoticeComponent localLoadingKey={WATER_HFULL_LOADING} />
              <WaterUsageCard />
              <WaterSterCard />
              <WaterFilterCard />
            </div>
          ))}
      </LoadingLocalSpinner>
    </div>
  );
};
