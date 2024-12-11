import React, { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { loginRequest } from "../redux/authSlice";
import InputField from "../common/InputField";
import SocialButtons from "../auth/SocialButtons";

const AuthForms = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const toggleForm = () => setIsLogin(!isLogin);

  const onSubmit = (data: any) => {
    if (isLogin) {
      dispatch(loginRequest(data)); // Dispatch login action
    } else {
      // Dispatch sign up action
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#333333] rounded-xl shadow-2xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white font-montserrat">
            {isLogin ? "Login to dailytalk" : "Create an Account"}
          </h1>
          <p className="text-gray-300 mt-2">
            {isLogin ? "Welcome back! Please login to your account" : "Join our community today!"}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputField type="email" placeholder="Email address" icon={<FaEnvelope />} name="email" register={register} required />
          {!isLogin && <InputField type="text" placeholder="Username" icon={<FaUser />} name="username" register={register} required />}
          <InputField type="password" placeholder="Password" icon={<FaLock />} name="password" register={register} required />
          {!isLogin && <InputField type="password" placeholder="Confirm Password" icon={<FaLock />} name="confirmPassword" register={register} required />}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#2C6B2F] to-[#1E3A8A] text-white py-3 rounded-lg hover:opacity-90 transition-all duration-300 font-medium shadow-lg"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>

          <SocialButtons />

          <div className="text-center">
            <button
              type="button"
              onClick={toggleForm}
              className="text-[#B0C4DE] hover:text-white font-medium transition-colors duration-300"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForms;
