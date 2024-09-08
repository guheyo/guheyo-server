import { FollowBrandHandler } from './follow-brand/follow-brand.handler';
import { UnfollowBrandHandler } from './unfollow-brand/unfollow-brand.handler';

export const BRAND_COMMAND_PROVIDERS = [FollowBrandHandler, UnfollowBrandHandler];
