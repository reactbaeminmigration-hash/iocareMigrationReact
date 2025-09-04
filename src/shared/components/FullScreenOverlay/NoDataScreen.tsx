import { useTranslation } from "react-i18next";

export const NoDataScreen = ({}) => {
    const { t } = useTranslation();

    return (
        <div className="cw_system_error cw_iocare_air cw_fix">
            <p dangerouslySetInnerHTML={{ __html: t("CON.NO_USER_AYTHORITY") }}/>
        </div>
    );
}