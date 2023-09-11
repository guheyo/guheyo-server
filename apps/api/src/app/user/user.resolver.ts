import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserCreateInput } from '@lib/domains/user/application/commands/user-create/user.create.input';
import { UserCreateCommand } from '@lib/domains/user/application/commands/user-create/user.create.command';
import { UserUpdateInput } from '@lib/domains/user/application/commands/user-update/user.update.input';
import { UserUpdateCommand } from '@lib/domains/user/application/commands/user-update/user.update.command';
import { UserDeleteInput } from '@lib/domains/user/application/commands/user-delete/user.delete.input';
import { UserDeleteCommand } from '@lib/domains/user/application/commands/user-delete/user.delete.command';
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
