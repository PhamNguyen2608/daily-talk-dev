import React, { memo, ReactNode } from "react";
import { FiHome, FiCompass, FiBookmark, FiBell, FiSettings } from "react-icons/fi";

interface LeftMainProps {
  isSidebarOpen: boolean;
  children: ReactNode;
}

const menuItems = [
  { icon: FiHome, label: "My Feed" },
  { icon: FiCompass, label: "Explore" },
  { icon: FiBookmark, label: "Bookmarks" },
  { icon: FiBell, label: "Notifications" },
  { icon: FiSettings, label: "Settings" },
];

const LeftMain: React.FC<LeftMainProps> = ({ isSidebarOpen, children }) => {
  return (
    <main
      className={`pt-20 px-4 transition-all duration-300 ${
        isSidebarOpen ? "md:ml-72" : "md:ml-20"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto py-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="flex items-center gap-4 px-4 py-3 w-full hover:bg-gray-100 transition-colors"
            >
              <item.icon className="w-6 h-6" />
              <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
        {children}
      </div>
    </main>
  );
};

export default memo(LeftMain);
