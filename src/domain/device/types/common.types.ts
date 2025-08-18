export interface BaseDeviceRequest {
  langCd: string;
  appVersion: string;
}

// 국가 그룹 매핑 (key는 어떤 문자열이든 가능)
export type RegionInfos = Record<string, string[]>;

// 제품 정보
export interface ProdStandDeviceInfo {
  familyId: string; // 제품군 ID (예: "01")
  familyName: string; // 제품군 이름 (예: "청정기")
  svcCode?: string; // 서비스 코드 (일부만 존재)
  productModel: string; // 내부 모델명
  productName: ProductName | ProductName[]; // 단일 문자열 또는 다국어 배열
  modelCode: string; // 모델 코드
  makrModelCode: string; // 제조사 모델 코드

  featureType?: string; // 기능 타입 (IOT, BLE, NFC 등)
  moduleType?: string; // 모듈 타입
  wifiType?: string; // 와이파이 타입
  isBle?: boolean; // BLE 지원 여부
  isWifi?: boolean; // Wi-Fi 지원 여부
  isEasyPairing?: boolean; // 간편 연결 지원 여부

  cntryCdAlpha2?: string; // 기본 국가 코드 (ISO Alpha-2)
  searchRegion?: string[]; // 검색 가능 지역 코드 리스트

  dart?: boolean;
  isSmartDetection?: boolean;
  isPba?: boolean;
  isUseV1?: boolean;
  isUseV2?: boolean;
}

// 다국어 제품명
export interface ProductName {
  countryGroupCode: string; // 국가 코드 (예: "KOR", "JPN")
  name: string; // 해당 국가에서의 제품명
}
// category 블록
export interface CategoryInfo {
  imageUrl: string;
  categories: CategoryItem[];
}

// category.categories 요소
export interface CategoryItem {
  familyId: string;
  familyName: string;
  productModel: string;
  productName: LocalizedProductName[];
  modelCode: string;
  makrModelCode: string;
  featureType: string;
  cntryCdAlpha2: string;
  searchRegion: string[];
}

// 다국어 제품명
export interface LocalizedProductName {
  countryGroupCode: string;
  name: string;
}
