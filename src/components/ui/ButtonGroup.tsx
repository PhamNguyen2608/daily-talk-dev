import React, { memo } from "react";
import Button from "./Button";
import { FiPlus, FiUser } from "react-icons/fi";

const ButtonGroup: React.FC = () => {
  return (
    <div className="flex items-center gap-4">
      <button className="bg-blue-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-blue-600 transition-colors">
        <FiPlus />
        <span>New Post</span>
      </button>
      <Button>
        <FiUser className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default memo(ButtonGroup);
