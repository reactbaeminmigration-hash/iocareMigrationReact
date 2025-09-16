export interface RequestWaterControlStatus {
  devId: string;
  dvcTypeCd: string;
  mqttDevice: boolean;
  dvcBrandCd: string;
  prodName: string;
}

export interface ResponseWaterControlStatus {
  controlStatus: Record<string, string>;
  lastBubbleSterTime: string;
  lastDrainageTime: string;
  lastSterTime: string;
  errorCode: string[];
  errorYn: boolean;
  netStatus: boolean;
  waterLevel: number;
}
