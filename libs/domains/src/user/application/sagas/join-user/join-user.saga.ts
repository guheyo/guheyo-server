import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, map } from 'rxjs';
import { CreateSocialAccountCommand } from '@lib/domains/social-account/application/commands/create-social-account/create-social-account.command';
import { CreateJoinedUserCommand } from '../../commands/create-joined-user/create-joined-user.command';
import { UserjoinedEvent } from '../../events/user-joined/user-joined.event';
import { JoinedUserCreatedEvent } from '../../events/joined-user-created/joined-user-created.event';

@Injectable()
export class JoinUserSaga {
  @Saga()
  userJoined = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(UserjoinedEvent),
      map((event) => new CreateJoinedUserCommand(event)),
    );

  @Saga()
  joinedUserCreated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(JoinedUserCreatedEvent),
      map(
        (event) =>
          new CreateSocialAccountCommand({
            id: event.socialAccountId,
            provider: event.provider,
            socialId: event.socialId,
            userId: event.userId,
          }),
      ),
    );
}