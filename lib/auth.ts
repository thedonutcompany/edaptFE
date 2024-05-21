import Cookies from "js-cookie";
import api from "./api";

export const login = async (email: string) => {
  try {
    const response = await api.post("/authentication/generate-otp/", {
      email,
    });
    console.log(response.data);

    const { token } = response.data;
    Cookies.set("token", token, { expires: 7 });
    return response.data;
  } catch (error) {
    throw new Error("Failed to login");
  }
};

export const logout = () => {
  Cookies.remove("token");
  window.location.href = "/signin";
};
