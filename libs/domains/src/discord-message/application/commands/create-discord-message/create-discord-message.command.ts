import { ICommand } from '@nestjs/cqrs';
import { CreateDiscordMessageInput } from './create-discord-message.input';

export class CreateDiscordMessageCommand implements ICommand {
  discordMessageId?: string;

  discordChannelId: string;

  discordGuildId: string;

  modelName: string;

  modelId: string;

  guildId: string;

  constructor(input: CreateDiscordMessageInput) {
    this.discordMessageId = input.discordMessageId;
    this.discordChannelId = input.discordChannelId;
    this.discordGuildId = input.discordGuildId;
    this.modelName = input.modelName;
    this.modelId = input.modelId;
    this.guildId = input.guildId;
  }
}
