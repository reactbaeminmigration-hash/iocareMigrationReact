import useGetDeviceConn from '@/domain/device/hooks/queries/useGetDeviceConn';
import { useGetDeviceType } from '@/domain/device/hooks/useGetDeviceType';
import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import type { DeviceInfo } from '@/domain/device/types/device.types';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import { useSidebar } from '@/shared/hooks/useSidebar';

interface LayoutTabDeviceListItemProps {
  item: DeviceInfo;
  index: number;
}

export const LayoutTabDeviceListItem = ({
  item,
  index,
}: LayoutTabDeviceListItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const [deviceNetStatus, setDeviceNetStatus] = useState(false);

  const navigate = useNavigate();

  const { setLastSelectedDeviceInfos, lastSelectedDeviceInfos } =
    useDeviceStore();
  const { getDvcTypeName, getDvcComType, getDvcTypeRoute, getDvcWifiNetState } =
    useGetDeviceType();
  const deviceList = [{ devIds: item.barcode }];
  const { isFetched, data, isSuccess, isLoading } = useGetDeviceConn({
    deviceList,
  });
  const { toggle } = useSidebar();
  // const deviceInfos = useDeviceStore((deviceStore) => deviceStore.deviceInfos);

  useEffect(() => {
    if (!ref.current) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setDeviceNetStatus(data?.[0]?.netStatus ?? false);

          observer.current?.disconnect(); // 한 번만 체크
        }
      },
      { threshold: 0.1 },
    );

    observer.current.observe(ref.current);

    return () => observer.current?.disconnect();
  }, [item, isFetched, isSuccess]);

  return (
    <li
      key={index}
      className={`record ${item.barcode === lastSelectedDeviceInfos.barcode ? 'cw_on' : ''}`}
    >
      <div ref={ref} className="cw_prdcard">
        <div>
          <strong className="cw_prdtype">
            {getDvcTypeName(item.dvcTypeCd)}
          </strong>
        </div>
        <em className="cw_nick cw_breakword">
          <span>{item.dvcNick}</span>
        </em>
        <div
          className={`cw_statusico ${isLoading ? 'cw_cont_loading_tabDeviceLogingState' : ''}`}
        >
          <em
            className={`${getDvcComType(item.comType)} ${getDvcWifiNetState(item.comType, deviceNetStatus)}`}
          ></em>
        </div>
      </div>
      <Button
        className="cw_btn_detail01 cw_st02 selectProdBtn"
        onClick={() => {
          setLastSelectedDeviceInfos(item);
          toggle();
          navigate(`/${getDvcTypeRoute(index)}`);
        }}
      >
        <span>select product</span>
      </Button>
    </li>
  );
};
