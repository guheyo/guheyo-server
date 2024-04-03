import { ConnectRolesHandler } from '@lib/domains/member/application/commands/connect-roles/connect-roles.handler';
import { PingSlashCommandHandler } from './ping/ping.slash-command-handler';
import { SendMessageSlashCommandHandler } from './send-message/send-message.slash-command-handler';
import { UpsertRolesSlashCommandHandler } from './upsert-roles/upsert-roles.slash-command-handler';
import { RegisterDiscordUserSlashCommandHandler } from './register-discord-user/register-discord-user.slash-command-handler';
import { BulkSaveOffersSlashCommandHandler } from './bulk-save/bulk-save-offers.slash-command.handler';
import { BulkSaveDemandsSlashCommandHandler } from './bulk-save/bulk-save-demands.slash-command.handler';
import { BulkSaveSwapsSlashCommandHandler } from './bulk-save/bulk-save-swaps.slash-command.handler';

export const COMMAND_HANDLERS = [
  PingSlashCommandHandler,
  SendMessageSlashCommandHandler,
  UpsertRolesSlashCommandHandler,
  RegisterDiscordUserSlashCommandHandler,
  BulkSaveOffersSlashCommandHandler,
  BulkSaveDemandsSlashCommandHandler,
  BulkSaveSwapsSlashCommandHandler,
  ConnectRolesHandler,
];
