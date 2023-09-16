import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, map } from 'rxjs';
import { UserRegisteredFromDiscordEvent } from '../../events/user-registered-from-discord/user-registered-from-discord.event';
import { CreateUserCommand } from '../../commands/create-user/create-user.command';

@Injectable()
export class RegisterUserSage {
  @Saga()
  registeredUser = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(UserRegisteredFromDiscordEvent),
      map(
        (event) =>
          new CreateUserCommand({
            id: event.userId,
            username: event.username,
          }),
        // TODO: create social-account, member
      ),
    );
}
