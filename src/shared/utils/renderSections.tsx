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
 * @param sections - 렌더링할 SectionSpec 배열
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

  // 1. sectionFilter가 있으면 해당 섹션만 필터링, 없으면 전체 사용
  const sectionsToRender = sectionFilter
    ? sections.filter((section) => sectionFilter.includes(section.section))
    : sections;

  // 2. 필터링된 섹션들을 순회하며 렌더링
  return sectionsToRender.map((section) => (
    <React.Fragment key={section.section}>
      {renderFromSpec(section.components, componentMap, dynamicPropsMap)}
    </React.Fragment>
  ));
};
