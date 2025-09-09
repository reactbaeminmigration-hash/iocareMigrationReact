import { useGlobalPopupStore } from '@/shared/stores/globalPopStore';

export const GlobalPopup = () => {
  const { isGlobalPopup, closeGlobalPopup } = useGlobalPopupStore();

  const handleButtonClick = (action: () => void) => {
    action();
  };

  return (
    <div className="cw_popWrap02">
      <div className="cw_popbox">
        <div className="cw_pophead">
          {isGlobalPopup.title && <h1>{isGlobalPopup.title}</h1>}
        </div>
        <div className="cw_popcont">
          {isGlobalPopup.contents && (
            <p dangerouslySetInnerHTML={{ __html: isGlobalPopup.contents }} />
          )}
        </div>
        {isGlobalPopup.btns?.length > 0 && (
          <div className="cw_popbtn">
            {isGlobalPopup.btns.map((item, index) => (
              <button
                key={index}
                type="button"
                className={item.type}
                onClick={() => {
                  handleButtonClick(item.action);
                  closeGlobalPopup();
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
