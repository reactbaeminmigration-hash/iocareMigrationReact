import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import { ReportSelectHeader } from '../../../shared/components/Layout/ReportSelectHeader';
import useHasWaterReport from '../queries/useHasWaterReport';
import { useState } from 'react';

export const WaterReportPage = () => {
  const productInfos = useDeviceStore((s) => s.lastSelectedDeviceInfos);
  const [selectedMonthly, setSelectedMonthly] = useState('');
  const { data: reportHas } = useHasWaterReport(
    {
      devId: productInfos.barcode,
      reportDate: selectedMonthly,
      resetDttm: productInfos.resetDttm,
      instDttm: productInfos.instDttm,
    },
    {
      enabled: !!selectedMonthly && !!productInfos?.barcode, // 값 없으면 호출 안 함
    },
  );
  return (
    <div className="cw_tab_cont cw_reportWrap cw_report_fix">
      <ReportSelectHeader
        selectedMonthly={selectedMonthly}
        onChange={setSelectedMonthly}
      />
      {reportHas?.isNoData ? <div>데이터 없음</div> : <div>데이터 있음!!!</div>}
    </div>
  );
};
