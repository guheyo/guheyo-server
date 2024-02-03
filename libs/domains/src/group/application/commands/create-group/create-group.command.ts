import { ICommand } from '@nestjs/cqrs/dist';
import { CreateGroupInput } from './create-group.input';

export class CreateGroupCommand implements ICommand {
  id: string;

  name: string;

  description?: string;

  icon?: string;

  position: number;

  constructor(input: CreateGroupInput) {
    this.id = input.id;
    this.name = input.name;
    this.description = input.description;
    this.icon = input.icon;
    this.position = input.position;
  }
}