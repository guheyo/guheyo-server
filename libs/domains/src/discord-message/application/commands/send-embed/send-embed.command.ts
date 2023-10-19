import { ICommand } from '@nestjs/cqrs';
import { SendEmbedInput } from './send-embed.input';
import { AuthorInput } from '../../dtos/author.input';

export class SendEmbedCommand implements ICommand {
  discordChannelId: string;

  discordGuildId: string;

  modelName: string;

  modelId: string;

  guildId: string;

  color: number;

  title: string;

  authorInput: AuthorInput;

  description: string;

  constructor(input: SendEmbedInput) {
    this.discordChannelId = input.discordChannelId;
    this.discordGuildId = input.discordGuildId;
    this.modelName = input.modelName;
    this.modelId = input.modelId;
    this.guildId = input.guildId;
    this.color = input.color;
    this.title = input.title;
    this.authorInput = input.authorInput;
    this.description = input.description;
  }
}
