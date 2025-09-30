import type { ComponentType } from 'react';
import { AirHomeMainQualityStatus } from './home/AirHomeMainQualityStatus';
import { AirHomeSectionHeader } from './home/AirHomeSectionHeader';
import { AirHomeIaqGraphSection } from './home/gragh/AirHomeIaqGraphSection';

export const componentMap: Record<string, ComponentType<any>> = {
  AirHomeSectionHeader,
  AirHomeMainQualityStatus,
  AirHomeIaqGraphSection,
};
