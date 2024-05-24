import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Use environment variables for the API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Handle token expiry or unauthorized access
      Cookies.remove("token");
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default api;
