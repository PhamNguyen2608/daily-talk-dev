import Post from "./Post";

interface FeedProps {
  posts: {
    id: string;
    avatar: string;
    author: string;
    timestamp: string;
    content: string;
    image: string;
    likes: number;
    comments: number;
    shares: number;
    tags: string[];
    isLiked: boolean;
    isBookmarked: boolean;
    isShared: boolean;
    isReposted: boolean;
    isRetweeted: boolean;
    isQuoted: boolean;
    isDeleted: boolean;
    isEdited: boolean;
    isPinned: boolean;
    isArchived: boolean;
    forward: boolean;
    forwardCount: number;
    backward: boolean;
  }[];
}

const Feed = ({ posts }: FeedProps) => {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;