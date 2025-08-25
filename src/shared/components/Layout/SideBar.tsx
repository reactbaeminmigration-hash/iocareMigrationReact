import useGetDeviceInfosPaging from '@/domain/device/hooks/queries/useGetDeviceInfosPaging';
import { useSidebar } from '@/shared/hooks/useSidebar';
import { t } from 'i18next';
import type React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Button } from '../Button';
import { SkeletonList } from '../Skeleton/SkeletonList';
import { LayoutTabDeviceListItem } from './LayoutTabDeviceListItem';

export const SideBar = () => {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
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

  const skeletonList = (count: number) => (
    <SkeletonList count={count}>
      {(index) => (
        <li key={`skeleton-${index}`}>
          <div className="cw_prdcard">
            <div>
              <strong className="cw_prdtype">
                <Skeleton width={80} />
              </strong>
            </div>
            <em className="cw_nick cw_breakword">
              <Skeleton width={160} />
            </em>
            <div className="cw_statusico">
              <Skeleton height={16} width={16} />
            </div>
          </div>
        </li>
      )}
    </SkeletonList>
  );
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
              {/* 제품 리스트 무한스크롤  */}
              {
                // 1. 첫 페이지 로딩 시: 스켈레톤 UI만 표시
                isLoading ? (
                  skeletonList(5)
                ) : (
                  // 첫 로딩
                  <>
                    {/* 제품 목록 */}
                    {posts?.pages.flat().map((item, index) => (
                      <LayoutTabDeviceListItem
                        key={item.barcode || `device-${index}`}
                        index={index}
                        item={item}
                      />
                    ))}
                    {/* 다음 페이지 로딩 스켈레톤 */}
                    {isFetchingNextPage && skeletonList(5)}
                  </>
                )
              }
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
