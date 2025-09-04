import axiosInstance from "@/core/api/axios";
import type { ApiResponse } from "@/shared/types/common";
import buildGenericQueryString from "@/shared/utils/queryString";
import type { RequestUserInfo, ResponseUserInfo } from "../types/userInfos.types";
import type { RequestNoticeList, ResponseNoticeList } from "../types/noticeList.types";

const getUserInfo = async  (params: RequestUserInfo): Promise<ResponseUserInfo> => {
    const { data } = await axiosInstance.get<ApiResponse<ResponseUserInfo>>(
        `/v1/com/user-device?${buildGenericQueryString(params)}`,
    );
    
    return data.data;
};

const getNoticeList = async (params: RequestNoticeList): Promise<ResponseNoticeList> => {
    const { data } = await axiosInstance.get<ApiResponse<ResponseNoticeList>>(
        `/v1/com/notices?${buildGenericQueryString(params)}`,
    );
    
    return data.data;
}

export { getUserInfo, getNoticeList };