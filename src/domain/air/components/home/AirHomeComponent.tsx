import { useDeviceContext } from '@/app/contexts/DeviceProvider';
import { useDeviceUISpecByFamily } from '@/domain/device/hooks/useDeviceUISpecByFamily';
import { renderSections } from '@/shared/utils/renderSections';
import { useAirHomeComponentHook } from '../../hooks/useAirHomeComponentHook';
import type { AirFeatures } from '../../types/features.types';
import { componentMap } from '../componentMap';

export const AirHomeComponent = () => {
  const { deviceState, deviceCategory } = useDeviceContext();

  const airUISpec = useDeviceUISpecByFamily<AirFeatures>(
    deviceState?.prodCd,
    deviceCategory?.familyId,
  );

  const { dynamicPropsMap } = useAirHomeComponentHook();
  if (!airUISpec?.pages?.home) {
    return <div>Loading UI...</div>;
  }
  const { content, header } = airUISpec.pages.home;
  return (
    <div className="cw_contbox02">
      {renderSections(header, componentMap, dynamicPropsMap, ['AirHomeHeader'])}
      <div className="cw_cont">
        {renderSections(content, componentMap, dynamicPropsMap, ['iaqSection'])}
      </div>
    </div>
  );
};
