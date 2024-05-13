import { ICommand } from '@nestjs/cqrs/dist';
import { ColorResolvable } from 'discord.js';

export class SendDiscordWebhookCommand implements ICommand {
  target: string;

  title: string;

  color: ColorResolvable;

  username: string;

  avatarURL?: string;

  url: string;

  constructor({
    target,
    title,
    color,
    username,
    avatarURL,
    url,
  }: {
    target: string;
    title: string;
    color: ColorResolvable;
    username: string;
    avatarURL?: string;
    url: string;
  }) {
    this.target = target;
    this.title = title;
    this.color = color;
    this.username = username;
    this.avatarURL = avatarURL;
    this.url = url;
  }
}
