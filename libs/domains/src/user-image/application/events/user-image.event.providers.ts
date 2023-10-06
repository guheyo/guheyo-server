import { TrackUserImagesHandler } from './track-user-images/track-user-images.handler';
import { UntrackUserImagesHandler } from './untrack-user-images/untrack-user-images.handler';

export const USER_IMAGE_EVENT_PROVIDERS = [TrackUserImagesHandler, UntrackUserImagesHandler];
