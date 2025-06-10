import axios from "axios";
import AuthModel from "../interface/models/auth-model";

const defaultOptions = {
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

const api = axios.create(defaultOptions);

api.interceptors.request.use((config) => {
  const auth: AuthModel = JSON.parse(sessionStorage.getItem("auth") ?? "{}");

  config.headers.Authorization = `Bearer ${auth.token}`;

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);

export default api;
