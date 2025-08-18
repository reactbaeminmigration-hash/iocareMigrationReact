import { t } from 'i18next';
import { Button } from '../Button';
import { useSidebar } from '@/shared/hooks/useSidebar';
import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import { useGetDeviceType } from '@/domain/device/hooks/useGetDeviceType';

export const SideBar = () => {
  const { cls, toggle } = useSidebar();
  const deviceInfos = useDeviceStore((deviceStore) => deviceStore.deviceInfos);
  const { getDvcTypeName, getDvcComType } = useGetDeviceType();

  return (
    <div className={`cw_sideWrap cwSide cwSideWrap ${cls}`}>
      <div className="cw_sidecont cwSide">
        <div className="cw_titWrap">
          <h1 className="cw_tit">{t('CON.MY_PRODUCT')}</h1>
          <Button className="cw_btn_close" onClick={toggle}>
            <span>Close</span>
          </Button>
        </div>

        <div className="cw_contentsWrap">
          <div className="cw_prdlistWrap">
            <ul className="cw_myprdlist" id="cwMyprdList">
              {deviceInfos.map((item, index) => (
                <li key={index} className="record">
                  <div className="cw_prdcard">
                    <div>
                      <strong className="cw_prdtype">
                        {getDvcTypeName(item.dvcTypeCd)}
                      </strong>
                    </div>
                    <em className="cw_nick cw_breakword">
                      <span>{item.dvcNick}</span>
                    </em>
                    <div className="cw_statusico">
                      <em className={`${getDvcComType(item.comType)} `}></em>
                    </div>
                  </div>
                </li>
              ))}
              <li>
                <Button className="cw_btn_reg">
                  <span>{t('BTN.REGIST')}</span>
                </Button>
              </li>
            </ul>
            <div className="cw_c_btn cw_edit">
              <Button className="cw_btn_edit">
                <span>{t('BTN.EDIT_PRODUCT')}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="cw_loadingWrap cw_st02">
        <div>
          <em class="cw_load">
            <span></span>
          </em>
        </div>
      </div> */}
    </div>
  );
};
