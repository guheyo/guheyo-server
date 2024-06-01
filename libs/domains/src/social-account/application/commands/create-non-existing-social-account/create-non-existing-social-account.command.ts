import { ICommand } from '@nestjs/cqrs';
import { CreateNonExistingSocialAccountInput } from './create-non-existing-social-account.input';

export class CreateNonExistingSocialAccountCommand implements ICommand {
  provider: string;

  socialId: string;

  username: string;

  constructor(input: CreateNonExistingSocialAccountInput) {
    this.provider = input.provider;
    this.socialId = input.socialId;
    this.username = input.username;
  }
}
