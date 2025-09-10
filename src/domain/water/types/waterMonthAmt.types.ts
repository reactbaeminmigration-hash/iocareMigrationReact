export interface RequestWaterMonthAmt {
  devId: string;
  reportDate: string;
  resetDttm: string;
  drinkUnit: string;
}

export interface ResponseWaterMonthAmt {
  thisMonthQnt: number;
  avgMonthQnt: number;
  weightUnit: string;
  monthList: string[];
  cleanWatList: number[];
  coldWatList: number[];
  hotWatList: number[];
  manualWatList: number[];
  sodaWatList: number[];
}
