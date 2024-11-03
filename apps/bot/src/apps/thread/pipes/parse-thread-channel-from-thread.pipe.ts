import { ArgumentMetadata, Inject, Injectable, PipeTransform } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ContextOf } from 'necord';
import { Message, ThreadChannel } from 'discord.js';
import { DiscordManager } from '@app/bot/shared/discord/discord.manager';
import { DiscordConfigService } from '@app/bot/shared/discord/discord.config.service';
import { DiscordThreadChannel } from '@app/bot/shared/interfaces/discord-server.interface';

@Injectable()
export class ParseThreadChannelFromThreadPipe implements PipeTransform {
  protected discordManager: DiscordManager;

  @Inject()
  readonly discordConfigService: DiscordConfigService;

  async transform(
    [createdOrOldmessage, newMessage]: ContextOf<'messageCreate' | 'messageUpdate'>,
    metadata: ArgumentMetadata,
  ): Promise<DiscordThreadChannel> {
    let message: Message;
    if (newMessage) message = await newMessage.fetch();
    else message = await createdOrOldmessage.fetch();
    if (!message.guild) {
      throw new RpcException(
        `Guild not found. messageId: ${message.id}, channelId: ${message.channelId}`,
      );
    }

    const channel = message.channel as ThreadChannel;
    if (!channel.parent) {
      throw new RpcException(
        `Message parentId. messageId: ${message.id}, channelId: ${message.channelId}`,
      );
    }

    const threadChannel = this.discordConfigService.findThreadChannel(
      '커스텀 키보드',
      channel.parent.name,
    );
    if (!threadChannel) throw new RpcException('ThreadChannel not found');
    return threadChannel;
  }
}
