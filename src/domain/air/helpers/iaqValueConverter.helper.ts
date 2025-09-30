import {
  COMMON_TABLES,
  LGAS_TABLES,
  OPM10_TABLES,
  OPM25_TABLES,
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

/**
 * 실내(IAQ) PM2.5 데이터를 변환합니다.
 * @param rawList 실내 PM2.5 원본 데이터 배열
 */
export const getIaqPm25ConvertList = (
  rawList: (number | string | null)[],
): (number | null)[] => {
  return getIaqConvertedList(rawList, PM25_TABLES);
};

/**
 * 실내(IAQ) PM10 데이터를 변환합니다.
 * @param rawList 실내 PM10 원복 데이터 배열
 */
export const getIaqPm10ConvertList = (
  rawList: (number | string | null)[],
): (number | null)[] => {
  return getIaqConvertedList(rawList, PM10_TABLES);
};

/**
 * 실내(IAQ) 데이터를 변환합니다.
 * @param rawList 실내 원복 데이터 배열
 */
const getIaqConvertedList = (
  rawList: (number | string | null)[],
  baseTable: any,
): (number | null)[] => {
  const indoorBaseTable = baseTable;

  const convertedList = rawList.map((rawValue) => {
    if (rawValue === null) {
      return null;
    }
    const numericValue = Number(rawValue);
    if (isNaN(numericValue)) {
      return null;
    }
    return convertSingleValue(numericValue, indoorBaseTable);
  });
  return applyGraphValuePlus(convertedList);
};

/**
 * 실외(OAQ) PM2.5 데이터를 변환합니다.
 * @param rawList 실외 PM2.5 원본 데이터 배열
 */
export const getOaqPm25ConvertList = (
  rawList: (number | string | null)[],
): (number | null)[] => {
  const convertedList = getOaqConvertedList(rawList, OPM25_TABLES);
  return applyGraphValuePlus(convertedList);
};

/**
 * 실외(OAQ) PM10 데이터를 변환합니다.
 * @param rawList 실외 PM10 원본 데이터 배열
 */
export const getOaqPm10ConvertList = (
  rawList: (number | string | null)[],
): (number | null)[] => {
  const convertedList = getOaqConvertedList(rawList, OPM10_TABLES);
  return applyGraphValuePlus(convertedList);
};

/**
 * 실외(OAQ) 데이터를 변환합니다.
 * @param rawList 실외 원본 데이터 배열
 */
const getOaqConvertedList = (
  rawList: (number | string | null)[],
  outdoorBaseTable: any,
): (number | null)[] => {
  return rawList.map((rawValue) => {
    if (rawValue === null) {
      return null;
    }
    const numericValue = Number(rawValue);
    if (isNaN(numericValue)) {
      return null;
    }
    return convertSingleValue(numericValue, outdoorBaseTable);
  });
};

export const getLgasConvertList = (
  rawList: (number | string | null)[],
): (number | null)[] => {
  return getIaqConvertedList(rawList, LGAS_TABLES);
};
