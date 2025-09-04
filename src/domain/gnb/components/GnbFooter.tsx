import { useTranslation } from "react-i18next";

export const GnbFooter = () => {
    const { t } = useTranslation();

    const onCilckTerms = (type: string) => {
        let url = '';
        // type : terms, privacy
        switch (type) {
            case 'terms':
                url = `${import.meta.env.VITE_API_IDP_URL}/policy/service-iocare?countryCd=KR`;
                break;
            case 'privacy':
                url = `${import.meta.env.VITE_API_IDP_URL}/policy/privacy-iocare?countryCd=KR`;
                break;
            case 'business':
                url = 'http://www.ftc.go.kr/bizCommPop.do?wrkr_no=3078106054';
                break;
        }

        window.open(url, '_blank');
    };

    return (
        <div className="cw_footer">
        <div className="cw_webcontainer">
            <h1 className="cw_logo">coway</h1>
            <ul className="cw_footer_menu">
            <li onClick={() => {onCilckTerms('terms')}}><a><span>{t('FOOTER.TERMS')}</span></a></li>
            <li className="cw_bold" onClick={() => {onCilckTerms('privacy')}}><a><span>{t('FOOTER.PRIVACY')}</span></a></li>
            </ul>
            <p>{t('FOOTER.HEAD')} : {t('FOOTER.ADDRESS')}</p>
            <p>{t('FOOTER.CEO')} : {t('FOOTER.CEO_NAME')} &nbsp; {t('ORDER.COMPANY_NUM')} : 307-81-06054</p>
            <p>
            {t('FOOTER.E_COM_NO')} : {t('FOOTER.E_COM_NO_NUM')} { (
                <a onClick={() => {onCilckTerms('business')}}><span>{t('FOOTER.BUSINESS_INFO')}</span></a>
            )}
            </p>
            <p className="cw_copy">©COWAY CO.,LTD. ALL RIGHTS RESERVED.</p>
        </div>
        </div>
    );
}