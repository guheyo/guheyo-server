import { IQuery } from '@nestjs/cqrs';
import { FindEmojisArgs } from './find-emojis.args';

export class FindEmojisQuery implements IQuery {
  groupId?: string;

  constructor(args: FindEmojisArgs) {
    this.groupId = args.groupId;
  }
}
