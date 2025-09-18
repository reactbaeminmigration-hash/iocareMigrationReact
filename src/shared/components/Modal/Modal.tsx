import { CAPACITY_CATEGORY } from '@/domain/water/constants/controlDefinitions';
import { t } from 'i18next';
import { useEffect, useState } from 'react';

type ModalProps = {
  isOpen: boolean;
  initialValue?: string;
  onClose: () => void;
  onConfirm: (value: string) => void;
  title?: string;
};

export const Modal = ({
  isOpen,
  initialValue,
  onClose,
  onConfirm,
  title,
}: ModalProps) => {
  const [current, setCurrent] = useState(
    initialValue ?? CAPACITY_CATEGORY[43]?.value ?? '',
  );
  useEffect(() => {
    setCurrent(initialValue ?? CAPACITY_CATEGORY[43]?.value ?? '');
  }, [initialValue]);

  console.log(initialValue);
  return (
    <div className={`mobileSelect ${isOpen ? 'mobileSelect-show' : ''}`}>
      <div className="grayLayer" onClick={onClose}></div>
      <div className="content">
        <div className="btnBar">
          <div className="fixWidth">
            <div className="cancel" onClick={onClose}>
              {t('BTN.CANCEL')}
            </div>
            <div className="title">{title}</div>
            <div className="ensure" onClick={() => onConfirm(current)}>
              {t('BTN.CONFIRM')}
            </div>
          </div>
        </div>
        <div
          className="panel heightUnset"
          style={{ overflowY: 'scroll', maxHeight: 230 }}
        >
          <div className="fixWidth heightUnset">
            <div className="wheels" style={{ height: 'unset' }}>
              <div className="wheel" style={{ width: '100%', height: 'unset' }}>
                <ul className="selectContainer">
                  {CAPACITY_CATEGORY.map((item) => {
                    return (
                      <li
                        key={item.value}
                        style={{
                          margin: '5px 0',
                        }}
                        // className={active ? 'selected' : undefined}
                        onClick={() => {}}
                      >
                        {item.value}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
