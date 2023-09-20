import { IEvent } from '@nestjs/cqrs/dist';
import { MemberRolesUpdatedInput } from './member-roles-updated.input';

export class MemberRolesUpdatedEvent implements IEvent {
  id: string;

  connectedRoleIds: string[];

  disconnectedRoleIds: string[];

  constructor(input: MemberRolesUpdatedInput) {
    this.id = input.id;
    this.connectedRoleIds = input.connectedRoleIds;
    this.disconnectedRoleIds = input.disconnectedRoleIds;
  }
}
