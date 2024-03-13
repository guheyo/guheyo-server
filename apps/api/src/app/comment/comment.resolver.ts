import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';
import { CreateCommentInput } from '@lib/domains/comment/application/commands/create-comment/create-comment.input';
import { CreateCommentCommand } from '@lib/domains/comment/application/commands/create-comment/create-comment.command';
import { CommentResponse } from '@lib/domains/comment/application/dtos/comment.response';
import { FindCommentArgs } from '@lib/domains/comment/application/queries/find-comment/find-comment.args';
import { FindCommentQuery } from '@lib/domains/comment/application/queries/find-comment/find-comment.query';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class CommentResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => String)
  async createComment(@Args('input') input: CreateCommentInput): Promise<string> {
    await this.commandBus.execute(new CreateCommentCommand(input));
    return input.id;
  }

  @Query(() => CommentResponse)
  async findComment(@Args() args: FindCommentArgs) {
    const query = new FindCommentQuery(args);
    return this.queryBus.execute(query);
  }
}
