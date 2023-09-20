import { GuildMemberEventGuard } from '@app/bot/guards/guild-member.event.guard';
import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventBus } from '@nestjs/cqrs';
import { Context, ContextOf, On } from 'necord';
import { v5 as uuid5 } from 'uuid';
import _ from 'lodash';
import { MemberRolesUpdatedEvent } from '@lib/domains/member/application/events/member-roles-updated/member-roles-updated.event';

@UseGuards(GuildMemberEventGuard)
@Injectable()
export class UpdatedMemberHandler {
  private readonly logger = new Logger(UpdatedMemberHandler.name);

  constructor(
    private readonly eventBus: EventBus,
    private readonly configService: ConfigService,
  ) {}

  @On('guildMemberUpdate')
  public async onUpdate(@Context() [oldMember, newMember]: ContextOf<'guildMemberUpdate'>) {
    const oldMemberRoleIds = oldMember.roles.cache.map((role) =>
      uuid5(role.id, this.configService.get('namespace.guild')!),
    );
    const newMemberRoleIds = newMember.roles.cache.map((role) =>
      uuid5(role.id, this.configService.get('namespace.guild')!),
    );

    const connectedRoleIds = _.difference(newMemberRoleIds, oldMemberRoleIds);
    const disconnectedRoleIds = _.difference(oldMemberRoleIds, newMemberRoleIds);

    if (connectedRoleIds.length === 0 && disconnectedRoleIds.length === 0) return;

    this.eventBus.publish(
      new MemberRolesUpdatedEvent({
        id: uuid5(newMember.id, this.configService.get('namespace.guild')!),
        connectedRoleIds,
        disconnectedRoleIds,
      }),
    );
  }
}
