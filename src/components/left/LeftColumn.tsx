import React, { memo, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import LeftMain from "../main/LeftMain";
import Menu from "../ui/Menu";
import useScreenSize from "@/hooks/useScreenSize";
import './LeftColumn.css';

interface LeftColumnProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const LeftColumn: React.FC<LeftColumnProps> = ({ 
  isOpen, 
  onClose, 
  children 
}) => {
  const isLargeScreen = useScreenSize({
    breakpoint: 'lg',
    customBreakpoints: {
      lg: 1024
    }
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(isLargeScreen);

  return (
    <>
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      <div className="flex">
        <aside
          className={`sidebar-base ${
            isLargeScreen 
              ? (isExpanded ? "sidebar-expanded" : "sidebar-collapsed")
              : "sidebar-expanded"
          } ${
            isOpen ? "sidebar-mobile" : "sidebar-mobile-closed"
          } z-40`}
        >
          {isLargeScreen && (
            <button
              className="sidebar-toggle"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label="Toggle Sidebar"
            >
              {isExpanded ? (
                <FiChevronLeft size={20} className="text-white" />
              ) : (
                <FiChevronRight size={20} className="text-white" />
              )}
            </button>
          )}

          <div className="h-full">
            <LeftMain 
              isSidebarOpen={isLargeScreen ? isExpanded : true}
              navigation={
                <Menu 
                  isOpen={isOpen}
                  onClose={onClose}
                  isExpanded={isLargeScreen ? isExpanded : true}
                />
              }
            />
          </div>
        </aside>

        <main
          className={`main-content ${
            isLargeScreen 
              ? (isExpanded ? "main-content-expanded" : "main-content-collapsed")
              : "main-content-mobile"
          }`}
        >
          <div className="main-grid">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default memo(LeftColumn);
