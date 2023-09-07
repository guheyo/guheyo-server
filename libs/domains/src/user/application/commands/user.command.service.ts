import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UserCreateInput } from './user-create/user.create.input';
import { UserCreateCommand } from './user-create/user.create.command';
import { UserUpdateInput } from './user-update/user.update.input';
import { UserUpdateCommand } from './user-update/user.update.command';
import { UserDeleteInput } from './user-delete/user.delete.input';
import { UserDeleteCommand } from './user-delete/user.delete.command';

@Injectable()
export class UserCommandService {
  constructor(private commandBus: CommandBus) {}

  async create(input: UserCreateInput): Promise<void> {
    return this.commandBus.execute(new UserCreateCommand(input));
  }

  async update(input: UserUpdateInput): Promise<void> {
    return this.commandBus.execute(new UserUpdateCommand(input));
  }

  async delete(input: UserDeleteInput): Promise<void> {
    return this.commandBus.execute(new UserDeleteCommand(input));
  }
}
