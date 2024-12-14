import React, { useState } from "react";
import {
  FiSearch,
  FiImage,
  FiBarChart2,
  FiMoreHorizontal,
} from "react-icons/fi";
import { BsChat, BsHeart, BsBookmark, BsShare } from "react-icons/bs";

interface PostProps {
  post: {
    avatar: string;
    author: string;
    timestamp: string;
    content: string;
    image: string;
    comments: number;
    likes: number;
  };
}
// Post Component
const Post = ({ post }: PostProps) => (
  <div className="bg-white rounded-xl shadow-sm p-4">
    <div className="flex space-x-3">
      <img
        src={post.avatar}
        alt={post.author}
        className="h-10 w-10 rounded-full"
      />
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <h2 className="font-medium text-black">{post.author}</h2>
          <span className="text-gray-500 text-sm">{post.timestamp}</span>
        </div>
        <p className="mt-2 text-gray-900">{post.content}</p>
        {post.image && (
          <img
            src={post.image}
            alt="Post attachment"
            className="mt-3 rounded-xl max-h-96 w-full object-cover"
          />
        )}
        <div className="flex items-center space-x-8 mt-4">
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
            <BsChat className="h-4 w-4" />
            <span className="text-sm">{post.comments}</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500">
            <BsHeart className="h-4 w-4" />
            <span className="text-sm">{post.likes}</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
            <BsBookmark className="h-4 w-4" />
          </button>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
            <BsShare className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Post;
