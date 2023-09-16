import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserRegisteredFromDiscordEvent } from './user-registered-from-discord.event';

@EventsHandler(UserRegisteredFromDiscordEvent)
export class UserRegisteredFromDiscordHandler
  implements IEventHandler<UserRegisteredFromDiscordEvent>
{
  handle(event: UserRegisteredFromDiscordEvent) {
    // TODO: noti
    console.log('User registered from discord');
  }
}
