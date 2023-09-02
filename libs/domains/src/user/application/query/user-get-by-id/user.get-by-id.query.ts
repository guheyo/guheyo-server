import { ICommand } from '@nestjs/cqrs';

export class UserGetByIdQuery implements ICommand {
  constructor(public readonly id: string) {}
}
