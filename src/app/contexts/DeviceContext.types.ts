import type {
  CategoryItem,
  ProdStandDeviceInfo,
} from '@/domain/device/types/common.types';
import type { DeviceInfo } from '@/domain/device/types/device.types';
import type { ITab } from '@/shared/components/Layout/LayoutTab';
import type { TranslationKey } from '@/shared/types/common';

// 👇 우리가 만든 새 타입을 import 합니다.
import type { UnifiedProductSpec } from '@/domain/device/hooks/useDeviceUISpec';
import { defaultTabsInfo } from '@/domain/water/definitions/common';

// 👇 더 이상 제네릭이 필요 없으므로 제거합니다.
export interface DeviceContextType {
  tabs: readonly ITab[];
  deviceState: DeviceInfo;
  // 👇 타입을 새로운 UnifiedProductSpec으로 교체합니다.
  deviceUISpec: UnifiedProductSpec | undefined;
  deviceStandInfo: ProdStandDeviceInfo;
  deviceCategory: CategoryItem;
}

// 👇 제네릭 제거
export const defaultContextValue: DeviceContextType = {
  tabs: defaultTabsInfo.map((tab) => ({
    path: tab.path,
    label: tab.label as TranslationKey,
  })),
  deviceState: {
    /* ... 기존과 동일 ... */
    admdongCd: '',
    barcode: '',
    buyerMbrSeq: '',
    comType: '',
    dvcAuthCd: '',
    dvcAuthReasonCd: '',
    dvcBrandCd: '',
    dvcModel: '',
    dvcNick: '',
    dvcRegStatCd: '',
    dvcSeq: 0,
    dvcTypeCd: '',
    eUseTp: '',
    gpsLat: '',
    gpsLng: '',
    gpsNationCd: '',
    guideTypeCd: '',
    heartsvcDttm: '',
    instDttm: '',
    instYn: '',
    installAddr: '',
    iotYn: '',
    isGubun: '',
    mbrDvcSeq: 0,
    membershipYn: '',
    netStatus: false,
    ordNo: '',
    pairingDttm: '',
    prodCd: '',
    prodName: '',
    prodNameFull: '',
    prodType: '',
    regDttm: '',
    registUserCount: 0,
    releaseDttm: '',
    resetDttm: '',
    roomPos: '',
    rqDttm: '',
    rq_stat_cd: '',
    salesCntryId: '',
    selfManageYn: '',
    sellTypeCd: '',
    sort: 0,
    stationCd: '',
    unreadYN: '',
    userGradeCd: '',
    userTypeCd: '',
    wifiType: '',
    userGrade: '',
    managerYn: '',
    registAllCount: 0,
    mbrSeq: '',
  },
  deviceUISpec: undefined,
  deviceStandInfo: {
    familyId: '',
    familyName: '',
    productModel: '',
    productName: [],
    modelCode: '',
    makrModelCode: '',
  },
  deviceCategory: {
    imageUrl: '',
    familyId: '',
    familyName: '',
    productModel: '',
    productName: [],
    modelCode: '',
    makrModelCode: '',
    featureType: '',
    cntryCdAlpha2: '',
    searchRegion: [],
  },
};
