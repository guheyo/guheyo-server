import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserjoinedEvent } from './user-joined.event';

@EventsHandler(UserjoinedEvent)
export class UserjoinedHandler implements IEventHandler<UserjoinedEvent> {
  handle(event: UserjoinedEvent) {
    // TODO: noti
    console.log('User joined from discord');
  }
}
