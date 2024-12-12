import React, { memo, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import LeftMain from "../main/LeftMain";

interface LeftColumnProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const LeftColumn: React.FC<LeftColumnProps> = ({ isOpen, onClose, children }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden" 
          onClick={onClose}
        />
      )}
      
      <div className="flex">
        <aside
          className={`fixed top-16 bottom-0 bg-white shadow-lg transition-all duration-300 ease-in-out ${
            isExpanded ? "w-72" : "w-20"
          } ${
            isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } z-40`}
        >
          <button
            className="absolute -right-3 top-10 bg-indigo-600 text-white p-1 rounded-full shadow-lg"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            {isExpanded ? <FiChevronLeft /> : <FiChevronRight />}
          </button>

          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
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
                    <p className="font-medium">John Doe</p>
                    <p className="text-gray-500 text-sm">Admin</p>
                  </div>
                )}
              </div>
            </div>

            <LeftMain isSidebarOpen={isExpanded}>
              {children}
            </LeftMain>
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
