import React, { 
  useEffect, 
  useMemo, 
  useRef, 
  UIEvent 
} from 'react';
import { debounce } from '../../utils/schedulers';
import { LoadMoreDirection } from '@/types';


interface InfiniteScrollProps {
  className?: string;
  items?: any[];
  itemSelector?: string;
  preloadBackwards?: number;
  sensitiveArea?: number;
  maxHeight?: number;
  noScrollRestore?: boolean;
  noFastList?: boolean;
  beforeChildren?: React.ReactNode;
  children: React.ReactNode;
  onLoadMore?: ({ direction }: { direction: LoadMoreDirection; noScroll?: boolean }) => void;
  onScroll?: (e: UIEvent<HTMLDivElement>) => void;
}

const DEFAULT_PRELOAD_BACKWARDS = 20;
const DEFAULT_SENSITIVE_AREA = 800;

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  className,
  items,
  preloadBackwards = DEFAULT_PRELOAD_BACKWARDS,
  sensitiveArea = DEFAULT_SENSITIVE_AREA,
  maxHeight,
  noFastList = false,
  beforeChildren,
  children,
  onLoadMore,
  onScroll,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [loadMoreBackwards, loadMoreForwards] = useMemo(() => {
    if (!onLoadMore) return [];

    return [
      debounce((noScroll = false) => {
        onLoadMore({ direction: LoadMoreDirection.Backwards, noScroll });
      }, 1000),
      debounce(() => {
        onLoadMore({ direction: LoadMoreDirection.Forwards });
      }, 1000),
    ];
  }, [onLoadMore]);

  // Initial load
  useEffect(() => {
    if (!loadMoreBackwards || !containerRef.current) return;

    if (preloadBackwards > 0 && (!items || items.length < preloadBackwards)) {
      loadMoreBackwards(true);
      return;
    }

    const { scrollHeight, clientHeight } = containerRef.current;
    if (clientHeight && scrollHeight < clientHeight) {
      loadMoreBackwards();
    }
  }, [items, loadMoreBackwards, preloadBackwards]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    if (!loadMoreBackwards || !loadMoreForwards) return;

    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isNearTop = scrollTop <= sensitiveArea;
    const isNearBottom = scrollHeight - (scrollTop + clientHeight) <= sensitiveArea;

    if (isNearTop) loadMoreForwards();
    if (isNearBottom) loadMoreBackwards();

    onScroll?.(e);
  };

  return (
    <div
      ref={containerRef}
      className={`
        relative overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 
        scrollbar-track-transparent hover:scrollbar-thumb-gray-400
        ${maxHeight ? `max-h-[${maxHeight}px]` : 'h-full'}
        ${className || ''}
      `}
      onScroll={handleScroll}
    >
      {beforeChildren}
      <div className={`${noFastList ? '' : 'will-change-transform'}`}>
        {children}
      </div>
      
      {/* Loading Indicators */}
      <div className="sticky bottom-0 w-full text-center py-4 bg-gradient-to-t from-white/80 to-transparent">
        {items?.length === 0 && (
          <p className="text-gray-500">Không có nội dung</p>
        )}
      </div>
    </div>
  );
};

export default InfiniteScroll;