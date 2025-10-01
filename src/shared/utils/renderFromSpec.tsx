import type {
  ComponentSpec,
  ContentSection,
} from '@/domain/device/types/productUISpec.types';
import React, { type ComponentType } from 'react';

export const renderFromSpec = (
  specs: ComponentSpec<Record<string, any>>[] | undefined,
  componentMap: Record<string, ComponentType<any>>,
  // dynamicPropsMap을 받도록 타입 변경
  dynamicPropsMap: Record<string, (spec: ComponentSpec<Record<string, any>>) => Record<string, any>> = {},
) => {
  if (!specs) {
    return null;
  }

  return specs.map((spec, index) => {
    const Component = componentMap[spec.name];
    if (!Component) {
      console.warn(
        `[renderFromSpec] Component "${spec.name}" not found in componentMap.`,
      );
      return null;
    }

    // dynamicPropsMap에서 해당 컴포넌트의 동적 props 함수를 찾아서 실행
    const getComponentDynamicProps = dynamicPropsMap[spec.name];
    const componentDynamicProps = getComponentDynamicProps ? getComponentDynamicProps(spec) : {};

    // 정적 props와 동적 props를 병합 (동적 props가 정적 props를 오버라이드)
    const mergedProps = { ...spec.props, ...componentDynamicProps };
    return <Component key={`${spec.name}-${index}`} {...mergedProps} />;
  });
};

// 공용 헬퍼 함수: 단일 또는 다수의 ContentSection을 받아 Fragment로 감싸 렌더링
export const renderSimpleSections = (
  sectionsInput: ContentSection | ContentSection[] | undefined, // 단일 객체도 받도록 수정
  componentMap: Record<string, React.ComponentType<any>>,
) => {
  if (!sectionsInput) {
    return null;
  }

  const sectionsArray = Array.isArray(sectionsInput)
    ? sectionsInput
    : [sectionsInput]; // 단일 객체를 배열로 변환

  return sectionsArray.map((section) => (
    <React.Fragment key={section.section}>
      {renderFromSpec(section.components, componentMap)}
    </React.Fragment>
  ));
};