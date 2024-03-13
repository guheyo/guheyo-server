import { CommentRepository } from './adapter/out/persistence/comment.repository';
import { COMMENT_COMMAND_PROVIDERS } from './application/commands/comment.command.providers';
import { COMMENT_QUERY_PROVIDERS } from './application/queries/comment.query.providers';

export const COMMENT_PROVIDERS = [
  {
    provide: 'CommentLoadPort',
    useClass: CommentRepository,
  },
  {
    provide: 'CommentSavePort',
    useClass: CommentRepository,
  },
  ...COMMENT_QUERY_PROVIDERS,
  ...COMMENT_COMMAND_PROVIDERS,
];
