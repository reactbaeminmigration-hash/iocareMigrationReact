// =================================================================
// UI 컴포넌트 및 페이지 레이아웃을 위한 타입
// =================================================================

// 동적으로 렌더링될 컴포넌트의 명세
export interface ComponentSpec<T_Props = Record<string, any>> {
  name: string;
  props: T_Props | {};
}

// 페이지의 content 영역을 구성하는 섹션
export interface ContentSection<T_Props = Record<string, any>> {
  section: string;
  components: ComponentSpec<T_Props>[];
}

// 페이지의 전체 레이아웃
export interface PageLayout<T_Props = Record<string, any>> {
  header: ContentSection<T_Props>[];
  content: ContentSection<T_Props>[];
}

// 제품별 페이지 레이아웃의 집합
export type PagesSpec<T_Props = Record<string, any>> = Record<string, PageLayout<T_Props>>;


// =================================================================
// 기존 제품 정보 관련 타입
// =================================================================

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
export interface ProductUISpec<T_Features, T_Props = Record<string, any>> {
  family: string; // 제품군 이름 (예: 'CAPTAIN')
  region: string; // 판매 지역 (예: 'KR', 'US')
  tabs: ProductTab[]; // 제품별로 보여줄 탭 목록 (다시 추가)
  pages: PagesSpec<T_Props>; // 👈 추가된 페이지 레이아웃 정의
  features: T_Features;
  models: ProductModel<T_Features>[]; // 해당 제품군에 속하는 모델 목록
}

export interface FoundProductUISpec<T_Features> {
  family: string;
  region: string;
  tabs: ProductTab[]; // 추가
  features: T_Features;
  model: ProductModel<T_Features>;
}
