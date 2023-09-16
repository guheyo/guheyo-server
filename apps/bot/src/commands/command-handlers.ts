import { PingSlashCommandHandler } from './info/ping.slash-command-handler';
import { SendMessageSlashCommandHandler } from './communication/send-message.slash-command-handler';
import { RegisterUserSlashCommandHandler } from './operation/register-user.slash-command-handler';

export const COMMAND_HANDLERS = [
  PingSlashCommandHandler,
  SendMessageSlashCommandHandler,
  RegisterUserSlashCommandHandler,
];
