import { queryKeys } from '@/domain/device/constants/queryKey';
import useGetDeviceInfosPaging from '@/domain/device/hooks/queries/useGetDeviceInfosPaging';
import { useQueryClient } from '@tanstack/react-query';
import { t } from 'i18next';
import { useEffect, useMemo, useRef } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Button } from '../Button';
import { SkeletonList } from '../Skeleton/SkeletonList';
import { LayoutTabDeviceListItem } from './LayoutTabDeviceListItem';

export const SideBarContent = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const initialParams = useMemo(() => ({ pageIndex: '0', pageSize: '10' }), []);
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching: isDeviceInfoPagingFetching,
  } = useGetDeviceInfosPaging(initialParams);

  const isFetchingFirstPage = isDeviceInfoPagingFetching && !isFetchingNextPage;

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

  useEffect(() => {
    queryClient.resetQueries({
      queryKey: [
        queryKeys.DEVICE,
        queryKeys.GET_DEVICE_INFOS_PAGING,
        initialParams,
      ],
    });
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }, 0);
  }, [initialParams]);

  // 스켈레톤 리스트
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

  const renderContent = () => {
    if (isFetchingFirstPage) {
      return (
        <ul className="cw_myprdlist" id="cwMyprdList">
          {skeletonList(10)}
        </ul>
      );
    }

    return (
      <ul className="cw_myprdlist" id="cwMyprdList">
        {posts?.pages.flat().map((item, index) => (
          <LayoutTabDeviceListItem
            key={item.barcode || `device-${index}`}
            index={index}
            item={item}
          />
        ))}
        {/* 다음 페이지 로딩 시에만 하단에 스켈레톤 표시 */}
        {isFetchingNextPage && skeletonList(10)} {/* 3개 정도로 줄여서 표시 */}
        <li>
          <Button className="cw_btn_reg">
            <span>{t('BTN.REGIST')}</span>
          </Button>
        </li>
      </ul>
    );
  };

  return (
    <div
      ref={scrollContainerRef}
      className="cw_contentsWrap"
      onScroll={handleScroll}
    >
      <div className="cw_prdlistWrap">
        {renderContent()}
        <div className="cw_c_btn cw_edit">
          <Button className="cw_btn_edit">
            <span>{t('BTN.EDIT_PRODUCT')}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
