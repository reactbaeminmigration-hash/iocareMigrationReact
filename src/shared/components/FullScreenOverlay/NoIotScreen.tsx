import { useTranslation } from "react-i18next";

type Props = {
    dvcTypeCd?: string;
};

export const NoIotScreen = ({ dvcTypeCd }: Props) => {
    const { t } = useTranslation();

    switch (dvcTypeCd) {
        case '001': // 정수기
        case '002': // 비데
            return (
                <div className="cw_system_error cw_iot cw_fix">
                    <p dangerouslySetInnerHTML={{ __html: t("WATER.WATER_NOT_IOT") }}/>
                </div>
            );
        case '004': // 청정기
            return (
            <div className="cw_system_error cw_iocare_air cw_fix">
                <p dangerouslySetInnerHTML={{ __html: t("AIR.AIR_NONE_IOT") }}/>
            </div>
            );
        case '008': // 매트리스
            return null;
    }
}
