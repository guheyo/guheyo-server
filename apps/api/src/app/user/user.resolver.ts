import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserInput } from '@lib/domains/user/application/commands/create-user/create-user.input';
import { CreateUserCommand } from '@lib/domains/user/application/commands/create-user/create-user.command';
import { UpdateUserInput } from '@lib/domains/user/application/commands/update-user/update-user.input';
import { UpdateUserCommand } from '@lib/domains/user/application/commands/update-user/update-user.command';
import { DeleteUserCommand } from '@lib/domains/user/application/commands/delete-user/delete-user.command';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { PaginationArgs } from '@lib/shared/cqrs/queries/pagination/pagination.args';
import { FindUsersQuery } from '@lib/domains/user/application/queries/find-users/find-users.query';
import { PaginatedUsersResponse } from '@lib/domains/user/application/queries/find-users/paginated-users.response';
import { FindMyUserQuery } from '@lib/domains/user/application/queries/find-my-user/find-my-user.query';
import { UserResponse } from '@lib/domains/user/application/dtos/user.response';
import { FindUserArgs } from '@lib/domains/user/application/queries/find-user/find-user.args';
import { FindUserQuery } from '@lib/domains/user/application/queries/find-user/find-user.query';
import { UseGuards } from '@nestjs/common';
import { JwtAccessAuthGuard } from '@lib/domains/auth/guards/jwt/jwt-access-auth.guard';
import { AuthorResponse } from '@lib/domains/user/application/dtos/author.response';
import { FindAuthorArgs } from '@lib/domains/user/application/queries/find-author/find-author.args';
import { FindAuthorQuery } from '@lib/domains/user/application/queries/find-author/find-author.query';
import { FindMyUserArgs } from '@lib/domains/user/application/queries/find-my-user/find-my-user.args';
import { AuthUser } from '@lib/domains/auth/decorators/auth-user/auth-user.decorator';
import { LinkSocialProfileInput } from '@lib/domains/user/application/commands/link-social-profile/link-social-profile.input';
import { LinkSocialProfileCommand } from '@lib/domains/user/application/commands/link-social-profile/link-social-profile.command';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class UserResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(JwtAccessAuthGuard)
  @Query(() => MyUserResponse, { nullable: true })
  async findMyUser(
    @Args() args: FindMyUserArgs,
    @AuthUser() user: any,
  ): Promise<MyUserResponse | null> {
    const query = new FindMyUserQuery({
      args,
      userId: user?.id,
    });
    return this.queryBus.execute(query);
  }

  @Query(() => UserResponse, { nullable: true })
  async findUser(@Args() args: FindUserArgs): Promise<UserResponse | null> {
    const query = new FindUserQuery(args);
    return this.queryBus.execute(query);
  }

  @Query(() => AuthorResponse, { nullable: true })
  async findAuthor(@Args() args: FindAuthorArgs): Promise<AuthorResponse | null> {
    const query = new FindAuthorQuery(args);
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

  @UseGuards(JwtAccessAuthGuard)
  @Mutation(() => String)
  async linkSocialProfile(
    @Args('input') input: LinkSocialProfileInput,
    @AuthUser() user: any,
  ): Promise<string> {
    await this.commandBus.execute(
      new LinkSocialProfileCommand({
        input,
        userId: user.id,
        username: user.socialProfile.username,
        avatarURL: user.socialProfile.avatarURL,
      }),
    );
    return user.id;
  }
}
