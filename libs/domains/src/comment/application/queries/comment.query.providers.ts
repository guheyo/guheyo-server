import { FindCommentCountHandler } from './find-comment-count/find-comment-count.handler';
import { FindCommentHandler } from './find-comment/find-comment.handler';
import { FindCommentsHandler } from './find-comments/find-comments.handler';

export const COMMENT_QUERY_PROVIDERS = [
  FindCommentHandler,
  FindCommentsHandler,
  FindCommentCountHandler,
];
