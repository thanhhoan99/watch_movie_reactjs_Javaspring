/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

// Tạo axios instance với interceptor tự động gắn token
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default axiosInstance;

// Các API liên quan đến Application
export const getApps = (page = 0, size = 5) =>
  axiosInstance.get(`/api/apps?page=${page}&size=${size}`);

export const createApp = (data: any) =>
  axiosInstance.post(`/api/apps`, data);

export const updateApp = (id: number, data: any) =>
  axiosInstance.patch(`/api/apps/${id}`, data);

export const deleteApp = (id: number) =>
  axiosInstance.delete(`/api/apps/${id}`);
