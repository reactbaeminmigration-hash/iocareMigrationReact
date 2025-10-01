import { useDeviceContext } from '@/app/contexts/DeviceProvider';
import { useDeviceUISpecByFamily } from '@/domain/device/hooks/useDeviceUISpecByFamily';
import { useGetDeviceType } from '@/domain/device/hooks/useGetDeviceType';
import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import type { TranslationKey } from '@/shared/types/common';
import { useMemo } from 'react';
import { Layout } from './Layout';
import type { ITab } from './LayoutTab';

export const DomainLayoutWrapper = () => {
  const { deviceState } = useDeviceContext();
  const prodCd = deviceState?.prodCd;
  const dvcTypeCd = deviceState?.dvcTypeCd;

  const deviceUISpec = useDeviceUISpecByFamily<Record<string, any>>(
    prodCd,
    dvcTypeCd,
  );

  const tabs: readonly ITab[] = useMemo(() => {
    return (deviceUISpec?.tabs || []).map((tab) => ({
      path: tab.path,
      label: tab.label as TranslationKey,
    }));
  }, [deviceUISpec]);

  const { getDvcTypeRoute } = useGetDeviceType();
  const route = useDeviceStore(
    (state) => state.lastSelectedDeviceInfos?.dvcTypeCd,
  );
  const domain = `/${getDvcTypeRoute(route)}`;

  return <Layout tabs={tabs} domain={domain} />;
};
