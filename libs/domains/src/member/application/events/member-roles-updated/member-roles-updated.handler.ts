import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MemberRolesUpdatedEvent } from './member-roles-updated.event';

@EventsHandler(MemberRolesUpdatedEvent)
export class MemberRolesUpdatedHandler implements IEventHandler<MemberRolesUpdatedEvent> {
  handle(event: MemberRolesUpdatedEvent) {
    // TODO: noti
    console.log(`member ${event.id} : roles updated`);
  }
}
