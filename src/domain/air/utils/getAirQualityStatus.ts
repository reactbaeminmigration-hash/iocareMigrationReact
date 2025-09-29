import { isNilOrEmptyString } from '@/shared/utils/validation.utils';
import { t } from 'i18next';
import type { IAQData } from '../types/airDeviceHome.types';

// --- 설정 (LEVELS 테이블) ---
const DUST_PM10_LEVELS = [
  { threshold: 30, statusKey: 'WEATHER.GOOD', className: 'cw_txt_good' },
  { threshold: 80, statusKey: 'WEATHER.NORMAL', className: 'cw_txt_normal' },
  { threshold: 150, statusKey: 'WEATHER.BAD', className: 'cw_txt_bad' },
  {
    threshold: Infinity,
    statusKey: 'WEATHER.VERY_BAD',
    className: 'cw_txt_bad',
  },
] as const;

const DUST_PM1_LEVELS = [
  { threshold: 15, statusKey: 'WEATHER.GOOD', className: 'cw_txt_good' },
  { threshold: 36, statusKey: 'WEATHER.NORMAL', className: 'cw_txt_normal' },
  { threshold: 75, statusKey: 'WEATHER.BAD', className: 'cw_txt_bad' },
  {
    threshold: Infinity,
    statusKey: 'WEATHER.VERY_BAD',
    className: 'cw_txt_bad',
  },
] as const;

const DUST_OPM25_LEVELS = [
  { threshold: 15, statusKey: 'WEATHER.GOOD', className: 'cw_txt_good' },
  { threshold: 36, statusKey: 'WEATHER.NORMAL', className: 'cw_txt_normal' },
  { threshold: 75, statusKey: 'WEATHER.BAD', className: 'cw_txt_bad' },
  {
    threshold: Infinity,
    statusKey: 'WEATHER.VERY_BAD',
    className: 'cw_txt_bad',
  },
] as const;

const DUST_PM25_LEVELS = [
  { threshold: 15, statusKey: 'WEATHER.GOOD', className: 'cw_txt_good' },
  { threshold: 35, statusKey: 'WEATHER.NORMAL', className: 'cw_txt_normal' },
  { threshold: 75, statusKey: 'WEATHER.BAD', className: 'cw_txt_bad' },
  {
    threshold: Infinity,
    statusKey: 'WEATHER.VERY_BAD',
    className: 'cw_txt_bad',
  },
] as const;

type DustLevels =
  | typeof DUST_PM10_LEVELS
  | typeof DUST_PM1_LEVELS
  | typeof DUST_PM25_LEVELS
  | typeof DUST_PM25_LEVELS;

const getDustValueAndLevel = (
  rawValue: string | undefined,
  levels: DustLevels,
) => {
  if (isNilOrEmptyString(rawValue)) {
    return { value: undefined, level: undefined };
  }
  const value = Number(rawValue.substring(0, 4));
  if (isNaN(value)) {
    return { value: undefined, level: undefined };
  }

  const level = levels.find((l) => value <= l.threshold);
  return { value, level };
};

interface DustStateProps {
  IAQData: IAQData | undefined;
}

export const getDustPm10State = ({ IAQData }: DustStateProps) => {
  const rawValue = IAQData?.dustpm10;
  const { value, level } = getDustValueAndLevel(rawValue, DUST_PM10_LEVELS);

  return {
    dustpm10: value,
    dustpm10Status: level ? t(level.statusKey) + ' ' : undefined,
    dustpm10StatusClass: level ? level.className : undefined,
  };
};

export const getDustPm1State = ({ IAQData }: DustStateProps) => {
  const rawValue = IAQData?.dustpm1;
  const { value, level } = getDustValueAndLevel(rawValue, DUST_PM1_LEVELS);

  return {
    dustpm1: value,
    dustpm1Status: level ? t(level.statusKey) + ' ' : undefined,
    dustpm1StatusClass: level ? level.className : undefined,
  };
};
