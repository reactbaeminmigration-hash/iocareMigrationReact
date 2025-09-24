import { t } from 'i18next';
import { useState } from 'react';

export type HourTimeValue = { ampm: string; hour: string };

type HourTimePickerProps = {
  title: string;
  init: HourTimeValue;
  onCancel: () => void;
  onConfirm: (picked: HourTimeValue) => void;
};

export const HourTimePicker: React.FC<HourTimePickerProps> = ({
  title,
  init,
  onCancel,
  onConfirm,
}) => {
  const MORNING = t('CON.MORNING');
  const AFTERNOON = t('CON.AFTERNOON');

  const [ampm, setAmpm] = useState(init.ampm.trim());
  const [hour, setHour] = useState(String(init.hour).padStart(2, '0'));

  const changeAmPm = () =>
    setAmpm((prev) => (prev.trim() === MORNING ? AFTERNOON : MORNING));

  const changeHour = (type: 'up' | 'down') => {
    setHour((h) => {
      let n = Number(h);

      if (n >= 0 && n <= 12) {
        if (type === 'up') {
          n += 1;

          if (n === 12) {
            if (ampm === MORNING) setAmpm(AFTERNOON);
            else {
              setAmpm(MORNING);
              n = 0;
            }
          } else if (n > 12) {
            n = 1;
          }
        } else {
          n -= 1;

          if (n < 0) {
            setAmpm(ampm === MORNING ? AFTERNOON : MORNING);
            n = 11;
          } else if (n === 0) {
            if (ampm === AFTERNOON) n = 12;
          } else if (n === 11) {
            if (ampm === AFTERNOON) setAmpm(MORNING);
          }
        }
      }
      return String(n).padStart(2, '0');
    });
  };

  return (
    <div className="cw_popWrap01 layer_pop_box">
      <div className="cw_pickerWrap">
        <div className="cw_picker_head">
          <h1>{title}</h1>
        </div>
        <div className="cw_picker_cont">
          <div className="">
            <button
              type="button"
              className="cw_btn_up btnUp"
              onClick={changeAmPm}
            >
              <span>Up</span>
            </button>
            <input type="text" id="ampmInputId" value={ampm} readOnly />
            <button
              type="button"
              className="cw_btn_down btnDown"
              onClick={changeAmPm}
            >
              <span>Down</span>
            </button>
          </div>
          <div className="" id="liTime">
            <button
              type="button"
              className="cw_btn_up btnUp"
              onClick={() => changeHour('up')}
            >
              <span>Up</span>
            </button>
            <input type="tel" value={hour} readOnly />
            <span className="unit" id="">
              {t('AIR.AIR_HOUR')}
            </span>
            <button
              type="button"
              className="cw_btn_down btnDown"
              onClick={() => changeHour('down')}
            >
              <span>Down</span>
            </button>
          </div>
        </div>
        <div className="cw_picker_foot">
          <button type="button" className="layer_close_ok" onClick={onCancel}>
            <span>{t('BTN.CANCEL')}</span>
          </button>
          <button
            type="button"
            id="btnSetting"
            className="layer_close_ok"
            onClick={() => onConfirm({ ampm, hour })}
          >
            <em>
              <span>{t('BTN.CONFIRM')}</span>
            </em>
          </button>
        </div>
      </div>
    </div>
  );
};
