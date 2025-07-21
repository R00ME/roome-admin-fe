import axios from "axios";
import { Cookies } from 'react-cookie';
import { useAuthStore } from "../store/useAuthStore";
import { initStatus, refreshAccessTokenAPI } from "./auth";

const cookies = new Cookies()

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers:{
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    throw error;
  }
)

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async(error) => {
    const originalRequest = error.config;

    if(error.response?.status === 401 && !originalRequest._retry){
      originalRequest._retry = true;

      const refreshToken = cookies.get('refreshToken');

      if(!refreshToken){
        console.error('🚨 Refresh Token이 없습니다. 다시 로그인하세요.');
        initStatus();
        window.location.href = '/login';
        throw error;
      }
      try{
        const response = await refreshAccessTokenAPI();
        const newAccessToken = response.accessToken;

        useAuthStore.getState().setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
        return axiosInstance(originalRequest);
      }catch(error){
        console.error('🚨 Refresh Token이 만료되었습니다. 다시 로그인하세요.');
        initStatus();
        window.location.href = '/login';
        throw error;
      }
    } else {
      throw error;
    }
  }
)

export default axiosInstance