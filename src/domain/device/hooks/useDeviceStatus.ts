import useGetDeviceStatus from '@/domain/device/hooks/queries/useGetDeviceStatus';
import { useDeviceStore } from '../stores/useDeviceStore';

interface UseDeviceOnlineStatusProps {
  localLoadingKey?: string[];
  enabled?: boolean;
}

export function useDeviceStatus({
  localLoadingKey,
  enabled = true,
}: UseDeviceOnlineStatusProps) {
  const barcode = useDeviceStore(
    (state) => state.lastSelectedDeviceInfos?.barcode,
  );
  const { data, isPending, isFetching, isError, error } = useGetDeviceStatus(
    { localLoadingKey, deviceList: [{ devIds: barcode }] },
    { enabled: !!barcode && enabled },
  );

  const isOnline = data?.[0]?.netStatus === true;

  return {
    isOnline,
    isPending,
    isFetching,
    isError,
    error,
    data,
  };
}
