import { GroupGuard } from '@app/bot/apps/group/guards/group.guard';
import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Context, ContextOf, On } from 'necord';
import { ParseUserPipe } from '@app/bot/apps/user/pipes/parse-user.pipe';
import { MyUserResponse } from '@lib/domains/user/application/dtos/my-user.response';
import { UserClient } from '@app/bot/apps/user/clients/user.client';

@UseGuards(GroupGuard)
@Injectable()
export class JoinedMemberRoleInitializedHandler {
  private readonly logger = new Logger(JoinedMemberRoleInitializedHandler.name);

  constructor(private readonly userClient: UserClient) {}

  @On('guildMemberAdd')
  public async onJoin(
    @Context()
    [member]: ContextOf<'guildMemberAdd'>,
    @Context(ParseUserPipe) user: MyUserResponse,
  ) {
    const guild = await member.guild.fetch();
    const filteredRoles = (await guild.roles.fetch()).filter(
      (r) => !/사파리/.test(r.name) && !/초식마크/.test(r.name),
    );

    const userWithMember = { user, member };
    const appliedMembers = await this.userClient.applyUserRoles([userWithMember], filteredRoles);
    const appliedMember = appliedMembers[0];

    const memberRoleNames = appliedMember.roles.cache.map((role) => role.name);
    console.log(`${user.username}<@${member.id}> role initialized\n${memberRoleNames}`);
  }
}
