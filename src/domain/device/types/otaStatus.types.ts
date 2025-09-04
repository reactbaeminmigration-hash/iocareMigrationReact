// (NONE: 변경사항 없음, UPDATING: 업데이트 중, UPDATE_ERROR: 업데이트 실패(제품 동작불가), UPDATE_FAIL: 업데이트 실패(제품 동작 가능))
export const OtaUpdateState = {
  NONE: 'NONE',
  UPDATING: 'UPDATING',
  UPDATE_ERROR: 'UPDATE_ERROR',
  UPDATE_FAIL: 'UPDATE_FAIL',
  UPDATE_WAIT: 'UPDATE_WAIT',
} as const;

export type OtaUpdateStateType =
  (typeof OtaUpdateState)[keyof typeof OtaUpdateState];

export interface RequestOtaStatus {
  devId: string; // 바코드
}

export interface ResponseOtaStatus {
  /** 현 MCU 버전 */
  curMcuVer: string;
  /** 현 버전 업데이트 일시 (UTC 기준). 0이면 데이터 없음 */
  curUpdateDate: number;
  /** 현 WIFI 버전 */
  curWifiVer: string;
  /** 예약 업데이트 메시지 문구 노출 여부 */
  isShowResveUpdateMessage: boolean;
  /** 업데이트 MCU 버전 (최신 버전과 동일하면 null, 즉시 업데이트인 경우 값 존재) */
  newestMcuVer: string | null;
  /** 업데이트 WIFI 버전 (최신 버전과 동일하면 null, 즉시 업데이트인 경우 값 존재) */
  newestWifiVer: string | null;
  /** 예약 업데이트 일시 (UTC 기준). 0이면 예약 없음 또는 즉시 업데이트 */
  resveUpdateDate: number;
  /** 업데이트 상태: NONE, UPDATING, UPDATE_FAIL */
  updateState: OtaUpdateStateType | null;
}
