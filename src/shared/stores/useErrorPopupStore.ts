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
  isErrorPopupEnabled: boolean; // <-- 새로운 상태 추가
  setErrorPopup: (popupData: Partial<ErrorPopupData>) => void;
  closeErrorPopup: () => void;
  enableErrorPopups: () => void; // <-- 새로운 액션 추가
  disableErrorPopups: () => void; // <-- 새로운 액션 추가
}
const initialPopupData: ErrorPopupData = {
  isOpen: false,
  popupType: '',
  title: '',
  contents: '',
  btns: [],
  isNoBorder: false,
};

export type ErrorPopupActionType = 'set_ErrorPopup' | 'close_ErrorPopup';

export const useErrorPopupStore = create<ErrorPopupState>()(
  devtools(
    (set) => ({
      isErrorPopup: initialPopupData,
      isErrorPopupEnabled: true, // 기본값은 true
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
      enableErrorPopups: () => set({ isErrorPopupEnabled: true }, false, 'enableErrorPopups'),
      disableErrorPopups: () => set({ isErrorPopupEnabled: false }, false, 'disableErrorPopups'),
    }),
    { name: 'ErrorPopupStore' },
  ),
);
