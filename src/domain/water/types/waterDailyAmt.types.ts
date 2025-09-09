export interface RequestWaterDailyAmt {
  devId: string;
  reportDate: string;
  resetDttm: string;
}

export interface ResponseWaterDailyAmt {
  dailyWatQntList: number[];
  dailyLastDay: string;
  dailyOverWatDays: string;
}
