"use client";

import React, { useState, useCallback } from "react";
import MainNavBar from "../main/MainNavBar";
import LeftColumn from "../left/LeftColumn";
import ContentCard from "../ui/ContentCard";
import RightColumn from "../right/RightColumn";
import Post from "../post/Post";
import Feed from "../post/Feed";
import PostCreationBox from "../post/PostCreationBox";
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import InfiniteScroll from "../ui/InfiniteScroll";
import ExampleInfiniteScroll from "./ExampleInfiniteScroll";

const Main: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [allItems, setAllItems] = useState(Array.from({ length: 100 }, (_, i) => i + 1));
  const allPosts = Array.from({ length: 100 }, (_, index) => ({
    id: `${index}`,
    author: `Author ${index}`,
    avatar: "https://images.unsplash.com/photo-1517849845517-e63c2012bf50",
    content: `This is post content ${index}`,
    timestamp: "6h ago",
    likes: Math.floor(Math.random() * 1000),
    comments: Math.floor(Math.random() * 100),
    image: "",
    shares: 0,
    tags: [],
    isLiked: false,
    isBookmarked: false,
    isShared: false,
    isCommented: false,
    isFollowed: false,
    isReported: false,
    isMuted: false,
    isBlocked: false,
    isArchived: false,
    isReposted: false,
    isRetweeted: false,
    isQuoted: false,
    isDeleted: false,
    isEdited: false,
    isPinned: false,
    forward: false,
    forwardCount: 0,
    backward: false
  }));

  const loadMorePosts = ({ offsetId }: { offsetId?: string | number }) => {
    setIsLoading(true);
    const currentIndex = parseInt(offsetId?.toString() || "0");
    
    // Giả lập delay network
    setTimeout(() => {
      // Lấy thêm 20 posts tiếp theo từ allPosts
      const nextPosts = allPosts.slice(currentIndex, currentIndex + 20);
      if (nextPosts.length > 0) {
        // Cập nhật lại allPosts với posts mới
        allPosts.push(...nextPosts);
      }
      setIsLoading(false);
    }, 1000);
  };

  const [viewportIds, getMore] = useInfiniteScroll(
    loadMorePosts,
    allPosts.map(post => post.id),
    false,
    20
  );

  const visiblePosts = allPosts.filter(post => 
    viewportIds?.includes(post.id)
  );

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-app-bg">
      <MainNavBar onMobileMenuToggle={toggleSidebar} />

      <LeftColumn isOpen={isSidebarOpen} onClose={toggleSidebar}>
        <PostCreationBox
          postContent={postContent}
          setPostContent={setPostContent}
        />
        <InfiniteScroll
          items={visiblePosts}
          onLoadMore={({ direction }) => {
            getMore?.({ direction });
          }}
          className="space-y-4"
          maxHeight={800}
        >
          <Feed posts={visiblePosts} />
          {isLoading && (
            <div className="text-center py-4">
              <p className="text-gray-500">Loading more posts...</p>
            </div>
          )}
        </InfiniteScroll>
        <ExampleInfiniteScroll />
      </LeftColumn>

      {/* <div className="fixed top-20 right-4 w-80 transition-all duration-300 hidden xl:block">
        <RightColumn />
      </div> */}
    </div>
  );
};

export default Main;
