import { useGetDeviceType } from '@/domain/device/hooks/useGetDeviceType';
import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import type { DeviceInfo } from '@/domain/device/types/device.types';
import { useEffect, useRef } from 'react';
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
  const ref = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const navigate = useNavigate();

  const { setLastSelectedDeviceInfos, lastSelectedDeviceInfos } =
    useDeviceStore();
  const { getDvcTypeName, getDvcComType, getDvcTypeRoute } = useGetDeviceType();
  // const deviceInfos = useDeviceStore((deviceStore) => deviceStore.deviceInfos);

  useEffect(() => {
    if (!ref.current) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          console.log('보이네');

          observer.current?.disconnect(); // 한 번만 체크
        }
      },
      { threshold: 0.1 },
    );

    observer.current.observe(ref.current);

    return () => observer.current?.disconnect();
  }, [item]);

  return (
    <li
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
        <div className="cw_statusico">
          <em className={`${getDvcComType(item.comType)} `}></em>
        </div>
      </div>
      <Button
        className="cw_btn_detail01 cw_st02 selectProdBtn"
        onClick={() => {
          setLastSelectedDeviceInfos(item);
          navigate(`/${getDvcTypeRoute(index)}`);
        }}
      >
        <span>select product</span>
      </Button>
    </li>
  );
};
