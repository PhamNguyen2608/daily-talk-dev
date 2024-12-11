
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
  isActive = false,
  onClick,
  isExpanded = true,
  className = "",
  children,
  href,
  disabled = false,
  destructive = false,
  ariaLabel,
  onContextMenu,
  withPreventDefaultOnMouseDown = false,
}) => {
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>) => {
    if (withPreventDefaultOnMouseDown) {
      e.preventDefault();
    }
  };

  const baseClassName = `flex items-center px-4 py-2 cursor-pointer transition-colors duration-200 ${
    disabled
      ? "opacity-50 cursor-not-allowed"
      : isActive
      ? "bg-indigo-600 text-white"
      : "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
  } ${destructive ? "text-red-600 hover:text-red-400" : ""} ${className}`;

  const content = (
    <>
      {Icon && <Icon className="w-5 h-5" />}
      {isExpanded && (label ? <span className="ml-3">{label}</span> : children)}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={baseClassName}
        aria-label={ariaLabel || label}
        onClick={disabled ? undefined : onClick}
        onContextMenu={onContextMenu}
        onMouseDown={handleMouseDown}
        role="menuitem"
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className={baseClassName}
      onClick={disabled ? undefined : onClick}
      onContextMenu={onContextMenu}
      onMouseDown={handleMouseDown}
      role="menuitem"
      aria-label={ariaLabel || label}
    >
      {content}
    </div>
  );
};

export default MenuItem;
