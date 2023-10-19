import { ICommand } from '@nestjs/cqrs';
import { AuthorEntity } from '@lib/domains/discord-message/domain/author.entity';
import { SendEmbedInput } from './send-embed.input';

export class SendEmbedCommand implements ICommand {
  discordChannelId: string;

  discordGuildId: string;

  modelName: string;

  modelId: string;

  guildId: string;

  color: number;

  title: string;

  author: AuthorEntity;

  description: string;

  constructor(input: SendEmbedInput) {
    this.discordChannelId = input.discordChannelId;
    this.discordGuildId = input.discordGuildId;
    this.modelName = input.modelName;
    this.modelId = input.modelId;
    this.guildId = input.guildId;
    this.color = input.color;
    this.title = input.title;
    this.author = input.author;
    this.description = input.description;
  }
}
