import { useDeviceContext } from '@/app/contexts/DeviceProvider';
import { useGetDeviceType } from '@/domain/device/hooks/useGetDeviceType';
import { Layout } from './Layout';
import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';

export const DomainLayoutWrapper = () => {
  const { tabs } = useDeviceContext();
  const { getDvcTypeRoute } = useGetDeviceType();
  const route = useDeviceStore(
    (state) => state.lastSelectedDeviceInfos?.dvcTypeCd,
  );
  const domain = `/${getDvcTypeRoute(route)}`;

  return <Layout tabs={tabs} domain={domain} />;
};
