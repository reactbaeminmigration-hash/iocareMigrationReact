import { useTranslation } from "react-i18next";

export const GnbQuickMenu = () => {
    const { t } = useTranslation();
    return (
        <div className="cw_quick_menu">
            <ul>
                <li>
                <button type="button" className="cw_menu_add" onClick={() => {}}>
                    <span>{t('BTN.GNB.PRODUCT_REGIST')}</span>
                </button>
                </li>
                <li>
                <button type="button" className="cw_menu_manage" onClick={() => {}}>
                    <span>{t('BTN.GNB.REGISTERD_PRODUCT_MG')}</span>
                </button>
                </li>
                <li>
                <button type="button" className="cw_menu_support" onClick={() => {}}>
                    <span>{t('BTN.GNB.CUSTOMER_SUPPORT')}</span>
                </button>
                </li>
            </ul>
        </div>
    );
}