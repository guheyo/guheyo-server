import { Message } from 'discord.js';

export interface PostMessage {
  title: string;
  tagNames: string[];
  message: Message;
}
