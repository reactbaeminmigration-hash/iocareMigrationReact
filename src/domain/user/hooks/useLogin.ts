import useGetDeviceInfos from '@/domain/device/hooks/queries/useGetDeviceInfos';
import { decodeToken } from '@/shared/utils/jwtDecode';
import type { JwtPayload } from 'jwt-decode';
import { useEffect, useState } from 'react';
import type { AuthMessageData } from '../types/auth.types';
import type { UserDataInfo } from '../types/userInfo.types';
import useAuth from './queries/useAuth';
import useGetAppSetting from './queries/useGetAppSetting';

// 타입 가드 함수
function isAuthMessageData(data: any): data is AuthMessageData {
  return (
    typeof data === 'object' &&
    data !== null &&
    ('code' in data || 'error' in data || 'session_state' in data)
  );
}

export function useLogin() {
  const { getTokenMutation, loginMutation } = useAuth();
  const [userInfo, setUserInfo] = useState<UserDataInfo | null>(null); // loginData.userInfo를 저장할 상태

  // AppSetting 조회
  const {
    data: ResponseAppSetting,
    isPending: isAppSettingPending,
    isError: isAppSettingError,
  } = useGetAppSetting({ mbrSeq: userInfo?.seqNum! }, { enabled: !!userInfo });

  useEffect(() => {
    if (!isAppSettingPending && ResponseAppSetting) {
      console.log('ResponseAppSetting 패칭 완료:', ResponseAppSetting);
    }
    if (isAppSettingError) {
      console.error('ResponseAppSetting 패칭 오류:', isAppSettingError);
    }
  }, [ResponseAppSetting, isAppSettingPending, isAppSettingError]);

  // DeviceInfos 조회
  const {
    data: ResponseDeviceInfos,
    isPending: isDeviceInfosPending,
    isError: isDeviceInfosError,
  } = useGetDeviceInfos(
    { pageIndex: '0', pageSize: '100' },
    { enabled: !!userInfo },
  );

  useEffect(() => {
    if (!isDeviceInfosPending && ResponseDeviceInfos) {
      console.log('ResponseDeviceInfos 패칭 완료:', ResponseDeviceInfos);
    }
    if (isDeviceInfosError) {
      console.error('ResponseDeviceInfos 패칭 오류:', isDeviceInfosError);
    }
  }, [ResponseDeviceInfos, isDeviceInfosPending, isDeviceInfosError]);

  // login 버튼 클릭
  const handleLogin = () => {
    const authURL =
      import.meta.env.VITE_API_IDP_URL +
      import.meta.env.VITE_API_INTEGRATED_MEMBER_URL;

    window.onmessage = async (event: MessageEvent) => {
      if (isAuthMessageData(event.data)) {
        const { code } = event.data;
        if (code) {
          try {
            const getTokenData = await getTokenMutation.mutateAsync({
              authCode: code,
              redirectUrl: import.meta.env.VITE_DEV_REDIRECT_URL,
            });
            console.log('토큰 가져오기 성공:', getTokenData);
            const loginData = await loginMutation.mutateAsync({
              authCode: code,
              devDstTimezn: 0,
              devDtTimezn: 0,
              timeZone: '',
              deviceUUID: '',
              isMobile: '',
              langCd: '',
              osType: 0,
              osVersion: '',
              pushToken: '',
              redirectUrl: import.meta.env.VITE_DEV_REDIRECT_URL,
              serviceCode: '',
              appVersion: '',
            });
            const decodedPayload: JwtPayload = decodeToken(loginData.userInfo);
            const userDataInfo: UserDataInfo = decodedPayload as UserDataInfo;
            console.log(JSON.stringify(userDataInfo));
            console.log('로그인 정보 가져오기 성공:', loginData);
            setUserInfo(userDataInfo);
          } catch (error: any) {
            alert(`로그인 실패: ${error.message || '알 수 없는 오류'}`);
          }
        }
      }
    };

    const url =
      `${authURL}?auth_type=0` +
      `&response_type=code` +
      `&client_id=${import.meta.env.VITE_CLIENT_ID}` +
      `&ui_locales=ko-KR` +
      `&dvc_cntry_id=KR` +
      `&redirect_uri=${import.meta.env.VITE_DEV_REDIRECT_URL}`;

    window.open(url);
  };

  return { handleLogin };
}
