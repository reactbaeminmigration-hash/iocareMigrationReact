import { decodeToken } from '@/core/auth/utils/jwtDecode';
import { routerPath } from '@/router/routerPath';
import { useSpiner } from '@/shared/hooks/useSpiner';
import { isResponseError } from '@/shared/utils/error.utils';
import { getLocalStorage } from '@/shared/utils/localStorege';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginActions } from '../components/LoginActions';
import { LoginHeader } from '../components/LoginHeader';
import { LoginSwiper } from '../components/LoginSwiper';
import { useUserStore } from '../stores/useUserStore';

export const LoginPage = () => {
  const { isInitialDataLoaded, error, setError } = useUserStore();
  const { hideSpiner } = useSpiner();
  const navigate = useNavigate();
  // 초기 데이터 로딩이 완료되면, 스피너를 숨기고 메인 페이지로 이동시킵니다.
  useEffect(() => {
    if (isInitialDataLoaded) {
      hideSpiner();
      navigate(routerPath.water);
    }
  }, [isInitialDataLoaded]);

  useEffect(() => {
    if (error) {
      hideSpiner();
      if (isResponseError(error)) {
        alert(error.response?.data.message);
      } else {
        alert(error.message || '알 수 없는 오류가 발생했습니다.');
      }
      setError(null);
    }
  }, [error, setError]);

  // 유효한 토큰이 있으면 자동로그인 진행
  useEffect(() => {
    let accessToken = getLocalStorage<string>('accessToken');
    let claims = decodeToken(accessToken!);
    claims.remember_me;
  }, []);
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
