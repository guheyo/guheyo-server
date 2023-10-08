import { PingSlashCommandHandler } from './ping/ping.slash-command-handler';
import { SendMessageSlashCommandHandler } from './send-message/send-message.slash-command-handler';
import { UpsertRolesSlashCommandHandler } from './upsert-roles/upsert-roles.slash-command-handler';
import { RegisterDiscordUserSlashCommandHandler } from './register-discord-user/register-discord-user.slash-command-handler';

export const COMMAND_HANDLERS = [
  PingSlashCommandHandler,
  SendMessageSlashCommandHandler,
  UpsertRolesSlashCommandHandler,
  RegisterDiscordUserSlashCommandHandler,
];
