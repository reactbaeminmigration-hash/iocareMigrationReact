import { t } from 'i18next';
import { useEffect, useMemo } from 'react';

type Props = {
  selectedMonthly: string;
  onChange: (v: string) => void;
};

type Report = {
  reportDate: string;
  reportMonth: string;
  reportMonthly: string; // YYYY년 MM월
};

const z2 = (n: number | string) => String(n).padStart(2, '0');
const addMonths = (d: Date, m: number) =>
  new Date(d.getFullYear(), d.getMonth() + m, 1);

export const ReportSelectHeader = ({ selectedMonthly, onChange }: Props) => {
  const now = new Date();
  const monthOffset = now.getDate() >= 3 ? -1 : -2; // 오늘 기준으로 시작 월 결정: 3일 이후면 전월, 아니면 2개월 전
  const startDate = addMonths(now, monthOffset); // 시작월(매달 1일 기준)
  const reportOption: Report[] = useMemo(() => {
    const make = (d: Date): Report => {
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const next = addMonths(d, 1);
      return {
        reportDate: `${next.getFullYear()}${z2(next.getMonth() + 1)}01`, // API에 담을 현재 월
        reportMonth: `${year}${z2(month)}`,
        reportMonthly: `${year}${t('CON.YEAR')} ${month}${t('CON.MONTH')}`,
      };
    };
    return Array.from({ length: 12 }, (_, i) =>
      make(new Date(startDate.getFullYear(), startDate.getMonth() - i)),
    );
  }, [startDate, t]);

  useEffect(() => {
    if (!selectedMonthly && reportOption[0])
      onChange(reportOption[0].reportDate);
  }, [selectedMonthly, reportOption, onChange]);

  const reportPeriod = useMemo(() => {
    const periodDate = new Date(
      Number(selectedMonthly.slice(0, 4)),
      Number(selectedMonthly.slice(4, 6)) - 1,
      0,
    );
    const y = periodDate.getFullYear();
    const m = periodDate.getMonth() + 1;
    const d = periodDate.getDate();
    const firstDay = `${y}${t('CON.YEAR')} ${m}${t('CON.MONTH')} 1${t('CON.DAY')}`;
    const lastDay = `${y}${t('CON.YEAR')} ${m}${t('CON.MONTH')} ${d}${t('CON.DAY')}`;
    return `${firstDay} ~ ${lastDay}`;
  }, [selectedMonthly]);

  return (
    <div className="cw_contbox01">
      <select
        className="cw_select_st02 cw_tit"
        value={selectedMonthly}
        onChange={(e) => onChange(e.currentTarget.value)}
      >
        {reportOption.map((r) => {
          return (
            <option key={r.reportDate} value={r.reportDate}>
              {r.reportMonthly} {t('WATER.WATER_MONTHLY_REPORTT')}
            </option>
          );
        })}
      </select>

      <div className="cw_report_period">
        <span>{t('WATER.WATER_ANALYSIS_PERIOD')} :</span>{' '}
        <span>{reportPeriod}</span>
      </div>
    </div>
  );
};
