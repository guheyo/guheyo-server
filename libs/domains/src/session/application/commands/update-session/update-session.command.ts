import { ICommand } from '@nestjs/cqrs';
import { UpdateSessionInput } from './update-session.input';

export class UpdateSessionCommand implements ICommand {
  sessionToken: string;

  expires: Date;

  userId: string;

  constructor(input: UpdateSessionInput) {
    this.sessionToken = input.sessionToken;
    this.expires = input.expires;
    this.userId = input.userId;
  }
}
