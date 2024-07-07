import { CreateThreadHandler } from './create-thread/create-thread.handler';
import { UpdateThreadHandler } from './update-thread/update-thread.handler';
import { DeleteThreadHandler } from './delete-thread/delete-thread.handler';

export const THREAD_COMMAND_PROVIDERS = [
  CreateThreadHandler,
  UpdateThreadHandler,
  DeleteThreadHandler,
];
