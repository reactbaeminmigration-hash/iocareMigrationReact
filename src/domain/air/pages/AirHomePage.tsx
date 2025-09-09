import { OtaBeforeNoticeComponent } from '@/domain/device/components/OtaBeforeNoticeComponent';
import { useCheckProductState } from '@/domain/device/hooks/useCheckProductState';
import { LoadingLocalSpinner } from '@/shared/components/LoadingSpinner/LoadingLocalSpinner';
import { AirHomeComponent } from '../components/AirHomeComponent';

const AIR_HFULL_LOADING = ['airHFullLoading'];

export const AirHomePage = () => {
  const { productStateNode, isProductStateLoading } = useCheckProductState({
    localLoadingKey: AIR_HFULL_LOADING,
  });
  return (
    <div className="cw_contentsWrap">
      <LoadingLocalSpinner
        localLoadingKey={AIR_HFULL_LOADING}
        className="cw_webcontainer"
      >
        {!isProductStateLoading &&
          (productStateNode ?? (
            <div className="cw_tab_cont cw_container01">
              <h2 className="cw_hide">홈</h2>
              <OtaBeforeNoticeComponent localLoadingKey={AIR_HFULL_LOADING} />
              <AirHomeComponent></AirHomeComponent>
            </div>
          ))}
      </LoadingLocalSpinner>
    </div>
  );
};
