import React, { memo, useState } from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  size?: 'small' | 'medium' | 'large'; // Tùy chọn kích thước
  color?: 'primary' | 'secondary' | 'danger'; // Tùy chọn màu sắc
  isLoading?: boolean; // Trạng thái đang tải
  disabled?: boolean; // Vô hiệu hóa nút
  isText?: boolean; // Nút kiểu text (không nền)
  ripple?: boolean; // Hiệu ứng sóng (ripple effect)
  ariaLabel?: string; // Thuộc tính aria-label cho accessibility
  style?: React.CSSProperties; // Tùy chỉnh style
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  size = 'medium',
  color = 'primary',
  isLoading = false,
  disabled = false,
  isText = false,
  ripple = true,
  ariaLabel,
  style,
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const fullClassName = `p-2 rounded-full hover:bg-gray-100 transition-colors ${
    size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : ''
  } ${color === 'primary' ? 'bg-blue-500 text-white' : color === 'secondary' ? 'bg-gray-500 text-white' : 'bg-red-500 text-white'} ${isText ? 'bg-transparent text-blue-500' : ''} ${isClicked ? 'opacity-75' : ''} ${className}`;

  const handleClick = () => {
    if (disabled || isLoading) return;
    setIsClicked(true);
    if (onClick) onClick();
    setTimeout(() => setIsClicked(false), 400);
  };

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
      {ripple && !isLoading && (
        <span className="ripple-effect"></span> // Bạn có thể thêm hiệu ứng ripple ở đây
      )}
      {content}
    </button>
  );
};

export default memo(Button);
