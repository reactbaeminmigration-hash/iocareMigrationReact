import { useTranslation } from "react-i18next";

export const NoNetStatusScreen = ({}) => {
    const { t } = useTranslation();

    return (
        <div className="cw_system_error cw_wifi_guide">
            <div className="cw_guide_cont">
                <h1 className="cw_tit">{t("CON.CONNECT_TITLE")}</h1>
                <h2 className="cw_stit">{t("CON.CONNECT_STITLE")}</h2>

                <ol>
                <li>{t("CON.LIST_ONE")}</li>
                <li dangerouslySetInnerHTML={{ __html: t("CON.LIST_TWO") }} />
                <li>{t("CON.LIST_THREE")}</li>
                </ol>

                <p className="cw_txt">
                {t("CON.CONNECT_TXT1")}{" "}
                <em onClick={() => {}}>{t("CON.CONNECT_TXT2")}</em>{" "}
                {t("CON.CONNECT_TXT3")} {t("CON.CONNECT_TXT4")}
                </p>
            </div>
        </div>
    );
}
