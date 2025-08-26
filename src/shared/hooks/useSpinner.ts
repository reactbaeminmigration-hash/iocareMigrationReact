import { useLoadingStore } from '../stores/loadingStore';

export function useSpinner() {
  const { setLoading } = useLoadingStore();
  const hideSpinner = () => {
    setLoading(false);
  };
  const showSpinner = () => {
    setLoading(true);
  };
  return {
    hideSpinner,
    showSpinner,
  };
}
