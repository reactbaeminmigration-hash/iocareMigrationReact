import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';

const dvcTypeCd = [
  { code: '001', type: 'water' },
  { code: '002', type: 'bidet' },
  { code: '004', type: 'air' },
  { code: '008', type: 'mattress' },
];

export function useGetDeviceType(index: number) {
  const deviceInfos = useDeviceStore((state) => state.deviceInfos);

  const getDvcTypeCd = () => {
    const userDevice = dvcTypeCd.find(
      (value) => value.code === deviceInfos[index].dvcTypeCd,
    );
    console.log('Device Type:', userDevice?.type);
    return userDevice?.type;
  };

  return { getDvcTypeCd };
}
