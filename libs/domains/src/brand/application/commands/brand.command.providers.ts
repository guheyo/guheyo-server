import { CreateBrandHandler } from './create-brand/create-brand.handler';
import { FollowBrandHandler } from './follow-brand/follow-brand.handler';
import { UnfollowBrandHandler } from './unfollow-brand/unfollow-brand.handler';
import { UpsertBrandsFromCsvHandler } from './upsert-brands-from-csv/upsert-brands-from-csv.handler';

export const BRAND_COMMAND_PROVIDERS = [
  FollowBrandHandler,
  UnfollowBrandHandler,
  CreateBrandHandler,
  UpsertBrandsFromCsvHandler,
];
