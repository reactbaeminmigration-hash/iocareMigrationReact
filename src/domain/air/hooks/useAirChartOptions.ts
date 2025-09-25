import { useMemo } from 'react';

interface airChartOptionsProps {
  xAxisTime: number[];
  series: {
    name: string;
    type: string;
    color: string;
    data: (number | null)[];
    marker?: {
      radius: number;
      symbol: string;
    };
    dashStyle?: string;
    yAxis?: number;
    _symolIndex?: number;
  }[];
}

export const useAirChartOptions = ({
  xAxisTime,
  series,
}: airChartOptionsProps): Record<string, any> => {
  const options = useMemo(() => {
    return {
      chart: {
        renderTo: 'all_air_time',
        type: 'spline' as const,
        height: 133,
        margin: [0, 10, 20, 0],
      },
      title: {
        text: '',
      },
      xAxis: {
        tickInterval: 6,
        categories: xAxisTime,
        lineColor: '#616161',
        lineWidth: 2,
        tickWidth: 0,
        showFirstLabel: true,
        labels: {
          y: 16,
          style: {
            color: '#616161',
            fontFamily: 'NanumSquareBold',
            fontSize: 12,
          },
        },
      },
      yAxis: [
        {
          title: {
            enabled: false,
          },
          labels: {
            enabled: false,
          },
          gridLineColor: '#eeeeee',
          tickPositions: [0, 25, 50, 75, 100],
          tickInterval: 25,
          max: 100,
          showFirstLabel: false,
        },
        {
          title: {
            enabled: false,
          },
          tickPositions: [0, 25, 50, 75, 100],
          tickInterval: 25,
          max: 100,
          opposite: true,
        },
      ],
      plotOptions: {
        spline: {
          lineWidth: 2,
          label: {
            enabled: true,
            connectorAllowed: false,
          },
          marker: {
            enabled: false,
          },
          color: 'red',
          enableMouseTracking: false,
        },
        scatter: {
          enableMouseTracking: false,
        },
      },
      tooltip: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      series: series,
      legend: {
        enabled: false,
        align: 'right' as const,
        y: 20,
      },
      exporting: {
        enabled: false,
      },
    };
  }, [xAxisTime, series]);

  return options;
};
