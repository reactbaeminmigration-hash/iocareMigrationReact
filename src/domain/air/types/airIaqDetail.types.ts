// API 응답 리스트의 개별 아이템 타입
export interface IaqGraphRawItem {
  msrDt: string; // 측정 시각
  place: 'in' | 'out' | string; // 측정 장소 (실내/실외)
  graphHighValue: number | string | null; // 최대값
  graphValue: number | string | null; // 측정값
}

// 훅과 헬퍼에 전달될 데이터의 구조
export interface IaqGraphProps {
  list: IaqGraphRawItem[];
  timeFlag: 'hour' | 'day'; //  hour [8, 10]  day [6, 8];
  rangeValue?: number | string; // 6, ... api laq데이터에 따라 다름
}

export interface RequestAirIaqDetail {
  resetDttm: string;
  period: 'D' | 'W' | 'M' | ''; // 시간별 탭 (일/주/월)
  type: number;
  serNr: string;
  deviceType: string;
  stationCd: string; // 관측소 코드
  isHomeData: boolean;
}

/** 메인 응답 구조 */
export interface ResponseAirIaqDetail {
  analysisStartDt: string; // 분석 시작 일시 (예: 202509190640)
  analysisEndDt: string; // 분석 종료 일시 (예: 202509191240)
  list: IaqGraphRawItem[];
}
