import { ICommand } from '@nestjs/cqrs';

export class SocialAccountDeleteCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly provider: string,
    public readonly socialId: string,
  ) {}
}
