import { DiscordMessageEntity } from '@lib/domains/discord-message/domain/discord-message.entity';
import { PrismaRepository } from '@lib/shared/cqrs/repositories/prisma-repository';
import { Injectable } from '@nestjs/common';
import { pick } from 'lodash';

@Injectable()
export class DiscordMessageRepository extends PrismaRepository<DiscordMessageEntity> {
  constructor() {
    super(DiscordMessageEntity);
  }

  async findById(id: string): Promise<DiscordMessageEntity | null> {
    const discordMessage = await this.prismaService.discordMessage.findUnique({
      where: {
        discordMessageId: id,
      },
    });
    return this.toEntity(discordMessage);
  }

  async create(discordMessage: DiscordMessageEntity): Promise<void> {
    await this.prismaService.discordMessage.create({
      data: pick(discordMessage, [
        'discordMessageId',
        'discordChannelId',
        'discordGuildId',
        'modelName',
        'modelId',
        'guildId',
        'userId',
        'system',
      ]),
    });
  }

  async createMany(discordMessages: DiscordMessageEntity[]): Promise<void> {
    await this.prismaService.discordMessage.createMany({
      data: discordMessages.map((discordMessage) =>
        pick(discordMessage, [
          'discordMessageId',
          'discordChannelId',
          'discordGuildId',
          'modelName',
          'modelId',
          'guildId',
          'userId',
          'system',
        ]),
      ),
    });
  }

  async save(discordMessage: DiscordMessageEntity): Promise<void> {
    await this.prismaService.discordMessage.update({
      where: {
        discordMessageId: discordMessage.discordMessageId,
      },
      data: pick(discordMessage, ['modelId', 'modelName']),
    });
  }

  async delete(discordMessage: DiscordMessageEntity): Promise<void> {
    await this.prismaService.discordMessage.delete({
      where: {
        discordMessageId: discordMessage.discordMessageId,
      },
    });
  }
}
