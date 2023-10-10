import { CreateMembersOfUserInput } from '@lib/domains/member/application/commands/create-members-of-user/create-members-of-user.input';
import { IEvent } from '@nestjs/cqrs';

export class UserCreatedEvent implements IEvent {
  createMembersOfUserInput: CreateMembersOfUserInput;

  constructor(createMembersOfUserInput: CreateMembersOfUserInput) {
    this.createMembersOfUserInput = createMembersOfUserInput;
  }
}
