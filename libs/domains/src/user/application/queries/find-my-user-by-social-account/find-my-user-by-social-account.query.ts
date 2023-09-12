import { IQuery } from '@nestjs/cqrs';

export class FindMyUserBySocialAccountQuery implements IQuery {
  constructor(
    public readonly provider: string,
    public readonly socialId: string,
  ) {}
}
