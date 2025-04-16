import { useUserFeed } from "../hooks/use-user-feed";
import { Media } from "../types";
import { MediaCard, MediaCardSkeleton } from "./media-card";

interface UserFeedProps {
  onFeedClick: (feed: Media) => void;
}

export function UserFeed({ onFeedClick }: UserFeedProps) {
  const { feed, feedLoading, feedError } = useUserFeed();

  if (feedLoading) {
    return <UserFeedSkeleton />;
  }

  if (feedError) {
    return <div className="text-red-500">{feedError}</div>;
  }

  if (feed.length === 0) {
    return <div className="text-gray-500 text-center py-6">No posts yet.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {feed.map((item) => (
        <MediaCard
          key={item.id}
          media={item}
          onClick={() => onFeedClick(item)}
        />
      ))}
    </div>
  );
}

function UserFeedSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {Array(9)
        .fill(0)
        .map((_, i) => (
          <MediaCardSkeleton key={i} />
        ))}
    </div>
  );
}
