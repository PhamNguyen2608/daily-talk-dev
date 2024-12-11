"use client";
import React, { FC, useLayoutEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

type PortalProps = {
  containerSelector?: string; // Chọn selector của container muốn render vào
  className?: string; // Tùy chọn thêm class vào div render
  children: React.ReactNode; // Nội dung muốn render
};

const Portal: FC<PortalProps> = ({ containerSelector = '#portals', className, children }) => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  // Nếu elementRef chưa có element DOM thì tạo ra một div mới
  if (!elementRef.current) {
    elementRef.current = document.createElement('div');
  }

  // Effect để gắn phần tử vào DOM và clean-up khi component bị unmount
  useLayoutEffect(() => {
    // Tìm container muốn render nội dung vào
    const container = document.querySelector<HTMLDivElement>(containerSelector);

    if (!container) return; // Nếu không tìm thấy container, không làm gì

    const element = elementRef.current!;
    // Thêm className nếu có
    if (className) {
      element.classList.add(className);
    }

    // Thêm phần tử mới vào container
    container.appendChild(element);

    // Cleanup: khi component unmount, remove element khỏi container
    return () => {
      container.removeChild(element); // Xóa phần tử khỏi container
    };
  }, [containerSelector, className]); // Dependency array

  // Render các children vào phần tử mà ta đã tạo
  return ReactDOM.createPortal(children, elementRef.current);
};

export default Portal;
