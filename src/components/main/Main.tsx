"use client";

import React, { useState, useCallback } from "react";
import MainNavBar from "../main/MainNavBar";
import LeftColumn from "../left/LeftColumn";
import ContentCard from "../ui/ContentCard";
import RightColumn from "../right/RightColumn";

const Main: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavBar onMobileMenuToggle={toggleSidebar} />

      <LeftColumn isOpen={isSidebarOpen} onClose={toggleSidebar}>
        {Array.from({ length: 8 }).map((_, index) => (
          <ContentCard key={index} />
        ))}
      </LeftColumn>

      <div className="fixed top-20 right-4 w-80 transition-all duration-300 hidden xl:block">
        <RightColumn />
      </div>
    </div>
  );
};

export default Main;
