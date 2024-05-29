import axios from "axios";
import Cookies from "js-cookie";

export const publicGateway = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Use environment variables for the API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateGateway = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Use environment variables for the API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

privateGateway.interceptors.request.use(
  (config) => {
    const access_token = Cookies.get("access_token");
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

privateGateway.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Handle token expiry or unauthorized access
      console.log("Token expired or unauthorized access");
      // Cookies.remove("token");
      // window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);
