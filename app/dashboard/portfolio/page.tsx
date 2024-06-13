"use client";
import Portfolio from "@/components/madeups/portfolio";
import { PortfolioData } from "@/lib/dasboard";
import React, { useEffect, useState } from "react";

type Props = {};

const Pages = (props: Props) => {
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await PortfolioData();
        setPortfolioData(data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchProfileData();
  }, []); // Empty dependency array to run the effect only once

  if (!portfolioData) {
    return <div>Loading...</div>;
  }
  return <Portfolio data={portfolioData} />;
};

export default Pages;
