import type { ComponentType } from 'react';
import { AirHomeHeader } from './home/AirHomeHeaderSection';
import { AirHomeMainQualityStatus } from './home/AirHomeMainQualityStatus';
import { AirHomeIaqGraphSection } from './home/gragh/AirHomeIaqGraphSection';
import { AirHomeMainIaqPm25Gragh } from './home/gragh/AirHomeMainIaqPm25Gragh';
import { AirHomeSubIaqPm10Gragh } from './home/gragh/AirHomeSubIaqPm10Gragh';
import { AirHomeSubIaqPm1Gragh } from './home/gragh/AirHomeSubIaqPm1Gragh';
import { AirHomeSubIaqVocsGragh } from './home/gragh/AirHomeSubIaqVocsGragh';

export const componentMap: Record<string, ComponentType<any>> = {
  AirHomeHeader,
  AirHomeMainQualityStatus,
  AirHomeIaqGraphSection,
  AirHomeMainIaqPm25Gragh,
  AirHomeSubIaqPm10Gragh,
  AirHomeSubIaqPm1Gragh,
  AirHomeSubIaqVocsGragh,
};
