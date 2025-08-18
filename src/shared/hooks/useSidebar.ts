import { useEffect, useState } from 'react';
import { useSideBarStore } from '../stores/sidebarStore';

export function useSidebar() {
  const { isSideBarOpen, toggle } = useSideBarStore();
  const [cls, setCls] = useState<string>(''); // '' | 'cw_show' | 'cw_close'

  useEffect(() => {
    if (isSideBarOpen) {
      setCls('cw_show');
    } else {
      setCls('cw_close');
      setTimeout(() => {
        setCls('');
      }, 300);
    }
  }, [isSideBarOpen]);

  return {
    isOpen: isSideBarOpen,
    cls,
    toggle,
  };
}
