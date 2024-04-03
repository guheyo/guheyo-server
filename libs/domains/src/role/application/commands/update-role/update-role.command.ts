import { ICommand } from '@nestjs/cqrs/dist';
import { UpdateRoleInput } from './update-role.input';

export class UpdateRoleCommand implements ICommand {
  id: string;

  name?: string;

  position?: number;

  hexColor?: string;

  constructor(input: UpdateRoleInput) {
    this.id = input.id;
    this.name = input.name;
    this.position = input.position;
    this.hexColor = input.hexColor;
  }
}
