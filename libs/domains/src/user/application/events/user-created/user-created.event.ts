import { GuildIdWithRoleIds } from '@lib/domains/member/application/commands/create-members-of-user/create-members-of-user.input';
import { IEvent } from '@nestjs/cqrs';

export class UserCreatedEvent implements IEvent {
  id: string;

  guildIdWithRoleIdsList: GuildIdWithRoleIds[];

  constructor(id: string, guildIdWithRoleIdsList: GuildIdWithRoleIds[]) {
    this.id = id;
    this.guildIdWithRoleIdsList = guildIdWithRoleIdsList;
  }
}
