import React from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";

const SocialButtons = () => (
  <div className="flex flex-col space-y-3">
    <button
      type="button"
      className="w-full flex items-center justify-center space-x-2 bg-white text-gray-700 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-medium shadow-md"
    >
      <FaGoogle className="h-5 w-5 text-red-500" />
      <span>Continue with Google</span>
    </button>

    <button
      type="button"
      className="w-full flex items-center justify-center space-x-2 bg-[#24292e] text-white py-3 rounded-lg hover:bg-[#1b1f23] transition-colors duration-300 font-medium shadow-md"
    >
      <FaGithub className="h-5 w-5" />
      <span>Continue with GitHub</span>
    </button>
  </div>
);

export default SocialButtons;
