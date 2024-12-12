import React, { memo, ReactNode } from "react";
import { FiHome, FiCompass, FiBookmark, FiBell, FiSettings } from "react-icons/fi";

interface LeftMainProps {
  isSidebarOpen: boolean;
  navigation: React.ReactNode;
}

const LeftMain: React.FC<LeftMainProps> = ({ isSidebarOpen, navigation }) => {
  return (
    <div className="h-full">
      {navigation}
    </div>
  );
};

export default memo(LeftMain);
