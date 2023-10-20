import { AggregateRoot } from '@nestjs/cqrs';

export class DiscordMessageEntity extends AggregateRoot {
  discordMessageId: string;

  discordChannelId: string;

  discordGuildId: string;

  modelName: string;

  modelId: string;

  guildId: string;

  userId: string;

  system: boolean;

  constructor(partial: Partial<DiscordMessageEntity>) {
    super();
    Object.assign(this, partial);
  }
}
