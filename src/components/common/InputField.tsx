import React from "react";

interface InputFieldProps {
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  name: string;
  register: any;  // Register function from react-hook-form
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, icon, name, register, required }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { required })}
        className="w-full pl-10 pr-4 py-3 bg-[#1A1A1A] border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[#2C6B2F] focus:border-transparent outline-none transition-colors"
      />
    </div>
  );
};

export default InputField;
