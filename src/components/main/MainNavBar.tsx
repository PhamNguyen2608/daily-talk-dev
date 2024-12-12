import React, { memo } from "react";
import SearchBar from "../ui/SearchBar";
import ButtonGroup from "../ui/ButtonGroup";

const MainNavBar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 h-16 z-50 flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <SearchBar />
      </div>
      <ButtonGroup />
    </nav>
  );
};

export default memo(MainNavBar);
