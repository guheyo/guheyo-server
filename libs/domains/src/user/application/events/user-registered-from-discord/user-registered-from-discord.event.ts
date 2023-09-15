import { UserRegisteredFromDisocrdInput } from './user-registered-from-discord.input';

export class UserRegisteredFromDiscordEvent {
  userId: string;

  username: string;

  socialAccountId: string;

  provider: string;

  socialId: string;

  guildId: string;

  memberId: string;

  roleIds: string[];

  constructor(input: UserRegisteredFromDisocrdInput) {
    this.userId = input.userId;
    this.username = input.username;
    this.socialAccountId = input.socialAccountId;
    this.provider = input.provider;
    this.socialId = input.socialId;
    this.guildId = input.guildId;
    this.memberId = input.memberId;
    this.roleIds = input.roleIds;
  }
}
