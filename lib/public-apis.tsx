import { publicGateway } from "./api";

export const PublicProfileData = async (email: string) => {
  try {
    const response = await publicGateway.get(`/profile/user/${email}/`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch profile data");
  }
};
export const PublicPortfolioData = async (email: string) => {
  try {
    const response = await publicGateway.get(`/portfolio/user/${email}/`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch profile data");
  }
};
