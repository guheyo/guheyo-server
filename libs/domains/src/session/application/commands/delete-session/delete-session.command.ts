import { ICommand } from '@nestjs/cqrs';

export class DeleteSessionCommand implements ICommand {
  sessionToken: string;

  constructor(sessionToken: string) {
    this.sessionToken = sessionToken;
  }
}
