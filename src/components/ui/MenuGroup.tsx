import React, { FC } from "react";
import MenuItem from "./MenuItem";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

interface MenuGroupProps {
  title: string;
  items: {
    id: string;
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }[];
  groupKey: string;
  isExpanded: boolean;
  expandedGroups: string[];
  toggleGroup: (group: string) => void;
  activeItem: string;
  setActiveItem: (id: string) => void;
}

const MenuGroup: FC<MenuGroupProps> = ({
  title,
  items,
  groupKey,
  isExpanded,
  expandedGroups,
  toggleGroup,
  activeItem,
  setActiveItem,
}) => {
  const isGroupExpanded = expandedGroups.includes(groupKey);

  return (
    <div className="mb-4">
      <div
        className="flex items-center justify-between px-4 py-2 text-gray-400 cursor-pointer hover:text-gray-200"
        onClick={() => toggleGroup(groupKey)}
      >
        {isExpanded ? (
          <>
            <span className="text-sm font-semibold uppercase">{title}</span>
            {isGroupExpanded ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
          </>
        ) : (
          <div className="w-full border-t border-gray-700"></div>
        )}
      </div>
      <div className={`${!isGroupExpanded && isExpanded ? "hidden" : "block"}`}>
        {items.map((item) => (
          <MenuItem
            key={item.id}
            label={item.label}
            icon={item.icon}
            isActive={activeItem === item.id}
            onClick={() => setActiveItem(item.id)}
            isExpanded={isExpanded}
          />
        ))}
      </div>
    </div>
  );
};

export default MenuGroup; 