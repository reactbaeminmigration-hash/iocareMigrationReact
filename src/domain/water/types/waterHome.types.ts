export interface RequestWaterHome {
  devId: string;
  comType: string;
  orderNo: string;
  prodName: string;
  resetDttm: string;
  sellType: string;
  membershipYn: string;
  selfYn: string;
}

export interface ResponseWaterHome {
  elapsedHeartServiceDate: string;
  filterCycle: string;
  filterCode: string;
  filterRemainTime: string;
  lastSterTime: string;
  lastTagDate: string;
  nextHeartService: string;
  nextSterTime: string;
  nfcList: {
    drinkAmt: number;
    drinkCnt: number;
  }[];
  prevMonthSterCount: number;
  replaceFilterSchedule: string;
  watUsageDaily: {
    cleanWatList: number[];
    coldWatList: number[];
    dayList: string[];
    hotWatList: number[];
    manualWatList: number[];
    sodaWatList: number[];
    sumWatList: number[];
  }[];
  watUsageToday: number;
  euroList: {
    erLastSterTime: string;
    erNextSterTime: string;
  }[];
  fausetList: {
    fsLastSterTime: string;
    fsNextSterTime: string;
  }[];
  icePsList: { iceFsLastSterTime: string; iceFsNextSterTime: string }[];
  iceTankList: { iceTankLastSterTime: string; iceTankNextSterTime: string }[];
  iceTankUvList: {
    iceTankUvLastSterTime: string;
    iceTankUvNextSterTime: string;
  }[];
  iceTrayList: { iceTrayLastSterTime: string; iceTrayNextSterTime: string }[];
  filterList: {
    changeCycle: string;
    filterCode: string;
    filterName: string;
    filterPer: number;
    lastChangeDate: string;
  }[];
}
