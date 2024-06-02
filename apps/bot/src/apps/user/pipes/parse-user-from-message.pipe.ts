import { UserClient } from '@app/bot/apps/user/clients/user.client';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ContextOf } from 'necord';
import { UserErrorMessage } from '@app/bot/apps/user/parsers/user.error-message';
import { Message } from 'discord.js';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';

@Injectable()
export class ParseUserFromMessagePipe implements PipeTransform {
  constructor(private readonly userClient: UserClient) {}

  async transform(
    [createdOrOldmessage, newMessage]: ContextOf<'messageCreate' | 'messageUpdate'>,
    metadata: ArgumentMetadata,
  ): Promise<MyUserResponse> {
    let message: Message;
    if (newMessage) message = await newMessage.fetch();
    else message = await createdOrOldmessage.fetch();

    const { member } = message;
    if (!member) throw new RpcException(UserErrorMessage.DISOCRD_MEMBER_NOT_FOUND);
    return this.userClient.fetchMyUser('discord', member);
  }
}
