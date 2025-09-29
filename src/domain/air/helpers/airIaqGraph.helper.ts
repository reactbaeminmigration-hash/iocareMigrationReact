import {
  parseDateString,
  type DateRangeTranslations,
} from '@/shared/utils/date.utils';
import type {
  IaqGraphProps,
  IaqGraphRawItem,
} from '../types/airIaqDetail.types';

// --- 그래프 데이터 계산 헬퍼 함수 ---

/**
 * IAQ 그래프 데이터로부터 x축(시간 또는 날짜) 배열을 계산합니다.
 */
export const calculateXAxisTime = ({
  list,
  timeFlag,
}: IaqGraphProps): number[] => {
  if (!list || list.length === 0) {
    return [];
  }
  const formatSubArray = timeFlag === 'hour' ? [8, 10] : [6, 8];
  const msrDtKey = 'msrDt';
  return list
    .filter((item) => item.place !== 'out')
    .map((item) => {
      const dateValue = item[msrDtKey]?.substring(
        formatSubArray[0],
        formatSubArray[1],
      );
      return dateValue ? Number(dateValue) : 0;
    });
};

/**
 * IAQ 그래프 데이터로부터 실내 공기질(inGraph) 데이터 배열을 계산합니다.
 */
export const calculateInGraphData = ({
  list,
}: IaqGraphProps): (number | null)[] => {
  if (!list || list.length === 0) {
    return [];
  }
  return list
    .filter((item) => item.place !== 'out')
    .map((item) => {
      const graphValue = item.graphValue;

      // 값이 null이거나 0이면 null로 처리 (유연한 비교로 수정)
      if (graphValue === null || graphValue == '0') {
        return null;
      }

      // string 또는 number 타입의 값을 number로 변환
      const numericValue = Number(graphValue);

      // 변환 결과가 유효하지 않은 숫자(NaN)이면 null로 처리
      return isNaN(numericValue) ? null : numericValue;
    });
};

/**
 * IAQ 그래프 데이터로부터 실내 공기질 최대값(inMaxGraph) 데이터 배열을 계산합니다.
 */
export const calculateInMaxGraphData = ({
  list,
}: IaqGraphProps): (number | string | null)[] => {
  if (!list || list.length === 0) {
    return [];
  }
  return list
    .filter((item) => item.place !== 'out')
    .map((item) => {
      const highValue = item.graphHighValue;
      // highValue가 숫자 0 또는 문자열 '0'일 경우를 모두 처리하도록 유연한 비교(==)로 수정
      if (highValue === null || highValue === '0') {
        return null;
      }
      return highValue;
    });
};

/**
 * IAQ 그래프 데이터로부터 실외 공기질(outGraph) 데이터 배열을 계산합니다。
 */
export const calculateOutGraphData = ({
  list,
  timeFlag,
  rangeValue,
}: IaqGraphProps): number[] => {
  if (!list || list.length === 0) {
    return [];
  }
  const numericRangeValue = Number(rangeValue);
  if (isNaN(numericRangeValue)) {
    return [];
  }
  const graphValueKey = 'graphValue';
  const getGraphValue = (item: IaqGraphRawItem | null): number => {
    if (!item || item[graphValueKey] === null || item[graphValueKey] === '') {
      return 0;
    }
    return Number(item[graphValueKey]);
  };
  const outDataPoints = list.filter((item) => item.place === 'out');
  if (timeFlag === 'hour' && numericRangeValue === 6) {
    const multipliedValues = outDataPoints.flatMap((item) =>
      Array(6).fill(getGraphValue(item)),
    );
    const data = multipliedValues.slice(-(numericRangeValue * 6));
    if (data.length === numericRangeValue * 6) {
      const lastItem = list.length > 0 ? list[list.length - 1] : null;
      data.push(getGraphValue(lastItem));
    } else {
      const paddingCount = numericRangeValue * 6 - data.length + 1;
      if (paddingCount > 0) {
        data.push(...Array(paddingCount).fill(0));
      }
    }
    return data;
  }
  const outValues = outDataPoints.map(getGraphValue);
  return outValues.slice(-numericRangeValue);
};

/**
 * 그래프 상단에 표시될 날짜/시간 범위를 문자열로 생성합니다. (한국어 고정)
 */
export const calculateDateRange = (
  { list, rangeValue }: IaqGraphProps,
  translations: DateRangeTranslations,
): string => {
  if (!list || list.length === 0 || !translations) {
    return '';
  }

  const timeArray = list
    .filter((item) => item.place !== 'out' && item.msrDt)
    .map((item) => item.msrDt);

  if (timeArray.length < 2) {
    return '';
  }

  const firstDateStr = timeArray[0];
  const lastDateStr = timeArray[timeArray.length - 1];

  const firstDateObj = parseDateString(firstDateStr);
  const lastDateObj = parseDateString(lastDateStr);

  const numericRangeValue = Number(rangeValue);

  // 시간 단위 그래프 (24시간, 6시간)
  if (numericRangeValue === 24 || numericRangeValue === 6) {
    const formatHour = (date: Date) => {
      const h24 = date.getHours();
      const ampm = h24 >= 12 ? translations.conPM : translations.conAM;
      let h12 = h24 % 12;
      if (h12 === 0) h12 = 12; // 0시는 12시로 표시
      const minutes = date.getMinutes().toString().padStart(2, '0');

      return `${date.getMonth() + 1}${translations.conMonth} ${date.getDate()}${
        translations.conDay
      } ${ampm} ${h12}:${minutes}`;
    };
    return `${formatHour(firstDateObj)} ~ ${formatHour(lastDateObj)}`;
  }
  // 일/주/월 단위 그래프
  else {
    const formatDate = (date: Date) => {
      return `${date.getFullYear()}${
        translations.conYear
      } ${date.getMonth() + 1}${translations.conMonth} ${date.getDate()}${
        translations.conDay
      }`;
    };
    return `${formatDate(firstDateObj)} ~ ${formatDate(lastDateObj)}`;
  }
};
