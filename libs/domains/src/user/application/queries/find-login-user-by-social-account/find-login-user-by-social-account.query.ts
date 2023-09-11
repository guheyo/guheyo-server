import { IQuery } from '@nestjs/cqrs';

export class FindLoginUserBySocialAccountQuery implements IQuery {
  constructor(
    public readonly provider: string,
    public readonly socialId: string,
  ) {}
}
