import React from "react";
import { FiImage, FiBarChart2 } from "react-icons/fi";

interface PostCreationBoxProps {
  postContent: string;
  setPostContent: (content: string) => void;
}

const PostCreationBox: React.FC<PostCreationBoxProps> = ({ postContent, setPostContent }) => (
  <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
    <textarea
      value={postContent}
      onChange={(e) => setPostContent(e.target.value)}
      className="w-full resize-none border-0 focus:ring-0 text-lg placeholder-gray-400"
      rows={3}
      placeholder="What is happening?!"
    ></textarea>
    <div className="flex items-center justify-between pt-3 border-t">
      <div className="flex space-x-4">
        <button className="text-blue-500 hover:bg-blue-50 p-2 rounded-full">
          <FiImage className="h-5 w-5" />
        </button>
        <button className="text-blue-500 hover:bg-blue-50 p-2 rounded-full">
          <FiBarChart2 className="h-5 w-5" />
        </button>
      </div>
      <button className="px-4 py-2 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors">
        Post
      </button>
    </div>
  </div>
);

export default PostCreationBox;