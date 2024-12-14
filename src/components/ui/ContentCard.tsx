import React, { memo, useState } from "react";
import Image from "next/image";
import { FiHeart, FiMessageSquare, FiShare2, FiBookmark } from "react-icons/fi";

interface Author {
  name: string;
  avatar: string;
  bio: string;
}

interface ContentCardProps {
  author: Author;
  title: string;
  content: string;
  timestamp: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  onSelect?: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({
  author,
  title,
  content,
  timestamp,
  image,
  likes,
  comments,
  shares,
  onSelect
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div 
      className="rounded-xl p-4 bg-app-bgSecondary hover:bg-[#333333] transition-colors cursor-pointer"
      onClick={onSelect}
    >
      {/* Author Info */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="relative w-10 h-10">
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold text-app-text">{author.name}</h3>
          <p className="text-sm text-app-textSecondary">{timestamp}</p>
        </div>
      </div>

      {/* Content */}
      <h2 className="text-xl font-bold mb-2 text-app-text">{title}</h2>
      <p className="mb-4 text-app-textSecondary">{content}</p>

      {/* Image */}
      {image && (
        <div className="relative w-full h-48 mb-4">
          <Image
            src={image}
            alt={title}
            fill
            className="rounded-lg object-cover"
          />
        </div>
      )}

      {/* Interactions */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className={`flex items-center space-x-1 ${
              isLiked ? "text-app-accent" : "text-app-textSecondary"
            }`}
          >
            <FiHeart className="w-5 h-5" />
            <span>{likes}</span>
          </button>
          <button className="flex items-center space-x-1 text-app-textSecondary">
            <FiMessageSquare className="w-5 h-5" />
            <span>{comments}</span>
          </button>
          <button className="flex items-center space-x-1 text-app-textSecondary">
            <FiShare2 className="w-5 h-5" />
            <span>{shares}</span>
          </button>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsBookmarked(!isBookmarked);
          }}
          className={isBookmarked ? "text-app-accent" : "text-app-textSecondary"}
        >
          <FiBookmark className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default memo(ContentCard);
