import React from "react";
import { FiMenu, FiSearch, FiBell, FiUser, FiEdit } from "react-icons/fi";
import './MainNavBar.css';
import SearchBar from "../ui/SearchBar";

interface MainNavBarProps {
  onMobileMenuToggle: () => void;
}

const MainNavBar: React.FC<MainNavBarProps> = ({ onMobileMenuToggle }) => {
  return (
    <header className="navbar-base">
      <div className="navbar-container">
        <button
          onClick={onMobileMenuToggle}
          className="navbar-menu-btn"
        >
          <FiMenu />
        </button>

        <SearchBar />
        <div className="navbar-actions">
          <button className="navbar-actions-btn">
            <FiBell />
          </button>
          <button className="navbar-actions-btn">
            <FiUser />
          </button>
          <button className="navbar-actions-new-post">
            <FiEdit />
            <span>New Post</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default MainNavBar;
