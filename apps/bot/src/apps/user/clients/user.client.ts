import { Collection, GuildMember, PartialUser, Role, RoleManager, User } from 'discord.js';
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';
import pLimit from 'p-limit';
import { UpsertRolesCommand } from '@lib/domains/role/application/commands/upsert-roles/upsert-roles.command';
import { SignInUserCommand } from '@lib/domains/user/application/commands/sign-in-user/sign-in-user.command';
import { UpdateUserCommand } from '@lib/domains/user/application/commands/update-user/update-user.command';
import { CreateUserImageCommand } from '@lib/domains/user-image/application/commands/create-user-image/create-user-image.command';
import { FindMyUserQuery } from '@lib/domains/user/application/queries/find-my-user/find-my-user.query';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { ConnectRolesCommand } from '@lib/domains/user/application/commands/connect-roles/connect-roles.command';
import { DisconnectRolesCommand } from '@lib/domains/user/application/commands/disconnect-roles/disconnect-roles.command';
import { FindUserWithoutSocialAccountsCountQuery } from '@lib/domains/user/application/queries/find-user-without-social-accounts-count/find-user-without-social-accounts-count.query';
import { NonExistingSocialAccountsResponse } from '@lib/domains/social-account/application/dtos/non-existing-social-accounts.response';
import { FindNonExistingSocialAccountsQuery } from '@lib/domains/social-account/application/queries/find-non-existing-social-accounts/find-non-existing-social-accounts.query';
import { SocialUserArgs } from '@lib/domains/social-account/application/queries/find-non-existing-social-accounts/social-user.args';
import { CreateNonExistingSocialAccountCommand } from '@lib/domains/social-account/application/commands/create-non-existing-social-account/create-non-existing-social-account.command';
import { CreateNonExistingSocialAccountInput } from '@lib/domains/social-account/application/commands/create-non-existing-social-account/create-non-existing-social-account.input';
import { UserImageClient } from '../../user-image/clients/user-image.client';
import { UserParser } from '../parsers/user.parser';
import { UserErrorMessage } from '../parsers/user.error-message';
import { MyUserWithMember } from '../interfaces/user.interfaces';

@Injectable()
export class UserClient extends UserImageClient {
  private concurrencyLimit: pLimit.Limit;

  constructor(public readonly userParser: UserParser) {
    super();
    this.concurrencyLimit = pLimit(25);
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

  async fetchMyUserWithMembers(
    provider: string,
    members: GuildMember[],
  ): Promise<MyUserWithMember[]> {
    const userWithMemberPromises = members.map((member) =>
      this.concurrencyLimit(async () => {
        try {
          const user = await this.fetchMyUser(provider, member);
          return {
            user,
            member,
          };
        } catch (e) {
          return null;
        }
      }),
    );
    const userWithMembers = await Promise.all(userWithMemberPromises);
    return userWithMembers.filter(
      (userWithMember): userWithMember is MyUserWithMember => userWithMember !== null,
    );
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
      type: 'avatar',
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

  async bulkConnectUserRoles(userWithMembers: MyUserWithMember[]): Promise<number[]> {
    const connectedRoleCountPromises = userWithMembers.map((userWithMember) =>
      this.concurrencyLimit(async () => {
        try {
          const roleNames = await this.connectUserRoles(
            userWithMember.user.id,
            userWithMember.member,
          );
          return roleNames.length;
        } catch (e) {
          return null;
        }
      }),
    );
    const connectedRoleCounts = await Promise.all(connectedRoleCountPromises);
    return connectedRoleCounts.filter((count): count is number => count !== null);
  }

  async findUserWithoutSocialAccountsCount(providers: string[]): Promise<number> {
    return this.queryBus.execute(
      new FindUserWithoutSocialAccountsCountQuery({
        args: {
          providers,
        },
      }),
    );
  }

  async findNonExistingSocialAccounts(
    socialUsers: SocialUserArgs[],
  ): Promise<NonExistingSocialAccountsResponse> {
    return this.queryBus.execute(new FindNonExistingSocialAccountsQuery({ socialUsers }));
  }

  async createNonExistingSocialAccounts(
    socialAccountInputs: CreateNonExistingSocialAccountInput[],
  ): Promise<string[]> {
    const socialAccountIdPromises = socialAccountInputs.map((socialAccountInput) =>
      this.concurrencyLimit(async () => {
        try {
          const socialAccount = await this.commandBus.execute(
            new CreateNonExistingSocialAccountCommand(socialAccountInput),
          );
          if (!socialAccount) return null;
          return socialAccount.id;
        } catch (e) {
          return null;
        }
      }),
    );
    const socialAccountIds = await Promise.all(socialAccountIdPromises);
    return socialAccountIds.filter(
      (socialAccountId): socialAccountId is string => socialAccountId !== null,
    );
  }

  async applyUserRoles(
    userWithMembers: MyUserWithMember[],
    roles: Collection<string, Role>,
  ): Promise<GuildMember[]> {
    const memberPromises = userWithMembers.map(async (userWithMember) =>
      this.concurrencyLimit(async () => {
        try {
          const { user, member } = userWithMember;
          const userRoleNames = user.roles.map((role) => role.name);
          const userRoles = roles.filter((role) => userRoleNames.includes(role.name));
          const rolesToApply = userRoles.subtract(member.roles.cache);
          return await member.roles.add(rolesToApply);
        } catch (e) {
          return null;
        }
      }),
    );
    const members = await Promise.all(memberPromises);
    return members.filter((member): member is GuildMember => !!member);
  }

  async applySocialAuthRole(
    userWithMembers: MyUserWithMember[],
    provider: string,
    roles: Collection<string, Role>,
  ): Promise<GuildMember[]> {
    let socialAuthRole: Role | undefined;

    if (provider === 'kakao') {
      socialAuthRole = roles.find((role) => role.name === '카카오 인증');
    }

    const socialLinkedUserWithMembers = userWithMembers.filter((userWithMember) =>
      userWithMember.user.socialAccounts.find(
        (socialAccount) => socialAccount.provider === provider,
      ),
    );

    const memberPromises = socialLinkedUserWithMembers.map(async (userWithMember) =>
      this.concurrencyLimit(async () => {
        try {
          if (socialAuthRole) {
            const { member } = userWithMember;
            if (member.roles.cache.has(socialAuthRole.id)) return null;

            return await member.roles.add(socialAuthRole);
          }
          return null;
        } catch (e) {
          return null;
        }
      }),
    );
    const members = await Promise.all(memberPromises);
    return members.filter((member): member is GuildMember => !!member);
  }

  filterMembersByRoles(members: GuildMember[], roles: Role[]): GuildMember[] {
    return members.filter((member) =>
      roles.map((role) => role.id).every((roleId) => member.roles.cache.has(roleId)),
    );
  }
}
