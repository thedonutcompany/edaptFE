import Cookies from "js-cookie";
import api from "./api";

export const sendOtp = async (email: string) => {
  try {
    const response = await api.post("/authentication/generate-otp/", {
      email,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to generate OTP");
  }
};

export const verifyOtp = async (email: string, otp: string) => {
  try {
    const response = await api.post("/authentication/verify-otp/", {
      email,
      otp,
    });
    console.log(response.data.data);

    const { token } = response.data.data;
    Cookies.set("token", token, { expires: 7 });
    return response.data;
  } catch (error) {
    throw new Error("Failed to verify OTP");
  }
};

export const logout = () => {
  Cookies.remove("token");
  window.location.href = "/signin";
};
