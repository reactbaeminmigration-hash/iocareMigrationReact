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
  list: {
    msrDt: string; // 측정 시각
    place: 'in' | 'out' | string; // 측정 장소 (실내/실외)
    graphHighValue: number | null; // 최대값
    graphValue: number | null; // 측정값
  }[];
}
