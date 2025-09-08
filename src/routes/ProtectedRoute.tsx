import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useUserStore } from '../store/useUserStore';
import { useEffect, useState } from 'react';
import { fetchAdminInfo, refreshAccessTokenAPI } from '../apis/auth';
import { ROLE_PERMISSIONS } from '@/constants/permissions';
import { AdminRole } from '@/types/admins';
import { useToast } from '@/hooks/useToast';

export default function ProtectedRoute() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const { user, setUser } = useUserStore();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { error } = useToast();

  useEffect(() => {
    const initialize = async () => {
      try {
        let token = accessToken;

        if (!token) {
          token = await refreshAccessTokenAPI();
          if (token) {
            setAccessToken(token);
          }
        }

        const user = await fetchAdminInfo();
        setUser(user);
      } catch (error) {
        console.error('🚨 인증 초기화 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  if (loading) return <h1>Loading</h1>;

  const isAuthenticated = !!useAuthStore.getState().accessToken;

  if (!isAuthenticated) {
    return (
      <Navigate
        to='/login'
        replace
        state={{ from: location }}
      />
    );
  }

  // 역할 기반 접근 제어
  if (user) {
    const userRole = user.adminRole as AdminRole;
    const allowedPaths =
      ROLE_PERMISSIONS[userRole] || ROLE_PERMISSIONS.SUPER_ADMIN;

    // 현재 경로가 허용된 경로에 포함되지 않으면 첫 번째 허용된 경로로 리다이렉트
    if (!allowedPaths.includes(location.pathname)) {
      error('접근 권한이 없습니다.');
      return (
        <Navigate
          to={allowedPaths[0]}
          replace
        />
      );
    }
  }

  return <Outlet />;
}
