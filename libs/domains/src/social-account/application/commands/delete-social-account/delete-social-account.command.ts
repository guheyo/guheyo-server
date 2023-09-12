import { ICommand } from '@nestjs/cqrs';
import { DeleteSocialAccountInput } from './delete-social-account.input';

export class DeleteSocialAccountCommand implements ICommand {
  id: string;

  constructor(input: DeleteSocialAccountInput) {
    this.id = input.id;
  }
}
