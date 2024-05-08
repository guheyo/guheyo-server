export const parseReactionCanceledTriggerName = ({
  type,
  postId,
}: {
  type: string;
  postId: string;
}) => `reactionCanceled-${type}-${postId}`;
