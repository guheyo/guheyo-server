import { IQuery } from '@nestjs/cqrs';

export class FindSessionQuery implements IQuery {
  sessionToken: string;

  constructor(sessionToken: string) {
    this.sessionToken = sessionToken;
  }
}
