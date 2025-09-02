import { useEffect, useRef, useState } from 'react';
import { useSideBarStore } from '../stores/sidebarStore';

export function useSidebar() {
  const { isOpen, toggle } = useSideBarStore();
  const [cls, setCls] = useState<string>(''); // '' | 'cw_show' | 'cw_close'
  const first = useRef(true);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }
      setCls('cw_show');
    } else {
      // 첫 렌더에서 자동 닫힘 애니메이션 방지
      if (first.current) {
        first.current = false;
        setCls('');
        return;
      }
      setCls('cw_show cw_close');
      closeTimer.current = window.setTimeout(() => {
        setCls('');
        closeTimer.current = null;
      }, 300);
    }
  }, [isOpen]);

  return {
    isOpen,
    cls,
    toggle,
  };
}
