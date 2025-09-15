interface AirHomeSectionHeaderProps {
  title: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const AirHomeSectionHeader = ({
  title,
  buttonText,
  onButtonClick,
}: AirHomeSectionHeaderProps) => {
  return (
    <div className="cw_tit">
      <h3>{title}</h3>
      {buttonText && (
        <button type="button" className="cw_btn_more01" onClick={onButtonClick}>
          <span>{buttonText}</span>
        </button>
      )}
    </div>
  );
};
