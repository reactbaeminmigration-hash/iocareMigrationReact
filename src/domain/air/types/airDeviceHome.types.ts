export interface RequestAirDeviceHome {
  admdongCd: string; // 주소 코드
  barcode: string; // 기기 시리얼 넘버
  dvcBrandCd: string; // 디바이스 브랜드 코드(CW:코웨이,MG:메가)
  prodName: string; // 디바이스 그룹명(AIS, AIS_SODA...)
  stationCd: string; // 위치 코드
  zipCode: string; // 우편번호(MG)
  resetDttm: string; // 리셋 날짜(yyyymmddhh) 없을 시 ""
  deviceType: string; // 디바이스 타입 (4: 청정기, QQQ:안테나)
  mqttDevice: boolean; // MQTT 지원 여부
  orderNo: string; // 주문번호
  membershipYn: string; // 하트서비스 여부
  selfYn: string; // 자가관리 여부
}

/** 메인 응답 구조 */
export interface ResponseAirDeviceHome {
  analysisStartDt: string;
  analysisEndDt: string;
  closeOffSceduleId: number;
  closeOnSceduleId: number;
  elapsedHeartServiceDate: string;
  filterList: FilterInfo[];
  IAQ: IAQData;
  OAQ: OAQData;
  schedules: Schedule[];
  pm10Graph: GraphData[];
  prodStatus: ProdStatus;
  nextHeartService: string;
  humidity: number;
  temperature: number;
  netStatus: boolean;
  filterdeliveryList: any[]; // 추후 구체화 가능
}

/** 필터 정보 */
export interface FilterInfo {
  changeCycle: string; // 교체 주기 (예: "2")
  cycleInfo: string; // 주기 단위 (W:주, M:월)
  filterCode: string; // 필터 코드
  filterName: string; // 필터 이름
  filterPer: number; // 필터 사용률(%)
  sort: number; // 정렬 순서
  lastChangeDate: string; // 마지막 교체일 (yyyymmdd)
}

/** 실내 공기질 */
export interface IAQData {
  co2: string;
  dustpm1: string;
  dustpm10: string;
  dustpm25: string;
  humidity: string;
  inairquality: string;
  temperature: string;
  vocs: string;
  rpm: string;
}

/** 실외 공기질 */
export interface OAQData {
  address: string;
  humidity: string;
  icon: string;
  mainairgrade: string;
  presenttime: string;
  temp: string;
}

/** 스케줄 */
export interface Schedule {
  scheId: number;
  dayOfWeek: string[];
  cmdValue: number;
  startTime: string;
  endTime: string;
  lightOnOff: number;
  specialMode: string | null;
  movingMode: number;
  enabled: string; // "Y" | "N"
  devDtTimezn: string;
  devDstTimezn: string;
}

/** PM10 그래프 데이터 */
export interface GraphData {
  msrDt: string; // 측정 시각
  place: 'in' | 'out' | string; // 측정 장소 (실내/실외)
  graphHighValue: number | null; // 최대값
  graphValue: number | string | null; // 측정값
}

/** 제품 상태 */
export interface ProdStatus {
  AICare: string;
  humidification: string;
  airVolume: string;
  dustPollution: string;
  dustSensitivity: string;
  light: string;
  lightDetail: string;
  pollenMode: string;
  power: string;
  prodMode: string;
  reservation: string;
  specialModeIndex: string;
  vocsGrade: string;
  silent: string;
  onTimer: string;
  purityFanAction: string;
  purityFanActionTime: string;
}
