import type { DeviceInfo } from '@/domain/deivce/types/device.types';

export type RequestLogin = {
  authCode: string; // 사용자인증 성공 시 반환되는 코드(신회원에서 받은값:code)
  devDstTimezn: number; // 써머타임(써머타임없는경우:0)
  devDtTimezn: number; // 장치설치 타임존
  timeZone: string; // 타임존 명칭
  deviceUUID: string; // 단말기(스마트폰) 장비 아이디
  isMobile: string; // 모바일App 여부(M:모바일App)
  langCd: string; // 언어코드(한국어:ko, 영어:en 등...)
  osType: number; // 	1:iOS, 2:안드로이드
  osVersion: string; // 	OS 버전
  pushToken: string; // 	푸시토큰값
  redirectUrl: string; // 신회원체계 호출 후 사용된 URL(authCode가 있는 경우 무조건 같이 있어야함! 사용자 인증연결이 성공되면 이용기관으로 연결되는 UR?L)
  serviceCode: string; // Application id (Android : Package Name, iOS : App ID)
  appVersion: string; // 앱 버전
};

export type ResponseLogin = {
  deviceInfos: DeviceInfo[];
  userInfo: string;
};
