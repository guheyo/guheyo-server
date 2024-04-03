import { CreateUserImageHandler } from './create-user-image/create-user-image.handler';
import { CreateManyUserImageHandler } from './create-many-user-image/create-many-user-image.handler';
import { DeleteUserImageHandler } from './delete-user-image/delete-user-image.handler';
import { UpdateUserImageHandler } from './update-user-image/update-user-image.handler';
import { TrackUserImagesHandler } from './track-user-images/track-user-images.handler';
import { UntrackUserImagesHandler } from './untrack-user-images/untrack-user-images.handler';
import { UploadAndCreateImageHandler } from './upload-and-create-image/upload-and-create-image.handler';
import { CreateSignedUrlHandler } from './create-signed-url/create-signed-url.handler';

export const USER_IMAGE_COMMAND_PROVIDERS = [
  CreateUserImageHandler,
  CreateManyUserImageHandler,
  UpdateUserImageHandler,
  DeleteUserImageHandler,
  TrackUserImagesHandler,
  UntrackUserImagesHandler,
  UploadAndCreateImageHandler,
  CreateSignedUrlHandler,
];
