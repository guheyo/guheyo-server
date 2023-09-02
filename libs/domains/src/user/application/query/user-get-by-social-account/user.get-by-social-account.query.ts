import { ICommand } from '@nestjs/cqrs';

export class UserGetBySocialAccountQuery implements ICommand {
  constructor(
    public readonly provider: string,
    public readonly socialId: string,
  ) {}
}
