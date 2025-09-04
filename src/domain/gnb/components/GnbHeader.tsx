import { useTranslation } from "react-i18next";
import { userInfo } from "../hooks/useGnb";
import { useDeviceStore } from "@/domain/device/stores/useDeviceStore";
import { decodeToken } from "@/core/auth/utils/jwtDecode";
import { useMemo } from "react";
import type { UserAuthData } from "@/domain/user/types/userInfo.types";
import { useBackNavigation } from "../hooks/navigation/useBackNavigation";

export const GnbHeader = ({}) => {
    const { t } = useTranslation();
    const deviceInfos = useDeviceStore((state) => state.deviceInfos);
    const { data: userInfoData } = userInfo({dvcSeq: deviceInfos[0]?.dvcSeq});
    const onClickBack = useBackNavigation();

    const userData = useMemo(() => {
        const info = userInfoData?.userInfo;
        if (!info) return null;
        try {
            return decodeToken(info) as UserAuthData;
        } catch (error) {
            return null;
        }
    }, [userInfoData?.userInfo]);

    return (
        <div className="cw_header">
            <div className="cw_webcontainer">
                <div className="cw_tit">
                <h1 className="cw_hide">GNB</h1>
                <strong className="cw_user">
                    <span id="userName">{userData?.dataInfo?.mbrNm}</span>
                    {<span>{t('CON.SIR')}</span>}
                </strong>
                <div className="cw_menu">
                    <button type="button" className="cw_btn_myinfo" onClick={() => {}}>
                        <span>{t('TIT.MY_INFORMATION')}</span>
                    </button>
                    <button type="button" className="cw_btn_logout" onClick={() => {}}>
                        <span>{t('BTN.LOGOUT')}</span>
                    </button>
                </div>
                </div>
                <button type="button" className="cw_btn_close" id="gnbBtnClose" onClick={onClickBack}>
                    <span>Close</span>
                </button>
            </div>
        </div>
    );
}