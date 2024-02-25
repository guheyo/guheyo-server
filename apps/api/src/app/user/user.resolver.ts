import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserInput } from '@lib/domains/user/application/commands/create-user/create-user.input';
import { CreateUserCommand } from '@lib/domains/user/application/commands/create-user/create-user.command';
import { UpdateUserInput } from '@lib/domains/user/application/commands/update-user/update-user.input';
import { UpdateUserCommand } from '@lib/domains/user/application/commands/update-user/update-user.command';
import { DeleteUserCommand } from '@lib/domains/user/application/commands/delete-user/delete-user.command';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { FindMyUserByIdQuery } from '@lib/domains/user/application/queries/find-my-user-by-id/find-my-user-by-id.query';
import { PaginationArgs } from '@lib/shared/cqrs/queries/pagination/pagination.args';
import { FindUsersQuery } from '@lib/domains/user/application/queries/find-users/find-users.query';
import { PaginatedUsersResponse } from '@lib/domains/user/application/queries/find-users/paginated-users.response';
import { FindMyUserByUsernameQuery } from '@lib/domains/user/application/queries/find-my-user-by-username/find-my-user-by-username.query';
import { UserResponse } from '@lib/domains/user/application/dtos/user.response';
import { FindUserArgs } from '@lib/domains/user/application/queries/find-user/find-user.args';
import { FindUserQuery } from '@lib/domains/user/application/queries/find-user/find-user.query';
import { UseGuards } from '@nestjs/common';
import { JwtAccessAuthGuard } from '../auth/jwt/jwt-acess-auth.guard';
import { GqlThrottlerGuard } from '../throttler/gql-throttler.guard';

@UseGuards(GqlThrottlerGuard)
@Resolver()
export class UserResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => MyUserResponse, { nullable: true })
  async findMyUserById(@Args('id', { type: () => ID }) id: string): Promise<MyUserResponse | null> {
    const query = new FindMyUserByIdQuery(id);
    return this.queryBus.execute(query);
  }

  @Query(() => UserResponse, { nullable: true })
  async findUser(@Args() args: FindUserArgs): Promise<UserResponse | null> {
    const query = new FindUserQuery(args);
    return this.queryBus.execute(query);
  }

  @UseGuards(JwtAccessAuthGuard)
  @Query(() => MyUserResponse, { nullable: true })
  async findMyUserByUsername(
    @Args('username', { type: () => ID }) username: string,
  ): Promise<MyUserResponse | null> {
    const query = new FindMyUserByUsernameQuery(username);
    return this.queryBus.execute(query);
  }

  @Query(() => PaginatedUsersResponse)
  async findUsers(@Args() paginationArgs: PaginationArgs) {
    const query = new FindUsersQuery(paginationArgs);
    return this.queryBus.execute(query);
  }

  @Mutation(() => String)
  async createUser(@Args('input') input: CreateUserInput): Promise<string> {
    await this.commandBus.execute(new CreateUserCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async updateUser(@Args('input') input: UpdateUserInput): Promise<string> {
    await this.commandBus.execute(new UpdateUserCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async deleteUser(@Args('id', { type: () => ID }) id: string): Promise<string> {
    await this.commandBus.execute(new DeleteUserCommand(id));
    return id;
  }
}
