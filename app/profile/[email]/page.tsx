import Profile, { profileDataType } from "@/components/madeups/profile";
import { PublicProfileData } from "@/lib/public-apis";

const ProfilePage = async ({ params }: { params: { email: string } }) => {
  const email = decodeURIComponent(params.email);

  const profileData: profileDataType = await PublicProfileData(email);
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
