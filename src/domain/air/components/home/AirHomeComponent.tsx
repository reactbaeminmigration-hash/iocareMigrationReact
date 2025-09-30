import { useDeviceContext } from '@/app/contexts/DeviceProvider';
import type {
  ComponentConfig,
  ContentSection,
} from '@/domain/air/definitions/types';
import { t } from 'i18next';
import { componentMap } from '../componentMap';

// 설정에 따라 컴포넌트 배열을 렌더링하는 헬퍼 함수
const renderComponents = (components: ComponentConfig[]) => {
  if (!components) return null;

  return components.map((compInfo, index) => {
    const Component = componentMap[compInfo.name];

    if (!Component) {
      console.error(
        `[Render] Component "${compInfo.name}" not found in componentMap.`,
      );
      return null;
    }

    const finalProps: Record<string, unknown> = { ...compInfo.props };

    // i18next 키 번역 처리
    if (finalProps.title) {
      finalProps.title = t(finalProps.title as any);
    }
    if (finalProps.buttonText) {
      finalProps.buttonText = t(finalProps.buttonText as any);
    }

    return <Component key={`${compInfo.name}-${index}`} {...finalProps} />;
  });
};

export const AirHomeComponent = () => {
  const { deviceUISpec } = useDeviceContext();
  const uiSpec = deviceUISpec;

  // 설정이 로드되지 않았거나, 페이지 설정이 없으면 로딩 상태 표시
  if (!uiSpec?.pages?.home) {
    // TODO: 적절한 로딩 스피너 컴포넌트로 교체
    return <div>Loading UI...</div>;
  }

  const { header, content } = uiSpec.pages.home;

  return (
    <div className="cw_contbox02">
      {/* 페이지 헤더 렌더링 */}
      {header && renderComponents(header)}

      <div className="cw_cont">
        {/* 페이지 컨텐츠 섹션들을 순서대로 렌더링 */}
        {content?.map((sectionData: ContentSection, index: number) => (
          <div
            key={index}
            className={`home-section home-section--${sectionData.section}`}
          >
            {renderComponents(sectionData.components)}
          </div>
        ))}
      </div>
    </div>
  );
};
