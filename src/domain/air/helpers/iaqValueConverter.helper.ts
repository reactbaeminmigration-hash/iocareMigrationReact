import {
  COMMON_TABLES,
  MIGHTY_PRODUCT_CODES,
  OPM10_TABLES,
  OPM25_TABLES,
  PM10_MIGHTY_TABLES,
  PM10_TABLES,
  PM25_TABLES,
} from '../constants/pm10Tables';

type GradeTable = Record<string, [number, number]>;

// #region 내부 유틸리티 함수

const getGrade = (data: number, table: GradeTable): string => {
  let resultGrade = '';

  if (data >= table.VBAD[1]) {
    resultGrade = 'VBAD';
  } else {
    for (const key in table) {
      if (Object.prototype.hasOwnProperty.call(table, key)) {
        if (data >= table[key][0] && data < table[key][1]) {
          resultGrade = key;
          break;
        }
      }
    }
  }
  return resultGrade;
};

const getRate = (table: [number, number], grade: string): number => {
  const oldInterval = table[1] - table[0];
  if (oldInterval === 0) return 0; // 0으로 나누기 방지

  const newInterval = COMMON_TABLES[grade][1] - COMMON_TABLES[grade][0];
  return newInterval / oldInterval;
};

const applyGraphValuePlus = (list: (number | null)[]): (number | null)[] => {
  return list.map((value) => {
    if (value === null) {
      return null;
    }
    return Math.min(value + 1, 100);
  });
};

const convertSingleValue = (
  rawValue: number | null,
  baseTable: GradeTable,
): number | null => {
  if (rawValue === null) {
    return null;
  }

  const grade = getGrade(rawValue, baseTable);

  if (!grade) {
    if (rawValue >= baseTable.VBAD[1]) return 100;
    if (rawValue < (baseTable.GOOD?.[0] ?? 0)) return 0;
    return null;
  }

  const rate = getRate(baseTable[grade], grade);

  return COMMON_TABLES[grade][0] + (rawValue - baseTable[grade][0]) * rate;
};

// #endregion

// #region 외부에 공개될 헬퍼 함수

/**
 * 실내(IAQ) PM10 데이터를 변환합니다.
 * @param rawList 실내 PM10 원본 데이터 배열
 * @param productCode 제품 코드
 */
export const getIaqPm10ConvertList = (
  rawList: (number | null)[],
  productCode: string,
): (number | null)[] => {
  const indoorBaseTable = MIGHTY_PRODUCT_CODES.includes(productCode)
    ? PM10_MIGHTY_TABLES
    : PM10_TABLES;

  const convertedList = rawList.map((rawValue) =>
    convertSingleValue(rawValue, indoorBaseTable),
  );

  return applyGraphValuePlus(convertedList);
};

/**
 * 실외(OAQ) PM10 데이터를 변환합니다.
 * @param rawList 실외 PM10 원본 데이터 배열
 */
export const getOaqPm10ConvertList = (
  rawList: (number | null)[],
): (number | null)[] => {
  const outdoorBaseTable = OPM10_TABLES;

  return rawList.map((rawValue) =>
    convertSingleValue(rawValue, outdoorBaseTable),
  );
};

/**
 * 실내(IAQ) PM2.5 데이터를 변환합니다.
 * @param rawList 실내 PM2.5 원본 데이터 배열
 */
export const getIaqPm25ConvertList = (
  rawList: (number | null)[],
): (number | null)[] => {
  const indoorBaseTable = PM25_TABLES;

  const convertedList = rawList.map((rawValue) =>
    convertSingleValue(rawValue, indoorBaseTable),
  );
  return applyGraphValuePlus(convertedList);
};

/**
 * 실외(OAQ) PM2.5 데이터를 변환합니다.
 * @param rawList 실외 PM2.5 원본 데이터 배열
 */
export const getOaqPm25ConvertList = (
  rawList: (number | null)[],
): (number | null)[] => {
  const outdoorBaseTable = OPM25_TABLES;

  return rawList.map((rawValue) =>
    convertSingleValue(rawValue, outdoorBaseTable),
  );
};

// #endregion
