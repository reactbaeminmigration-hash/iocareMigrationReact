import type { watUsageDaily } from './watUsageDaily';

export interface RequestWaterHome {
  devId: String;
  comType: String;
  orderNo: String;
  prodName: String;
  resetDttm: String;
  sellType: String;
  membershipYn: String;
  selfYn: String;
}

export interface ResponseWaterHome {
  elapsedHeartServiceDate: String;
  filterCycle: String;
  filterCode: String;
  filterRemainTime: String;
  lastSterTime: String;
  lastTagDate: String;
  nextHeartService: String;
  nextSterTime: String;
  nfcList: {
    drinkAmt: Number;
    drinkCnt: number;
  }[];
  prevMonthSterCount: Number;
  replaceFilterSchedule: String;
  watUsageDaily: watUsageDaily;
  watUsageToday: Number;
  euroList: {
    erLastSterTime: String;
    erNextSterTime: String;
  }[];
  fausetList: {
    fsLastSterTime: String;
    fsNextSterTime: String;
  }[];
  filterList: {
    changeCycle: String;
    filterCode: String;
    filterName: String;
    filterPer: Number;
    lastChangeDate: String;
  }[];
}
