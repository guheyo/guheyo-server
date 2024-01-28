import { GuildMember } from 'discord.js';
import { CreateUserFromDiscordCommand } from '@lib/domains/user/application/commands/create-user-from-discord/create-user-from-discord.command';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { FindMyUserBySocialAccountQuery } from '@lib/domains/user/application/queries/find-my-user-by-social-account/find-my-user-by-social-account.query';
import { Injectable } from '@nestjs/common';
import { UpdateUserCommand } from '@lib/domains/user/application/commands/update-user/update-user.command';
import { CreateUserFromDiscordInput } from '@lib/domains/user/application/commands/create-user-from-discord/create-user-from-discord.input';
import { UserImageClient } from '../../user-image/clients/user-image.client';
import { SimpleUser } from '../parsers/user.types';
import { UserParser } from '../parsers/user.parser';

@Injectable()
export class UserClient extends UserImageClient {
  constructor(public readonly userParser: UserParser) {
    super();
  }

  async fetchSimpleUser(provider: string, member: GuildMember): Promise<SimpleUser> {
    const user = await this.findUserBySocialAccount(provider, member.id);
    if (user)
      return {
        id: user.id,
        username: user.username,
      };

    const input = this.userParser.parseCreateUserFromDiscordInput(member);
    await this.createUserFromDiscord(input);
    return {
      id: input.id,
      username: input.username,
    };
  }

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

  async createUserFromDiscord(input: CreateUserFromDiscordInput): Promise<void> {
    await this.commandBus.execute(new CreateUserFromDiscordCommand(input));
    await this.updateUserAvatar(input.id, input.avatarURL);
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
