import { ICommand } from '@nestjs/cqrs/dist';
import { CreateJoinedUserInput } from './create-joined-user.input';

export class CreateJoinedUserCommand implements ICommand {
  userId: string;

  username: string;

  avatarURL?: string;

  socialAccountId: string;

  provider: string;

  socialId: string;

  guildId: string;

  memberId: string;

  roleIds: string[];

  constructor(input: CreateJoinedUserInput) {
    this.userId = input.userId;
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
