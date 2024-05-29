import { privateGateway } from "./api";

export const ProfileData = async () => {
  try {
    const response = await privateGateway.get("/profile/");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
    return null; // Return null or an empty object instead of throwing an error
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
    console.log(JSON.stringify(error.response.data.data));

    throw new Error(error);
  }
};
