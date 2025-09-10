import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import { ReportSelectHeader } from '../../../shared/components/Layout/ReportSelectHeader';
import useHasWaterReport from '../queries/useHasWaterReport';
import { useState } from 'react';
import { nowToString, timeStampToString } from '@/shared/utils/common.utils';
import { t } from 'i18next';
import WaterTotalReportCard from '../components/WaterTotalReportCard';
import type { WaterReportParams } from '../types/waterReportPublished.types';
import WaterDailyReportCard from '../components/WaterDailyReportCard';
import WaterMonthReportCard from '../components/WaterMonthReportCard';
import { LoadingLocalSpinner } from '@/shared/components/LoadingSpinner/LoadingLocalSpinner';

export const WaterReportPage = () => {
  const productInfos = useDeviceStore((s) => s.lastSelectedDeviceInfos);
  const [selectedMonthly, setSelectedMonthly] = useState(nowToString());

  const { data: hasReport } = useHasWaterReport(
    {
      devId: productInfos.barcode,
      reportDate: selectedMonthly,
      resetDttm: timeStampToString(productInfos.resetDttm),
      instDttm: timeStampToString(productInfos.instDttm),
    },
    {
      enabled: !!productInfos?.barcode, // 값 없으면 호출 안 함
    },
  );

  const reportParams: WaterReportParams = {
    isNoDate: hasReport?.isNoData,
    devId: productInfos?.barcode,
    reportDate: selectedMonthly,
    resetDttm: timeStampToString(productInfos.resetDttm),
  };

  return (
    <div className="cw_contentsWrap">
      <LoadingLocalSpinner
        localLoadingKey={[]}
        className="cw_webcontainer cw_scroll_top"
      >
        <div className="cw_tab_cont cw_reportWrap cw_report_fix">
          {hasReport?.has12MonthsReportData && (
            <ReportSelectHeader
              selectedMonthly={selectedMonthly}
              onChange={setSelectedMonthly}
            />
          )}
          <div className="cw_scroll_area cwTabCont ba_report_change_loading">
            <div className="cw_accWrap01">
              {hasReport?.isNoData ? (
                <div className="cw_system_error cw_iocare_water cw_fix">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: t('WATER.WATER_NO_REPORT'),
                    }}
                  ></p>
                </div>
              ) : (
                <ul>
                  <WaterTotalReportCard params={reportParams} />
                  <WaterDailyReportCard params={reportParams} />
                  <WaterMonthReportCard params={reportParams} />
                </ul>
              )}
            </div>
          </div>
        </div>
      </LoadingLocalSpinner>
    </div>
  );
};
