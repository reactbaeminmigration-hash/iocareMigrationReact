import type { TranslationKey } from '@/shared/types/common';
import { useTranslation } from 'react-i18next';

interface AirHomeSectionHeaderProps {
  title: TranslationKey; // 👈 string 대신 TranslationKey 타입을 사용합니다.
  buttonText: TranslationKey; // 👈 string 대신 TranslationKey 타입을 사용합니다.
  onButtonClick?: () => void;
}

export const AirHomeSectionHeader = ({
  title,
  buttonText,
  onButtonClick,
}: AirHomeSectionHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className="cw_tit">
      <h3>{t(title)}</h3>
      {buttonText && (
        <button type="button" className="cw_btn_more01" onClick={onButtonClick}>
          <span>{t(buttonText)}</span>
        </button>
      )}
    </div>
  );
};
