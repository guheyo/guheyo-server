import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserInput } from '@lib/domains/user/application/commands/create-user/create-user.input';
import { CreateUserCommand } from '@lib/domains/user/application/commands/create-user/create-user.command';
import { UpdateUserInput } from '@lib/domains/user/application/commands/update-user/update-user.input';
import { UpdateUserCommand } from '@lib/domains/user/application/commands/update-user/update-user.command';
import { DeleteUserCommand } from '@lib/domains/user/application/commands/delete-user/delete-user.command';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { FindMyUserByIdQuery } from '@lib/domains/user/application/queries/find-my-user-by-id/find-my-user-by-id.query';
import { FindMyUserBySocialAccountQuery } from '@lib/domains/user/application/queries/find-my-user-by-social-account/find-my-user-by-social-account.query';
import { PaginationArgs } from '@lib/shared/cqrs/queries/pagination/pagination.args';
import { FindUsersQuery } from '@lib/domains/user/application/queries/find-users/find-users.query';
import { PaginatedUsersResponse } from '@lib/domains/user/application/queries/find-users/paginated-users.response';
import { FindMyUserBySocialAccountArgs } from '@lib/domains/user/application/queries/find-my-user-by-social-account/find-my-user-by-social-account.args';
import { FindMyUserBySessionArgs } from '@lib/domains/user/application/queries/find-my-user-by-session/find-my-user-by-session.args';
import { FindMyUserBySessionQuery } from '@lib/domains/user/application/queries/find-my-user-by-session/find-my-user-by-session.query';

@Resolver()
export class UserResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => MyUserResponse, { nullable: true })
  async findMyUserById(@Args('id') id: string): Promise<MyUserResponse | null> {
    const query = new FindMyUserByIdQuery(id);
    return this.queryBus.execute(query);
  }

  @Query(() => MyUserResponse, { nullable: true })
  async findMyUserBySocialAccount(
    @Args() args: FindMyUserBySocialAccountArgs,
  ): Promise<MyUserResponse | null> {
    const query = new FindMyUserBySocialAccountQuery(args);
    return this.queryBus.execute(query);
  }

  @Query(() => MyUserResponse, { nullable: true })
  async findMyUserBySession(@Args() args: FindMyUserBySessionArgs): Promise<MyUserResponse | null> {
    const query = new FindMyUserBySessionQuery(args);
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
  async deleteUser(@Args('id') id: string): Promise<string> {
    await this.commandBus.execute(new DeleteUserCommand(id));
    return id;
  }
}
