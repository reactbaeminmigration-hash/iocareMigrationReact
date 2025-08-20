import type { TranslationKey } from '@/shared/types/common';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../Button';

export interface ITab {
  path: string;
  label: TranslationKey;
}
interface LayoutTabProps<T extends ITab> {
  tabs: readonly T[];
  domain: string;
}

export const LayoutTab = <T extends ITab>({
  tabs,
  domain,
}: LayoutTabProps<T>) => {
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
                  className={currentPath.includes(tab.path) ? 'cw_on' : ''}
                >
                  <Button onClick={() => navigate(domain + tab.path)}>
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
