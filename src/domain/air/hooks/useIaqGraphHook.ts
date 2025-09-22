import { useMemo } from 'react';
import {
  calculateInGraphData,
  calculateInMaxGraphData, // 추가
  calculateOutGraphData,
  calculateXAxisTime,
} from '../helpers/airIaqGraph.helper';
import type { IaqGraphProps } from '../types/airIaqDetail.types';

/**
 * IAQ 상세 데이터로부터 그래프를 그리는 데 필요한 가공된 데이터를 생성하는 훅
 * @param graphData 차트 원본 데이터 (list, timeFlag, rangeValue 포함)
 * @returns {{xAxisTime: number[], inGraphData: (number | null)[], outGraphData: number[], inMaxGraphData: (number | null)[]}} 가공된 그래프 데이터
 */
export const useIaqGraphData = (graphData?: IaqGraphProps) => {
  const { xAxisTime, inGraphData, outGraphData, inMaxGraphData } = useMemo(() => {
    if (!graphData) {
      return {
        xAxisTime: [],
        inGraphData: [],
        outGraphData: [],
        inMaxGraphData: [],
      };
    }

    // useMemo 내에서 모든 데이터를 한 번에 계산
    const calculatedXAxisTime = calculateXAxisTime(graphData);
    const calculatedInGraphData = calculateInGraphData(graphData);
    const calculatedOutGraphData = calculateOutGraphData(graphData);
    const calculatedInMaxGraphData = calculateInMaxGraphData(graphData); // 추가

    return {
      xAxisTime: calculatedXAxisTime,
      inGraphData: calculatedInGraphData,
      outGraphData: calculatedOutGraphData,
      inMaxGraphData: calculatedInMaxGraphData, // 추가
    };
  }, [graphData]);

  return {
    xAxisTime,
    inGraphData,
    outGraphData,
    inMaxGraphData, // 반환값에 추가
  };
};
