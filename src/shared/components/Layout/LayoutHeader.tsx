import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';

export const LayoutHeader = () => {
  // const { setLoading } = useLoadingStore();
  // useEffect(() => {
  //   setLoading(true);
  // }, []);
  const navigate = useNavigate();

  return (
    <div className="cw_subWrap01 cw_topfixWrap cw_floatingWrap cw_bg02">
      <a id="page_top">Top of page</a>
      <div className="cw_header">
        <div className="cw_webcontainer">
          <div className="cw_tit">
            <div>
              <h1>CON.DVC_TYPE</h1>
              <p className="cw_nick">
                <span className="cw_txt">Nick</span>
              </p>
            </div>
          </div>
          <div className="cw_head_btn cw_head_btn_left">
            <Button className="cw_btn_menu" onClick={() => navigate('/gnb')}>
              <span>Menu</span>
            </Button>
          </div>
          <div className="cw_head_btn cw_head_btn_right">
            <Button className="cw_btn_select_product">
              <span>제품선택</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
