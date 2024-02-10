import { IQuery } from '@nestjs/cqrs/dist';
import { FindMemberArgs } from './find-member.args';

export class FindMemberQuery implements IQuery {
  userId: string;

  groupId: string;

  constructor(args: FindMemberArgs) {
    this.userId = args.userId;
    this.groupId = args.groupId;
  }
}
