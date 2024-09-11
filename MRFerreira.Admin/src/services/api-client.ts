import axios from "axios";
import AuthModel from "../interface/models/auth-token";

const defaultOptions = {
  baseURL: "https://mrferreira-api.vercel.app/api/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

const api = axios.create(defaultOptions);

api.interceptors.request.use((config) => {
  const auth: AuthModel = JSON.parse(sessionStorage.getItem("token") ?? "{}");

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
