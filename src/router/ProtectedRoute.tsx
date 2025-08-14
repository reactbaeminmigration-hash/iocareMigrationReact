import { useUserStore } from '@/domain/user/stores/useUserStore';
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
  const { isAuthenticated, isInitialDataLoaded } = useUserStore();

  // 1. 인증되지 않았다면 로그인 페이지로 리다이렉트
  if (!isAuthenticated) {
    // replace 옵션은 뒤로가기 시 로그인 페이지로 다시 돌아오지 않게 합니다.
    return <Navigate to="/login" replace />;
  }

  // 2. 인증은 되었지만 초기 데이터 로딩 중이라면 로딩 스피너 등을 보여줍니다.
  if (!isInitialDataLoaded) {
    return <div>초기 데이터 로딩 중...</div>; // 또는 로딩 스피너 컴포넌트
  }

  // 3. 모든 조건이 충족되면 자식 라우트 또는 Outlet을 렌더링합니다.
  //    Outlet은 중첩 라우트에서 자식 컴포넌트를 렌더링할 때 사용합니다.
  return <Outlet />;
}
