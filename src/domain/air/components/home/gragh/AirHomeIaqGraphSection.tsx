import { AirHomeMainIaqPm25Gragh } from './AirHomeMainIaqPm25Gragh';
import { AirHomeSubIaqPm10Gragh } from './AirHomeSubIaqPm10Gragh';
import { AirHomeSubIaqPm1Gragh } from './AirHomeSubIaqPm1Gragh';
import { AirHomeSubIaqVocsGragh } from './AirHomeSubIaqVocsGragh';

export const AirHomeIaqGraphSection = () => {
  return (
    <div className="cw_accWrap02 type02">
      <ul>
        <AirHomeMainIaqPm25Gragh />
        <AirHomeSubIaqPm10Gragh />
        <AirHomeSubIaqPm1Gragh />
        <AirHomeSubIaqVocsGragh />
      </ul>
    </div>
  );
};
