"use client";
import React, { useEffect, useState } from "react";
import { PortfolioData } from "@/lib/dasboard";
import EditProjects from "@/components/madeups/modules/portfolio/edit-projects";
import { PortfolioDataType } from "@/components/madeups/portfolio";

const Pages = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioDataType>();

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const data = await PortfolioData();
        setPortfolioData(data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchPortfolioData();
  }, []); // Empty dependency array to run the effect only once

  if (!portfolioData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <EditProjects data={portfolioData.data.projects} />
    </div>
  );
};

export default Pages;
