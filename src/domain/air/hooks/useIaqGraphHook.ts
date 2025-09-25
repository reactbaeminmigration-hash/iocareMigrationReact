import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { DateRangeTranslations } from '../../../shared/utils/date.utils';
import {
  calculateDateRange,
  calculateInGraphData,
  calculateInMaxGraphData,
  calculateOutGraphData,
  calculateXAxisTime,
} from '../helpers/airIaqGraph.helper';
import type { IaqGraphProps } from '../types/airIaqDetail.types';

/**
 * IAQ 상세 데이터로부터 그래프를 그리는 데 필요한 가공된 데이터를 생성하는 훅
 * @param graphData 차트 원본 데이터
 * @returns 가공된 그래프 데이터 및 날짜 범위 문자열
 */
export const useIaqGraphData = (graphData?: IaqGraphProps) => {
  const { t } = useTranslation();

  const dateRangeTranslations: DateRangeTranslations = {
    conYear: t('CON.YEAR'),
    conMonth: t('CON.MONTH'),
    conDay: t('CON.DAY'),
    conAM: t('CON.MORNING'),
    conPM: t('CON.AFTERNOON'),
  };

  const { xAxisTime, inGraphData, outGraphData, inMaxGraphData, dateRange } =
    useMemo(() => {
      if (!graphData) {
        return {
          xAxisTime: [],
          inGraphData: [],
          outGraphData: [],
          inMaxGraphData: [],
          dateRange: '',
        };
      }

      // useMemo 내에서 모든 데이터를 한 번에 계산
      const calculatedXAxisTime = calculateXAxisTime(graphData);
      const calculatedInGraphData = calculateInGraphData(graphData);
      const calculatedOutGraphData = calculateOutGraphData(graphData);
      const calculatedInMaxGraphData = calculateInMaxGraphData(graphData);
      const calculatedDateRange = calculateDateRange(
        graphData,
        dateRangeTranslations,
      );

      return {
        xAxisTime: calculatedXAxisTime,
        inGraphData: calculatedInGraphData,
        outGraphData: calculatedOutGraphData,
        inMaxGraphData: calculatedInMaxGraphData,
        dateRange: calculatedDateRange,
      };
    }, [graphData, t]); // Add t to dependency array

  return {
    xAxisTime,
    inGraphData,
    outGraphData,
    inMaxGraphData,
    dateRange,
  };
};
