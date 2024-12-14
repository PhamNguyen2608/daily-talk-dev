import React, { FC } from "react";

// Định nghĩa kiểu cho MenuItemProps
interface MenuItemProps {
  label?: string; 
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => void;
  isExpanded?: boolean;
  className?: string;
  children?: React.ReactNode;
  href?: string;
  disabled?: boolean;
  destructive?: boolean;
  ariaLabel?: string;
  onContextMenu?: (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => void;
  withPreventDefaultOnMouseDown?: boolean;
}

const MenuItem: FC<MenuItemProps> = ({
  label,
  icon: Icon,
  isActive,
  onClick,
  isExpanded,
  destructive = false,
}) => {
  return (
    <div
      className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-all ${
        isActive
          ? "bg-gray-700 border-l-4 border-sidebar-border rounded-lg" 
          : "hover:bg-gray-700"
      } ${destructive ? "text-red-600 hover:text-red-400" : "text-gray-400 hover:text-gray-200"}`}
      onClick={onClick}
    >
      {Icon && (
        <Icon 
          className={`w-5 h-5 ${
            !isExpanded ? 'mx-auto' : ''
          }`} 
        />
      )}
      {isExpanded && <span className="ml-3">{label}</span>}
    </div>
  );
};

export default MenuItem;
