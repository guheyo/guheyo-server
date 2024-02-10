import { GuildMember, PartialUser, RoleManager, User } from 'discord.js';
import { UserResponse } from '@lib/domains/user/application/dtos/user.response';
import { FindUserQuery } from '@lib/domains/user/application/queries/find-user/find-user.query';
import { Injectable } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';
import { UpsertRolesCommand } from '@lib/domains/role/application/commands/upsert-roles/upsert-roles.command';
import { ConnectRolesCommand } from '@lib/domains/member/application/commands/connect-roles/connect-roles.command';
import { DisconnectRolesCommand } from '@lib/domains/member/application/commands/disconnect-roles/disconnect-roles.command';
import { SignInUserCommand } from '@lib/domains/user/application/commands/sign-in-user/sign-in-user.command';
import { UpdateUserCommand } from '@lib/domains/user/application/commands/update-user/update-user.command';
import { MemberResponse } from '@lib/domains/member/application/dtos/member.response';
import { FindMemberQuery } from '@lib/domains/member/application/queries/find-member-by-user-and-group/find-member.query';
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
    if (user) return user;

    const discordUser = memberOrUser instanceof GuildMember ? memberOrUser.user : memberOrUser;
    const input = this.userParser.parseSignInUserInput(provider, discordUser);
    await this.commandBus.execute(
      new SignInUserCommand({
        ...input,
        id: uuid4(),
      }),
    );
    const newUser = await this.queryBus.execute(
      new FindUserQuery({
        provider,
        socialId: memberOrUser.id,
      }),
    );

    if (memberOrUser instanceof GuildMember) {
      const roleNames = this.userParser.parseRoleNames(memberOrUser);
      await this.connectRoles(newUser.id, roleNames);
    }
    return {
      id: newUser.id,
      username: newUser.username,
    };
  }

  async findUserBySocialAccount(provider: string, socialId: string): Promise<UserResponse | null> {
    return this.queryBus.execute(
      new FindUserQuery({
        provider,
        socialId,
      }),
    );
  }

  async findMember(userId: string): Promise<MemberResponse | null> {
    return this.queryBus.execute(
      new FindMemberQuery({
        userId,
        groupId: this.userParser.parseRootGroupId(),
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

  async updateUserAvatar(userId: string, discordUser: User | PartialUser): Promise<void> {
    const avatarURL = this.getAvatarURL(discordUser);
    const url = await this.imageService.uploadFileFromURL(avatarURL, 'avatar', userId);
    await this.commandBus.execute(
      new UpdateUserCommand({
        id: userId,
        avatarURL: url || undefined,
      }),
    );
  }

  async upsertRoles(roleManager: RoleManager) {
    const upsertRoleInputs = this.userParser.parseUpsertRolesInput(roleManager);
    const command = new UpsertRolesCommand({
      upsertRoleInputs,
    });
    await this.commandBus.execute(command);
  }

  async connectRoles(userId: string, roleNames: string[]) {
    await this.commandBus.execute(
      new ConnectRolesCommand({
        groupId: this.userParser.parseRootGroupId(),
        userId,
        roleIds: [],
        roleNames,
      }),
    );
  }

  async disconnectRoles(memberId: string, roleNames: string[]) {
    await this.commandBus.execute(
      new DisconnectRolesCommand({
        id: memberId,
        roleIds: [],
        roleNames,
      }),
    );
  }
}
