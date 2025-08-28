import useGetDeviceConn from '@/domain/device/hooks/queries/useGetDeviceConn';
import { useGetDeviceType } from '@/domain/device/hooks/useGetDeviceType';
import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import type { DeviceInfo } from '@/domain/device/types/device.types';
import { useSidebar } from '@/shared/hooks/useSidebar';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';

interface LayoutTabDeviceListItemProps {
  item: DeviceInfo;
  index: number;
}

export const LayoutTabDeviceListItem = ({
  item,
  index,
}: LayoutTabDeviceListItemProps) => {
  const ref = useRef<HTMLLIElement>(null);
  const [inView, setInView] = useState(false);

  const [deviceNetStatus, setDeviceNetStatus] = useState(false);
  const navigate = useNavigate();

  const { setLastSelectedDeviceInfos, lastSelectedDeviceInfos } =
    useDeviceStore();
  const { getDvcTypeName, getDvcComType, getDvcTypeRoute, getDvcWifiNetState } =
    useGetDeviceType();

  const deviceList = [{ devIds: item.barcode }];
  const { data, isFetching } = useGetDeviceConn(
    {
      deviceList,
    },
    {
      enabled: inView,
    },
  );
  const { toggle } = useSidebar();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // 한 번만 체크
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (data) {
      setDeviceNetStatus(data[0]?.netStatus ?? false);
    }
  }, [data]);

  return (
    <li
      ref={ref}
      key={index}
      className={`record ${item.barcode === lastSelectedDeviceInfos.barcode ? 'cw_on' : ''}`}
    >
      <div className="cw_prdcard">
        <div>
          <strong className="cw_prdtype">
            {getDvcTypeName(item.dvcTypeCd)}
          </strong>
        </div>
        <em className="cw_nick cw_breakword">
          <span>{item.dvcNick}</span>
        </em>
        <div
          className={`cw_statusico ${isFetching ? 'cw_cont_loading_tabDeviceLogingState' : ''}`}
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
          navigate(`/${getDvcTypeRoute(item.dvcTypeCd)}`);
        }}
      >
        <span>select product</span>
      </Button>
    </li>
  );
};
