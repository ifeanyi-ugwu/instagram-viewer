import type { Comment } from "./types";

// Function to organize comments into a parent-child structure
// this was created because of an inconsistency in the instagram api structure
// i.e, it returns replies as top level comments and even if i returned the replies edge, it would miss the
// from object entirely (perhaps it's a depth limit from instagram)
export const organizeComments = (commentsList: Comment[]): Comment[] => {
  // First, create a map of all comments by ID for easy lookup
  const commentsMap = new Map();

  // Create new comment objects with proper structure
  commentsList.forEach((comment) => {
    commentsMap.set(comment.id, {
      ...comment,
      replies: { data: [] }, // Initialize empty replies array for all comments
    });
  });

  // Now separate top-level comments and replies
  const topLevelComments: Comment[] = [];

  commentsList.forEach((comment) => {
    const processedComment = commentsMap.get(comment.id);

    // If it has a parent_id, it's a reply - add it to its parent's replies
    if (comment.parent_id) {
      const parent = commentsMap.get(comment.parent_id);
      if (parent) {
        parent.replies.data.push(processedComment);
      } else {
        // If parent not found, treat as top-level comment
        topLevelComments.push(processedComment);
      }
    } else {
      // It's a top-level comment
      topLevelComments.push(processedComment);
    }
  });

  return topLevelComments;
};
