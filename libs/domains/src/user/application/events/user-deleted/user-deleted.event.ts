import { IEvent } from '@nestjs/cqrs';
import { UserDeletedInput } from './user-deleted.input';

export class UserDeletedEvent implements IEvent {
  userId: string;

  username: string;

  avatarURL?: string;

  discordId?: string;

  constructor(input: UserDeletedInput) {
    this.userId = input.userId;
    this.username = input.username;
    this.avatarURL = input.avatarURL;
    this.discordId = input.discordId;
  }
}
