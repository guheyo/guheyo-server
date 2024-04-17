import { ConnectRolesHandler } from '@lib/domains/member/application/commands/connect-roles/connect-roles.handler';
import { PingSlashCommandHandler } from './ping/ping.slash-command-handler';
import { SendMessageSlashCommandHandler } from './send-message/send-message.slash-command-handler';
import { UpsertRolesSlashCommandHandler } from './upsert-roles/upsert-roles.slash-command-handler';
import { RegisterDiscordUserSlashCommandHandler } from './register-discord-user/register-discord-user.slash-command-handler';
import { BulkSaveSellsSlashCommandHandler } from './bulk-save/bulk-save-sells.slash-command.handler';
import { BulkSaveBuysSlashCommandHandler } from './bulk-save/bulk-save-buys.slash-command.handler';
import { BulkSaveSwapsSlashCommandHandler } from './bulk-save/bulk-save-swaps.slash-command.handler';

export const COMMAND_HANDLERS = [
  PingSlashCommandHandler,
  SendMessageSlashCommandHandler,
  UpsertRolesSlashCommandHandler,
  RegisterDiscordUserSlashCommandHandler,
  BulkSaveSellsSlashCommandHandler,
  BulkSaveBuysSlashCommandHandler,
  BulkSaveSwapsSlashCommandHandler,
  ConnectRolesHandler,
];
