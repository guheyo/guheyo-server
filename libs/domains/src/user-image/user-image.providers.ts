import { UserImageRepository } from './adapter/out/persistence/user-image.repository';
import { USER_IMAGE_COMMAND_PROVIDERS } from './application/commands/user-image-command.providers';
import { USER_IMAGE_EVENT_PROVIDERS } from './application/events/user-image.event.providers';
import { USER_IMAGE_QUERY_PROVIDERS } from './application/queries/user-image.query.providers';

export const USER_IMAGE_PROVIDERS = [
  {
    provide: 'UserImageLoadPort',
    useClass: UserImageRepository,
  },
  {
    provide: 'UserImageSavePort',
    useClass: UserImageRepository,
  },
  ...USER_IMAGE_QUERY_PROVIDERS,
  ...USER_IMAGE_EVENT_PROVIDERS,
  ...USER_IMAGE_COMMAND_PROVIDERS,
];
