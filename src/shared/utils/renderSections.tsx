import type {
  ComponentSpec,
  ContentSection,
} from '@/domain/device/types/productUISpec.types';
import React, { type ComponentType } from 'react';
import { renderFromSpec } from './renderFromSpec';

type ComponentMap = Record<string, ComponentType<any>>;
type DynamicPropsMap = Record<
  string,
  (spec: ComponentSpec<any>) => Record<string, any>
>;

/**
 * 섹션 배열을 받아 컴포넌트를 렌더링하는 유틸리티 함수.
 * @param sections - 렌더링할 ContentSection 배열
 * @param componentMap - 컴포넌트 이름과 실제 컴포넌트를 매핑한 객체
 * @param dynamicPropsMap - 동적으로 주입할 props를 생성하는 함수들의 맵
 * @param sectionFilter - (선택 사항) 렌더링할 섹션의 이름 배열. 제공되지 않으면 모든 섹션을 렌더링.
 * @returns 렌더링된 React 요소 배열
 */
export const renderSections = (
  sections: ContentSection[] | undefined,
  componentMap: ComponentMap,
  dynamicPropsMap: DynamicPropsMap,
  sectionFilter?: string[],
) => {
  if (!sections) {
    return null;
  }

  if (!sectionFilter) {
    return sections.map((section) => (
      <React.Fragment key={section.section}>
        {renderFromSpec(section.components, componentMap, dynamicPropsMap)}
      </React.Fragment>
    ));
  }

  return sections.map((section) => {
    const isSectionMatch = sectionFilter.includes(section.section);
    const componentsToRender = isSectionMatch
      ? section.components
      : section.components.filter((component) => {
          const isMatch = sectionFilter.includes(component.name);
          return isMatch;
        });

    return componentsToRender.length > 0 ? (
      <React.Fragment key={`${section.section}-filtered`}>
        {renderFromSpec(componentsToRender, componentMap, dynamicPropsMap)}
      </React.Fragment>
    ) : null;
  });
};
