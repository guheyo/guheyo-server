import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, mergeMap, of } from 'rxjs';
import { CreateSocialAccountCommand } from '@lib/domains/social-account/application/commands/create-social-account/create-social-account.command';
import { CreateMemberCommand } from '@lib/domains/member/application/commands/create-member/create-member.command';
import { JoinedUserCreatedEvent } from '../../events/joined-user-created/joined-user-created.event';

@Injectable()
export class JoinUserSaga {
  @Saga()
  joinedUserCreated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(JoinedUserCreatedEvent),
      mergeMap((event) =>
        of(
          new CreateSocialAccountCommand({
            id: event.socialAccountId,
            provider: event.provider,
            socialId: event.socialId,
            userId: event.userId,
          }),
          new CreateMemberCommand({
            id: event.memberId,
            userId: event.userId,
            guildId: event.guildId,
          }),
        ),
      ),
    );
}
