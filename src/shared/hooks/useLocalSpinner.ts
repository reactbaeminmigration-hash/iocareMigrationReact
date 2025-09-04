import { useIsFetching } from '@tanstack/react-query';
import { useEffect, type RefObject } from 'react';

const LOADING_CLASS = 'cw_cont_loading';

export const useLocalSpinner = (
  ref: RefObject<HTMLElement | null>,
  scopeKey: string[],
) => {
  const activeFetchers = useIsFetching({ queryKey: scopeKey });
  const isAnythingLoading = activeFetchers > 0;

  const show = () => ref.current?.classList.add(LOADING_CLASS);
  const hide = () => ref.current?.classList.remove(LOADING_CLASS);

  useEffect(() => {
    if (isAnythingLoading) {
      show();
    } else {
      hide();
    }
    return hide;
  }, [isAnythingLoading]);
};
