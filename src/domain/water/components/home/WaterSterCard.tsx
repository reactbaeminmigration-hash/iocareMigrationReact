import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import { t } from 'i18next';
import useGetWaterSter from '../../queries/useGetWaterSter';

export default function WaterSterCard() {
  const waterHomeInfos = useDeviceStore((s) => s.lastSelectedDeviceInfos);
  const { data: waterSter } = useGetWaterSter(
    {
      devId: waterHomeInfos.barcode,
      comType: waterHomeInfos.comType,
      orderNo: waterHomeInfos.ordNo,
      prodName: waterHomeInfos.prodName,
      resetDttm: waterHomeInfos.resetDttm,
      sellType: waterHomeInfos.sellTypeCd,
      membershipYn: waterHomeInfos.membershipYn,
      selfYn: waterHomeInfos.selfManageYn,
    },
    { enabled: !!waterHomeInfos },
  );
  const fsLastSterTime = waterSter?.fausetList?.[0]?.fsLastSterTime!;
  const fsNextSterTime = waterSter?.fausetList?.[0]?.fsNextSterTime!;
  const erLastSterTime = waterSter?.euroList?.[0]?.erLastSterTime!;
  const erNextSterTime = waterSter?.euroList?.[0]?.erNextSterTime!;
  const iceFsLastSterTime = waterSter?.icePsList?.[0]?.iceFsLastSterTime!;
  const iceFsNextSterTime = waterSter?.icePsList?.[0]?.iceFsNextSterTime!;
  const iceTankLastSterTime = waterSter?.iceTankList?.[0]?.iceTankLastSterTime!;
  const iceTankNextSterTime = waterSter?.iceTankList?.[0]?.iceTankNextSterTime!;
  const iceTankUvLastSterTime =
    waterSter?.iceTankUvList?.[0]?.iceTankUvLastSterTime!;
  const iceTankUvNextSterTime =
    waterSter?.iceTankUvList?.[0]?.iceTankUvNextSterTime!;
  const iceTrayLastSterTime = waterSter?.iceTrayList?.[0]?.iceTrayLastSterTime!;
  const iceTrayNextSterTime = waterSter?.iceTrayList?.[0]?.iceTrayNextSterTime!;

  function dateFormat(sterTime: string) {
    const year = sterTime.slice(0, 4);
    const month = sterTime.slice(4, 6);
    const day = sterTime.slice(6, 8);
    const hour =
      Number(sterTime.slice(8, 10)) % 12 === 0
        ? 12
        : Number(sterTime.slice(8, 10)) % 12;
    const min = sterTime.slice(10, 12);
    const mer = Number(sterTime.slice(8, 10)) >= 12 ? '오후' : '오전';

    const formattedDate = `${year}년 ${month}월 ${day}일 ${mer} ${String(hour).padStart(2, '0')}:${min}`;
    return formattedDate;
  }

  return (
    <div className="cw_contbox02">
      <div className="cw_tit">
        <h3>{t('HIDDEN.REGULAR_STER')}</h3>
      </div>
      <div className="cw_cont">
        {/* 파우셋 살균 */}
        {(waterSter?.fausetList?.length ?? 0) > 0 && (
          <div className="cont_group">
            <h4 className="tit_group">{t('HIDDEN.WATER_OUT_FAUSET')}</h4>
            <>
              <dl className="sterilization_time">
                <dt>{t('WATER.WATER_RECENT_STERILIZATION_TIME')}</dt>
                <dd>
                  {fsLastSterTime
                    ? dateFormat(fsLastSterTime)
                    : t('HIDDEN.WATER_STER_NO_DATA')}
                </dd>
              </dl>
              <dl className="sterilization_time schedule">
                <dt>{t('HIDDEN.STER_NEXT_TIME')}</dt>
                <dd>
                  {fsNextSterTime
                    ? dateFormat(fsNextSterTime)
                    : t('HIDDEN.FAUSET_STER_NO_DATA')}
                </dd>
              </dl>
            </>
          </div>
        )}

        {/* 유로 살균 */}
        {(waterSter?.euroList?.length ?? 0) > 0 && (
          <div className="cont_group">
            <h4 className="tit_group">{t('HIDDEN.EURO')}</h4>
            <>
              <dl className="sterilization_time">
                <dt>{t('WATER.WATER_RECENT_STERILIZATION_TIME')}</dt>
                <dd>
                  {erLastSterTime
                    ? dateFormat(erLastSterTime)
                    : t('HIDDEN.WATER_STER_NO_DATA')}
                </dd>
              </dl>
              <dl className="sterilization_time schedule">
                <dt>{t('HIDDEN.STER_NEXT_TIME')}</dt>
                <dd>
                  {erNextSterTime
                    ? dateFormat(erNextSterTime)
                    : t('HIDDEN.EURO_STER_NO_DATA')}
                </dd>
              </dl>
            </>
          </div>
        )}

        {/* 얼음 파우셋 살균 */}
        {(waterSter?.icePsList?.length ?? 0) > 0 && (
          <div className="cont_group">
            <h4 className="tit_group">{t('ICON40.ICE_FAUSET')}</h4>
            <>
              <dl className="sterilization_time">
                <dt>{t('WATER.WATER_RECENT_STERILIZATION_TIME')}</dt>
                <dd>
                  {iceFsLastSterTime
                    ? dateFormat(iceFsLastSterTime)
                    : t('HIDDEN.WATER_STER_NO_DATA')}
                </dd>
              </dl>
              <dl className="sterilization_time schedule">
                <dt>{t('HIDDEN.STER_NEXT_TIME')}</dt>
                <dd>
                  {iceFsNextSterTime
                    ? dateFormat(iceFsNextSterTime)
                    : t('HIDDEN.FAUSET_STER_NO_DATA')}
                </dd>
              </dl>
            </>
          </div>
        )}

        {/* 얼음 저장고 살균 */}
        {(waterSter?.iceTankList?.length ?? 0) > 0 && (
          <div className="cont_group">
            <h4 className="tit_group">{t('ICON40.ICE_TANK')}</h4>
            <>
              <dl className="sterilization_time">
                <dt>{t('WATER.WATER_RECENT_STERILIZATION_TIME')}</dt>
                <dd>
                  {iceTankLastSterTime
                    ? dateFormat(iceTankLastSterTime)
                    : t('HIDDEN.WATER_STER_NO_DATA')}
                </dd>
              </dl>
              <dl className="sterilization_time schedule">
                <dt>{t('HIDDEN.STER_NEXT_TIME')}</dt>
                <dd>
                  {iceTankNextSterTime
                    ? dateFormat(iceTankNextSterTime)
                    : t('ICON40.TIME_8_FAUSET_STER_NO_DATA')}
                </dd>
              </dl>
            </>
          </div>
        )}

        {/* 얼음 탱크 UV 살균 */}
        {(waterSter?.iceTankUvList?.length ?? 0) > 0 && (
          <div className="cont_group">
            <h4 className="tit_group">{t('ICON40.COLD_WATER_TANK')}</h4>
            <>
              <dl className="sterilization_time">
                <dt>{t('WATER.WATER_RECENT_STERILIZATION_TIME')}</dt>
                <dd>
                  {iceTankUvLastSterTime
                    ? dateFormat(iceTankUvLastSterTime)
                    : t('HIDDEN.WATER_STER_NO_DATA')}
                </dd>
              </dl>
              <dl className="sterilization_time schedule">
                <dt>{t('HIDDEN.STER_NEXT_TIME')}</dt>
                <dd>
                  {iceTankUvNextSterTime
                    ? dateFormat(iceTankUvNextSterTime)
                    : t('ICON40.TIME_8_FAUSET_STER_NO_DATA')}
                </dd>
              </dl>
            </>
          </div>
        )}

        {/* 얼음 트레이 살균 */}
        {(waterSter?.iceTrayList?.length ?? 0) > 0 && (
          <div className="cont_group">
            <h4 className="tit_group">{t('ICON40.ICE_TRAY')}</h4>
            <>
              <dl className="sterilization_time">
                <dt>{t('WATER.WATER_RECENT_STERILIZATION_TIME')}</dt>
                <dd>
                  {iceTrayLastSterTime
                    ? dateFormat(iceTrayLastSterTime)
                    : t('HIDDEN.WATER_STER_NO_DATA')}
                </dd>
              </dl>
              <dl className="sterilization_time schedule">
                <dt>{t('HIDDEN.STER_NEXT_TIME')}</dt>
                <dd>
                  {iceTrayNextSterTime
                    ? dateFormat(iceTrayNextSterTime)
                    : t('ICON40.TIME_8_FAUSET_STER_NO_DATA')}
                </dd>
              </dl>
            </>
          </div>
        )}
      </div>
    </div>
  );
}
