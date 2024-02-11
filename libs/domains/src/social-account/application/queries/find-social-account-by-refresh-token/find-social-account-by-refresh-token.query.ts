import { IQuery } from '@nestjs/cqrs';

export class FindSocialAccountByRefreshToken implements IQuery {
  constructor(public readonly refreshToken: string) {}
}
