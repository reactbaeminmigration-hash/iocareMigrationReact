import type { ComponentSpec } from '@/domain/device/types/productUISpec.types';
import { useCallback, useMemo } from 'react';

export const useAirHomeComponentHook = () => {
  const handleHeaderButtonClick = useCallback(() => {
    console.log('AirHomeHeader의 동적 클릭 핸들러 실행됨!');
  }, []);

  const dynamicPropsMap = useMemo(
    () => ({
      AirHomeHeader: (_spec: ComponentSpec<any>) => ({
        title: 'AIR.AIR_QUALITY',
        buttonText: 'AIR.AIR_MORE_SEE',
        onButtonClick: handleHeaderButtonClick,
      }),
    }),
    [handleHeaderButtonClick],
  );

  return { dynamicPropsMap };
};
