"use client";
import React, { useEffect, useState } from "react";
import Profile from "@/components/madeups/profile";
import { ProfileData } from "@/lib/dasboard";

const Pages = () => {
  const [profileData, setProfileData] = useState(null);

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

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Profile data={profileData} isPublic={false} />
    </div>
  );
};

export default Pages;
