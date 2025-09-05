import { useCheckProductState } from '@/domain/device/hooks/useCheckProductState';
import { useLocalSpinner } from '@/shared/hooks/useLocalSpinner';
import { useRef } from 'react';

const AIR_HFULL_LOADING = ['airHFullLoading'];

export const AirHomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useLocalSpinner(containerRef, AIR_HFULL_LOADING);
  const { finalNode: productStateNode, isLoading: productStateIsLoading } =
    useCheckProductState({
      scopeKey: AIR_HFULL_LOADING,
    });
  return (
    <div className="cw_contentsWrap">
      <div ref={containerRef} className="cw_webcontainer airHFullLoading">
        {!productStateIsLoading &&
          (productStateNode ?? (
            <div className="cw_tab_cont cw_container01">
              <h2 className="cw_hide">홈</h2>
              <div className="OTA_msgbox">
                <h1 className="tit"></h1>
                <p></p>
                <p></p>
                <button type="button" className="cw_btn_popclose w">
                  <span>Close</span>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
