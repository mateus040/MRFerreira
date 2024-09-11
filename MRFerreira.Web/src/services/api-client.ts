import axios from "axios";

const defaultOptions = {
  baseURL: "https://mrferreira-api.vercel.app/api/api",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

const api = axios.create(defaultOptions);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);

export default api;
