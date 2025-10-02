import type { ComponentSpec } from '@/domain/device/types/productUISpec.types';
import { type ComponentType } from 'react';

export const renderFromSpec = (
  specs: ComponentSpec<Record<string, any>>[] | undefined,
  componentMap: Record<string, ComponentType<any>>,
  // dynamicPropsMap을 받도록 타입 변경
  dynamicPropsMap: Record<
    string,
    (spec: ComponentSpec<Record<string, any>>) => Record<string, any>
  > = {},
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
    const componentDynamicProps = getComponentDynamicProps
      ? getComponentDynamicProps(spec)
      : {};

    // 정적 props와 동적 props를 병합 (동적 props가 정적 props를 오버라이드)
    const mergedProps = { ...spec.props, ...componentDynamicProps };
    return <Component key={`${spec.name}-${index}`} {...mergedProps} />;
  });
};
