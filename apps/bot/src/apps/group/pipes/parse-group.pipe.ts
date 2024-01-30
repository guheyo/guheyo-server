import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ContextOf } from 'necord';
import { GroupResponse } from '@lib/domains/group/application/dtos/group.response';
import { Message } from 'discord.js';
import { GroupClient } from '../clients/group.client';

@Injectable()
export class ParseGroupPipe implements PipeTransform {
  constructor(private readonly groupClient: GroupClient) {}

  async transform(
    [createdOrOldmessage, newMessage]: ContextOf<'messageCreate' | 'messageUpdate'>,
    metadata: ArgumentMetadata,
  ): Promise<GroupResponse> {
    let message: Message;

    if (newMessage) message = await newMessage.fetch();
    else message = await createdOrOldmessage.fetch();

    return this.groupClient.fetchGroupFromMessage(message);
  }
}
