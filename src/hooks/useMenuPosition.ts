import { useLayoutEffect, useRef } from "react";

 interface StaticPositionOptions {
  anchor?: { x: number; y: number };
  positionX?: "left" | "right";
  positionY?: "top" | "bottom";
  withPortal?: boolean;
}

 interface DynamicPositionOptions {
  anchor: { x: number; y: number };
  getTriggerElement: () => HTMLElement | null;
  getRootElement: () => HTMLElement | null;
  getMenuElement: () => HTMLElement | null;
}

export type MenuPositionOptions = StaticPositionOptions | DynamicPositionOptions;

export default function useMenuPosition(
  isOpen: boolean,
  containerRef: React.RefObject<HTMLDivElement>,
  bubbleRef: React.RefObject<HTMLDivElement>,
  options: MenuPositionOptions
) {
  const optionsRef = useRef(options);

  useLayoutEffect(() => {
    if (!isOpen) return;

    const options = optionsRef.current;

    if (!("getTriggerElement" in options)) {
      applyStaticPosition(containerRef, bubbleRef, options);
    } else {
      applyDynamicPosition(containerRef, bubbleRef, options);
    }
  }, [isOpen, containerRef, bubbleRef, options]);
}

function applyStaticPosition(
  containerRef: React.RefObject<HTMLDivElement>,
  bubbleRef: React.RefObject<HTMLDivElement>,
  {
    positionX = "left",
    positionY = "top",
    anchor,
    withPortal,
  }: StaticPositionOptions
) {
  const containerEl = containerRef.current;
  const bubbleEl = bubbleRef.current;

  if (!containerEl || !bubbleEl) return;

  const baseClasses = `absolute ${positionX === "left" ? "left-0" : "right-0"} ${
    positionY === "top" ? "top-0" : "bottom-0"
  }`;

  bubbleEl.className = `${baseClasses} ${
    withPortal ? "z-50" : "z-10"
  } transition-transform origin-${positionX}-${positionY}`;

  if (anchor) {
    bubbleEl.style.left = `${anchor.x}px`;
    bubbleEl.style.top = `${anchor.y}px`;
  }
}

function applyDynamicPosition(
  containerRef: React.RefObject<HTMLDivElement>,
  bubbleRef: React.RefObject<HTMLDivElement>,
  {
    anchor,
    getTriggerElement,
    getMenuElement,
    getRootElement,
  }: DynamicPositionOptions
) {
  const containerEl = containerRef.current;
  const bubbleEl = bubbleRef.current;

  const triggerEl = getTriggerElement();
  const menuEl = getMenuElement();
  const rootEl = getRootElement();

  if (!containerEl || !bubbleEl || !triggerEl || !menuEl || !rootEl) return;

  const rootRect = rootEl.getBoundingClientRect();
  const triggerRect = triggerEl.getBoundingClientRect();
  const menuRect = menuEl.getBoundingClientRect();

  let positionX: "left" | "right";
  let positionY: "top" | "bottom";

  // Calculate position
  const isSpaceOnRight =
    anchor.x + menuRect.width < rootRect.width + rootRect.left;
  const isSpaceBelow =
    anchor.y + menuRect.height < rootRect.height + rootRect.top;

  positionX = isSpaceOnRight ? "left" : "right";
  positionY = isSpaceBelow ? "top" : "bottom";

  const baseClasses = `absolute ${
    positionX === "left" ? "left-0" : "right-0"
  } ${positionY === "top" ? "top-0" : "bottom-0"}`;

  bubbleEl.className = `${baseClasses} transition-transform origin-${positionX}-${positionY}`;

  // Adjust styles
  bubbleEl.style.left = `${anchor.x}px`;
  bubbleEl.style.top = `${anchor.y}px`;
}
