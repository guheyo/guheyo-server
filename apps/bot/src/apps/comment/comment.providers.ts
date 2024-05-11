import { CommentClient } from './clients/comment.client';
import { CommentParser } from './parsers/comment.parser';

export const BOT_COMMENT_PROVIDERS = [CommentClient, CommentParser];
