import { useEffect, useState, useCallback } from 'react';
import useGetWaterControl from '../queries/useGetWaterControl';
import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';

type ControlParams = {
  protocol: string;
  status: Record<string, string>;
};

export function useControl({ protocol, status }: ControlParams) {
  const device = useDeviceStore((s) => s.lastSelectedDeviceInfos);
  const { mutate, isPending } = useGetWaterControl();

  const [value, setValue] = useState<string>(status[protocol]);

  useEffect(() => {
    setValue(status[protocol]);
  }, [status, protocol]);

  const update = useCallback(
    (next: string) => {
      const prev = value;
      setValue(next);

      if (!device?.barcode) {
        setValue(prev);
        return;
      }

      mutate(
        {
          devId: device.barcode,
          dvcTypeCd: device.dvcTypeCd,
          isMultiControl: false,
          refreshFlag: false,
          funcList: [{ funcId: protocol, cmdVal: next }],
        },
        { onError: () => setValue(prev) },
      );
    },
    [value, device, mutate, protocol],
  );

  return { value, setValue, update, isPending };
}
