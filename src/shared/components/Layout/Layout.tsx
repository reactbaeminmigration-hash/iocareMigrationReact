import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import { LayoutHeader } from './LayoutHeader';
import { LayoutTab } from './LayoutTab';

export const Layout = () => {
  // const { setLoading } = useLoadingStore();
  // useEffect(() => {
  //   setLoading(true);
  // }, []);

  return (
    <div className="cw_subWrap01 cw_topfixWrap cw_floatingWrap cw_bg02">
      <LayoutHeader />
      <LayoutTab />
    </div>
  );
};
