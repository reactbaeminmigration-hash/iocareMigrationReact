export interface RequestAppSetting {
  mbrSeq: string;
}

export interface ResponseAppSetting {
  list: {
    autoRefresh: string; // 자동 새로고침 설정 (초 단위)
    isNoData: boolean; // 설정 데이터 존재 유무 (true : 데이터 미존재, false : 데이터 존재)
    language: string; // 언어 설정 (ko / en)
    tempUnit: string; // 온도 단위 (˚C / ˚F)
    timezone: string; // 타임존 설정 (ex: Asia/Seoul)
    weatherArea: string; // 날씨 지역 설정(KR / US)
    weightUnit: string; // 계량 단위 (l / oz)
  }[];
}
