import { useLoadingStore } from '../stores/loadingStore';

export function useSpiner() {
  const { setLoading } = useLoadingStore();
  const hideSpiner = () => {
    setLoading(false);
  };
  const showSpiner = () => {
    setLoading(true);
  };
  return {
    hideSpiner,
    showSpiner,
  };
}
