import { ICommand } from '@nestjs/cqrs/dist';
import { CreateRoleInput } from './create-role.input';

export class CreateRoleCommand implements ICommand {
  id: string;

  name: string;

  position: number;

  hexColor: string;

  guildId: string;

  constructor(input: CreateRoleInput) {
    this.id = input.id;
    this.name = input.name;
    this.position = input.position;
    this.hexColor = input.hexColor;
    this.guildId = input.guildId;
  }
}
