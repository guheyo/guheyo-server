import { PingSlashHandler } from './ping/ping.slash-handler';
import { SendMessageSlashHandler } from './send-message/send-message.slash-handler';
import { UpsertRolesSlashHandler } from './upsert-roles/upsert-roles.slash-handler';
import { RegisterDiscordUserSlashHandler } from './register-discord-user/register-discord-user.slash-handler';
import { BulkSaveSellsSlashHandler } from './bulk-save/bulk-save-sells.slash-handler';
import { BulkSaveBuysSlashHandler } from './bulk-save/bulk-save-buys.slash-handler';
import { BulkSaveSwapsSlashHandler } from './bulk-save/bulk-save-swaps.slash-handler';
import { BulkSaveUserReviewsSlashHandler } from './bulk-save/bulk-save-user-reviews.slash-handler';
import { BulkSaveUserReviewCommentsSlashHandler } from './bulk-save/bulk-save-user-review-comments.slash-handler';
import { ConnectUserRolesSlashHandler } from './connect-user-roles/connect-user-roles.slash-handler';
import { FindUserWithoutSocialAccountsCountSlashHandler } from './find-user-without-social-accounts-count/find-user-without-social-accounts-count.slash-handler';
import { BulkConnectUserRolesSlashHandler } from './bulk-connect-user-roles/bulk-connect-user-roles.slash-handler';
import { LinkNonExistingDiscordAccountsSlashHandler } from './link-non-existing-discord-accounts/link-non-existing-discord-accounts.slash-handler';
import { ApplyUserRolesSlashHandler } from './apply-user-roles/apply-user-roles.slash-handler';
import { FindMembersByRolesSlashHandler } from './find-members-by-roles/find-members-by-roles.slash-handler';
import { FindMembersNeedingSocialRoleSlashHandler } from './find-members-needing-social-role/find-members-needing-social-role.slash-handler';
import { ApplySocialRoleSlashHandler } from './apply-social-role/apply-social-role.slash-handler';
import { BulkSaveAuctionsSlashHandler } from './bulk-save/bulk-save-auctions.slash-handler';
import { BulkSaveBidsSlashHandler } from './bulk-save/bulk-save-bids.slash-handler';
import { BulkSaveAuctionCommentsSlashHandler } from './bulk-save/bulk-save-auction-comments.slash-handler';
import { CountPostsSlashHandler } from './count-posts/count-posts.slash-handler';

export const SLASH_HANDLERS = [
  PingSlashHandler,
  SendMessageSlashHandler,
  UpsertRolesSlashHandler,
  RegisterDiscordUserSlashHandler,
  BulkSaveSellsSlashHandler,
  BulkSaveBuysSlashHandler,
  BulkSaveSwapsSlashHandler,
  BulkSaveUserReviewsSlashHandler,
  BulkSaveUserReviewCommentsSlashHandler,
  BulkSaveAuctionsSlashHandler,
  BulkSaveBidsSlashHandler,
  BulkSaveAuctionCommentsSlashHandler,
  ConnectUserRolesSlashHandler,
  FindUserWithoutSocialAccountsCountSlashHandler,
  BulkConnectUserRolesSlashHandler,
  LinkNonExistingDiscordAccountsSlashHandler,
  ApplyUserRolesSlashHandler,
  ApplySocialRoleSlashHandler,
  FindMembersByRolesSlashHandler,
  FindMembersNeedingSocialRoleSlashHandler,
  CountPostsSlashHandler,
];
