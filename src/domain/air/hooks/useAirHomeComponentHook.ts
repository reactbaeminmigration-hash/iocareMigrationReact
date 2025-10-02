import type { ComponentSpec } from '@/domain/device/types/productUISpec.types';
import { useCallback, useMemo } from 'react';

export const useAirHomeComponentHook = () => {
  const handleHeaderButtonClick = useCallback(() => {
    console.log('AirHomeSectionHeader의 동적 클릭 핸들러 실행됨!');
  }, []);

  const dynamicPropsMap = useMemo(
    () => ({
      AirHomeSectionHeader: (_spec: ComponentSpec<any>) => ({
        onButtonClick: handleHeaderButtonClick,
      }),
      // ... 다른 컴포넌트에 대한 동적 props가 있다면 여기에 추가 ...
    }),
    [handleHeaderButtonClick],
  );

  return { dynamicPropsMap };
};
