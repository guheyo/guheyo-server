export const parseReactionCanceledTriggerName = ({
  postId,
  commentId,
}: {
  postId?: string;
  commentId?: string;
}) => (postId ? `reactionCanceled-post-${postId}` : `reactionCanceled-comment-${commentId}`);
