import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore"
import { useUserStore } from "../store/useUserStore";
import { useEffect, useState } from "react";
import { fetchAdminInfo, refreshAccessTokenAPI } from "../apis/auth";

export default function ProtectedRoute() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setUser = useUserStore((state)=> state.setUser);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

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
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}
