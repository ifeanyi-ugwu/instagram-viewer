import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import type { Comment, Media } from "../types";
import { organizeComments } from "../utils";

interface PostReplySuccessResponse {
  success: true;
  response: { id: string };
}

interface PostReplyFailureResponse {
  success: false;
  response?: null;
}

type PostReplyResult = PostReplySuccessResponse | PostReplyFailureResponse;

type PostCommentResult = PostReplyResult;

export function useMediaComments(media?: Media | null) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);

  const fetchComments = async (mediaId: string) => {
    setCommentsLoading(true);
    setCommentsError(null);

    try {
      const response = await fetch(`/api/instagram/media/${mediaId}/comments`);

      if (!response.ok) {
        //const errorData = await response.json();
        //console.error("Error fetching comments:", errorData);
        setCommentsError("Failed to fetch comments.");
      } else {
        const data = await response.json();
        //console.log({ data });
        setComments(organizeComments(data.data));
      }
    } catch (error: any) {
      //console.error("Error fetching comments:", error);
      setCommentsError("Failed to fetch comments.");
    } finally {
      setCommentsLoading(false);
    }
  };

  const postCommentToInstagram = async (
    mediaId: string,
    commentText: string
  ): Promise<PostCommentResult> => {
    try {
      const response = await fetch(`/api/instagram/media/${mediaId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: commentText }),
      });

      if (!response.ok) {
        //const errorData = await response.json();
        //console.error("Error posting comment:", errorData);
        return { success: false };
      }
      const data: { id: string } = await response.json();
      //console.log("Comment posted successfully:", data);
      return { success: true, response: data };
    } catch (error: any) {
      //console.error("Error posting comment:", error);
      return { success: false };
    }
  };

  const handleAddComment = async (commentText: string) => {
    if (!media?.id) {
      //console.error("Failed to post comment to Instagram.");
      return;
    }

    if (!session) {
      //console.error("Invalid session")
      return;
    }

    const { success, response } = await postCommentToInstagram(
      media.id,
      commentText
    );

    if (!success) {
      //console.error("Failed to post comment to Instagram.");
      return;
    }

    const newCommentObj = {
      //id: `local-${Date.now()}`,
      id: response.id,
      text: commentText,
      timestamp: new Date().toISOString(),
      from: {
        id: session.user?.name || "me",
        username: session.user?.name || "You",
        // profile_picture: session?.user?.image
      },
      replies: { data: [] },
    };
    setComments((prev) => [newCommentObj, ...prev]);
  };

  const postReplyToInstagram = async (
    commentId: string,
    replyText: string
  ): Promise<PostReplyResult> => {
    try {
      const response = await fetch(
        `/api/instagram/comment/${commentId}/replies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: replyText }),
        }
      );

      if (!response.ok) {
        //const errorData = await response.json();
        //console.error("Error posting reply:", errorData);
        return { success: false, response: null };
      }
      const data: { id: string } = await response.json();
      //console.log("Reply posted successfully:", data);
      return { success: true, response: data };
    } catch (error: any) {
      //console.error("Error posting reply:", error);
      return { success: false, response: null };
    }
  };

  const handleAddReply = async (commentId: string, text: string) => {
    if (!session) {
      //console.error("Invalid session")
      return;
    }

    const { success, response } = await postReplyToInstagram(commentId, text);

    if (!success) {
      //console.error("Failed to post reply to Instagram.");
      return;
    }

    const newReply = {
      //id: `local-reply-${Date.now()}`,
      id: response.id,
      text,
      timestamp: new Date().toISOString(),
      from: {
        id: session.user?.id || "me",
        username: session.user?.name || "You",
        //profile_picture: session?.user?.image
      },
      parent_id: commentId,
    };

    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? {
              ...c,
              replies: {
                ...(c.replies || {}),
                data: [...(c.replies?.data || []), newReply],
              },
            }
          : c
      )
    );
  };

  useEffect(() => {
    if (media?.id) {
      fetchComments(media.id);
    }
  }, [media?.id]);

  return {
    comments,
    commentsLoading,
    commentsError,
    handleAddReply,
    handleAddComment,
  };
}
