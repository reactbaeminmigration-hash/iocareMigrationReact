import { useSidebar } from '@/shared/hooks/useSidebar';
import { useSideBarStore } from '@/shared/stores/sidebarStore';
import { t } from 'i18next';
import { Button } from '../Button';
import { SideBarContent } from './SideBarContent';

export const SideBar = () => {
  const { cls, toggle } = useSidebar();
  const { isSideBarOpen } = useSideBarStore();
  return (
    <div className={`cw_sideWrap cwSide cwSideWrap ${cls}`}>
      <div className="cw_sidecont cwSide">
        <div className="cw_titWrap">
          <h1 className="cw_tit">{t('CON.MY_PRODUCT')}</h1>
          <Button
            className="cw_btn_close"
            onClick={() => {
              toggle();
            }}
          >
            <span>Close</span>
          </Button>
        </div>

        {isSideBarOpen && <SideBarContent />}
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
