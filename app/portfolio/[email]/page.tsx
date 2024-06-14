import Profile, { profileDataType } from "@/components/madeups/profile";
import { PublicProfileData } from "@/lib/public-apis";
import { type Metadata, type ResolvingMetadata } from "next";
import Error from "./error";

export async function generateMetadata(
  { params }: { params: { email: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const email = decodeURIComponent(params.email);

  const profileData: profileDataType = await PublicProfileData(email);

  // const id = params.id;
  // const event = await getEventData(id);
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
  let errorCode: number | null = null;

  try {
    profileData = await PublicProfileData(email);
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
    <div className="bg-[#F3F5F9] min-h-screen">
      <div className="p-4">
        <div className="px-1 py-4 md:p-4  mt-14">
          {" "}
          <Profile data={profileData} isPublic={true} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
