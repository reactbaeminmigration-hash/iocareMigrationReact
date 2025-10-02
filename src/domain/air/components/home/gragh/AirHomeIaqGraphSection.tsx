import { useDeviceContext } from '@/app/contexts/DeviceProvider';
import type { AirFeatures } from '@/domain/air/types/features.types';
import { useDeviceUISpecByFamily } from '@/domain/device/hooks/useDeviceUISpecByFamily';
import { renderSections } from '@/shared/utils/renderSections';
import { componentMap } from '../../componentMap';

export const AirHomeIaqGraphSection = () => {
  const { deviceState, deviceCategory } = useDeviceContext();

  const airUISpec = useDeviceUISpecByFamily<AirFeatures>(
    deviceState?.prodCd,
    deviceCategory?.familyId,
  );
  if (!airUISpec?.pages?.home) {
    return <div>Loading UI...</div>;
  }
  const { content } = airUISpec?.pages?.home;
  return (
    <div className="cw_accWrap02 type02">
      <ul>{renderSections(content, componentMap, {}, ['iaqGraphSection'])}</ul>
    </div>
  );
};
