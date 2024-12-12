import React, { memo, useState } from "react";
import SearchBar from "../ui/SearchBar";
import ButtonGroup from "../ui/ButtonGroup";
import { FiMenu, FiSearch, FiBell, FiUser, FiEdit } from "react-icons/fi";

interface MainNavBarProps {
  onMobileMenuToggle: () => void;
}

const MainNavBar: React.FC<MainNavBarProps> = ({ onMobileMenuToggle }) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-gray-800 border-b border-gray-700 z-40">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 hover:bg-gray-700 rounded-lg"
        >
          <FiMenu className="w-6 h-6 text-gray-200" />
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-700 text-gray-200 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-700 rounded-lg">
            <FiBell className="w-5 h-5 text-gray-200" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-lg">
            <FiUser className="w-5 h-5 text-gray-200" />
          </button>
          <button className="hidden md:flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg text-white">
            <FiEdit className="w-4 h-4" />
            <span>New Post</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default memo(MainNavBar);
