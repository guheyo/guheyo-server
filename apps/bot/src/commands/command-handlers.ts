import { PingSlashCommandHandler } from './info/ping.slash-command-handler';
import { SendMessageSlashCommandHandler } from './communication/send-message.slash-command-handler';

export const COMMAND_HANDLERS = [PingSlashCommandHandler, SendMessageSlashCommandHandler];
