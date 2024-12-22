import React, { memo, useState } from "react";
import RippleAnimation from "../common/RippleAnimation";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/util";
import { useClickAnimation } from "@/hooks/useClickAnimation";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  size?:  "small" | "medium" | "large";
  color?: "primary" | "secondary" | "danger";
  isLoading?: boolean;
  disabled?: boolean;
  ripple?: boolean;
  ariaLabel?: string;
  style?: React.CSSProperties;
  variant?: "primary" | "secondary" | "ghost" | "text";
}

const buttonStyles = cva(
  "relative overflow-hidden p-2 rounded transition-colors user-select-none focus:outline-none", // Base styles
  {
    variants: {
      size: {
        small: "text-sm",
        medium: "",
        large: "text-lg",
      },
      color: {
        primary:
          "bg-blue-500 text-white hover:bg-slate-100 hover:text-slate-900",
        secondary:
          "bg-gray-500 text-white hover:bg-slate-100 hover:text-slate-900",
        danger:
          "bg-red-500 text-white hover:bg-slate-100 hover:text-slate-900",
      },
      variant: {
        primary: "",
        secondary: "",
        ghost: "hover:bg-slate-100 hover:text-slate-900",
        text: `
        bg-transparent 
        text-slate-500 
        hover:bg-slate-100 
        hover:text-slate-900 
        focus:text-slate-900 
        border-b-2 border-transparent
        [&.selected]:border-b-2 [&.selected]:border-blue-600
      `,
      },
      isClicked: {
        true: "opacity-75",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none bg-slate-100", 
        false: "",
      },
    },
    defaultVariants: {
      size: "medium",
      color: "primary",
      variant: "primary",
      isClicked: false,
    },
  }
);

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  size = "medium",
  color = "primary",
  isLoading = false,
  disabled = false,
  ripple = true,
  ariaLabel,
  style,
  variant = "primary", // Default to primary variant
}) => {
  const { isClicked, triggerAnimation } = useClickAnimation();

  const handleClick = () => {
    if (disabled || isLoading) return;
    triggerAnimation();
    if (onClick) onClick();
  };

  const fullClassName = cn(
    buttonStyles({
      size,
      color,
      variant,
      isClicked,
    }),
    className // Allow additional className from props
  );

  const content = isLoading ? (
    <div className="loader">Loading...</div>
  ) : (
    children
  );

  return (
    <button
      onClick={handleClick}
      className={fullClassName}
      disabled={disabled}
      aria-label={ariaLabel}
      style={style}
    >
      {ripple && !isLoading && <RippleAnimation />}
      {content}
    </button>
  );
};

export default memo(Button);
