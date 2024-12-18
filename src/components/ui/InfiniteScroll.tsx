import type { FC, RefObject, UIEvent } from 'react';
import React, {
  useEffect, useLayoutEffect, useMemo, useRef,
} from 'react';

import { LoadMoreDirection } from '../../types';

import { debounce } from '@/utils/schedulers';

import useLastCallback from '../../hooks/useLastCallback';

type OwnProps = {
  ref?: RefObject<HTMLDivElement>;
  style?: string;
  className?: string;
  items?: any[];
  itemSelector?: string;
  preloadBackwards?: number;
  sensitiveArea?: number;
  withAbsolutePositioning?: boolean;
  maxHeight?: number;
  noScrollRestore?: boolean;
  noScrollRestoreOnTop?: boolean;
  noFastList?: boolean;
  cacheBuster?: any;
  beforeChildren?: React.ReactNode;
  scrollContainerClosest?: string;
  children: React.ReactNode;
  onLoadMore?: ({ direction }: { direction: LoadMoreDirection; noScroll?: boolean }) => void;
  onScroll?: (e: UIEvent<HTMLDivElement>) => void;
  onWheel?: (e: React.WheelEvent<HTMLDivElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<any>) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave?: (e: React.DragEvent<HTMLDivElement>) => void;
};

const DEFAULT_LIST_SELECTOR = '.ListItem';
const DEFAULT_PRELOAD_BACKWARDS = 20;
const DEFAULT_SENSITIVE_AREA = 800;

const InfiniteScroll: FC<OwnProps> = ({
  ref,
  style,
  className,
  items,
  itemSelector = DEFAULT_LIST_SELECTOR,
  preloadBackwards = DEFAULT_PRELOAD_BACKWARDS,
  sensitiveArea = DEFAULT_SENSITIVE_AREA,
  withAbsolutePositioning,
  maxHeight,
  // Used to turn off restoring scroll position (e.g. for frequently re-ordered chat or user lists)
  noScrollRestore = false,
  noScrollRestoreOnTop = false,
  noFastList,
  // Used to re-query `listItemElements` if rendering is delayed by transition
  cacheBuster,
  beforeChildren,
  children,
  scrollContainerClosest,
  onLoadMore,
  onScroll,
  onWheel,
  onClick,
  onKeyDown,
  onDragOver,
  onDragLeave,
}: OwnProps) => {
  // eslint-disable-next-line no-null/no-null
  let containerRef = useRef<HTMLDivElement>(null);
  if (ref) {
    containerRef = ref;
  }

  const stateRef = useRef<{
    listItemElements?: NodeListOf<HTMLDivElement>;
    isScrollTopJustUpdated?: boolean;
    currentAnchor?: HTMLDivElement | undefined;
    currentAnchorTop?: number;
  }>({});
  // Trong InfiniteScroll.tsx
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const elements = container.querySelectorAll<HTMLDivElement>(itemSelector);

    console.log("Container:", container);
    console.log("ItemSelector:", itemSelector);
    console.log("Found elements:", elements);

    stateRef.current.listItemElements = elements;
  }, []);

  const [loadMoreBackwards, loadMoreForwards] = useMemo(() => {
    if (!onLoadMore) {
      return [];
    }

    return [
      debounce((noScroll = false) => {
        onLoadMore({ direction: LoadMoreDirection.Backwards, noScroll });
      }, 1000, true, false),
      debounce(() => {
        onLoadMore({ direction: LoadMoreDirection.Forwards });
      }, 1000, true, false),
    ];
    // eslint-disable-next-line react-hooks-static-deps/exhaustive-deps
  }, [onLoadMore, items]);

  // Initial preload
  useEffect(() => {
    const scrollContainer = scrollContainerClosest
      ? containerRef.current!.closest<HTMLDivElement>(scrollContainerClosest)!
      : containerRef.current!;
    if (!loadMoreBackwards || !scrollContainer) {
      return;
    }

    if (preloadBackwards > 0 && (!items || items.length < preloadBackwards)) {
      loadMoreBackwards(true);
      return;
    }

    const { scrollHeight, clientHeight } = scrollContainer;
    if (clientHeight && scrollHeight < clientHeight) {
      loadMoreBackwards();
    }
  }, [items, loadMoreBackwards, preloadBackwards, scrollContainerClosest]);

  // Restore `scrollTop` after adding items
  // useLayoutEffect(() => {
  //   const scrollContainer = scrollContainerClosest
  //     ? containerRef.current!.closest<HTMLDivElement>(scrollContainerClosest)!
  //     : containerRef.current!;

  //   const container = containerRef.current!;

  //   requestForcedReflow(() => {
  //     const state = stateRef.current;

  //     state.listItemElements = container.querySelectorAll<HTMLDivElement>(itemSelector);

  //     let newScrollTop: number;

  //     if (state.currentAnchor && Array.from(state.listItemElements).includes(state.currentAnchor)) {
  //       const { scrollTop } = scrollContainer;
  //       const newAnchorTop = state.currentAnchor!.getBoundingClientRect().top;
  //       newScrollTop = scrollTop + (newAnchorTop - state.currentAnchorTop!);
  //     } else {
  //       const nextAnchor = state.listItemElements[0];
  //       if (nextAnchor) {
  //         state.currentAnchor = nextAnchor;
  //         state.currentAnchorTop = nextAnchor.getBoundingClientRect().top;
  //       }
  //     }

  //     if (withAbsolutePositioning || noScrollRestore) {
  //       return undefined;
  //     }

  //     const { scrollTop } = scrollContainer;
  //     if (noScrollRestoreOnTop && scrollTop === 0) {
  //       return undefined;
  //     }

  //     return () => {
  //       resetScroll(scrollContainer, newScrollTop);

  //       state.isScrollTopJustUpdated = true;
  //     };
  //   });
  // }, [
  //   items, itemSelector, noScrollRestore, noScrollRestoreOnTop, cacheBuster, withAbsolutePositioning,
  //   scrollContainerClosest,
  // ]);

  const handleScroll = useLastCallback((e: UIEvent<HTMLDivElement>) => {
    console.log("1. Scroll event triggered");
    if (loadMoreForwards && loadMoreBackwards) {
      const {
        isScrollTopJustUpdated, currentAnchor, currentAnchorTop,
      } = stateRef.current;
      const listItemElements = stateRef.current.listItemElements!;
      console.log("2. Current state:", { // Bước 2: Kiểm tra state hiện tại
        isScrollTopJustUpdated,
        hasCurrentAnchor: !!currentAnchor,
        currentAnchorTop,
        numberOfListItems: listItemElements?.length
      });
      if (isScrollTopJustUpdated) {
        console.log("3. Scroll was just updated, skipping...");
        stateRef.current.isScrollTopJustUpdated = false;
        return;
      }

      const listLength = listItemElements.length;
      const scrollContainer = scrollContainerClosest
        ? containerRef.current!.closest<HTMLDivElement>(scrollContainerClosest)!
        : containerRef.current!;
      const { scrollTop, scrollHeight, offsetHeight } = scrollContainer;
      console.log("4. Scroll metrics:", { // Bước 4: Thông số scroll
        scrollTop,        // Vị trí scroll hiện tại
        scrollHeight,     // Tổng chiều cao có thể scroll
        offsetHeight,     // Chiều cao container
        viewableArea: scrollTop + offsetHeight // Vùng đang hiển thị
      });
      const top = listLength ? listItemElements[0].offsetTop : 0;
      const isNearTop = scrollTop <= top + sensitiveArea;
      const bottom = listLength
        ? listItemElements[listLength - 1].offsetTop + listItemElements[listLength - 1].offsetHeight
        : scrollHeight;
      const isNearBottom = bottom - (scrollTop + offsetHeight) <= sensitiveArea;
      console.log("5. Position check:", { // Bước 5: Kiểm tra vị trí
        isNearTop,
        isNearBottom,
        sensitiveArea,
        topPosition: top,
        bottomPosition: bottom
      });
      let isUpdated = false;

      if (isNearTop) {
        const nextAnchor = listItemElements[0];
        if (nextAnchor) {
          console.log("6. Near bottom - checking for load more");
          const nextAnchorTop = nextAnchor.getBoundingClientRect().top;
          const newAnchorTop = currentAnchor?.offsetParent && currentAnchor !== nextAnchor
            ? currentAnchor.getBoundingClientRect().top
            : nextAnchorTop;
          const isMovingUp = (
            currentAnchor && currentAnchorTop !== undefined && newAnchorTop > currentAnchorTop
          );
          if (isMovingUp) {
            stateRef.current.currentAnchor = nextAnchor;
            stateRef.current.currentAnchorTop = nextAnchorTop;
            isUpdated = true;
            console.log("Cuộn lên - Loading forwards");
            loadMoreForwards();
          }
        }
      }

      if (isNearBottom) {
        console.log("7. Near bottom - checking for load more");
        const nextAnchor = listItemElements[listLength - 1];
        if (nextAnchor) {
          const nextAnchorTop = nextAnchor.getBoundingClientRect().top;
          const newAnchorTop = currentAnchor?.offsetParent && currentAnchor !== nextAnchor
            ? currentAnchor.getBoundingClientRect().top
            : nextAnchorTop;
          
          const isMovingDown = (
            currentAnchor && 
            currentAnchorTop !== undefined && 
            newAnchorTop < currentAnchorTop
          );

          console.log('Loading check:', {
            currentData: {
              totalItems: listItemElements.length,
              lastItemIndex: listLength - 1,
              lastItem: nextAnchor.textContent // Nội dung item cuối cùng
            }
          });
          if (isMovingDown) {
            stateRef.current.currentAnchor = nextAnchor;
            stateRef.current.currentAnchorTop = nextAnchorTop;
            console.log('isMovingDown:', isMovingDown);
            console.log('Before loading more:', {
              viewportIds: items,
              lastItemId: items?.[items.length - 1]
            });

            loadMoreBackwards();
            
            console.log('After loading more:', {
              newViewportIds: stateRef.current.listItemElements,
              newLastItemId: stateRef.current.listItemElements?.[stateRef.current.listItemElements.length - 1]
            });
          }
        }
      }

      if (!isUpdated) {
        if (currentAnchor?.offsetParent) {
          stateRef.current.currentAnchorTop = currentAnchor.getBoundingClientRect().top;
        } else {
          const nextAnchor = listItemElements[0];

          if (nextAnchor) {
            stateRef.current.currentAnchor = nextAnchor;
            stateRef.current.currentAnchorTop = nextAnchor.getBoundingClientRect().top;
          }
        }
      }
    }

    if (onScroll) {
      onScroll(e);
    }
  });

  useLayoutEffect(() => {
    const scrollContainer = scrollContainerClosest
      ? containerRef.current!.closest<HTMLDivElement>(scrollContainerClosest)!
      : containerRef.current!;
    if (!scrollContainer) return undefined;

    const handleNativeScroll = (e: Event) => handleScroll(e as unknown as UIEvent<HTMLDivElement>);

    scrollContainer.addEventListener('scroll', handleNativeScroll);

    return () => {
      scrollContainer.removeEventListener('scroll', handleNativeScroll);
    };
  }, [handleScroll, scrollContainerClosest]);

  return (
    <div
      ref={containerRef}
      className={className}
      onWheel={onWheel}
      onKeyDown={onKeyDown}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default InfiniteScroll;
