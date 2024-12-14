import React, { memo, ReactNode } from "react";

interface LeftMainProps {
  isSidebarOpen: boolean;
  navigation: React.ReactNode;
}

const LeftMain: React.FC<LeftMainProps> = ({ navigation }) => {
  return (
    <div className="h-full">
      {navigation}
    </div>
  );
};

export default memo(LeftMain);
