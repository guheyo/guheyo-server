import { IQuery } from '@nestjs/cqrs';
import { FindMyUserBySessionArgs } from './find-my-user-by-session.args';

export class FindMyUserBySessionQuery implements IQuery {
  sessionToken: string;

  constructor(args: FindMyUserBySessionArgs) {
    this.sessionToken = args.sessionToken;
  }
}
