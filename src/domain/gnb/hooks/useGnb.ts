import { useQuery } from "@tanstack/react-query";
import type { RequestUserInfo, ResponseUserInfo } from "../types/userInfos.types";
import { queryKeys } from "../constants/queryKey";
import { getNoticeList, getUserInfo } from "../api/gnbApi";
import type { UseQueryCustomOptions } from "@/shared/types/common";
import type { RequestNoticeList, ResponseNoticeList } from "../types/noticeList.types";

export const userInfo = (
    getUserInfoParams: RequestUserInfo, 
    queryOptions?: UseQueryCustomOptions<ResponseUserInfo>
    ) => {

    return useQuery({
        queryKey: [queryKeys.GNB, queryKeys.GET_USER_INFO, getUserInfoParams],
        queryFn: () => getUserInfo(getUserInfoParams),
        ...queryOptions
    });
};

export const noticeList = (
    getNoticeListParams: RequestNoticeList,
    queryOptions?: UseQueryCustomOptions<ResponseNoticeList>
    ) => {
    return useQuery({
        queryKey: [queryKeys.GNB, queryKeys.GET_NOTICE_LIST, getNoticeListParams],
        queryFn: () => getNoticeList(getNoticeListParams),
        ...queryOptions
    });
};