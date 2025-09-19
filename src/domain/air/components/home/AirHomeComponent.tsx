import { t } from 'i18next';
import { AirHomeIaqGraph } from './AirHomeIAQGraph';
import { AirHomeIaqQualityStatus } from './AirHomeQualityStatus';
import { AirHomeSectionHeader } from './AirHomeSectionHeader';

export const AirHomeComponent = () => {
  return (
    <div className="cw_contbox02">
      <AirHomeSectionHeader
        title={t('AIR.AIR_QUALITY')}
        buttonText={t('AIR.AIR_MORE_SEE')}
        onButtonClick={() => {}}
      />
      <div className="cw_cont">
        <AirHomeIaqQualityStatus />
        <AirHomeIaqGraph />
      </div>
    </div>
  );
};
