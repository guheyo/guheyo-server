import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserInput } from '@lib/domains/user/application/commands/create-user/create-user.input';
import { CreateUserCommand } from '@lib/domains/user/application/commands/create-user/create-user.command';
import { UserUpdateInput } from '@lib/domains/user/application/commands/user-update/user.update.input';
import { UserUpdateCommand } from '@lib/domains/user/application/commands/user-update/user.update.command';
import { DeleteUserInput } from '@lib/domains/user/application/commands/delete-user/delete-user.input';
import { DeleteUserCommand } from '@lib/domains/user/application/commands/delete-user/delete-user.command';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { FindMyUserByIdQuery } from '@lib/domains/user/application/queries/find-my-user-by-id/find-my-user-by-id.query';
import { FindMyUserBySocialAccountQuery } from '@lib/domains/user/application/queries/find-my-user-by-social-account/find-my-user-by-social-account.query';

@Resolver()
export class UserResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => MyUserResponse)
  async findMyUserById(@Args('id') id: string) {
    const query = new FindMyUserByIdQuery(id);
    return this.queryBus.execute(query);
  }

  @Query(() => MyUserResponse)
  async findMyUserBySocialAccount(
    @Args('provider') provider: string,
    @Args('socialId') socialId: string,
  ) {
    const query = new FindMyUserBySocialAccountQuery(provider, socialId);
    return this.queryBus.execute(query);
  }

  @Mutation(() => String)
  async createUser(@Args('input') input: CreateUserInput): Promise<String> {
    await this.commandBus.execute(new CreateUserCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async updateUser(@Args('input') input: UserUpdateInput): Promise<String> {
    await this.commandBus.execute(new UserUpdateCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async deleteUser(@Args('input') input: DeleteUserInput): Promise<String> {
    await this.commandBus.execute(new DeleteUserCommand(input));
    return input.id;
  }
}
