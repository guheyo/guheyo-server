import { UserParser } from '@app/bot/apps/user/user.parser';
import { CreateUserFromDiscordCommand } from '@lib/domains/user/application/commands/create-user-from-discord/create-user-from-discord.command';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { FindMyUserBySocialAccountQuery } from '@lib/domains/user/application/queries/find-my-user-by-social-account/find-my-user-by-social-account.query';
import { Inject, Injectable } from '@nestjs/common';
import { GuildMember } from 'discord.js';
import { UpdateUserCommand } from '@lib/domains/user/application/commands/update-user/update-user.command';
import { UserImageClient } from '../user-image/user-image.client';

@Injectable()
export class UserClient extends UserImageClient {
  @Inject() private readonly userParser: UserParser;

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

  async createUserFromDiscord(member: GuildMember): Promise<string> {
    const userId = this.userParser.generateUUID();
    const input = this.userParser.parseCreateUserFromDiscordInput(userId, member);
    await this.commandBus.execute(new CreateUserFromDiscordCommand(input));

    const discordAvatarURL = member.avatarURL() || member.displayAvatarURL();
    if (discordAvatarURL) {
      await this.uploadAndUpdateAvatar(userId, discordAvatarURL);
    }
    return userId;
  }

  async uploadAndUpdateAvatar(userId: string, discordAvatarURL: string) {
    const imageId = this.userParser.generateUUID();
    const { url, contentType, name } = await this.uploadAvatar({
      userId,
      imageId,
      discordAvatarURL,
    });
    await this.createAvatarImage({
      id: imageId,
      name,
      url,
      contentType: contentType || undefined,
      userId,
    });
    await this.commandBus.execute(
      new UpdateUserCommand({
        id: userId,
        avatarURL: url,
      }),
    );
  }
}
