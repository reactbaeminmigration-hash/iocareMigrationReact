import { LoadingLocalSpinner } from '@/shared/components/LoadingSpinner/LoadingLocalSpinner';
import { DehumidHomeHumidity } from '../components/Home/DehumidHomeHumidity';
import { useCheckProductState } from '@/domain/device/hooks/useCheckProductState';
import { OtaBeforeNoticeComponent } from '@/domain/device/components/OtaBeforeNoticeComponent';

const AIR_HFULL_LOADING = ['airHFullLoading'];

export const DehumidHomePage = () => {
  const {
    productStateNode: productStateNode,
    isProductStateLoading: productStateIsLoading,
  } = useCheckProductState({
    localLoadingKey: AIR_HFULL_LOADING,
  });

  return (
    <div className="cw_contentsWrap">
      <LoadingLocalSpinner
        localLoadingKey={AIR_HFULL_LOADING}
        className="cw_webcontainer airHFullLoading"
      >
        {!productStateIsLoading &&
          (productStateNode ?? (
            <div className="cw_tab_cont cw_container01">
              <h2 className="cw_hide">홈</h2>
              <OtaBeforeNoticeComponent localLoadingKey={AIR_HFULL_LOADING} />
              <DehumidHomeHumidity></DehumidHomeHumidity>
            </div>
          ))}
      </LoadingLocalSpinner>
    </div>
  );
};
