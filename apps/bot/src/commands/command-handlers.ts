import { SendMessageHandler } from './communication/send-message.handler';
import { PingHandler } from './info/ping.handler';

export const COMMAND_HANDLERS = [PingHandler, SendMessageHandler];
