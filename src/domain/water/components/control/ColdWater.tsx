import { t } from 'i18next';
import { type Props } from '../../constants/controlDefinitions';
import { useControl } from '../../hooks/useControl';

export const ColdWaterComponent: React.FC<Props> = ({ protocol, status }) => {
  const { value, update, isPending } = useControl({
    protocol,
    status,
  });
  const checked = value === '1';
  return (
    <div className="row">
      <div className="title">
        <span>{t('HIDDEN.CONTROL.COLD_WATER')}</span>
      </div>
      <div className="option">
        <div className="cw_onoffswitch">
          <label>
            <input
              type="checkbox"
              className="0002"
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
