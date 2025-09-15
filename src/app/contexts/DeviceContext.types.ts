import { defaultTabsInfo } from '@/domain/air/constants/airDefinitions';
import type {
  CategoryItem,
  ProdStandDeviceInfo,
} from '@/domain/device/types/common.types';
import type { DeviceInfo } from '@/domain/device/types/device.types';
import type { FoundProductUISpec } from '@/domain/device/types/productUISpec.types';
import type { ITab } from '@/shared/components/Layout/LayoutTab';
import type { TranslationKey } from '@/shared/types/common';

export interface DeviceContextType {
  tabs: readonly ITab[];
  deviceState: DeviceInfo;
  deviceUISpec: FoundProductUISpec;
  deviceStandInfo: ProdStandDeviceInfo;
  deviceCategory: CategoryItem;
}

export const defaultContextValue: DeviceContextType = {
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
  deviceUISpec: {
    family: '',
    region: '',
    tabs: [],
    model: {
      modelName: '',
      productCodes: [],
      manuals: {},
      features: {},
    },
  },
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
