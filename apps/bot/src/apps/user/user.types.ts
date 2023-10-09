import { Message } from 'discord.js';

export interface UserWithMessage {
  user: {
    id: string;
  };

  message: Message;
}
