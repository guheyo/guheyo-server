import { UserClient } from '@app/bot/apps/user/user.client';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ContextOf } from 'necord';
import { UserWithMessage } from '@app/bot/apps/user/user.types';
import { UserErrorMessage } from '@app/bot/apps/user/user.error-message';
import { UserParser } from '@app/bot/apps/user/user.parser';

@Injectable()
export class UserWithMessagePipe implements PipeTransform {
  constructor(
    private readonly userClient: UserClient,
    private readonly userParser: UserParser,
  ) {}

  async transform(
    [message]: ContextOf<'messageCreate'>,
    metadata: ArgumentMetadata,
  ): Promise<UserWithMessage> {
    const discordMember = message.member;
    if (!discordMember) throw new RpcException(UserErrorMessage.DISOCRD_MEMBER_NOT_FOUND);

    const user = await this.userClient.findUserBySocialAccount('discord', discordMember.id);
    if (user)
      return {
        user: {
          id: user.id,
          username: user.username,
        },
        message,
      };

    const input = this.userParser.parseCreateUserFromDiscordInput(discordMember);
    return {
      user: await this.userClient.createUserFromDiscord(input),
      message,
    };
  }
}
