import { useReplaceDeviceState } from '@/shared/hooks/useReplaceDeviceState';
import type { ReactNode } from 'react';
import { useOtaStatusLogic } from './useOtaStatusLogic';

interface useCheckProductStateProps {
  localLoadingKey?: string[];
}

export function useCheckProductState({
  localLoadingKey,
}: useCheckProductStateProps): {
  isProductStateLoading: boolean;
  productStateNode: ReactNode;
} {
  const { node: replaceNode, loading: isReplaceHomeLoading } =
    useReplaceDeviceState({ localLoadingKey });
  // 제품 상태체크가 문제가 없고 로딩 완료되었을때
  const shouldEnableOtaLogic = !isReplaceHomeLoading && replaceNode === null;
  const {
    node: otaNode,
    isLoading: otaIsLoading,
    // isSuccess: otaIsSuccess,
  } = useOtaStatusLogic({
    localLoadingKey,
    enabled: shouldEnableOtaLogic,
  });

  let productStateNode: ReactNode = null;
  if (isReplaceHomeLoading) {
    productStateNode = null;
  } else if (replaceNode) {
    productStateNode = replaceNode;
  } else {
    productStateNode = otaNode;
  }
  return {
    isProductStateLoading: isReplaceHomeLoading || otaIsLoading,
    productStateNode,
  };
}
