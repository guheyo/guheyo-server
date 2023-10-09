import { ImageService } from '@lib/shared';
import { UserImageClient } from './user-image.client';
import { UserImageParser } from './user-image.parser';

export const BOT_USER_IMAGE_PROVIDERS = [ImageService, UserImageClient, UserImageParser];
