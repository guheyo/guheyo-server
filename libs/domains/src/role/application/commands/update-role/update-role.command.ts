import { ICommand } from '@nestjs/cqrs/dist';
import { UpdateRoleInput } from './update-role.input';

export class UpdateRoleCommand implements ICommand {
  id: string;

  name?: string;

  rank?: number;

  hexColor?: string;

  constructor(input: UpdateRoleInput) {
    this.id = input.id;
    this.name = input.name;
    this.rank = input.rank;
    this.hexColor = input.hexColor;
  }
}
