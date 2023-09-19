import { IEvent } from '@nestjs/cqrs/dist';
import { JoinedUserCreatedInput } from './joined-user-created.input';

export class JoinedUserCreatedEvent implements IEvent {
  userId: string;

  socialAccountId: string;

  provider: string;

  socialId: string;

  guildId: string;

  memberId: string;

  roleIds: string[];

  constructor(input: JoinedUserCreatedInput) {
    this.userId = input.userId;
    this.socialAccountId = input.socialAccountId;
    this.provider = input.provider;
    this.socialId = input.socialId;
    this.guildId = input.guildId;
    this.memberId = input.memberId;
    this.roleIds = input.roleIds;
  }
}
