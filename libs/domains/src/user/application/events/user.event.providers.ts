import { UserjoinedHandler } from './user-joined/user-joined.handler';
import { JoinedUserCreatedHandler } from './joined-user-created/joined-user-created.handler';

export const USER_EVENT_PROVIDERS = [UserjoinedHandler, JoinedUserCreatedHandler];
