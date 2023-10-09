import { ICommand } from '@nestjs/cqrs/dist';
import { CreateUserFromDiscordInput } from './create-user-from-discord.input';

export class CreateUserFromDiscordCommand implements ICommand {
  id: string;

  username: string;

  avatarURL?: string;

  socialAccountId: string;

  provider: string;

  socialId: string;

  guildId: string;

  memberId: string;

  roleIds: string[];

  constructor(input: CreateUserFromDiscordInput) {
    this.id = input.id;
    this.username = input.username;
    this.avatarURL = input.avatarURL;
    this.socialAccountId = input.socialAccountId;
    this.provider = input.provider;
    this.socialId = input.socialId;
    this.guildId = input.guildId;
    this.memberId = input.memberId;
    this.roleIds = input.roleIds;
  }
}
