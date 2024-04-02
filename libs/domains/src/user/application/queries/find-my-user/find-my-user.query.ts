import { IQuery } from '@nestjs/cqrs';

export class FindMyUserQuery implements IQuery {
  userId: string;

  constructor({ userId }: { userId: string }) {
    this.userId = userId;
  }
}
