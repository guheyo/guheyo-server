import { Message } from 'discord.js';

export interface UserWithMessageType {
  user: {
    id: string;
  };

  message: Message;
}
