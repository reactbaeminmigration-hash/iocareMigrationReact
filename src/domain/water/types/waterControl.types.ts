export interface RequestWaterControl {
  devId: string;
  dvcTypeCd: string;
  funcList: { funcId: string; cmdVal: string }[];
  isMultiControl: boolean;
  refreshFlag: boolean;
}

export interface ResponseWaterControl {
  currentDate: string;
}
