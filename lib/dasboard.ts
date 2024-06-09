import { privateGateway } from "./api";

export const ProfileData = async () => {
  try {
    const response = await privateGateway.get("/profile/");
    // console.log(response.data);
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
    // Extract the error message and include any additional information you need
    const errorMessage =
      error.response?.data?.data || "An error occurred during profile update.";
    throw new Error(JSON.stringify(errorMessage)); // Stringify the error object to get more readable output
  }
};

export const socialsUpdate = async (data: any) => {
  try {
    const response = await privateGateway.patch("/profile/socials/", data);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.data || "An error occurred during profile update.";
    throw new Error(JSON.stringify(errorMessage));
  }
};
export const CurriculumData = async () => {
  try {
    const response = await privateGateway.get("/course/");
    // console.log(response.data);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.data || "An error occurred during profile update.";
    throw new Error(JSON.stringify(errorMessage));
  }
};
export const PortfolioData = async () => {
  try {
    const response = await privateGateway.get("/portfolio/");
    // console.log(response.data);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.data || "An error occurred during profile update.";
    throw new Error(JSON.stringify(errorMessage));
  }
};
export const PortfolioUpdate = async (data: any) => {
  try {
    const response = await privateGateway.patch("/portfolio/", data);
    // console.log(response.data);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.data || "An error occurred during profile update.";
    throw new Error(JSON.stringify(errorMessage));
  }
};
export const PortfolioProjectCreate = async (data: any) => {
  try {
    const response = await privateGateway.post("/portfolio/projects/", data);
    // console.log(response.data);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.data || "An error occurred during profile update.";
    throw new Error(JSON.stringify(errorMessage));
  }
};
export const ProjectUpdate = async (
  projectId: string | null | undefined,
  data: any
) => {
  try {
    const response = await privateGateway.patch(
      `/portfolio/projects/${projectId}/`,
      data
    );
    // console.log(response.data);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.data || "An error occurred during profile update.";
    throw new Error(JSON.stringify(errorMessage));
  }
};
export const ProjectDelete = async (projectId: string | null | undefined) => {
  try {
    const response = await privateGateway.delete(
      `/portfolio/projects/${projectId}/`
    );
    // console.log(response.data);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.data || "An error occurred during profile update.";
    throw new Error(JSON.stringify(errorMessage));
  }
};
