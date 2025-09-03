import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import { t } from 'i18next';
import useGetWaterFilter from '../queries/useGetWaterFilter';
import { useNavigate } from 'react-router-dom';

export default function WaterFilterCard() {
  const navigate = useNavigate();
  const waterHomeInfos = useDeviceStore((s) => s.lastSelectedDeviceInfos);
  const { data: waterFilter } = useGetWaterFilter(
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

  return (
    <div className="cw_contbox02" onClick={() => navigate('/water/settings')}>
      <div className="cw_tit">
        <h3>{t('HIDDEN.CONSUMABLES_STATE')}</h3>
      </div>
      <div className="cw_cont">
        {(waterFilter?.filterList.length ?? 0) > 0 ? (
          <ul className="cw_filter_list cw_st02">
            {waterFilter?.filterList.map((item) => (
              <li key={item.filterCode}>
                <div className="cw_filter_status">
                  <div className="cw_filter_name02">
                    <span>
                      {t(`WATER.WATER_FILTER_NM.${item.filterCode}` as any)}
                    </span>
                  </div>
                  <div className="cw_filter_per">
                    <strong>{`${item.filterPer}%`}</strong>
                  </div>
                </div>
                {item.filterPer <= 5 && (
                  <p className="cw_txt_alert04">
                    <span>{t('AIR.NEED_MAINTENANCE')}</span>
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="cw_noti_msg01">{t('HIDDEN.CONSUMABLES_INFO_TXT')}</p>
        )}
      </div>
    </div>
  );
}
