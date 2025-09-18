// 제품 탭 정보
export interface ProductTab {
  path: string;
  label: string; // i18n 키 (예: 'BTN.HOME')
}

// 제품 매뉴얼 정보
export interface ProductManuals {
  filePath?: string;
  fileName?: string;
}

// 제품별 기능 플래그
export interface ProductFeatures {
  useEcoFriendlyText: boolean;
  // 필요에 따라 다른 기능 플래그를 추가할 수 있습니다.
}

// 특정 제품 모델 정보
export interface ProductModel<T_Features> {
  modelName: string;
  productCodes: string[]; // 해당 모델에 속하는 자재 코드 목록
  manuals: ProductManuals | {};
  features: Partial<T_Features> | {};
}

// 최상위 제품 정의 구조
export interface ProductUISpec<T_Features> {
  family: string; // 제품군 이름 (예: 'CAPTAIN')
  region: string; // 판매 지역 (예: 'KR', 'US')
  tabs: ProductTab[]; // 제품별로 보여줄 탭 목록
  features: T_Features;
  models: ProductModel<T_Features>[]; // 해당 제품군에 속하는 모델 목록
}

export interface FoundProductUISpec<T_Features> {
  family: string;
  region: string;
  tabs: ProductTab[];
  model: ProductModel<T_Features>;
}
