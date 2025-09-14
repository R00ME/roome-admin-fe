import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useUserStore } from '../store/useUserStore';
import { useEffect, useState } from 'react';
import { fetchAdminInfo, refreshAccessTokenAPI } from '../apis/auth';
import { ROLE_PERMISSIONS } from '@/constants/permissions';
import { AdminRole } from '@/types/admins';
import { useToast } from '@/hooks/useToast';
import SplitText from '@/components/react-bits/SplitText';

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
  }, [accessToken, setAccessToken, setUser]);

  if (loading) {
    return (
      <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-12'>
        {/* 로딩 텍스트 */}
        <div className='text-center space-y-6'>
          <p className='flex flex-col items-center justify-center'>
            <SplitText
              text='RoomE 관리자'
              className='text-4xl font-bold text-gray-800'
              tag='h1'
              delay={100}
              duration={0.4}
              from={{ opacity: 0, y: 30, scale: 0.8 }}
              to={{ opacity: 1, y: 0, scale: 1 }}
            />
            <SplitText
              text='시스템을 초기화하는 중...'
              className='text-xl text-gray-500'
              tag='p'
              delay={200}
              duration={0.4}
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
            />
          </p>
        </div>

        {/* 진행률 표시 */}
        <div className='w-80 bg-gray-200 rounded-full h-3 overflow-hidden'>
          <div className='h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse'></div>
        </div>
      </div>
    );
  }

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
