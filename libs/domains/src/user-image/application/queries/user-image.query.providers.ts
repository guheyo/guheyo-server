import { FindUserImagesOfRefHandler } from './find-user-iamges-of-ref/find-user-images-of-ref.handler';
import { FindUserImageByIdHandler } from './find-user-image-by-id/find-user-image-by-id.handler';

export const USER_IMAGE_QUERY_PROVIDERS = [FindUserImageByIdHandler, FindUserImagesOfRefHandler];
