"use client";
import React, { useEffect, useState } from "react";
import { useUserStore } from "@/lib/store/useUserStore";
import { profileDataType } from "@/components/madeups/profile";
import { ProfileData } from "./dasboard";

const UpdateZustand = () => {
  const { setUserName, setUserImageUrl } = useUserStore();
  const [profileData, setProfileData] = useState<profileDataType | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await ProfileData();
        setProfileData(data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchProfileData();
  }, []); // Empty dependency array to run the effect only once

  useEffect(() => {
    if (profileData) {
      setUserName(profileData.data?.name ?? "");
      setUserImageUrl(profileData.data?.image_url ?? "");
    }
  }, [profileData, setUserName, setUserImageUrl]);

  return null; // This component doesn't render anything
};

export default UpdateZustand;
