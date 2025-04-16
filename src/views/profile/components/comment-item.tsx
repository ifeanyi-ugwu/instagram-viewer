import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, X } from "lucide-react";
import { useState } from "react";
import type { Comment } from "../types";
import { Button } from "@/components/ui/button";

interface CommentItemProps {
  comment: Comment;
  isReplying: boolean;
  onReplyClick: (commentId: string) => void;
  onPostReply: (commentId: string, replyText: string) => Promise<void>;
  isSubmittingReply: boolean;
}

export function CommentItem({
  comment,
  isReplying,
  onReplyClick,
  onPostReply,
  isSubmittingReply,
}: CommentItemProps) {
  return (
    <div key={comment.id} className="px-4 py-3">
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage
            //src={comment.from.profile_picture}
            alt={comment.from.username}
          />
          <AvatarFallback>
            {comment.from.username.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <p className="text-sm">
            <span className="font-semibold">{comment.from.username}</span>
            <br />
            {comment.text}
          </p>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-xs text-gray-500">
              {new Date(comment.timestamp).toLocaleDateString()}
            </p>
            <Button
              variant="link"
              className="text-xs text-gray-500 hover:text-gray-900"
              onClick={() => onReplyClick(comment.id)}
            >
              Reply
            </Button>
          </div>

          {isReplying && (
            <ReplyForm
              commentId={comment.id}
              onPostReply={onPostReply}
              isSubmittingReply={isSubmittingReply}
              onCancel={() => onReplyClick(comment.id)}
            />
          )}

          {comment.replies &&
            comment.replies.data &&
            comment.replies.data.length > 0 && (
              <div className="mt-2 ml-6 pl-3 border-l-2 border-gray-100 space-y-3">
                {comment.replies.data.map((reply) => (
                  <div key={reply.id} className="flex items-start gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        //src={reply.from.profile_picture}
                        alt={reply?.from?.username}
                      />
                      <AvatarFallback className="text-xs">
                        {reply?.from?.username?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="text-xs">
                      <span className="font-semibold">
                        {reply?.from?.username}
                      </span>

                      <span className="text-gray-500">
                        &nbsp;{new Date(reply.timestamp).toLocaleDateString()}
                      </span>
                      <br />
                      <p>{reply.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

interface ReplyFormProps {
  commentId: string;
  onPostReply: (commentId: string, replyText: string) => Promise<void>;
  isSubmittingReply: boolean;
  onCancel: () => void;
}

function ReplyForm({
  commentId,
  onPostReply,
  isSubmittingReply,
  onCancel,
}: ReplyFormProps) {
  const [replyText, setReplyText] = useState("");

  const handlePost = async () => {
    await onPostReply(commentId, replyText);
    setReplyText("");
  };

  return (
    <div className="mt-2 flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        className="text-xs text-gray-500"
        onClick={onCancel}
      >
        <X />
      </Button>
      <input
        type="text"
        placeholder="Reply to this comment..."
        className="flex-1 text-sm border rounded-full px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
      />
      <Button
        variant="ghost"
        className="text-sm font-medium text-blue-500 hover:text-blue-700"
        disabled={!replyText.trim() || isSubmittingReply}
        onClick={handlePost}
      >
        {isSubmittingReply ? (
          <>
            Posting...
            <Loader2 className="animate-spin h-4 w-4 text-blue-400" />
          </>
        ) : (
          "Post"
        )}
      </Button>
    </div>
  );
}
