import { useAuthStore } from "../store/useAuthStore";
import axiosInstance from "./axiosInstance";

export const loginAPI = async (email:string, password:string) => {
  try{
    const response = await axiosInstance.post(`auth/login`, {
      email, password
    },{
      withCredentials: true,
    })

    const authHeader = response.headers['authorization'];
    const accessToken = authHeader?.split(' ')[1];

    if(!accessToken) {throw new Error('🚨 Access token이 응답에 없습니다.')}
    
    useAuthStore.getState().setAccessToken(accessToken)
    return accessToken;
  } catch (error) {
    console.error('🚨 로그인 실패:', error);
    throw error;
  }
}

export const logoutAPI = async () => {
  try{
    await axiosInstance.post(`auth/logout`);
    useAuthStore.getState().clearAccessToken?.();

    window.location.href = '/login'

  } catch (error) {
    console.error('🚨 로그아웃 실패:', error);
    throw error;
  }
}

export const refreshAccessTokenAPI = async () => {
  try{
    const response = await axiosInstance.post(`/refresh`);
    
    const accessToken =
      response.headers['authorization'] || response.headers['Authorization'];

    if (!accessToken) {
      throw new Error('🚨 재발급된 Access Token이 응답 헤더에 없습니다.');
    }

    const token = accessToken.split(' ')[1];

    useAuthStore.getState().setAccessToken(token);

    return token;
  } catch(error){
    console.error('🚨 Access Token 재발급 실패:', error);
    throw error;
  }
}

export const initStatus = () => {

  useAuthStore.getState().clearAccessToken?.();

};