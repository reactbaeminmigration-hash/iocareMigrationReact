export interface RequestWaterReport {
  devId: string;
  reportDate: string;
  resetDttm: string;
  instDttm: string;
}

export interface ResponseWaterReport {
  isNoData: boolean;
  has12MonthsReportData: boolean;
}
