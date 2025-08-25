import useGetDeviceInfosPaging from '@/domain/device/hooks/queries/useGetDeviceInfosPaging';
import { useSidebar } from '@/shared/hooks/useSidebar';
import { t } from 'i18next';
import type React from 'react';
import { Button } from '../Button';
import { LayoutTabDeviceListItem } from './LayoutTabDeviceListItem';

export const SideBar = () => {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetDeviceInfosPaging({ pageIndex: '0', pageSize: '10' });
  const handlendReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (scrollHeight - scrollTop - clientHeight < 100) {
      handlendReached();
    }
  };

  const { cls, toggle } = useSidebar();
  return (
    <div className={`cw_sideWrap cwSide cwSideWrap ${cls}`}>
      <div className="cw_sidecont cwSide">
        <div className="cw_titWrap">
          <h1 className="cw_tit">{t('CON.MY_PRODUCT')}</h1>
          <Button className="cw_btn_close" onClick={toggle}>
            <span>Close</span>
          </Button>
        </div>

        <div className="cw_contentsWrap" onScroll={handleScroll}>
          <div className="cw_prdlistWrap">
            <ul className="cw_myprdlist" id="cwMyprdList">
              {posts?.pages.flat().map((item, index) => (
                <LayoutTabDeviceListItem
                  key={index}
                  index={index}
                  item={item}
                />
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
