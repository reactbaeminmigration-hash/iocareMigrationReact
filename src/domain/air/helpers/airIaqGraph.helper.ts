import type { IaqGraphProps, IaqGraphRawItem } from '../types/airIaqDetail.types';

/**
 * IAQ 그래프 데이터로부터 x축(시간 또는 날짜) 배열을 계산합니다.
 * @param list API 원본 데이터 리스트
 * @param timeFlag 'hour' 또는 'day'
 * @returns x축으로 사용될 숫자 배열 (예: [0, 1, 2, ... , 23] 또는 [1, 2, ... , 31])
 */
export const calculateXAxisTime = ({
  list,
  timeFlag,
}: IaqGraphProps): number[] => {
  // 데이터가 없으면 빈 배열 반환
  if (!list || list.length === 0) {
    return [];
  }

  // timeFlag에 따라 msrDt에서 값을 추출할 인덱스 결정
  // 'hour' -> '202309220800' 에서 '08' (시간) 추출
  // 'day' -> '202309220800' 에서 '22' (일) 추출
  const formatSubArray = timeFlag === 'hour' ? [8, 10] : [6, 8];
  const msrDtKey = 'msrDt';

  // 'out'이 아닌 데이터만 필터링하여 xAxis 값 추출
  return list
    .filter((item) => item.place !== 'out')
    .map((item) => {
      const dateValue = item[msrDtKey]?.substring(
        formatSubArray[0],
        formatSubArray[1],
      );
      // 혹시 모를 undefined나 빈 문자열에 대비해 기본값 0을 반환
      return dateValue ? Number(dateValue) : 0;
    });
};

/**
 * IAQ 그래프 데이터로부터 실내 공기질(inGraph) 데이터 배열을 계산합니다.
 * @param list API 원본 데이터 리스트
 * @returns 실내 공기질 값의 배열. 각 값은 숫자 또는 null입니다.
 */
export const calculateInGraphData = ({
  list,
}: IaqGraphProps): (number | string | null)[] => {
  if (!list || list.length === 0) {
    return [];
  }

  return list
    .filter((item) => item.place !== 'out')
    .map((item) => {
      const graphValue = item.graphValue;
      // 값이 null이거나, 숫자 0 또는 문자열 '0'이면 null로 처리
      if (graphValue === null || graphValue === '0') {
        return null;
      }
      return graphValue;
    });
};

/**
 * IAQ 그래프 데이터로부터 실외 공기질(outGraph) 데이터 배열을 계산합니다.
 * @param graphData IaqGraphProps
 * @returns 실외 공기질 값의 배열
 */
/**
 * IAQ 그래프 데이터로부터 실내 공기질 최대값(inMaxGraph) 데이터 배열을 계산합니다.
 * @param list API 원본 데이터 리스트
 * @returns 실내 공기질 최대값의 배열. 각 값은 숫자 또는 null입니다.
 */
export const calculateInMaxGraphData = ({
  list,
}: IaqGraphProps): (number | null)[] => {
  if (!list || list.length === 0) {
    return [];
  }

  return list
    .filter((item) => item.place !== 'out')
    .map((item) => {
      const highValue = item.graphHighValue;
      // 값이 null이거나 0이면 null로 처리하여 그래프에 공백을 만듭니다.
      if (highValue === null || highValue === 0) {
        return null;
      }
      return highValue;
    });
};

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
    return []; // Or handle error appropriately
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