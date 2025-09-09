import i18next from '@/core/i18n/i18n';
import { useErrorPopupStore } from '@/shared/stores/useErrorPopupStore';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const showErrorPopup = (error: unknown) => {
  // 스토어에서 전역 팝업 활성화 플래그를 가져옵니다.
  const { isErrorPopupEnabled } = useErrorPopupStore.getState();

  // 플래그가 false이면, 여기서 함수를 즉시 종료합니다.
  if (!isErrorPopupEnabled) {
    return;
  }
  let errorMessage: string;

  if (error instanceof Error) {
    if (error instanceof AxiosError && error.response?.data?.code) {
      const errCode = error.response.data.code;
      const i18nKey = `SERVER_ERROR.${errCode}`;
      const translatedMessage = i18next.t(i18nKey as any);

      if (translatedMessage !== i18nKey) {
        errorMessage = translatedMessage;
      } else {
        errorMessage = i18next.t('SERVER_ERROR.DEFAULT', {
          errorCode: errCode,
        });
      }
    } else {
      errorMessage = error.message;
    }
  } else {
    errorMessage = i18next.t('SERVER_ERROR.DEFAULT', {
      errorCode: 'UNKNOWN',
    });
  }

  const { setErrorPopup } = useErrorPopupStore.getState();

  setErrorPopup({
    title: i18next.t('COMMON.ERROR', '오류'),
    contents: errorMessage,
    btns: [
      {
        text: i18next.t('COMMON.CONFIRM', '확인'),
        type: 'cw_btn_point',
        action: () => {},
      },
    ],
  });
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.disableGlobalErrorHandler) {
        return;
      }
      showErrorPopup(error);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.meta?.disableGlobalErrorHandler) {
        return;
      }
      showErrorPopup(error);
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export default queryClient;
