import { PingSlashCommandHandler } from './ping/ping.slash-command-handler';
import { SendMessageSlashCommandHandler } from './send-message/send-message.slash-command-handler';
import { UpsertRolesSlashCommandHandler } from './upsert-roles/upsert-roles.slash-command-handler';
import { RegisterDiscordUserSlashCommandHandler } from './register-discord-user/register-discord-user.slash-command-handler';
import { BulkSaveSellsSlashCommandHandler } from './bulk-save/bulk-save-sells.slash-command.handler';
import { BulkSaveBuysSlashCommandHandler } from './bulk-save/bulk-save-buys.slash-command.handler';
import { BulkSaveSwapsSlashCommandHandler } from './bulk-save/bulk-save-swaps.slash-command.handler';
import { BulkSaveUserReviewsSlashCommandHandler } from './bulk-save/bulk-save-user-reviews.slash-command.handler';
import { BulkSaveUserReviewCommentsSlashCommandHandler } from './bulk-save/bulk-save-user-review-comments.slash-command.handler';
import { ConnectUserRolesSlashCommandHandler } from './connect-user-roles/connect-user-roles.slash-command-handler';
import { FindUserWithoutSocialAccountsCountHandler } from './find-user-without-social-accounts-count/find-user-without-social-accounts-count-command-handler';
import { BulkConnectUserRolesSlashHandler } from './bulk-connect-user-roles/bulk-connect-user-roles.slash-handler';
import { LinkNonExistingDiscordAccountsSlashHandler } from './link-non-existing-discord-accounts/link-non-existing-discord-accounts.slash-handler';
import { ApplyUserRolesSlashHandler } from './apply-user-roles/apply-user-roles.slash-handler';

export const COMMAND_HANDLERS = [
  PingSlashCommandHandler,
  SendMessageSlashCommandHandler,
  UpsertRolesSlashCommandHandler,
  RegisterDiscordUserSlashCommandHandler,
  BulkSaveSellsSlashCommandHandler,
  BulkSaveBuysSlashCommandHandler,
  BulkSaveSwapsSlashCommandHandler,
  BulkSaveUserReviewsSlashCommandHandler,
  BulkSaveUserReviewCommentsSlashCommandHandler,
  ConnectUserRolesSlashCommandHandler,
  FindUserWithoutSocialAccountsCountHandler,
  BulkConnectUserRolesSlashHandler,
  LinkNonExistingDiscordAccountsSlashHandler,
  ApplyUserRolesSlashHandler,
];
