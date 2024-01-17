import { IQuery } from '@nestjs/cqrs';

export class FindMyUserByUsernameQuery implements IQuery {
  username: string;

  constructor(username: string) {
    this.username = username;
  }
}
