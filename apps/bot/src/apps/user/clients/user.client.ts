import { GuildMember, PartialUser, RoleManager, User } from 'discord.js';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';
import { UpsertRolesCommand } from '@lib/domains/role/application/commands/upsert-roles/upsert-roles.command';
import { SignInUserCommand } from '@lib/domains/user/application/commands/sign-in-user/sign-in-user.command';
import { UpdateUserCommand } from '@lib/domains/user/application/commands/update-user/update-user.command';
import { CreateUserImageCommand } from '@lib/domains/user-image/application/commands/create-user-image/create-user-image.command';
import { FindMyUserQuery } from '@lib/domains/user/application/queries/find-my-user/find-my-user.query';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { ConnectRolesCommand } from '@lib/domains/user/application/commands/connect-roles/connect-roles.command';
import { DisconnectRolesCommand } from '@lib/domains/user/application/commands/disconnect-roles/disconnect-roles.command';
import { UserImageClient } from '../../user-image/clients/user-image.client';
import { UserParser } from '../parsers/user.parser';
import { UserErrorMessage } from '../parsers/user.error-message';

@Injectable()
export class UserClient extends UserImageClient {
  constructor(public readonly userParser: UserParser) {
    super();
  }

  async fetchMyUser(provider: string, memberOrUser: GuildMember | User): Promise<MyUserResponse> {
    const user = await this.findMyUser(provider, memberOrUser.id);
    if (user) return user;

    const discordUser = memberOrUser instanceof GuildMember ? memberOrUser.user : memberOrUser;
    const input = this.userParser.parseSignInUserInput(provider, discordUser);
    await this.commandBus.execute(
      new SignInUserCommand({
        ...input,
        id: uuid4(),
      }),
    );
    const newUser = await this.findMyUser(provider, memberOrUser.id);
    if (!newUser) throw new NotFoundException(UserErrorMessage.USER_NOT_FOUND);

    if (memberOrUser instanceof GuildMember) {
      const roleNames = this.userParser.parseRoleNames(memberOrUser);
      await this.connectRoles(newUser.id, roleNames);
    }
    return newUser;
  }

  async findMyUser(provider: string, socialId: string): Promise<MyUserResponse | null> {
    return this.queryBus.execute(
      new FindMyUserQuery({
        provider,
        socialId,
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
    const url = await this.imageService.uploadFileFromURL({
      url: avatarURL,
      type: 'avatar',
      userId,
    });
    const createUserImageInput = this.userImageParser.parseCreateUserImageInputFromUrl({
      id: uuid4(),
      name: this.imageService.parseNameFromURL(url),
      url,
      contentType: this.imageService.parseMimeType(url),
      userId,
    });
    await this.commandBus.execute(
      new CreateUserImageCommand(new CreateUserImageCommand(createUserImageInput)),
    );
    await this.commandBus.execute(
      new UpdateUserCommand({
        id: userId,
        avatarURL: url,
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
        input: {
          roleIds: [],
          roleNames,
        },
        userId,
      }),
    );
  }

  async disconnectRoles(userId: string, roleNames: string[]) {
    await this.commandBus.execute(
      new DisconnectRolesCommand({
        input: {
          roleIds: [],
          roleNames,
        },
        userId,
      }),
    );
  }

  async connectUserRoles(userId: string, discordMember: GuildMember): Promise<string[]> {
    const roleNames = this.userParser.parseRoleNames(discordMember);
    await this.connectRoles(userId, roleNames);
    return roleNames;
  }
}
