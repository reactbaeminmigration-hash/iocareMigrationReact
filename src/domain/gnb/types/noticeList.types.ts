export interface RequestNoticeList {
    appKey: string;
    cntryId: string;
    pageNo: number;
    rowsPerPage: number;
};

export interface ResponseNoticeList {
    list: [
        {
            content: string;
            id: number;
            regDate: string;
            regId: string;
            title: string;
        }
    ];
    totalRow: number;
};