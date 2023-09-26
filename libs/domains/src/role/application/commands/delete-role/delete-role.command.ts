import { ICommand } from '@nestjs/cqrs/dist';
import { DeleteRoleArgs } from './delete-role.args';

export class DeleteRoleCommand implements ICommand {
  id: string;

  constructor(args: DeleteRoleArgs) {
    this.id = args.id;
  }
}
