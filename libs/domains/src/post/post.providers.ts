import { PostRepository } from './adapter/out/persistence/post.repository';
import { POST_COMMAND_PROVIDERS } from './application/commands/post.command.providers';
import { POST_EVENT_PROVIDERS } from './application/events/post.event.providers';
import { PostSagas } from './application/sagas/post.sagas';

export const POST_PROVIDERS = [
  {
    provide: 'PostLoadPort',
    useClass: PostRepository,
  },
  {
    provide: 'PostSavePort',
    useClass: PostRepository,
  },
  ...POST_COMMAND_PROVIDERS,
  ...POST_EVENT_PROVIDERS,
  PostSagas,
];
