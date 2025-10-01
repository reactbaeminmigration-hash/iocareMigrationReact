// ... (BaseComponentSpec, GraphComponentSpec, ControlComponentSpec, DehumidComponentSpec 타입은 동일)
export interface BaseComponentSpec {
  // ...
}
export interface GraphComponentSpec extends BaseComponentSpec {
  type: 'GRAPH';
  graphType: 'HUMIDITY' | 'DEHUMIDIFICATION_STATUS' | 'CUSTOM'; // Dehumid specific graph types
}
export interface ControlComponentSpec extends BaseComponentSpec {
  type: 'CONTROL';
}
// Dehumid specific component types
export type DehumidComponentSpec = GraphComponentSpec | ControlComponentSpec;

// 렌더링될 컴포넌트의 설정
export interface ComponentConfig {
  name: string; // componentMap의 키
  props: Record<string, unknown>;
}

// 페이지 내 컨텐츠 섹션의 구조
export interface ContentSection {
  section: string; // 섹션의 이름 (예: 'humidity-status', 'mode-control')
  components: ComponentConfig[];
}

/**
 * @description Dehumid 도메인의 전체 UI 설정 스펙을 정의하는 최상위 타입 (제네릭 버전)
 * @template T_CompKeys components 객체의 키 타입
 * @template T_Features 제품군별 특화 기능 타입
 */
export interface DehumidUIConfigSpec<
  T_CompKeys extends string,
  T_Features extends Record<string, unknown> = {},
> {
  model: string;
  components?: Record<T_CompKeys, DehumidComponentSpec>;
  pages: {
    home: {
      header: ComponentConfig[];
      content: ContentSection[];
    };
    // ...
  };
  features: T_Features;
}

/**
 * @description 타입 추론을 위한 헬퍼 함수
 * 이 함수를 사용하면 DehumidUIConfigSpec 객체를 만들 때 TypeScript가
 * `components` 객체의 키를 정확히 추론하여 `pages` 설정의 유효성을 검사해줍니다.
 */
export const asProductSpec = <
  T_CompKeys extends string,
  T_Features extends Record<string, unknown> = {},
>(
  spec: DehumidUIConfigSpec<T_CompKeys, T_Features>,
): DehumidUIConfigSpec<T_CompKeys, T_Features> => spec;
