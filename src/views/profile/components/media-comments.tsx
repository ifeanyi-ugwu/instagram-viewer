import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useMediaComments } from "../hooks/use-media-comments";
import type { Media } from "../types";
import { CommentList } from "./comment-list";
import { MediaViewer } from "./media-card";

interface MediaCommentsProps {
  media: Media | null;
  onClose?: () => void;
}

export function MediaComments({ media, onClose }: MediaCommentsProps) {
  const {
    comments,
    commentsLoading,
    commentsError,
    handleAddComment,
    handleAddReply,
  } = useMediaComments(media);

  if (!media) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center md:justify-center flex-col justify-end lg:relative lg:w-1/2 lg:overflow-y-auto lg:h-[85vh]">
      {/* Backdrop blur */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-xl overflow-hidden w-full max-w-5xl h-[80vh] flex flex-col md:flex-row z-50 lg:flex lg:flex-col lg:h-[85vh] lg:rounded-none">
        {/* Media */}
        <div className="bg-black hidden md:flex lg:hidden items-center justify-center w-full md:w-3/5">
          <MediaViewer media={media} className="w-full h-full object-cover" />
        </div>

        {/* Right panel/main comment section on small screens */}
        <div className="w-full md:w-2/5 lg:w-full flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b">
            <Avatar className="w-8 h-8 object-cover border-2">
              <AvatarImage
                //src={media.user.profile_picture_url}
                alt={media.username}
              />
              <AvatarFallback>
                {media.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <p className="font-semibold text-sm">
                {media.username || "username"}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(media.timestamp).toLocaleDateString()}
              </p>
            </div>
            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
              Follow
            </button>
          </div>

          <CommentList
            comments={comments}
            onReply={handleAddReply}
            isLoading={commentsLoading}
            error={commentsError}
          />

          <div className="p-4 border-t border-gray-100">
            <CommentForm onSubmit={handleAddComment} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface CommentFormProps {
  onSubmit: (commentText: string) => void;
}

function CommentForm({ onSubmit }: CommentFormProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newComment.trim()) {
      onSubmit(newComment);
      setNewComment("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Add a comment..."
        className="flex-1 text-sm border-none focus:outline-none"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button
        type="submit"
        disabled={!newComment.trim()}
        className="text-sm font-medium text-blue-500 hover:text-blue-700 disabled:text-blue-300 disabled:pointer-events-none"
      >
        Post
      </button>
    </form>
  );
}
