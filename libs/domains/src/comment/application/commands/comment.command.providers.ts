import { CreateCommentHandler } from './create-comment/create-comment.handler';
import { UpdateCommentHandler } from './update-comment/update-comment.handler';

export const COMMENT_COMMAND_PROVIDERS = [CreateCommentHandler, UpdateCommentHandler];
