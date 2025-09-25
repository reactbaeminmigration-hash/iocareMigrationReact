export const MIGHTY_PRODUCT_CODES: string[] = ['112956', '113559', '113560'];

export const COMMON_TABLES: Record<string, [number, number]> = {
  GOOD: [0, 26],
  NORMAL: [26, 51],
  BAD: [51, 76],
  VBAD: [76, 100],
};

export const IAQ_TABLES: Record<string, [number, number]> = {
  GOOD: [0, 26],
  NORMAL: [26, 51],
  BAD: [51, 76],
  VBAD: [76, 100],
};

export const PM10_TABLES: Record<string, [number, number]> = {
  GOOD: [0, 31],
  NORMAL: [31, 81],
  BAD: [81, 151],
  VBAD: [151, 500],
};

export const PM10_MIGHTY_TABLES: Record<string, [number, number]> = {
  GOOD: [0, 53],
  BAD: [53, 120],
  VBAD: [120, 500],
};

export const PM25_TABLES: Record<string, [number, number]> = {
  GOOD: [0, 16],
  NORMAL: [16, 36],
  BAD: [36, 76],
  VBAD: [76, 500],
};

export const CO2_TABLES: Record<string, [number, number]> = {
  GOOD: [0, 451],
  NORMAL: [451, 1001],
  BAD: [1001, 3001],
  VBAD: [3001, 5000],
};

export const LGAS_TABLES: Record<string, [number, number]> = {
  GOOD: [0, 56],
  NORMAL: [56, 79],
  BAD: [79, 88],
  VBAD: [88, 100],
};

export const OAQ_TABLES: Record<string, [number, number]> = {
  GOOD: [0, 51],
  NORMAL: [51, 101],
  BAD: [101, 251],
  VBAD: [251, 300],
};

export const OPM10_TABLES: Record<string, [number, number]> = {
  GOOD: [0, 31],
  NORMAL: [31, 81],
  BAD: [81, 151],
  VBAD: [151, 500],
};

export const OPM25_TABLES: Record<string, [number, number]> = {
  GOOD: [0, 16],
  NORMAL: [16, 37],
  BAD: [37, 76],
  VBAD: [76, 100],
};
