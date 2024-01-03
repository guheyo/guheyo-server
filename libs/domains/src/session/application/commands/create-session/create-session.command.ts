import { ICommand } from '@nestjs/cqrs';
import { CreateSessionInput } from './create-session.input';

export class CreateSessionCommand implements ICommand {
  id: string;

  sessionToken: string;

  expires: Date;

  userId: string;

  constructor(input: CreateSessionInput) {
    this.id = input.id;
    this.sessionToken = input.sessionToken;
    this.expires = input.expires;
    this.userId = input.userId;
  }
}
