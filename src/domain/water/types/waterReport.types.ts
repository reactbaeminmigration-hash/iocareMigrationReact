export interface RequestWaterReport {
  devId: string;
  reportDate: string;
  resetDttm: string;
}

export interface ResponseWaterReport {
  avgDayWtrQnt: number;
  sterileNumber: number;
  totalWtrQnt: number;
}
