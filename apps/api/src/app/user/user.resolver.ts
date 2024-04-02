import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpdateUserInput } from '@lib/domains/user/application/commands/update-user/update-user.input';
import { UpdateUserCommand } from '@lib/domains/user/application/commands/update-user/update-user.command';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { PaginationArgs } from '@lib/shared/cqrs/queries/pagination/pagination.args';
import { FindUsersQuery } from '@lib/domains/user/application/queries/find-users/find-users.query';
import { PaginatedUsersResponse } from '@lib/domains/user/application/queries/find-users/paginated-users.response';
import { UserResponse } from '@lib/domains/user/application/dtos/user.response';
import { FindUserArgs } from '@lib/domains/user/application/queries/find-user/find-user.args';
import { FindUserQuery } from '@lib/domains/user/application/queries/find-user/find-user.query';
import { UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from '@lib/domains/auth/guards/jwt/jwt-access.guard';
import { AuthorResponse } from '@lib/domains/user/application/dtos/author.response';
import { FindAuthorArgs } from '@lib/domains/user/application/queries/find-author/find-author.args';
import { FindAuthorQuery } from '@lib/domains/user/application/queries/find-author/find-author.query';
import { LinkSocialProfileInput } from '@lib/domains/user/application/commands/link-social-profile/link-social-profile.input';
import { LinkSocialProfileCommand } from '@lib/domains/user/application/commands/link-social-profile/link-social-profile.command';
import { ExtractedUser } from '@lib/domains/auth/decorators/extracted-user/extracted-user.decorator';
import { ExtractedJwtPayload } from '@lib/domains/auth/decorators/extracted-jwt-payload/extracted-jwt-payload.decorator';
import { JwtPayload } from '@lib/shared/jwt/jwt.interfaces';
import { RequiredJwtUserGuard } from '@lib/domains/auth/guards/jwt/required-jwt-user.guard';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class UserResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(RequiredJwtUserGuard)
  @Query(() => MyUserResponse, { nullable: true })
  async findMyUser(@ExtractedUser() user: MyUserResponse | null): Promise<MyUserResponse | null> {
    return user;
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

  // NOTE
  // createUser -> signInUser

  // TODO
  // deleteUser

  @Mutation(() => String)
  async updateUser(@Args('input') input: UpdateUserInput): Promise<string> {
    await this.commandBus.execute(new UpdateUserCommand(input));
    return input.id;
  }

  @UseGuards(JwtAccessGuard)
  @Mutation(() => String)
  async linkSocialProfile(
    @Args('input') input: LinkSocialProfileInput,
    @ExtractedJwtPayload() jwtPayload: JwtPayload,
  ): Promise<string> {
    await this.commandBus.execute(
      new LinkSocialProfileCommand({
        input,
        userId: jwtPayload.id,
        username: jwtPayload.socialProfile.username,
        avatarURL: jwtPayload.socialProfile.avatarURL,
      }),
    );
    return jwtPayload.id;
  }
}
