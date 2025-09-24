import { t } from 'i18next';
import { WATER_PROTOCOL, type Props } from '../../constants/controlDefinitions';
import { useControl } from '../../hooks/useControl';
import { EuroSterTimeComponent } from './EuroSterTime';

export const EuroSterComponent: React.FC<Props> = ({ protocol, status }) => {
  const { value, update, isPending } = useControl({
    protocol,
    status,
  });
  const checked = value === '1';
  const subProtocol = WATER_PROTOCOL.euroSterTime; // '0013'

  return (
    <>
      <div className="row">
        <div className="title">
          <span>{t('HIDDEN.EURO_STER')}</span>
        </div>
        <div className="option">
          <div className="cw_onoffswitch">
            <label>
              <input
                type="checkbox"
                className="0007"
                checked={checked}
                disabled={isPending}
                onChange={(e) => update(e.target.checked ? '1' : '0')}
              />
              <span>ON</span>
            </label>
          </div>
        </div>
        {checked && (
          <EuroSterTimeComponent
            key={subProtocol}
            protocol={subProtocol}
            status={status}
            rowClass="sub_row d-flex"
          />
        )}
      </div>
    </>
  );
};
