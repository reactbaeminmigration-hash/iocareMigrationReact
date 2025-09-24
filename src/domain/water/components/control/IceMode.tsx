import { t } from 'i18next';
import { type Props } from '../../constants/controlDefinitions';
import { useControl } from '../../hooks/useControl';

export const IceModeComponent: React.FC<Props> = ({ protocol, status }) => {
  const { value, update, isPending } = useControl({
    protocol,
    status,
  });
  const checked = value === '1';
  return (
    <div className="row">
      <div className="title">
        <span>{t('ICON40.CONTROL.ICE_TITLE')}</span>
      </div>
      <div className="option">
        <div className="cw_onoffswitch">
          <label>
            <input
              type="checkbox"
              className="0059"
              checked={checked}
              disabled={isPending}
              onChange={(e) => update(e.target.checked ? '1' : '0')}
            />
            <span>ON</span>
          </label>
        </div>
      </div>
    </div>
  );
};
