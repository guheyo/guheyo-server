import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateMemberInput } from '@lib/domains/member/application/commands/create-member/create-member.input';
import { CreateMemberCommand } from '@lib/domains/member/application/commands/create-member/create-member.command';
import { UpdateMemberInput } from '@lib/domains/member/application/commands/update-member/update-member.input';
import { UpdateMemberCommand } from '@lib/domains/member/application/commands/update-member/update-member.command';
import { DeleteMemberArgs } from '@lib/domains/member/application/commands/delete-member/delete-member.args';
import { DeleteMemberCommand } from '@lib/domains/member/application/commands/delete-member/delete-member.command';
import { MemberWithRolesResponse } from '@lib/domains/member/application/dtos/member-with-roles.response';
import { FindMemberArgs } from '@lib/domains/member/application/queries/find-member-by-user-and-group/find-member.args';
import { FindMemberQuery } from '@lib/domains/member/application/queries/find-member-by-user-and-group/find-member.query';
import { ConnectRolesInput } from '@lib/domains/member/application/commands/connect-roles/connect-roles.input';
import { ConnectRolesCommand } from '@lib/domains/member/application/commands/connect-roles/connect-roles.command';
import { DisconnectRolesInput } from '@lib/domains/member/application/commands/disconnect-roles/disconnect-roles.input';
import { DisconnectRolesCommand } from '@lib/domains/member/application/commands/disconnect-roles/disconnect-roles.command';

@Resolver()
export class MemberResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => MemberWithRolesResponse, { nullable: true })
  async findMemberByUserAndGroup(
    @Args() args: FindMemberArgs,
  ): Promise<MemberWithRolesResponse | null> {
    const query = new FindMemberQuery(args);
    return this.queryBus.execute(query);
  }

  @Mutation(() => String)
  async createMember(@Args('input') input: CreateMemberInput): Promise<string> {
    await this.commandBus.execute(new CreateMemberCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async updateMember(@Args('input') input: UpdateMemberInput): Promise<string> {
    await this.commandBus.execute(new UpdateMemberCommand(input));
    return input.id;
  }

  @Mutation(() => String)
  async deleteMember(@Args() args: DeleteMemberArgs): Promise<string> {
    await this.commandBus.execute(new DeleteMemberCommand(args));
    return args.id;
  }

  @Mutation(() => String)
  async connectRoles(@Args('input') input: ConnectRolesInput): Promise<string> {
    await this.commandBus.execute(new ConnectRolesCommand(input));
    return input.groupId;
  }

  @Mutation(() => String)
  async disconnectRoles(@Args('input') input: DisconnectRolesInput): Promise<string> {
    await this.commandBus.execute(new DisconnectRolesCommand(input));
    return input.id;
  }
}
