import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ErrorPopupData {
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

interface ErrorPopupState {
  isErrorPopup: ErrorPopupData;
  setErrorPopup: (popupData: Partial<ErrorPopupData>) => void;
  closeErrorPopup: () => void;
}
const initialPopupData: ErrorPopupData = {
  isOpen: false,
  popupType: '',
  title: '',
  contents: '',
  btns: [],
  isNoBorder: false,
};

export type ErrorPopupActionType = 'set_ErrorPopup';
export const useErrorPopupStore = create<ErrorPopupState>()(
  devtools(
    (set) => ({
      isErrorPopup: initialPopupData,
      setErrorPopup: (popupData) =>
        set(
          (state) => ({
            isErrorPopup: {
              ...state.isErrorPopup,
              ...popupData,
              isOpen: true,
            },
          }),
          false,
          'set_ErrorPopup' as ErrorPopupActionType,
        ),
      closeErrorPopup: () =>
        set(
          { isErrorPopup: initialPopupData },
          false,
          'close_ErrorPopup' as ErrorPopupActionType,
        ),
    }),
    { name: 'ErrorPopupStore' },
  ),
);
