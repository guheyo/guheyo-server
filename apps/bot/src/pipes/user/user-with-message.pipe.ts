import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ContextOf } from 'necord';
import { UserClient } from '../../clients/user/user.client';
import { UserWithMessageType } from './user.types';

@Injectable()
export class UserWithMessagePipe implements PipeTransform {
  constructor(private readonly userClient: UserClient) {}

  async transform(
    [message]: ContextOf<'messageCreate'>,
    metadata: ArgumentMetadata,
  ): Promise<UserWithMessageType> {
    const discordUser = message.member!.user;
    const user = await this.userClient.findUserBySocialAccount('discord', discordUser.id);
    if (user)
      return {
        user: {
          id: user.id,
        },
        message,
      };

    const newUserId = await this.userClient.createUser(
      discordUser.username,
      discordUser.avatarURL() || undefined,
    );

    await this.userClient.linkSocialAccount(discordUser.id, newUserId);
    return {
      user: {
        id: newUserId,
      },
      message,
    };
  }
}
