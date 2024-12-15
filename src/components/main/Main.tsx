"use client";

import React, { useState, useCallback } from "react";
import MainNavBar from "./MainNavBar";
import LeftColumn from "../left/LeftColumn";
import Feed from "../post/Feed";
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import InfiniteScroll from "../ui/InfiniteScroll";

const Main: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const Lorem = {
    words: [
      "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
      "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
      "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
      "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea",
      "commodo", "consequat"
    ],
    generate: function () {
      const length = Math.floor(Math.random() * 20) + 10; // 10-30 words
      return Array.from({ length }, () =>
        this.words[Math.floor(Math.random() * this.words.length)]
      ).join(' ');
    }
  };
  const posts = Array.from({ length: 100 }, (_, index) => ({
    id: `post-${index + 1}`,
    avatar: `https://i.pravatar.cc/150?img=${(index % 70) + 1}`,
    author: `User ${index + 1}`,
    timestamp: new Date(Date.now() - Math.random() * 7776000000).toISOString(), // Random date within last 90 days
    content: `This is post number ${index + 1}. ${Lorem.generate()} #content #post${index + 1}`,
    image: `https://picsum.photos/seed/${index + 1}/400/300`,
    likes: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 100),
    shares: Math.floor(Math.random() * 50),
    tags: [
      `tag${index + 1}`,
      'content',
      'social',
      `category${Math.floor(Math.random() * 5) + 1}`
    ],
    isLiked: Math.random() > 0.5,
    isBookmarked: Math.random() > 0.7,
    isShared: Math.random() > 0.8,
    isReposted: Math.random() > 0.85,
    isRetweeted: Math.random() > 0.9,
    isQuoted: Math.random() > 0.95,
    isDeleted: false,
    isEdited: Math.random() > 0.8,
    isPinned: index === 0, // First post is pinned
    isArchived: false,
    forward: Math.random() > 0.5,
    forwardCount: Math.floor(Math.random() * 20),
    backward: Math.random() > 0.5
  }));
  const [viewportIds, getMore] = useInfiniteScroll(
    undefined, 
    posts.map(post => post.id), 
    undefined, 
    20
  );

  // Lọc posts dựa trên viewportIds
  const visiblePosts = viewportIds 
    ? posts.filter(post => viewportIds.includes(post.id))
    : posts.slice(0, 10);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <MainNavBar onMobileMenuToggle={toggleSidebar} />
      <LeftColumn isOpen={isSidebarOpen} onClose={toggleSidebar}>
        <div className="scroll-container"> 
          <InfiniteScroll
            items={viewportIds}
            withAbsolutePositioning
            onLoadMore={getMore}
            itemSelector=".post-item"
            className="space-y-4 p-4 overflow-y-auto max-h-[80vh]"
          >
            <Feed posts={visiblePosts} />
          </InfiniteScroll>
        </div>
      </LeftColumn>
    </div>
  );
};

export default Main;
