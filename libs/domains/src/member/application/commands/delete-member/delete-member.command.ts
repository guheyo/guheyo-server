import { ICommand } from '@nestjs/cqrs/dist';
import { DeleteMemberArgs } from './delete-member.args';

export class DeleteMemberCommand implements ICommand {
  id: string;

  userId: string;

  constructor(args: DeleteMemberArgs) {
    this.id = args.id;
    this.userId = args.userId;
  }
}
