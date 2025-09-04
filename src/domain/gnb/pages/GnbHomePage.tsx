import { GnbFooter } from "../components/GnbFooter";
import { GnbHeader } from "../components/GnbHeader";
import { GnbMenuList } from "../components/GnbMenuList";
import { GnbQuickMenu } from "../components/GnbQuickMeun";

export const GnbHomePage = () => {
  return (
    <div className="cw_GNBWrap01">
      <GnbHeader />
      <div className="cw_contentsWrap">
        <div className="cw_webcontainer">
          <div className="cw_menuWrap">
            <GnbQuickMenu />
            <GnbMenuList 
              onClickNavigateMenu={() => {}}
            />
          </div>
          <GnbFooter/>
        </div>
      </div>
    </div>
  );
};
