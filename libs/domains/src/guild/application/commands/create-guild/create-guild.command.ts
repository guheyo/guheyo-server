import { ICommand } from '@nestjs/cqrs/dist';
import { CreateGuildInput } from './create-guild.input';

export class CreateGuildCommand implements ICommand {
  id: string;

  name: string;

  description?: string;

  icon?: string;

  rank?: number;

  constructor(input: CreateGuildInput) {
    this.id = input.id;
    this.name = input.name;
    this.description = input.description;
    this.icon = input.icon;
    this.rank = input.rank;
  }
}
