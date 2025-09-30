import type { AirUIConfigSpec } from '@/domain/air/definitions/types'; // 추가
import { defaultTabsInfo } from '@/domain/dehumid/constants/dehumidDefinitions';
import type {
  CategoryItem,
  ProdStandDeviceInfo,
} from '@/domain/device/types/common.types';
import type { DeviceInfo } from '@/domain/device/types/device.types';
// import type { FoundProductUISpec } from '@/domain/device/types/productUISpec.types'; // 제거
import type { ITab } from '@/shared/components/Layout/LayoutTab';
import type { TranslationKey } from '@/shared/types/common';
import type { IndexedObject } from '@/shared/utils/deepMerge'; // 추가

export interface DeviceContextType<
  T_Features extends IndexedObject = IndexedObject,
> {
  // T_Features 제네릭도 IndexedObject로 제한
  tabs: readonly ITab[];
  deviceState: DeviceInfo;
  deviceUISpec: AirUIConfigSpec<any, T_Features> | undefined; // 타입 변경
  deviceStandInfo: ProdStandDeviceInfo;
  deviceCategory: CategoryItem;
}

export const defaultContextValue: DeviceContextType<IndexedObject> = {
  // 타입 변경
  tabs: defaultTabsInfo.map((tab) => ({
    path: tab.path,
    label: tab.label as TranslationKey,
  })),
  deviceState: {
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
  deviceUISpec: undefined, // 값 변경
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
