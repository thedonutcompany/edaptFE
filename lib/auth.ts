import Cookies from "js-cookie";
import { publicGateway } from "./api";

export const sendOtp = async (email: string) => {
  try {
    const response = await publicGateway.post("/authentication/generate-otp/", {
      email,
    });
    // console.log(response.data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const verifyOtp = async (email: string, otp: string) => {
  try {
    const response = await publicGateway.post("/authentication/verify-otp/", {
      email,
      otp,
    });
    // console.log(response.data.data);
    const { access_token, refresh_token } = response.data.data;
    Cookies.set("access_token", access_token, { expires: 7 });
    Cookies.set("refresh_token", refresh_token, { expires: 7 });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const logout = () => {
  Cookies.remove("access_token");
  window.location.href = "/signin";
};
