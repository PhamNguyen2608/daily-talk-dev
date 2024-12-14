"use client";
import React, { FC, useState, useRef, useEffect } from "react";
import MenuItem from "./MenuItem";
import useMenuPosition from "@/hooks/useMenuPosition";
import type { MenuPositionOptions } from '@/hooks/useMenuPosition';
import {
  FiHome,
  FiUser,
  FiGlobe,
  FiMessageSquare,
  FiActivity,
  FiFolder,
  FiCompass,
  FiBookmark,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import MenuGroup from "./MenuGroup";

type MenuProps = {
  isOpen: boolean;
  onClose: () => void;
  isExpanded: boolean;
  noCompact?: boolean;
  withPortal?: boolean;
  bubbleClassName?: string;
} & MenuPositionOptions;

const Menu: FC<MenuProps> = ({
  isOpen,
  onClose,
  isExpanded,
  withPortal = false,
  bubbleClassName,
  ...positionOptions
}) => {
  const [activeItem, setActiveItem] = useState<string>("home");
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  useMenuPosition(isOpen, containerRef, bubbleRef, positionOptions);

  const menuItems = {
    main: [
      { id: "home", label: "Home", icon: FiHome },
      { id: "profile", label: "Profile", icon: FiUser },
    ],
    network: [
      { id: "connections", label: "Connections", icon: FiGlobe },
      { id: "messages", label: "Messages", icon: FiMessageSquare },
    ],
    feeds: [
      { id: "activity", label: "Activity Feed", icon: FiActivity },
      { id: "custom", label: "Custom Feed", icon: FiFolder },
    ],
    discover: [
      { id: "explore", label: "Explore", icon: FiCompass },
      { id: "bookmarks", label: "Bookmarks", icon: FiBookmark },
    ],
  };

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );
  };

  const menuContent = (
    <div
      ref={containerRef}
      className={`w-full h-full flex flex-col bg-sidebar-bg transform transition-all duration-300 ${
        isOpen
          ? "translate-x-0"
          : windowWidth >= 1024
          ? "translate-x-0"
          : "-translate-x-full"
      }`}
    >
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
            alt="User avatar"
            className="w-10 h-10 rounded-full"
          />
          {isExpanded && (
            <div>
              <p className="text-white font-medium">John Doe</p>
              <p className="text-gray-400 text-sm">Admin</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {Object.entries(menuItems).map(([key, items]) => (
          <MenuGroup
            key={key}
            title={key.charAt(0).toUpperCase() + key.slice(1)}
            items={items}
            groupKey={key}
            isExpanded={isExpanded}
            expandedGroups={expandedGroups}
            toggleGroup={toggleGroup}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
        ))}
      </div>

      <div className="border-t border-gray-700 p-4 mt-auto">
        <MenuItem
          label="Settings"
          icon={FiSettings}
          isActive={false}
          onClick={() => console.log("Settings clicked")}
          isExpanded={isExpanded}
        />
        <MenuItem
          label="Logout"
          icon={FiLogOut}
          isActive={false}
          onClick={() => console.log("Logout clicked")}
          isExpanded={isExpanded}
          destructive={true}
        />
      </div>
    </div>
  );

  if (!isOpen && windowWidth < 1024) return null;
  return menuContent;
};

export default Menu;
