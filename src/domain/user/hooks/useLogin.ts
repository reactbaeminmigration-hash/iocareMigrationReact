import { decodeToken } from '@/core/auth/utils/jwtDecode';
import { setHeader } from '@/shared/utils/header';
import type { JwtPayload } from 'jwt-decode';
import { useUserStore } from '../stores/useUserStore';
import type { AuthMessageData } from '../types/auth.types';
import type { UserDataInfo } from '../types/userInfo.types';
import useAuth from './queries/useAuth';

// 타입 가드 함수
function isAuthMessageData(data: any): data is AuthMessageData {
  return (
    typeof data === 'object' &&
    data !== null &&
    ('code' in data || 'error' in data || 'session_state' in data)
  );
}
// login 진행
export function useLogin() {
  const { getTokenMutation, loginMutation } = useAuth();
  // const { setDeviceInfos } = useDeviceStore();
  const { accessToken, refreshToken, setAuthTokens, setUserInfo } =
    useUserStore();

  // 인증 진행 후 토큰 발급 최종 사용자 정보로 로그인
  const login = async (code: string | null) => {
    if (code) {
      const getTokenData = await getTokenMutation.mutateAsync({
        // authCode: code,
        authCode: '',
        redirectUrl: import.meta.env.VITE_DEV_REDIRECT_URL,
      });
      console.log('토큰 가져오기 성공:', getTokenData);
      setAuthTokens({
        accessToken: getTokenData.accessToken,
        refreshToken: getTokenData.refreshToken,
      });
    } else {
      setHeader('accessToken', `${accessToken}`);
      setHeader('refreshToken', `${refreshToken}`);
    }

    const loginData = await loginMutation.mutateAsync({
      authCode: code ?? '',
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
  };

  // 통합회원 인증후 로그인 진행
  const handleLogin = () => {
    const authURL =
      import.meta.env.VITE_API_IDP_URL +
      import.meta.env.VITE_API_INTEGRATED_MEMBER_URL;

    window.onmessage = async (event: MessageEvent) => {
      if (isAuthMessageData(event.data)) {
        const { code } = event.data;
        if (code) {
          login(code);
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

  return { handleLogin, login };
}
