import { type Props } from '../constants/controlDefinitions';
import { useEffect, useRef } from 'react';
import { useControl } from '../hooks/useControl';

export const SoundVolumeComponent: React.FC<Props> = ({ protocol, status }) => {
  const { value, update, isPending } = useControl({
    protocol: protocol,
    status,
  });

  const rangeRef = useRef<HTMLInputElement>(null);

  const paintRange = (el: HTMLInputElement) => {
    const min = Number(el.min) || 0;
    const max = Number(el.max) || 100;
    const val = Number(el.value);
    const pct = ((val - min) / (max - min)) * 100;
    el.style.background = `linear-gradient(to right,
      #2a3f54 0%,
      #2a3f54 ${pct}%,
      #d9dbdc ${pct}%,
      #d9dbdc 100%)`;
  };

  useEffect(() => {
    if (!rangeRef.current) return;
    rangeRef.current.value = value;
    paintRange(rangeRef.current);
  }, [value]);

  const onVolumeChange = (el: HTMLInputElement) => {
    paintRange(el);
    if (el.value !== value) update(el.value);
  };

  return (
    <div className="range01 volume">
      <div className="input_wrapper">
        <input
          type="range"
          id="volumOption_2"
          min="1"
          max="5"
          step="1"
          ref={rangeRef}
          onChange={(e) => onVolumeChange(e.currentTarget)}
          disabled={isPending}
        />
      </div>
      <div className="datalist">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
      </div>
    </div>
  );
};
