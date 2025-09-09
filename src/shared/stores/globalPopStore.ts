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
    action: () => void;
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

export type GlobalPopupActionType = 'set_globalPopup';
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
    { name: 'GlobalPopupStore' },
  ),
);
