import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import { useSidebar } from '@/shared/hooks/useSidebar';
import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import { useGetDeviceType } from '@/domain/device/hooks/useGetDeviceType';

export const LayoutHeader = () => {
  const navigate = useNavigate();
  const { toggle } = useSidebar();
  const { lastSelectedDeviceInfos } = useDeviceStore();
  const { getDvcTypeName } = useGetDeviceType();

  return (
    <div className="cw_header">
      <div className="cw_webcontainer">
        <div className="cw_tit">
          <div>
            <h1>{getDvcTypeName(lastSelectedDeviceInfos.dvcTypeCd)}</h1>
            <p className="cw_nick">
              <span className="cw_txt">{lastSelectedDeviceInfos.dvcNick}</span>
            </p>
          </div>
        </div>
        <div className="cw_head_btn cw_head_btn_left">
          <Button className="cw_btn_menu" onClick={() => navigate('/gnb')}>
            <span>Menu</span>
          </Button>
        </div>
        <div className="cw_head_btn cw_head_btn_right">
          <Button className="cw_btn_select_product" onClick={toggle}>
            <span>제품선택</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
