import { ICommand } from '@nestjs/cqrs/dist';
import { UpdateGuildInput } from './update-guild.input';

export class UpdateGuildCommand implements ICommand {
  id: string;

  name?: string;

  description?: string;

  icon?: string;

  rank?: number;

  constructor(input: UpdateGuildInput) {
    this.id = input.id;
    this.name = input.name;
    this.description = input.description;
    this.icon = input.icon;
    this.rank = input.rank;
  }
}
