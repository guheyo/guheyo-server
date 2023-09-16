import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateMemberInput } from '@lib/domains/member/application/commands/create-member/create-member.input';
import { CreateMemberCommand } from '@lib/domains/member/application/commands/create-member/create-member.command';
import { UpdateMemberInput } from '@lib/domains/member/application/commands/update-member/update-member.input';
import { UpdateMemberCommand } from '@lib/domains/member/application/commands/update-member/update-member.command';
import { DeleteMemberInput } from '@lib/domains/member/application/commands/delete-member/delete-member.input';
import { DeleteMemberCommand } from '@lib/domains/member/application/commands/delete-member/delete-member.command';
import { MemberWithRolesResponse } from '@lib/domains/member/application/dtos/member-with-roles.response';
import { FindMemberByUserAndGuildQuery } from '@lib/domains/member/application/queries/find-member-by-user-and-guild/find-member-by-user-and-guild.query';

@Resolver()
export class MemberResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => MemberWithRolesResponse)
  async findMemberByUserAndGuild(@Args('userId') userId: string, @Args('guildId') guildId: string) {
    const query = new FindMemberByUserAndGuildQuery(userId, guildId);
    return this.queryBus.execute(query);
  }

  @Mutation(() => String)
  async createMember(@Args('input') input: CreateMemberInput): Promise<String> {
    await this.commandBus.execute(new CreateMemberCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async updateMember(@Args('input') input: UpdateMemberInput): Promise<String> {
    await this.commandBus.execute(new UpdateMemberCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async deleteMember(@Args('input') input: DeleteMemberInput): Promise<String> {
    await this.commandBus.execute(new DeleteMemberCommand(input));
    return input.id;
  }
}
