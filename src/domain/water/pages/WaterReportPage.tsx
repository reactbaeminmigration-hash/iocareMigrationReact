import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import { ReportSelectHeader } from '../../../shared/components/Layout/ReportSelectHeader';
import useHasWaterReport from '../queries/useHasWaterReport';
import { useState } from 'react';
import { nowToString, timeStampToString } from '@/shared/utils/common.utils';

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
  console.log(hasReport);
  return (
    <div className="cw_tab_cont cw_reportWrap cw_report_fix">
      {hasReport?.has12MonthsReportData && (
        <ReportSelectHeader
          selectedMonthly={selectedMonthly}
          onChange={setSelectedMonthly}
        />
      )}
      {hasReport?.isNoData ? (
        <div>데이터 없음ㅜㅜㅜ</div>
      ) : (
        <div>데이터 있음!!!</div>
      )}
    </div>
  );
};
