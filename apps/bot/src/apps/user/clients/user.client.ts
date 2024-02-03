import { GuildMember, PartialUser, RoleManager, User } from 'discord.js';
import { CreateUserFromDiscordCommand } from '@lib/domains/user/application/commands/create-user-from-discord/create-user-from-discord.command';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { FindMyUserBySocialAccountQuery } from '@lib/domains/user/application/queries/find-my-user-by-social-account/find-my-user-by-social-account.query';
import { Injectable } from '@nestjs/common';
import { UpdateUserCommand } from '@lib/domains/user/application/commands/update-user/update-user.command';
import { CreateUserFromDiscordInput } from '@lib/domains/user/application/commands/create-user-from-discord/create-user-from-discord.input';
import { UpsertRolesCommand } from '@lib/domains/role/application/commands/upsert-roles/upsert-roles.command';
import { ConnectRolesCommand } from '@lib/domains/member/application/commands/connect-roles/connect-roles.command';
import { DisconnectRolesCommand } from '@lib/domains/member/application/commands/disconnect-roles/disconnect-roles.command';
import { UserImageClient } from '../../user-image/clients/user-image.client';
import { SimpleUser } from '../parsers/user.types';
import { UserParser } from '../parsers/user.parser';

@Injectable()
export class UserClient extends UserImageClient {
  constructor(public readonly userParser: UserParser) {
    super();
  }

  async fetchSimpleUser(provider: string, memberOrUser: GuildMember | User): Promise<SimpleUser> {
    const user = await this.findUserBySocialAccount(provider, memberOrUser.id);
    if (user)
      return {
        id: user.id,
        username: user.username,
      };

    let input: CreateUserFromDiscordInput;
    if (memberOrUser instanceof GuildMember) {
      input = this.userParser.parseCreateUserInputFromDiscordMember(memberOrUser as GuildMember);
    } else {
      input = this.userParser.parseCreateUserInputFromDiscordUser(memberOrUser as User);
    }

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

  isUpdatedAvatar(oldUser: PartialUser | User, newUser: User): boolean {
    const oldUserAvatarURL = this.getAvatarURL(oldUser);
    const newUserAvatarURL = this.getAvatarURL(newUser);
    return oldUserAvatarURL !== newUserAvatarURL;
  }

  getAvatarURL(user: PartialUser | User): string {
    return user.avatarURL() || user.displayAvatarURL();
  }

  async upsertRoles(roleManager: RoleManager) {
    const upsertRoleInputs = this.userParser.parseUpsertRolesInput(roleManager);
    const command = new UpsertRolesCommand({
      upsertRoleInputs,
    });
    await this.commandBus.execute(command);
  }

  async connectRoles(memberId: string, roleId: string) {
    await this.commandBus.execute(
      new ConnectRolesCommand({
        id: this.userParser.parseMemberId(memberId),
        roleIds: [this.userParser.parseRoleId(roleId)],
      }),
    );
  }

  async disconnectRoles(memberId: string, roleId: string) {
    await this.commandBus.execute(
      new DisconnectRolesCommand({
        id: this.userParser.parseMemberId(memberId),
        roleIds: [this.userParser.parseRoleId(roleId)],
      }),
    );
  }
}
