import { ICommand } from '@nestjs/cqrs';
import { SocialAccountDeleteInput } from './social-account.delete.input';

export class SocialAccountDeleteCommand implements ICommand {
  id: string;

  constructor(input: SocialAccountDeleteInput) {
    this.id = input.id;
  }
}
