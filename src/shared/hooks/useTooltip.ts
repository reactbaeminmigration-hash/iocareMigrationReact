import { useRef, useState } from 'react';
import { useClickOutside } from './useClickOutside';

export function useTooltip<T extends HTMLElement>() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<T | null>(null);

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  useClickOutside(containerRef, close);

  return {
    isOpen,
    toggle,
    containerRef: containerRef,
  };
}
