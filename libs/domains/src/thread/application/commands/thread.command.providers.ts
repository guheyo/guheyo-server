import { CreateThreadHandler } from './create-thread/create-thread.handler';
import { DeleteThreadHandler } from './delete-thread/delete-thread.handler';

export const THREAD_COMMAND_PROVIDERS = [CreateThreadHandler, DeleteThreadHandler];
