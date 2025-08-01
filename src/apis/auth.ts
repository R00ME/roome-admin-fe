import { useAuthStore } from '../store/useAuthStore';
import { useUserStore } from '../store/useUserStore';
import axiosInstance from './axiosInstance';

const API_URL = 'api';

export const loginAPI = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post(`/${API_URL}/admin/auth/login`, {
      email,
      password,
    });

    const authHeader = response.headers['authorization'];
    const accessToken = authHeader?.split(' ')[1];
    if (!accessToken) {
      throw new Error('🚨 Access token이 응답에 없습니다.');
    }

    useAuthStore.getState().setAccessToken(accessToken);
    const user = await fetchAdminInfo();
    useUserStore.getState().setUser(user);

    return accessToken;
  } catch (error) {
    console.error('🚨 로그인 실패:', error);
    throw error;
  }
};

export const logoutAPI = async () => {
  try {
    await axiosInstance.post(`/${API_URL}/admin/auth/logout`);
    useAuthStore.getState().clearAccessToken?.();
    useUserStore.getState().clearUser?.();

    window.location.href = '/login';
  } catch (error) {
    console.error('🚨 로그아웃 실패:', error);
    throw error;
  }
};

export const refreshAccessTokenAPI = async () => {
  try {
    const response = await axiosInstance.post(`/${API_URL}/admin/refresh`);

    const accessToken =
      response.headers['authorization'] || response.headers['Authorization'];

    if (!accessToken) {
      throw new Error('🚨 재발급된 Access Token이 응답 헤더에 없습니다.');
    }

    const token = accessToken.split(' ')[1];
    useAuthStore.getState().setAccessToken(token);

    return token;
  } catch (error) {
    console.error('🚨 Access Token 재발급 실패:', error);
    throw error;
  }
};

export const resetTempPasswordAPI = async (
  confirmEmail: string,
  confrimName: string,
) => {
  try {
    const response = await axiosInstance.post(
      `/${API_URL}/admin/auth/password/reset`,
      {
        confirmEmail,
        confrimName,
      },
    );

    const message = response.data?.message;
    return message;
  } catch (error) {
    console.error('🚨 임시 비밀번호 발급 실패:', error);
    throw error;
  }
};

export const changePasswordAPI = async (beforePassword:string, newPassword:string, confirmPassword:string) => {
  try{
    const response = await axiosInstance.put(`/${API_URL}/admin/info/password`, {
      beforePassword,
      newPassword,
      confirmPassword
    });

    const message = response.data
    return message;
  } catch (error) {
    console.error('🚨 비밀번호 변경 실패:', error);
    throw error;
  }
}

export const initStatus = () => {
  useAuthStore.getState().clearAccessToken?.();
  useUserStore.getState().clearUser?.();
};
export const fetchAdminInfo = async () => {
  const response = await axiosInstance.get(`/${API_URL}/admin/info`);
  return response.data.data;
};

export const EditAdminInfo = async (username?:string, phoneNumber?:string) => {
  const response = await axiosInstance.patch(`/${API_URL}/admin/info`, {
    username,
    phoneNumber,
  });
  return response.data.data;
};
