import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserCommandService } from '@lib/domains/user/application/commands/user.command.service';
import { UserCreateInput } from '@lib/domains/user/application/commands/user-create/user.create.input';
import { UserUpdateInput } from '@lib/domains/user/application/commands/user-update/user.update.input';
import { UserDeleteInput } from '@lib/domains/user/application/commands/user-delete/user.delete.input';

@Resolver()
export class UserResolver {
  constructor(private readonly userCommandService: UserCommandService) {}

  // TODO: implement getUserById using userQueryService
  @Query(() => String)
  async getUserById(@Args('id') id: string) {
    return 'hello world';
  }

  @Mutation(() => String)
  async createUser(@Args('input') input: UserCreateInput): Promise<String> {
    await this.userCommandService.create(input);
    return input.id;
  }

  @Mutation(() => String)
  async updateUser(@Args('input') input: UserUpdateInput): Promise<String> {
    await this.userCommandService.update(input);
    return input.id;
  }

  @Mutation(() => String)
  async deleteUser(@Args('input') input: UserDeleteInput): Promise<String> {
    await this.userCommandService.delete(input);
    return input.id;
  }
}
