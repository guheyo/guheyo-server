import { CreateUserImageHandler } from './create-user-image/create-user-image.handler';
import { CreateManyUserImageHandler } from './create-many-user-image/create-many-user-image.handler';
import { DeleteUserImageHandler } from './delete-user-image/delete-user-image.handler';
import { UpdateUserImageHandler } from './update-user-image/update-user-image.handler';

export const USER_IMAGE_COMMAND_PROVIDERS = [
  CreateUserImageHandler,
  CreateManyUserImageHandler,
  UpdateUserImageHandler,
  DeleteUserImageHandler,
];
