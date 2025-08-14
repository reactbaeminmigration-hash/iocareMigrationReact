import { LayoutHeader } from './LayoutHeader';
import { LayoutTab } from './LayoutTab';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className="cw_subWrap01 cw_topfixWrap cw_floatingWrap cw_bg02">
      <LayoutHeader />
      <LayoutTab />
      <Outlet />
    </div>
  );
};
