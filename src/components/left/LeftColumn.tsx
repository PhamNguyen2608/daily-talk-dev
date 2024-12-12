import React, { memo, useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import LeftMain from "../main/LeftMain";
import Menu from "../ui/Menu";

interface LeftColumnProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const LeftColumn: React.FC<LeftColumnProps> = ({ isOpen, onClose, children }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(window.innerWidth >= 1024);
  const toggleSidebar = () => setIsExpanded(!isExpanded);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsExpanded(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden" 
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      <div className="flex">
        <aside
          className={`fixed top-16 bottom-0 bg-gray-800 shadow-lg transition-all duration-300 ease-in-out ${
            isExpanded ? "w-72" : "w-20"
          } ${
            isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          } z-40`}
        >
          <button
            className="absolute -right-3 top-10 bg-indigo-600 text-white p-1 rounded-full shadow-lg"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            {isExpanded ? <FiChevronLeft /> : <FiChevronRight />}
          </button>

          <div className="h-full">
            <LeftMain 
              isSidebarOpen={isExpanded}
              navigation={
                <Menu 
                  isOpen={isOpen}
                  onClose={onClose}
                  isExpanded={isExpanded}
                />
              }
            />
          </div>
        </aside>

        <main
          className={`flex-1 pt-20 px-4 transition-all duration-300 ${
            isExpanded ? "md:ml-72" : "md:ml-20"
          }`} 
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default memo(LeftColumn);
