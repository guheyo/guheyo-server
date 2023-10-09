import { IEvent } from '@nestjs/cqrs';

export class UserUpdatedEvent implements IEvent {
  userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }
}
