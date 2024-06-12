import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import Cookies from "js-cookie";

export const publicGateway = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Use environment variables for the API base URL
  headers: {
    "Content-Type": "multipart/form-data",
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

privateGateway.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response.status === 401) {
      try {
        const response = await publicGateway.post(
          "/authentication/refresh-token/",
          {
            refresh_token: Cookies.get("refresh_token"), //fetchLocalStorage<AllTokens["refreshToken"]>("refreshToken")
          }
        );
        console.log(response.data.data.access_token);

        Cookies.set("access_token", response.data.data.access_token);
        //console.log('new access token',response.data.response.accessToken)
        // Retry the original request
        const { config } = error;
        config.headers["Authorization"] = `Bearer ${Cookies.get(
          "access_token"
        )}`;
        return await new Promise((resolve, reject) => {
          privateGateway
            .request(config)
            .then((response_1) => {
              resolve(response_1);
            })
            .catch((error_1) => {
              //console.log("error_1",error_1)
              reject(error_1);
            });
        });
      } catch (error_2) {
        // toast.error("Your session has expired. Please login again.");
        toast({
          variant: "destructive",
          title: "Token Expired",
          description: "Redirecting to login page",
        });
        // Wait for 3 seconds
        setTimeout(() => {
          new Promise((resolve) => {
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
            resolve("done");
          })
            .then(() => {
              window.location.href = "/signin";
            })
            .catch((err) => {
              console.log(err);
            });
        }, 3000);
        return await Promise.reject(error_2);
      }
    }
    return Promise.reject(error);
  }
);
