import { useState, useEffect } from 'react';

// Interface định nghĩa cấu hình breakpoints
interface BreakpointConfig {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  [key: string]: number; // Cho phép thêm custom breakpoints
}

// Breakpoints mặc định
const defaultBreakpoints: BreakpointConfig = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

type BreakpointKey = keyof BreakpointConfig;

// Tham số tùy chọn cho hook, bao gồm `breakpoint` và `customBreakpoints`
interface UseScreenSizeProps {
  breakpoint?: BreakpointKey;
  customBreakpoints?: Partial<BreakpointConfig>;
}

// Hook sử dụng để theo dõi kích thước màn hình
const useScreenSize = ({ 
  breakpoint = 'lg', // Breakpoint mặc định
  customBreakpoints = {}, // Custom breakpoints (nếu có)
}: UseScreenSizeProps = {}) => {
  // Kết hợp breakpoints mặc định với custom breakpoints
  const breakpoints = { ...defaultBreakpoints, ...customBreakpoints };

  // Kiểm tra có phải đang chạy trên server không (SSR)
  const [isAboveBreakpoint, setIsAboveBreakpoint] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= (breakpoints[breakpoint] || 0);
  });

  // Effect để theo dõi thay đổi kích thước màn hình
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setIsAboveBreakpoint(window.innerWidth >= (breakpoints[breakpoint] || 0));
    };

    // Thêm event listener cho resize
    window.addEventListener('resize', handleResize);

    // Cleanup function khi component unmount hoặc breakpoints thay đổi
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint, breakpoints]);

  return isAboveBreakpoint;
};

export type { BreakpointConfig, BreakpointKey };
export default useScreenSize;
