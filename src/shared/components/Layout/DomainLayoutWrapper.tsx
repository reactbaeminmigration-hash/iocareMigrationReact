import { useDeviceContext } from '@/app/contexts/DeviceProvider';
import { useGetDeviceType } from '@/domain/device/hooks/useGetDeviceType';
import { Layout } from './Layout';

export const DomainLayoutWrapper = () => {
  const { tabs } = useDeviceContext();
  const { getDvcTypeRoute } = useGetDeviceType();
  const domain = `/${getDvcTypeRoute(0)}`;

  return <Layout tabs={tabs} domain={domain} />;
};
