import { Skeleton } from "@/components/ui/skeleton";
import { Film, Heart, MessageCircle } from "lucide-react";
import type { Media } from "../types";

interface MediaCardProps {
  media: Media;
  onClick?: () => void;
}

export function MediaCard({ media, onClick }: MediaCardProps) {
  return (
    <div
      className="cursor-pointer overflow-hidden rounded-md bg-gray-100 shadow-sm"
      onClick={onClick}
    >
      <div className="aspect-square w-full relative">
        <MediaViewer media={media} className="w-full h-full object-cover" />

        {media.media_type === "VIDEO" && (
          <div className="absolute top-2 right-2">
            <Film className="w-5 h-5 text-white drop-shadow-md" />
          </div>
        )}
      </div>

      <div className="p-3">
        <div className="flex items-center gap-3 text-sm mb-3">
          <span className="flex items-center">
            <Heart className="w-4 h-4 mr-1" />
            {media.like_count || 0}
          </span>
          <span className="flex items-center">
            <MessageCircle className="w-4 h-4 mr-1" />
            {media.comments_count || 0}
          </span>
        </div>

        {media.caption && <p className="text-sm">{media.caption}</p>}
      </div>
    </div>
  );
}

interface MediaViewerProps {
  media: Media;
  className?: string;
}

export function MediaViewer({ media, className = "" }: MediaViewerProps) {
  if (!media) return null;

  return (
    <div
      className={`w-full h-full bg-black flex items-center justify-center ${className}`}
    >
      {media.media_type === "VIDEO" ? (
        <video
          src={media.media_url}
          controls
          autoPlay
          muted
          className="w-full h-full object-contain"
        />
      ) : (
        <img
          src={media.media_url}
          alt={media.caption || "Post image"}
          className="w-full h-full object-contain"
        />
      )}
    </div>
  );
}

export function MediaCardSkeleton() {
  return (
    <div className="w-full rounded-lg overflow-hidden animate-pulse shadow-sm">
      {/* Media card header */}
      <div className="p-3 bg-white flex items-center gap-2">
        <Skeleton className="w-8 h-8 rounded-full bg-gray-200" />

        <div className="flex-1">
          <Skeleton className="w-24 h-4 bg-gray-200 mb-1" />
          <Skeleton className="w-16 h-3 bg-gray-200" />
        </div>
      </div>
      {/* Media placeholder */}
      <Skeleton className="aspect-square bg-gray-200" />
      {/* Media actions */}
      <div className="p-3 bg-white">
        <div className="flex justify-between mb-2">
          <div className="flex gap-3">
            <Skeleton className="w-6 h-6 bg-gray-200" />
            <Skeleton className="w-6 h-6 bg-gray-200" />
            <Skeleton className="w-6 h-6 bg-gray-200" />
          </div>
          <Skeleton className="w-6 h-6 bg-gray-200" />
        </div>
        <Skeleton className="w-20 h-4 bg-gray-200 mb-1" />
        <Skeleton className="w-full h-4 bg-gray-200" />
      </div>
    </div>
  );
}
