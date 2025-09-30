import { t } from 'i18next';
import { AirHomeMainQualityStatus } from './AirHomeMainQualityStatus';
import { AirHomeSectionHeader } from './AirHomeSectionHeader';
import { AirHomeIaqGraphSection } from './gragh/AirHomeIaqGraphSection';

export const AirHomeComponent = () => {
  return (
    <div className="cw_contbox02">
      <AirHomeSectionHeader
        title={t('AIR.AIR_QUALITY')}
        buttonText={t('AIR.AIR_MORE_SEE')}
        onButtonClick={() => {}}
      />
      <div className="cw_cont">
        <AirHomeMainQualityStatus />
        <AirHomeIaqGraphSection />
      </div>
    </div>
  );
};
