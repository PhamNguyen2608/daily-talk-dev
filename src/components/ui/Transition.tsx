"use client";
import React, { useRef, useLayoutEffect, useEffect, useState, ReactNode, RefObject } from 'react';

// Giả lập các hàm từ code gốc
function requestMutation(fn: () => void) { fn(); }
function waitForTransitionEnd(node: ChildNode, cb: () => void, _: unknown, fallback = 1000) {
  if (!(node instanceof HTMLElement)) {
    cb();
    return;
  }
  let ended = false;
  const onEnd = () => {
    if (!ended) {
      ended = true;
      cb();
    }
  };
  node.addEventListener('transitionend', onEnd, { once: true });
  setTimeout(onEnd, fallback);
}

type AnimationName = 'none' | 'slide' | 'slideRtl' | 'slideFade' | 'zoomFade';
type ChildrenFn = (isActive: boolean, isFrom: boolean, currentKey: number, activeKey: number) => ReactNode;

type TransitionProps = {
  ref?: RefObject<HTMLDivElement>;
  activeKey: number;
  nextKey?: number;
  name: AnimationName;
  direction?: 'auto' | 'inverse' | 1 | -1;
  shouldRestoreHeight?: boolean;
  shouldCleanup?: boolean;
  cleanupExceptionKey?: number;
  cleanupOnlyKey?: number;
  shouldWrap?: boolean;
  wrapExceptionKey?: number;
  id?: string;
  className?: string;
  slideClassName?: string;
  withSwipeControl?: boolean;
  isBlockingAnimation?: boolean;
  onStart?: () => void;
  onStop?: () => void;
  children: ReactNode | ChildrenFn;
};

const TRANSITION_CLASSES = {
  base: 'transition-all duration-300 ease-in-out',
  slide: 'transform',
  active: 'translate-x-0 opacity-100',
  from: 'translate-x-0',
  to: 'translate-x-full',
  inactive: 'opacity-0 pointer-events-none',
  backwards: {
    from: 'translate-x-0',
    to: '-translate-x-full'
  }
};

export default function Transition({
  ref: externalRef,
  activeKey,
  nextKey,
  name,
  direction = 'auto',
  shouldRestoreHeight,
  shouldCleanup,
  cleanupExceptionKey,
  cleanupOnlyKey,
  shouldWrap,
  wrapExceptionKey,
  id,
  className,
  slideClassName = '',
  withSwipeControl,
  isBlockingAnimation,
  onStart,
  onStop,
  children,
}: TransitionProps) {
  const containerRef = externalRef || useRef<HTMLDivElement>(null);
  const rendersRef = useRef<Record<number, ReactNode | ChildrenFn>>({});
  const [prevActiveKey, setPrevActiveKey] = useState<number | undefined>(undefined);
  const isAnimatingRef = useRef(false);

  // Update renders map
  if (prevActiveKey === undefined) {
    setPrevActiveKey(activeKey);
  } else if (activeKey !== prevActiveKey) {
    rendersRef.current[prevActiveKey] = rendersRef.current[prevActiveKey] || children;
  }
  rendersRef.current[activeKey] = children;
  if (nextKey) {
    rendersRef.current[nextKey] = children;
  }

  const hasActiveKeyChanged = prevActiveKey !== undefined && activeKey !== prevActiveKey;
  const isBackwards = (
    direction === -1 ||
    (direction === 'auto' && prevActiveKey !== undefined && prevActiveKey > activeKey) ||
    (direction === 'inverse' && prevActiveKey !== undefined && prevActiveKey < activeKey)
  );

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const childNodes = Array.from(container.childNodes) as HTMLElement[];
    if (!childNodes.length) return;

    // Apply base transition classes
    childNodes.forEach((el) => {
      el.className = `${TRANSITION_CLASSES.base} ${TRANSITION_CLASSES.slide} ${slideClassName}`;
    });

    if (!hasActiveKeyChanged) {
      if (!isAnimatingRef.current) {
        childNodes.forEach((child, i) => {
          if (i === activeKey) {
            child.className = `${child.className} ${TRANSITION_CLASSES.active}`;
          } else {
            child.className = `${child.className} ${TRANSITION_CLASSES.inactive}`;
          }
        });
      }
      return;
    }

    isAnimatingRef.current = true;
    onStart?.();

    // Set initial positions
    childNodes.forEach((node, i) => {
      if (i === prevActiveKey) {
        node.className = `${node.className} ${TRANSITION_CLASSES.from}`;
      } else if (i === activeKey) {
        node.className = `${node.className} ${isBackwards ? TRANSITION_CLASSES.backwards.to : TRANSITION_CLASSES.to}`;
      } else {
        node.className = `${node.className} ${TRANSITION_CLASSES.inactive}`;
      }
    });

    requestMutation(() => {
      // Force reflow
      container.getBoundingClientRect();

      // Start transition
      const prevNode = childNodes[prevActiveKey!];
      const activeNode = childNodes[activeKey];

      prevNode.className = `${prevNode.className} ${isBackwards ? TRANSITION_CLASSES.backwards.from : TRANSITION_CLASSES.from} ${TRANSITION_CLASSES.inactive}`;
      activeNode.className = `${activeNode.className} ${TRANSITION_CLASSES.active}`;

      waitForTransitionEnd(activeNode, () => {
        requestMutation(() => {
          if (shouldCleanup) {
            if (cleanupExceptionKey !== undefined) {
              const saved = rendersRef.current[cleanupExceptionKey];
              rendersRef.current = { [cleanupExceptionKey]: saved };
            } else if (cleanupOnlyKey !== undefined) {
              delete rendersRef.current[cleanupOnlyKey];
            } else {
              rendersRef.current = { [activeKey]: rendersRef.current[activeKey] };
            }
          }

          if (shouldRestoreHeight && activeNode instanceof HTMLElement) {
            container.style.height = `${activeNode.clientHeight}px`;
          }

          isAnimatingRef.current = false;
          onStop?.();
          setPrevActiveKey(activeKey);
        });
      }, undefined);
    });
  }, [
    activeKey, prevActiveKey, hasActiveKeyChanged, isBackwards,
    shouldCleanup, cleanupExceptionKey, cleanupOnlyKey,
    shouldRestoreHeight, onStart, onStop, slideClassName
  ]);

  const renders = rendersRef.current;
  const renderKeys = Object.keys(renders).map(Number);
  const contents = renderKeys.map((key) => {
    const render = renders[key];
    const node = typeof render === 'function'
      ? render(key === activeKey, key === prevActiveKey, key, activeKey)
      : render;
    
    return shouldWrap && key !== wrapExceptionKey 
      ? <div key={key}>{node}</div>
      : <div key={key}>{node}</div>;
  });

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative overflow-hidden flex ${className || ''}`}
    >
      {contents}
    </div>
  );
}
  