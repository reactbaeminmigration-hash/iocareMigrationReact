export interface UserDataInfo {
  callingCd: string; // 국가 전화 코드 (예: "+82")
  cntryId: string; // 국가 ID (예: "KR")
  content: string; // 추가 콘텐츠
  email: string; // 이메일 주소
  emailVerified: 'Y' | 'N'; // 이메일 인증 여부
  joinChCd: string; // 가입 채널 코드
  locale: string; // 언어/지역 코드 (예: "ko-KR")
  loginType: string; // 로그인 타입
  mbrNm: string; // 회원 이름
  mbrStatCode: string; // 회원 상태 코드
  phoneNum: string; // 전화번호
  phoneVerified: 'Y' | 'N'; // 전화번호 인증 여부
  seqNum: string; // 회원 고유 번호
  autoLoginYn: 'Y' | 'N'; // 자동 로그인 여부
  migUserType: string; // 마이그레이션 유저 타입
  safekey: string; // 보안 키
}

export interface UserAuthData {
  authorized: boolean; // 인증 여부
  dataInfo: UserDataInfo; // 사용자 상세 정보
  user: string; // 사용자명
}
