import { useTranslation } from "react-i18next";

type Props = {
    dvcTypeCd?: string;
};

export const NoInstScreen = ({ dvcTypeCd }: Props) => {
    const { t } = useTranslation();

    switch (dvcTypeCd) {
        case '001': // 정수기
        case '002': // 비데
            return (
                <div className="cw_system_error cw_io cw_fix">
                    <p dangerouslySetInnerHTML={{ __html: t("AQUAMEGA.NO_INSTALL") }} />
                    <div className="cw_c_btn">
                    <button type="button" className="cw_btn01" ><span>{t('CON.WIFI_CONNECTION_GUIDE')}</span></button>
                    </div>
                </div>
            );
        case '004': // 청정기
            return (
                <div className="cw_system_error cw_iocare_air cw_fix">
                    <p dangerouslySetInnerHTML={{ __html: t("AIR.AIR_NO_INSTALL") }}/>
                </div>
            );
        case '008': // 매트리스
            return null;
    }
    
}
