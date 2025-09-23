import { useState, useCallback } from 'react';

type HourTimeValue = { ampm: string; hour: string };

export function useHourTimePicker(
  initial: HourTimeValue,
  onConfirm: (picked: HourTimeValue) => void,
) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<HourTimeValue>(initial);

  const openPicker = useCallback((init: HourTimeValue) => {
    if (init) setValue(init);
    setOpen(true);
  }, []);

  const closePicker = useCallback(() => setOpen(false), []);

  const change = useCallback((next: HourTimeValue) => setValue(next), []);

  const confirm = useCallback(() => {
    onConfirm?.(value);
    setOpen(false);
  }, [onConfirm, value]);

  return {
    open,
    value,
    openPicker,
    closePicker,
    change,
    confirm,
  };
}
