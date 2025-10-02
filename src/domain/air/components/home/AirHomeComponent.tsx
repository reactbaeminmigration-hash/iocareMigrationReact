import { useDeviceContext } from '@/app/contexts/DeviceProvider';
import { useDeviceUISpecByFamily } from '@/domain/device/hooks/useDeviceUISpecByFamily';
import type { ComponentSpec } from '@/domain/device/types/productUISpec.types';
import { renderSections } from '@/shared/utils/renderSections';
import { useCallback } from 'react';
import type { AirFeatures } from '../../types/features.types';
import { componentMap } from '../componentMap';

export const AirHomeComponent = () => {
  const { deviceState } = useDeviceContext();
  const airUISpec = useDeviceUISpecByFamily<AirFeatures>(
    deviceState?.prodCd,
    deviceState?.dvcTypeCd,
  );

  console.log(airUISpec);

  const handleHeaderButtonClick = useCallback(() => {
    console.log('AirHomeSectionHeader의 동적 클릭 핸들러 실행됨!');
  }, []);

  const dynamicPropsMap: Record<
    string,
    (spec: ComponentSpec<any>) => Record<string, any>
  > = {
    AirHomeSectionHeader: (_spec) => ({
      onButtonClick: handleHeaderButtonClick,
    }),
  };

  if (!airUISpec?.pages?.home) {
    return <div>Loading UI...</div>;
  }

  const { content, header } = airUISpec.pages.home;

  return (
    <div className="cw_contbox02">
      {renderSections(header, componentMap, dynamicPropsMap, ['home-header'])}

      <div className="cw_cont">
        {renderSections(content, componentMap, dynamicPropsMap)}
      </div>
    </div>
  );
};
