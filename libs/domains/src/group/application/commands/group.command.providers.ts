import { CreateGroupHandler } from './create-group/create-group.handler';
import { UpdateGroupHandler } from './update-group/update-group.handler';
import { DeleteGroupHandler } from './delete-group/delete-group.handler';

export const GROUP_COMMAND_PROVIDERS = [CreateGroupHandler, UpdateGroupHandler, DeleteGroupHandler];
