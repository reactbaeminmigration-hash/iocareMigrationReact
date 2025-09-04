import { useTranslation } from "react-i18next";
import { noticeList } from "../hooks/useGnb";
import type { ResponseNoticeList } from "../types/noticeList.types";
import { useEffect, useState } from "react";
import type { GnbMenuListProps } from "../types/gnbMenuProps.types";

function isRecent(dateStr: string) {
    // "2025.08.29" -> "2025-08-29"
    const d = new Date(dateStr.replace(/\./g, "-"));
    const now = new Date();
    const diffDays = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);

    return diffDays >= 0 && diffDays < 2;
}

function checkNewNoti(noticeRes: ResponseNoticeList | undefined) {
    const list = noticeRes?.list ?? [];
    const first = list[0];

    return !!(first?.regDate && isRecent(first.regDate));
}

export const GnbMenuList = ({ onClickNavigateMenu }: GnbMenuListProps) => {
    const { t } = useTranslation();

    const [isNewNoti, setIsNewNoti] = useState(false);
    const { data: noticeRes } = noticeList({appKey: 'COIOANP0', cntryId: 'KR', pageNo: 1, rowsPerPage: 1});

    useEffect(() => {
        setIsNewNoti(checkNewNoti(noticeRes));
    }, [noticeRes]);

    return (
    <div className="cw_menu_list">
        <ul>
            <li>
            <button className="cw_menu_home" onClick={() => onClickNavigateMenu('home')}>
                <span>{t('BTN.HOME')}</span>
            </button>
            </li>
            <li>
            <button className="cw_menu_exp" onClick={() => onClickNavigateMenu('experience')}>
                <span>{t('BTN.EXPERIENCE')}</span>
            </button>
            </li>
            <li>
            <button className="cw_menu_setting" onClick={() => onClickNavigateMenu('setting')}>
                <span>{t('TIT.SETTING')}</span>
            </button>
            </li>
            <li>
            <button className="cw_menu_ext" onClick={() => onClickNavigateMenu('extend')}>
                <span>{t('TIT.AI_SERVICE')}</span>
            </button>
            </li>
            <li>
            <button className="cw_menu_notice" onClick={() => onClickNavigateMenu('notice')}>
                <span>{t('TIT.NOTICE')}</span>
                <em className={`cw_new ${!isNewNoti ? 'cw_none' : ''}`}>NEW</em>
            </button>
            </li>
        </ul>
    </div>
    );
}