import { IQuery } from '@nestjs/cqrs/dist';
import { FindMemberByUserAndGroupArgs } from './find-member-by-user-and-group.args';

export class FindMemberByUserAndGroupQuery implements IQuery {
  userId: string;

  groupId: string;

  constructor(args: FindMemberByUserAndGroupArgs) {
    this.userId = args.userId;
    this.groupId = args.groupId;
  }
}
