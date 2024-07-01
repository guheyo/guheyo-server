import { ArgumentMetadata, Injectable, Logger, PipeTransform } from '@nestjs/common';
import { ContextOf } from 'necord';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { Message, ThreadChannel } from 'discord.js';
import { RpcException } from '@nestjs/microservices';
import { GroupClient } from '../clients/group.client';
import { GroupErrorMessage } from '../parsers/group.error-message';

@Injectable()
export class ParseGroupPipe implements PipeTransform {
  private readonly logger = new Logger(ParseGroupPipe.name);

  constructor(private readonly groupClient: GroupClient) {}

  async transform(
    [createdOrOldmessage, newMessage]: ContextOf<'messageCreate' | 'messageUpdate'>,
    metadata: ArgumentMetadata,
  ): Promise<GroupResponse> {
    let message: Message;

    if (newMessage) message = await newMessage.fetch();
    else message = await createdOrOldmessage.fetch();
    const { channel } = message;

    const isThreadChannel = channel instanceof ThreadChannel;
    const channelId = isThreadChannel ? channel.parentId : channel.id;
    if (!channelId) throw new RpcException(GroupErrorMessage.NOT_FOUND_CHANNEL);

    return this.groupClient.fetchGroupByChannelId(channelId);
  }
}
