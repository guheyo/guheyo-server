import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FindSessionQuery } from '@lib/domains/session/application/queries/find-session/find-session.query';
import { CreateSessionInput } from '@lib/domains/session/application/commands/create-session/create-session.input';
import { CreateSessionCommand } from '@lib/domains/session/application/commands/create-session/create-session.command';
import { UpdateSessionInput } from '@lib/domains/session/application/commands/update-session/update-session.input';
import { UpdateSessionCommand } from '@lib/domains/session/application/commands/update-session/update-session.command';
import { DeleteSessionCommand } from '@lib/domains/session/application/commands/delete-session/delete-session.command';
import { SessionResponse } from '@lib/domains/session/application/dtos/session.response';
import { UseGuards } from '@nestjs/common';
import { GqlThrottlerBehindProxyGuard } from '../throttler/gql-throttler-behind-proxy.guard';

@UseGuards(GqlThrottlerBehindProxyGuard)
@Resolver()
export class SessionResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => SessionResponse, { nullable: true })
  async findSession(@Args('sessionToken') sessionToken: string) {
    return this.queryBus.execute(new FindSessionQuery(sessionToken));
  }

  @Mutation(() => String)
  async createSession(@Args('input') input: CreateSessionInput): Promise<string> {
    await this.commandBus.execute(new CreateSessionCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async updateSession(@Args('input') input: UpdateSessionInput): Promise<string> {
    await this.commandBus.execute(new UpdateSessionCommand(input));
    return input.sessionToken;
  }

  @Mutation(() => String)
  async deleteSession(@Args('sessionToken') sessionToken: string): Promise<string> {
    await this.commandBus.execute(new DeleteSessionCommand(sessionToken));
    return sessionToken;
  }
}
