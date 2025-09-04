import { OtaStatusOverlay } from '@/domain/device/components/OtaStatusOverlay';
import { useLocalSpinner } from '@/shared/hooks/useLocalSpinner';
import { useRef } from 'react';

const AIR_HFULL_LOADING = ['airHFullLoading'];

export const AirHomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useLocalSpinner(containerRef, AIR_HFULL_LOADING);
  return (
    <div className="cw_contentsWrap">
      <div ref={containerRef} className="cw_webcontainer airHFullLoading">
        <div className="cw_tab_cont cw_container01">
          <h2 className="cw_hide">홈</h2>
          {/* OTA */}
          <OtaStatusOverlay scopeKey={AIR_HFULL_LOADING}></OtaStatusOverlay>
        </div>
      </div>
    </div>
  );
};
