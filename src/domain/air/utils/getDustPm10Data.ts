import { isNilOrEmptyString } from '@/shared/utils/validation.utils';
import { t } from 'i18next';
import type { IAQData } from '../types/airDeviceHome.types';

const DUST_PM10_LEVELS = [
  { throshold: 30, statusKey: 'WEATHER.GOOD', className: 'cw_txt_good' },
  { throshold: 80, statusKey: 'WEATHER.NORMAL', className: 'cw_txt_normal' },
  { throshold: 150, statusKey: 'WEATHER.BAD', className: 'cw_txt_bad' },
  {
    throshold: Infinity,
    statusKey: 'WEATHER.VERY_BAD',
    className: 'cw_txt_bad',
  },
] as const;

interface getDustPm10InfoProps {
  IAQData: IAQData | undefined;
}

export const getDustPm10Info = ({ IAQData }: getDustPm10InfoProps) => {
  const rawValue = IAQData?.dustpm10;
  if (isNilOrEmptyString(rawValue)) {
    return { value: null, status: null, statusClass: null };
  }
  const value = Number(rawValue.substring(0, 4));
  if (isNaN(value)) {
    return { value: null, status: null, statusClass: null };
  }

  const level = DUST_PM10_LEVELS.find((l) => value <= l.throshold);

  return {
    dustpm10: value,
    dustpm10Status: level ? t(level.statusKey) + ' ' : undefined,
    dustpm10StatusClass: level ? level.className : undefined,
  };
};
