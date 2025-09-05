import { Trans } from 'react-i18next';

export const AirHomeComponent = () => {
  const onClickHandlerAirGrapDetil = () => {};

  return (
    <div className="cw_contbox02">
      <div className="cw_tit">
        <h3>
          <Trans i18nKey={'AIR.AIR_QUALITY'}></Trans>
        </h3>
        <button
          type="button"
          className="cw_btn_more01"
          onClick={onClickHandlerAirGrapDetil}
        >
          <span>
            <Trans i18nKey={'AIR.AIR_MORE_SEE'}></Trans>
          </span>
        </button>
      </div>
    </div>
  );
};
