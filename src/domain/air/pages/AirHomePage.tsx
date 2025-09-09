import { OtaBeforeNoticeComponent } from '@/domain/device/components/OtaBeforeNoticeComponent';
import { useCheckProductState } from '@/domain/device/hooks/useCheckProductState';
import { LoadingLocalSpinner } from '@/shared/components/LoadingSpinner/LoadingLocalSpinner';
import { AirHomeComponent } from '../components/AirHomeComponent';

const AIR_HFULL_LOADING = ['airHFullLoading'];

export const AirHomePage = () => {
  const { finalNode: productStateNode, isLoading: productStateIsLoading } =
    useCheckProductState({
      scopeKey: AIR_HFULL_LOADING,
    });
  // const { setGlobalPopup } = useGlobalPopupStore();
  // useEffect(() => {
  //   setGlobalPopup({
  //     popupType: 'basic',
  //     title: '제목 확인',
  //     contents: '메시지 확인',
  //     btns: [
  //       {
  //         text: '확인',
  //         type: '',
  //         action: () => {
  //           console.log('ddd');
  //         },
  //       },
  //     ],
  //   });
  // }, [setGlobalPopup]);
  // const { setErrorPopup } = useErrorPopupStore();
  // useEffect(() => {
  //   setErrorPopup({
  //     popupType: 'basic',
  //     title: '제목 확인',
  //     contents: '메시지 확인',
  //     btns: [
  //       {
  //         text: '확인',
  //         type: '',
  //         action: () => {
  //           console.log('ddd');
  //         },
  //       },
  //     ],
  //   });
  // }, [setErrorPopup]);
  return (
    <div className="cw_contentsWrap">
      <LoadingLocalSpinner
        scopeKey={AIR_HFULL_LOADING}
        className="cw_webcontainer airHFullLoading"
      >
        {!productStateIsLoading &&
          (productStateNode ?? (
            <div className="cw_tab_cont cw_container01">
              <h2 className="cw_hide">홈</h2>
              <OtaBeforeNoticeComponent scopeKey={AIR_HFULL_LOADING} />
              <AirHomeComponent></AirHomeComponent>
            </div>
          ))}
      </LoadingLocalSpinner>
    </div>
  );
};
