import { Outlet } from 'react-router-dom';
import { LayoutHeader } from './LayoutHeader';
import { LayoutTab, type ITab } from './LayoutTab';
import { SideBar } from './SideBar';

interface LayoutProps<T extends ITab> {
  tabs: readonly T[];
  domain: string;
}

export const Layout = <T extends ITab>({ tabs, domain }: LayoutProps<T>) => {
  return (
    <div className="cw_subWrap01 cw_topfixWrap cw_floatingWrap cw_bg02">
      <LayoutHeader />
      <LayoutTab tabs={tabs} domain={domain} />
      <Outlet />
      <SideBar />
    </div>
  );
};
