import { ICommand } from '@nestjs/cqrs/dist';
import { EmbedBuilder } from 'discord.js';

export class SendDiscordWebhookCommand implements ICommand {
  target: string;

  embed: EmbedBuilder;

  constructor({ target, embed }: { target: string; embed: EmbedBuilder }) {
    this.target = target;
    this.embed = embed;
  }
}
