"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import MainNavBar from "./MainNavBar";
import LeftColumn from "../left/LeftColumn";
import Feed from "../post/Feed";
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import InfiniteScroll from "../ui/InfiniteScroll";
import { useRouter } from 'next/navigation';
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
const Main: React.FC = () => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Di chuyển Lorem object lên trước khi sử dụng
  const Lorem = {
    words: [
      "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
      "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
      "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
      "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea",
      "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit",
      "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla",
      "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident",
      "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id",
      "est", "laborum"
    ],
    generate: function() {
      const sentenceLength = Math.floor(Math.random() * 20) + 10;
      return Array.from({ length: sentenceLength }, () =>
        this.words[Math.floor(Math.random() * this.words.length)]
      ).join(' ');
    }
  };
  const handlePostClick = () => {
    setIsLoading(true);
    // setTimeout(() => {
    //   setIsLoading(false);
    //   router.push(`/post}`);
    // }, 1000);
  };
  // Sau đó mới khai báo posts state với generateInitialPosts
  const [posts] = useState(() => generateInitialPosts(100));

  function generateInitialPosts(count: number) {
    // Mảng các hình ảnh công nghệ, hacker, AI cho avatar
    const techImages = [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b', // Tech
      'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1', // Computer
      'https://images.unsplash.com/photo-1677442136019-21780ecad995', // AI
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31', // Circuit
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5', // Matrix
      'https://images.unsplash.com/photo-1516192518150-0d8fee5425e3', // Robot
      'https://images.unsplash.com/photo-1677442136019-21780ecad995', // Neural
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa', // Data
    ];

    // Mảng các hình ảnh blog công nghệ
    const techBlogImages = [
      'https://images.unsplash.com/photo-1518773553398-650c184e0bb3', // Coding
      'https://images.unsplash.com/photo-1562813733-b31f71025d54', // Tech workspace
      'https://images.unsplash.com/photo-1573164713988-8665fc963095', // AI Robot
      'https://images.unsplash.com/photo-1517433670267-08bbd4be890f', // Server room
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa', // Data visualization
      'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe', // Coding screen
      'https://images.unsplash.com/photo-1550439062-609e1531270e', // Tech office
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd', // Cybersecurity
    ];

    return Array.from({ length: count }, (_, index) => ({
      // Unique identifiers
      id: `post-${index + 1}`,
      
      // User info - Sử dụng ảnh công nghệ thay vì avatar ngẫu nhiên
      avatar: `${techImages[index % techImages.length]}?w=150&h=150&fit=crop`,
      author: `TechUser ${index + 1}`,
      
      // Post content
      timestamp: new Date(Date.now() - Math.random() * 7776000000).toISOString(), // Random within 90 days
      content: `This is post ${index + 1}. ${Lorem.generate()}`,
      image: `${techBlogImages[index % techBlogImages.length]}?w=800&h=600&fit=crop`,
      
      // Engagement metrics
      likes: Math.floor(Math.random() * 10000),
      comments: Math.floor(Math.random() * 1000),
      shares: Math.floor(Math.random() * 500),
      
      // Tags
      tags: [
        `tag${index + 1}`,
        'content',
        'social',
        `category${Math.floor(Math.random() * 5) + 1}`,
        `topic${Math.floor(Math.random() * 10) + 1}`
      ],
      
      // Post states
      isLiked: Math.random() > 0.7,
      isBookmarked: Math.random() > 0.8,
      isShared: Math.random() > 0.85,
      isReposted: Math.random() > 0.9,
      isRetweeted: Math.random() > 0.92,
      isQuoted: Math.random() > 0.95,
      isDeleted: false,
      isEdited: Math.random() > 0.8,
      isPinned: index === 0, // First post is pinned
      isArchived: Math.random() > 0.98,
      
      // Forward/Backward states
      forward: Math.random() > 0.5,
      forwardCount: Math.floor(Math.random() * 100),
      backward: Math.random() > 0.5
    }));
  }

  // Sử dụng useInfiniteScroll để cắt lát mảng posts thành từng viewport 30 phần tử
  const [viewportIds, getMore] = useInfiniteScroll(
    undefined, // Không cần tải thêm từ API
    posts.map(post => post.id), // Chuyển danh sách ID của 100 phần tử
    undefined,
    30 // Số phần tử mỗi lát cắt
  );

  // Lọc danh sách posts dựa trên viewportIds hiện tại
  const visiblePosts = viewportIds
    ? posts.filter(post => viewportIds.includes(post.id))
    : posts.slice(0, 30); // Hiển thị 30 phần tử đầu tiên mặc định

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavBar onMobileMenuToggle={toggleSidebar} />
      <LeftColumn isOpen={isSidebarOpen} onClose={toggleSidebar}>
        <div className="scroll-container">
          <InfiniteScroll
            items={viewportIds} // Mảng các ID đang được hiển thị
            withAbsolutePositioning
            onLoadMore={(args) => {
              console.log('LoadMore triggered:', args);
              getMore && getMore(args);
            }}
            itemSelector=".post-item"
            className="space-y-4 p-4 overflow-y-auto max-h-[80vh]"
          >
            {/* Truyền các phần tử đã lọc vào Feed */}
            {visiblePosts.map((post) => (
              <Feed key={post.id} posts={[post]} />
            ))}
          </InfiniteScroll>
        </div>
      </LeftColumn>
      <Button color="primary" size="large" onClick={() => handlePostClick()}>Click me</Button>
    </div>
  );
};

export default Main;
