import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { UserCreateInput } from '@lib/domains/user/application/commands/user-create/user.create.input';
import { UserCreateCommand } from '@lib/domains/user/application/commands/user-create/user.create.command';
import { UserUpdateInput } from '@lib/domains/user/application/commands/user-update/user.update.input';
import { UserUpdateCommand } from '@lib/domains/user/application/commands/user-update/user.update.command';
import { UserDeleteInput } from '@lib/domains/user/application/commands/user-delete/user.delete.input';
import { UserDeleteCommand } from '@lib/domains/user/application/commands/user-delete/user.delete.command';

@Resolver()
export class UserResolver {
  constructor(private readonly commandBus: CommandBus) {}

  // TODO: implement getUserById using userQueryService
  @Query(() => String)
  async getUserById(@Args('id') id: string) {
    return 'hello world';
  }

  @Mutation(() => String)
  async createUser(@Args('input') input: UserCreateInput): Promise<String> {
    await this.commandBus.execute(new UserCreateCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async updateUser(@Args('input') input: UserUpdateInput): Promise<String> {
    await this.commandBus.execute(new UserUpdateCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async deleteUser(@Args('input') input: UserDeleteInput): Promise<String> {
    await this.commandBus.execute(new UserDeleteCommand(input));
    return input.id;
  }
}
