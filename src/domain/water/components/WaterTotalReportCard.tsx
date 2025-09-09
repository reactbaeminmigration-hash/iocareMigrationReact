import { t } from 'i18next';
import useGetWaterTotalReport from '../queries/useGetWaterTotalReport';
import type { WaterReportParams } from '../types/waterReportPublished.types';

type Props = { params: WaterReportParams };

export default function WaterTotalReportCard({ params }: Props) {
  const { devId, reportDate, resetDttm, isNoDate } = params;
  const { data: totalReport } = useGetWaterTotalReport(
    {
      devId,
      reportDate,
      resetDttm,
    },
    { enabled: isNoDate === false },
  );
  return (
    <li className="cw_overall cw_open">
      {/* title */}
      <div className="cw_acc_tit">
        <h4 className="cw_tt">
          <span>{t('WATER.WATER_TOTAL_REPORT')}</span>
        </h4>
        <button type="button" className="cw_btn_acc"></button>
      </div>
      {/* contents */}
      <div className="cw_acc_cont totalReport">
        <div className="cw_column">
          <dl>
            <dt>
              <span>{t('WATER.WATER_DAILY_USE_WATER_AVG')}</span>
            </dt>
            <dd>
              <span>{totalReport?.avgDayWtrQnt} </span>
              <span className="cw_unit">ℓ</span>
            </dd>
          </dl>
          <dl>
            <dt>
              <span>{t('HIDDEN.WATER_MONTHLY_USE_WATER')}</span>
            </dt>
            <dd>
              <span>{totalReport?.totalWtrQnt} </span>
              <span className="cw_unit">ℓ</span>
            </dd>
          </dl>
        </div>
      </div>
    </li>
  );
}
