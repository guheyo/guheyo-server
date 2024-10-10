import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpdateUserInput } from '@lib/domains/user/application/commands/update-user/update-user.input';
import { UpdateUserCommand } from '@lib/domains/user/application/commands/update-user/update-user.command';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { FindUsersQuery } from '@lib/domains/user/application/queries/find-users/find-users.query';
import { PaginatedUsersResponse } from '@lib/domains/user/application/queries/find-users/paginated-users.response';
import { UserResponse } from '@lib/domains/user/application/dtos/user.response';
import { FindUserArgs } from '@lib/domains/user/application/queries/find-user/find-user.args';
import { FindUserQuery } from '@lib/domains/user/application/queries/find-user/find-user.query';
import { HttpStatus, UseGuards } from '@nestjs/common';
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
import { FindUsersArgs } from '@lib/domains/user/application/queries/find-users/find-users.args';
import { OptionalJwtUserGuard } from '@lib/domains/auth/guards/jwt/optional-jwt-user.guard';
import { FollowUserInput } from '@lib/domains/user/application/commands/follow-user/follow-user.input';
import { FollowUserCommand } from '@lib/domains/user/application/commands/follow-user/follow-user.command';
import { UnfollowUserInput } from '@lib/domains/user/application/commands/unfollow-user/unfollow-user.input';
import { UnfollowUserCommand } from '@lib/domains/user/application/commands/unfollow-user/unfollow-user.command';
import { MutationResponse } from '@lib/shared/mutation/mutation.response';
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

  @UseGuards(OptionalJwtUserGuard)
  @Query(() => UserResponse, { nullable: true })
  async findUser(
    @Args() args: FindUserArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<UserResponse | null> {
    const query = new FindUserQuery({ args, user });
    return this.queryBus.execute(query);
  }

  @UseGuards(OptionalJwtUserGuard)
  @Query(() => AuthorResponse, { nullable: true })
  async findAuthor(
    @Args() args: FindAuthorArgs,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<AuthorResponse | null> {
    const query = new FindAuthorQuery({ args, user });
    return this.queryBus.execute(query);
  }

  @UseGuards(OptionalJwtUserGuard)
  @Query(() => PaginatedUsersResponse)
  async findUsers(@Args() args: FindUsersArgs, @ExtractedUser() user: MyUserResponse) {
    const query = new FindUsersQuery({ args, userId: user.id });
    return this.queryBus.execute(query);
  }

  // NOTE
  // createUser -> signInUser

  // TODO
  // deleteUser

  @Mutation(() => MutationResponse)
  async updateUser(@Args('input') input: UpdateUserInput): Promise<MutationResponse> {
    await this.commandBus.execute(new UpdateUserCommand(input));
    return {
      code: HttpStatus.OK,
      id: input.id,
    };
  }

  @UseGuards(JwtAccessGuard)
  @Mutation(() => MutationResponse)
  async linkSocialProfile(
    @Args('input') input: LinkSocialProfileInput,
    @ExtractedJwtPayload() jwtPayload: JwtPayload,
  ): Promise<MutationResponse> {
    await this.commandBus.execute(
      new LinkSocialProfileCommand({
        input,
        userId: jwtPayload.id,
        username: jwtPayload.socialProfile.username,
        avatarURL: jwtPayload.socialProfile.avatarURL,
      }),
    );
    return {
      code: HttpStatus.OK,
      id: jwtPayload.id,
    };
  }

  @UseGuards(RequiredJwtUserGuard)
  @Mutation(() => MutationResponse)
  async followUser(
    @Args('input') input: FollowUserInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<MutationResponse> {
    await this.commandBus.execute(new FollowUserCommand({ input, user }));
    return {
      code: HttpStatus.OK,
      id: input.followingId,
    };
  }

  @UseGuards(RequiredJwtUserGuard)
  @Mutation(() => MutationResponse)
  async unfollowUser(
    @Args('input') input: UnfollowUserInput,
    @ExtractedUser() user: MyUserResponse,
  ): Promise<MutationResponse> {
    await this.commandBus.execute(new UnfollowUserCommand({ input, user }));
    return {
      code: HttpStatus.OK,
      id: input.followingId,
    };
  }
}
