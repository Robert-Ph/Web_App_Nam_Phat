import axios from "axios";

const API_URL = "http://localhost:8082";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (
      token &&
      config.url !== "/authen/login" &&
      config.url !== "/authen/refesh"
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
