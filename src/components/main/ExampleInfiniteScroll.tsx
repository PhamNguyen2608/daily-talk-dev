import React, { useState } from 'react';
import useInfiniteScroll from '@/hooks/useInfiniteScroll'; // Đường dẫn hook
import { LoadMoreDirection } from '@/types';

const ExampleInfiniteScroll = () => {
    const [allItems, setAllItems] = useState(Array.from({ length: 100 }, (_, i) => i + 1));

    const loadMoreBackwards = ({ offsetId, direction }: { offsetId?: string | number; direction: LoadMoreDirection }) => {
        console.log('Tải thêm dữ liệu (Backwards):', { offsetId, direction });

        if (offsetId) {
            const numericOffset = typeof offsetId === 'string' ? parseInt(offsetId, 10) : offsetId;
            if (numericOffset > 1) {
                const newItems = Array.from({ length: 10 }, (_, i) => numericOffset - i - 1).filter((id) => id > 0);
                setAllItems((prev) => [...newItems, ...prev]);
            }
        }
    };

    const loadMoreForwards = ({ offsetId, direction }: { offsetId?: string | number; direction: LoadMoreDirection }) => {
        console.log('Tải thêm dữ liệu (Forwards):', { offsetId, direction });

        if (offsetId) {
            const numericOffset = typeof offsetId === 'string' ? parseInt(offsetId, 10) : offsetId;
            const newItems = Array.from({ length: 10 }, (_, i) => numericOffset + i + 1);
            setAllItems((prev) => [...prev, ...newItems]);
        }
    };

    const [viewportIds, getMore, offset] = useInfiniteScroll<number>(
        ({ offsetId, direction }: { offsetId?: string | number; direction: LoadMoreDirection }) => {
            if (direction === LoadMoreDirection.Backwards) {
                loadMoreBackwards({ offsetId, direction });
            } else if (direction === LoadMoreDirection.Forwards) {
                loadMoreForwards({ offsetId, direction });
            }
        },
        allItems,
        false,
        20
    );
    return (
        <div style={{ height: '200px', overflow: 'auto' }} onScroll={(e) => {
            const target = e.target as HTMLElement;
            console.log('ScrollTop:', target.scrollTop, 'ScrollHeight:', target.scrollHeight, 'ClientHeight:', target.clientHeight);

            // Cuộn lên
            if (target.scrollTop === 0) {
                getMore?.({ direction: LoadMoreDirection.Backwards });
            }

            // Cuộn xuống
            if (target.scrollHeight - target.scrollTop === target.clientHeight) {
                getMore?.({ direction: LoadMoreDirection.Forwards });
            }
        }}>
            <ul>
                {viewportIds?.map((id) => (
                    <li key={id}>Item {id}</li>
                ))}
            </ul>
            <p>Vị trí offset: {offset}</p>
        </div>
    );
};

export default ExampleInfiniteScroll;
