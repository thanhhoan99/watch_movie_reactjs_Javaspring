/* eslint-disable @typescript-eslint/no-explicit-any */
// src/api/applicationApi.ts
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/apps"; // sửa nếu port khác

export const getApps = (page = 0, size = 5) =>
  axios.get(`${BASE_URL}?page=${page}&size=${size}`);

export const createApp = (data: any) =>
  axios.post(BASE_URL, data);

export const updateApp = (id: number, data: any) =>
  axios.patch(`${BASE_URL}/${id}`, data);

export const deleteApp = (id: number) =>
  axios.delete(`${BASE_URL}/${id}`);
