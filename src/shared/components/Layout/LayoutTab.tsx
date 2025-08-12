import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../Button';
import { useTranslation } from 'react-i18next';

const tabs = [
  { path: '/air_home', label: 'BTN.HOME' },
  { path: '/air_report', label: 'BTN.REPORT' },
  { path: '/air_control', label: 'BTN.CONTROL' },
  { path: '/air_notice', label: 'BTN.NOTICE' },
  { path: '/air_settings', label: 'BTN.SETTING' },
] as const;

export const LayoutTab = () => {
  const { t } = useTranslation();
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
                  className={currentPath === tab.path ? 'cw_on' : ''}
                >
                  <Button onClick={() => navigate(tab.path)}>
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
