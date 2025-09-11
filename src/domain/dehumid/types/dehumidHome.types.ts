export interface RequestDehumidHome {
  devId: string;
  membershipYn: string;
  orderNo: string;
  mqttDevice: boolean;
  dvcBrandCd: string;
  resetDttm: string;
  stationCd: string;
  zipCode: string;
  selfYn: string;
}

// ── IAQ / OAQ
export interface IAQ {
  co2: string;
  dustpm1: string;
  dustpm10: string;
  dustpm25: string;
  humidity: string;
  inairquality: string;
  rpm: string;
  temperature: string;
  vocs: string;
}

export interface OAQ {
  address: string;
  humidity: string;
  icon: string;
  mainairgrade: string;
  presenttime: string;
  temp: string;
}

// ── Filter-related
export interface FilterItem {
  changeCycle: string; // 예: "1"
  cycleInfo: string; // 예: "M"
  filterCode: string;
  filterName: string;
  filterPer: number; // 예시에선 number
  lastChangeDate: string; // "yyyyMMdd"
  sort: number;
}

export interface FilterDeliveryItem {
  deliveryFilterCode: string;
  deliveryNextDate: string; // 비어있을 수 있음 ""
  sort: number;
}

// ── Graph
export interface Pm10GraphPoint {
  graphHighValue: string;
  graphValue: string;
  msrDt: string; // 예: "1230"
  place: string; // 예: "in"
}

// ── Product status
export interface ProdStatus {
  AICare: string;
  airVolume: string;
  dustPollution: string;
  dustSensitivity: string;
  humidification: string;
  light: string;
  lightDetail: string;
  onTimer: string;
  pollenMode: string;
  power: string;
  prodMode: string;
  purityFanAction: string;
  purityFanActionTime: string;
  reservation: string; // "yyyyMMddHHmm"
  silent: string;
  specialModeIndex: string;
  vocsGrade: string;
}

// ── Schedules
export interface ScheduleItem {
  cmdValue: number;
  dayOfWeek: Array<string>;
  devDstTimezn: string; // "0" / "1" 등 문자열로 수신
  devDtTimezn: string; // 예: "9"
  enabled: string; // "Y" / "N"
  endTime: string; // "HHmm"
  lightOnOff: number;
  movingMode: number;
  scheId: number;
  specialMode: number;
  startTime: string; // "HHmm"
}

// ── Root
export interface ResponseDehumidHome {
  IAQ: IAQ;
  OAQ: OAQ;

  analysisEndDt: string; // "yyyyMMddHHmm"
  analysisStartDt: string; // "yyyyMMddHHmm"

  closeOffSceduleId: number;
  closeOnSceduleId: number;

  elapsedHeartServiceDate: string; // "yyyyMMdd"

  filterList: FilterItem[];
  filterdeliveryList: FilterDeliveryItem[];

  humidity: number; // 루트의 실내습도(숫자)
  netStatus: boolean;

  nextHeartService: string; // "yyyyMMdd"

  pm10Graph: Pm10GraphPoint[];

  prodStatus: ProdStatus;

  schedules: ScheduleItem[];

  temperature: number; // 루트의 실내온도(숫자)
}
