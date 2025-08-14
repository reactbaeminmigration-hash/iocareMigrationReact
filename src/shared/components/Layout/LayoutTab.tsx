import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../Button';
import { useTranslation } from 'react-i18next';
import { useGetDeviceType } from '@/domain/device/hooks/useGetDeviceType';

const tabs = [
  { path: '/home', label: 'BTN.HOME' },
  { path: '/report', label: 'BTN.REPORT' },
  { path: '/control', label: 'BTN.CONTROL' },
  { path: '/notice', label: 'BTN.NOTICE' },
  { path: '/settings', label: 'BTN.SETTING' },
] as const;

export const LayoutTab = () => {
  const { t } = useTranslation();
  const { getDvcTypeCd } = useGetDeviceType(0);
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  return (
    <div className="cw_topfix">
      <div className="cw_webcontainer">
        <div className="cw_tab01">
          <div id="tapDiv">
            <ul>
              {tabs.map((tab) => (
                <li
                  key={tab.path}
                  className={currentPath.includes(tab.path) ? 'cw_on' : ''}
                >
                  <Button
                    onClick={() => navigate('/' + getDvcTypeCd() + tab.path)}
                  >
                    <span>{t(tab.label)}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
