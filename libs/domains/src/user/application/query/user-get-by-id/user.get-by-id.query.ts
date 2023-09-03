import { IQuery } from '@nestjs/cqrs';

export class UserGetByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
