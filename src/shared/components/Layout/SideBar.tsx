import { useSidebar } from '@/shared/hooks/useSidebar';
import { t } from 'i18next';
import { Button } from '../Button';
import { SideBarContent } from './SideBarContent';
import { useCallback } from 'react';

export const SideBar = () => {
  const { cls, toggle, isOpen } = useSidebar();
  const handleBackClick = useCallback<React.MouseEventHandler<HTMLDivElement>>(
    (e) => {
      if (!isOpen) return;
      if (e.target !== e.currentTarget) return;
      toggle();
    },
    [isOpen, toggle],
  );
  return (
    <div className={`cw_sideWrap cwSide ${cls}`} onClick={handleBackClick}>
      <div className="cw_sidecont cwSide" onClick={(e) => e.stopPropagation()}>
        <div className="cw_titWrap">
          <h1 className="cw_tit">{t('CON.MY_PRODUCT')}</h1>
          <Button className="cw_btn_close" onClick={toggle}>
            <span>Close</span>
          </Button>
        </div>
        {isOpen && <SideBarContent />}
      </div>
    </div>
  );
};
