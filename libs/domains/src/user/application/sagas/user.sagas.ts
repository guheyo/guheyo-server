import { Injectable } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable, map, mergeMap, of } from 'rxjs';
import { TrackUserImagesCommand } from '@lib/domains/user-image/application/commands/track-user-images/track-user-images.command';
import { CreateMembersOfUserCommand } from '@lib/domains/member/application/commands/create-members-of-user/create-members-of-user.command';
import { CreateSocialAccountCommand } from '@lib/domains/social-account/application/commands/create-social-account/create-social-account.command';
import { UserCreatedEvent } from '../events/user-created/user-created.event';
import { SocialAccountLinkedEvent } from '../events/social-account-linked/social-account-linked.event';

@Injectable()
export class UserSagas {
  @Saga()
  userCreated = (events$: Observable<any>): Observable<ICommand> =>
    events$.pipe(
      ofType(UserCreatedEvent),
      mergeMap((event) =>
        of(
          new TrackUserImagesCommand({
            type: 'user/avatar',
            refId: event.id,
          }),
          new CreateMembersOfUserCommand({
            userId: event.id,
            guildIdWithRoleIdsList: event.guildIdWithRoleIdsList,
          }),
        ),
      ),
    );

  @Saga()
  socialAccountLinked = (event$: Observable<any>): Observable<ICommand> =>
    event$.pipe(
      ofType(SocialAccountLinkedEvent),
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
