import useGetDeviceStatus from "@/domain/device/hooks/queries/useGetDeviceStatus";
import { useDeviceStore } from "@/domain/device/stores/useDeviceStore";
import { NoNetStatusScreen } from "../components/FullScreenOverlay/NoNetStatusScreen";
import { NoIotScreen } from "../components/FullScreenOverlay/NoIotScreen";
import { NoInstScreen } from "../components/FullScreenOverlay/NoInstScreen";
import { NoDataScreen } from "../components/FullScreenOverlay/NoDataScreen";

export const REPLACE_HOME = {
    NONE: "NONE",
    NO_NET: "NO_NET",
    NO_IOT: "NO_IOT",
    NO_INST: "NO_INST",
    NO_DATA: "NO_DATA",
} as const;

export type ReplaceHomeScreenTypes = (typeof REPLACE_HOME)[keyof typeof REPLACE_HOME];

export function useReplaceHomeScreen(): { kind: ReplaceHomeScreenTypes; node: React.ReactNode | null } {
    const lastDeviceInfo = useDeviceStore((state) => state.lastSelectedDeviceInfos);
    const barcode = lastDeviceInfo?.barcode;

    const isNoData = !(lastDeviceInfo?.dvcRegStatCd === '0' || lastDeviceInfo?.dvcRegStatCd === '1');
    const isIot = lastDeviceInfo?.iotYn === 'Y';
    const isNoInst = lastDeviceInfo?.iotYn === 'Y' && lastDeviceInfo?.instYn === 'N';
    
    const shouldFetchStatus = !!barcode && !isNoData && isIot && !isNoInst;
    const { data } = useGetDeviceStatus(
        { deviceList: [{ devIds: barcode }] },
        { enabled: shouldFetchStatus }
    );

    const isOnline = !!data?.[0]?.netStatus === true;

    // 우선순위 : NO_DATA > NO_IOT > NO_INST > NO_NET
    const type: ReplaceHomeScreenTypes = 
        isNoData ? 'NO_DATA' :
        !isIot ? 'NO_IOT' :
        isNoInst ? 'NO_INST' :
        !isOnline ? 'NO_NET' :
        'NONE';

    switch (type) {
        case 'NO_NET':
            return {kind: type, node: <NoNetStatusScreen />};
        case 'NO_IOT':
            return {kind: type, node: <NoIotScreen dvcTypeCd={lastDeviceInfo?.dvcTypeCd} />};
        case 'NO_INST':
            return {kind: type, node: <NoInstScreen dvcTypeCd={lastDeviceInfo?.dvcTypeCd} />};
        case 'NO_DATA':
            return {kind: type, node: <NoDataScreen />};
        case 'NONE':
            return {kind: type, node: null};
        default:
            return {kind: type, node: null};
    }
}