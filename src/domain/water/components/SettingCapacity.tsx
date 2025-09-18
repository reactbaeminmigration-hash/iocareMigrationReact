import { Modal } from '@/shared/components/Modal/Modal';
import useModal from '@/shared/hooks/useModal';
import { t } from 'i18next';
import type { Props } from '../constants/controlDefinitions';
import useGetWaterControl from '../queries/useGetWaterControl';

export const SettingCapacityComponent: React.FC<Props> = ({
  protocol,
  status,
}) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  // const { mutate, isPending } = useGetWaterControl();
  console.log(protocol);
  return (
    <div className={`sub_row d-flex`}>
      <div className="title">
        <strong>{t('HIDDEN.CONTROL.SETTING_CAPACITY')}</strong>
      </div>

      <div className="option">
        <div className="dropdownWrap" id="settingCapacity">
          <div className="selected">
            <span className="txt">
              <span>capacity</span>
            </span>
            <button type="button" className="btn_dropdown" onClick={openModal}>
              <span>list show/hide</span>
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onConfirm={() => {}}
        onClose={closeModal}
        title="용량 설정"
      />
    </div>
  );
};
