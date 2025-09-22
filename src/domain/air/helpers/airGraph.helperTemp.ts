import { useDeviceContext } from '@/app/contexts/DeviceProvider';
import {
  TIME_LIKE_KR,
  type TimeLikeKr,
} from '@/shared/constants/i18n.constants';
import { t } from 'i18next';

// Define types for the input list items
export interface GraphDataItem {
  graphValue: number | null;
  graphHighValue: number | null;
  pm25graphValue?: number | null;
  pm25graphHighValue?: number | null;
  msrDt: string;
  place: 'in' | 'out' | string;
}

// Define types for the output object
export interface AirGraphData {
  inGraphData: (number | null)[];
  inMaxGraphData: (number | null)[];
  pm25_inGraphData: (number | null)[];
  pm25_inMaxGraphData: (number | null)[];
  outGraphData: (number | null)[];
  xAxis: number[];
  dateRange: string;
}

export function graphServiceForMarvel(
  list: GraphDataItem[],
  timeFlag: 'hour' | 'day',
  rangeValue: number,
): AirGraphData {
  const { deviceState } = useDeviceContext();

  const conDay = t('CON.DAY');
  const conMonth = t('CON.MONTH');
  const conYear = t('CON.YEAR');
  const conAM = t('CON.MORNING');
  const conPM = t('CON.AFTERNOON');

  const inGraphData: (number | null)[] = [];
  const inMaxGraphData: (number | null)[] = [];
  const pm25_inGraphData: (number | null)[] = [];
  const pm25_inMaxGraphData: (number | null)[] = [];
  const outGraphData: (number | null)[] = [];
  const xAxis: number[] = [];

  const timeArray: string[] = [];

  let formatSubArray: [number, number];

  switch (timeFlag) {
    case 'hour':
      formatSubArray = [8, 10];
      break;
    case 'day':
      formatSubArray = [6, 8];
      break;
  }

  // Helper to process values: if value is 0 or null, return null, otherwise return the number.
  const processValue = (value: number | null | undefined): number | null => {
      if (value === 0 || value === null || value === undefined) {
          return null;
      }
      return value;
  };

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const graphValueChargeText = processValue(item.graphValue);
    const graphHighValueChargeText = processValue(item.graphHighValue);
    const pm25_graphValueChargeText = processValue(item.pm25graphValue);
    const pm25_graphHighChargeValueText = processValue(item.pm25graphHighValue);


    if (item.place === 'in') {
      inGraphData.push(graphValueChargeText);
      inMaxGraphData.push(graphHighValueChargeText);
      xAxis.push(
        Number(
          item.msrDt.substring(formatSubArray[0], formatSubArray[1]),
        ),
      );
      timeArray.push(item.msrDt);
    } else if (item.place === 'out') {
      if (deviceState.prodName !== 'MARVEL_20P_JP') {
        switch (timeFlag) {
          case 'hour':
            if (rangeValue === 6) {
              for (let j = 0; j < 6; j++) {
                outGraphData.push(graphValueChargeText);
              }
              if (outGraphData.length > 6 * rangeValue) {
                outGraphData.splice(0, 6);
              }
            } else {
              outGraphData.push(graphValueChargeText);
              if (outGraphData.length > rangeValue) {
                outGraphData.splice(0, 1);
              }
            }
            break;

          case 'day':
            outGraphData.push(graphValueChargeText);
            if (outGraphData.length > rangeValue) {
              outGraphData.splice(0, 1);
            }
            break;
        }
      }
    } else {
      // This block seems to be for 'in' data that also contains pm25 data.
      // The original logic was a bit ambiguous.
      // Let's stick to the original logic but with type safety.
      if (item.pm25graphValue !== undefined) {
        pm25_inGraphData.push(pm25_graphValueChargeText);
      }
      if (item.pm25graphHighValue !== undefined) {
        pm25_inMaxGraphData.push(pm25_graphHighChargeValueText);
      }

      inGraphData.push(graphValueChargeText);
      inMaxGraphData.push(graphHighValueChargeText);
      xAxis.push(
        Number(
          item.msrDt.substring(formatSubArray[0], formatSubArray[1]),
        ),
      );
      timeArray.push(item.msrDt);
    }
  }

  if (timeFlag === 'hour') {
    if (rangeValue === 6) {
      if (outGraphData.length === rangeValue * 6) {
        const lastItem = list[list.length - 1];
        const graphValueChargeTextlengthM = processValue(lastItem.graphValue);
        outGraphData.push(graphValueChargeTextlengthM);
      } else {
        for (let i = outGraphData.length; i <= rangeValue * 6; i++) {
          outGraphData.push(0);
        }
      }
    }
  }

  const firstDate = timeArray[0];
  const latestDate = timeArray[timeArray.length - 1];

  const firstDateObj = new Date();
  firstDateObj.setFullYear(Number(firstDate.substring(0, 4)));
  firstDateObj.setMonth(Number(firstDate.substring(4, 6)) - 1);
  firstDateObj.setDate(Number(firstDate.substring(6, 8)));
  firstDateObj.setHours(Number(firstDate.substring(8, 10)));
  firstDateObj.setMinutes(Number(firstDate.substring(10, 12)));

  const firstDayData = {
    year: String(firstDateObj.getFullYear()),
    month: firstDateObj.getMonth() + 1,
    day: firstDateObj.getDate(),
    hour:
      firstDateObj.getHours() < 10
        ? '0' + firstDateObj.getHours()
        : String(firstDateObj.getHours()),
    minute:
      firstDateObj.getMinutes() < 10
        ? '0' + firstDateObj.getMinutes()
        : String(firstDateObj.getMinutes()),
  };

  const lastDateObj = new Date();
  lastDateObj.setFullYear(Number(latestDate.substring(0, 4)));
  lastDateObj.setMonth(Number(latestDate.substring(4, 6)) - 1);
  lastDateObj.setDate(Number(latestDate.substring(6, 8)));
    lastDateObj.setHours(Number(latestDate.substring(8, 10)));
  lastDateObj.setMinutes(Number(latestDate.substring(10, 12)));

  const lastDayData = {
    year: String(lastDateObj.getFullYear()),
    month: lastDateObj.getMonth() + 1,
    day: lastDateObj.getDate(),
    hour:
      lastDateObj.getHours() < 10
        ? '0' + lastDateObj.getHours()
        : String(lastDateObj.getHours()),
    minute:
      lastDateObj.getMinutes() < 10
        ? '0' + lastDateObj.getMinutes()
        : String(lastDateObj.getMinutes()),
  };

  let dateRange = '';

  const lang = 'ko-KR';

  if (rangeValue === 24 || rangeValue === 6) {
    let fampm = Number(firstDayData.hour) >= 12 ? 1 : 0;
    if (Number(firstDayData.hour) > 12) {
      firstDayData.hour = String(Number(firstDayData.hour) - 12);
    } else {
      firstDayData.hour = String(firstDayData.hour);
    }

    let lampm = Number(lastDayData.hour) >= 12 ? 1 : 0;
    if (Number(lastDayData.hour) > 12) {
      lastDayData.hour = String(Number(lastDayData.hour) - 12);
    } else {
      lastDayData.hour = String(lastDayData.hour);
    }

    dateRange =
      firstDayData.month +
      conMonth +
      ' ' +
      firstDayData.day +
      conDay +
      ' ' +
      (fampm === 0 ? conAM : conPM) +
      ' ' +
      firstDayData.hour +
      ':' +
      firstDayData.minute +
      ' ~ ' +
      lastDayData.month +
      conMonth +
      ' ' +
      lastDayData.day +
      conDay +
      ' ' +
      (lampm === 0 ? conAM : conPM) +
      ' ' +
      lastDayData.hour +
      ':' +
      lastDayData.minute;
  } else {
    switch (
      lang as TimeLikeKr // Cast lang to TimeLikeKr
    ) {
      case TIME_LIKE_KR[0]:
      case TIME_LIKE_KR[1]:
      case TIME_LIKE_KR[2]:
        dateRange =
          firstDayData.year +
          conYear +
          ' ' +
          firstDayData.month +
          conMonth +
          ' ' +
          firstDayData.day +
          conDay +
          ' ' +
          ' ~ ' +
          lastDayData.year +
          conYear +
          ' ' +
          lastDayData.month +
          conMonth +
          ' ' +
          lastDayData.day +
          conDay;
        break;
      default:
        // Fallback or error handling if lang is not ko-KR, ja-JP, or zh-CN
        // For now, we'll assume it's always ko-KR as per user's request
        dateRange =
          firstDayData.year +
          conYear +
          ' ' +
          firstDayData.month +
          conMonth +
          ' ' +
          firstDayData.day +
          conDay +
          ' ' +
          ' ~ ' +
          lastDayData.year +
          conYear +
          ' ' +
          lastDayData.month +
          conMonth +
          ' ' +
          lastDayData.day +
          conDay;
    }
  }
  return {
    inGraphData,
    inMaxGraphData,
    pm25_inGraphData,
    pm25_inMaxGraphData,
    outGraphData,
    xAxis,
    dateRange,
  };
}