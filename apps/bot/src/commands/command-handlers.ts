import { PingSlashCommandHandler } from './ping/ping.slash-command-handler';
import { SendMessageSlashCommandHandler } from './send-message/send-message.slash-command-handler';
import { RegisterUserSlashCommandHandler } from './register-user/register-user.slash-command-handler';

export const COMMAND_HANDLERS = [
  PingSlashCommandHandler,
  SendMessageSlashCommandHandler,
  RegisterUserSlashCommandHandler,
];
