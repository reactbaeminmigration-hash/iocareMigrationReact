import { LayoutHeader } from './LayoutHeader';
import { LayoutTab } from './LayoutTab';
import { Outlet } from 'react-router-dom';
import { SideBar } from './SideBar';

export const Layout = () => {
  return (
    <div className="cw_subWrap01 cw_topfixWrap cw_floatingWrap cw_bg02">
      <LayoutHeader />
      <LayoutTab />
      <Outlet />
      <SideBar />
    </div>
  );
};
