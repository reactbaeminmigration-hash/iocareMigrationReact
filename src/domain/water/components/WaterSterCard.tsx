import { t } from 'i18next';

export default function WaterSterCard() {
  return (
    <div className="cw_contbox02">
      <div className="cw_tit">
        <h3>{t('HIDDEN.REGULAR_STER')}</h3>
      </div>
      <div className="cw_cont">
        <div className="cont_group">
          {/* <h4 className="tit_group">{t('HIDDEN.FAUSET_STER')}</h4> icon2.0 제품만 */}
          <h4 className="tit_group">{t('HIDDEN.WATER_OUT_FAUSET')}</h4>
          <dl className="sterilization_time">
            <dt>{t('WATER.WATER_RECENT_STERILIZATION_TIME')}</dt>
            {/* <dd>{fsLastSterTime}</dd> 최근 살균 시간*/}
            <dd>{t('HIDDEN.WATER_STER_NO_DATA')}</dd>
          </dl>
          <dl className="sterilization_time schedule">
            <dt>{t('HIDDEN.STER_NEXT_TIME')}</dt>
            {/* <dd>{fausetList[0].fsNextSterTime}</dd> 살균 예정 시간 */}
            <dd
              dangerouslySetInnerHTML={{
                __html: t('HIDDEN.FAUSET_STER_NO_DATA'),
              }}
            ></dd>
          </dl>
          {/* <p class="cw_noti_msg01" *ngIf="(isHidden || isIcon40 || isIcon20 || isAisMax || isIconIceV2) && (fausetList === undefined || fausetList.length === 0)" [innerHTML]="'HIDDEN.DATA_FAIL' | translate"></p> */}
        </div>
      </div>
    </div>
  );
}
