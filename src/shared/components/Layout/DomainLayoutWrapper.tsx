import { useDeviceContext } from '@/app/contexts/DeviceProvider';
import { useGetDeviceType } from '@/domain/device/hooks/useGetDeviceType';
import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import { Layout } from './Layout';

export const DomainLayoutWrapper = () => {
  const { tabs, deviceCategory, deviceStandInfo, deviceUISpec } =
    useDeviceContext();
  console.log(deviceCategory);
  console.log(deviceStandInfo);
  console.log(deviceUISpec);

  const { getDvcTypeRoute } = useGetDeviceType();
  const route = useDeviceStore(
    (state) => state.lastSelectedDeviceInfos?.dvcTypeCd,
  );
  const domain = `/${getDvcTypeRoute(route)}`;
  console.log(tabs);

  return <Layout tabs={tabs} domain={domain} />;
};
