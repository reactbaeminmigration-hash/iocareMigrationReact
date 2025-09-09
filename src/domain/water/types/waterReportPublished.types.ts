export interface RequestWaterReportPublished {
  devId: string;
  reportDate: string;
  resetDttm: string;
  instDttm: string;
}

export interface ResponseWaterReportPublished {
  isNoData: boolean;
  has12MonthsReportData: boolean;
}

export type WaterReportParams = Readonly<{
  isNoDate: boolean | undefined;
  devId: string;
  reportDate: string; // "YYYYMM01"
  resetDttm: string; // "YYYYMMDD"
}>;
