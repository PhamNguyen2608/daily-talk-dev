import React, { memo } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar: React.FC = () => {
  return (
    <div className="relative">
      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search..."
        className="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[300px]"
      />
    </div>
  );
};

export default memo(SearchBar); 