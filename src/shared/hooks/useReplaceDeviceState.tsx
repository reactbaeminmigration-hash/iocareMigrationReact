import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import { NoNetStatusScreen } from '../components/FullScreenOverlay/NoNetStatusScreen';
import { NoIotScreen } from '../components/FullScreenOverlay/NoIotScreen';
import { NoInstScreen } from '../components/FullScreenOverlay/NoInstScreen';
import { NoDataScreen } from '../components/FullScreenOverlay/NoDataScreen';
import { useDeviceStatus } from '@/domain/device/hooks/useDeviceStatus';

export const REPLACE_HOME = {
  NONE: 'NONE',
  NO_NET: 'NO_NET',
  NO_IOT: 'NO_IOT',
  NO_INST: 'NO_INST',
  NO_DATA: 'NO_DATA',
} as const;

export type ReplaceHomeScreenTypes =
  (typeof REPLACE_HOME)[keyof typeof REPLACE_HOME];

interface ReplaceHomeResult {
  kind: ReplaceHomeScreenTypes;
  node: React.ReactNode | null;
  loading: boolean;
  scopeKey?: string[];
}
interface replaceHomeScopeKey {
  scopeKey?: string[];
}

export function useReplaceDeviceState({
  scopeKey,
}: replaceHomeScopeKey): ReplaceHomeResult {
  const lastDeviceInfo = useDeviceStore(
    (state) => state.lastSelectedDeviceInfos,
  );
  const barcode = lastDeviceInfo?.barcode;

  const isNoData = !(
    lastDeviceInfo?.dvcRegStatCd === '0' || lastDeviceInfo?.dvcRegStatCd === '1'
  );
  const isIot = lastDeviceInfo?.iotYn === 'Y';
  const isNoInst =
    lastDeviceInfo?.iotYn === 'Y' && lastDeviceInfo?.instYn === 'N';

  const shouldFetchStatus = !!barcode && !isNoData && isIot && !isNoInst;
  const { isOnline, isPending, isFetching } = useDeviceStatus({
    scopeKey,
    enabled: shouldFetchStatus,
  });

  const loading = shouldFetchStatus && (isPending || isFetching);

  // 우선순위 : NO_DATA > NO_IOT > NO_INST > NO_NET
  const type: ReplaceHomeScreenTypes = isNoData
    ? 'NO_DATA'
    : !isIot
      ? 'NO_IOT'
      : isNoInst
        ? 'NO_INST'
        : !isOnline
          ? 'NO_NET'
          : 'NONE';

  let node: React.ReactNode | null = null;
  switch (type) {
    case 'NO_NET':
      node = <NoNetStatusScreen />;
      break;
    case 'NO_IOT':
      node = <NoIotScreen dvcTypeCd={lastDeviceInfo?.dvcTypeCd} />;
      break;
    case 'NO_INST':
      node = <NoInstScreen dvcTypeCd={lastDeviceInfo?.dvcTypeCd} />;
      break;
    case 'NO_DATA':
      node = <NoDataScreen />;
      break;
    default:
      node = null;
  }

  return { kind: type, node, loading, scopeKey };
}
