import { ICommand } from '@nestjs/cqrs/dist';
import { UpdateGroupInput } from './update-group.input';

export class UpdateGroupCommand implements ICommand {
  id: string;

  name?: string;

  description?: string;

  icon?: string;

  position?: number;

  constructor(input: UpdateGroupInput) {
    this.id = input.id;
    this.name = input.name;
    this.description = input.description;
    this.icon = input.icon;
    this.position = input.position;
  }
}
