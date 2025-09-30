// import { defaultTabsInfo } from '../common/defaultTabsInfo'; // 제거
import { defaultFeaturesInfo } from '@/domain/air/constants/airDefinitions'; // 추가
import { asProductSpec } from '../types';

export const marvelSpec = asProductSpec({
  // 제품 모델명 또는 제품군을 식별하는 고유한 값
  model: 'MARVEL_FAMILY',

  /**
   * 'Marvel' 제품군에서 사용하는 모든 UI 기능(컴포넌트) 정의
   */
  components: {
    IAQ_GRAPH_MAIN: {
      type: 'GRAPH',
      graphType: 'IAQ',
    },
    POWER_CONTROL: {
      type: 'CONTROL',
      // ... 전원 제어에 필요한 속성
    },
    FAN_SPEED_CONTROL: {
      type: 'CONTROL',
      // ... 팬 속도 제어에 필요한 속성
    },
  },

  /**
   * 정의된 컴포넌트들을 조립하여 실제 페이지를 구성
   */
  pages: {
    home: {
      components: ['IAQ_GRAPH_MAIN', 'POWER_CONTROL', 'FAN_SPEED_CONTROL'],
    },
  },

  /**
   * 'Marvel' 제품군에만 존재하는 특수한 기능 플래그 등
   */
  features: {
    ...defaultFeaturesInfo, // AirFeatures 타입에 맞게 기본값 사용
    // 예: 이 제품군은 '자동 모드' 설명 팝업을 띄워야 하는가?
    // showAutoModeGuide: true, // 필요하다면 여기에 추가적인 Marvel 특화 기능 정의
  },
});
