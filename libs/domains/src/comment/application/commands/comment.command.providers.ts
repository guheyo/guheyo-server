import { CreateCommentHandler } from './create-comment/create-comment.handler';
import { DeleteCommentHandler } from './delete-comment/delete-comment.handler';
import { UpdateCommentHandler } from './update-comment/update-comment.handler';

export const COMMENT_COMMAND_PROVIDERS = [
  CreateCommentHandler,
  UpdateCommentHandler,
  DeleteCommentHandler,
];
