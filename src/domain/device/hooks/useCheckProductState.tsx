import { useReplaceHomeScreen } from '@/shared/hooks/useReplaceHomeScreen';
import type { ReactNode } from 'react';
import { useOtaStatusLogic } from './useOtaStatusLogic';

interface useCheckProductStateProps {
  scopeKey?: string[];
}

export function useCheckProductState({ scopeKey }: useCheckProductStateProps): {
  isLoading: boolean;
  finalNode: ReactNode;
} {
  const { node: replaceNode, loading: isReplaceHomeLoading } =
    useReplaceHomeScreen();
  // 제품 상태체크가 문제가 없고 로딩 완료되었을때
  const shouldEnableOtaLogic = !isReplaceHomeLoading && replaceNode === null;
  const {
    node: otaNode,
    isLoading: otaIsLoading,
    // isSuccess: otaIsSuccess,
  } = useOtaStatusLogic({
    scopeKey,
    enabled: shouldEnableOtaLogic,
  });

  let finalNode: ReactNode = null;
  if (isReplaceHomeLoading) {
    finalNode = null;
  } else if (replaceNode) {
    finalNode = replaceNode;
  } else {
    finalNode = otaNode;
  }
  return {
    isLoading: isReplaceHomeLoading || otaIsLoading,
    finalNode,
  };
}
