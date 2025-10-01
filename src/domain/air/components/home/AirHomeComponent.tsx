import { useDeviceContext } from '@/app/contexts/DeviceProvider';
import { useDeviceUISpecByFamily } from '@/domain/device/hooks/useDeviceUISpecByFamily';
import type { ComponentSpec } from '@/domain/device/types/productUISpec.types';
import { renderFromSpec } from '@/shared/utils/renderFromSpec';
import React, { useCallback } from 'react';
import type { AirFeatures } from '../../types/features.types';
import { componentMap } from '../componentMap';

export const AirHomeComponent = () => {
  const { deviceState } = useDeviceContext();
  const airUISpec = useDeviceUISpecByFamily<AirFeatures>(
    deviceState?.prodCd,
    deviceState?.dvcTypeCd,
  );

  if (!airUISpec?.pages?.home) {
    return <div>Loading UI...</div>;
  }

  const { content, header } = airUISpec.pages.home;
  const homeHeaderSection = header?.find(
    (section) => section.section === 'home-header',
  );
  const handleHeaderButtonClick = useCallback(() => {
    console.log('AirHomeSectionHeader의 동적 클릭 핸들러 실행됨!');
  }, []);

  const headerDynamicPropsMap: Record<
    string,
    (spec: ComponentSpec<any>) => Record<string, any>
  > = {
    AirHomeSectionHeader: (_spec) => ({
      onButtonClick: handleHeaderButtonClick,
    }),
  };

  return (
    <div className="cw_contbox02">
      {homeHeaderSection && (
        <React.Fragment key={homeHeaderSection.section}>
          {renderFromSpec(
            homeHeaderSection.components,
            componentMap,
            headerDynamicPropsMap, // dynamicPropsMap 전달
          )}
        </React.Fragment>
      )}

      <div className="cw_cont">
        {content?.map((section) => {
          return (
            <React.Fragment key={section.section}>
              {renderFromSpec(section.components, componentMap)}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
