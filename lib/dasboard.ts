import api from "./api";

export const ProfileData = async () => {
  try {
    const response = await api.get("/profile/");
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to generate OTP");
  }
};
