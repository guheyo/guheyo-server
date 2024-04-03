import { ICommand } from '@nestjs/cqrs';

export class ByIdCommand implements ICommand {
  constructor(public readonly id: string) {}
}
