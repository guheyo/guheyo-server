export const parseReactionCreatedTriggerName = ({
  postId,
  commentId,
}: {
  postId?: string;
  commentId?: string;
}) => (postId ? `reactionCreated-post-${postId}` : `reactionCreated-comment-${commentId}`);
