import { t } from 'i18next';
import { type Props } from '../../constants/controlDefinitions';
import { useControl } from '../../hooks/useControl';

export const HotLockSettingComponent: React.FC<Props> = ({
  protocol,
  status,
}) => {
  const { value, update, isPending } = useControl({
    protocol,
    status,
  });
  const checked = value === '2';
  return (
    <div className="row">
      <div className="title">
        <span>{t('HIDDEN.CONTROL.HOT_LOCK_SETTING')}</span>
      </div>
      <div className="option">
        <div className="cw_onoffswitch">
          <label>
            <input
              type="checkbox"
              className="0003"
              checked={checked}
              disabled={isPending}
              onChange={(e) => update(e.target.checked ? '2' : '1')}
            />
            <span>ON</span>
          </label>
        </div>
      </div>
    </div>
  );
};
