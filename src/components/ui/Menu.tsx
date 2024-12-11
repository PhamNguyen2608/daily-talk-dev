"use client";
import React, { FC, useState, useRef } from "react";
import Portal from "./Portal";
import MenuItem from "./MenuItem";
import useMenuPosition from "@/hooks/useMenuPosition";
import type { MenuPositionOptions } from '@/hooks/useMenuPosition';
import {
  FiChevronLeft,
  FiChevronRight,
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
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import DynamicPortal from "./DynamicPortal";

type MenuProps = {
  isOpen: boolean;
  onClose: () => void;
  noCompact?: boolean;
  withPortal?: boolean;
  bubbleClassName?: string;
} & MenuPositionOptions;

interface MenuGroupProps {
  title: string;
  items: { id: string; label: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }[];
  groupKey: string;
}

const Menu: FC<MenuProps> = ({
  isOpen,
  onClose,
  withPortal = false,
  noCompact,
  bubbleClassName,
  ...positionOptions
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [activeItem, setActiveItem] = useState<string>("home");
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  // Apply positioning using the custom hook
  useMenuPosition(isOpen, containerRef, bubbleRef, positionOptions );

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

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group]
    );
  };

  const MenuGroup: FC<MenuGroupProps> = ({ title, items, groupKey }) => {
    const isGroupExpanded = expandedGroups.includes(groupKey);

    return (
      <div className="mb-4">
        {isExpanded && (
          <div
            className="flex items-center justify-between px-4 py-2 text-gray-400 cursor-pointer hover:text-gray-200"
            onClick={() => toggleGroup(groupKey)}
          >
            <span className="text-sm font-semibold uppercase">{title}</span>
            {isGroupExpanded ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
          </div>
        )}
        <div className={`${!isGroupExpanded && isExpanded ? "hidden" : "block"}`}>
          {items.map((item) => (
            <MenuItem
              key={item.id}
              label={item.label}
              icon={item.icon}
              isActive={activeItem === item.id}
              onClick={() => setActiveItem(item.id)}
              isExpanded={isExpanded}
            />
          ))}
        </div>
      </div>
    );
  };

  const menuContent = (
    <div
      ref={containerRef}
      className={`h-screen bg-gray-800 transition-all duration-300 ${
        isExpanded ? "w-64" : "w-20"
      } relative ${noCompact ? "" : "compact-mode"}`}
    >
      <button
        className="absolute -right-3 top-10 bg-indigo-600 text-white p-1 rounded-full shadow-lg"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        {isExpanded ? <FiChevronLeft /> : <FiChevronRight />}
      </button>

      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User avatar"
                className="w-10 h-10 rounded-full"
              />
            </div>
            {isExpanded && (
              <div className="ml-3">
                <p className="text-white font-medium">John Doe</p>
                <p className="text-gray-400 text-sm">Admin</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <MenuGroup title="Main" items={menuItems.main} groupKey="main" />
          <MenuGroup title="Network" items={menuItems.network} groupKey="network" />
          <MenuGroup title="Feeds" items={menuItems.feeds} groupKey="feeds" />
          <MenuGroup title="Discover" items={menuItems.discover} groupKey="discover" />
        </div>

        <div className="border-t border-gray-700 p-4">
          <MenuItem
            label="Settings"
            icon={FiSettings}
            isActive={false}
            onClick={() => console.log("Settings clicked")}
            destructive={false}
            ariaLabel="Settings"
            className="custom-class"
            isExpanded={isExpanded}
          />
          <MenuItem
            label="Logout"
            icon={FiLogOut}
            isActive={false}
            onClick={() => console.log("Logout clicked")}
            destructive={true}
            ariaLabel="Logout"
            isExpanded={isExpanded}
          />
        </div>
      </div>
    </div>
  );

  // Render logic with Portal support
  if (!isOpen) return null;

  const content = (
    <div
      ref={bubbleRef}
      className={`fixed inset-0 z-50 ${bubbleClassName}`}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative">
        {menuContent}
      </div>
    </div>
  );

  // Return with or without Portal based on withPortal prop
  return withPortal ? <DynamicPortal>{content}</DynamicPortal> : content;
};

export default Menu;
