import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { JoinedUserCreatedEvent } from './joined-user-created.event';

@EventsHandler(JoinedUserCreatedEvent)
export class JoinedUserCreatedHandler implements IEventHandler<JoinedUserCreatedEvent> {
  handle(event: JoinedUserCreatedEvent) {
    // TODO: noti
    console.log('Joined User Created');
  }
}
