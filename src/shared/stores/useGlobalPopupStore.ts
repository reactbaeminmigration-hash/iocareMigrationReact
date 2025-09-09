import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface GlobalPopupData {
  isOpen: boolean;
  popupType: string;
  title: string;
  contents: string;
  btns: {
    type: string;
    text: string;
    action: () => void; // 요청하신대로 void 타입으로 수정
  }[];
  isNoBorder: boolean;
}

interface GlobalPopupState {
  isGlobalPopup: GlobalPopupData;
  setGlobalPopup: (popupData: Partial<GlobalPopupData>) => void;
  closeGlobalPopup: () => void;
}
const initialPopupData: GlobalPopupData = {
  isOpen: false,
  popupType: '',
  title: '',
  contents: '',
  btns: [],
  isNoBorder: false,
};

// devtools에서 사용하는 모든 액션 타입을 포함하도록 수정
export type GlobalPopupActionType = 'set_GlobalPopup' | 'close_GlobalPopup';

export const useGlobalPopupStore = create<GlobalPopupState>()(
  devtools(
    (set) => ({
      isGlobalPopup: initialPopupData,
      setGlobalPopup: (popupData) =>
        set(
          (state) => ({
            isGlobalPopup: {
              ...state.isGlobalPopup,
              ...popupData,
              isOpen: true,
            },
          }),
          false,
          'set_GlobalPopup' as GlobalPopupActionType,
        ),
      closeGlobalPopup: () =>
        set(
          { isGlobalPopup: initialPopupData },
          false,
          'close_GlobalPopup' as GlobalPopupActionType,
        ),
    }),
    { name: 'GlobalPopupStore' }, // devtools 이름 수정
  ),
);