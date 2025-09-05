import { OtaBeforeNoticeComponent } from '@/domain/device/components/OtaBeforeNoticeComponent';
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
            <OtaBeforeNoticeComponent scopeKey={AIR_HFULL_LOADING} />
          ))}
      </div>
    </div>
  );
};
