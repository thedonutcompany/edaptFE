// components/ScrollTabsWrapper.tsx

"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Profile from "../madeups/profile";
import Portfolio from "../madeups/portfolio";

const ScrollTabsWrapper: React.FC<{
  children: React.ReactNode;
  profileData: any;
  portfolioData: any;
}> = ({ children, profileData, portfolioData }) => {
  const [showTabs, setShowTabs] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scrolling down
        setShowTabs(false);
      } else {
        // Scrolling up
        setShowTabs(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div>
      {children}
      <div className="bg-[#F3F5F9] min-h-screen max-w-screen">
        <div className="p-4">
          <div className="py-4 md:p-4 mt-3 mb-4 w-full">
            <Tabs
              defaultValue="profile"
              className="relative w-full flex justify-center"
            >
              <TabsList
                className={`grid w-[300px] bg-[#07C553] text-white grid-cols-2 fixed bottom-2 m-auto z-10 rounded-full transition-transform duration-300 ${
                  showTabs ? "translate-y-0" : "translate-y-24"
                }`}
              >
                <TabsTrigger value="profile" className="rounded-full">
                  Profile
                </TabsTrigger>
                <TabsTrigger value="portfolio" className="rounded-full">
                  Portfolio
                </TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <Profile data={profileData} isPublic={true} />
              </TabsContent>
              <TabsContent value="portfolio">
                <Portfolio data={portfolioData} isPublic={true} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollTabsWrapper;
