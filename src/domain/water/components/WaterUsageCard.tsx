import { t } from 'i18next';

export default function WaterUsageCard() {
  return (
    <div className="cw_contbox02">
      <div className="cw_tit">
        <h3>{t('TIT.WATER_USE')}</h3>
      </div>
      <div className="cw_cont waterLoad">
        <div>
          <dl className="cw_todaystatus cw_water">
            <dt>{t('CON.TODAY_WATUSE')}</dt>
            <dd>
              <span>0</span> <span className="unit">ℓ</span>
            </dd>
          </dl>
          <div className="cw_tit01">
            <h3 className="cw_tt">{t('CON.WATTYPE_OF_USE')}</h3>
            {/* <h3 class="cw_tt" [hidden]="!isAquamega">{{'AQUAMEGA.WATER_USAGE' | translate }}</h3> */}
          </div>
          <div className="cw_graph_area" id="cw_graph_area"></div>
          <div className="cw_legend cw_water01">
            <strong className="cw_legend_cold">
              <span>{t('CON.FILTER_TERM.len2')}</span>
            </strong>
            <strong className="cw_legend_normal">
              <span>{t('CON.FILTER_TERM.len3')}</span>
            </strong>
            <strong className="cw_legend_hot">
              <span>{t('CON.FILTER_TERM.len4')}</span>
            </strong>

            {/* <strong className="cw_legend_normal"><span>{{legendObj['len7']}}</span></strong>
              <strong className="cw_legend_cold" [ngClassName]="{'cw_none': !isAquamega }"><span>{{legendObj['len8']}}</span></strong>
              <strong className="cw_legend_carbonated" *ngIf="sodaFlag===true"><span>{{legendObj['len1']}}</span></strong>
              <strong className="cw_legend_etc cw_none"><span>{{legendObj['len5']}} </span></strong> */}
          </div>
        </div>
        <p className="cw_txt06">{t('HIDDEN.GRAPH_INFO')}</p>
        <p className="cw_subtxt01 cw_hide">{t('HIDDEN.DATA_FAIL')}</p>
      </div>
    </div>
  );
}
