export const parseReactionCreatedTriggerName = ({
  type,
  postId,
}: {
  type: string;
  postId: string;
}) => `reactionCreated-${type}-${postId}`;
