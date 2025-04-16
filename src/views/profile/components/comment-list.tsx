import { Skeleton } from "@/components/ui/skeleton";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { CommentItem } from "./comment-item";
import type { Comment } from "../types";

interface CommentListProps {
  comments: Comment[];
  onReply: (commentId: string, replyText: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function CommentList({
  comments,
  onReply,
  isLoading,
  error,
}: CommentListProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  const handlePostReply = async (commentId: string, text: string) => {
    if (!text.trim()) return;
    setIsSubmittingReply(true);
    await onReply(commentId, text);
    setReplyingTo(null);
    setIsSubmittingReply(false);
  };

  const handleReplyClick = (commentId: string) => {
    if (isSubmittingReply) return;
    setReplyingTo(commentId === replyingTo ? null : commentId);
  };

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
              <Skeleton className="h-4 w-[150px] ml-10" />
            </div>
          ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-4 text-red-500 text-center">
        <p>Error loading comments:</p>
        <p className="font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {comments.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No comments yet.</p>
          <p className="text-sm">Be the first to comment!</p>
        </div>
      ) : (
        <div className="py-2">
          {comments
            //.filter((comment) => !comment.parent_id)
            .map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                isReplying={replyingTo === comment.id}
                onReplyClick={handleReplyClick}
                onPostReply={handlePostReply}
                isSubmittingReply={isSubmittingReply}
              />
            ))}
        </div>
      )}
    </div>
  );
}
