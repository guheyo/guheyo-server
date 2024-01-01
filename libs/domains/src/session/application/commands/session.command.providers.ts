import { CreateSessionHandler } from './create-session/create-session.handler';
import { DeleteSessionHandler } from './delete-session/delete-session.handler';
import { UpdateSessionHandler } from './update-session/update-session.handler';

export const SESSION_COMMAND_PROVIDERS = [
  CreateSessionHandler,
  UpdateSessionHandler,
  DeleteSessionHandler,
];
