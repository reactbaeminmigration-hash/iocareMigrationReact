import { useErrorPopupStore } from '@/shared/stores/useErrorPopupStore';

export const ErrorPopup = () => {
  const { isErrorPopup, closeErrorPopup } = useErrorPopupStore();

  const handleButtonClick = (action: () => void) => {
    action();
  };

  return (
    <div className="cw_popWrap02">
      <div className="cw_popbox">
        <div className="cw_pophead">
          {isErrorPopup.title && <h1>{isErrorPopup.title}</h1>}
        </div>
        <div className="cw_popcont">
          {isErrorPopup.contents && (
            <p dangerouslySetInnerHTML={{ __html: isErrorPopup.contents }} />
          )}
        </div>
        {isErrorPopup.btns?.length > 0 && (
          <div className="cw_popbtn">
            {isErrorPopup.btns.map((item, index) => (
              <button
                key={index}
                type="button"
                className={item.type}
                onClick={() => {
                  handleButtonClick(item.action);
                  closeErrorPopup();
                }}
              >
                <span>{item.text}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
