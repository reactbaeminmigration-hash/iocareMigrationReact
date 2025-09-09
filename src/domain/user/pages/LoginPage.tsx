import { decodeToken } from '@/core/auth/utils/jwtDecode';
import { useGetDeviceType } from '@/domain/device/hooks/useGetDeviceType';
import { useDeviceStore } from '@/domain/device/stores/useDeviceStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginActions } from '../components/LoginActions';
import { LoginHeader } from '../components/LoginHeader';
import { LoginSwiper } from '../components/LoginSwiper';
import { useUserStore } from '../stores/useUserStore';

export const LoginPage = () => {
  const { accessToken, isInitialDataLoaded } = useUserStore();
  const navigate = useNavigate();
  const { getDvcTypeRoute } = useGetDeviceType();
  const route = useDeviceStore(
    (state) => state.lastSelectedDeviceInfos?.dvcTypeCd,
  );
  // 초기 데이터 로딩이 완료되면, 스피너를 숨기고 메인 페이지로 이동시킵니다.
  useEffect(() => {
    if (isInitialDataLoaded) {
      navigate('/' + getDvcTypeRoute(route));
    }
  }, [isInitialDataLoaded, navigate]);

  // 유효한 토큰이 있으면 자동로그인 진행
  useEffect(() => {
    if (accessToken) {
      let claims = decodeToken(accessToken!);
      claims.remember_me;
    }
  }, [accessToken]);

  return (
    <div className="cw_loginWrap Tut cw_introBG">
      <div className="cw_introbox">
        <div className="cw_webcontainer">
          <LoginHeader />
          <LoginSwiper />
          <LoginActions />
        </div>
      </div>
    </div>
  );
};
