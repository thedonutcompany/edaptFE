import Profile, { profileDataType } from "@/components/madeups/profile";
import { PublicPortfolioData, PublicProfileData } from "@/lib/public-apis";
import { type Metadata, type ResolvingMetadata } from "next";
import Error from "./error";

import Portfolio, { PortfolioDataType } from "@/components/madeups/portfolio";
import ScrollTabsWrapper from "@/components/ui/ScrollTabsWrapper"; // Import the wrapper

export async function generateMetadata(
  { params }: { params: { email: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const email = decodeURIComponent(params.email);

  const profileData: profileDataType = await PublicProfileData(email);

  const previousImages = (await parent).openGraph?.images ?? [];

  if (!profileData) return {};

  return {
    metadataBase: new URL("https://edapt.netlify.app/"),
    title: profileData.data.name,
    description: profileData.data.email,
    openGraph: {
      images: [profileData.data.image_url, ...previousImages],
    },
    twitter: {
      card: "summary_large_image",
      title: "edapt",
      description: "",
      images: {
        url: profileData.data.image_url,
        alt: "Preview image for ",
        width: 800,
        height: 600,
      },
    },
  };
}

const ProfilePage = async ({ params }: { params: { email: string } }) => {
  const email = decodeURIComponent(params.email);
  let profileData: profileDataType | null = null;
  let portfolioData: PortfolioDataType | null = null;
  let errorCode: number | null = null;

  try {
    profileData = await PublicProfileData(email);
    portfolioData = await PublicPortfolioData(email);
  } catch (error: any) {
    errorCode = error.response ? error.response.status : 500;
  }

  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <ScrollTabsWrapper profileData={profileData} portfolioData={portfolioData}>
      <></>
      {/* <div className="bg-[#F3F5F9] min-h-screen max-w-screen">
        <div className="p-4">
          <div className="py-4 md:p-4 mt-3 mb-4 w-full">
            <Profile data={profileData} isPublic={true} />
            <Portfolio data={portfolioData} isPublic={true} />
          </div>
        </div>
      </div> */}
    </ScrollTabsWrapper>
  );
};

export default ProfilePage;
