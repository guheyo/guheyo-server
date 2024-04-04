import { ICommand } from '@nestjs/cqrs/dist';
import { ColorResolvable } from 'discord.js';

export class SendDiscordWebhookCommand implements ICommand {
  title: string;

  color: ColorResolvable;

  username: string;

  avatarURL?: string;

  url: string;

  constructor({
    title,
    color,
    username,
    avatarURL,
    url,
  }: {
    title: string;
    color: ColorResolvable;
    username: string;
    avatarURL?: string;
    url: string;
  }) {
    this.title = title;
    this.color = color;
    this.username = username;
    this.avatarURL = avatarURL;
    this.url = url;
  }
}
