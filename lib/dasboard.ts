import { privateGateway } from "./api";

export const ProfileData = async () => {
  try {
    const response = await privateGateway.get("/profile/");
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch profile data");
  }
};

export const ProfileUpdate = async (data: any) => {
  try {
    const response = await privateGateway.patch("/profile/", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.data);
  }
};

export const socialsUpdate = async (data: any) => {
  try {
    const response = await privateGateway.patch("/profile/socials/", data);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response);
  }
};
