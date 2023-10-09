import { CreateUserFromDiscordCommand } from '@lib/domains/user/application/commands/create-user-from-discord/create-user-from-discord.command';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { FindMyUserBySocialAccountQuery } from '@lib/domains/user/application/queries/find-my-user-by-social-account/find-my-user-by-social-account.query';
import { Injectable } from '@nestjs/common';
import { UpdateUserCommand } from '@lib/domains/user/application/commands/update-user/update-user.command';
import { CreateUserFromDiscordInput } from '@lib/domains/user/application/commands/create-user-from-discord/create-user-from-discord.input';
import { UserImageClient } from '../user-image/user-image.client';
import { SimpleUser } from './user.types';

@Injectable()
export class UserClient extends UserImageClient {
  async findUserBySocialAccount(
    provider: string,
    socialId: string,
  ): Promise<MyUserResponse | null> {
    return this.queryBus.execute(
      new FindMyUserBySocialAccountQuery({
        provider,
        socialId,
      }),
    );
  }

  async createUserFromDiscord(input: CreateUserFromDiscordInput): Promise<SimpleUser> {
    await this.commandBus.execute(new CreateUserFromDiscordCommand(input));
    await this.updateUserAvatar(input.id, input.avatarURL);
    return {
      id: input.id,
      username: input.username,
    };
  }

  async updateUserAvatar(userId: string, discordAvatarURL?: string): Promise<void> {
    const url = await this.uploadAndCreateAvatar({ userId, discordAvatarURL });
    await this.commandBus.execute(
      new UpdateUserCommand({
        id: userId,
        avatarURL: url || undefined,
      }),
    );
  }
}
