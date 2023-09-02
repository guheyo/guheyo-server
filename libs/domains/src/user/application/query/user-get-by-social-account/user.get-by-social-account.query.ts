import { IQuery } from '@nestjs/cqrs';

export class UserGetBySocialAccountQuery implements IQuery {
  constructor(
    public readonly provider: string,
    public readonly socialId: string,
  ) {}
}
