import { ICommand } from '@nestjs/cqrs/dist';
import { CreateRoleInput } from './create-role.input';

export class CreateRoleCommand implements ICommand {
  id: string;

  name: string;

  rank?: number;

  hexColor: string;

  guildId: string;

  constructor(input: CreateRoleInput) {
    this.id = input.id;
    this.name = input.name;
    this.rank = input.rank;
    this.hexColor = input.hexColor;
    this.guildId = input.guildId;
  }
}
