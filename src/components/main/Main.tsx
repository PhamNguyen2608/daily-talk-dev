"use client";
import { useState } from "react";
import Menu from "@/components/ui/Menu";
import Transition from "@/components/ui/Transition";
import { FiMenu, FiX } from "react-icons/fi";
const Main = () => {
    const [isExpanded, setIsExpanded] = useState(true);
  
    const toggleMenu = () => {
      setIsExpanded(!isExpanded);
      setActiveKey(activeKey === 0 ? 1 : 0);
    };
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const [activeKey, setActiveKey] = useState(0);
    const handleMenuToggle = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const handleMenuClose = () => {
        setIsMenuOpen(false);
    };
    return <div> <Menu
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
        positionX="right" // hoặc "left"
        positionY="top"   // hoặc "bottom"
        bubbleClassName="bg-white shadow-lg p-4 rounded"
        noCompact={true}
        withPortal={true}
    />
    </div>;
};

export default Main;
