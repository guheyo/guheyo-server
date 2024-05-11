import { Message, ThreadChannel } from 'discord.js';

export interface ThreadPost {
  threadChannel: ThreadChannel;
  tagNames: string[];
  starterMessage: Message;
}
